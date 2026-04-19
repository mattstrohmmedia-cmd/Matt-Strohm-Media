'use client';
import { Reveal } from '@/components/primitives/Reveal';
import { Placeholder } from '@/components/primitives/Placeholder';
import { site } from '@/lib/site';
import { motion } from 'framer-motion';

const tiles: { label: string; image?: string; objectPosition?: string }[] = [
  { label: 'Wedding',        image: '/images/Wedding SHOT.jpg',                    objectPosition: 'center' },
  { label: 'Automotive',     image: '/images/CAR SHOT.jpg',                        objectPosition: 'center' },
  { label: 'Landscape',      image: '/images/LANDSCAPE.jpeg',                      objectPosition: 'center' },
  { label: 'Portrait',       image: '/images/Portrait shot.jpg',                   objectPosition: 'top'    },
  { label: 'Behind Scenes',  image: '/images/BTS Shot.png',                        objectPosition: 'center' },
  { label: 'Event',          image: '/images/Event Shot.jpg',                      objectPosition: 'center' },
];

export function Instagram() {
  return (
    <section className="overflow-hidden">
      <Reveal>
        <div className="text-center py-16 px-6">
          <div className="section-label justify-center" style={{ display: 'inline-flex' }}>Follow Along</div>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="font-display text-2xl block mt-4 hover:text-accent transition-colors">
            {site.instagramHandle}
          </a>
        </div>
      </Reveal>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-[3px]">
        {tiles.map((t, i) => (
          <motion.a
            key={i}
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square overflow-hidden relative group"
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              {t.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.image}
                  alt={t.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: t.objectPosition ?? 'center' }}
                />
              ) : (
                <Placeholder label={t.label} />
              )}
            </div>
            <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
