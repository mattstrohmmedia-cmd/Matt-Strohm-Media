# Matt Strohm Media — v2

Next.js 14 + TypeScript + Tailwind + Framer Motion. Deploys on Vercel. Emails via Resend. Spam filter via Cloudflare Turnstile. Analytics via GA4.

Target cost: **£0/mo** (Vercel hobby + Resend free + Turnstile free + GA4 free). Domain stays at Squarespace registrar.

---

## 1. Local development

### Install Node.js
Download and install the LTS build from <https://nodejs.org> (v20 or newer). Verify:
```
node -v
npm -v
```

### Install deps + run
```
cd matt-strohm-media
npm install
cp .env.example .env.local
# fill in the keys (see §2–4 below)
npm run dev
```
Open <http://localhost:3000>.

In dev the contact API still works even without a Turnstile secret — it short-circuits to OK. You'll need `RESEND_API_KEY` set to actually send test emails.

### Scripts
- `npm run dev` — local dev
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — ESLint

---

## 2. Resend (email)

1. Sign up at <https://resend.com>.
2. **Domains → Add Domain** → `mattstrohmmedia.com` (or your final TLD).
3. Resend shows 3 DNS records. Add them at **Squarespace → Domains → DNS**:
   - `TXT @   v=spf1 include:_spf.resend.com ~all`
   - `CNAME resend._domainkey   resend._domainkey.resend.com`
   - `TXT _dmarc   v=DMARC1; p=none; rua=mailto:<your-gmail>@gmail.com`
4. Click **Verify** in Resend until all three are green (can take 5–60 min).
5. **API Keys → Create API Key** → copy into Vercel env as `RESEND_API_KEY`.
6. Set env vars:
   - `NOTIFY_EMAIL` — your Gmail (where enquiries arrive)
   - `EMAIL_FROM_NOTIFY` — e.g. `enquiries@mattstrohmmedia.com`
   - `EMAIL_FROM_REPLY` — e.g. `hello@mattstrohmmedia.com`

---

## 3. Cloudflare Turnstile (spam)

1. <https://dash.cloudflare.com> → **Turnstile** → **Add site**.
2. Domain: `mattstrohmmedia.com`. Widget mode: **Managed**.
3. Copy **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
4. Copy **Secret Key** → `TURNSTILE_SECRET_KEY`.

---

## 4. Google Analytics 4

1. <https://analytics.google.com> → **Admin → Create property** (name it *Matt Strohm Media* — keep it separate from the dropshipping properties).
2. Add a **Web data stream** for `https://mattstrohmmedia.com`.
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`) → `NEXT_PUBLIC_GA_ID`.

---

## 5. Deploy to Vercel

1. Push the repo to GitHub.
2. <https://vercel.com> → **Add New → Project** → import the repo. Framework auto-detects Next.js.
3. **Settings → Environment Variables** — paste everything from `.env.local`:
   - `RESEND_API_KEY`
   - `NOTIFY_EMAIL`
   - `EMAIL_FROM_NOTIFY`
   - `EMAIL_FROM_REPLY`
   - `TURNSTILE_SECRET_KEY`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_SITE_URL` — `https://mattstrohmmedia.com`
   - `NEXT_PUBLIC_BOOKING_MODE` — `form` (for now)
4. **Deploy** → QA the `*.vercel.app` URL on desktop + iOS Safari + Android Chrome. Submit a real enquiry to confirm Gmail receives it.

---

## 6. DNS cutover from Squarespace (zero-downtime)

**24 hours before cutover:** at **Squarespace → Domains → DNS**, drop the TTL on the existing `A` and `CNAME www` records to **300s**.

**Cutover day:**
1. In Vercel → **Project → Domains** → add `mattstrohmmedia.com` and `www.mattstrohmmedia.com`. Vercel shows the target records.
2. At Squarespace DNS:
   - `A   @   76.76.21.21`
   - `CNAME   www   cname.vercel-dns.com`
3. Wait ≤ 5 min. Vercel auto-issues SSL. Visit both apex and www — confirm HTTPS loads the new site.
4. Don't touch the Resend TXT/CNAME records.

**7 days after** the new site has been live and stable: cancel the Squarespace **site** subscription. **Keep the domain registration** at Squarespace — transferring risks downtime and saves pennies.

---

## 7. Swapping the booking button to Cal.com (later)

When Matt's calendar is set up around the pool shifts:
1. Set `NEXT_PUBLIC_BOOKING_MODE=cal` in Vercel env.
2. Set `NEXT_PUBLIC_CAL_URL=https://cal.com/mattstrohm/intro` (or whichever link).
3. Redeploy. The sticky CTA and every "Book a call" button now opens Cal.com — no code change.

---

## 8. Editing content

All copy/data lives in `content/`:
- `content/services.ts` — the 5 service pages (titles, offers, process steps, stats)
- `content/portfolio.ts` — portfolio categories + items
- `content/testimonials.ts` — quotes
- `content/faqs.ts` — contact-page FAQ

Add a new portfolio item: edit the relevant category array in `content/portfolio.ts`, drop the image into `public/images/portfolio/`, reference it by `/images/portfolio/your-file.webp`.

---

## 9. Project structure

```
app/              # Routes (App Router). One folder per URL.
  api/contact/    # POST handler — validates, rate-limits, verifies Turnstile, sends email
components/
  layout/         # Nav, Footer, Cursor, PageLoader, StickyBookCta
  sections/       # Hero, Marquee, Services, Split, Stats, WorkGrid, Process, Faq, etc.
  forms/          # ContactForm, Turnstile
  primitives/     # Reveal, RevealText, Button
lib/
  schemas.ts      # Zod — shared client + server validation
  rate-limit.ts   # 5 submissions/hr/IP
  turnstile.ts    # Server-side token verify
  email/          # Resend client + React Email templates
  seo.ts, site.ts
content/          # All copy + data
public/           # Images, video, fonts
```

---

## 10. Verification checklist before launch

- [ ] Contact form → your Gmail receives the notify email + the test address receives the auto-reply
- [ ] Invalid email shows inline error, no request sent
- [ ] 6 submissions in an hour → 6th returns 429
- [ ] Honeypot (fill hidden `website` via DevTools) → 200 but no email sent
- [ ] Nav overlay opens/closes, Esc closes it, focus trapped while open
- [ ] Sticky "Book a call" appears after 600px scroll, hides when form is on screen
- [ ] Lighthouse mobile Performance ≥ 90 on `/`, `/contact`, `/services/photography`
- [ ] GA4 real-time shows `page_view` when you load the site
- [ ] Keyboard-only tab through every page — focus always visible
