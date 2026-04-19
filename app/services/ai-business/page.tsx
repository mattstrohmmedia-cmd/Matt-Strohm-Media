import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';
import { getServicePage } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'AI Business Assistance — Aberdeen & Aberdeenshire',
  description: 'Practical AI: content automation, chatbots, workflow integrations and team training. Save hours a week.',
  path: '/services/ai-business',
});

export default function Page() {
  return <ServicePageTemplate service={getServicePage('ai-business')} />;
}
