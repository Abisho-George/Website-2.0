"use client";
import { useEffect, useMemo, useState } from "react";
import type { UseCase } from "@/content/use-cases";
import { UseCaseCard } from "./UseCaseCard";
import { cn } from "@/lib/utils";

/**
 * The use-case library: filter by family and by industry. With no family
 * chosen the cases are grouped under their family, so the page still reads
 * as a map of the service lines; choosing one shows that family alone.
 */
export function UseCaseIndex({ items, families, industries }: { items: UseCase[]; families: string[]; industries: string[] }) {
  const [family, setFamily] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  // a service or family page can link here pre-filtered: /use-cases?family=…
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const f = q.get("family"), x = q.get("industry");
    if (f && families.includes(f)) setFamily(f);
    if (x && industries.includes(x)) setIndustry(x);
  }, [families, industries]);
  const shown = useMemo(
    () => items.filter((u) => (!family || u.family === family) && (!industry || u.industry === industry)),
    [items, family, industry],
  );
  const groups = (family ? [family] : families).map((f) => ({ f, list: shown.filter((u) => u.family === f) })).filter((g) => g.list.length);

  const chip = (on: boolean) =>
    cn(
      "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-[0.84rem] transition-colors md:py-1.5",
      on ? "border-fg bg-fg text-paper" : "border-rule bg-paper text-muted hover:border-rule-strong hover:text-fg",
    );

  return (
    <div>
      <div className="sticky top-[var(--nav-h)] z-20 -mx-4 border-b border-rule bg-paper/95 px-4 py-4 backdrop-blur md:mx-0 md:rounded-[var(--radius-lg)] md:border md:px-5">
        <div className="flex flex-col gap-3">
          <div className="scrollbar-none flex items-center gap-2 overflow-x-auto md:flex-wrap" role="group" aria-label="Filter by service family">
            <button type="button" aria-pressed={!family} onClick={() => setFamily(null)} className={chip(!family)}>All families</button>
            {families.map((f) => (
              <button key={f} type="button" aria-pressed={family === f} onClick={() => setFamily(family === f ? null : f)} className={chip(family === f)}>{f}</button>
            ))}
          </div>
          <div className="scrollbar-none flex items-center gap-2 overflow-x-auto md:flex-wrap" role="group" aria-label="Filter by industry">
            <span className="mr-1 shrink-0 text-[0.78rem] font-medium text-dim">Industry</span>
            <button type="button" aria-pressed={!industry} onClick={() => setIndustry(null)} className={chip(!industry)}>Any</button>
            {industries.map((x) => (
              <button key={x} type="button" aria-pressed={industry === x} onClick={() => setIndustry(industry === x ? null : x)} className={chip(industry === x)}>{x}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing <span className="font-medium text-fg">{shown.length}</span> of {items.length} use cases
      </p>

      {groups.length === 0 && (
        <div className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-rule-strong p-10 text-center text-muted">
          No use case matches both filters yet.{" "}
          <button type="button" className="link-u text-fg" onClick={() => { setFamily(null); setIndustry(null); }}>Clear filters</button>
        </div>
      )}

      {groups.map((g) => (
        <section key={g.f} className="mt-12 first-of-type:mt-8">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
            <h2 className="font-display text-[1.35rem] font-semibold tracking-tight md:text-[1.6rem]">{g.f}</h2>
            <span className="shrink-0 text-sm text-dim">{g.list.length}</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {g.list.map((u, i) => <UseCaseCard key={u.slug} u={u} i={i % 3} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
