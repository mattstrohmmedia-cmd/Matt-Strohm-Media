import Link from 'next/link';
import { Reveal } from '@/components/primitives/Reveal';
import { Arrow, ButtonLink } from '@/components/primitives/Button';

export type Service = {
  num: string;
  title: string;
  text: string;
  href?: string;
  icon?: string;
};

export function Services({
  label = 'What I Do', title, text, services, showCtaCard = true, centered = false,
}: { label?: string; title: React.ReactNode; text?: string; services: Service[]; showCtaCard?: boolean; centered?: boolean }) {
  return (
    <section id="services" className="py-28">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-12">
        <div className={centered ? 'text-center mb-16' : 'mb-16'}>
          <Reveal variant={centered ? 'fade' : 'slide-left'}>
            <div className={`section-label mb-6 ${centered ? 'justify-center' : ''}`} style={centered ? { display: 'inline-flex' } : {}}>{label}</div>
          </Reveal>
          <Reveal variant={centered ? 'fade' : 'slide-left'} delay={0.1}><h2 className="section-title">{title}</h2></Reveal>
          {text && <Reveal variant={centered ? 'fade' : 'slide-left'} delay={0.2}><p className={`section-text ${centered ? 'mx-auto' : ''}`}>{text}</p></Reveal>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={(i % 3) * 0.08} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
          {showCtaCard && (
            <Reveal delay={0.2}>
              <div className="relative flex flex-col items-center justify-center text-center p-10 h-full min-h-[260px] border border-accent/30 transition-all duration-500 hover:-translate-y-1"
                style={{ background: 'rgba(201,168,76,0.04)' }}>
                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent" />
                <h3 className="font-display text-[1.5rem] text-accent mb-3">Ready to start?</h3>
                <p className="text-sm text-text-dim mb-6 max-w-[220px]">Every project starts with a conversation. Let&apos;s talk.</p>
                <ButtonLink href="/contact">
                  Get in touch <Arrow />
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ num, title, text, href, icon }: Service) {
  const inner = (
    <div className="group relative bg-surface border border-white/[0.06] p-10 h-full overflow-hidden [transition:transform_220ms_cubic-bezier(0.23,1,0.32,1),border-color_220ms_cubic-bezier(0.23,1,0.32,1),box-shadow_220ms_cubic-bezier(0.23,1,0.32,1)] hover:[-translate-y-1.5] hover:[border-color:rgba(255,255,255,0.12)] hover:[box-shadow:0_20px_60px_rgba(0,0,0,0.4)]">
      {/* Gold top bar — scales in from left on hover */}
      <span className="absolute top-0 left-0 w-full h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 [transition:transform_500ms_cubic-bezier(0.23,1,0.32,1)]" />
      {icon && <div className="text-3xl mb-5">{icon}</div>}
      <div className="font-display text-[3rem] leading-none text-accent/15 mb-5">{num}</div>
      <h3 className="font-display text-[1.4rem] mb-3 group-hover:text-accent [transition:color_180ms_cubic-bezier(0.23,1,0.32,1)]">{title}</h3>
      <p className="text-[0.9rem] text-text-dim leading-[1.75] mb-6">{text}</p>
      {href && (
        <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.15em] uppercase text-accent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 [transition:opacity_250ms_cubic-bezier(0.23,1,0.32,1),transform_250ms_cubic-bezier(0.23,1,0.32,1)]">
          Learn More <Arrow />
        </span>
      )}
    </div>
  );
  return href ? <Link href={href} className="block h-full">{inner}</Link> : inner;
}
