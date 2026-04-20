export type Package = {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlight?: boolean;
};

export type ServicePage = {
  slug: 'photography' | 'videography' | 'web-design' | 'social-media' | 'ai-business';
  num: string;
  heroLabel: string;
  heroTitle: { before: string; accent: string; after?: string };
  heroImage?: string;
  introImage?: string;
  intro: { label: string; title: string; body: string[] };
  offers: { title: string; text: string }[];
  packages?: Package[];
  process: { title: string; text: string }[];
  stats?: { num: string; label: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: 'photography',
    num: '01',
    heroLabel: 'Services · 01',
    heroTitle: { before: 'Photography that ', accent: 'feels', after: ' like you.' },
    heroImage: '/images/Wedding HERO.jpg',
    introImage: '/images/Wedding SHOT.jpg',
    intro: {
      label: 'What I Offer',
      title: 'Photos you\'ll actually want to share.',
      body: [
        'From your wedding day to your business storefront — I shoot with story and mood in mind, not a spec sheet.',
        'Relaxed on the day, ruthless in the edit. You get images that look like you on your best day, delivered fast and ready to share.',
      ],
    },
    offers: [
      { title: 'Weddings & Engagements', text: 'Candid, emotional coverage of your day. Full and half-day options. No awkward posing.' },
      { title: 'Portraits & Headshots', text: 'Personal brand, team, or family. Natural light where possible, proper studio where needed.' },
      { title: 'Events & Gigs', text: 'Fast-paced, low-light friendly. Atmosphere, crowds, talent — captured without being in the way.' },
      { title: 'Commercial & Brand', text: 'Product, lifestyle, and content that makes your brand actually look like a brand.' },
      { title: 'Automotive', text: 'Rollers, static sets, or events. Dealers, clubs, and owners who want shots that stop thumbs.' },
    ],
    packages: [
      {
        name: 'Half Day',
        price: 'From £250',
        features: ['Up to 4 hours on location', '60+ edited images', 'Online gallery delivery', 'Personal / commercial use licence', '48h turnaround on first previews'],
      },
      {
        name: 'Full Day',
        price: 'From £450',
        priceNote: 'most popular',
        highlight: true,
        features: ['Up to 8 hours on location', '120+ edited images', 'Online gallery delivery', 'Personal / commercial use licence', 'Second location included', '48h turnaround on first previews'],
      },
      {
        name: 'Multi-Day / Bespoke',
        price: 'POA',
        features: ['Custom shoot plan', 'Multi-day or multi-location', 'Commercial licensing', 'Rush turnaround available', 'Dedicated project management', 'Print-ready master files'],
      },
    ],
    process: [
      { title: 'Chat', text: 'Quick call or message. You tell me what you need, I tell you what it\'ll take.' },
      { title: 'Plan', text: 'Locations, shot list, timings — agreed before the day so nothing is left to luck.' },
      { title: 'Shoot', text: 'I turn up early, stay calm, get it done. You\'ll barely notice I\'m there.' },
      { title: 'Deliver', text: 'Edited gallery in 1–2 weeks. High-res and web-ready, downloadable from anywhere.' },
    ],
    stats: [
      { num: '100+', label: 'Shoots' },
      { num: '30+', label: 'Weddings' },
      { num: '5★', label: 'Average Review' },
      { num: '24h', label: 'First Previews' },
    ],
  },
  {
    slug: 'videography',
    num: '02',
    heroLabel: 'Services · 02',
    heroTitle: { before: 'Video that moves ', accent: 'people', after: ', not just pixels.' },
    heroImage: '/images/video-bts-gym-wide-1.jpg',
    introImage: '/images/Brand HERO.jpg',
    intro: {
      label: 'What I Offer',
      title: 'Films that actually get watched.',
      body: [
        'A wedding film that makes your mum cry. A brand promo that makes people click. Social clips that don\'t get scrolled past.',
        'I plan, shoot, and edit every frame myself — so the feel of the final cut matches what you wanted from the start.',
      ],
    },
    offers: [
      { title: 'Wedding Films', text: '3-minute highlight or full ceremony. Cinematic cuts, real audio, delivered in weeks not months.' },
      { title: 'Brand & Promo', text: 'Tell your story in 60 seconds. Ads, hero videos, about-us films that sell without feeling salesy.' },
      { title: 'Event & Gig Coverage', text: 'Multi-angle recap films for festivals, weddings, corporate. Ready for socials next-day if needed.' },
      { title: 'Short-form Social', text: 'Reels, TikToks, Shorts — built for the scroll, edited to stop it.' },
      { title: 'Automotive', text: 'Rollers, drive-by, static features. Cinematic car films for dealers, clubs, and creators.' },
    ],
    packages: [
      {
        name: 'Highlight Film',
        price: 'From £350',
        features: ['3–5 minute cinematic cut', 'Licensed music', 'Colour graded', 'Delivered in 4K + web-ready', '2 weeks delivery'],
      },
      {
        name: 'Full Day Film',
        price: 'From £650',
        priceNote: 'most popular',
        highlight: true,
        features: ['Up to 8 hours filming', 'Full ceremony + reception coverage', 'Highlight film + full edit', 'Licensed music', '2 rounds of revisions', 'Social cuts included'],
      },
      {
        name: 'Full Package',
        price: 'From £950',
        features: ['Multi-day coverage', 'Drone footage where permitted', 'Multiple deliverables', 'Social Reels / Shorts', 'Rush delivery available', 'Dedicated edit review session'],
      },
    ],
    process: [
      { title: 'Brief', text: 'We get clear on the goal, the audience, the vibe. One page, no jargon.' },
      { title: 'Pre-production', text: 'Shot list, schedule, music direction. Anything that can be decided early, is.' },
      { title: 'Shoot', text: 'Lean crew, proper kit, calm energy on set. I run it like a friend, not a drill sergeant.' },
      { title: 'Edit & Deliver', text: 'First cut for review, round of tweaks, final files in every ratio you need.' },
    ],
    stats: [
      { num: '50+', label: 'Films' },
      { num: '6', label: 'Avg. Days to Deliver' },
      { num: '5★', label: 'Reviews' },
      { num: '4K', label: 'Standard' },
    ],
  },
  {
    slug: 'web-design',
    num: '03',
    heroLabel: 'Services · 03',
    heroTitle: { before: 'Websites that actually ', accent: 'earn their keep', after: '.' },
    heroImage: '/images/web-laptop-finance-mockup.jpg',
    introImage: '/images/web-client-consultation-cafe-portrait.jpg',
    intro: {
      label: 'What\'s Included',
      title: 'Less pretty brochure, more silent salesperson.',
      body: [
        'A good website should load fast, rank on Google, and quietly bring you enquiries while you\'re busy with clients.',
        'I build for small businesses who are tired of agency prices but still want agency quality. You get a site that works for your customers and for you.',
      ],
    },
    offers: [
      { title: 'Mobile-First Design', text: 'Looks right on a phone before anything else — because that\'s where most of your visitors are.' },
      { title: 'Lightning Fast', text: 'Built to load in under two seconds. Google notices. So do your customers.' },
      { title: 'Built for Google', text: 'Proper SEO foundations: titles, schema, sitemap, clean structure. Not an afterthought.' },
      { title: 'Working Contact Forms', text: 'Forms that actually email you — with spam filtering and auto-replies out of the box.' },
      { title: 'Hosting Sorted', text: 'I handle the hosting, SSL, and domain setup. You don\'t think about any of it.' },
      { title: 'Ongoing Support', text: 'Monthly care plans available — edits, updates, tweaks without you needing to learn a CMS.' },
    ],
    packages: [
      {
        name: 'Starter',
        price: 'From £499',
        features: ['Up to 5 pages', 'Mobile-first design', 'Contact form + auto-reply', 'Google Analytics', 'SEO foundations', '1 round of revisions'],
      },
      {
        name: 'Professional',
        price: 'From £999',
        priceNote: 'most popular',
        highlight: true,
        features: ['Up to 12 pages', 'Custom design system', 'CMS (blog / portfolio)', 'Google My Business setup', 'Full SEO audit', '2 rounds of revisions', 'Domain + hosting setup'],
      },
      {
        name: 'Custom / E-commerce',
        price: 'POA',
        features: ['Unlimited pages', 'E-commerce / booking system', 'Custom functionality', 'Priority support', 'Monthly care plan included', 'Performance guarantee'],
      },
    ],
    process: [
      { title: 'Discovery', text: 'Quick call about your business, your customers, and what you want the site to do.' },
      { title: 'Design & Build', text: 'Mockups first, code second. You see the whole thing before I wire it up.' },
      { title: 'Review', text: 'Two rounds of refinements built in. Copy, colours, sections — whatever needs dialling in.' },
      { title: 'Launch', text: 'Domain pointed, SSL live, analytics running. Full handover doc so you\'re not stranded.' },
    ],
  },
  {
    slug: 'social-media',
    num: '04',
    heroLabel: 'Services · 04',
    heroTitle: { before: 'Social that ', accent: 'sells', after: ', not just scrolls.' },
    heroImage: '/images/video-bts-barbershop-wide.jpg',
    introImage: '/images/video-bts-gimbal-closeup-portrait.jpg',
    intro: {
      label: 'What I Do',
      title: 'Consistent posts. Real results. No fluff.',
      body: [
        'Posting every day is hard when you\'re already running a business. I take content, strategy and ads off your plate — so you can focus on the work that actually pays you.',
        'No vanity metrics. The goal is enquiries, bookings, and bums in seats.',
      ],
    },
    offers: [
      { title: 'Content Strategy', text: 'A plan that matches your audience, your service, and the platforms that actually bring results.' },
      { title: 'Content Creation', text: 'Photo, video, and short-form clips shot on-site. Content that looks like you, not stock.' },
      { title: 'Scheduling & Posting', text: 'Daily posts, captions, hashtags — handled. You approve the calendar, I push the buttons.' },
      { title: 'Meta Ads', text: 'Small budgets, smart targeting. Ads that get tracked, tweaked, and actually convert.' },
      { title: 'Reporting', text: 'Monthly one-page report showing what moved the needle. Plain English, no dashboard digging.' },
      { title: 'Community Management', text: 'Comments replied to, DMs triaged, your audience actually feels heard.' },
    ],
    packages: [
      {
        name: 'Starter',
        price: '£299/mo',
        features: ['3 posts per week', 'Caption writing', 'Hashtag strategy', 'Monthly reporting', '1 platform'],
      },
      {
        name: 'Growth',
        price: '£499/mo',
        priceNote: 'most popular',
        highlight: true,
        features: ['Daily posting', 'Short-form content creation', 'Story / Reel production', 'Meta Ads management (budget separate)', 'Community management', '2 platforms', 'Monthly strategy call'],
      },
      {
        name: 'Pro',
        price: '£799/mo',
        features: ['Full content production', 'On-site content days', 'All platforms managed', 'Full ad management', 'Influencer outreach', 'Weekly reporting + call'],
      },
    ],
    process: [
      { title: 'Strategy', text: 'We map your audience, offer, and the handful of platforms that make sense for you.' },
      { title: 'Plan', text: 'Monthly content calendar: pillars, themes, and the posts that pay the bills.' },
      { title: 'Create & Schedule', text: 'Shooting, editing, captioning, scheduling — I handle the whole chain.' },
      { title: 'Report & Optimise', text: 'What worked, what flopped, what we\'re changing. Every single month.' },
    ],
  },
  {
    slug: 'ai-business',
    num: '05',
    heroLabel: 'Services · 05',
    heroTitle: { before: 'AI that saves you ', accent: 'hours', after: ', not headaches.' },
    heroImage: '/images/web-analytics-dashboard-dark.jpg',
    introImage: '/images/Portrait shot.jpg',
    intro: {
      label: 'What I Do',
      title: 'You don\'t need to understand AI. I do.',
      body: [
        'Most small businesses are still doing by hand things AI can do in seconds. I come in, spot the repetitive work, and set up systems that quietly run themselves.',
        'No hype, no buzzwords, no six-month transformation project. Just practical wins you feel within a week.',
      ],
    },
    offers: [
      { title: 'Content Automation', text: 'Turn one blog post into 10 social posts, a newsletter, and a LinkedIn article — automatically.' },
      { title: 'Chatbots', text: 'Trained on your FAQs. Answers customers day and night, hands off the hard ones to you.' },
      { title: 'Workflow Automation', text: 'Bookings, invoicing, follow-ups, CRM — wired together so nothing falls through the cracks.' },
      { title: 'Data & Insights', text: 'Dashboards that tell you what\'s working in plain English. No SQL, no spreadsheets.' },
      { title: 'Team Training', text: 'One-hour sessions that show your staff how to actually use AI in their day-to-day.' },
      { title: 'Tool Integration', text: 'Your existing tools, talking to each other. Shopify ↔ email ↔ socials ↔ accounting — stitched up.' },
    ],
    packages: [
      {
        name: 'Audit',
        price: '£149',
        features: ['Workflow review session', 'Top 5 automation opportunities', 'Tool recommendations', 'Written action plan', 'No setup included'],
      },
      {
        name: 'Setup',
        price: 'From £499',
        priceNote: 'most popular',
        highlight: true,
        features: ['Everything in Audit', '3 automations built & tested', 'Team training session (1hr)', '1 month of support included', 'Loom walkthroughs'],
      },
      {
        name: 'Retainer',
        price: 'From £299/mo',
        features: ['Ongoing automation builds', 'Priority support', 'Monthly check-in call', 'Tool cost optimisation', 'Quarterly strategy review'],
      },
    ],
    process: [
      { title: 'Discovery', text: 'A nosey chat about the tasks that eat your week. We find the quick wins.' },
      { title: 'Audit', text: 'I map your current workflows and flag the three changes that\'ll save the most time.' },
      { title: 'Setup', text: 'I build the automations, wire up the tools, and test everything end-to-end.' },
      { title: 'Train & Support', text: 'A handover session with your team plus ongoing support for the first month.' },
    ],
    stats: [
      { num: '10h+', label: 'Saved per week' },
      { num: '5', label: 'Businesses helped' },
      { num: '1wk', label: 'Avg. setup time' },
      { num: '100%', label: 'Training included' },
    ],
  },
];

export function getServicePage(slug: ServicePage['slug']) {
  return servicePages.find(s => s.slug === slug)!;
}
