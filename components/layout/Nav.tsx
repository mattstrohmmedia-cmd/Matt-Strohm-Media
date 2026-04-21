'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import { Monogram } from '@/components/brand/Monogram';
import { Placeholder } from '@/components/primitives/Placeholder';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(0);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const brandOpacity = useTransform(scrollY, [0, 120], [1, 0]);
  const brandY = useTransform(scrollY, [0, 120], [0, -8]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  // Images for the menu right panel — keyed by nav.primary index
  // Home=0, About=1, Portfolio=2, Services=3, Contact=4
  const navImages: Record<number, string> = {
    0: '/images/video-bts-cafe-latte-portrait-2.jpg',
    1: '/images/video-bts-barbershop-portrait-2.jpg',
    2: '/images/Portfolio HERO.jpg',
    3: '/images/video-edit-timeline-closeup.jpg',
    4: '/images/video-edit-premiere-portrait-2.jpg',
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] px-6 sm:px-10 lg:px-12 py-6 flex items-center justify-between gap-4 ${
          open ? 'bg-bg/95 backdrop-blur-md' : 'bg-transparent'
        }`}
        style={{ transition: 'background-color 300ms cubic-bezier(0.23,1,0.32,1), backdrop-filter 300ms cubic-bezier(0.23,1,0.32,1)' }}
      >
        <Link href="/" aria-label="Matt Strohm Media — home">
          <motion.div
            style={{ opacity: brandOpacity, y: brandY }}
            className="flex items-center gap-4"
          >
            <Monogram size={36} data-nav-logo />
            <span className="block font-display text-[0.75rem] sm:text-[0.88rem] tracking-[0.18em] uppercase whitespace-nowrap font-bold">
              <span className="text-white">Matt Strohm </span><span className="text-accent">Media</span>
            </span>
          </motion.div>
        </Link>
        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center gap-2 text-bg bg-accent text-[0.65rem] font-bold tracking-[0.18em] uppercase px-5 py-2.5 active:scale-[0.97]"
          style={{ transition: 'background-color 180ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-accent-bright)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
        >
          Book Now
        </Link>
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-3 text-white text-[0.7rem] font-bold tracking-[0.25em] uppercase"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
          <div className="w-7 h-3.5 flex flex-col justify-between">
            <span className={`h-[1.5px] bg-white transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'translate-y-[6.25px] rotate-45' : ''}`} />
            <span className={`h-[1.5px] bg-white transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? '-translate-y-[6.25px] -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] bg-bg flex"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex-1 flex flex-col px-8 lg:px-24 pb-28 lg:pb-10 overflow-hidden" style={{ paddingTop: 'max(6.5rem, 14vh)' }}>
              {nav.primary.map((link, i) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoverIdx(i)}
                  >
                    <Link
                      href={link.href}
                      className={`font-display block py-2 ${active ? 'text-accent' : 'text-text-muted'}`}
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        transition: 'color 200ms cubic-bezier(0.23,1,0.32,1), transform 350ms cubic-bezier(0.23,1,0.32,1)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(10px)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.color = active ? 'var(--color-accent)' : ''; }}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 pt-6 border-t border-white/5"
              >
                {nav.services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="inline-block mr-8 mb-2 text-xs tracking-[0.15em] uppercase text-text-muted hover:text-accent transition-colors duration-300"
                  >
                    {s.label}
                  </Link>
                ))}
              </motion.div>

              <div className="mt-auto pt-6 text-xs text-text-muted tracking-wide">
                {site.location} · <a href={`mailto:${site.email}`} className="text-accent hover:text-accent-bright">{site.email}</a>
              </div>
            </div>

            <div className="hidden lg:block w-[45%] relative overflow-hidden bg-bg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoverIdx}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {navImages[hoverIdx] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={navImages[hoverIdx]} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  ) : (
                    <Placeholder label={`${nav.primary[hoverIdx]?.label ?? ''} image`} />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-bg/80 via-transparent to-accent/5" />

              {/* Services list overlay — shown when hovering the Services nav item */}
              <AnimatePresence>
                {hoverIdx === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 z-10 flex flex-col justify-end px-12 pb-14"
                    style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.97) 35%, rgba(5,5,5,0.55) 65%, transparent 100%)' }}
                    onMouseEnter={() => setHoverIdx(3)}
                  >
                    <p className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-accent/60 mb-5">Services</p>
                    {nav.services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="group flex items-center justify-between py-[0.6rem] border-b border-white/10 last:border-0 hover:border-accent/30 transition-colors duration-200"
                      >
                        <span className="font-display text-[1.35rem] text-text-muted group-hover:text-text transition-colors duration-200">
                          {s.label}
                        </span>
                        <span className="text-accent opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
