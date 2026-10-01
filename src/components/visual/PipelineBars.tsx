"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { subscribe, useInView, useReducedMotion } from "./surface/ticker";
import { scanAccounts } from "@/content/synthetic";

/**
 * The arithmetic of a pipeline, scrubbed by scroll: as this card moves up
 * the viewport, each stage fills in step with the scroll position, the
 * reader's own scrolling drives the funnel, rather than a timer. A scan
 * line and a rotating "now scoring" ticker keep it reading as a live
 * process rather than a chart that happened to load filled in.
 */
const STAGES = [
  { label: "Addressable accounts", pct: 100, note: "the market as it really is" },
  { label: "Fit-qualified", pct: 34, note: "ICP and firmographic screen" },
  { label: "Showing a buying signal", pct: 12, note: "intent, triggers, OSINT" },
  { label: "Engaged", pct: 5.5, note: "replied to a researched approach" },
  { label: "Meeting held", pct: 2.1, note: "on a rep's calendar" },
];

const COHORT = 10_000;
const OVERLAP = 1.35; // >1 lets adjacent stages fill slightly concurrently, so it reads as one wave, not five isolated steps

export function PipelineBars({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0);
  const reduced = useReducedMotion();
  const inView = useInView(wrapRef, "200px");

  const measure = () => {
    const el = wrapRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const startY = vh * 0.88; // scrub begins as the card enters the lower part of the viewport
    const endY = vh * 0.22;   // fully filled once it has climbed to the upper fifth
    return Math.min(1, Math.max(0, (startY - rect.top) / (startY - endY)));
  };

  useEffect(() => {
    if (reduced) { shownRef.current = 1; setProgress(1); return; }

    // Off screen there is nothing to smooth: take the value the scroll position
    // implies and hold it, so arriving from either direction is already correct.
    if (!inView) {
      shownRef.current = targetRef.current = measure();
      setProgress(shownRef.current);
      return;
    }

    let unsub: (() => void) | null = null;
    const halt = () => { unsub?.(); unsub = null; };

    const frame = () => {
      shownRef.current += (targetRef.current - shownRef.current) * 0.16;
      if (Math.abs(targetRef.current - shownRef.current) < 0.0008) {
        shownRef.current = targetRef.current;
        setProgress(shownRef.current);
        halt(); // settled, give the frame back until the reader scrolls again
        return;
      }
      setProgress(shownRef.current);
    };

    const onScroll = () => {
      targetRef.current = measure();
      if (!unsub && Math.abs(targetRef.current - shownRef.current) >= 0.0008) unsub = subscribe(frame);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      halt();
    };
  }, [reduced, inView]);

  const scanning = !reduced && inView && progress > 0.02 && progress < 0.999;

  // the rotating "now scoring" line, only while the funnel is actively filling
  useEffect(() => {
    if (!scanning) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1650);
    return () => clearInterval(id);
  }, [scanning]);

  const current = scanAccounts[tick % scanAccounts.length];
  const complete = !reduced && progress >= 0.999;

  return (
    <div ref={wrapRef} data-pipeline className={cn("relative", className)}>
      {/* live header */}
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-rule pb-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-ember shadow-[0_0_10px_rgba(228,18,31,.7)]" />
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">Live · market scan</span>
        </div>
        <div data-pipeline-ticker className="h-4 overflow-hidden text-right font-mono text-[0.68rem] text-dim">
          <div
            key={scanning ? current.name : "idle"}
            className={cn("transition-all duration-500", scanning ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}
          >
            {scanning && <>now scoring · {current.name} <span className="text-ember-ink">{current.fit.toFixed(2)}</span></>}
          </div>
        </div>
      </div>

      {/* the stages, with a scan line swept top-to-bottom in step with scroll progress */}
      <div ref={stagesRef} data-pipeline-stages className="relative flex flex-col gap-4">
        {!reduced && (
          <div
            aria-hidden
            data-pipeline-scanline
            className="pointer-events-none absolute inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-ember to-transparent transition-opacity duration-300"
            style={{ top: `${progress * 100}%`, opacity: progress > 0.004 && progress < 0.996 ? 0.85 : 0 }}
          />
        )}

        {STAGES.map((s, i) => {
          const local = reduced ? 1 : Math.min(1, Math.max(0, progress * STAGES.length * OVERLAP - i * OVERLAP));
          const isLast = i === STAGES.length - 1;
          const livePct = s.pct * local;
          const count = Math.round((COHORT * s.pct) / 100 * local);
          const on = local > 0.02;
          return (
            <div key={s.label} data-pipeline-stage data-i={i} data-pct={s.pct}>
              <div className="flex items-baseline justify-between gap-4">
                <span data-pipeline-label className={cn("text-[0.92rem] font-medium transition-colors duration-300", on ? "text-fg" : "text-dim")}>
                  {s.label}
                </span>
                <span className="tnum shrink-0 font-mono text-[0.76rem] text-muted">
                  <span data-pipeline-count className={cn("transition-opacity duration-300", on ? "opacity-100" : "opacity-0")}>
                    {count.toLocaleString("en-IN")}
                  </span>
                  <span data-pipeline-pct className="ml-2 text-dim">{local >= 0.999 ? s.pct : livePct.toFixed(1)}%</span>
                </span>
              </div>

              <div className="relative mt-2 h-[11px] overflow-hidden rounded-full bg-kraft">
                <div
                  data-pipeline-bar
                  className="relative h-full rounded-full"
                  style={{
                    width: `${livePct}%`,
                    background: isLast
                      ? "var(--color-ember)"
                      : `color-mix(in srgb, var(--color-ember) ${30 + i * 16}%, var(--color-ink) 10%)`,
                  }}
                >
                  {!reduced && (
                    <span
                      data-pipeline-flow
                      className="pipe-flow absolute inset-0 rounded-full"
                      style={{ opacity: on && local < 1 ? 1 : 0 }}
                    />
                  )}
                </div>
              </div>

              <p className="mt-1.5 text-[0.78rem] text-dim">{s.note}</p>
            </div>
          );
        })}
      </div>

      <p data-pipeline-caption className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-dim">
        {reduced ? "cohort of 10,000 accounts" : complete ? "cohort of 10,000 accounts · run complete" : "cohort of 10,000 accounts · scroll to run the funnel"}
      </p>
    </div>
  );
}
