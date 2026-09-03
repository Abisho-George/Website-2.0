import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copy } from "@/components/ui/Copy";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Section";
import type { CaseStudy, FAQ, Practice } from "@/content/types";
import { proof } from "@/content/site";

export function PracticeCard({ p, i }: { p: Practice; i: number }) {
  return (
    <Reveal delay={i * 80}>
      <Link href={`/practices/${p.slug}`} className="card card-hover group relative flex h-full flex-col overflow-hidden p-7 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-ember/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.72rem] text-ember">{p.index}</span>
          <ArrowUpRight className="size-5 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
        </div>
        <h3 className="mt-10 text-2xl font-medium tracking-tight md:text-[1.7rem]">{p.name}</h3>
        <p className="mt-3 text-muted">{p.tagline}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {p.services.slice(0, 4).map((s) => (
            <li key={s} className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] text-muted">{s}</li>
          ))}
        </ul>
      </Link>
    </Reveal>
  );
}

export function CaseTile({ c, i = 0, compact }: { c: CaseStudy; i?: number; compact?: boolean }) {
  return (
    <Reveal delay={i * 80} className="h-full">
      <Link href={`/work/${c.slug}`} className={cn("card card-hover group flex h-full flex-col p-6 md:p-7", compact && "p-5 md:p-6")}>
        <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
          <span>{c.vertical}</span>
          <span>{c.region}</span>
        </div>
        <h3 className={cn("mt-6 font-medium tracking-tight", compact ? "text-lg" : "text-xl md:text-[1.4rem]")}><Copy text={c.title} /></h3>
        {!compact && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{c.summary}</p>}
        <div className="mt-auto grid grid-cols-3 gap-3 pt-7">
          {c.stats.map((s) => (
            <div key={s.label}>
              <div className="text-xl font-medium tracking-tight md:text-2xl"><Copy text={s.value} /></div>
              <div className="mt-1 text-[0.72rem] leading-snug text-dim">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-fg">
          <span>{c.practice}</span><ArrowRight className="size-4" />
        </div>
      </Link>
    </Reveal>
  );
}

export function Quote({ text, who, tone = "ember" }: { text: string; who: string; tone?: "ember" | "ion" }) {
  return (
    <figure className="relative">
      <div className={cn("absolute -left-2 -top-6 font-display text-[7rem] leading-none", tone === "ion" ? "text-ion/20" : "text-ember/25")}>“</div>
      <blockquote className="relative font-display text-[1.6rem] italic leading-[1.25] md:text-[2.1rem] balance"><Copy text={text} /></blockquote>
      <figcaption className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted"><Copy text={who} /></figcaption>
    </figure>
  );
}

export function StatRow({ stats, className }: { stats: { value: string; suffix?: string; label: string }[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4", className)}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 70}><Stat value={s.value} suffix={s.suffix} label={s.label} /></Reveal>
      ))}
    </div>
  );
}

export function FAQBlock({ items, eyebrow = "Questions", title = "Asked often, answered plainly.", tone = "ember" }: { items: FAQ[]; eyebrow?: string; title?: string; tone?: "ember" | "ion" }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Eyebrow tone={tone} className="mb-4">{eyebrow}</Eyebrow>
        <h2 className="h2 balance">{title}</h2>
      </div>
      <div className="lg:col-span-8"><Accordion items={items} tone={tone} /></div>
    </div>
  );
}

export function CTABand({ title, lede, primary, secondary, tone = "ember" }: { title: React.ReactNode; lede?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string; external?: boolean }; tone?: "ember" | "ion" }) {
  return (
    <section className="relative overflow-hidden">
      <div className={cn("pointer-events-none absolute inset-0", tone === "ion" ? "bg-[radial-gradient(60%_80%_at_50%_120%,rgba(124,243,214,.22),transparent_70%)]" : "bg-[radial-gradient(60%_80%_at_50%_120%,rgba(255,107,61,.22),transparent_70%)]")} />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative section-y">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="display text-[2.6rem] md:text-[4.4rem] balance">{title}</h2>
          {lede && <p className="lede mx-auto mt-6 max-w-2xl">{lede}</p>}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primary.href} size="lg" variant={tone === "ion" ? "ion" : "primary"}>{primary.label}</Button>
            {secondary && <Button href={secondary.href} size="lg" variant="outline" external={secondary.external}>{secondary.label}</Button>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProofBar() {
  return (
    <div className="border-y border-line bg-ink-2/60">
      <div className="container-x flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Leadership from</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium tracking-tight text-fg/80">
            {proof.pedigree.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-1 text-ember" aria-label="rating">★★★★★</span>
          <span><Copy text={proof.clutch.rating} /> on Clutch · <Copy text={proof.clutch.reviews} /> verified reviews</span>
        </div>
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-dim">/</span>}
          {it.href ? <Link href={it.href} className="transition-colors hover:text-fg">{it.label}</Link> : <span className="text-fg">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
