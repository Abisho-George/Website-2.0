import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Copy, strip } from "@/components/ui/Copy";
import { Stat } from "@/components/ui/Stat";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumb, CaseTile, CTABand, Quote } from "@/components/site/Blocks";
import { Bloom, FieldPlate } from "@/components/ui/Atmos";
import { caseStudies, getCase } from "@/content/work";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() { return caseStudies.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug); if (!c) return {};
  return buildMetadata({ title: strip(c.title), description: c.summary, path: `/work/${c.slug}`, type: "article" });
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug); if (!c) notFound();
  const more = caseStudies.filter((x) => x.slug !== c.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: strip(c.title), path: `/work/${c.slug}` }])} />
      <section className="relative overflow-hidden pt-[var(--nav-h)]">
        <Bloom hue="ember" at="tr" size={56} />
        <div className="container-x relative py-16 md:py-24">
          <Breadcrumb items={[{ label: "Work", href: "/work" }, { label: c.vertical }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal><div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">{c.client} · {c.region} · {c.year}</div></Reveal>
              <Reveal delay={60}><h1 className="display mt-5 text-[2.4rem] md:text-[4rem]"><Copy text={c.title} /></h1></Reveal>
              <Reveal delay={120}><p className="lede mt-6 max-w-2xl">{c.summary}</p></Reveal>
              <Reveal delay={180} className="mt-6 flex flex-wrap gap-1.5">{c.tags.map((t) => <span key={t} className="rounded-full border border-rule px-2.5 py-1 text-[0.72rem] text-muted">{t}</span>)}</Reveal>
            </div>
            <Reveal delay={200} className="card h-fit p-6 lg:col-span-4">
              <div className="mb-6 font-display text-lg font-semibold tracking-tight">Results</div>
              <div className="space-y-7">{c.stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} size="md" />)}</div>
              <div className="mt-8 border-t border-rule pt-5 text-sm text-muted">Practice: <Link href={`/practices/${c.practiceSlug}`} className="link-u text-fg">{c.practice}</Link></div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section band="sand">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Reveal><h2 className="h2 balance">The challenge</h2></Reveal></div>
          <div className="lg:col-span-8"><Reveal><p className="text-xl leading-relaxed md:text-2xl">{c.challenge}</p></Reveal></div>
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Reveal><h2 className="h2 balance">The approach, step by step.</h2></Reveal></div>
          <ol className="space-y-6 lg:col-span-8">
            {c.approach.map((a, i) => (
              <Reveal key={i} as="li" delay={i * 70} className="flex gap-6 border-t border-rule pt-6"><span className="mt-[13px] size-1.5 shrink-0 rounded-full bg-ember" /><p className="text-lg leading-relaxed text-fg/90">{a}</p></Reveal>
            ))}
          </ol>
        </div>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Reveal><h2 className="h2 balance">The outcome</h2></Reveal></div>
          <div className="lg:col-span-8">
            <Reveal><p className="text-xl leading-relaxed text-fg md:text-2xl">{c.outcome}</p></Reveal>
            {c.quote && <Reveal delay={100} className="mt-14"><Quote text={c.quote.text} who={c.quote.who} /></Reveal>}
          </div>
        </div>
      </Section>
      <Section className="pt-0">
        <div className="flex items-end justify-between"><h2 className="h3">More work</h2><Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">All work <ArrowRight className="size-4" /></Link></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{more.map((m, i) => <CaseTile key={m.slug} c={m} i={i} compact />)}</div>
      </Section>
      <CTABand title={<>Want this for <em className="serif-em text-ember">your pipeline?</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: `About ${c.practice}`, href: `/practices/${c.practiceSlug}` }} />
    </>
  );
}
