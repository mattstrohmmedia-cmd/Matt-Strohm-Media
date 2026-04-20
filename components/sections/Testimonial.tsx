'use client';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/primitives/Reveal';

type Props = { quote: string; author?: string; role?: string; dark?: boolean };

export function Testimonial({ quote, author, role, dark = true }: Props) {
  return (
    <section className={`relative text-center px-6 sm:px-10 lg:px-12 py-32 overflow-hidden ${dark ? 'bg-bg-alt' : ''}`}>
      {/* Large decorative quote mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 left-1/2 -translate-x-1/2 font-display text-[12rem] leading-none text-accent/[0.04] select-none pointer-events-none"
        aria-hidden
      >
        &ldquo;
      </motion.div>

      <Reveal>
        <div className="section-label justify-center relative" style={{ display: 'inline-flex' }}>
          Client Feedback
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <blockquote
          className="font-display italic leading-[1.3] max-w-[820px] mx-auto mt-8 mb-8 text-text relative"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)' }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
      </Reveal>
      {author && (
        <Reveal delay={0.2}>
          <p className="text-sm font-semibold text-text-dim">{author}</p>
        </Reveal>
      )}
      {role && (
        <Reveal delay={0.3}>
          <p className="text-xs text-text-muted tracking-[0.1em] uppercase mt-1">{role}</p>
        </Reveal>
      )}
    </section>
  );
}
