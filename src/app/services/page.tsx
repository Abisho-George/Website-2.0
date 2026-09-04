import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/site/Blocks";
import { PageHero } from "@/components/site/PageHero";
import { PracticeGlyph } from "@/components/visual/PracticeGlyph";
import { practices } from "@/content/practices";
import { services, servicesFor } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: `All ${services.length} LeadStrategus services across GTM strategy, demand generation, revenue intelligence and enablement — each with its own scope, timeline and price.`,
  path: "/services",
});

export default function ServicesHub() {
  return (
    <>
      <PageHero
        art="practices"
        title={<>Every service, <em>priced and scoped.</em></>}
        lede={`${services.length} services across four practices. Each one has its own page with what is included, what you get, how long it takes and what it costs — so you can decide before the first call.`}
      />

      <Section className="hero-next">
        <div className="space-y-16">
          {practices.map((p) => (
            <div key={p.slug}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5">
                <div className="flex items-center gap-4">
                  <PracticeGlyph slug={p.slug} className="h-10 w-14 shrink-0" />
                  <div>
                    <h2 className="font-display text-[1.6rem] font-semibold tracking-[-0.03em] md:text-[2rem]">{p.name}</h2>
                    <p className="mt-1 text-muted">{p.tagline}</p>
                  </div>
                </div>
                <Link href={`/practices/${p.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">
                  About this practice <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {servicesFor(p.slug).map((s, i) => (
                  <Reveal key={s.slug} delay={i * 40} className="h-full">
                    <Link href={`/services/${s.slug}`} className="card card-hover group flex h-full flex-col p-5">
                      <h3 className="font-display text-[1.08rem] font-semibold tracking-tight">{s.name}</h3>
                      <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{s.tagline}</p>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-[0.78rem]">
                        <span className="font-mono text-dim">{s.timeline}</span>
                        <span className="inline-flex items-center gap-1 font-medium text-ember-ink">
                          Details <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section band="ink" tight>
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-ember-2">
              <Sparkles className="size-4" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.15em]">Special service</span>
            </div>
            <h2 className="h2 mt-3">GTM AI Twin</h2>
            <p className="lede mt-3 max-w-xl">Custom AI agents that take the whole motion over — identify, research, engage, qualify, book. Every service above can feed it.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end"><Button href="/gtm-ai-twin" size="lg">Explore the Twin</Button></div>
        </div>
      </Section>

      <Section band="sand" tight>
        <SectionHead title="Not sure which you need?" lede="Start with a two-week diagnostic. Fixed fee, and you leave with a written view of what is stalling pipeline and which service would move it. The fee is credited against whatever you do next." />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/book" size="lg">Book a strategy call</Button>
          <Button href="/pricing" size="lg" variant="outline">See pricing</Button>
        </div>
      </Section>

      <CTABand title={<>Tell us what is <em>not converting.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Send an enquiry", href: "/contact" }} />
    </>
  );
}
