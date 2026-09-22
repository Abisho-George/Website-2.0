"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Cluster, Insight } from "@/content/types";
import { StaggerItem } from "@/components/motion/Stagger";
import { RailIndicator } from "@/components/motion/RailIndicator";
import { stagger } from "@/lib/motion";

export function InsightsIndex({ items, clusters }: { items: Insight[]; clusters: Cluster[] }) {
  const [active, setActive] = useState("all");
  const shown = items.filter((i) => active === "all" || i.cluster === active);
  const name = (s: string) => clusters.find((c) => c.slug === s)?.name ?? s;

  // the selected topic used to be bg-white/6 — white at 6% on a white ground,
  // which is to say no selected state at all
  const topic = (slug: string, on: boolean) =>
    cn(
      "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-[var(--dur-1)]",
      on ? "bg-sand text-fg shadow-[inset_0_0_0_1px_var(--color-rule)]" : "text-muted hover:bg-sand/60 hover:text-fg",
    );

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="mb-4 font-display text-lg font-semibold tracking-tight">Topics</div>
        <ul className="rail-track space-y-1" role="group" aria-label="Filter by topic">
          <li>
            <button
              data-filter="cluster"
              data-value="all"
              data-rail-item="all"
              aria-pressed={active === "all"}
              onClick={() => setActive("all")}
              className={topic("all", active === "all")}
            >
              All insights
              <span className="ml-2 font-mono text-[0.68rem] text-dim">{items.length}</span>
            </button>
          </li>
          {clusters.map((c) => (
            <li key={c.slug}>
              <button
                data-filter="cluster"
                data-value={c.slug}
                data-rail-item={c.slug}
                aria-pressed={active === c.slug}
                onClick={() => setActive(c.slug)}
                className={topic(c.slug, active === c.slug)}
              >
                {c.name}
                <span className="ml-2 font-mono text-[0.68rem] text-dim">{items.filter((i) => i.cluster === c.slug).length}</span>
              </button>
            </li>
          ))}
          <RailIndicator active={active} orientation="vertical" className="-left-[9px]" />
        </ul>
        {active !== "all" && <p className="mt-6 text-sm leading-relaxed text-muted">{clusters.find((c) => c.slug === active)?.blurb}</p>}
      </aside>
      <div className="divide-y divide-rule border-y border-rule lg:col-span-9">
        {shown.map((i, idx) => (
          // capped stagger: with a dozen insights, idx * 40 put the last row
          // half a second behind the first and it only gets worse with volume
          <StaggerItem key={i.slug} i={idx} step={stagger.tight} cap={6}>
            <Link data-item data-cluster={i.cluster} href={`/insights/${i.slug}`} className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline">
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted md:col-span-3">{name(i.cluster)}<br />{formatDate(i.date)}</div>
              <div className="md:col-span-8">
                <div className="h3 transition-colors duration-[var(--dur-1)] group-hover:text-ember-ink">{i.title}</div>
                <p className="mt-2 max-w-2xl text-[0.95rem] text-muted">{i.dek}</p>
              </div>
              <ArrowUpRight className="hidden size-5 justify-self-end text-dim transition-colors group-hover:text-fg md:col-span-1 md:block" />
            </Link>
          </StaggerItem>
        ))}
      </div>
    </div>
  );
}
