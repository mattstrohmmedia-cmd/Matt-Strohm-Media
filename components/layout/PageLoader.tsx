'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monogram } from '@/components/brand/Monogram';

type FlyTarget = { x: number; y: number; scale: number };

export function PageLoader() {
  const [phase, setPhase] = useState<'show' | 'fly' | 'done'>('show');
  const [flyTarget, setFlyTarget] = useState<FlyTarget>({ x: 0, y: 0, scale: 1 });
  const logoRef = useRef<HTMLDivElement>(null);

  // Measure delta from loader logo centre → nav logo centre
  useLayoutEffect(() => {
    const measure = () => {
      const navLogo = document.querySelector('[data-nav-logo]');
      const loaderLogo = logoRef.current;
      if (!navLogo || !loaderLogo) return;
      const nav = navLogo.getBoundingClientRect();
      const src = loaderLogo.getBoundingClientRect();
      setFlyTarget({
        x: nav.left + nav.width / 2 - (src.left + src.width / 2),
        y: nav.top + nav.height / 2 - (src.top + src.height / 2),
        scale: nav.height / src.height,
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fly'), 1000);
    const t2 = setTimeout(() => setPhase('done'), 1950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader-bg"
        className="fixed inset-0 z-[10000] bg-bg flex items-center justify-center pointer-events-none"
        animate={phase === 'fly' ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Wordmark — fades out early as the logo starts flying */}
        <motion.div
          className="absolute flex flex-col items-center gap-5"
          animate={phase === 'fly' ? { opacity: 0 } : {}}
          transition={{ duration: 0.25, ease: 'easeIn' }}
        >
          {/* invisible spacer so wordmark sits below the logo */}
          <div style={{ height: 96 }} />
          <motion.span
            className="font-display text-white text-[1.1rem] tracking-[0.32em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'show' ? 1 : 0, y: phase === 'show' ? 0 : 10 }}
            transition={{ duration: 0.6, delay: phase === 'show' ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            Matt Strohm{' '}
            <em className="not-italic" style={{ fontStyle: 'italic', color: '#c9a84c' }}>Media</em>
          </motion.span>
        </motion.div>

        {/* Logo — fades in, then flies diagonally to the nav position */}
        <motion.div
          ref={logoRef}
          className="absolute"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            phase === 'show'
              ? { opacity: 1, scale: 1, x: 0, y: 0 }
              : {
                  opacity: 0,
                  scale: flyTarget.scale,
                  x: flyTarget.x,
                  y: flyTarget.y,
                }
          }
          transition={
            phase === 'show'
              ? { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
              : {
                  duration: 0.72,
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.3, delay: 0.42 },
                }
          }
        >
          <Monogram size={96} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
