"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { subscribe, useInView, useReducedMotion } from "./surface/ticker";
import { runLog as LINES, SYNTHETIC_NOTE } from "@/content/synthetic";

export function TwinRunLog({ className }: { className?: string }) {
  const [n, setN] = useState(0);
  const nRef = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(wrapRef, "160px");

  // Driven by the shared ticker rather than a self-scheduling setTimeout chain,
  // so the run pauses when it scrolls away and when the tab goes to the back.
  useEffect(() => {
    if (reduced) { setN(LINES.length); return; }
    if (!inView) return;
    let since = 0;
    let wait = nRef.current === 0 ? 700 : 850;
    return subscribe((dt) => {
      since += dt;
      if (since < wait) return;
      since = 0;
      const i = nRef.current;
      if (i >= LINES.length) { nRef.current = 0; setN(0); wait = 600; return; }
      const next = i + 1;
      nRef.current = next; setN(next);
      wait = next >= LINES.length ? 5200 : 850 + Math.random() * 650;
    });
  }, [reduced, inView]);

  return (
    <div ref={wrapRef} className={cn("overflow-hidden rounded-[var(--radius-lg)] border border-ink-2/25 bg-ink text-[#f6f2ec] shadow-[0_30px_70px_-40px_rgba(23,18,13,.8)]", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-ember shadow-[0_0_10px_rgba(228,18,31,.9)]" />
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-[#b3a89a]">gtm-ai-twin · live run</span>
        </div>
        <span className="font-mono text-[0.66rem] text-[#7d7264]">{SYNTHETIC_NOTE}</span>
      </div>
      <div data-run-log className="min-h-[290px] px-4 py-4 font-mono text-[0.74rem] leading-[1.95] sm:px-5 sm:text-[0.78rem]">
        {LINES.slice(0, n).map((l, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-[6.2rem] shrink-0 text-[#7d7264]">▸ {l.agent}</span>
            <span className={cn("text-[#c3b9ac]", l.tone === "ok" && "text-[#f6f2ec]", l.tone === "warn" && "text-ember-2", l.tone === "win" && "text-ok-2")}>{l.text}</span>
          </div>
        ))}
        <span className="inline-block h-[1.05em] w-[0.5em] translate-y-[3px] animate-blink bg-ember/90" />
      </div>
    </div>
  );
}
