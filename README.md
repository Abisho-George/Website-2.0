# LeadStrategus 2.0

The replacement for leadstrategus.com: a B2B go-to-market company site with four practices, the **GTM AI Twin** special service, a case-study engine, insights with topic clusters and founder author pages, routed enquiry forms, and a full SEO layer.

Next.js 15 · React 19 · TypeScript strict · Tailwind v4 · zero CMS (typed content files).

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run placeholders # regenerates PLACEHOLDERS.md
npm run screenshots  # BASE=http://localhost:3000 OUT=shots — desktop + mobile full-page captures
```

Copy `.env.example` to `.env.local` to configure Cal.com, Turnstile, HubSpot and enquiry routing. Everything works without them (enquiries are logged server-side; /book falls back to the form).

## Map

| Route | What |
|---|---|
| `/` | 12-section homepage: signal-field hero, thesis, practices, Twin spotlight, operating model, work, founders, `.com ⇆ .ai` portal, insights, FAQ, CTA |
| `/gtm-ai-twin` | The special service. Spine: **What is it → Why now → Why LeadStrategus**, plus the six-agent pipeline, build timeline, pricing signal, FAQ |
| `/practices`, `/practices/[slug]` | Hub + four practices on one nine-block template (hero, services, problem, deliverables, process, sample output, outcomes, pricing signal, FAQ) |
| `/work`, `/work/[slug]` | Filterable index (practice × sector) + six anonymised studies |
| `/insights`, `/insights/[slug]` | Four topic clusters, eight articles, related-post logic |
| `/authors/[slug]` | Founder pages |
| `/about`, `/contact`, `/contact/thanks`, `/book`, `/careers`, `/privacy`, `/terms` | |

Infrastructure: `src/middleware.ts` (301 map from the WordPress URLs), `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, JSON-LD (Organization, Service, Article, FAQ, Breadcrumb) via `src/lib/seo.ts`.

## Editing content

All copy lives in `src/content/*.ts`. No build tooling to learn: edit the string, save.

- `site.ts` — name, contact, nav, proof stats
- `practices.ts` — the four practices (nine blocks each)
- `twin.ts` — the GTM AI Twin page
- `work.ts` — case studies
- `insights.ts` — articles and clusters (`## ` for headings, `- ` for lists)
- `authors.ts`, `faq.ts`

## Placeholders

Any text wrapped in `[[double brackets]]` is an **invented or unverified fact**. It renders with a dashed orange underline and a counter pill bottom-left (hide it with `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false`). `PLACEHOLDERS.md` lists all of them by file and line. Verify, replace, remove the brackets.

## Design system

Tokens in `src/app/globals.css` (`@theme`). Light-first: white and warm sand grounds, ink reserved for occasional bands (the AI Twin spotlight, pricing, CTA) rather than the page background. The accent is the **brand red taken from the logo** (`#e4121f`), so the interface and the identity share one palette; the logo's navy and blue appear in the mark and the rule beneath the navigation. Type: Bricolage Grotesque for display, Geist Sans for body, Geist Mono for data and labels.

Signature components in `src/components/visual/`: `SignalField` (hero canvas: prospects flowing through identify → qualify → book), `TwinRunLog` (live agent run), `Portal` (cursor-driven `.com ⇆ .ai` split), `TwinDiagram`.
