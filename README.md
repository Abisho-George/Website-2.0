# LeadStrategus 2.0

The replacement for leadstrategus.com: a B2B go-to-market company site with 36 services in six families (built from the 2026 service portfolio), the **GTM AI Twin** special service, case studies by service, insights with topic clusters, founders on the About page, an enquiry form, and a full SEO, AEO and GEO layer.

Next.js 15 · React 19 · TypeScript strict · Tailwind v4 · zero CMS (typed content files).

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run placeholders # regenerates PLACEHOLDERS.md
npm run screenshots  # BASE=http://localhost:3000 OUT=shots: desktop + mobile full-page captures
```

Copy `.env.example` to `.env.local` to configure Cal.com, Turnstile and lead delivery. Enquiries go to a Google Apps Script that adds them to a Google Sheet and emails them to kingshuk@leadstrategus.com; setup and the script are in [docs/LEADS.md](docs/LEADS.md). In development, with nothing configured, enquiries are logged to the terminal; in production a form with nowhere to deliver shows the visitor an error and the fallback email address. `node scripts/check-leads.mjs` checks the delivery rules.

## Map

| Route | What |
|---|---|
| `/` | Homepage: hero, thesis, the six families, Twin spotlight, operating model, work, founders, `.com ⇆ .ai` portal, insights, FAQ, CTA |
| `/services`, `/services/[slug]` | All 36 services. Each page: what is the service, why it is important now, why LeadStrategus, case studies, more in the family |
| `/practices`, `/practices/[slug]` | The six service families. The two platforms link out to https://leadstrategus.ai/ and https://expotofunnel.com/ |
| `/gtm-ai-twin` | The special service: agents, what it is, why now, why LeadStrategus, build timeline, FAQ |
| `/work`, `/work/[slug]` | Case studies filterable by family. The current ones are samples: labelled, noindex, not in the sitemap |
| `/insights`, `/insights/[slug]` | Topic clusters, articles, related-post logic |
| `/about` | Story, principles and the founders; a founder's details open in place (`/about#kingshuk-hazra`) |
| `/contact`, `/contact/thanks`, `/book`, `/careers`, `/faq`, `/resources`, `/privacy`, `/terms` | |

Infrastructure: `src/middleware.ts` (301 map from the WordPress URLs and old routes), `sitemap.ts`, `robots.ts` (AI crawlers allowed), `manifest.ts`, `/llms.txt` and `/llms-full.txt`, an Open Graph image per route (`src/lib/og.tsx`), JSON-LD (Organization, WebSite, WebPage, Service, Article, FAQPage, BreadcrumbList, Person) via `src/lib/seo.ts`. Check it with `node scripts/seo-audit.mjs http://localhost:3000` against a running build.

## Editing content

All copy lives in `src/content/*.ts`. No build tooling to learn: edit the string, save.

- `site.ts`: name, contact (email and office address), proof stats
- `services.ts`: the 36 services, generated from the portfolio document by `python3 scripts/content/gen_services.py`
- `practices.ts`: the six families, two platforms (with their website URLs) and RevOps
- `twin.ts`: the GTM AI Twin page
- `work.ts`: case studies
- `insights.ts`: articles and clusters (`## ` for headings, `- ` for lists)
- `authors.ts`, `faq.ts`

## Placeholders

Any text wrapped in `[[double brackets]]` is an **invented or unverified fact**. It renders with a dashed orange underline and a counter pill bottom-left (hide it with `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false`). `PLACEHOLDERS.md` lists all of them by file and line. Verify, replace, remove the brackets.

## Design system

Tokens in `src/app/globals.css` (`@theme`). Light throughout: white nav, white and warm sand grounds, and a light red wash for the Twin spotlight and calls to action. The accent is the **brand-kit Strategic Red** (`#e10600`), so the interface and the identity share one palette; the logo's navy and blue appear in the mark and the rule beneath the navigation. Type: Bricolage Grotesque for display, Geist Sans for body, Geist Mono for data and labels.

Signature components in `src/components/visual/`: `SignalField` (hero canvas: prospects flowing through identify → qualify → book), `TwinRunLog` (live agent run), `Portal` (cursor-driven `.com ⇆ .ai` split), `TwinDiagram`.
