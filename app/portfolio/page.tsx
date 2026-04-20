import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { WorkGrid } from '@/components/sections/WorkGrid';
import { Testimonial } from '@/components/sections/Testimonial';
import { Cta } from '@/components/sections/Cta';
import { Reveal } from '@/components/primitives/Reveal';
import { pageMetadata } from '@/lib/seo';
import { portfolio } from '@/content/portfolio';
import { testimonials } from '@/content/testimonials';

export const metadata = pageMetadata({
  title: 'Portfolio — Photography & Video Work, Aberdeen',
  description: 'Selected photography, videography, commercial and web work from across Aberdeen, Aberdeenshire and Scotland. Weddings, brands, events, and automotive.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <Hero
        short
        label="Selected Work"
        titleLines={[<>Recent</>, <><em className="italic text-accent">projects</em>.</>]}
        image="/images/Portfolio HERO.jpg"
      />

      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-12 pt-16">
        <Reveal>
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-y border-white/5 py-5">
            {portfolio.map(cat => (
              <Link
                key={cat.slug}
                href={`#${cat.slug}`}
                className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-text-dim hover:text-accent transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {portfolio.map(cat => (
        <section key={cat.slug} id={cat.slug} className="max-w-container mx-auto px-6 sm:px-10 lg:px-12 pt-24 scroll-mt-24">
          <Reveal><div className="section-label mb-6">{cat.label}</div></Reveal>
          <Reveal delay={0.1}><h2 className="section-title">{cat.title}</h2></Reveal>
          <Reveal delay={0.2}><p className="section-text mb-4">{cat.blurb}</p></Reveal>
          <WorkGrid items={cat.items} />
        </section>
      ))}

      <div className="h-32" />
      <Testimonial {...testimonials.automotive} />
      <Cta title={<>Like what you see?<br/><em className="italic text-accent">Let&apos;s build yours.</em></>} />
    </>
  );
}
