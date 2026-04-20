import Link from 'next/link';
import { site, nav } from '@/lib/site';
import { Monogram } from '@/components/brand/Monogram';

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 sm:px-10 lg:px-12 pt-16 pb-8">
      <div className="max-w-container mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Monogram size={72} />
          <p className="text-sm text-text-dim mt-6 max-w-[300px] leading-[1.75]">
            Creative services based in Aberdeen &amp; Aberdeenshire, Scotland.
          </p>
          <div className="flex gap-3 mt-6">
            <SocialLink href={site.instagram} label="Instagram" icon={instagramIcon} />
            <SocialLink href="#" label="Facebook" icon={facebookIcon} />
            <SocialLink href="#" label="YouTube" icon={youtubeIcon} />
            <SocialLink href="#" label="TikTok" icon={tiktokIcon} />
          </div>
        </div>

        <div>
          <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4">Services</h4>
          {nav.services.map((s) => (
            <Link key={s.href} href={s.href} className="block text-sm text-text-dim py-1 hover:text-accent transition-colors">
              {s.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4">Company</h4>
          <Link href="/about" className="block text-sm text-text-dim py-1 hover:text-accent transition-colors">About</Link>
          <Link href="/portfolio" className="block text-sm text-text-dim py-1 hover:text-accent transition-colors">Portfolio</Link>
          <Link href="/contact" className="block text-sm text-text-dim py-1 hover:text-accent transition-colors">Contact</Link>
        </div>

        <div>
          <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4">Get in Touch</h4>
          <span className="block text-sm text-text-dim py-1">Aberdeen &amp; Aberdeenshire</span>
          <a href={`mailto:${site.email}`} className="block text-sm text-accent py-1 hover:text-accent-bright transition-colors">
            {site.email}
          </a>
        </div>
      </div>

      <div className="max-w-container mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-2 text-xs text-text-muted">
        <span>© {new Date().getFullYear()} Matt Strohm Media. All rights reserved.</span>
        <span>Built with care in Aberdeenshire</span>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-text-dim hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300"
    >
      {icon}
    </a>
  );
}

const instagramIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
);
const facebookIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13 22v-8h3l1-4h-4V7.5c0-1 .5-2 2-2h2V2h-3c-3 0-5 1.5-5 4.5V10H6v4h3v8h4z"/></svg>
);
const youtubeIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19.1 5 12 5 12 5s-7.1 0-8.9.4A3 3 0 0 0 1 7.5C.6 9.3.6 12 .6 12s0 2.7.4 4.5A3 3 0 0 0 3.1 18.6C4.9 19 12 19 12 19s7.1 0 8.9-.4a3 3 0 0 0 2.1-2.1c.4-1.8.4-4.5.4-4.5s0-2.7-.4-4.5zM10 15.5v-7L16 12l-6 3.5z"/></svg>
);
const tiktokIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 2v4a5 5 0 0 0 5 5v4a9 9 0 0 1-5-1.5V16a6 6 0 1 1-6-6v4a2 2 0 1 0 2 2V2h4z"/></svg>
);
