import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Matt Strohm Media';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const heroData = await readFile(join(process.cwd(), 'public/images/hero.jpg'));
  const heroBase64 = `data:image/jpeg;base64,${heroData.toString('base64')}`;

  const logoData = await readFile(join(process.cwd(), 'public/images/logos/msm.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <img
          src={heroBase64}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.75) 50%, rgba(5,5,5,0.5) 100%)',
            display: 'flex',
          }}
        />

        {/* Gold accent bar left */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: '#c9a84c',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
          }}
        >
          {/* Top — logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoBase64} style={{ height: 52, width: 'auto' }} />
          </div>

          {/* Middle — main text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 14,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: '#c9a84c',
                marginBottom: 20,
                fontFamily: 'sans-serif',
              }}
            >
              Aberdeen &amp; Aberdeenshire
            </div>
            <div
              style={{
                fontSize: 86,
                lineHeight: 1.05,
                color: '#eae6df',
                fontFamily: 'serif',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>Matt Strohm</span>
              <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>Media</span>
            </div>
          </div>

          {/* Bottom — services */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
            }}
          >
            {['Photography', 'Videography', 'Web Design', 'Social Media', 'AI'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: 13,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: '#6a6560',
                    fontFamily: 'sans-serif',
                  }}
                >
                  {s}
                </span>
                {i < 4 && (
                  <span style={{ color: '#c9a84c', margin: '0 16px', fontSize: 13 }}>·</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
