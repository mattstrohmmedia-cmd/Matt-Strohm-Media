import { Reveal } from '@/components/primitives/Reveal';

export type FaqItem = { q: string; a: string };

export function Faq({ items, title = 'Common Questions' }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="max-w-[820px] mx-auto px-6 sm:px-10 lg:px-12 py-24">
      <Reveal>
        <div className="section-label mb-6">FAQ</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="section-title mb-10">{title}</h2>
      </Reveal>
      <div className="divide-y divide-white/5 border-y border-white/5">
        {items.map((f, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <details className="group py-5 px-1">
              <summary className="flex justify-between items-center cursor-pointer list-none font-display text-lg text-text group-hover:text-accent transition-colors">
                <span>{f.q}</span>
                <span className="w-5 h-5 flex items-center justify-center text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="text-sm text-text-dim leading-[1.8] mt-3 max-w-[640px]">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
