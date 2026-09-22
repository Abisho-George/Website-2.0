import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copy } from "@/components/ui/Copy";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { Accordion } from "@/components/ui/Accordion";
import { IconPlate } from "@/components/ui/IconPlate";
import { Bloom, FieldPlate } from "@/components/ui/Atmos";
import { StaggerItem } from "@/components/motion/Stagger";
import { practiceIconFor } from "@/components/icons/registry";
import { PracticeGlyph } from "@/components/visual/PracticeGlyph";
import type { CaseStudy, FAQ, Practice } from "@/content/types";
import { proof } from "@/content/site";

export function PracticeCard({ p, i }: { p: Practice; i: number }) {
  return (
    <StaggerItem i={i} className="h-full">
      <Link href={`/practices/${p.slug}`} className="card group relative flex h-full flex-col overflow-hidden p-6 md:p-8">
        {/* The glyph was drawn on a 120x80 viewBox and rendered at 56x80 in a
            corner, which is a smudge. At watermark scale it is a drawing. */}
        <PracticeGlyph slug={p.slug} className="pointer-events-none absolute -right-6 -top-4 h-40 w-56 opacity-[0.08] transition-opacity duration-[var(--dur-2)] group-hover:opacity-[0.14]" />
        <div className="relative flex items-center justify-between gap-4">
          <IconPlate icon={practiceIconFor(p.slug)} presentation="plate" size="lg" />
          <span className="font-mono text-micro tracking-[0.16em] text-faint">{p.index}</span>
        </div>
        <h3 className="h3 relative mt-7">{p.name}</h3>
        <p className="relative mt-2.5 text-muted">{p.tagline}</p>
        <ul className="relative mt-6 flex flex-wrap gap-1.5">
          {p.services.slice(0, 4).map((s) => (
            <li key={s} className="rounded-full border border-rule bg-sand px-2.5 py-1 text-[0.72rem] text-muted">{s}</li>
          ))}
          {p.services.length > 4 && (
            <li className="rounded-full px-2.5 py-1 font-mono text-[0.72rem] text-dim">+{p.services.length - 4} more</li>
          )}
        </ul>
        <span className="relative mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ember-ink">
          Explore <ArrowRight className="size-4 transition-transform duration-[var(--dur-1)] ease-standard group-hover:translate-x-1" />
        </span>
      </Link>
    </StaggerItem>
  );
}

export function CaseTile({ c, i = 0, compact }: { c: CaseStudy; i?: number; compact?: boolean }) {
  return (
    <StaggerItem i={i} className="h-full">
      <Link href={`/work/${c.slug}`} className={cn("card group flex h-full flex-col p-6", !compact && "md:p-7")}>
        <div className="flex items-center justify-between gap-3 font-mono text-[0.66rem] uppercase tracking-[0.13em] text-muted">
          <span>{c.vertical}</span>
          <span className="text-dim">{c.region}</span>
        </div>
        <h3 className={cn("mt-5 font-display font-semibold tracking-[-0.028em]", compact ? "text-[1.12rem] leading-snug" : "h3")}><Copy text={c.title} /></h3>
        {!compact && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{c.summary}</p>}
        <div className="mt-auto grid grid-cols-3 gap-3 border-t border-rule pt-5 [margin-top:1.75rem]">
          {c.stats.map((s) => (
            <div key={s.label}>
              <div className="datum text-xl font-semibold tracking-tight md:text-[1.4rem]"><Copy text={s.value} /></div>
              <div className="mt-1 text-[0.7rem] leading-snug text-dim">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-ember-ink">
          <span>{c.practice}</span><ArrowRight className="size-4 transition-transform duration-[var(--dur-1)] group-hover:translate-x-1" />
        </div>
      </Link>
    </StaggerItem>
  );
}

export function Quote({ text, who }: { text: string; who: string }) {
  return (
    <figure className="relative border-l-2 border-ember pl-6 md:pl-8">
      {/* the opening mark hangs outside the measure, as it should */}
      <span aria-hidden className="pointer-events-none absolute -left-1 -top-6 select-none font-serif text-[5rem] leading-none text-ember/20 md:-top-8 md:text-[7rem]">&ldquo;</span>
      <blockquote className="serif-quote relative text-[1.4rem] leading-[1.28] balance md:text-[1.9rem]">
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
        <StaggerItem key={s.label} i={i}><Stat value={s.value} suffix={s.suffix} label={s.label} delay={i * 90} /></StaggerItem>
      ))}
    </div>
  );
}

export function FAQBlock({ items, title = "Asked often, answered plainly.", tone = "ember" }: { items: FAQ[]; title?: string; tone?: "ember" | "twin" }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <h2 className="h2 balance">{title}</h2>
      </div>
      <div className="lg:col-span-8"><Accordion items={items} tone={tone} /></div>
    </div>
  );
}

export function CTABand({ title, lede, primary, secondary, tone = "ember" }: { title: React.ReactNode; lede?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string; external?: boolean }; tone?: "ember" | "twin" }) {
  return (
    <section className="band band--ink sheen relative overflow-hidden">
      <Bloom hue="ember" at="bottom" size={78} />
      <FieldPlate fy="70%" />
      <div className="container-x section-y relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          {/* one specular pass as the band arrives, then never again */}
          <span aria-hidden className="sheen__pass" />
          <h2 className="display-2 balance">{title}</h2>
          {lede && <p className="lede mx-auto mt-6 max-w-2xl">{lede}</p>}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primary.href} size="lg" variant={tone === "twin" ? "twin" : "primary"}>{primary.label}</Button>
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
          <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted">Leadership from</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-display text-[0.95rem] font-semibold tracking-tight">
            {proof.pedigree.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 text-sm text-muted">
          {/* five literal stars announced only as "rating" told a screen reader
              nothing; the name now carries the figure, flag and all */}
          <span className="flex items-center gap-0.5 text-ember" role="img" aria-label={`Rated ${proof.clutch.rating.replace(/\[\[|\]\]/g, "")} out of 5 on Clutch from ${proof.clutch.reviews.replace(/\[\[|\]\]/g, "")} reviews`}>
            {Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />)}
          </span>
          <span aria-hidden><Copy text={proof.clutch.rating} /> on Clutch · <Copy text={proof.clutch.reviews} /> reviews</span>
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
