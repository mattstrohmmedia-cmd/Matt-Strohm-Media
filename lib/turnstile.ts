export async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // In dev, if no secret, skip (dev-only short-circuit).
    if (process.env.NODE_ENV !== 'production') return { ok: true, dev: true };
    return { ok: false, error: 'turnstile-not-configured' };
  }
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
    // cloudflare recommends no-cache
    cache: 'no-store',
  });
  const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
  return { ok: data.success, errors: data['error-codes'] };
}
