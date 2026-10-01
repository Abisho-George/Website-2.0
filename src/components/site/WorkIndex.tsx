"use client";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CaseTile } from "./Blocks";
import { RailIndicator } from "@/components/motion/RailIndicator";
import type { CaseStudy } from "@/content/types";
import { getGroup } from "@/content/practices";

/**
 * Two segmented controls over the case studies. They were loose rows of
 * pills that swapped a background colour; they are now real grouped buttons
 * with an ink thumb that travels between options, so the filter reads as one
 * control rather than six independent toggles.
 *
 * Filtered-out tiles leave rather than vanish: `shown` keys the grid so the
 * survivors re-enter on the entrance curve, and the count of matches is
 * announced, because a silent grid change is invisible to a screen reader.
 */
const familyOf = (c: CaseStudy) => getGroup(c.group)?.short ?? "Other";

export function WorkIndex({ items }: { items: CaseStudy[] }) {
  const practicesList = useMemo(() => ["All", ...Array.from(new Set(items.map(familyOf)))], [items]);
  const verticals = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.vertical)))], [items]);
  const [practice, setPractice] = useState("All");
  const [vertical, setVertical] = useState("All");
  const shown = items.filter((i) => (practice === "All" || familyOf(i) === practice) && (vertical === "All" || i.vertical === vertical));

  const option = (on: boolean) =>
    cn(
      "relative z-[1] rounded-full px-3.5 py-1.5 text-[0.78rem] transition-colors duration-[var(--dur-1)]",
      on ? "text-paper" : "text-muted hover:text-fg",
    );

  const group = (
    legend: string,
    values: string[],
    current: string,
    set: (v: string) => void,
    filter: string,
  ) => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-micro uppercase tracking-[0.15em] text-muted">{legend}</span>
      <div className="rail-track flex flex-wrap items-center gap-1 rounded-full border border-rule p-1" role="group" aria-label={legend}>
        {/* a thumb, not a baseline rail, and it tracks both axes, because
            these groups wrap onto a second row at most widths */}
        <RailIndicator active={current} fill className="!bg-ink" />
        {values.map((v) => (
          <button
            key={v}
            data-filter={filter}
            data-value={v}
            data-rail-item={v}
            aria-pressed={current === v}
            onClick={() => set(v)}
            className={option(current === v)}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {group("Family", practicesList, practice, setPractice, "practice")}
        {group("Sector", verticals, vertical, setVertical, "vertical")}
      </div>

      <p className="sr-only" role="status">{shown.length} of {items.length} case studies shown</p>

      <div key={`${practice}|${vertical}`} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => (
          <div key={c.slug} data-item data-practice={familyOf(c)} data-vertical={c.vertical}>
            <CaseTile c={c} i={i} />
          </div>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="reveal in py-20 text-center text-muted">Nothing matches that combination yet.</p>
      )}
    </div>
  );
}
