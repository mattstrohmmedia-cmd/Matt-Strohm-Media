import { Reveal } from '@/components/primitives/Reveal';
import { ButtonLink, Arrow } from '@/components/primitives/Button';
import type { Package } from '@/content/services';

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Packages({ packages }: { packages: Package[] }) {
  return (
    <section style={{ background: '#111111' }} className="py-28">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-12">
        <Reveal variant="slide-left">
          <div className="section-label mb-6">Pricing</div>
        </Reveal>
        <Reveal variant="slide-left" delay={0.1}>
          <h2 className="section-title mb-16">
            Simple, <em className="italic text-accent">transparent</em> pricing.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.1} variant={i === 0 ? 'slide-left' : i === 2 ? 'slide-right' : 'fade'}>
              <div
                className={`relative flex flex-col h-full p-10 ${
                  pkg.highlight
                    ? 'bg-surface border border-accent/40'
                    : 'bg-bg border border-white/[0.06]'
                }`}
              >
                {/* Top accent bar on highlighted card */}
                {pkg.highlight && (
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-accent" />
                )}

                {pkg.priceNote && (
                  <div className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-accent mb-4">
                    {pkg.priceNote}
                  </div>
                )}

                <h3 className="font-display text-[1.4rem] mb-2">{pkg.name}</h3>
                <div className={`font-display text-[2.2rem] leading-none mb-8 ${pkg.highlight ? 'text-accent' : 'text-text'}`}>
                  {pkg.price}
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.875rem] text-text-dim leading-snug">
                      <span className={`mt-0.5 shrink-0 ${pkg.highlight ? 'text-accent' : 'text-text-muted'}`}>
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/contact"
                  variant={pkg.highlight ? 'primary' : 'outline'}
                >
                  Get a quote <Arrow />
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="text-center text-sm text-text-muted mt-10">
            All prices are a starting guide — every project is different.{' '}
            <a href="/contact" className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors duration-150">
              Get in touch
            </a>{' '}
            for an exact quote.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
