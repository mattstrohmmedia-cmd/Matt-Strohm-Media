import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/',                        priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/services',                priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/photography',    priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/videography',    priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/web-design',     priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/social-media',   priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/ai-business',    priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio',               priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about',                   priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact',                 priority: 0.7, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
