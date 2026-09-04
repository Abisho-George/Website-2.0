import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { CTABand } from "@/components/site/Blocks";
import { PageHero } from "@/components/site/PageHero";
import { resources } from "@/content/resources";
import { insightsByDate, clusters, getCluster } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Resources",
  description: "The worksheets, templates, checklists and benchmarks LeadStrategus uses inside client engagements — ICP definition, deliverability, OSINT briefs, pipeline benchmarks and the GTM AI readiness assessment.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        art="insights"
        title={<>The tools we use, <em>not brochures.</em></>}
        lede="Every item here is something our own team fills in during a live engagement. They are useful on their own, which is the only reason to publish them."
      />

      <Section className="hero-next">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => {
            const inner = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-rule bg-sand px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.13em] text-muted">{r.kind}</span>
                  {r.gated
                    ? <Lock className="size-3.5 text-dim" aria-label="Requires an email" />
                    : <ArrowUpRight className="size-4 text-dim transition-colors group-hover:text-ember-ink" />}
                </div>
                <h2 className="mt-6 font-display text-[1.2rem] font-semibold leading-snug tracking-tight"><Copy text={r.title} /></h2>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">{r.blurb}</p>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-dim"><Copy text={r.detail} /></p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ember-ink">
                  {r.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </>
            );
            return (
              <Reveal key={r.slug} delay={i * 50} className="h-full">
                <Link href={r.href ?? `/contact?type=other`} className="card card-hover group flex h-full flex-col p-6">{inner}</Link>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-dim">
          Items marked with a lock ask for a work email. We send the file and nothing else — no sequence, no newsletter.
        </p>
      </Section>

      <Section band="sand">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead title={<>From the <em>blog.</em></>} lede="Longer thinking on go-to-market, published as we learn it." />
          <Link href="/insights" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">All posts <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {insightsByDate.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className="h-full">
              <Link href={`/insights/${p.slug}`} className="card card-hover group flex h-full flex-col p-6">
                <div className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted">{getCluster(p.cluster)?.name} · {formatDate(p.date)}</div>
                <h3 className="mt-5 font-display text-[1.15rem] font-semibold leading-snug tracking-tight">{p.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-muted">{p.dek}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ember-ink">Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {clusters.map((c) => (
            <Link key={c.slug} href="/insights" className="rounded-full border border-rule bg-paper px-3.5 py-1.5 text-[0.8rem] text-muted transition-colors hover:border-rule-strong hover:text-ink">{c.name}</Link>
          ))}
        </div>
      </Section>

      <Section tight>
        <div className="grid items-center gap-8 rounded-[var(--radius-xl)] border border-rule bg-sand p-8 md:grid-cols-12 md:p-10">
          <div className="md:col-span-8">
            <h2 className="h3">Want the benchmark for your segment?</h2>
            <p className="mt-3 text-muted">Tell us the market you sell into and we will send the closest comparable set we have, with the sample size attached.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end"><Button href="/contact" size="lg">Request it</Button></div>
        </div>
      </Section>

      <CTABand title={<>Rather have us <em>run it?</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "See all services", href: "/services" }} />
    </>
  );
}
