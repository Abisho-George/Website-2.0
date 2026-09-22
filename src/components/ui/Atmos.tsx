import { cn } from "@/lib/utils";

/**
 * Atmosphere — the ambient marks as primitives, so a page never types a
 * gradient into a className again. Both are decorative: aria-hidden,
 * pointer-events: none, and drawn entirely from the tokens in globals.css.
 *
 * Which one, and why it matters: these do different jobs and a band wearing
 * both reads as noise rather than as atmosphere.
 *   Bloom       light. One soft source tinting a corner — warmth, depth, focus.
 *   FieldPlate  structure. A measured grid — "this is a system", not a mood.
 *
 * Two things this file knows that its callers do not:
 *   1. globals.css is unlayered, so its rules outrank Tailwind's utilities.
 *      A caller cannot change `.bloom`'s position or `.hero-grain`'s with a
 *      class; where that matters the component sets it inline instead.
 *   2. Bloom's blend is set by its ground, not by its props: `.bloom` is
 *      multiply, and `.band--ink .bloom` flips it to screen. That coupling is
 *      invisible from the call site, so a bloom inside a dark surface that is
 *      NOT a `.band--ink` will blend the wrong way. Put it in a band.
 */

type Hue = "ember" | "ink" | "blue";
type At = "tl" | "tr" | "bl" | "br" | "top" | "bottom" | "center";

/* ember is already the :root value of --bloom-hue and ink tracks --amb-ink —
   which flips to white inside .band--ink — so neither is restated here. */
const HUE: Record<Hue, string | undefined> = {
  ember: undefined,
  ink: "var(--amb-ink)",
  blue: "var(--hue-blue)",
};

/* Anchored on the edge it is named for and pushed a little past it, so a bloom
   reads as light entering the frame rather than a blob parked inside it. The
   blur therefore spills outside the parent: the parent must clip, which .band
   (overflow-x: clip) and .hero (overflow: clip) already do. */
const AT: Record<At, React.CSSProperties> = {
  tl: { top: 0, left: 0, transform: "translate(-40%, -40%)" },
  tr: { top: 0, right: 0, transform: "translate(40%, -40%)" },
  bl: { bottom: 0, left: 0, transform: "translate(-40%, 40%)" },
  br: { bottom: 0, right: 0, transform: "translate(40%, 40%)" },
  top: { top: 0, left: "50%", transform: "translate(-50%, -40%)" },
  bottom: { bottom: 0, left: "50%", transform: "translate(-50%, 40%)" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
};

/**
 * A soft light source for a band or a hero — one per composition, in the corner
 * the layout is already heaviest in. Reach for this when a ground needs warmth
 * or a focal point; reach for FieldPlate when it needs to look measured.
 */
export function Bloom({
  hue = "ember",
  at = "tr",
  size = 64,
  opacity,
  className,
}: {
  hue?: Hue;
  at?: At;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  /* Square, off the parent's width. CSS has no parent-min unit without
     container-type on the parent — which the caller owns — and sizing off
     width is the choice that cannot widen a 390px page. */
  const style: React.CSSProperties = {
    ...AT[at],
    width: `${size}%`,
    aspectRatio: "1",
    // only the custom properties need the assertion; asserting the whole
    // literal would switch off checking on the real CSS fields above
    ...(HUE[hue] ? ({ "--bloom-hue": HUE[hue] } as React.CSSProperties) : null),
    ...(opacity !== undefined ? ({ "--bloom-a": String(opacity) } as React.CSSProperties) : null),
  };

  return <div aria-hidden className={cn("bloom", className)} style={style} />;
}

/**
 * The measured grid behind a hero or a proof band: structure, not mood. Use it
 * where the copy is about a system or a process. It inherits --amb-ink, so it
 * inverts inside .band--ink on its own — never give it a colour.
 *
 * `.field` is inset by -80px so the grid runs past the edge rather than
 * stopping at it, which means the parent must clip: `.band` (overflow-x: clip)
 * and `.hero` (overflow: clip) already do, anything else needs its own.
 */
export function FieldPlate({
  fx = "50%",
  fy = "50%",
  className,
}: {
  fx?: string;
  fy?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("field", className)}
      style={{ "--fx": fx, "--fy": fy } as React.CSSProperties}
    />
  );
}
