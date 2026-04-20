import { Reveal } from '@/components/primitives/Reveal';

export type ProcessStep = { title: string; text: string };

export function Process({ steps, title = 'The Process' }: { steps: ProcessStep[]; title?: string }) {
  return (
    <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-12 py-32">
      <Reveal><div className="section-label mb-6">How It Works</div></Reveal>
      <Reveal delay={0.1}><h2 className="section-title">{title}</h2></Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] mt-16">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={(i % 4) * 0.1}>
            <div className="relative bg-bg p-10 h-full">
              <div className="font-display text-accent text-2xl mb-4">0{i + 1}</div>
              <h3 className="font-display text-[1.35rem] mb-3">{step.title}</h3>
              <p className="text-base text-text-dim leading-[1.75]">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
