import { Hero } from './Hero';
import { Split } from './Split';
import { Services } from './Services';
import { Stats } from './Stats';
import { Process } from './Process';
import { Testimonial } from './Testimonial';
import { Cta } from './Cta';
import { ButtonLink, Arrow } from '@/components/primitives/Button';
import type { ServicePage } from '@/content/services';
import { testimonials } from '@/content/testimonials';

export function ServicePageTemplate({ service }: { service: ServicePage }) {
  const t = service.slug === 'photography'
    ? testimonials.wedding
    : testimonials.business;

  return (
    <>
      <Hero
        short
        label={service.heroLabel}
        titleLines={[
          <>{service.heroTitle.before}<em className="italic text-accent">{service.heroTitle.accent}</em>{service.heroTitle.after}</>,
        ]}
        image={service.heroImage}
        placeholder={service.heroImage ? undefined : `${service.intro.title} · hero`}
      />

      <Split
        label={service.intro.label}
        title={service.intro.title}
        body={service.intro.body.map((p, i) => (
          <p key={i} className={i > 0 ? 'mt-6' : ''}>{p}</p>
        ))}
        image={service.introImage}
        placeholder={service.introImage ? undefined : 'Representative Image'}
        cta={<ButtonLink href="/contact">Start your project <Arrow /></ButtonLink>}
      />

      <Services
        label="What's Included"
        title={<>The <em className="italic text-accent">full</em> list</>}
        services={service.offers.map((o, i) => ({
          num: String(i + 1).padStart(2, '0'),
          title: o.title,
          text: o.text,
        }))}
      />

      <Process steps={service.process} title="The process" />

      {service.stats && <Stats items={service.stats} />}

      <Testimonial {...t} />

      <Cta title={<>Let&apos;s <em className="italic text-accent">get started</em>.</>} />
    </>
  );
}
