"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINES: { agent: string; text: string; tone?: "ok" | "warn" | "win" }[] = [
  { agent: "prospecting", text: "universe refreshed · 4,212 accounts scanned · 38 moved to active tier" },
  { agent: "research", text: "brief built · Northwind Logistics · S/4 migration · new CIO · 3 open roles" },
  { agent: "qualify", text: "PASS · ICP tier 1 · fit 0.91 · signal 0.84 · score 87", tone: "ok" },
  { agent: "outreach", text: "drafted 1/6 · VP Applications · email · references integration-risk checklist" },
  { agent: "outreach", text: "sent · warmed domain ls-mail-03 · deliverability 99.2%" },
  { agent: "conversation", text: 'reply · "can you send the checklist and a case?" · handled', tone: "ok" },
  { agent: "conversation", text: 'reply · "how does pricing compare to Vendor X?" · escalated → AE-North', tone: "warn" },
  { agent: "scheduling", text: "meeting booked · Thu 11:30 IST · calendar + CRM updated · brief sent", tone: "win" },
  { agent: "report", text: "today · 38 engaged · 11 replies · 2 escalations · 3 meetings booked" },
];

export function TwinRunLog({ className }: { className?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(LINES.length); return; }
    let i = 0; let t: number;
    const tick = () => {
      i += 1; setN(i);
      if (i >= LINES.length) t = window.setTimeout(() => { i = 0; setN(0); t = window.setTimeout(tick, 600); }, 5200);
      else t = window.setTimeout(tick, 850 + Math.random() * 650);
    };
    t = window.setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={cn("overflow-hidden rounded-[var(--radius-lg)] border border-ink-2/25 bg-ink text-[#f6f2ec] shadow-[0_30px_70px_-40px_rgba(23,18,13,.8)]", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-ember shadow-[0_0_10px_rgba(228,18,31,.9)]" />
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-[#b3a89a]">gtm-ai-twin · live run</span>
        </div>
        <span className="font-mono text-[0.66rem] text-[#7d7264]">illustrative</span>
      </div>
      <div data-run-log className="min-h-[290px] px-4 py-4 font-mono text-[0.74rem] leading-[1.95] sm:px-5 sm:text-[0.78rem]">
        {LINES.slice(0, n).map((l, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-[6.2rem] shrink-0 text-[#7d7264]">▸ {l.agent}</span>
            <span className={cn("text-[#c3b9ac]", l.tone === "ok" && "text-[#f6f2ec]", l.tone === "warn" && "text-ember-2", l.tone === "win" && "text-ion-2")}>{l.text}</span>
          </div>
        ))}
        <span className="inline-block h-[1.05em] w-[0.5em] translate-y-[3px] animate-blink bg-ember/90" />
      </div>
    </div>
  );
}
