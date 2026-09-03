"use client";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

/**
 * "There is a second LeadStrategus." A split card: humans (.com) on the left,
 * agents (.ai) on the right. The divider follows the cursor.
 */
export function Portal() {
  const [x, setX] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    const px = ((e.clientX - r.left) / r.width) * 100;
    setX(Math.max(12, Math.min(88, px)));
  };
  return (
    <div
      ref={ref}
      data-portal
      onMouseMove={onMove}
      onMouseLeave={() => setX(52)}
      className="relative h-[460px] w-full overflow-hidden rounded-[var(--radius-xl)] border border-line md:h-[520px]"
    >
      {/* humans side */}
      <div className="absolute inset-0 bg-paper text-ink">
        <div className="grid-bg absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(14,18,25,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,18,25,.07)_1px,transparent_1px)]" />
        <div className="relative flex h-full flex-col justify-between p-7 md:p-10">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/60">leadstrategus<span className="text-ember">.com</span> · you are here</div>
          <div>
            <div className="display text-[2.4rem] md:text-[4rem]">The <em>humans.</em></div>
            <p className="mt-4 max-w-sm text-ink/70">Strategy, demand generation, intelligence and enablement, run by operators who have carried the number.</p>
          </div>
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/50">est. 2018 · Bengaluru</div>
        </div>
      </div>
      {/* agents side */}
      <div data-portal-agents className="absolute inset-0 bg-ink text-fg transition-[clip-path] duration-200 ease-out" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_50%,rgba(124,243,214,.18),transparent_70%)]" />
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="absolute inset-y-0 left-0 w-full animate-scan bg-[linear-gradient(to_bottom,transparent,rgba(124,243,214,.10),transparent)]" />
        <div className="relative flex h-full flex-col justify-between p-7 md:p-10">
          <div className="text-right font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">leadstrategus<span className="text-ion">.ai</span> · the other side</div>
          <div className="text-right">
            <div className="display text-[2.4rem] md:text-[4rem]">The <em className="text-ion">agents.</em></div>
            <p className="ml-auto mt-4 max-w-sm text-muted">AI revenue agents that find, qualify and convert your next customers. Same judgement, written into software.</p>
          </div>
          <div className="flex justify-end">
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-ion px-5 py-2.5 text-sm font-medium text-ink transition-all hover:bg-ion-2 hover:shadow-[0_0_40px_-8px_rgba(124,243,214,.8)]">
              Cross over <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
      {/* divider */}
      <div data-portal-divider className="pointer-events-none absolute inset-y-0 w-px bg-ion shadow-[0_0_24px_rgba(124,243,214,.9)] transition-[left] duration-200 ease-out" style={{ left: `${x}%` }}>
        <div className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ion/60 bg-ink/80 font-mono text-[0.6rem] text-ion backdrop-blur">⇆</div>
      </div>
    </div>
  );
}
