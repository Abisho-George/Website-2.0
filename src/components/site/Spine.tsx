"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Mark = { n: string; label: string; top: number; bottom: number };

/**
 * A hairline that runs the full height of every page, filling with the accent
 * as you scroll. It never breaks between sections — the device that makes the
 * page read as one continuous document rather than stacked blocks.
 *
 * It also carries the page's section numbers. Any <Section n="03" label="…">
 * puts a marker on the spine at its own offset, which lights as that section
 * comes into view. Those numbers spent months as code comments in page.tsx;
 * on the spine they turn eleven stacked bands into one numbered document,
 * using the site's best existing device rather than inventing another.
 */
export function Spine() {
  const fill = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [active, setActive] = useState(-1);
  const markRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    let measured: Mark[] = [];

    const measure = () => {
      const y = window.scrollY;
      measured = [...document.querySelectorAll<HTMLElement>("[data-section-n]")].map((el) => {
        const r = el.getBoundingClientRect();
        return {
          n: el.dataset.sectionN ?? "",
          label: el.dataset.sectionLabel ?? "",
          top: r.top + y,
          bottom: r.bottom + y,
        };
      });
      setMarks(measured);
    };

    const update = () => {
      raf = 0;
      const el = fill.current;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (el) {
        const p = max > 0 ? Math.min(1, y / max) : 0;
        // scaleY on a full-height element, not a height write: transform-origin
        // is already top, and this keeps the fill off the layout path entirely
        el.style.transform = `scaleY(${p})`;
      }
      // markers are positioned in viewport space because .spine is fixed
      const mid = y + window.innerHeight * 0.4;
      let on = -1;
      measured.forEach((m, i) => {
        const node = markRefs.current[i];
        if (node) node.style.top = `${m.top - y}px`;
        if (mid >= m.top && mid < m.bottom) on = i;
      });
      setActive(on);
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };

    measure();
    update();
    // sections settle after fonts land and reveals fire
    const settle = window.setTimeout(onResize, 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [pathname]);

  return (
    <div className="spine" aria-hidden data-spine>
      <div ref={fill} className="spine__fill" style={{ height: "100%", transform: "scaleY(0)" }} data-spine-fill />
      {marks.map((m, i) => (
        <div
          key={`${pathname}-${i}`}
          ref={(el) => { markRefs.current[i] = el; }}
          data-spine-marker
          className={`marker${i === active ? " marker--on" : ""}`}
        >
          <span className="marker__dot" />
          <span className="marker__n" title={m.label || undefined}>{m.n}</span>
        </div>
      ))}
    </div>
  );
}
