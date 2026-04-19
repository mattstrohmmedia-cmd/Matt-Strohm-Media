import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Syne } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Cursor } from '@/components/layout/Cursor';
import { PageLoader } from '@/components/layout/PageLoader';
import { StickyBookCta } from '@/components/layout/StickyBookCta';
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
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = pageMetadata({
  title: site.name,
  description: 'Photography, videography, web, social and AI services for businesses and brides in Aberdeen and Aberdeenshire.',
  path: '/',
});

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <ScrollProgress />
        <PageLoader />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StickyBookCta />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
