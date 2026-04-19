'use client';
import { useRef, useEffect } from 'react';
import { Reveal } from '@/components/primitives/Reveal';

export type Stat = { num: string; label: string };

function AnimatedNum({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) { el.textContent = value; return; }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    el.textContent = '0' + suffix;

    // Native IO — same pattern as Reveal, no framer-motion dependency
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(el);

      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // Cubic ease-out — fast start, settles confidently
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>0</span>;
}

export function Stats({ items }: { items: Stat[] }) {
  return (
    <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-12 py-20 border-y border-white/5 flex flex-wrap justify-between gap-8">
      {items.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.1} className="text-center flex-1 min-w-[140px]">
          <div className="font-display text-accent text-[clamp(2.5rem,5vw,4rem)]">
            <AnimatedNum value={s.num} />
          </div>
          <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-text-muted mt-2">{s.label}</div>
        </Reveal>
      ))}
    </div>
  );
}
