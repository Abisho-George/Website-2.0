import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { Copy } from "@/components/ui/Copy";
import { Breadcrumb, CTABand } from "@/components/site/Blocks";
import { InsightBody } from "@/components/site/InsightBody";
import { insights, getInsight, getCluster } from "@/content/insights";
import { getAuthor } from "@/content/authors";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";

export function generateStaticParams() { return insights.map((i) => ({ slug: i.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const i = getInsight((await params).slug); if (!i) return {};
  return buildMetadata({ title: i.title, description: i.dek, path: `/insights/${i.slug}`, type: "article" });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const i = getInsight((await params).slug); if (!i) notFound();
  const author = getAuthor(i.author); const cluster = getCluster(i.cluster);
  const related = (i.related ?? []).map(getInsight).filter(Boolean);
  const mins = readingTime(i.body.join(" "));
  return (
    <>
      <JsonLd data={[articleJsonLd({ title: i.title, description: i.dek, path: `/insights/${i.slug}`, date: i.date, author: author?.name ?? "LeadStrategus" }), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: i.title, path: `/insights/${i.slug}` }])]} />
      <section className="relative pt-[var(--nav-h)]">
        <div className="container-x py-16 md:py-24">
          <Breadcrumb items={[{ label: "Insights", href: "/insights" }, { label: cluster?.name ?? "" }]} />
          <div className="mx-auto mt-12 max-w-3xl">
            <Reveal><h1 className="display text-[2.4rem] md:text-[3.8rem] balance">{i.title}</h1></Reveal>
            <Reveal delay={80}><p className="lede mt-6">{i.dek}</p></Reveal>
            <Reveal delay={140} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-rule py-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {author && <Link href={`/authors/${author.slug}`} className="text-fg hover:text-ember">{author.name}</Link>}
              <span>{formatDate(i.date)}</span><span>{mins} min read</span>
            </Reveal>
          </div>
        </div>
      </section>
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl"><InsightBody body={i.body} /></div>
        {author && (
          <div className="mx-auto mt-16 max-w-3xl">
            <Link href={`/authors/${author.slug}`} className="card card-hover flex gap-5 p-6">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ember-wash font-display text-lg font-semibold text-ember-ink">{author.name.split(" ").map((s) => s[0]).join("")}</div>
              <div>
                <div className="text-lg font-medium tracking-tight">{author.name}</div>
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">{author.role}</div>
                <p className="mt-2 text-sm text-muted"><Copy text={author.bio} /></p>
              </div>
            </Link>
          </div>
        )}
      </Section>
      {related.length > 0 && (
        <Section band="sand" tight>
          <div className="eyebrow mb-6">Related</div>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-rule md:grid-cols-2">
            {related.map((r) => r && (
              <Link key={r.slug} href={`/insights/${r.slug}`} className="group bg-paper p-6 transition-colors hover:bg-kraft">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-dim">{getCluster(r.cluster)?.name}</div>
                <div className="mt-3 text-lg font-medium tracking-tight">{r.title}</div>
                <p className="mt-1 text-sm text-muted">{r.dek}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm">Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </div>
        </Section>
      )}
      <CTABand title={<>Put this to work on <em className="serif-em text-ember">your pipeline.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "More insights", href: "/insights" }} />
    </>
  );
}
