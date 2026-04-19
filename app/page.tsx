import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Stats } from '@/components/sections/Stats';
import { Split } from '@/components/sections/Split';
import { Cta } from '@/components/sections/Cta';
import { Instagram } from '@/components/sections/Instagram';
import { Reveal } from '@/components/primitives/Reveal';
import { ButtonLink, Arrow } from '@/components/primitives/Button';
import { testimonials } from '@/content/testimonials';

const homeServices = [
  { num: '01', title: 'Photography',            href: '/services/photography' },
  { num: '02', title: 'Videography',            href: '/services/videography' },
  { num: '03', title: 'Web Design',             href: '/services/web-design' },
  { num: '04', title: 'Social Media',           href: '/services/social-media' },
  { num: '05', title: 'AI Business Assistance', href: '/services/ai-business' },
];

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role?: string }) {
  return (
    <div className="relative bg-surface border border-white/[0.06] p-10 h-full">
      <span className="absolute top-6 left-8 font-display text-[4rem] leading-none text-accent/20 select-none pointer-events-none" aria-hidden>
        &ldquo;
      </span>
      <p className="font-display italic text-[1.05rem] leading-[1.8] text-text mb-6 pt-6">&ldquo;{quote}&rdquo;</p>
      <p className="text-sm font-semibold text-text">{author}</p>
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
        subtitle="Photography, videography, web design, social media, and AI-powered solutions — all under one roof."
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

      {/* ── 3. Services — editorial list ── */}
      <section id="services" className="py-28">
        <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center mb-16">
            <Reveal>
              <div className="section-label justify-center mb-4" style={{ display: 'inline-flex' }}>What I Do</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">Services</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="section-text mx-auto">From capturing your story to building your online presence — everything you need to stand out.</p>
            </Reveal>
          </div>

          <div className="border-t border-white/[0.08]">
            {homeServices.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.06}>
                <Link
                  href={s.href}
                  className="group flex items-center gap-6 py-6 border-b border-white/[0.08] hover:border-accent/20 transition-colors duration-300"
                >
                  <span className="font-body text-[0.6rem] tracking-[0.2em] text-text-muted/50 w-6 flex-shrink-0 select-none">
                    {s.num}
                  </span>
                  <span
                    className="font-display flex-1 leading-none text-text-dim group-hover:text-text"
                    style={{
                      fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                      transition: 'color 280ms cubic-bezier(0.23,1,0.32,1)',
                    }}
                  >
                    {s.title}
                  </span>
                  <span className="text-accent opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0">
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/contact" variant="ghost">
                Book a free consultation <Arrow />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Stats ── */}
      <Stats items={[
        { num: '100+', label: 'Projects Delivered' },
        { num: '50+',  label: 'Happy Clients' },
        { num: '5.0★', label: 'Google Rating' },
      ]} />

      {/* ── 5. About ── */}
      <Split
        label="About Me"
        title={<>Matthew Strohm</>}
        body={
          <>
            <div className="w-16 h-px bg-accent mb-8 mt-2" />
            <p>I&apos;m a freelance photographer, videographer, and creative based in Aberdeenshire, Scotland. What started with a compact camera as a teenager turned into a full creative business — capturing weddings, building brands, and helping businesses grow online.</p>
            <p className="mt-5">I combine hands-on creative work with modern tools and strategy. Whether it&apos;s a wedding day, a brand shoot, or getting your business found online — I&apos;m focused on delivering real results, not just pretty pictures.</p>
          </>
        }
        image="/images/self portrait.png"
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
              <p className="font-display italic leading-[1.6] text-text max-w-[72ch]" style={{ fontSize: 'clamp(1.2rem,2.5vw,1.85rem)' }}>
                &ldquo;{testimonials.wedding.quote}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="w-8 h-px bg-accent flex-shrink-0" />
                <cite className="not-italic text-sm font-semibold text-text">{testimonials.wedding.author}</cite>
                {testimonials.wedding.role && (
                  <span className="text-xs text-text-muted tracking-[0.1em] uppercase">{testimonials.wedding.role}</span>
                )}
              </footer>
            </blockquote>
          </Reveal>

          {/* Supporting — 2 col */}
          <div className="grid sm:grid-cols-2 gap-5 border-t border-white/[0.06] pt-10">
            <Reveal delay={0.2} variant="slide-left">
              <TestimonialCard {...testimonials.business} />
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
        text="Whether it's your wedding day, your business brand, or your online presence — I'm here to help you stand out. Pricing and packages are always discussed on the first call."
        ctaLabel="Book a Free Consultation"
      />
    </>
  );
}
