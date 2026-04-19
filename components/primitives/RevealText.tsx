'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = { lines: ReactNode[]; className?: string; baseDelay?: number };

export function RevealText({ lines, className, baseDelay = 0.4 }: Props) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={reduce ? { y: 0 } : { y: '110%' }}
            animate={reduce ? { y: 0 } : { y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: baseDelay + i * 0.15 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
