'use client';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

type Props = { onVerify: (token: string) => void; onExpire?: () => void };

export function Turnstile({ onVerify, onExpire }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>('');
  const siteKey = '0x4AAAAAADANtjlbo0BgL3t-';

  useEffect(() => {
    const mount = () => {
      if (!window.turnstile || !ref.current) return;
      idRef.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        size: 'flexible',
        theme: 'dark',
        callback: onVerify,
        'expired-callback': () => onExpire?.(),
      });
    };
    if (window.turnstile) mount();
    else window.onTurnstileLoad = mount;
    return () => {
      if (idRef.current && window.turnstile) {
        try { window.turnstile.remove(idRef.current); } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad" strategy="lazyOnload" />
      <div ref={ref} className="mt-2" />
    </>
  );
}
