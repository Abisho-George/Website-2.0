"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Cluster, Insight } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";

export function InsightsIndex({ items, clusters }: { items: Insight[]; clusters: Cluster[] }) {
  const [active, setActive] = useState("all");
  const shown = items.filter((i) => active === "all" || i.cluster === active);
  const name = (s: string) => clusters.find((c) => c.slug === s)?.name ?? s;
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="eyebrow mb-4">Topics</div>
        <ul className="space-y-1">
          <li><button data-filter="cluster" data-value="all" onClick={() => setActive("all")} className={cn("w-full rounded-lg px-3 py-2 text-left text-sm transition-colors", active === "all" ? "bg-white/6 text-fg" : "text-muted hover:text-fg")}>All insights</button></li>
          {clusters.map((c) => (
            <li key={c.slug}>
              <button data-filter="cluster" data-value={c.slug} onClick={() => setActive(c.slug)} className={cn("w-full rounded-lg px-3 py-2 text-left text-sm transition-colors", active === c.slug ? "bg-white/6 text-fg" : "text-muted hover:text-fg")}>
                {c.name}<span className="ml-2 font-mono text-[0.68rem] text-dim">{items.filter((i) => i.cluster === c.slug).length}</span>
              </button>
            </li>
          ))}
        </ul>
        {active !== "all" && <p className="mt-6 text-sm leading-relaxed text-muted">{clusters.find((c) => c.slug === active)?.blurb}</p>}
      </aside>
      <div className="divide-y divide-line border-y border-line lg:col-span-9">
        {shown.map((i, idx) => (
          <Reveal key={i.slug} delay={idx * 40}>
            <Link data-item data-cluster={i.cluster} href={`/insights/${i.slug}`} className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline">
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted md:col-span-3">{name(i.cluster)}<br />{formatDate(i.date)}</div>
              <div className="md:col-span-8">
                <div className="text-[1.35rem] font-medium tracking-tight transition-colors group-hover:text-ember md:text-[1.6rem]">{i.title}</div>
                <p className="mt-2 max-w-2xl text-[0.95rem] text-muted">{i.dek}</p>
              </div>
              <ArrowUpRight className="hidden size-5 justify-self-end text-dim transition-colors group-hover:text-fg md:col-span-1 md:block" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
