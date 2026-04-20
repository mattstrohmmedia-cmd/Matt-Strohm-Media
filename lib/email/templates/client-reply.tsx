import {
  Body, Container, Head, Hr, Html, Img, Link, Preview, Section, Text,
} from '@react-email/components';

const baseUrl = 'https://www.mattstrohmmedia.com';

export function ClientReplyEmail({ name }: { name: string }) {
  const firstName = name.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>Thanks for your enquiry — I'll be in touch shortly.</Preview>
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

          {/* Main content */}
          <Section style={content}>
            <Text style={greeting}>Thanks, {firstName}.</Text>

            <Text style={bodyText}>
              Your message has come through — I'll get back to you personally within one working
              day, often sooner. If it's urgent, just reply directly to this email.
            </Text>

            <Text style={bodyText}>
              In the meantime, have a look at some recent work on{' '}
              <Link href="https://www.instagram.com/matt_strohm/" style={link}>
                Instagram
              </Link>
              .
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Signature */}
          <Section style={signatureBlock}>
            <Text style={sigName}>Matt Strohm</Text>
            <Text style={sigDetail}>
              Matt Strohm Media · Aberdeen &amp; Aberdeenshire
            </Text>
            <Text style={sigDetail}>
              <Link href={baseUrl} style={link}>
                mattstrohmmedia.com
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You received this because you submitted an enquiry at mattstrohmmedia.com.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
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

const content: React.CSSProperties = {
  padding: '40px 32px 32px',
};

const greeting: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 600,
  color: '#eae6df',
  margin: '0 0 24px',
  letterSpacing: '-0.02em',
};

const bodyText: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.8,
  color: '#9a9590',
  margin: '0 0 16px',
};

const link: React.CSSProperties = {
  color: '#c9a84c',
  textDecoration: 'none',
};

const divider: React.CSSProperties = {
  borderColor: '#1f1f1f',
  margin: '8px 32px',
};

const signatureBlock: React.CSSProperties = {
  padding: '24px 32px',
};

const sigName: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  color: '#eae6df',
  margin: '0 0 4px',
};

const sigDetail: React.CSSProperties = {
  fontSize: 13,
  color: '#5a5550',
  margin: '0 0 2px',
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
};
