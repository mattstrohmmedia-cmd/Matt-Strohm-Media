'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Reveal } from '@/components/primitives/Reveal';

type PanelService = {
  num: string;
  title: string;
  href: string;
  image?: string;
};

type Props = {
  services: PanelService[];
  defaultImage?: string;
  label?: string;
  title?: React.ReactNode;
  text?: string;
};

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServicesPanel({ services, defaultImage, label, title, text }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const activeImage =
    activeIdx !== null && services[activeIdx]?.image
      ? services[activeIdx].image
      : defaultImage;

  return (
    <section className="relative overflow-hidden flex flex-col justify-center py-28">
      {/* Background — crossfades between service images */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage ?? 'none'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {activeImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlay — heavier on left so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/[0.97] via-bg/[0.88] to-bg/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-bg/30" />
      </div>

      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-12 w-full">
        {/* Optional header */}
        {(label || title || text) && (
          <div className="mb-14">
            {label && (
              <Reveal variant="fade">
                <div className="section-label mb-4">{label}</div>
              </Reveal>
            )}
            {title && (
              <Reveal variant="fade" delay={0.1}>
                <h2 className="section-title">{title}</h2>
              </Reveal>
            )}
            {text && (
              <Reveal variant="fade" delay={0.2}>
                <p className="section-text">{text}</p>
              </Reveal>
            )}
          </div>
        )}

        {/* Service rows */}
        <div className="border-t border-white/10">
          {services.map((s, i) => (
            <Reveal key={s.href} delay={i * 0.06} variant="slide-left">
              <Link
                href={s.href}
                className="group flex items-center justify-between gap-6 py-7 border-b border-white/10 transition-colors duration-300 hover:border-accent/30"
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <div className="flex items-center gap-7 min-w-0">
                  <span className="shrink-0 text-[0.65rem] font-bold tracking-[0.2em] text-accent/50 group-hover:text-accent transition-colors duration-300">
                    {s.num}
                  </span>
                  <span
                    className="font-display truncate transition-colors duration-300 text-text-muted group-hover:text-text"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)' }}
                  >
                    {s.title}
                  </span>
                </div>
                <span className="shrink-0 text-accent opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <ArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
