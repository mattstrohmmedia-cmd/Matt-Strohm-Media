import type { Metadata } from 'next';
import { site } from './site';

type PageMeta = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function pageMetadata({ title, description, path = '/', image }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image || `${site.url}/opengraph-image`;
  const fullTitle = title === site.name ? title : `${title} — ${site.name}`;
  return {
    title: fullTitle,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en_GB',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
