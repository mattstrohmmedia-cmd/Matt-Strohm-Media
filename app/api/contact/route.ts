import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';
import { sendEnquiryEmails } from '@/lib/email/send';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot — quietly succeed to confuse bots.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req.headers);
  const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many submissions — try again in an hour.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  try {
    await sendEnquiryEmails(data);
  } catch (err) {
    console.error('[contact] email send failed:', err);
    return NextResponse.json({ error: 'We couldn\'t send your message. Try again or email directly.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
