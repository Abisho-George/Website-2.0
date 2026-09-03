import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Copy, strip } from "@/components/ui/Copy";
import { Artifact } from "@/components/ui/Artifact";
import { Stat } from "@/components/ui/Stat";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumb, CaseTile, CTABand, FAQBlock } from "@/components/site/Blocks";
import { practices, getPractice } from "@/content/practices";
import { getCase } from "@/content/work";
import { buildMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() { return practices.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPractice((await params).slug); if (!p) return {};
  return buildMetadata({ title: p.name, description: strip(p.summary), path: `/practices/${p.slug}` });
}

export default async function PracticePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPractice(slug); if (!p) notFound();
  const related = p.relatedWork.map(getCase).filter(Boolean);
  const others = practices.filter((x) => x.slug !== p.slug);
  return (
    <>
      <JsonLd data={[serviceJsonLd({ name: p.name, description: strip(p.summary), path: `/practices/${p.slug}` }), faqJsonLd(p.faq), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Practices", path: "/practices" }, { name: p.name, path: `/practices/${p.slug}` }])]} />

      {/* 1 · hero */}
      <section className="relative overflow-hidden pt-[var(--nav-h)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_20%,rgba(255,107,61,.14),transparent_70%)]" />
        <div className="container-x relative py-16 md:py-24">
          <Breadcrumb items={[{ label: "Practices", href: "/practices" }, { label: p.short }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal><div className="font-mono text-sm text-ember">{p.index}</div></Reveal>
              <Reveal delay={60}><h1 className="display mt-4 text-[2.8rem] md:text-[4.8rem]">{p.name}</h1></Reveal>
              <Reveal delay={120}><p className="mt-6 font-display text-[1.5rem] italic leading-tight text-muted md:text-[2rem]">{p.tagline}</p></Reveal>
              <Reveal delay={180}><p className="lede mt-7 max-w-2xl">{p.summary}</p></Reveal>
              <Reveal delay={240} className="mt-10 flex flex-wrap gap-3">
                <Button href={`/contact?type=${p.slug}`} size="lg">Talk about {p.short}</Button>
                <Button href="#pricing" variant="outline" size="lg">Pricing signal</Button>
              </Reveal>
            </div>
            {/* 2 · services */}
            <Reveal delay={200} className="card h-fit p-6 lg:col-span-4">
              <div className="eyebrow mb-4">Inside this practice</div>
              <ul className="space-y-2.5 text-[0.95rem]">{p.services.map((s) => <li key={s} className="flex gap-3"><span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-ember" />{s}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 · problem */}
      <Section band="sand" index="01" label="the problem">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5"><Eyebrow className="mb-4">The problem</Eyebrow><Reveal><h2 className="h2 balance">{p.problem.title}</h2></Reveal></div>
          <ul className="space-y-6 lg:col-span-7">
            {p.problem.points.map((pt, i) => (
              <Reveal key={i} as="li" delay={i * 80} className="flex gap-5 border-t border-rule pt-6 text-lg leading-snug">
                <span className="font-mono text-[0.75rem] text-ember">0{i + 1}</span><span><Copy text={pt} /></span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* 4 · deliverables */}
      <Section index="02" label="deliverables">
        <Eyebrow className="mb-4">What you get</Eyebrow>
        <Reveal><h2 className="h2 max-w-3xl balance">Deliverables, not decks.</h2></Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.deliverables.map((d, i) => (
            <Reveal key={d.title} delay={i * 60} className="card card-hover p-6">
              <div className="font-mono text-[0.7rem] text-dim">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-5 text-lg font-medium tracking-tight">{d.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{d.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 · process */}
      <Section index="03" label="process" className="pt-0">
        <Eyebrow className="mb-4">How it runs</Eyebrow>
        <Reveal><h2 className="h2 max-w-3xl balance">Four phases. Weekly reviews. No surprises.</h2></Reveal>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-rule md:grid-cols-4">
          {p.process.map((s, i) => (
            <Reveal key={s.phase} as="li" delay={i * 80} className="bg-paper p-7">
              <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted"><span>Phase {s.phase}</span><span className="text-ember">{s.duration}</span></div>
              <div className="mt-8 text-xl font-medium tracking-tight">{s.title}</div>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 6 · sample output + 7 · outcomes */}
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-4">Sample output</Eyebrow>
            <Reveal><h2 className="h3 mb-8 max-w-xl">What a deliverable actually looks like.</h2></Reveal>
            <Reveal delay={80}><Artifact {...p.sampleOutput} /></Reveal>
          </div>
          <div className="lg:col-span-5">
            <Eyebrow className="mb-4">Outcomes</Eyebrow>
            <Reveal><h2 className="h3 mb-8 max-w-sm">Numbers we are prepared to be measured on.</h2></Reveal>
            <div className="space-y-8 border-l border-rule pl-6">
              {p.outcomes.map((o, i) => <Reveal key={o.label} delay={i * 80}><Stat value={o.value} label={o.label} size="md" /></Reveal>)}
            </div>
          </div>
        </div>
      </Section>

      {/* 8 · pricing */}
      <Section band="sand" id="pricing" tight index="05" label="pricing" className="scroll-mt-28">
        <Reveal className="grid gap-8 rounded-[var(--radius-xl)] border border-ember/30 bg-paper p-8 glow-ember md:grid-cols-12 md:p-12">
          <div className="md:col-span-5"><Eyebrow tone="ember" className="mb-4">Pricing signal</Eyebrow><h2 className="h3">{p.pricing.model}</h2></div>
          <div className="md:col-span-7">
            <div className="flex items-baseline gap-3"><span className="text-sm text-muted">from</span><span className="display text-[1.8rem] md:text-[2.4rem]"><Copy text={p.pricing.from} /></span></div>
            <p className="mt-4 text-muted"><Copy text={p.pricing.note} /></p>
            <Button href={`/contact?type=${p.slug}`} className="mt-8">Get a scoped proposal</Button>
          </div>
        </Reveal>
      </Section>

      {/* 9 · FAQ + related */}
      <Section index="06" label="questions"><FAQBlock items={p.faq} title={`Questions about ${p.short}.`} /></Section>
      {related.length > 0 && (
        <Section className="pt-0">
          <div className="flex items-end justify-between"><Eyebrow>Related work</Eyebrow><Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">All work <ArrowRight className="size-4" /></Link></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">{related.map((c, i) => c && <CaseTile key={c.slug} c={c} i={i} compact />)}</div>
        </Section>
      )}
      <Section band="sand" tight>
        <div className="eyebrow mb-6">Other practices</div>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-rule md:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/practices/${o.slug}`} className="group bg-paper p-6 transition-colors hover:bg-kraft">
              <div className="font-mono text-[0.7rem] text-ember">{o.index}</div>
              <div className="mt-3 text-lg font-medium tracking-tight">{o.name}</div>
              <p className="mt-1 text-sm text-muted">{o.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CTABand title={<>Ready to talk <em className="serif-em text-ember">{p.short}?</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Send an enquiry", href: `/contact?type=${p.slug}` }} />
    </>
  );
}
