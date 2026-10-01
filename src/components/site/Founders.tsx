import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Copy } from "@/components/ui/Copy";
import { StaggerItem } from "@/components/motion/Stagger";
import { OpenOnHash } from "./OpenOnHash";
import type { Author } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * A founder, with their details opening in place when their name is clicked.
 *
 * There is no profile page to navigate to: the name is the <summary> of a
 * native <details>, so it works with no JavaScript at all, is announced as
 * expandable by a screen reader, and behaves the same in the static preview.
 * The card carries the founder's slug as its id, so /about#<slug> scrolls to
 * it and <OpenOnHash> opens it.
 */
export function FounderCard({ a, i = 0, className }: { a: Author; i?: number; className?: string }) {
  const first = a.name.split(" ")[0];
  return (
    <StaggerItem i={i} className={cn("h-full", className)}>
      <article id={a.slug} className="card h-full scroll-mt-[calc(var(--nav-h)+24px)] p-6 md:p-7">
        <div className="flex items-center gap-5">
          {a.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={a.image}
              alt={`${a.name}, ${a.role} of LeadStrategus`}
              width={96}
              height={96}
              loading="lazy"
              decoding="async"
              className="size-20 shrink-0 rounded-full object-cover shadow-e2 ring-4 ring-paper md:size-24"
            />
          ) : (
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-ember-wash font-display text-2xl font-semibold text-ember-ink md:size-24" aria-hidden>
              {a.name.split(" ").map((s) => s[0]).join("")}
            </div>
          )}
          <p className="font-mono text-label uppercase tracking-[0.14em] text-ember-ink">{a.role}</p>
        </div>

        <details className="founder mt-5" data-founder>
          {/* summary may hold one heading plus phrasing content, so it is the
              flex row itself rather than wrapping the heading in a span */}
          <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-x-3 gap-y-3 rounded-[var(--radius-sm)] outline-offset-4 [&::-webkit-details-marker]:hidden">
            <h3 className="h3 transition-colors duration-[var(--dur-1)] hover:text-ember-ink">{a.name}</h3>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted">
              <span className="founder__more">More about {first}</span>
              <span className="founder__less">Less</span>
              <ChevronDown className="founder__chev size-4 transition-transform duration-[var(--dur-1)] ease-overshoot" aria-hidden />
            </span>
            <span className="block basis-full text-[0.95rem] leading-relaxed text-fg-soft"><Copy text={a.bio} /></span>
          </summary>
          <div className="founder__body mt-5 space-y-4 border-t border-rule pt-5 text-[0.95rem] leading-relaxed text-fg-soft">
            {a.long.map((para, k) => <p key={k}><Copy text={para} /></p>)}
            {a.linkedin && (
              <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ember-ink">
                {a.name} on LinkedIn <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </details>
      </article>
    </StaggerItem>
  );
}

/** The founders as a set, with the hash opener mounted once for the page. */
export function FounderGrid({ authors, className }: { authors: Author[]; className?: string }) {
  return (
    <>
      <OpenOnHash selector="[data-founder]" />
      <div className={cn("grid gap-4 md:grid-cols-2", className)}>
        {authors.map((a, i) => <FounderCard key={a.slug} a={a} i={i} />)}
      </div>
    </>
  );
}
