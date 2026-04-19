'use client';
import { useRef, useCallback } from 'react';

/**
 * Subtle magnetic tilt effect — element tilts slightly toward the cursor.
 * Usage: spread `...magnetic` onto the element's props.
 */
export function useMagnetic(strength = 8) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(600px) rotateY(${dx * strength}deg) rotateX(${-dy * strength}deg) scale(1.02)`;
    el.style.transition = 'transform 0.1s ease-out';
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
