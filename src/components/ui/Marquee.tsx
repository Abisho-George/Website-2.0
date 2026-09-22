import { cn } from "@/lib/utils";

/**
 * A slow horizontal strip. Pauses on hover and on keyboard focus — a moving
 * strip a reader cannot stop is a WCAG 2.2.2 failure, and this one carries
 * the verticals list on the homepage.
 *
 * The row is doubled so the loop is seamless; the second half is aria-hidden,
 * or every label is announced twice.
 */
export function Marquee({ items, className, itemClassName, speed }: { items: React.ReactNode[]; className?: string; itemClassName?: string; speed?: string }) {
  const half = (hidden: boolean) => (
    <div className="flex shrink-0 gap-10" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <div key={i} className={cn("shrink-0", itemClassName)}>{it}</div>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee mask-fade-x overflow-hidden", className)}>
      <div
        className="marquee__row flex w-max animate-marquee gap-10 will-change-transform"
        style={speed ? { animationDuration: speed } : undefined}
      >
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}
