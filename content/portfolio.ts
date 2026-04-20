import type { WorkItem } from '@/components/sections/WorkGrid';

export type PortfolioCategory = {
  slug: string;
  label: string;
  title: string;
  blurb: string;
  items: WorkItem[];
};

export const portfolio: PortfolioCategory[] = [
  {
    slug: 'weddings',
    label: 'Weddings',
    title: 'Wedding stories',
    blurb: 'Natural, emotional coverage of the real moments — not the posed ones.',
    items: [
      { title: 'Logan Wedding', category: 'Weddings', image: '/images/wedding PORT/Logan wedding  (191 of 300).jpg', aspect: 'wide' },
      { title: 'Logan Wedding', category: 'Weddings', image: '/images/wedding PORT/Logan wedding  (220 of 300).jpg', aspect: 'square' },
      { title: 'Logan Wedding', category: 'Weddings', image: '/images/wedding PORT/Logan wedding  (228 of 300).jpg', aspect: 'square' },
      { title: 'Wedding Day', category: 'Weddings', image: '/images/Wedding SHOT.jpg', aspect: 'wide' },
    ],
  },
  {
    slug: 'portraits',
    label: 'Portraits',
    title: 'Portraits & brand',
    blurb: 'Headshots, personal brand, and team shoots that look like real people.',
    items: [
      { title: 'Portrait Session', category: 'Portraits', image: '/images/Portraits PORT/IMG_1941.jpg', aspect: 'wide' },
      { title: 'Portrait Session', category: 'Portraits', image: '/images/Portraits PORT/IMG_2071.jpg', aspect: 'square', objectPosition: 'top' },
      { title: 'Portrait Session', category: 'Portraits', image: '/images/Portraits PORT/IMG_2100.jpg', aspect: 'square', objectPosition: 'top' },
    ],
  },
  {
    slug: 'automotive',
    label: 'Automotive',
    title: 'Automotive',
    blurb: 'Rollers, statics, and car events shot with proper intent.',
    items: [
      { title: 'Automotive', category: 'Automotive', image: '/images/Automotive PORT/IMG_1429.jpg', aspect: 'wide' },
      { title: 'Automotive', category: 'Automotive', image: '/images/Automotive PORT/IMG_1463.jpg', aspect: 'square' },
      { title: 'Automotive', category: 'Automotive', image: '/images/Automotive PORT/IMG_1488.jpg', aspect: 'square' },
      { title: 'Automotive', category: 'Automotive', image: '/images/Automotive PORT/IMG_1588.jpg', aspect: 'wide' },
      { title: 'Automotive', category: 'Automotive', image: '/images/Automotive PORT/IMG_1626.jpg', aspect: 'square' },
      { title: 'Automotive', category: 'Automotive', image: '/images/Automotive PORT/IMG_1656.jpg', aspect: 'square' },
    ],
  },
  {
    slug: 'events',
    label: 'Events',
    title: 'Events & gigs',
    blurb: 'Fast-paced, low-light, real atmosphere.',
    items: [
      { title: 'Dylan McPhee', category: 'Events', image: '/images/EVENT PORT/Dylan mcphee.jpg', aspect: 'wide' },
      { title: 'Dylan McPhee', category: 'Events', image: '/images/EVENT PORT/Dylan mcphee-1.jpg', aspect: 'square' },
      { title: 'Dylan McPhee', category: 'Events', image: '/images/EVENT PORT/Dylan mcphee-8.jpg', aspect: 'square' },
      { title: 'Live Event', category: 'Events', image: '/images/EVENT PORT/IMG_1789.JPG', aspect: 'wide' },
    ],
  },
  {
    slug: 'commercial',
    label: 'Commercial',
    title: 'Commercial & brand',
    blurb: 'Content for brands that want to look like brands.',
    items: [
      { title: 'Against the Grain', category: 'Commercial', image: '/images/Brand PORT/Against the grain_-3.jpg', aspect: 'wide' },
      { title: 'Against the Grain', category: 'Commercial', image: '/images/Brand PORT/Against the grain -05412.jpg', aspect: 'square' },
      { title: 'Against the Grain', category: 'Commercial', image: '/images/Brand PORT/Against the grain -05524.jpg', aspect: 'square' },
      { title: 'Against the Grain', category: 'Commercial', image: '/images/Brand PORT/Against the grain --3.jpg', aspect: 'wide' },
    ],
  },
  {
    slug: 'web',
    label: 'Web',
    title: 'Web & design',
    blurb: 'Sites built to earn their keep.',
    items: [
      { title: 'Client Consultation', category: 'Web', image: '/images/web-client-consultation-cafe-landscape.jpg', aspect: 'wide' },
      { title: 'Mobile Web Design', category: 'Web', image: '/images/web-mobile-website-cityview.jpg', aspect: 'wide' },
    ],
  },
];
