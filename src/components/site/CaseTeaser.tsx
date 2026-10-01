import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Copy } from "@/components/ui/Copy";
import { StaggerItem } from "@/components/motion/Stagger";
import type { CaseStudy } from "@/content/types";

/**
 * A case study shown in part. The situation is clipped and fades out, so the
 * card reads as the opening of a story rather than the whole of it; the full
 * case lives on its own page and the whole card links there.
 *
 * A sample case carries a visible label. These stand in until signed-off
 * case studies are published, and must not be mistaken for proof.
 */
export function CaseTeaser({ c, i = 0 }: { c: CaseStudy; i?: number }) {
  return (
    <StaggerItem i={i} className="h-full">
      <Link href={`/work/${c.slug}`} className="card group flex h-full flex-col p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-micro uppercase tracking-[0.13em] text-dim">
          <span>{c.vertical} · {c.region}</span>
          {c.sample && (
            <span className="rounded-full border border-rule-strong bg-sand px-2 py-0.5 normal-case tracking-normal text-muted">
              Sample case study
            </span>
          )}
        </div>
        <h3 className="h4 mt-4">{c.title}</h3>

        {/* the opening of the story only: clipped, then faded into the card */}
        <div className="relative mt-3 max-h-[5.4em] overflow-hidden text-[0.92rem] leading-[1.8em] text-fg-soft">
          <p>{c.situation}</p>
          <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[2.2em] bg-gradient-to-t from-[var(--color-sand-2)] to-transparent" />
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-rule pt-4">
          {c.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="datum text-[1.15rem] font-semibold tracking-tight"><Copy text={s.value} /></dd>
              <dd className="mt-0.5 text-[0.7rem] leading-snug text-dim">{s.label}</dd>
            </div>
          ))}
        </dl>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ember-ink">
          Read the case study
          <ArrowRight className="size-4 transition-transform duration-[var(--dur-1)] group-hover:translate-x-1" />
        </span>
      </Link>
    </StaggerItem>
  );
}
