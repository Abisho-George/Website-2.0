import { Sparkles, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Copy } from "@/components/ui/Copy";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTABand, FAQBlock } from "@/components/site/Blocks";
import { TwinRunLog } from "@/components/visual/TwinRunLog";
import { TwinDiagram } from "@/components/visual/TwinDiagram";
import { twin } from "@/content/twin";
import { twinFaq } from "@/content/faq";
import { proof } from "@/content/site";
import { buildMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "GTM AI Twin — custom AI agents that run your go-to-market end to end",
  description: "We build custom AI agents that take over B2B go-to-market: identify prospects, research accounts, reach out in your voice, handle replies and book qualified meetings. What it is, why now, and why LeadStrategus.",
  path: "/gtm-ai-twin",
});

const anchors = [["what", "What is it"], ["why-now", "Why now"], ["why-us", "Why LeadStrategus"], ["build", "How it's built"], ["pricing", "Pricing"], ["faq", "FAQ"]];

export default function TwinPage() {
  return (
    <>
      <JsonLd data={[serviceJsonLd({ name: "GTM AI Twin", description: twin.lede, path: "/gtm-ai-twin" }), faqJsonLd(twinFaq), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "GTM AI Twin", path: "/gtm-ai-twin" }])]} />

      {/* hero */}
      <section className="relative overflow-hidden pt-[var(--nav-h)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_30%,rgba(124,243,214,.16),transparent_70%)]" />
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="container-x relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><Eyebrow tone="ion" className="mb-6">{twin.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h1 className="display text-[3rem] sm:text-[4rem] md:text-[5.2rem]">{twin.h1}<br /><em className="text-ion">{twin.h1em}</em></h1>
            </Reveal>
            <Reveal delay={160}><p className="lede mt-7 max-w-xl">{twin.lede}</p></Reveal>
            <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact?type=gtm-ai-twin" variant="ion" size="lg"><Sparkles className="size-4" /> Scope my twin</Button>
              <Button href="#what" variant="outline" size="lg">How it works</Button>
            </Reveal>
          </div>
          <div className="lg:col-span-6"><Reveal delay={200}><TwinRunLog /></Reveal></div>
        </div>
      </section>

      {/* sticky anchor nav */}
      <div className="sticky top-[var(--nav-h)] z-30 border-y border-line bg-ink/80 backdrop-blur-xl">
        <div className="container-x scrollbar-none flex gap-6 overflow-x-auto py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em]">
          {anchors.map(([id, l]) => <a key={id} href={`#${id}`} className="shrink-0 text-muted transition-colors hover:text-ion">{l}</a>)}
        </div>
      </div>

      {/* pipeline */}
      <Section tight>
        <Reveal>
          <Eyebrow tone="ion" className="mb-4">What it takes over</Eyebrow>
          <h2 className="h2 max-w-3xl balance">Six agents. One hand-off chain. <em className="serif-em text-muted">From first signal to booked meeting.</em></h2>
        </Reveal>
        <Reveal delay={100} className="mt-14"><TwinDiagram /></Reveal>
      </Section>

      {/* 01 · What is it */}
      <Section id="what" className="scroll-mt-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="display text-[4rem] text-ion/80">01</div>
            <Eyebrow tone="ion" className="mt-2">{twin.what.title}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <Reveal><h2 className="h2 balance">{twin.what.h}</h2></Reveal>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {twin.what.paras.map((p, i) => <Reveal key={i} delay={i * 60}><p>{p}</p></Reveal>)}
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <Reveal className="card p-6">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ion">It is</div>
                <ul className="mt-4 space-y-3">{twin.what.isList.map((t) => <li key={t} className="flex gap-3 text-[0.95rem]"><Check className="mt-0.5 size-4 shrink-0 text-ion" />{t}</li>)}</ul>
              </Reveal>
              <Reveal delay={80} className="card p-6">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">It is not</div>
                <ul className="mt-4 space-y-3">{twin.what.notList.map((t) => <li key={t} className="flex gap-3 text-[0.95rem] text-muted"><X className="mt-0.5 size-4 shrink-0 text-dim" />{t}</li>)}</ul>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* 02 · Why now */}
      <Section id="why-now" paper className="scroll-mt-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="display text-[4rem] text-ink/25">02</div>
            <Eyebrow className="mt-2">{twin.why.title}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <Reveal><h2 className="h2 balance">{twin.why.h}</h2></Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-ink/15 bg-ink/15 md:grid-cols-2">
              {twin.why.reasons.map((r, i) => (
                <Reveal key={r.n} delay={i * 80} className="bg-paper p-7 md:p-8">
                  <div className="font-mono text-[0.72rem] text-ember">{r.n}</div>
                  <h3 className="mt-6 text-xl font-medium tracking-tight">{r.t}</h3>
                  <p className="mt-3 leading-relaxed text-ink/70"><Copy text={r.b} /></p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 03 · Why LeadStrategus */}
      <Section id="why-us" className="scroll-mt-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="display text-[4rem] text-ion/80">03</div>
            <Eyebrow tone="ion" className="mt-2">{twin.whyUs.title}</Eyebrow>
            <p className="mt-8 text-sm text-muted">Leadership from</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">{proof.pedigree.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          <div className="lg:col-span-8">
            <Reveal><h2 className="h2 balance">{twin.whyUs.h}</h2></Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {twin.whyUs.points.map((p, i) => (
                <Reveal key={p.t} delay={i * 70} className="card card-hover p-6">
                  <div className="flex size-8 items-center justify-center rounded-full border border-ion/40 font-mono text-[0.68rem] text-ion">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-5 text-lg font-medium tracking-tight">{p.t}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{p.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* build */}
      <Section id="build" className="scroll-mt-32 pt-0">
        <Reveal>
          <Eyebrow tone="ion" className="mb-4">How it&apos;s built</Eyebrow>
          <h2 className="h2 max-w-3xl balance"><Copy text="[[Six weeks]] from kickoff to a supervised live run." /></h2>
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {twin.build.map((b, i) => (
            <Reveal key={b.t} as="li" delay={i * 80} className="card relative p-6">
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ion">{b.wk}</div>
              <div className="mt-6 text-xl font-medium tracking-tight">{b.t}</div>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{b.b}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* pricing */}
      <Section id="pricing" tight className="scroll-mt-32">
        <Reveal className="glow-ion grid gap-8 rounded-[var(--radius-xl)] border border-ion/30 bg-ink-2/70 p-8 md:grid-cols-12 md:p-12">
          <div className="md:col-span-5">
            <Eyebrow tone="ion" className="mb-4">Pricing signal</Eyebrow>
            <h2 className="h3">{twin.pricing.model}</h2>
          </div>
          <div className="md:col-span-7">
            <div className="display text-[1.8rem] md:text-[2.4rem]"><Copy text={twin.pricing.from} /></div>
            <p className="mt-4 text-muted"><Copy text={twin.pricing.note} /></p>
            <Button href="/contact?type=gtm-ai-twin" variant="ion" className="mt-8">Get a scoped quote</Button>
          </div>
        </Reveal>
      </Section>

      {/* faq */}
      <Section id="faq" className="scroll-mt-32"><FAQBlock items={twinFaq} tone="ion" title="What people ask before they build one." /></Section>

      <CTABand tone="ion"
        title={<>Your GTM team, <em className="serif-em text-ion">twinned.</em></>}
        lede="A forty-minute scoping call: your ICP, your motion, your stack. We tell you what the twin would take over first and what it would cost."
        primary={{ label: "Scope my twin", href: "/contact?type=gtm-ai-twin" }}
        secondary={{ label: "See the platform", href: "https://leadstrategus.ai", external: true }}
      />
    </>
  );
}
