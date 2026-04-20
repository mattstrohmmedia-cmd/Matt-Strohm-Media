import { Hero } from '@/components/sections/Hero';
import { Split } from '@/components/sections/Split';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { Testimonial } from '@/components/sections/Testimonial';
import { Cta } from '@/components/sections/Cta';
import { pageMetadata } from '@/lib/seo';
import { testimonials } from '@/content/testimonials';

export const metadata = pageMetadata({
  title: 'About Matthew Strohm — Photographer & Creative, Aberdeen',
  description: 'Freelance photographer, videographer and creative based in Aberdeenshire. You work directly with me — no agency layers, no account managers.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <Hero
        short
        label="About"
        titleLines={[<>The story behind</>, <>the <em className="italic text-accent">work</em>.</>]}
        image="/images/video-bts-gym-wide-2.jpg"
      />

      <Split
        label="The Short Version"
        title={<>Matthew <em className="italic text-accent">Strohm</em></>}
        body={
          <>
            <p>I&apos;m a creative based in Aberdeenshire — a photographer and videographer who also got sucked into the world of web design, social media, and AI because clients kept asking. Now I do all five, properly, under one roof.</p>
            <p className="mt-6">I started shooting weddings, moved into commercial work, then realised most small businesses were bleeding time on bad websites and empty socials. So I started fixing those too.</p>
            <p className="mt-6">I work with one client at a time, care about the outcome more than the price tag, and speak to you like a human. That&apos;s about it.</p>
          </>
        }
        image="/images/self portrait.jpg"
      />

      <Services
        label="What Drives Me"
        title={<>Three things I <em className="italic text-accent">won&apos;t</em> compromise on</>}
        services={[
          { num: '—', title: 'Results First', text: 'Pretty photos are nice. Photos that book weddings, sell products, and fill diaries are better. Outcome beats aesthetic every time.' },
          { num: '—', title: 'Personal Service', text: 'You get me. Not an account manager. Not a team member who didn\'t read the brief. Just me, start to finish.' },
          { num: '—', title: 'Modern Thinking', text: 'I use AI where it helps, stay out of its way where it doesn\'t. Tools should work for you, not the other way around.' },
        ]}
      />

      <Stats items={[
        { num: '30+', label: 'Weddings Shot' },
        { num: '50+', label: 'Happy Clients' },
        { num: '6', label: 'Counties Covered' },
        { num: '5★', label: 'Average Review' },
      ]} />

      <Split
        reverse
        label="How I Work"
        title={<>Small team, <em className="italic text-accent">sharp craft</em></>}
        body={
          <>
            <p>Every project starts with a conversation, not a quote. I want to understand what you actually need before I tell you what it&apos;ll cost.</p>
            <p className="mt-6">Once we&apos;re aligned, I plan it out, deliver it on time, and check in after. No ghosting, no surprise invoices.</p>
          </>
        }
        image="/images/video-edit-premiere-portrait-3.jpg"
      />

      <Testimonial {...testimonials.socialMedia} />

      <Cta title={<>Think we&apos;d work well together?<br/><em className="italic text-accent">Say hi.</em></>} />
    </>
  );
}
