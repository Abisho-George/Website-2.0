import { cn } from "@/lib/utils";

export function Marquee({ items, className, itemClassName, speed }: { items: React.ReactNode[]; className?: string; itemClassName?: string; speed?: string }) {
  const row = [...items, ...items];
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div className="flex w-max animate-marquee gap-10 will-change-transform" style={speed ? { animationDuration: speed } : undefined}>
        {row.map((it, i) => (
          <div key={i} className={cn("shrink-0", itemClassName)}>{it}</div>
        ))}
      </div>
    </div>
  );
}
