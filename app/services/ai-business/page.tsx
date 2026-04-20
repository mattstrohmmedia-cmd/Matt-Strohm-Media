import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';
import { getServicePage } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'AI Business Automation, Aberdeen',
  description: 'Content automation, chatbots, workflow integrations and team training for small businesses in Aberdeen & Aberdeenshire. Save hours every week without the tech headache.',
  path: '/services/ai-business',
});

export default function Page() {
  return <ServicePageTemplate service={getServicePage('ai-business')} />;
}
