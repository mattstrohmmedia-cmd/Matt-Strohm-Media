import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Matt Strohm Media';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #050505 0%, #0c0c0c 100%)',
          color: '#eae6df',
          fontFamily: 'serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 80,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, textTransform: 'uppercase', color: '#c9a84c', marginBottom: 24 }}>
          Aberdeen & Aberdeenshire
        </div>
        <div style={{ fontSize: 110, lineHeight: 1, display: 'flex', flexDirection: 'column' }}>
          <span>Matt Strohm</span>
          <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Media</span>
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: '#8a857e' }}>
          Photography · Video · Web · Social · AI
        </div>
      </div>
    ),
    size
  );
}
