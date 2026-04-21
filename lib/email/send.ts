import { resend } from './client';
import { NotifyMattEmail } from './templates/notify-matt';
import { ClientReplyEmail } from './templates/client-reply';
import type { ContactPayload } from '@/lib/schemas';
import { SERVICE_LABELS } from '@/lib/schemas';

export async function sendEnquiryEmails(payload: ContactPayload) {
  const notifyFrom = process.env.EMAIL_FROM_NOTIFY || 'Matt Strohm Media <enquiries@mattstrohmmedia.com>';
  const replyFrom = process.env.EMAIL_FROM_REPLY || 'Matt Strohm Media <enquiries@mattstrohmmedia.com>';
  const notifyTo = process.env.NOTIFY_EMAIL;
  if (!notifyTo) throw new Error('NOTIFY_EMAIL not set');

  const r = resend();

  const notify = await r.emails.send({
    from: notifyFrom,
    to: notifyTo,
    replyTo: payload.email,
    subject: `New enquiry — ${SERVICE_LABELS[payload.service]} — ${payload.name}`,
    react: NotifyMattEmail(payload),
  });

  if (notify.error) throw new Error(`Notify send failed: ${notify.error.message}`);

  const reply = await r.emails.send({
    from: replyFrom,
    to: payload.email,
    subject: `Got your message — Matt Strohm Media`,
    react: ClientReplyEmail({ name: payload.name }),
  });

  if (reply.error) throw new Error(`Reply send failed: ${reply.error.message}`);
}
