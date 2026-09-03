"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINES: { agent: string; text: string; tone?: "ok" | "warn" | "ion" }[] = [
  { agent: "prospecting", text: "universe refreshed · 4,212 accounts scanned · 38 moved to active tier" },
  { agent: "research", text: "brief built · Northwind Logistics · S/4 migration · new CIO · 3 open roles" },
  { agent: "qualify", text: "PASS · ICP tier 1 · fit 0.91 · signal 0.84 · score 87", tone: "ok" },
  { agent: "outreach", text: "drafted 1/6 · VP Applications · email · references integration-risk checklist" },
  { agent: "outreach", text: "sent · warmed domain ls-mail-03 · deliverability 99.2%" },
  { agent: "conversation", text: "reply received · \"can you send the checklist and a case?\" · handled", tone: "ok" },
  { agent: "conversation", text: "reply received · \"how does pricing compare to Vendor X?\" · escalated → AE-North", tone: "warn" },
  { agent: "scheduling", text: "meeting booked · Thu 11:30 IST · calendar + CRM updated · brief sent to AE-North", tone: "ion" },
  { agent: "report", text: "today · 38 engaged · 11 replies · 2 escalations · 3 meetings booked" },
];

export function TwinRunLog({ className }: { className?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setN(LINES.length); return; }
    let i = 0; let t: number;
    const tick = () => {
      i += 1; setN(i);
      if (i >= LINES.length) { t = window.setTimeout(() => { i = 0; setN(0); t = window.setTimeout(tick, 600); }, 5000); }
      else t = window.setTimeout(tick, 900 + Math.random() * 700);
    };
    t = window.setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={cn("card overflow-hidden bg-ink-2/80", className)}>
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-ion shadow-[0_0_10px_rgba(124,243,214,.9)]" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">gtm-ai-twin · live run</span>
        </div>
        <span className="font-mono text-[0.68rem] text-dim">illustrative · synthetic data</span>
      </div>
      <div data-run-log className="min-h-[300px] px-5 py-4 font-mono text-[0.78rem] leading-[1.9]">
        {LINES.slice(0, n).map((l, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-[6.5rem] shrink-0 text-dim">▸ {l.agent}</span>
            <span className={cn("text-muted", l.tone === "ok" && "text-fg", l.tone === "warn" && "text-ember-2", l.tone === "ion" && "text-ion")}>{l.text}</span>
          </div>
        ))}
        <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[3px] animate-blink bg-ion/80" />
      </div>
    </div>
  );
}
