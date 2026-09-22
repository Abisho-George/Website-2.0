"use client";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A heading whose lines rise out of their own boxes, one after another.
 *
 * The line breaks are authored, not measured — pass the lines you want. That
 * is deliberate: a heading that re-splits itself on resize either ships a
 * layout read on every frame or breaks in a different place than the copy was
 * written for. The three headings on this site with a hand-placed <br/> are
 * the three that use this.
 */
export function SplitHeading({
  lines,
  as: Tag = "h1",
  className,
  step = 90,
  from = 60,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "p" | "div";
  className?: string;
  /** Milliseconds between lines. */
  step?: number;
  /** Delay before the first line. */
  from?: number;
}) {
  const Comp = Tag;
  return (
    <Comp className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <Reveal as="span" variant="line" delay={from + i * step} className="block">
            {line}
          </Reveal>
        </span>
      ))}
    </Comp>
  );
}
