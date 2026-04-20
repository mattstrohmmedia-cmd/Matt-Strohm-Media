'use client';
import { useEffect, useRef } from 'react';

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Signal to CSS that the cursor is active so cursor:none can be applied safely
    document.documentElement.classList.add('cursor-active');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX, ringY = targetY;
    let dotX = targetX, dotY = targetY;
    let raf = 0;
    let paused = false;

    ring.style.opacity = '1';
    dot.style.opacity = '1';

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused && raf === 0) raf = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', onVisibility);

    const tick = () => {
      raf = 0;
      if (paused) return;
      if (reducedMotion) {
        // Snap directly — no smoothing
        ring.style.transform = `translate3d(${targetX - 8}px, ${targetY - 8}px, 0)`;
        dot.style.transform = `translate3d(${targetX - 2}px, ${targetY - 2}px, 0)`;
      } else {
        ringX += (targetX - ringX) * 0.3;
        ringY += (targetY - ringY) * 0.3;
        dotX += (targetX - dotX) * 0.15;
        dotY += (targetY - dotY) * 0.15;
        ring.style.transform = `translate3d(${ringX - 8}px, ${ringY - 8}px, 0)`;
        dot.style.transform = `translate3d(${dotX - 2}px, ${dotY - 2}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.('a, button, [data-cursor-hover], input, textarea, select, label')) {
        ring.classList.add('cursor--hover');
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.('a, button, [data-cursor-hover], input, textarea, select, label')) {
        ring.classList.remove('cursor--hover');
      }
    };
    const onDown = () => ring.classList.add('cursor--down');
    const onUp = () => ring.classList.remove('cursor--down');
    const onLeave = () => { ring.style.opacity = '0'; dot.style.opacity = '0'; };
    const onEnter = () => { ring.style.opacity = '1'; dot.style.opacity = '1'; };

    raf = requestAnimationFrame(tick);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-active');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('visibilitychange', onVisibility);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <style jsx global>{`
        .custom-cursor-ring,
        .custom-cursor-dot {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 10001;
          mix-blend-mode: normal;
          opacity: 0;
          transition: opacity 0.3s ease;
          will-change: transform;
        }
        .custom-cursor-ring {
          width: 16px; height: 16px;
          border: 1.5px solid #c9a84c;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(201, 168, 76, 0.3);
          transition: opacity 0.3s ease,
                      width 0.2s cubic-bezier(0.16,1,0.3,1),
                      height 0.2s cubic-bezier(0.16,1,0.3,1),
                      margin 0.2s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.2s ease, background-color 0.2s ease;
        }
        .custom-cursor-dot {
          width: 4px; height: 4px;
          background: #c9a84c;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(201, 168, 76, 0.8);
        }
        .custom-cursor-ring.cursor--hover {
          background: rgba(201, 168, 76, 0.1);
          border-color: #eae6df;
          width: 36px; height: 36px;
          margin: -10px 0 0 -10px;
        }
        .custom-cursor-ring.cursor--down {
          width: 12px; height: 12px;
          margin: 2px 0 0 2px;
        }
      `}</style>
    </>
  );
}
