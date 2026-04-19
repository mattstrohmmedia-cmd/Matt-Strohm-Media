import {
  Body, Container, Head, Heading, Hr, Html, Preview, Text, Link,
} from '@react-email/components';

export function ClientReplyEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for your enquiry — I'll be in touch shortly.</Preview>
      <Body style={{ background: '#050505', color: '#eae6df', fontFamily: 'system-ui, sans-serif' }}>
        <Container style={{ padding: '32px 24px', maxWidth: 560 }}>
          <Heading style={{ color: '#c9a84c', fontSize: 24, marginBottom: 16 }}>
            Thanks, {name.split(' ')[0]}.
          </Heading>
          <Text style={{ lineHeight: 1.7 }}>
            Got your message — thanks for reaching out. I'll get back to you personally within one
            working day (often sooner). If it's urgent, just reply to this email.
          </Text>
          <Text style={{ lineHeight: 1.7 }}>
            In the meantime, have a look around the{' '}
            <Link href="https://www.instagram.com/mattstrohmmedia/" style={{ color: '#c9a84c' }}>
              Instagram
            </Link>{' '}
            for recent work.
          </Text>
          <Hr style={{ borderColor: '#1a1a1a', margin: '24px 0' }} />
          <Text style={{ fontSize: 12, color: '#8a857e' }}>
            Matt Strohm Media · Aberdeen &amp; Aberdeenshire
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
