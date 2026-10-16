"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Review } from "@/content/reviews";
import { cn } from "@/lib/utils";

const SECONDS = 6;

/**
 * Clutch reviews as a centred carousel: the current review raised in the
 * middle, its neighbours dimmed at either side (desktop only), dots and
 * arrows below. Every card shares one grid cell, so the stage is as tall as
 * the longest review and never jumps. It advances on its own, pauses while
 * hovered or focused, and stays still for reduced motion.
 */
export function ReviewCarousel({ items }: { items: Review[] }) {
  const n = items.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  useEffect(() => setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useEffect(() => {
    if (!auto || paused) return;
    const t = setTimeout(() => setI((c) => (c + 1) % n), SECONDS * 1000);
    return () => clearTimeout(t);
  }, [auto, paused, i, n]);

  const go = (d: number) => setI((c) => (c + d + n) % n);
  // signed distance from the current review, wrapping round the ends
  const offset = (k: number) => ((k - i + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews from Clutch"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid overflow-x-clip py-4">
        {items.map((x, k) => {
          const o = offset(k);
          const side = Math.abs(o) === 1;
          return (
            <figure
              key={x.quote}
              aria-hidden={o !== 0}
              onClick={side ? () => go(o) : undefined}
              style={{ transform: `translateX(${o * 82}%) scale(${o === 0 ? 1 : 0.9})` }}
              className={cn(
                "flex w-full max-w-[600px] flex-col justify-self-center rounded-[20px] border border-rule bg-paper p-6 transition-[transform,opacity,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] [grid-area:1/1] md:p-8",
                o === 0 && "z-10 opacity-100 shadow-[var(--shadow-lift)]",
                side && "z-0 cursor-pointer opacity-0 md:opacity-45",
                Math.abs(o) > 1 && "pointer-events-none opacity-0",
              )}
            >
              <span className="flex gap-1 text-[#f5a524]" role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, s) => <Star key={s} className="size-[18px]" fill="currentColor" strokeWidth={0} />)}
              </span>
              <blockquote className="mt-4 text-[1.05rem] italic leading-relaxed text-fg md:text-[1.12rem]">
                &ldquo;{x.quote}&rdquo;
              </blockquote>
              <p className="mb-5 mt-3 text-[0.92rem] leading-relaxed text-muted">{x.summary}</p>
              <figcaption className="mt-auto border-t border-rule pt-4">
                <span className="block font-display text-[0.98rem] font-bold text-fg">{x.role}</span>
                <span className="block text-[0.85rem] text-muted">{x.company} · {x.region}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid size-11 place-items-center rounded-full border border-rule-strong bg-paper text-fg transition-colors hover:border-fg">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-1.5">
          {items.map((x, k) => (
            <button
              key={x.quote}
              type="button"
              aria-current={k === i}
              aria-label={`Review ${k + 1} of ${n}`}
              onClick={() => setI(k)}
              className={cn("h-2 rounded-full transition-all duration-300", k === i ? "w-6 bg-fg" : "w-2 bg-rule-strong hover:bg-muted")}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid size-11 place-items-center rounded-full border border-rule-strong bg-paper text-fg transition-colors hover:border-fg">
          <ChevronRight className="size-5" />
        </button>
      </div>
      <span className="sr-only" aria-live={auto && !paused ? "off" : "polite"}>{`Review ${i + 1} of ${n}: ${items[i].role}, ${items[i].company}`}</span>
    </div>
  );
}
