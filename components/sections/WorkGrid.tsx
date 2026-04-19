'use client';
import { Reveal } from '@/components/primitives/Reveal';
import { Placeholder } from '@/components/primitives/Placeholder';
import { useMagnetic } from '@/lib/useMagnetic';

export type WorkItem = {
  title: string;
  category: string;
  image?: string;
  placeholder?: string;
  aspect?: 'wide' | 'square';
  objectPosition?: string;
};

function WorkTile({ item, isWide, offsetClass }: { item: WorkItem; isWide: boolean; offsetClass: string }) {
  const magnetic = useMagnetic(4);
  return (
    <div
      ref={magnetic.ref as React.RefObject<HTMLDivElement>}
      onMouseMove={magnetic.onMouseMove as React.MouseEventHandler<HTMLDivElement>}
      onMouseLeave={magnetic.onMouseLeave}
      className={`group relative overflow-hidden ${isWide ? 'aspect-[16/10]' : 'aspect-square'} ${offsetClass}`}
    >
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          style={{ objectPosition: item.objectPosition ?? 'center' }}
        />
      ) : (
        <div className="w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
          <Placeholder label={item.placeholder ?? item.title} />
        </div>
      )}
      <div
        className="absolute inset-0 flex flex-col justify-end p-8 group-hover:[clip-path:inset(0_0_0_0)]"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.2) 55%, transparent 100%)',
          clipPath: 'inset(100% 0 0 0)',
          transition: 'clip-path 550ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-accent mb-2 translate-y-3 group-hover:translate-y-0 [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1)_60ms]">{item.category}</span>
        <span className="font-display text-2xl translate-y-3 group-hover:translate-y-0 [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1)_110ms]">{item.title}</span>
      </div>
    </div>
  );
}

export function WorkGrid({ items, staggered = true }: { items: WorkItem[]; staggered?: boolean }) {
  return (
    <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4 mt-16">
      {items.map((item, i) => {
        const isWide = item.aspect === 'wide' || (item.aspect == null && (i === 0 || i === 3));
        const offsetClass = staggered
          ? i === 1 ? 'md:mt-16' : i === 3 ? 'md:-mt-16' : ''
          : '';
        return (
          <Reveal key={i} delay={(i % 4) * 0.12} variant="clip">
            <WorkTile item={item} isWide={isWide} offsetClass={offsetClass} />
          </Reveal>
        );
      })}
    </div>
  );
}
