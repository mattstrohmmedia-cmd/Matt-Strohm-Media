import { ButtonLink, Arrow } from '@/components/primitives/Button';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 text-center">
      <div className="max-w-[560px]">
        <div className="section-label justify-center mb-6" style={{ display: 'inline-flex' }}>404</div>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] mb-4">
          Can&apos;t find that <em className="italic text-accent">page</em>.
        </h1>
        <p className="text-text-dim mb-8">The link might be old, or the page has moved. Head back home — you&apos;ll find what you need from there.</p>
        <ButtonLink href="/">Back to home <Arrow /></ButtonLink>
      </div>
    </section>
  );
}
