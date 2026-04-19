import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';
import { getServicePage } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Social Media Management — Aberdeen & Aberdeenshire',
  description: 'Content strategy, creation, scheduling, Meta Ads and reporting. Social that sells, not just scrolls.',
  path: '/services/social-media',
});

export default function Page() {
  return <ServicePageTemplate service={getServicePage('social-media')} />;
}
