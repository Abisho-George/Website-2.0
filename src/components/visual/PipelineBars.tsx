"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The arithmetic of a pipeline, running live: a cohort of accounts enters at
 * the top and is thinned at every stage. The sweep repeats so the funnel is
 * always in motion, and each stage's count is derived from the same numbers
 * the bar widths use.
 */
const STAGES = [
  { label: "Addressable accounts", pct: 100, note: "the market as it really is" },
  { label: "Fit-qualified", pct: 34, note: "ICP and firmographic screen" },
  { label: "Showing a buying signal", pct: 12, note: "intent, triggers, OSINT" },
  { label: "Engaged", pct: 5.5, note: "replied to a researched approach" },
  { label: "Meeting held", pct: 2.1, note: "on a rep's calendar" },
];

const COHORT = 10_000;
const STEP_MS = 620;
const HOLD_MS = 2600;

export function PipelineBars({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(0); // how many stages have filled
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setLive(STAGES.length);
      return;
    }
    let timer: number;
    let visible = false;

    const advance = () => {
      setLive((n) => {
        const next = n >= STAGES.length ? 0 : n + 1;
        timer = window.setTimeout(advance, next === STAGES.length ? HOLD_MS : next === 0 ? 260 : STEP_MS);
        return next;
      });
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting === visible) return;
      visible = e.isIntersecting;
      if (visible) timer = window.setTimeout(advance, 220);
      else { clearTimeout(timer); setLive(0); }
    }, { threshold: 0.25 });

    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)}>
      {STAGES.map((s, i) => {
        const on = i < live;
        const isLast = i === STAGES.length - 1;
        const count = Math.round((COHORT * s.pct) / 100);
        return (
          <div key={s.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className={cn("text-[0.92rem] font-medium transition-colors duration-500", on ? "text-fg" : "text-dim")}>
                {s.label}
              </span>
              <span className="tnum shrink-0 font-mono text-[0.76rem] text-muted">
                <span className={cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-0")}>
                  {count.toLocaleString("en-IN")}
                </span>
                <span className="ml-2 text-dim">{s.pct}%</span>
              </span>
            </div>

            <div className="relative mt-2 h-[11px] overflow-hidden rounded-full bg-kraft">
              <div
                className={cn(
                  "relative h-full rounded-full",
                  reduced ? "" : "transition-[width,opacity] duration-[700ms] ease-out",
                )}
                style={{
                  width: on || reduced ? `${s.pct}%` : "0%",
                  opacity: on || reduced ? 1 : 0,
                  background: isLast
                    ? "var(--color-ember)"
                    : `color-mix(in srgb, var(--color-ember) ${30 + i * 16}%, var(--color-ink) 10%)`,
                }}
              >
                {/* the flow inside the bar never stops while the stage is live */}
                {!reduced && on && <span className="pipe-flow absolute inset-0 rounded-full" />}
              </div>
            </div>

            <p className="mt-1.5 text-[0.78rem] text-dim">{s.note}</p>
          </div>
        );
      })}

      <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-dim">
        {reduced ? "cohort of 10,000 accounts" : "live · cohort of 10,000 accounts, replayed"}
      </p>
    </div>
  );
}
