import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Matt Strohm Media';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadFont() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  ).then(r => r.text());
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error('Font URL not found');
  return fetch(url).then(r => r.arrayBuffer());
}

export default async function OpengraphImage() {
  const [heroData, fontData] = await Promise.all([
    readFile(join(process.cwd(), 'public/images/hero.jpg')),
    loadFont(),
  ]);
  const heroBase64 = `data:image/jpeg;base64,${heroData.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <img src={heroBase64} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.8) 55%, rgba(5,5,5,0.4) 100%)', display: 'flex' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: '#c9a84c', display: 'flex' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 80px' }}>

          {/* Top label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 1, background: '#c9a84c', display: 'flex' }} />
            <span style={{ fontSize: 13, letterSpacing: 6, textTransform: 'uppercase', color: '#c9a84c', fontFamily: 'sans-serif' }}>
              Matt Strohm Media
            </span>
          </div>

          {/* Main heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <span style={{ fontSize: 96, lineHeight: 1, color: '#eae6df', fontFamily: 'Instrument Serif', fontWeight: 400 }}>
              Creative media
            </span>
            <span style={{ fontSize: 96, lineHeight: 1, color: '#c9a84c', fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400 }}>
              that elevates.
            </span>
          </div>

          {/* Bottom */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#5a5550', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
              Aberdeen &amp; Aberdeenshire
            </span>
            <span style={{ fontSize: 14, color: '#5a5550', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
              Photography · Video · Web · Social
            </span>
          </div>

        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Instrument Serif', data: fontData, style: 'italic', weight: 400 }] },
  );
}
