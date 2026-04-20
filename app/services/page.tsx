import { Hero } from '@/components/sections/Hero';
import { ServicesPanel } from '@/components/sections/ServicesPanel';
import { Testimonial } from '@/components/sections/Testimonial';
import { Cta } from '@/components/sections/Cta';
import { pageMetadata } from '@/lib/seo';
import { testimonials } from '@/content/testimonials';

export const metadata = pageMetadata({
  title: 'Creative Services — Aberdeen & Aberdeenshire',
  description: 'Photography, videography, web design, social media and AI automation — all under one roof. No agency layers, no lost briefs.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <Hero
        short
        label="Services"
        titleLines={[
          <>Everything your brand</>,
          <>needs to <em className="italic text-accent">stand out</em>.</>,
        ]}
        subtitle="One person, five disciplines — no agency layers, no brief lost in translation."
        image="/images/Brand HERO.jpg"
      />

      <ServicesPanel
        label="What I Do"
        title={<>Five ways I can <em className="italic text-accent">help</em></>}
        text="From a single shoot to a full creative partnership — pick what you need, or take the lot."
        defaultImage="/images/Brand HERO.jpg"
        services={[
          { num: '01', title: 'Photography',             href: '/services/photography',  image: '/images/Wedding HERO.jpg'    },
          { num: '02', title: 'Videography',             href: '/services/videography',  image: '/images/Event Hero.jpg'      },
          { num: '03', title: 'Web Design',              href: '/services/web-design',   image: '/images/Landscape shot.jpg'  },
          { num: '04', title: 'Social Media Management', href: '/services/social-media', image: '/images/Event Hero.jpg'      },
          { num: '05', title: 'AI Business Assistance',  href: '/services/ai-business',  image: '/images/LANDSCAPE.jpeg'      },
        ]}
      />

      <Testimonial {...testimonials.webDesign} />

      <Cta
        title={<>Not sure what you need?<br/><em className="italic text-accent">Let&apos;s figure it out.</em></>}
        text="Most projects don't fit neatly into a box. Book a free call and we'll work out the right mix together."
        ctaLabel="Book a free call"
      />
    </>
  );
}
