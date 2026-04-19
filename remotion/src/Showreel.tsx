import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  OffthreadVideo,
  Audio,
} from 'remotion';

// ─── Clip sources from E:\ drive ─────────────────────────────────────────────
// Mix of wedding (M+T) + event (Against the grain C02xx) footage
// Adjust the file indices below to pick your best shots.
// Each clip uses startFrom (skip leading frames) so you hit the interesting moment.

const CLIPS = [
  // Wedding — ring / ceremony / couple moments
  { src: 'file:///E:/K+A%20Wedding/M+T0065.MP4', startFrom: 0, durationInFrames: 120 },
  // Event — crowd / performance energy
  { src: 'file:///E:/Against%20the%20grain/raw%20footage/C0255.MP4', startFrom: 0, durationInFrames: 120 },
  // Wedding — golden hour / landscape
  { src: 'file:///E:/K+A%20Wedding/M+T0072.MP4', startFrom: 0, durationInFrames: 120 },
  // Event — stage / lights
  { src: 'file:///E:/Against%20the%20grain/raw%20footage/C0262.MP4', startFrom: 0, durationInFrames: 120 },
  // Wedding — wide / cinematic
  { src: 'file:///E:/K+A%20Wedding/M+T0078.MP4', startFrom: 0, durationInFrames: 120 },
  // Event — close energy
  { src: 'file:///E:/Against%20the%20grain/raw%20footage/C0268.MP4', startFrom: 0, durationInFrames: 120 },
];

const CROSSFADE = 20; // frames overlap between clips
const FPS = 30;

// ─── Clip with crossfade fade-in/out ─────────────────────────────────────────
function Clip({
  src, startFrom, localDuration, isFirst, isLast,
}: {
  src: string;
  startFrom: number;
  localDuration: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const frame = useCurrentFrame();

  // Build input/output ranges that are strictly increasing (no duplicate values)
  let inputRange: number[];
  let outputRange: number[];
  if (isFirst && isLast) {
    inputRange = [0, localDuration];
    outputRange = [1, 1];
  } else if (isFirst) {
    // No fade-in needed, fade out at end
    inputRange = [0, localDuration - CROSSFADE, localDuration];
    outputRange = [1, 1, 0];
  } else if (isLast) {
    // Fade in at start, no fade-out needed
    inputRange = [0, CROSSFADE, localDuration];
    outputRange = [0, 1, 1];
  } else {
    inputRange = [0, CROSSFADE, localDuration - CROSSFADE, localDuration];
    outputRange = [0, 1, 1, 0];
  }
  const opacity = interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, localDuration], [1.04, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ width: '100%', height: '100%', transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={src}
          startFrom={startFrom}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          muted
        />
      </div>
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
}

// ─── Intro title card ─────────────────────────────────────────────────────────
function IntroCard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const logoScale = interpolate(spring({ frame, fps, config: { damping: 12, stiffness: 60 } }), [0, 1], [0.9, 1]);
  const wordOpacity = spring({ frame: frame - 12, fps, config: { damping: 18, stiffness: 80 } });
  const wordY = interpolate(spring({ frame: frame - 12, fps, config: { damping: 14, stiffness: 70 } }), [0, 1], [14, 0]);

  return (
    <AbsoluteFill
      style={{
        background: '#080808',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Monogram */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          fontFamily: "'Instrument Serif', serif",
          fontSize: 96,
          color: '#c9a84c',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          fontWeight: 400,
        }}
      >
        M
      </div>
      {/* Wordmark */}
      <div
        style={{
          opacity: wordOpacity,
          transform: `translateY(${wordY}px)`,
          fontFamily: "'Syne', sans-serif",
          fontSize: 13,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        Matt Strohm Media
      </div>
      {/* Thin gold rule */}
      <div
        style={{
          opacity: wordOpacity,
          width: 40,
          height: 1,
          background: 'rgba(201,168,76,0.4)',
          marginTop: 4,
        }}
      />
    </AbsoluteFill>
  );
}

// ─── Lower-third text overlay ─────────────────────────────────────────────────
function LowerThird({ label, delay = 0 }: { label: string; delay?: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 100 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [-20, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 80px 80px' }}>
      <div
        style={{
          opacity,
          transform: `translateX(${x}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div style={{ width: 30, height: 1, background: '#c9a84c', opacity: 0.7 }} />
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {label}
        </span>
      </div>
    </AbsoluteFill>
  );
}

// ─── Outro card ───────────────────────────────────────────────────────────────
function OutroCard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const logoProgress = spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 70 } });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoY = interpolate(logoProgress, [0, 1], [20, 0]);

  const tagProgress = spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 70 } });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);
  const tagY = interpolate(tagProgress, [0, 1], [10, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `rgba(8,8,8,${bgOpacity})`,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div
        style={{
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
          fontFamily: "'Instrument Serif', serif",
          fontSize: 72,
          color: '#c9a84c',
          letterSpacing: '-0.02em',
          fontWeight: 400,
        }}
      >
        M
      </div>
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          fontFamily: "'Syne', sans-serif",
          fontSize: 11,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        Matt Strohm Media
      </div>
      <div
        style={{
          opacity: tagOpacity,
          fontFamily: "'Syne', sans-serif",
          fontSize: 10,
          color: 'rgba(201,168,76,0.5)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: 4,
          fontWeight: 400,
        }}
      >
        Aberdeen · Aberdeenshire
      </div>
    </AbsoluteFill>
  );
}

// ─── Lower-third labels per clip ──────────────────────────────────────────────
const CLIP_LABELS = [
  'Weddings',
  'Events',
  'Weddings',
  'Events',
  'Weddings',
  'Events',
];

// ─── Main composition ─────────────────────────────────────────────────────────
export const Showreel: React.FC = () => {
  const INTRO_DURATION = 60;   // 2s intro title
  const OUTRO_DURATION = 60;   // 2s outro card

  // Build clip sequence timeline
  // Each clip starts CROSSFADE frames before the previous one ended (overlap)
  let clipOffsets: number[] = [];
  let offset = INTRO_DURATION;
  for (let i = 0; i < CLIPS.length; i++) {
    clipOffsets.push(offset);
    offset += CLIPS[i].durationInFrames - (i < CLIPS.length - 1 ? CROSSFADE : 0);
  }
  const contentEnd = offset;
  const totalDuration = contentEnd + OUTRO_DURATION;

  return (
    <AbsoluteFill style={{ background: '#080808' }}>
      {/* ── Intro ── */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroCard />
      </Sequence>

      {/* ── Clips ── */}
      {CLIPS.map((clip, i) => {
        const from = clipOffsets[i];
        const dur = clip.durationInFrames;
        return (
          <React.Fragment key={i}>
            <Sequence from={from} durationInFrames={dur}>
              <Clip
                src={clip.src}
                startFrom={clip.startFrom}
                localDuration={dur}
                isFirst={i === 0}
                isLast={i === CLIPS.length - 1}
              />
            </Sequence>
            {/* Lower third — appears 20f into each clip */}
            <Sequence from={from + 20} durationInFrames={Math.min(60, dur - 30)}>
              <LowerThird label={CLIP_LABELS[i]} delay={0} />
            </Sequence>
          </React.Fragment>
        );
      })}

      {/* ── Outro ── */}
      <Sequence from={contentEnd} durationInFrames={OUTRO_DURATION}>
        <OutroCard />
      </Sequence>
    </AbsoluteFill>
  );
};

export const SHOWREEL_DURATION_FRAMES = (() => {
  const INTRO_DURATION = 60;
  const OUTRO_DURATION = 60;
  let offset = INTRO_DURATION;
  for (let i = 0; i < CLIPS.length; i++) {
    offset += CLIPS[i].durationInFrames - (i < CLIPS.length - 1 ? CROSSFADE : 0);
  }
  return offset + OUTRO_DURATION;
})();
