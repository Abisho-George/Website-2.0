"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Band = "paper" | "sand" | "kraft" | "ink";

/**
 * A band of the page. Bands change ground colour but share one gutter and one
 * spine, and their edges dissolve rather than cut, so the page stays continuous.
 * `index` puts a marker on the spine, numbering the section in sequence.
 */
export function Section({
  children, className, band = "paper", id, tight, index, label, flush,
}: {
  children: React.ReactNode; className?: string; band?: Band; id?: string;
  tight?: boolean; index?: string; label?: string; flush?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el || !index) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "-45% 0px -45% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [index]);
  return (
    <section
      ref={ref}
      id={id}
      className={cn("band", band !== "paper" && `band--${band}`, !flush && (tight ? "section-y-sm" : "section-y"), className)}
    >
      {index && (
        <div className={cn("marker top-[clamp(64px,8vw,116px)]", on && "marker--on")} aria-hidden>
          <span className="marker__dot" />
          <span className="marker__label">{index}{label ? ` · ${label}` : ""}</span>
        </div>
      )}
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className, tone }: { children: React.ReactNode; className?: string; tone?: "ember" | "ion" }) {
  return <p className={cn("eyebrow", tone === "ember" && "text-ember-ink", tone === "ion" && "text-ion", className)}>{children}</p>;
}

export function SectionHead({ eyebrow, title, lede, tone, align = "left", className }: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; tone?: "ember" | "ion"; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone} className="mb-5">{eyebrow}</Eyebrow>}
      <h2 className="h2 balance">{title}</h2>
      {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
    </div>
  );
}
