'use client';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type Variant = 'fade' | 'clip' | 'slide-left' | 'slide-right';
type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span' | 'li';
  variant?: Variant;
};

// Strong ease-out-expo — confident, cinematic deceleration
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function Reveal({ children, delay = 0, y = 36, className = '', as = 'div', variant = 'fade' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in viewport on mount — stay visible, no animation
    const { top } = el.getBoundingClientRect();
    if (top < window.innerHeight - 20) return;

    // Hide element directly on DOM (no React state = no re-render = no jank)
    // PageLoader covers this on first load so user never sees the switch
    if (variant === 'slide-left')       { el.style.opacity = '0'; el.style.transform = 'translateX(-40px)'; }
    else if (variant === 'slide-right') { el.style.opacity = '0'; el.style.transform = 'translateX(40px)';  }
    else if (variant === 'clip')        { el.style.opacity = '0'; el.style.clipPath = 'inset(0 0 100% 0)';  }
    else                                { el.style.opacity = '0'; el.style.transform = `translateY(${y}px)`;  }

    const from: Keyframe =
      variant === 'slide-left'  ? { opacity: 0, transform: 'translateX(-40px)' } :
      variant === 'slide-right' ? { opacity: 0, transform: 'translateX(40px)'  } :
      variant === 'clip'        ? { opacity: 0, clipPath: 'inset(0 0 100% 0)'  } :
                                  { opacity: 0, transform: `translateY(${y}px)` };

    const to: Keyframe =
      variant === 'clip'
        ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
        : { opacity: 1, transform: 'translate(0,0)' };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(el);

      // WAAPI — hardware-accelerated, runs off main thread unlike framer-motion x/y props
      const anim = el.animate([from, to], {
        duration: variant === 'clip' ? 900 : 720,
        delay: delay * 1000,
        fill: 'both',   // applies `from` immediately so no flash during delay
        easing: EASE,
      });

      anim.onfinish = () => {
        // Commit final state as inline styles, then release WAAPI
        el.style.opacity = '1';
        el.style.transform = '';
        el.style.clipPath = '';
        anim.cancel();
      };
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, variant, y]);

  if (as === 'span') return <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>{children}</span>;
  if (as === 'li')   return <li   ref={ref as React.RefObject<HTMLLIElement>}   className={className}>{children}</li>;
  return <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>{children}</div>;
}
