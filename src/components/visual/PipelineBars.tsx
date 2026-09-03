"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The shape of a working pipeline: how a market of accounts thins at each stage.
 * Widths are the stated conversion, so the picture and the numbers agree.
 */
const STAGES = [
  { label: "Addressable accounts", v: 100, note: "the market as it really is" },
  { label: "Fit-qualified", v: 34, note: "ICP and firmographic screen" },
  { label: "Showing a buying signal", v: 12, note: "intent, triggers, OSINT" },
  { label: "Engaged", v: 5.5, note: "replied to a researched approach" },
  { label: "Meeting held", v: 2.1, note: "on a rep's calendar" },
];

export function PipelineBars({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("flex flex-col gap-3", className)}>
      {STAGES.map((s, i) => (
        <div key={s.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1">
          <div className="col-span-2 flex items-baseline justify-between gap-4 sm:col-span-1 sm:order-1">
            <span className="text-[0.92rem] font-medium">{s.label}</span>
            <span className="tnum font-mono text-[0.78rem] text-muted sm:hidden">{s.v}%</span>
          </div>
          <span className="tnum order-2 hidden w-12 text-right font-mono text-[0.78rem] text-muted sm:block">{s.v}%</span>
          <div className="col-span-2 h-[10px] overflow-hidden rounded-full bg-kraft sm:order-3">
            <div
              className="h-full rounded-full transition-[width] duration-[1100ms] ease-out"
              style={{
                width: on ? `${s.v}%` : "0%",
                transitionDelay: `${i * 110}ms`,
                background: i === STAGES.length - 1
                  ? "var(--color-ember)"
                  : `color-mix(in srgb, var(--color-ember) ${28 + i * 16}%, var(--color-ink) 12%)`,
                opacity: i === STAGES.length - 1 ? 1 : 0.55 + i * 0.1,
              }}
            />
          </div>
          <p className="col-span-2 -mt-0.5 text-[0.78rem] text-dim sm:order-4">{s.note}</p>
        </div>
      ))}
    </div>
  );
}
