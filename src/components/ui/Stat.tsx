"use client";
import { useEffect, useRef, useState } from "react";
import { Copy } from "./Copy";

/** Animates purely numeric values; otherwise renders text (with placeholder flags) as-is. */
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
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(); const dur = 1400;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur); const ease = 1 - Math.pow(1 - p, 3);
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
      <div className={size === "lg" ? "display text-[2.8rem] md:text-[3.6rem]" : "display text-[2rem] md:text-[2.4rem]"}>
        <span data-stat={numeric ? clean : undefined} data-placeholder={isPh ? "" : undefined} title={isPh ? "Placeholder — verify before launch" : undefined}>{shown}</span>
        <span className="text-ember">{suffix}</span>
      </div>
      <p className="mt-2 max-w-[22ch] text-sm text-muted"><Copy text={label} /></p>
    </div>
  );
}
