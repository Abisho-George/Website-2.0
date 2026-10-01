import { Sparkles, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Copy";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTABand, FAQBlock } from "@/components/site/Blocks";
import { AgentConsole } from "@/components/visual/surface/AgentConsole";
import { AgentMap } from "@/components/visual/AgentMap";
import { Bloom, FieldPlate } from "@/components/ui/Atmos";
import { twin } from "@/content/twin";
import { getService } from "@/content/services";
import { twinFaq } from "@/content/faq";
import { proof } from "@/content/site";
import { buildMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "GTM AI Twin: custom AI agents for B2B go-to-market",
  description: "We build custom AI agents that take over B2B go-to-market: identify prospects, research accounts, reach out in your voice, handle replies and book qualified meetings. What it is, why now, and why LeadStrategus.",
  path: "/gtm-ai-twin",
  keywords: ["GTM AI Twin", "AI agents for go-to-market", "AI SDR alternative", "AI demand generation", "custom AI sales agents", "AI agents for B2B outbound", "LeadStrategus.ai"],
});

const svc = getService("gtm-ai-twin")!;

const anchors = [["agents", "The agents"], ["what", "What is it"], ["why-now", "Why now"], ["why-us", "Why LeadStrategus"], ["build", "How it's built"], ["pricing", "Pricing"], ["faq", "FAQ"]];

export default function TwinPage() {
  return (
    <>
      <JsonLd data={[serviceJsonLd({ name: "GTM AI Twin", description: svc.what, path: "/gtm-ai-twin", category: "AI agents for go-to-market", alternateNames: svc.seoTerms }), faqJsonLd(twinFaq), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "GTM AI Twin", path: "/gtm-ai-twin" }])]} />

      <section className="band relative overflow-hidden pt-[var(--nav-h)]">
        <Bloom hue="ember" at="tr" size={64} />
        <FieldPlate fx="74%" fy="30%" />
        <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <h1 className="display text-[2.4rem] sm:text-[3.2rem] md:text-[4.2rem]">{twin.h1}<br /><em>{twin.h1em}</em></h1>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-5 font-display text-[1.15rem] font-medium leading-snug tracking-[-0.02em] md:text-[1.45rem]">
                The heavy lifting done by <span className="text-ember-ink">AI agents</span>.{" "}
                <br className="hidden sm:block" />
                The decision making done by <span className="text-ember-ink">you</span>.
              </p>
            </Reveal>
            <Reveal delay={160}><p className="lede mt-6 max-w-xl">{twin.lede}</p></Reveal>
            <Reveal delay={220} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact?type=gtm-ai-twin" size="lg">Scope my twin</Button>
              <Button href="#agents" size="lg" variant="outline">See the agents</Button>
            </Reveal>
          </div>
          <div className="lg:col-span-6"><Reveal delay={170}><AgentConsole /></Reveal></div>
        </div>
      </section>

      <div className="sticky top-[var(--nav-h)] z-30 border-y border-rule bg-paper/90 backdrop-blur-xl">
        <div className="container-x scrollbar-none flex gap-6 overflow-x-auto py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
          {anchors.map(([id, l]) => <a key={id} href={`#${id}`} className="shrink-0 text-muted transition-colors hover:text-ember-ink">{l}</a>)}
        </div>
      </div>

      <Section id="agents" className="scroll-mt-[calc(var(--nav-h)+56px)]">
        <Reveal>
          <h2 className="h2 max-w-4xl balance">{twin.agentsIntro.h}</h2>
          <p className="lede mt-5 max-w-3xl">{twin.agentsIntro.p}</p>
        </Reveal>
        <Reveal delay={80} className="mt-12"><AgentMap /></Reveal>
        <p className="mt-6 max-w-3xl text-[0.8rem] leading-relaxed text-dim">
          <Copy text="[[Agent names, coverage and live/in-build status shown here are indicative and are being reconciled with the leadstrategus.ai roster.]]" />
        </p>
      </Section>

      {/* 01 · what is it */}
      <Section band="sand" id="what" className="scroll-mt-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-12">
            <Reveal><h2 className="h2 balance">What is the service?</h2></Reveal>
            <Reveal delay={40}><p className="lede mt-6 max-w-4xl text-fg">{svc.what}</p></Reveal>
            <Reveal delay={60}><h3 className="h3 mt-10 max-w-3xl balance">{twin.what.h}</h3></Reveal>
            <div className="mt-5 space-y-5 text-[1.05rem] leading-relaxed text-muted md:text-lg">
              {twin.what.paras.map((p, i) => <Reveal key={i} delay={i * 60}><p>{p}</p></Reveal>)}
            </div>
            <div className="mt-11 grid gap-4 md:grid-cols-2">
              <Reveal className="card p-6">
                <div className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ember-ink">It is</div>
                <ul className="mt-4 space-y-3">{twin.what.isList.map((t) => <li key={t} className="flex gap-3 text-[0.94rem]"><Check className="mt-0.5 size-4 shrink-0 text-ember" />{t}</li>)}</ul>
              </Reveal>
              <Reveal delay={70} className="card p-6">
                <div className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">It is not</div>
                <ul className="mt-4 space-y-3">{twin.what.notList.map((t) => <li key={t} className="flex gap-3 text-[0.94rem] text-muted"><X className="mt-0.5 size-4 shrink-0 text-dim" />{t}</li>)}</ul>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* 02 · why now */}
      <Section id="why-now" className="scroll-mt-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-12">
            <Reveal><h2 className="h2 balance">Why is it important now?</h2></Reveal>
            <Reveal delay={40}><p className="lede mt-6 max-w-4xl text-fg">{svc.whyNow}</p></Reveal>
            <Reveal delay={60}><h3 className="h3 mt-10 max-w-3xl balance">{twin.why.h}</h3></Reveal>
            <ol className="mt-11 grid gap-x-10 gap-y-9 md:grid-cols-2">
              {twin.why.reasons.map((r, i) => (
                <Reveal key={r.n} as="li" delay={i * 70}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-10 bg-ember" />
                  </div>
                  <h3 className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.025em] md:text-[1.32rem]">{r.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted"><Copy text={r.b} /></p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* 03 · why us */}
      <Section band="sand" id="why-us" className="scroll-mt-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="text-sm text-muted">Leadership from</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-display text-[0.95rem] font-semibold tracking-tight">{proof.pedigree.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          <div className="lg:col-span-8">
            <Reveal><h2 className="h2 balance">Why LeadStrategus?</h2></Reveal>
            <ul className="mt-7 space-y-3">
              {svc.whyUs.map((t, i) => (
                <Reveal key={t} as="li" delay={i * 50} className="flex gap-3 text-[1.02rem] leading-relaxed md:text-[1.08rem]">
                  <Check className="mt-1 size-4 shrink-0 text-ember" aria-hidden />{t}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={60}><h3 className="h3 mt-10 max-w-3xl balance">{twin.whyUs.h}</h3></Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {twin.whyUs.points.map((p, i) => (
                <Reveal key={p.t} delay={i * 60} className="card card-hover p-6">
                  <h3 className="mt-5 font-display text-[1.08rem] font-semibold tracking-tight">{p.t}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{p.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* build */}
      <Section id="build" className="scroll-mt-32">
        <Reveal>
          <h2 className="h2 max-w-3xl balance"><Copy text="[[Six weeks]] from kickoff to a supervised live run." /></h2>
        </Reveal>
        <ol className="rail rail--swipe mt-12 md:grid-cols-4">
          {twin.build.map((b, i) => (
            <li key={b.t} className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-ember" />
              </div>
              <div className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ember-ink">{b.wk}</div>
              <div className="mt-1.5 font-display text-xl font-semibold tracking-tight">{b.t}</div>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">{b.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* pricing */}
      <Section band="blush" id="pricing" tight className="scroll-mt-32">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <h2 className="h3">{twin.pricing.model}</h2>
          </div>
          <div className="md:col-span-7">
            <div className="display text-[1.7rem] text-ember-ink md:text-[2.3rem]"><Copy text={twin.pricing.from} /></div>
            <p className="mt-4 text-fg-soft"><Copy text={twin.pricing.note} /></p>
            <Button href="/contact?type=gtm-ai-twin" className="mt-8">Get a scoped quote</Button>
          </div>
        </Reveal>
      </Section>

      <Section id="faq" className="scroll-mt-32"><FAQBlock items={twinFaq} title="What people ask before they build one." /></Section>

      <CTABand
        title={<>Your GTM team, <em>twinned.</em></>}
        lede="A forty-minute scoping call: your ICP, your motion, your stack. We tell you what the twin would take over first and what it would cost."
        primary={{ label: "Scope my twin", href: "/contact?type=gtm-ai-twin" }}
        secondary={{ label: "See the platform", href: "https://leadstrategus.ai", external: true }}
      />
    </>
  );
}
