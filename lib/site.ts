export const site = {
  name: 'Matt Strohm Media',
  tagline: 'Creative media that elevates your brand',
  location: 'Aberdeen & Aberdeenshire, Scotland',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mattstrohmmedia.com',
  email: 'Mattstrohmmedia@gmail.com',
  instagram: 'https://www.instagram.com/mattstrohmmedia/',
  instagramHandle: '@mattstrohmmedia',
  bookingMode: (process.env.NEXT_PUBLIC_BOOKING_MODE || 'form') as 'form' | 'cal',
  calUrl: process.env.NEXT_PUBLIC_CAL_URL || '',
} as const;

export const nav = {
  primary: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Photography', href: '/services/photography' },
    { label: 'Videography', href: '/services/videography' },
    { label: 'Web Design', href: '/services/web-design' },
    { label: 'Social Media', href: '/services/social-media' },
    { label: 'AI Assistance', href: '/services/ai-business' },
  ],
} as const;
