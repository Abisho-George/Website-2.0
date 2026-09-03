"use client";
import { useEffect, useRef } from "react";

/**
 * A hairline that runs the full height of every page, filling with the accent
 * as you scroll. It never breaks between sections — the device that makes the
 * page read as one continuous document rather than stacked blocks.
 */
export function Spine() {
  const fill = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = fill.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.height = `${p * 100}%`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="spine" aria-hidden data-spine>
      <div ref={fill} className="spine__fill" style={{ height: "0%" }} data-spine-fill />
    </div>
  );
}
