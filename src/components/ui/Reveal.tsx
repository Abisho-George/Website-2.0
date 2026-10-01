"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal. Content is visible by default (no-JS, crawlers, print);
 * the `js` class on <html> opts into the hidden→revealed transition, and the
 * `in` class this adds on entry plays it.
 *
 * Two variants, both driven by the same class so one observer and one CSS
 * contract cover every entrance on the site:
 *   rise  fade up by --rise-2, blocks, cards, rows
 *   line  a line of type rising out of its own box, headings, inside .mask-line
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  variant?: "rise" | "line";
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("in");
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) { show(); return; }
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) { show(); io.disconnect(); } },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      data-reveal=""
      data-variant={variant === "rise" ? undefined : variant}
      className={cn("reveal", className)}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}
