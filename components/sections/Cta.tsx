'use client';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ButtonLink, Arrow } from '@/components/primitives/Button';
import { Reveal } from '@/components/primitives/Reveal';

type Props = {
  title: ReactNode;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Cta({
  title,
  text = "No hard sell, no awkward pitch. Just a quick chat about what you need and how I can help. The first call is always free.",
  ctaLabel = 'Book a free consultation',
  ctaHref = '/contact',
}: Props) {
  return (
    <section className="relative text-center px-6 sm:px-10 lg:px-12 py-40 overflow-hidden bg-bg-alt border-t border-b border-white/[0.05]" id="cta">
      {/* Static base glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 65%)' }}
      />
      {/* Pulsing animated glow layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 50%)' }}
      />
      <Reveal>
        <h2 className="font-display font-normal leading-[1.1] relative" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-base text-text-dim max-w-[500px] mx-auto mt-6 mb-12 relative">{text}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <ButtonLink href={ctaHref} className="relative">
          {ctaLabel} <Arrow />
        </ButtonLink>
      </Reveal>
    </section>
  );
}
