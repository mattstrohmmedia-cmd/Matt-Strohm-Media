import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';
import { getServicePage } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Photography in Aberdeen & Aberdeenshire',
  description: 'Wedding, portrait, event, commercial and automotive photography. Story-driven images delivered fast.',
  path: '/services/photography',
});

export default function Page() {
  return <ServicePageTemplate service={getServicePage('photography')} />;
}
