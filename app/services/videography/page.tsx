import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';
import { getServicePage } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Videography in Aberdeen & Aberdeenshire',
  description: 'Wedding films, brand promos, event coverage and short-form social content. Cinematic video, delivered fast.',
  path: '/services/videography',
});

export default function Page() {
  return <ServicePageTemplate service={getServicePage('videography')} />;
}
