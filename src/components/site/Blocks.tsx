import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copy } from "@/components/ui/Copy";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Section";
import { PracticeGlyph } from "@/components/visual/PracticeGlyph";
import type { CaseStudy, FAQ, Practice } from "@/content/types";
import { proof } from "@/content/site";

export function PracticeCard({ p, i }: { p: Practice; i: number }) {
  return (
    <Reveal delay={i * 70} className="h-full">
      <Link href={`/practices/${p.slug}`} className="card card-hover group relative flex h-full flex-col overflow-hidden p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[0.7rem] text-ember-ink">{p.index}</span>
          <PracticeGlyph slug={p.slug} className="h-14 w-20 shrink-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <h3 className="mt-8 font-display text-[1.55rem] font-semibold tracking-[-0.03em] md:text-[1.75rem]">{p.name}</h3>
        <p className="mt-2.5 text-muted">{p.tagline}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {p.services.slice(0, 4).map((s) => (
            <li key={s} className="rounded-full border border-rule bg-sand px-2.5 py-1 text-[0.72rem] text-muted">{s}</li>
          ))}
        </ul>
        <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ember-ink">
          Explore <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

export function CaseTile({ c, i = 0, compact }: { c: CaseStudy; i?: number; compact?: boolean }) {
  return (
    <Reveal delay={i * 70} className="h-full">
      <Link href={`/work/${c.slug}`} className={cn("card card-hover group flex h-full flex-col p-6", !compact && "md:p-7")}>
        <div className="flex items-center justify-between gap-3 font-mono text-[0.66rem] uppercase tracking-[0.13em] text-muted">
          <span>{c.vertical}</span>
          <span className="text-dim">{c.region}</span>
        </div>
        <h3 className={cn("mt-5 font-display font-semibold tracking-[-0.028em]", compact ? "text-[1.12rem] leading-snug" : "text-[1.3rem] leading-[1.18] md:text-[1.45rem]")}><Copy text={c.title} /></h3>
        {!compact && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{c.summary}</p>}
        <div className="mt-auto grid grid-cols-3 gap-3 border-t border-rule pt-5 [margin-top:1.75rem]">
          {c.stats.map((s) => (
            <div key={s.label}>
              <div className="tnum font-display text-xl font-semibold tracking-tight md:text-[1.4rem]"><Copy text={s.value} /></div>
              <div className="mt-1 text-[0.7rem] leading-snug text-dim">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-ember-ink">
          <span>{c.practice}</span><ArrowRight className="size-4" />
        </div>
      </Link>
    </Reveal>
  );
}

export function Quote({ text, who }: { text: string; who: string }) {
  return (
    <figure className="relative border-l-2 border-ember pl-6 md:pl-8">
      <blockquote className="font-display text-[1.4rem] font-medium leading-[1.25] tracking-[-0.02em] balance md:text-[1.9rem]">
        <Copy text={text} />
      </blockquote>
      <figcaption className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted"><Copy text={who} /></figcaption>
    </figure>
  );
}

export function StatRow({ stats, className }: { stats: { value: string; suffix?: string; label: string }[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4", className)}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 60}><Stat value={s.value} suffix={s.suffix} label={s.label} /></Reveal>
      ))}
    </div>
  );
}

export function FAQBlock({ items, eyebrow = "Questions", title = "Asked often, answered plainly.", tone = "ember" }: { items: FAQ[]; eyebrow?: string; title?: string; tone?: "ember" | "ion" }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
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
    <section className="band band--ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_115%,rgba(255,90,31,.32),transparent_70%)]" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-x section-y relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="display text-[2.4rem] balance md:text-[4.2rem]">{title}</h2>
          {lede && <p className="lede mx-auto mt-6 max-w-2xl">{lede}</p>}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primary.href} size="lg" variant={tone === "ion" ? "ion" : "primary"}>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} size="lg" external={secondary.external} className="border border-white/25 text-[#f6f2ec] hover:border-white/60 hover:bg-white/5" variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProofBar() {
  return (
    <div className="border-y border-rule bg-sand">
      <div className="container-x flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="eyebrow shrink-0">Leadership from</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-display text-[0.95rem] font-semibold tracking-tight">
            {proof.pedigree.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 text-sm text-muted">
          <span className="text-ember" aria-label="rating">★★★★★</span>
          <span><Copy text={proof.clutch.rating} /> on Clutch · <Copy text={proof.clutch.reviews} /> reviews</span>
        </div>
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-muted">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-dim">/</span>}
          {it.href ? <Link href={it.href} className="transition-colors hover:text-ember-ink">{it.label}</Link> : <span className="text-fg">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
