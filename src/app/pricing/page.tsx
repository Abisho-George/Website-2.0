import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { CTABand, FAQBlock } from "@/components/site/Blocks";
import { PageHero } from "@/components/site/PageHero";
import { IndexScene } from "@/components/visual/IndexScene";
import { families } from "@/content/practices";
import { services, servicesFor } from "@/content/services";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { twin } from "@/content/twin";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description: "What LeadStrategus engagements cost: fixed-fee diagnostics and strategy sprints, monthly retainers scoped to a meetings target, per-programme productised formats, and the GTM AI Twin build and run fee.",
  path: "/pricing",
});

const models = [
  { name: "Fixed-fee project", when: "Strategy, research and productised programmes.", how: "One price agreed up front against a written scope. No hourly billing, no change orders unless you change the scope.", eg: "GTM Setup, Repositioning, Pitch Deck, Webinar-as-a-Service, Diagnostic Workshops" },
  { name: "Monthly retainer", when: "Demand generation pods and ongoing intelligence.", how: "A monthly fee for a pod scoped to a meetings target, reported weekly. Three-month minimum so the programme has time to learn.", eg: "Account Based Marketing, Social Selling, Lead Generation in a Box, Intent-Based Account Intelligence" },
  { name: "Build then run", when: "The GTM AI Twin.", how: "A one-time build fee for the agents and the foundation, then a monthly fee to run and tune them. Build fee credited against the run fee on annual commitments.", eg: "AI Agent Build, GTM AI Twin, Full AI Demand Gen System" },
];

const pricingFaq = [
  { q: "Why publish prices at all?", a: "Because the alternative wastes a week of your time and ours. The numbers on this page are honest starting points; the proposal after a thirty-minute call is exact." },
  { q: "Is there a minimum commitment?", a: "Retainers run on a three-month minimum, because a programme judged at week four is judged on noise. Fixed-fee projects have no commitment beyond the project." },
  { q: "Do you bill hourly?", a: "No. Everything is priced against a written scope, so you carry no risk from our estimating." },
  { q: "What currency do you invoice in?", a: "INR for Indian entities, USD for everyone else. Prices shown in both are converted at a fixed annual rate, not spot." },
  { q: "Do fees get credited?", a: "Yes. Diagnostic and strategy-sprint fees are credited against the first quarter of any retainer that follows, and the Twin build fee is credited against the run fee on annual terms." },
  { q: "What is not included?", a: "Third-party costs you would pay anyway: ad spend, event sponsorship, data licences and tooling seats. We tell you the expected number before you commit." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(pricingFaq), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])]} />

      <PageHero
        title={<>What it costs, <em>said plainly.</em></>}
        lede="How each family is priced, the three ways we structure an engagement, and what is never included. Every engagement is quoted against a written scope after a thirty-minute call."
        scene={<IndexScene mode="ledger" rows={families.map((f) => ({ label: f.name, value: f.pricing?.from ?? "Scoped" }))} />}
        readout={[
          { k: "Services", v: services.length },
          { k: "Families", v: families.length },
          { k: "Engagement models", v: models.length },
          { k: "Hourly billing", v: "none" },
        ]}
      />

      <Section className="hero-next">
        <SectionHead title="Three ways we charge." lede="Which one applies depends on the work, not on what we think you will pay." />
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {models.map((m, i) => (
            <Reveal key={m.name} delay={i * 70} className="card flex h-full flex-col p-6 md:p-7">
              <div className="mb-5 h-px w-10 bg-ember" />
              <h3 className="h4">{m.name}</h3>
              <p className="mt-2 text-sm text-muted">{m.when}</p>
              <p className="mt-4 leading-relaxed text-fg-soft">{m.how}</p>
              <p className="mt-auto pt-6 text-[0.82rem] text-dim">{m.eg}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section band="sand">
        <SectionHead title="By family." lede="Where a family has a published starting point it is shown here. The rest are scoped per engagement, because their work varies too much for one figure to mean anything." />
        <div className="mt-10 space-y-3">
          {families.map((f, i) => (
            <Reveal key={f.slug} delay={Math.min(i, 6) * 50}>
              <div className="card grid gap-5 p-6 md:grid-cols-12 md:items-center md:p-7">
                <div className="md:col-span-5">
                  <Link href={`/practices/${f.slug}`} className="h4 transition-colors hover:text-ember-ink">{f.name}</Link>
                  <p className="mt-1 text-sm text-muted">{f.pricing?.model ?? "Scoped per engagement against a written brief."}</p>
                </div>
                <div className="md:col-span-3">
                  {f.pricing ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-dim">from</span>
                      <span className="display text-[1.35rem] md:text-[1.6rem]"><Copy text={f.pricing.from} /></span>
                    </div>
                  ) : (
                    <span className="text-[0.95rem] text-muted">Scoped per engagement</span>
                  )}
                </div>
                <div className="md:col-span-2">
                  <p className="text-[0.85rem] leading-snug text-muted">{servicesFor(f.slug).length} services</p>
                </div>
                <div className="md:col-span-2 md:justify-self-end">
                  <Link href={`/practices/${f.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-ember-ink">
                    Details <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={260}>
            <div className="glow-ember grid gap-5 rounded-[var(--radius-lg)] border border-ember/30 bg-paper p-6 md:grid-cols-12 md:items-center md:p-7">
              <div className="md:col-span-5">
                <Link href="/gtm-ai-twin" className="h4 text-ember-ink">GTM AI Twin</Link>
                <p className="mt-1 text-sm text-muted">{twin.pricing.model}</p>
              </div>
              <div className="md:col-span-5">
                <span className="display text-[1.25rem] md:text-[1.5rem]"><Copy text={twin.pricing.from} /></span>
              </div>
              <div className="md:col-span-2 md:justify-self-end">
                <Link href="/gtm-ai-twin" className="inline-flex items-center gap-1.5 text-sm font-medium text-ember-ink">Details <ArrowRight className="size-4" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section band="kraft" tight>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="h2 balance">What every engagement includes.</h2>
            <ul className="mt-7 space-y-3">
              {["A named founder on the engagement, not an account manager", "Weekly reporting on the five numbers that matter", "Everything we build handed over: lists, sequences, playbooks", "An honest recommendation to stop if it is not working"].map((x) => (
                <li key={x} className="flex gap-3"><Check className="mt-0.5 size-[18px] shrink-0 text-ember" /><span>{x}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2 balance">What it never includes.</h2>
            <ul className="mt-7 space-y-3 text-muted">
              {["Ad spend, event sponsorship or booth costs", "Third-party data licences and tooling seats", "Pay-per-meeting pricing, because it produces bad meetings", "Long lock-ins: retainers run on a three-month minimum"].map((x) => (
                <li key={x} className="flex gap-3"><span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-rule-strong" /><span>{x}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section><FAQBlock items={pricingFaq} title="Questions about money." /></Section>

      <CTABand title={<>Get an <em>exact</em> number.</>} lede="Thirty minutes, then a scoped proposal with a fixed price, or an honest recommendation to spend it elsewhere." primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "See all services", href: "/services" }} />
    </>
  );
}
