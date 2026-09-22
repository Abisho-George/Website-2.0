import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconPlate } from "@/components/ui/IconPlate";
import { Bloom, FieldPlate } from "@/components/ui/Atmos";
import { CTABand } from "@/components/site/Blocks";
import { HeroFrame } from "@/components/site/HeroFrame";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { IndexScene } from "@/components/visual/IndexScene";
import { PracticeGlyph } from "@/components/visual/PracticeGlyph";
import { practiceIconFor } from "@/components/icons/registry";
import { practices } from "@/content/practices";
import { services, servicesFor } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: `All ${services.length} LeadStrategus services across GTM strategy, demand generation, revenue intelligence and enablement — each with its own scope, timeline and price.`,
  path: "/services",
});

/** Every figure below is counted, never typed: the content file is the source. */
const engagementModels = new Set(practices.map((p) => p.pricing.model)).size;

export default function ServicesHub() {
  return (
    <>
      <HeroFrame
        lines={["Every service,", <em key="e">priced and scoped.</em>]}
        lede={`${services.length} services across four practices. Each one has its own page with what is included, what you get, how long it takes and what it costs — so you can decide before the first call.`}
        scene={
          <IndexScene
            mode="atlas"
            columns={practices.map((p) => ({ head: p.short, items: servicesFor(p.slug).map((s) => s.name) }))}
          />
        }
        readout={[
          { k: "Services", v: services.length },
          { k: "Practices", v: practices.length },
          { k: "Priced on this page", v: "all of them" },
          { k: "Engagement models", v: engagementModels },
        ]}
      />

      {practices.map((p, i) => {
        const group = servicesFor(p.slug);
        // alternate the ground so scrolling the page crosses four surfaces
        // rather than one continuous sheet of white
        const band = i % 2 === 1 ? "sand" : "paper";
        return (
          <Section
            key={p.slug}
            id={p.slug}
            band={band}
            pad="tight"
            n={p.index}
            label={p.short}
            className={i === 0 ? "hero-next" : undefined}
          >
            <Reveal className="relative flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pb-6">
              <div className="flex min-w-0 items-center gap-5">
                <span className="display-2 leading-none text-kraft-2" aria-hidden>{p.index}</span>
                <IconPlate icon={practiceIconFor(p.slug)} size="lg" />
                <div className="min-w-0">
                  <h2 className="h2">{p.name}</h2>
                  <p className="mt-1.5 text-muted">{p.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <PracticeGlyph slug={p.slug} className="hidden h-16 w-24 shrink-0 opacity-70 lg:block" />
                <div className="sm:text-right">
                  <div className="font-mono text-micro uppercase tracking-[0.15em] text-dim">
                    {group.length} {group.length === 1 ? "service" : "services"}
                  </div>
                  <Link
                    href={`/practices/${p.slug}`}
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-[var(--dur-1)] hover:text-ember-ink"
                  >
                    About this practice <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
              <span className="hairline rule-draw absolute inset-x-0 bottom-0" />
            </Reveal>

            <ServiceGrid services={group} className="mt-8" />
          </Section>
        );
      })}

      <Section band="ink" pad="tight" className="relative overflow-hidden">
        <Bloom hue="ember" at="tr" size={70} />
        <FieldPlate fx="80%" />
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-ember-2">
              <Sparkles className="size-4" />
              <span className="font-mono text-micro uppercase tracking-[0.15em]">Special service</span>
            </div>
            <h2 className="h2 mt-3">GTM AI Twin</h2>
            <p className="lede mt-3 max-w-xl">Custom AI agents that take the whole motion over — identify, research, engage, qualify, book. Every service above can feed it.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end"><Button href="/gtm-ai-twin" size="lg">Explore the Twin</Button></div>
        </div>
      </Section>

      <Section band="sand" pad="tight" width="mid">
        <SectionHead
          title="Not sure which you need?"
          lede="Start with a two-week diagnostic. Fixed fee, and you leave with a written view of what is stalling pipeline and which service would move it. The fee is credited against whatever you do next."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/book" size="lg">Book a strategy call</Button>
          <Button href="/pricing" size="lg" variant="outline">See pricing</Button>
        </div>
      </Section>

      <CTABand title={<>Tell us what is <em>not converting.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Send an enquiry", href: "/contact" }} />
    </>
  );
}
