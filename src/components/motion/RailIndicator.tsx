"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * An accent that travels to the active item instead of one bar fading out
 * while another fades in. Put it inside an element with `.rail-track`
 * (position: relative) whose options carry `data-rail-item="<key>"`.
 *
 * It measures rather than being told, so it works for tabs of unequal width,
 * for a vertical topic list, and for anything that reflows.
 *
 * Two shapes:
 *   rail (default)  a 2px accent on the track's baseline — nav underlines
 *   fill            the active item's whole box — a segmented-control thumb
 *
 * `fill` tracks both axes, which matters the moment a control wraps: anchoring
 * a thumb to the track's top and bottom makes it span every row at once.
 */
export function RailIndicator({
  active,
  orientation = "horizontal",
  fill = false,
  className,
}: {
  active: string | null;
  orientation?: "horizontal" | "vertical";
  fill?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  useEffect(() => {
    const head = ref.current;
    const track = head?.parentElement;
    if (!head || !track) return;

    const place = () => {
      const el = active ? track.querySelector<HTMLElement>(`[data-rail-item="${CSS.escape(active)}"]`) : null;
      if (!el) { head.style.opacity = "0"; return; }
      const t = track.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      // the first placement must not animate in from the corner
      if (!placed.current) head.style.transition = "none";
      head.style.opacity = "1";

      if (fill) {
        head.style.transform = `translate(${r.left - t.left}px, ${r.top - t.top}px)`;
        head.style.width = `${r.width}px`;
        head.style.height = `${r.height}px`;
      } else if (orientation === "vertical") {
        head.style.transform = `translateY(${r.top - t.top}px)`;
        head.style.height = `${r.height}px`;
      } else {
        head.style.transform = `translateX(${r.left - t.left}px)`;
        head.style.width = `${r.width}px`;
      }

      if (!placed.current) {
        void head.offsetWidth; // flush, then hand the transition back
        head.style.transition = "";
        placed.current = true;
      }
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(track);
    window.addEventListener("resize", place);
    return () => { ro.disconnect(); window.removeEventListener("resize", place); };
  }, [active, orientation, fill]);

  return (
    <span
      ref={ref}
      aria-hidden
      data-orientation={orientation}
      data-fill={fill ? "" : undefined}
      className={cn("rail-head", className)}
      style={{ opacity: 0 }}
    />
  );
}
