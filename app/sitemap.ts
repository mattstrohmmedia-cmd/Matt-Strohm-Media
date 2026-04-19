import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const routes = [
  '/', '/about', '/portfolio', '/contact',
  '/services/photography', '/services/videography',
  '/services/web-design', '/services/social-media', '/services/ai-business',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1.0 : 0.7,
  }));
}
