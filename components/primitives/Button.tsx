import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';
type BaseProps = { variant?: Variant; children: ReactNode; className?: string };

function variantClass(v: Variant) {
  if (v === 'primary') return 'btn-primary';
  if (v === 'outline') return 'btn-outline';
  return 'btn-ghost';
}

export function Button({ variant = 'primary', children, className = '', ...rest }: BaseProps & ComponentProps<'button'>) {
  return (
    <button className={`${variantClass(variant)} ${className}`} {...rest}>
      {children}
    </button>
  );
}

type LinkButtonProps = BaseProps & ComponentProps<typeof Link>;
export function ButtonLink({ variant = 'primary', children, className = '', ...rest }: LinkButtonProps) {
  return (
    <Link className={`${variantClass(variant)} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className={className} aria-hidden="true">
      <path d="M1 5H11M11 5L7 1M11 5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
