'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  /** How many px the element drifts as it scrolls through view (default 60) */
  strength?: number;
  className?: string;
};

export function Parallax({ children, strength = 60, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength / 2, strength / 2]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
