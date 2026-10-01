import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconPlate } from "@/components/ui/IconPlate";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/Blocks";
import { IndexScene } from "@/components/visual/IndexScene";
import { PracticeGlyph } from "@/components/visual/PracticeGlyph";
import { practiceIconFor } from "@/components/icons/registry";
import { pagedGroups, families, platforms } from "@/content/practices";
import { services, servicesFor, serviceHref } from "@/content/services";
import { buildMetadata, breadcrumbJsonLd, serviceListJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Service families",
  description: "Six LeadStrategus service families on one revenue engine: GTM strategy, account intelligence, positioning and content, demand generation and ABM, sales enablement and event-led demand generation, plus the LeadStrategus.ai and ExpoToFunnel platforms.",
  path: "/practices",
  keywords: families.map((f) => f.name),
});

export default function FamiliesHub() {
  return (
    <>
      <JsonLd
        data={[
          serviceListJsonLd("LeadStrategus service families", "/practices", pagedGroups.map((g) => ({ name: g.name, path: `/practices/${g.slug}` }))),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Service families", path: "/practices" }]),
        ]}
      />

      <PageHero
        title={<>Six families. <em>One</em> revenue engine.</>}
        lede="Each family owns one part of the value chain, from deciding where to play to converting and scaling. They share one account universe and one commercial logic, so a second family compounds the first."
        scene={<IndexScene mode="atlas" columns={families.slice(0, 4).map((f) => ({ head: f.short, items: servicesFor(f.slug).map((s) => s.name) }))} />}
        readout={[
          { k: "Families", v: families.length },
          { k: "Services", v: services.length },
          { k: "Platforms", v: platforms.length },
          { k: "Value-chain stages", v: 8 },
        ]}
      />

      <Section className="hero-next">
        <div className="divide-y divide-rule border-y border-rule">
          {pagedGroups.map((g, i) => (
            <Reveal key={g.slug} delay={Math.min(i, 6) * 50}>
              <div className="group grid gap-6 py-9 md:grid-cols-12 md:items-start">
                <div className="flex gap-5 md:col-span-5">
                  <PracticeGlyph slug={g.slug} className="hidden h-16 w-24 shrink-0 opacity-80 sm:block" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <IconPlate icon={practiceIconFor(g.slug)} size="sm" />
                      <Link href={`/practices/${g.slug}`} className="h3 transition-colors hover:text-ember-ink">{g.name}</Link>
                    </div>
                    <p className="mt-2 text-muted">{g.tagline}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-1.5 md:col-span-6">
                  {servicesFor(g.slug).map((s) => (
                    <li key={s.slug}>
                      <Link href={serviceHref(s)} className="inline-block rounded-full border border-rule px-2.5 py-1 text-[0.76rem] text-muted transition-colors hover:border-ember/40 hover:text-ember-ink">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/practices/${g.slug}`} aria-label={`About ${g.name}`} className="hidden md:col-span-1 md:block md:justify-self-end">
                  <ArrowRight className="size-5 text-dim transition-all group-hover:translate-x-1 group-hover:text-fg" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {platforms.map((g) => (
            <a key={g.slug} href={g.url} target="_blank" rel="noopener noreferrer" className="card card-hover group flex items-center justify-between gap-6 p-6">
              <div>
                <div className="font-mono text-micro uppercase tracking-[0.14em] text-muted">Platform</div>
                <div className="h3 mt-1 transition-colors group-hover:text-ember-ink">{g.name}</div>
                <p className="mt-1 text-muted">{g.tagline}</p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-dim transition-colors group-hover:text-ember-ink" aria-hidden />
            </a>
          ))}
        </div>

        <Reveal className="glow-ember mt-10 grid gap-6 rounded-[var(--radius-xl)] border border-ember/30 bg-paper p-8 md:grid-cols-12 md:items-center md:p-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-ember-ink"><Sparkles className="size-4" /><span className="font-mono text-micro uppercase tracking-[0.14em]">Special service</span></div>
            <h2 className="h3 mt-3">GTM AI Twin</h2>
            <p className="mt-2 max-w-xl text-muted">Encode your demand-gen best practices into a connected system, with human judgement retained at the gates that matter.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end"><Button href="/gtm-ai-twin">Explore the Twin</Button></div>
        </Reveal>
      </Section>

      <Section band="sand" pad="tight">
        <SectionHead title="Start with a diagnostic." lede="Find the revenue bottleneck before you train around it. You leave with a written view of what is stalling the pipeline and which family would move it." />
        <Button href="/services/diagnostic-workshops" className="mt-8">See diagnostic workshops</Button>
      </Section>

      <CTABand title={<>One engine, <em>built around your pipeline.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "See every service", href: "/services" }} />
    </>
  );
}
