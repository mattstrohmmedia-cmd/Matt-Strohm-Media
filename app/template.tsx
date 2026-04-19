'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.995 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.005 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1], // strong ease-out — confident entrance
      }}
    >
      {children}
    </motion.div>
  );
}
