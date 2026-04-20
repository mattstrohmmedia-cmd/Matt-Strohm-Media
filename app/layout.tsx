import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Syne } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Cursor } from '@/components/layout/Cursor';
import { PageLoader } from '@/components/layout/PageLoader';
import { StickyBookCta } from '@/components/layout/StickyBookCta';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import './globals.css';

const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Syne({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = pageMetadata({
  title: site.name,
  description: 'Photographer, videographer, web designer & social media manager based in Aberdeen & Aberdeenshire. Weddings, brands, and businesses — all under one roof.',
  path: '/',
});

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${site.url}/#business`,
      name: site.name,
      description: 'Photography, videography, web design, social media management, and AI business automation based in Aberdeen & Aberdeenshire, Scotland.',
      url: site.url,
      email: site.email,
      logo: `${site.url}/images/logos/msm.png`,
      image: `${site.url}/images/hero.jpg`,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Aberdeenshire',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 57.1497,
        longitude: -2.0943,
      },
      areaServed: [
        { '@type': 'City', name: 'Aberdeen' },
        { '@type': 'AdministrativeArea', name: 'Aberdeenshire' },
        { '@type': 'Country', name: 'Scotland' },
      ],
      serviceType: ['Photography', 'Videography', 'Web Design', 'Social Media Management', 'AI Business Automation'],
      sameAs: [site.instagram],
      priceRange: '££',
    },
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: 'Matthew Strohm',
      jobTitle: 'Photographer, Videographer & Creative Director',
      worksFor: { '@id': `${site.url}/#business` },
      url: `${site.url}/about`,
      sameAs: [site.instagram],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`}>
      <head>
        {/* Preload homepage hero poster — LCP image on the most-visited page */}
        <link rel="preload" as="image" href="/images/hero.jpg" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <ScrollProgress />
        <PageLoader />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ScrollToTop />
        <StickyBookCta />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
