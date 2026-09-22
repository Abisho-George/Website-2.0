"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { subscribe } from "@/components/visual/surface/ticker";
import { easeOutCubic } from "@/lib/motion";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Counts a number up when it arrives.
 *
 * Writes `textContent` from the shared ticker rather than calling setState per
 * frame. The previous implementation re-rendered on every frame, so a row of
 * four figures cost roughly 340 React renders during one scroll past them.
 *
 * The final value is what renders on the server, so a crawler, a printout and
 * a reader without JS all see the number. The zero is only ever written on the
 * client, in a layout effect, before the browser has painted.
 */
export function CountUp({
  value,
  decimals = 0,
  locale = "en-IN",
  duration = 1300,
  delay = 0,
  animate = true,
  className,
  ...rest
}: {
  value: number;
  decimals?: number;
  locale?: string;
  duration?: number;
  delay?: number;
  /** False for flagged placeholder figures — an invented number never animates. */
  animate?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const final = fmt(value);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = fmt(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = final; return; }

    let unsub: (() => void) | null = null;
    const run = () => {
      let elapsed = 0;
      unsub = subscribe((dt) => {
        elapsed += dt;
        if (elapsed < delay) return;
        const p = Math.min(1, (elapsed - delay) / duration);
        el.textContent = fmt(value * easeOutCubic(p));
        if (p >= 1) { unsub?.(); unsub = null; }
      });
    };

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); unsub?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, animate, duration, delay, decimals, locale]);

  return (
    <span
      ref={ref}
      className={className}
      // reserve the width the final number needs, or the label beneath it
      // reflows as digits are added
      style={{ display: "inline-block", minWidth: `${final.length}ch`, fontVariantNumeric: "tabular-nums slashed-zero" }}
      {...rest}
    >
      {final}
    </span>
  );
}
