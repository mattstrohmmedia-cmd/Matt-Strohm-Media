import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Contact — Matt Strohm Media';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const imgData = await readFile(join(process.cwd(), 'public/images/hero.jpg'));
  const imgBase64 = `data:image/jpeg;base64,${imgData.toString('base64')}`;

  const logoData = await readFile(join(process.cwd(), 'public/images/logos/msm.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <img src={imgBase64} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,0.3) 100%)', display: 'flex' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#c9a84c', display: 'flex' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 80px' }}>
          <img src={logoBase64} style={{ height: 52, width: 'auto' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 14, letterSpacing: 6, textTransform: 'uppercase', color: '#c9a84c', marginBottom: 20, fontFamily: 'sans-serif' }}>Get in touch</div>
            <div style={{ fontSize: 82, lineHeight: 1.05, color: '#eae6df', fontFamily: 'serif', display: 'flex', flexDirection: 'column' }}>
              <span>Book a</span>
              <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>free call</span>
            </div>
            <div style={{ fontSize: 18, color: '#8a857e', marginTop: 20, fontFamily: 'sans-serif' }}>
              No pitch, no hard sell — just an honest conversation about your project
            </div>
          </div>
          <div style={{ fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: '#6a6560', fontFamily: 'sans-serif' }}>mattstrohmmedia.com</div>
        </div>
      </div>
    ),
    size,
  );
}
