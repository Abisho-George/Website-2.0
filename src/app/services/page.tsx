import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconPlate } from "@/components/ui/IconPlate";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTABand } from "@/components/site/Blocks";
import { HeroFrame } from "@/components/site/HeroFrame";
import { ServiceCard, ServiceGrid } from "@/components/site/ServiceGrid";
import { IndexScene } from "@/components/visual/IndexScene";
import { PracticeGlyph } from "@/components/visual/PracticeGlyph";
import { practiceIconFor } from "@/components/icons/registry";
import { families, platforms, groups } from "@/content/practices";
import { services, servicesFor, serviceHref } from "@/content/services";
import { caseStudies } from "@/content/work";
import { site } from "@/content/site";
import { buildMetadata, breadcrumbJsonLd, serviceListJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: `All ${services.length} LeadStrategus services in six families: GTM strategy and market intelligence, account and buying intelligence, positioning and revenue content, demand generation and ABM, sales enablement, and event-led demand generation, plus the LeadStrategus.ai and ExpoToFunnel platforms.`,
  path: "/services",
  keywords: ["B2B go-to-market services", "demand generation services", "ABM agency India", "sales enablement", "GTM consulting", ...families.map((f) => f.name)],
});

const capability = groups.find((g) => g.kind === "capability")!;

export default function ServicesHub() {
  return (
    <>
      <JsonLd
        data={[
          serviceListJsonLd("LeadStrategus services", "/services", services.map((s) => ({ name: s.name, path: serviceHref(s) }))),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
        ]}
      />

      <HeroFrame
        lines={["One revenue engine.", <em key="e">Every part of it.</em>]}
        lede={`${services.length} services in six families, from deciding where to play to converting the meetings that follow. Each one has its own page: what it is, why it matters now, and why LeadStrategus.`}
        scene={
          <IndexScene
            mode="atlas"
            columns={families.slice(0, 4).map((f) => ({ head: f.short, items: servicesFor(f.slug).map((s) => s.name) }))}
          />
        }
        readout={[
          { k: "Services", v: services.length },
          { k: "Families", v: families.length },
          { k: "Platforms", v: platforms.length },
          { k: "Case studies", v: caseStudies.length },
        ]}
      />

      {families.map((f, i) => {
        const group = servicesFor(f.slug);
        // alternate the ground so scrolling the page crosses surfaces rather
        // than one continuous sheet of white
        const band = i % 2 === 1 ? "sand" : "paper";
        return (
          <Section key={f.slug} id={f.slug} band={band} pad="tight" n={f.index} label={f.short} className={i === 0 ? "hero-next" : undefined}>
            <Reveal className="relative flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pb-6">
              <div className="flex min-w-0 items-center gap-5">
                <IconPlate icon={practiceIconFor(f.slug)} size="lg" />
                <div className="min-w-0">
                  <h2 className="h2">{f.name}</h2>
                  <p className="mt-1.5 text-muted">{f.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <PracticeGlyph slug={f.slug} className="hidden h-16 w-24 shrink-0 opacity-70 lg:block" />
                <div className="sm:text-right">
                  <div className="font-mono text-micro uppercase tracking-[0.15em] text-dim">
                    {group.length} {group.length === 1 ? "service" : "services"}
                  </div>
                  <Link href={`/practices/${f.slug}`} className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-[var(--dur-1)] hover:text-ember-ink">
                    About this family <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
              <span className="hairline rule-draw absolute inset-x-0 bottom-0" />
            </Reveal>
            <ServiceGrid services={group} className="mt-8" />
          </Section>
        );
      })}

      {/* the two platforms remain distinct destinations, per the portfolio's sitemap */}
      <Section band="kraft" id="platforms" n="07" label="Platforms">
        <SectionHead
          title={<>Our <em>platforms.</em></>}
          lede="LeadStrategus is the revenue-engine partner. LeadStrategus.ai is the AI engine. ExpoToFunnel is the event-revenue engine."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {platforms.map((p) => (
            <Reveal key={p.slug} className="card flex h-full flex-col p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <IconPlate icon={practiceIconFor(p.slug)} size="lg" />
                  <div>
                    <h3 className="h3">{p.name}</h3>
                    <p className="text-muted">{p.tagline}</p>
                  </div>
                </div>
                {p.slug === "leadstrategus-ai" && (
                  <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 font-mono text-micro uppercase tracking-[0.13em] text-muted hover:text-ember-ink">
                    Visit <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-fg-soft">{p.summary}</p>
              <div className="mt-6 divide-y divide-rule border-t border-rule">
                {servicesFor(p.slug).map((s, i) => <ServiceCard key={s.slug} service={s} variant="row" i={i} />)}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-[0.95rem] text-muted">
          Underneath every family sits{" "}
          <Link href={serviceHref(servicesFor(capability.slug)[0])} className="link-u text-fg">{capability.name}</Link>
          : {capability.tagline.charAt(0).toLowerCase() + capability.tagline.slice(1)}
        </p>
      </Section>

      <Section band="sand" pad="tight" className="relative overflow-hidden">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-ember-ink">
              <Sparkles className="size-4" />
              <span className="font-mono text-micro uppercase tracking-[0.15em]">Special service</span>
            </div>
            <h2 className="h2 mt-3">GTM AI Twin</h2>
            <p className="lede mt-3 max-w-xl">Encode your demand-gen best practices into a connected system. The heavy lifting is done by agents; the decisions stay with you.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end"><Button href="/gtm-ai-twin" size="lg">Explore the Twin</Button></div>
        </div>
      </Section>

      <Section pad="tight" width="mid">
        <SectionHead
          title="Not sure which you need?"
          lede="Start with a diagnostic. You leave with a written view of what is stalling the pipeline and which service would move it."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/book" size="lg">Book a strategy call</Button>
          <Button href="/services/diagnostic-workshops" size="lg" variant="outline">See diagnostic workshops</Button>
        </div>
      </Section>

      <CTABand title={<>Tell us what is <em>not converting.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Send an enquiry", href: "/contact" }} />
    </>
  );
}
