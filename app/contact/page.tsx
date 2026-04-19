import { Hero } from '@/components/sections/Hero';
import { ContactForm } from '@/components/forms/ContactForm';
import { Faq } from '@/components/sections/Faq';
import { Reveal } from '@/components/primitives/Reveal';
import { pageMetadata } from '@/lib/seo';
import { contactFaqs } from '@/content/faqs';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Start a conversation about your wedding, business, or project. First call is always free.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <Hero
        short
        label="Contact"
        titleLines={[<>Let&apos;s</>, <><em className="italic text-accent">talk</em>.</>]}
        image="/images/BTS Shot.png"
      />

      <section className="max-w-container mx-auto px-6 sm:px-10 lg:px-12 py-24">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <Reveal><div className="section-label mb-6">Start Here</div></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">Tell me about your <em className="italic text-accent">project</em>.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="section-text">
                Fill in as much or as little as you like. The more you tell me, the more useful my first reply will be.
                No hard sell, no drip-feed sequences — just a human reply within a working day.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 space-y-5 text-sm text-text-dim">
                <InfoRow label="Email" value={<a href={`mailto:${site.email}`} className="text-accent hover:text-accent-bright transition-colors">{site.email}</a>} />
                <InfoRow label="Based" value={site.location} />
                <InfoRow label="Reply time" value="Within one working day" />
                <InfoRow label="Prefer DMs?" value={<a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-bright transition-colors">{site.instagramHandle}</a>} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <Faq items={contactFaqs} title="Common questions" />
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-6">
      <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-text-muted w-24 flex-shrink-0">{label}</span>
      <span className="text-text">{value}</span>
    </div>
  );
}
