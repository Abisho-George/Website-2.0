"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Tips its child toward the pointer, a few degrees at most, so a card reads
 * as an object on the page rather than a printed box. Mouse and pen only:
 * touch and reduced-motion users get the card flat.
 */
export function Tilt({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reset = () => ref.current?.style.setProperty("transform", "");
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className={cn("h-full transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform", className)}
    >
      {children}
    </div>
  );
}
