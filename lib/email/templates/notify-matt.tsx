import {
  Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text,
} from '@react-email/components';
import { SERVICE_LABELS, BUDGET_LABELS, type ContactPayload } from '@/lib/schemas';

const baseUrl = 'https://www.mattstrohmmedia.com';

export function NotifyMattEmail({
  name, email, phone, service, eventDate, budget, message,
}: ContactPayload) {
  return (
    <Html>
      <Head />
      <Preview>New enquiry from {name} — {SERVICE_LABELS[service]}</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/images/logos/msm.png`}
              alt="Matt Strohm Media"
              height={36}
              style={{ display: 'block' }}
            />
          </Section>

          {/* Title bar */}
          <Section style={titleBar}>
            <Text style={label}>New enquiry</Text>
            <Heading style={title}>{SERVICE_LABELS[service]}</Heading>
            <Text style={meta}>
              {new Date().toLocaleString('en-GB', {
                timeZone: 'Europe/London',
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Section>

          {/* Details */}
          <Section style={detailsBlock}>
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            {phone && <Row label="Phone" value={phone} />}
            <Row label="Service" value={SERVICE_LABELS[service]} />
            {eventDate && <Row label="Event date" value={eventDate} />}
            {budget && (
              <Row
                label="Budget"
                value={BUDGET_LABELS[budget as keyof typeof BUDGET_LABELS] || budget}
              />
            )}
          </Section>

          <Hr style={divider} />

          {/* Message */}
          <Section style={{ padding: '0 32px 32px' }}>
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>Matt Strohm Media · Aberdeen &amp; Aberdeenshire</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

function Row({ label: rowLabel, value }: { label: string; value: string }) {
  return (
    <table style={{ width: '100%', marginBottom: 12 }} cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td style={{ width: 100, verticalAlign: 'top' }}>
            <Text style={rowLabelStyle}>{rowLabel}</Text>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <Text style={rowValue}>{value}</Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// Styles
const body: React.CSSProperties = {
  background: '#0a0a0a',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  margin: 0,
  padding: '32px 0',
};

const container: React.CSSProperties = {
  maxWidth: 560,
  margin: '0 auto',
  background: '#111',
  border: '1px solid #1f1f1f',
};

const header: React.CSSProperties = {
  padding: '24px 32px',
  borderBottom: '1px solid #1f1f1f',
};

const titleBar: React.CSSProperties = {
  padding: '32px 32px 24px',
  borderBottom: '1px solid #1f1f1f',
};

const label: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#c9a84c',
  margin: '0 0 8px',
};

const title: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 600,
  color: '#eae6df',
  margin: '0 0 8px',
  letterSpacing: '-0.02em',
};

const meta: React.CSSProperties = {
  fontSize: 13,
  color: '#5a5550',
  margin: 0,
};

const detailsBlock: React.CSSProperties = {
  padding: '24px 32px',
};

const rowLabelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#5a5550',
  margin: 0,
};

const rowValue: React.CSSProperties = {
  fontSize: 14,
  color: '#eae6df',
  margin: 0,
};

const divider: React.CSSProperties = {
  borderColor: '#1f1f1f',
  margin: '0 32px',
};

const messageText: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.8,
  color: '#ccc8c0',
  whiteSpace: 'pre-wrap',
  margin: '8px 0 0',
};

const footer: React.CSSProperties = {
  padding: '16px 32px',
  borderTop: '1px solid #1f1f1f',
  background: '#0d0d0d',
};

const footerText: React.CSSProperties = {
  fontSize: 11,
  color: '#3a3530',
  margin: 0,
  letterSpacing: '0.05em',
};
