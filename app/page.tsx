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

      {/* ── 3. Services — white bg (#0a0a0a), centered header ── */}
      <Services
        label="What I Do"
        title="Services"
        text="From capturing your story to building your online presence — everything you need to stand out."
        centered
        services={[
          { num: '01', icon: '📷', title: 'Photography',            text: 'Weddings, events, commercial shoots, portraits — professional imagery that tells your story.',                                         href: '/services/photography' },
          { num: '02', icon: '🎬', title: 'Videography',            text: 'Cinematic wedding films, promotional content, event coverage — motion that moves people.',                                            href: '/services/videography' },
          { num: '03', icon: '💻', title: 'Web Design',             text: 'Fast, modern, mobile-first websites built to convert. From tradespeople to hospitality — sites that work hard.',                     href: '/services/web-design' },
          { num: '04', icon: '📱', title: 'Social Media Management',text: 'Content strategy, creation, scheduling, and Meta ad management — grow your brand and reach the right audience.',                    href: '/services/social-media' },
          { num: '05', icon: '🤖', title: 'AI Business Assistance', text: 'Leverage AI tools to streamline your operations and automate content — without the tech headache.',                                  href: '/services/ai-business' },
        ]}
      />

      {/* ── 4. Portfolio — bg-secondary (#111) ── */}
      <section id="portfolio" style={{ background: '#111111' }} className="py-28">
        <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-12">
          <Reveal variant="slide-left">
            <div className="section-label mb-4">Selected Work</div>
          </Reveal>
          <Reveal variant="slide-left" delay={0.1}>
            <h2 className="section-title mb-16">Recent Projects</h2>
          </Reveal>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {[
              { title: 'Wedding Portfolio',  category: 'Weddings',    image: '/images/Wedding SHOT.jpg',                              objectPosition: 'center' },
              { title: 'Event Coverage',      category: 'Events',      image: '/images/Event Shot.jpg',                                objectPosition: 'center' },
              { title: 'Brand Photography',   category: 'Commercial',  image: '/images/Brand PORT/Against the grain_-3.jpg',           objectPosition: 'center' },
              { title: 'Automotive',          category: 'Automotive',  image: '/images/CAR SHOT.jpg',                                  objectPosition: 'center' },
              { title: 'Portrait Session',    category: 'Portraits',   image: '/images/Portrait shot.jpg',                             objectPosition: 'top' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08} variant="fade">
                <div className="group relative aspect-[4/3] overflow-hidden cursor-pointer">
                  {/* Image — subtle zoom on hover */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover [transition:transform_700ms_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    style={{ objectPosition: item.objectPosition }}
                  />
                  {/* Overlay — clip-path wipe from bottom, text slides up */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6 group-hover:[clip-path:inset(0_0_0_0)]"
                    style={{
                      background: 'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.3) 50%, transparent 100%)',
                      clipPath: 'inset(100% 0 0 0)',
                      transition: 'clip-path 500ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    <span className="font-display text-[1.15rem] text-text translate-y-3 group-hover:translate-y-0 [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1)_60ms]">{item.title}</span>
                    <span className="text-[0.65rem] tracking-[0.18em] uppercase text-accent mt-1 translate-y-3 group-hover:translate-y-0 [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1)_110ms]">{item.category}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="text-center mt-12">
              <ButtonLink href="/portfolio" variant="outline">View Full Portfolio <Arrow /></ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Stats ── */}
      <Stats items={[
        { num: '100+', label: 'Projects Completed' },
        { num: '50+',  label: 'Happy Clients' },
        { num: '5',    label: 'Services Offered' },
        { num: '5★',   label: 'Google Reviews' },
      ]} />

      {/* ── 6. About — bg-primary ── */}
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

      {/* ── 7. Testimonials — bg-secondary (#111) ── */}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(Object.values(testimonials) as { quote: string; author: string; role?: string }[]).map((t, i) => (
              <Reveal key={i} delay={i * 0.08} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Instagram feed ── */}
      <Instagram />

      {/* ── 9. CTA ── */}
      <Cta
        title={<>Let&apos;s Create Something <em className="italic text-accent">Together</em></>}
        text="Whether it's your wedding day, your business brand, or your online presence — I'm here to help you stand out."
        ctaLabel="Book a Free Consultation"
      />
    </>
  );
}
