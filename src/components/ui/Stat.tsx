"use client";
import { useEffect, useRef, useState } from "react";
import { Copy } from "./Copy";

/** Counts up purely numeric values; renders anything else (with flags) as-is. */
export function Stat({ value, suffix = "", label, size = "lg" }: { value: string; suffix?: string; label: string; size?: "lg" | "md" }) {
  const clean = value.replace(/\[\[|\]\]/g, "");
  const isPh = value.includes("[[");
  const num = Number(clean.replace(/,/g, ""));
  const numeric = !Number.isNaN(num) && /^[\d.,]+$/.test(clean);
  const [n, setN] = useState(numeric ? 0 : num);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!numeric) return;
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(num); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1300;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur), ease = 1 - Math.pow(1 - p, 3);
        setN(num * ease); if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [num, numeric]);
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  const shown = numeric ? n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : clean;
  return (
    <div ref={ref}>
      <div className={`display tnum ${size === "lg" ? "text-[2.5rem] md:text-[3.3rem]" : "text-[1.9rem] md:text-[2.2rem]"}`}>
        <span data-stat={numeric ? clean : undefined} data-placeholder={isPh ? "" : undefined} title={isPh ? "Placeholder — verify before launch" : undefined}>{shown}</span>
        <span className="text-ember">{suffix}</span>
      </div>
      <p className="mt-2 max-w-[22ch] text-sm leading-snug text-muted"><Copy text={label} /></p>
    </div>
  );
}
