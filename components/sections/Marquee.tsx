'use client';
import { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useAnimationFrame } from 'framer-motion';

const items = [
  'Photography', 'Videography', 'Web Design', 'Social Media',
  'Meta Ads', 'AI Automation', 'Brand Strategy', 'Content Creation',
];

export function Marquee() {
  const doubled = [...items, ...items];
  const baseSpeed = -40; // px/s baseline
  const x = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  // Map scroll velocity to an additional speed multiplier
  const velocityFactor = useTransform(scrollVelocity, [-3000, 0, 3000], [4, 1, 4]);

  useAnimationFrame((_, delta) => {
    const el = containerRef.current;
    if (!el) return;
    const speed = baseSpeed * velocityFactor.get() * (delta / 1000);
    x.current += speed;
    // Reset when one set scrolled past to create seamless loop
    const halfWidth = el.scrollWidth / 2;
    if (Math.abs(x.current) >= halfWidth) x.current = 0;
    el.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div className="py-12 border-y border-white/5 overflow-hidden">
      <div ref={containerRef} className="flex w-max will-change-transform">
        {doubled.map((label, i) => (
          <span key={i} className="flex-shrink-0 px-12 font-display text-xl text-text-muted whitespace-nowrap flex items-center gap-8">
            {label}
            <span className="text-[0.5rem] text-accent/50" aria-hidden>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
