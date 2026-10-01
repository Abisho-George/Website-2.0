"use client";
import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Copy } from "@/components/ui/Copy";
import { StaggerItem } from "@/components/motion/Stagger";
import type { Author } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * A founder's card, and their full details in a popup over a blurred page.
 *
 * The popup is a native <dialog> opened with showModal(), so focus moves into
 * it, Escape closes it and the page behind is inert. A click anywhere outside
 * the panel (on the blurred backdrop) closes it too. The card carries the
 * founder's slug as its id, so /about#<slug> opens that founder's popup.
 */
const dialogId = (slug: string) => `founder-${slug}`;

function open(slug: string) {
  const d = document.getElementById(dialogId(slug)) as HTMLDialogElement | null;
  if (d && !d.open) d.showModal();
}

export function FounderCard({ a, i = 0, className }: { a: Author; i?: number; className?: string }) {
  const first = a.name.split(" ")[0];
  return (
    <StaggerItem i={i} className={cn("h-full", className)}>
      <article id={a.slug} className="card card-hover group relative h-full scroll-mt-[calc(var(--nav-h)+24px)] p-6 md:p-7">
        <div className="flex items-center gap-5">
          <Photo a={a} className="size-20 md:size-24" />
          <p className="font-mono text-label uppercase tracking-[0.14em] text-ember-ink">{a.role}</p>
        </div>
        <h3 className="h3 mt-5">
          {/* the stretched button makes the whole card the target */}
          <button
            type="button"
            data-founder-open={a.slug}
            aria-haspopup="dialog"
            aria-controls={dialogId(a.slug)}
            onClick={() => open(a.slug)}
            className="text-left transition-colors duration-[var(--dur-1)] after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] group-hover:text-ember-ink"
          >
            {a.name}
          </button>
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-soft"><Copy text={a.bio} /></p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ember-ink">
          More about {first} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </p>
      </article>
    </StaggerItem>
  );
}

function Photo({ a, className }: { a: Author; className?: string }) {
  return a.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={a.image}
      alt={`${a.name}, ${a.role} of LeadStrategus`}
      width={112}
      height={112}
      loading="lazy"
      decoding="async"
      className={cn("shrink-0 rounded-full object-cover shadow-e2 ring-4 ring-paper", className)}
    />
  ) : (
    <div className={cn("flex shrink-0 items-center justify-center rounded-full bg-ember-wash font-display text-2xl font-semibold text-ember-ink", className)} aria-hidden>
      {a.name.split(" ").map((s) => s[0]).join("")}
    </div>
  );
}

function FounderDialog({ a }: { a: Author }) {
  return (
    <dialog
      id={dialogId(a.slug)}
      data-founder-dialog
      aria-labelledby={`${dialogId(a.slug)}-name`}
      className="founder-dialog"
      // a click that lands on the dialog element itself, not the panel inside
      // it, is a click on the backdrop
      onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
    >
      <div className="founder-dialog__panel">
        <button type="button" data-founder-close onClick={(e) => (e.currentTarget.closest("dialog") as HTMLDialogElement).close()} aria-label="Close" className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-rule text-muted transition-colors hover:border-rule-strong hover:text-fg">
          <X className="size-4" />
        </button>
        <div className="flex items-center gap-5 pr-10">
          <Photo a={a} className="size-20 md:size-28" />
          <div>
            <p className="font-mono text-label uppercase tracking-[0.14em] text-ember-ink">{a.role}</p>
            <h2 id={`${dialogId(a.slug)}-name`} className="h2 mt-1">{a.name}</h2>
          </div>
        </div>
        <p className="mt-6 text-[1.02rem] leading-relaxed text-fg"><Copy text={a.bio} /></p>
        <div className="mt-5 space-y-4 border-t border-rule pt-5 text-[0.95rem] leading-relaxed text-fg-soft">
          {a.long.map((para, k) => <p key={k}><Copy text={para} /></p>)}
        </div>
        {a.linkedin && (
          <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ember-ink">
            {a.name} on LinkedIn <ArrowUpRight className="size-4" />
          </a>
        )}
      </div>
    </dialog>
  );
}

/** The founders as a set, with their popups mounted once for the page. */
export function FounderGrid({ authors, className }: { authors: Author[]; className?: string }) {
  // /about#kingshuk-hazra lands with that founder's popup open
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (authors.some((a) => a.slug === id)) open(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [authors]);

  return (
    <>
      <div className={cn("grid gap-4 md:grid-cols-2", className)}>
        {authors.map((a, i) => <FounderCard key={a.slug} a={a} i={i} />)}
      </div>
      {authors.map((a) => <FounderDialog key={a.slug} a={a} />)}
    </>
  );
}
