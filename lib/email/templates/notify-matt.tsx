import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components';
import { SERVICE_LABELS, BUDGET_LABELS, type ContactPayload } from '@/lib/schemas';

export function NotifyMattEmail({
  name, email, phone, service, eventDate, budget, message,
}: ContactPayload) {
  return (
    <Html>
      <Head />
      <Preview>New enquiry from {name} — {SERVICE_LABELS[service]}</Preview>
      <Body style={{ background: '#050505', color: '#eae6df', fontFamily: 'system-ui, sans-serif' }}>
        <Container style={{ padding: '32px 24px', maxWidth: 560 }}>
          <Heading style={{ color: '#c9a84c', fontSize: 22, marginBottom: 8 }}>
            New enquiry
          </Heading>
          <Text style={{ color: '#8a857e', fontSize: 13, margin: 0 }}>
            {SERVICE_LABELS[service]} · {new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
          </Text>
          <Hr style={{ borderColor: '#1a1a1a', margin: '24px 0' }} />
          <Section>
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            {phone && <Row label="Phone" value={phone} />}
            <Row label="Service" value={SERVICE_LABELS[service]} />
            {eventDate && <Row label="Event date" value={eventDate} />}
            {budget && <Row label="Budget" value={BUDGET_LABELS[budget as keyof typeof BUDGET_LABELS] || budget} />}
          </Section>
          <Hr style={{ borderColor: '#1a1a1a', margin: '24px 0' }} />
          <Text style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#8a857e' }}>
            Message
          </Text>
          <Text style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: '#eae6df' }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Text style={{ margin: '6px 0', fontSize: 14 }}>
      <span style={{ color: '#8a857e', textTransform: 'uppercase', fontSize: 11, letterSpacing: 2, marginRight: 12 }}>
        {label}
      </span>
      <span style={{ color: '#eae6df' }}>{value}</span>
    </Text>
  );
}
