"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star, UserRound } from "lucide-react";
import type { Review } from "@/content/reviews";
import { cn } from "@/lib/utils";

const SECONDS = 8;

/**
 * Clutch reviews, one at a time. Every review is stacked in the same grid
 * cell so the card is as tall as the longest one and never jumps; the visible
 * one fades in. A red bar fills while a review is on screen and moves to the
 * next when full. Hovering or focusing the card pauses it, and with reduced
 * motion it does not advance on its own at all.
 */
export function ReviewCarousel({ items }: { items: Review[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  useEffect(() => setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  const go = (d: number) => setI((c) => (c + d + items.length) % items.length);
  const r = items[i];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews from Clutch"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-[20px] border-2 border-ink bg-paper shadow-[8px_8px_0_0_var(--color-ink)]">
        {/* the timer */}
        <div className="h-1.5 bg-sand">
          {auto && (
            <div
              key={i}
              onAnimationEnd={() => go(1)}
              className="h-full origin-left bg-ember"
              style={{ animation: `review-progress ${SECONDS}s linear forwards`, animationPlayState: paused ? "paused" : "running" }}
            />
          )}
        </div>

        <div className="grid p-6 md:p-9">
          {items.map((x, k) => (
            <figure
              key={x.quote}
              aria-hidden={k !== i}
              className={cn(
                "[grid-area:1/1] transition-[opacity,transform] duration-500 ease-out",
                k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
              )}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex gap-0.5 text-ember" role="img" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, s) => <Star key={s} className="size-4" fill="currentColor" strokeWidth={0} />)}
                </span>
                <span className="rounded-full bg-ember-wash px-3 py-1 text-[0.8rem] font-semibold text-ember-ink">{x.project}</span>
                <span className="text-[0.82rem] text-muted">{x.date}</span>
              </div>

              <Quote className="mt-5 size-8 text-ember" aria-hidden />
              <blockquote className="mt-2 font-display text-[1.35rem] font-bold leading-[1.3] text-fg md:text-[1.75rem]">
                {x.quote}
              </blockquote>
              <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-fg-soft">{x.summary}</p>

              <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t-2 border-dashed border-rule pt-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-ember text-white" aria-hidden>
                  <UserRound className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1rem] font-bold text-fg">{x.role}</span>
                  <span className="block text-[0.86rem] text-muted">{x.company} · {x.size} · {x.region}</span>
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-ok">
                  <BadgeCheck className="size-4" aria-hidden /> Verified on Clutch
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5" aria-label="Choose a review">
          {items.map((x, k) => (
            <button
              key={x.quote}
              type="button"
              aria-current={k === i}
              aria-label={`Review ${k + 1} of ${items.length}`}
              onClick={() => setI(k)}
              className={cn("h-2.5 rounded-full transition-all duration-300", k === i ? "w-8 bg-ember" : "w-2.5 bg-rule-strong hover:bg-muted")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {[[-1, ArrowLeft, "Previous review"], [1, ArrowRight, "Next review"]].map(([d, Icon, label]) => {
            const I = Icon as typeof ArrowLeft;
            return (
              <button
                key={label as string}
                type="button"
                onClick={() => go(d as number)}
                aria-label={label as string}
                className="grid size-11 place-items-center rounded-full border-2 border-ink bg-paper shadow-[0_4px_0_0_var(--color-ink)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-ember hover:text-white active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-ink)]"
              >
                <I className="size-4" />
              </button>
            );
          })}
        </div>
      </div>
      <span className="sr-only" aria-live={auto && !paused ? "off" : "polite"}>{`Review ${i + 1} of ${items.length}: ${r.role}, ${r.company}`}</span>
    </div>
  );
}
