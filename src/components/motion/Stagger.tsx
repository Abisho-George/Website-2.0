"use client";
import { cn } from "@/lib/utils";
import { beat, stagger } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";

type As = "div" | "ul" | "ol" | "section";

/**
 * A group whose children arrive in sequence. Replaces the `delay={i * 70}`
 * arithmetic written by hand at a dozen call sites — same 70ms beat, but
 * capped, so a list of twenty rows does not put the last one 1.4s behind the
 * first.
 *
 * The children are ordinary Reveals, so this inherits the no-JS and print
 * behaviour of every other entrance on the site.
 */
export function Stagger({
  children,
  className,
  as = "div",
  step = stagger.base,
  from = 0,
  cap = 8,
}: {
  children: React.ReactNode;
  className?: string;
  as?: As;
  /** Milliseconds between siblings. `stagger.tight` for dense lists. */
  step?: number;
  /** Delay applied to the whole group before the first child. */
  from?: number;
  cap?: number;
}) {
  const Comp = as;
  const items = Array.isArray(children) ? children : [children];
  return (
    <Comp className={className}>
      {items.map((child, i) => (
        <StaggerItem key={i} i={i} step={step} from={from} cap={cap} as={as === "ul" || as === "ol" ? "li" : "div"}>
          {child}
        </StaggerItem>
      ))}
    </Comp>
  );
}

/** One member of a sequence. Use directly when the list markup is your own. */
export function StaggerItem({
  children,
  className,
  i,
  step = stagger.base,
  from = 0,
  cap = 8,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  i: number;
  step?: number;
  from?: number;
  cap?: number;
  as?: "div" | "li" | "article" | "span";
}) {
  return (
    <Reveal as={as} delay={from + beat(i, step, cap)} className={cn(className)}>
      {children}
    </Reveal>
  );
}
