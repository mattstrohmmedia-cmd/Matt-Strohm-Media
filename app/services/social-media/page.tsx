import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';
import { getServicePage } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Social Media Management, Aberdeen',
  description: 'Content strategy, creation, scheduling and Meta Ads for businesses in Aberdeen & Aberdeenshire. Social media that brings in real enquiries, not just likes.',
  path: '/services/social-media',
});

export default function Page() {
  return <ServicePageTemplate service={getServicePage('social-media')} />;
}
