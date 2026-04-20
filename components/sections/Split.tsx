import type { ReactNode } from 'react';
import { Reveal } from '@/components/primitives/Reveal';
import { Placeholder } from '@/components/primitives/Placeholder';
import { Parallax } from '@/components/primitives/Parallax';

type Props = {
  label?: string;
  title: ReactNode;
  body: ReactNode;
  image?: string;
  objectPosition?: string;
  aspect?: string;
  placeholder?: string;
  placeholderCategory?: string;
  reverse?: boolean;
  cta?: ReactNode;
};

export function Split({ label, title, body, image, objectPosition = 'center', aspect = '3/4', placeholder, placeholderCategory = 'split', reverse, cta }: Props) {
  return (
    <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-12 py-28">
      <div className={`grid gap-10 lg:gap-24 items-center ${reverse ? 'lg:grid-cols-[1fr_1fr] lg:[&>*:first-child]:order-2' : 'lg:grid-cols-[1fr_1fr]'}`}>
        <Reveal variant="slide-left">
          <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
            <Parallax strength={40} className="absolute inset-0 scale-110">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition }} />
              ) : (
                <Placeholder label={placeholder} />
              )}
            </Parallax>
            <div className="absolute inset-0 border border-white/5 pointer-events-none" />
          </div>
        </Reveal>
        <div>
          {label && <Reveal variant="slide-right"><div className="section-label mb-6">{label}</div></Reveal>}
          <Reveal variant="slide-right" delay={0.1}><h2 className="section-title">{title}</h2></Reveal>
          <Reveal variant="slide-right" delay={0.2}><div className="section-text">{body}</div></Reveal>
          {cta && <Reveal variant="slide-right" delay={0.3}><div className="mt-10">{cta}</div></Reveal>}
        </div>
      </div>
    </section>
  );
}
