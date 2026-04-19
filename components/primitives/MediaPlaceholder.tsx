import { motion } from 'framer-motion';

type Props = {
  className?: string;
  label?: string;
};

export function MediaPlaceholder({ className, label }: Props) {
  return (
    <div className={`relative w-full h-full bg-surface overflow-hidden ${className ?? ''}`}>
      {/* Gold shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: ['−100%', '200%'] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.06) 40%, rgba(201,168,76,0.12) 50%, rgba(201,168,76,0.06) 60%, transparent 100%)',
        }}
      />
      {label && (
        <span className="absolute inset-0 flex items-center justify-center text-[0.6rem] tracking-[0.25em] uppercase text-text-muted/40 select-none">
          {label}
        </span>
      )}
    </div>
  );
}
