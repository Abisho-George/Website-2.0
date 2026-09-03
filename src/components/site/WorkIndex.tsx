"use client";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CaseTile } from "./Blocks";
import type { CaseStudy } from "@/content/types";

export function WorkIndex({ items }: { items: CaseStudy[] }) {
  const practicesList = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.practice)))], [items]);
  const verticals = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.vertical)))], [items]);
  const [practice, setPractice] = useState("All");
  const [vertical, setVertical] = useState("All");
  const shown = items.filter((i) => (practice === "All" || i.practice === practice) && (vertical === "All" || i.vertical === vertical));
  const pill = (active: boolean) => cn("rounded-full border px-3 py-1.5 text-[0.78rem] transition-colors", active ? "border-fg bg-fg text-ink" : "border-line text-muted hover:border-line-strong hover:text-fg");
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2"><span className="eyebrow mr-2">Practice</span>{practicesList.map((p) => <button key={p} onClick={() => setPractice(p)} className={pill(practice === p)}>{p}</button>)}</div>
        <div className="flex flex-wrap items-center gap-2"><span className="eyebrow mr-2">Sector</span>{verticals.map((v) => <button key={v} onClick={() => setVertical(v)} className={pill(vertical === v)}>{v}</button>)}</div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => <CaseTile key={c.slug} c={c} i={i} />)}
      </div>
      {shown.length === 0 && <p className="py-20 text-center text-muted">Nothing matches that combination yet.</p>}
    </div>
  );
}
