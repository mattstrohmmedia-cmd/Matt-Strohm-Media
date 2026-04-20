import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { Split } from '@/components/sections/Split';
import { Cta } from '@/components/sections/Cta';
import { Instagram } from '@/components/sections/Instagram';
import { Reveal } from '@/components/primitives/Reveal';
import { ButtonLink, Arrow } from '@/components/primitives/Button';
import { testimonials } from '@/content/testimonials';

function TestimonialCard({ quote, role }: { quote: string; author?: string; role?: string }) {
  return (
    <div className="relative bg-surface border border-white/[0.06] p-10 h-full">
      <span className="absolute top-6 left-8 font-display text-[4rem] leading-none text-accent/20 select-none pointer-events-none" aria-hidden>
        &ldquo;
      </span>
      <p className="font-display italic text-base leading-[1.75] text-text mb-6 pt-6">&ldquo;{quote}&rdquo;</p>
      {role && <p className="text-xs text-text-muted tracking-[0.1em] uppercase mt-1">{role}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <Hero
        label=""
        titleLines={[
          'Creative media',
          <>that <em className="italic text-accent">elevates</em></>,
          'your brand.',
        ]}
        subtitle="Based in Aberdeenshire. Five disciplines, one point of contact — no agency layers, no brief lost in translation."
        video="/videos/hero-web.mp4"
        mobileVideo="/videos/hero-mobile.mp4"
        poster="/images/hero.jpg"
        ctaLabel="Let's Work Together"
        ctaHref="/contact"
        secondaryHref="/portfolio"
        secondaryLabel="View My Work"
      />

      {/* ── 2. Marquee ── */}
      <Marquee />

      {/* ── 3. Services ── */}
      <Services
        label="What I Do"
        title="Services"
        text="Pick one service or take the lot. Either way, you deal directly with one person who actually cares about the result."
        centered
        services={[
          { num: '01', title: 'Photography',            text: 'Weddings, events, commercial shoots, portraits — professional imagery that tells your story.',                                         href: '/services/photography' },
          { num: '02', title: 'Videography',            text: 'Cinematic wedding films, promotional content, event coverage — motion that moves people.',                                            href: '/services/videography' },
          { num: '03', title: 'Web Design',             text: 'Fast, modern, mobile-first websites built to convert. From tradespeople to hospitality — sites that work hard.',                     href: '/services/web-design' },
          { num: '04', title: 'Social Media Management',text: 'Content strategy, creation, scheduling, and Meta ad management — grow your brand and reach the right audience.',                    href: '/services/social-media' },
          { num: '05', title: 'AI Business Assistance', text: 'Leverage AI tools to streamline your operations and automate content — without the tech headache.',                                  href: '/services/ai-business' },
        ]}
      />

      {/* ── 4. Stats ── */}
      <Stats items={[
        { num: '100+', label: 'Projects Delivered' },
        { num: '50+',  label: 'Happy Clients' },
        { num: '4.8★', label: 'Client Feedback' },
      ]} />

      {/* ── 5. About ── */}
      <Split
        label="About Me"
        title={<>Matthew Strohm</>}
        body={
          <>
            <div className="w-16 h-px bg-accent mb-8 mt-2" />
            <p>I&apos;m a freelance photographer, videographer, and creative based in Aberdeenshire, Scotland. What started with a compact camera as a teenager turned into a full creative business — capturing weddings, building brands, and helping businesses grow online.</p>
            <p className="mt-5">The work varies — weddings one week, a website the next. What stays the same is how seriously I take the result. If it doesn&apos;t do the job, it&apos;s not finished.</p>
          </>
        }
        image="/images/video-bts-cafe-wide-portrait.jpg"
        cta={<ButtonLink href="/about" variant="ghost">Read My Story <Arrow /></ButtonLink>}
      />

      {/* ── 6. Testimonials ── */}
      <section style={{ background: '#111111' }} className="py-28">
        <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center mb-16">
            <Reveal>
              <div className="section-label justify-center mb-4" style={{ display: 'inline-flex' }}>Client Feedback</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">What People Say</h2>
            </Reveal>
          </div>

          {/* Featured pull-quote */}
          <Reveal delay={0.15}>
            <blockquote className="mb-12 lg:mb-16">
              <span
                className="font-display leading-none text-accent/10 select-none pointer-events-none block -mb-6"
                style={{ fontSize: 'clamp(5rem,10vw,8rem)' }}
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="font-display italic leading-[1.3] text-text max-w-[68ch]" style={{ fontSize: 'clamp(1.25rem,2.5vw,1.9rem)' }}>
                &ldquo;{testimonials.wedding.quote}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="w-8 h-px bg-accent flex-shrink-0" />
                {testimonials.wedding.role && (
                  <span className="text-xs text-text-muted tracking-[0.1em] uppercase">{testimonials.wedding.role}</span>
                )}
              </footer>
            </blockquote>
          </Reveal>

          {/* Supporting — 2 col */}
          <div className="grid sm:grid-cols-2 gap-5 border-t border-white/[0.06] pt-10">
            <Reveal delay={0.2} variant="slide-left">
              <TestimonialCard {...testimonials.aiAutomation} />
            </Reveal>
            <Reveal delay={0.3} variant="slide-right">
              <TestimonialCard {...testimonials.automotive} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7. Instagram feed ── */}
      <Instagram />

      {/* ── 8. CTA ── */}
      <Cta
        title={<>Let&apos;s Create Something <em className="italic text-accent">Together</em></>}
        text="Most projects start with a fifteen-minute call. No pitch, no hard sell — just an honest conversation about what you need and whether I can help. Pricing always comes up on that first call."
        ctaLabel="Book a Free Consultation"
      />
    </>
  );
}
