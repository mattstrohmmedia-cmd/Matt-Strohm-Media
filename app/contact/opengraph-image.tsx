import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Contact — Matt Strohm Media';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadFonts() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  ).then(r => r.text());
  const urls = [...css.matchAll(/src: url\((.+?)\) format/g)].map(m => m[1]);
  const [normal, italic] = await Promise.all(urls.map(u => fetch(u).then(r => r.arrayBuffer())));
  return { normal, italic };
}

export default async function OpengraphImage() {
  const [imgData, fonts] = await Promise.all([
    readFile(join(process.cwd(), 'public/images/self portrait.jpg')),
    loadFonts(),
  ]);
  const imgBase64 = `data:image/jpeg;base64,${imgData.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <img src={imgBase64} style={{ position: 'absolute', right: 0, top: 0, width: '52%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,5,5,1) 0%, rgba(5,5,5,1) 48%, rgba(5,5,5,0.5) 65%, rgba(5,5,5,0) 100%)', display: 'flex' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: '#050505', display: 'flex' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: '#c9a84c', display: 'flex' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 1, background: '#c9a84c', display: 'flex' }} />
            <span style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: '#c9a84c', fontFamily: 'sans-serif', fontWeight: 700 }}>Matt Strohm Media</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: '#6a6560', fontFamily: 'sans-serif', fontWeight: 700, marginBottom: 16 }}>Get in touch</div>
            <span style={{ fontSize: 82, lineHeight: 1, color: '#ffffff', fontFamily: 'Instrument Serif', fontWeight: 400 }}>Book a free</span>
            <span style={{ fontSize: 82, lineHeight: 1, color: '#c9a84c', fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400 }}>consultation.</span>
            <div style={{ fontSize: 17, color: '#8a8580', fontFamily: 'sans-serif', fontWeight: 600, marginTop: 20 }}>No pitch, no hard sell — just an honest conversation.</div>
          </div>

          <span style={{ fontSize: 13, color: '#4a4540', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600 }}>mattstrohmmedia.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Instrument Serif', data: fonts.normal, style: 'normal', weight: 400 },
        { name: 'Instrument Serif', data: fonts.italic, style: 'italic', weight: 400 },
      ],
    },
  );
}
