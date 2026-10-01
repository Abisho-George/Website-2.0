"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { meetingDays, meetings, type Meeting, type MeetingDay } from "@/content/synthetic";
import { SurfaceFrame } from "./SurfaceFrame";
import { subscribe, useInView, useReducedMotion } from "./ticker";

/**
 * The end of the run, which is the only part a client is buying: meetings
 * landing on a week. Slots arrive one at a time, the week fills, it holds long
 * enough to read, and it runs again.
 *
 * Only one ambient surface may animate in a viewport, so this and AgentConsole
 * never share a band.
 *
 * The narrow composition is the designed one, not a shrunk desktop: at 390px a
 * fifth of the width is 70px and holds no company name at all, so below 768px
 * a day becomes a row, its label in a narrow left column, its slots stacked
 * beside it. Same markup, two arrangements, no hidden layout on either.
 *
 * Entrances are `.reveal`/`.in`, the site's one entrance contract: a slot that
 * has not landed yet is hidden only under the `js` class, so the script-free
 * preview bundle and a reader without JS get the full week. The week is also
 * what renders on the server and is cleared in a layout effect, so the surface
 * is its final height from the first paint and nothing below it moves.
 */

const LAND = 900; // ms between slots
const HOLD = 5200; // ms the full week stays up
const FIRST = 520; // a beat before the first slot, so arriving is not instant

/** Chronological, so the week fills the way a week does. */
const ordered: Meeting[] = [...meetings].sort(
  (a, b) => meetingDays.indexOf(a.day) - meetingDays.indexOf(b.day) || a.time.localeCompare(b.time),
);

const order = new Map(ordered.map((m, i) => [m, i]));
const byDay = (d: MeetingDay) => ordered.filter((m) => m.day === d);

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function MeetingsBoard({ className }: { className?: string }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const landedRef = useRef(ordered.length);
  const [landed, setLanded] = useState(ordered.length);
  const reduced = useReducedMotion();
  const inView = useInView(gridRef, "180px");

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    landedRef.current = 0;
    setLanded(0);
  }, []);

  useEffect(() => {
    if (reduced) {
      landedRef.current = ordered.length;
      setLanded(ordered.length);
      return;
    }
    if (!inView) return; // held exactly where it stopped

    let wait = landedRef.current === 0 ? FIRST : LAND;
    return subscribe((dt) => {
      wait -= dt;
      if (wait > 0) return;
      const n = landedRef.current;
      if (n >= ordered.length) {
        landedRef.current = 0;
        setLanded(0);
        wait = 900;
        return;
      }
      landedRef.current = n + 1;
      setLanded(n + 1);
      wait = n + 1 >= ordered.length ? HOLD : LAND;
    });
  }, [reduced, inView]);

  return (
    <SurfaceFrame title="meetings · this week" reel={landed / ordered.length} className={className}>
      {/* `.reveal`'s transition applies in both directions, so clearing the
          week by removing `.in` would play every entrance backwards. The
          clearing frame suppresses the transition instead. */}
      <div ref={gridRef} data-clearing={landed === 0 ? "" : undefined} className="md:grid md:grid-cols-5">
        {meetingDays.map((d) => (
          <div
            key={d}
            className="flex gap-3 border-t border-rule px-4 py-3 first:border-t-0 md:block md:border-t-0 md:border-l md:px-3 md:py-4 md:first:border-l-0"
          >
            <div className="w-9 shrink-0 font-mono text-micro uppercase tracking-[0.14em] text-dim md:mb-3 md:w-auto">
              {d}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {byDay(d).map((m) => (
                <div
                  key={`${m.day}-${m.time}`}
                  data-meeting
                  data-i={order.get(m)}
                  className={cn(
                    "reveal rounded-[var(--radius-sm)] border border-rule bg-sand px-3 py-2 shadow-e1",
                    (order.get(m) ?? 0) < landed && "in",
                  )}
                >
                  {/* the tag stays lower-case and untracked so a five-column
                      week still fits "sequence" beside a time at 768px */}
                  <div className="flex items-baseline justify-between gap-2 font-mono text-micro">
                    <span className="tnum text-ember-ink">{m.time}</span>
                    <span className="text-dim">{m.source}</span>
                  </div>
                  <p className="mt-1 break-words text-[0.84rem] font-medium leading-tight text-fg">{m.company}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-rule px-4 py-3 font-mono text-micro uppercase tracking-[0.14em] text-dim">
        <span>synthetic week · IST</span>
        <span className="tnum">
          {landed}/{ordered.length} booked
        </span>
      </div>
    </SurfaceFrame>
  );
}
