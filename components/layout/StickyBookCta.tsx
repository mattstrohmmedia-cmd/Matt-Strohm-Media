'use client';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { Arrow } from '@/components/primitives/Button';

export function StickyBookCta() {
  const [scrolled, setScrolled] = useState(false);
  const [nearForm, setNearForm] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById('contact-form');
    if (!form) { setNearForm(false); return; }
    const io = new IntersectionObserver(
      ([entry]) => setNearForm(entry.isIntersecting),
      { rootMargin: '0px 0px -20% 0px' }
    );
    io.observe(form);
    return () => io.disconnect();
  }, []);

  const visible = (scrolled || isMobile()) && !nearForm;
  const href = site.bookingMode === 'cal' && site.calUrl ? site.calUrl : '/contact#contact-form';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-[90]"
        >
          <Link
            href={href}
            className="inline-flex items-center gap-3 bg-accent text-bg font-bold uppercase text-[0.65rem] tracking-[0.2em] px-5 py-3.5 rounded-full shadow-[0_10px_40px_rgba(201,168,76,0.35)] hover:bg-accent-bright hover:-translate-y-0.5 transition-all duration-300"
          >
            Book a call
            <Arrow />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}
