import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';
import { getServicePage } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Web Design in Aberdeen & Aberdeenshire',
  description: 'Fast, mobile-first websites for small businesses. SEO-ready, working contact forms, hosting handled.',
  path: '/services/web-design',
});

export default function Page() {
  return <ServicePageTemplate service={getServicePage('web-design')} />;
}
