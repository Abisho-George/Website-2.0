import { cn } from "@/lib/utils";

/**
 * Atmosphere — the four ambient marks as primitives, so a page never types a
 * gradient into a className again. All four are decorative: aria-hidden, inert,
 * and drawn entirely from the tokens in globals.css.
 *
 * Which one, and why it matters: these do different jobs and a band wearing all
 * four reads as noise rather than as atmosphere.
 *   Bloom       light. One soft source tinting a corner — warmth, depth, focus.
 *   FieldPlate  structure. A measured grid — "this is a system", not a mood.
 *   Seam        an edge. Where one band stops.
 *   Grain       a surface. Only under a scene that needs something to sit on.
 *
 * Two things this file knows that its callers do not:
 *   1. globals.css is unlayered, so its rules outrank Tailwind's utilities.
 *      A caller cannot change `.bloom`'s position or `.hero-grain`'s with a
 *      class; where that matters the component sets it inline instead.
 *   2. Missing token — `hue="blue"`. `.bloom` needs bare "R G B" channels for
 *      rgb(… / a); --bloom-hue and --amb-ink are stored that way, but the
 *      logo blue only exists as the hex --color-brand-blue (#2438c8), so its
 *      channels are restated below. It wants a --blue-hue triplet in
 *      globals.css beside --bloom-hue; delete the literal when that lands.
 */

type Hue = "ember" | "ink" | "blue";
type At = "tl" | "tr" | "bl" | "br" | "top" | "bottom" | "center";

/* ember is already the :root value of --bloom-hue and ink tracks --amb-ink —
   which flips to white inside .band--ink — so neither is restated here. */
const HUE: Record<Hue, string | undefined> = {
  ember: undefined,
  ink: "var(--amb-ink)",
  blue: "36 56 200",
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
  const style = {
    ...AT[at],
    width: `${size}%`,
    aspectRatio: "1",
    ...(HUE[hue] ? { "--bloom-hue": HUE[hue] } : null),
    ...(opacity !== undefined ? { "--bloom-a": String(opacity) } : null),
  } as React.CSSProperties;

  return <div aria-hidden className={cn("bloom", className)} style={style} />;
}

/**
 * The measured grid behind a hero or a proof band: structure, not mood. Use it
 * where the copy is about a system or a process. It inherits --amb-ink, so it
 * inverts inside .band--ink on its own — never give it a colour.
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

/**
 * An edge. `rule` is the full-bleed hairline that closes the top or bottom of a
 * band; `ember` is the short brand segment that sits under a section head and
 * marks where the page changes subject. One per edge — a page of seams is a table.
 */
export function Seam({ tone = "rule", className }: { tone?: "rule" | "ember"; className?: string }) {
  if (tone === "ember") {
    return (
      <div
        aria-hidden
        className={cn("h-px w-16 bg-ember", className)}
        /* #000 is mask alpha, not a colour — the red comes from the token above.
           Masking rather than fading the background keeps it one token deep. */
        style={{
          WebkitMaskImage: "linear-gradient(90deg, #000, transparent)",
          maskImage: "linear-gradient(90deg, #000, transparent)",
        }}
      />
    );
  }
  /* Feathered at both ends for the same reason .scene-mask is: a rule that runs
     the full width should end, not get cut off by the viewport. */
  return <div aria-hidden className={cn("hairline mask-fade-x w-full", className)} />;
}

/**
 * Film grain over a scene — a surface for a canvas or a hero illustration to sit
 * on, and nothing else. Never on type, and never on an element that already
 * needs its own ::after (a .card, a .band, a .sheen): .hero-grain owns ::after
 * and the second one silently wins. Give it its own div, as here.
 *
 * It covers its positioned parent, so the parent sizes it. Position is set
 * inline because `.hero-grain { position: relative }` is unlayered and would
 * otherwise beat an `absolute` class the caller passes.
 */
export function Grain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("hero-grain pointer-events-none overflow-hidden rounded-[inherit]", className)}
      style={{ position: "absolute", inset: 0 }}
    />
  );
}
