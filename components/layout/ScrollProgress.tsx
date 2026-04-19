'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[10002] h-[2px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #c9a84c, #eae6df)' }}
    />
  );
}
