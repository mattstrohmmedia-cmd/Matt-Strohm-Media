'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RevealText } from '@/components/primitives/RevealText';
import { ButtonLink, Arrow } from '@/components/primitives/Button';
import { Placeholder } from '@/components/primitives/Placeholder';
import { Parallax } from '@/components/primitives/Parallax';
import type { ReactNode } from 'react';

type Props = {
  label: string;
  titleLines: ReactNode[];
  subtitle?: string;
  image?: string;
  video?: string;
  mobileVideo?: string;
  poster?: string;
  placeholder?: string;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  short?: boolean;
};

export function Hero({
  label, titleLines, subtitle, image, video, mobileVideo, poster, placeholder,
  ctaHref = '/contact', ctaLabel = 'Book a free consultation',
  secondaryHref, secondaryLabel,
  short = false,
}: Props) {
  // Pick the right video src client-side so iOS gets the lightweight version
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!video) return;
    const src = (mobileVideo && window.innerWidth < 768) ? mobileVideo : video;
    setActiveSrc(src);
  }, [video, mobileVideo]);

  return (
    <section
      className={`relative overflow-hidden flex items-center ${
        short ? 'min-h-[70vh]' : 'min-h-screen'
      }`}
    >
      {/* Background — full screen, nav floats transparently over it */}
      <div className="absolute inset-0 z-0">
        {video ? (
          /* Video — no parallax, avoids GPU re-compositing on every scroll frame */
          <div className="absolute inset-0">
            {poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt=""
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            )}
            {activeSrc && (
              <video
                key={activeSrc}
                className="absolute inset-0 w-full h-full object-cover object-center"
                autoPlay muted loop playsInline
                preload="auto"
              >
                <source src={activeSrc} type="video/mp4" />
              </video>
            )}
          </div>
        ) : (
          <Parallax strength={60} className="absolute inset-0 scale-110">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
            ) : (
              <Placeholder label={placeholder} />
            )}
          </Parallax>
        )}
        {/* Strong gradient at bottom for text legibility, subtle at top for nav blending */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.95) 100%)' }} />
      </div>

      {/* Content — anchored to bottom, padded well clear of nav */}
      <div
        className={`relative z-10 w-full max-w-container mx-auto px-6 sm:px-10 lg:px-12 ${
          short
            ? 'pt-32 pb-20'
            : 'pt-28 pb-20'
        }`}
      >
        {label && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="section-label mb-8"
          >
            {label}
          </motion.div>
        )}

        <h1 className={`font-display font-normal leading-[1.05] tracking-tight max-w-[900px] ${short ? 'text-[clamp(2.5rem,6.5vw,5.5rem)]' : 'text-[clamp(3rem,8vw,7rem)]'}`}>
          <RevealText lines={titleLines} />
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-[1.05rem] text-text-dim leading-[1.8] max-w-[560px]"
          >
            {subtitle}
          </motion.p>
        )}

        {!short && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-end justify-between gap-6"
          >
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={ctaHref}>
                {ctaLabel} <Arrow />
              </ButtonLink>
              {secondaryHref && secondaryLabel && (
                <ButtonLink href={secondaryHref} variant="outline">
                  {secondaryLabel}
                </ButtonLink>
              )}
            </div>
            <div className="hidden md:flex items-center gap-3 text-[0.6rem] tracking-[0.25em] uppercase text-text-muted [writing-mode:vertical-rl]">
              Scroll
              <span className="w-px h-12 bg-text-muted animate-scrollPulse block" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
