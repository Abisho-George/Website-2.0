import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/utils";

/**
 * The page opening, rebuilt as a scene with copy standing on it.
 *
 * PageHero put the copy in 7 of 12 columns and a 320px drawing in the other 5,
 * which on a 1400px page leaves ~160px of empty column on every template, the
 * dead air that reads as unfinished. Here the visual is a BACKGROUND layer
 * inset from --scene-left, so there is no five-column hole to fill: the copy
 * keeps its 7 columns and the scene runs under and past it to the page edge.
 *
 * Every class below is from the .hero family in globals.css. This file adds no
 * tokens and writes no colours; if a hero needs a new ground, it picks a band.
 */

type Size = "sm" | "md" | "lg";
type Band = "paper" | "sand" | "ink";

/**
 * The height rung and the type rung move together, but only the full-height
 * hero gets display-1, a short hero is shorter, not quieter.
 */
const RUNG: Record<Size, string> = { sm: "display-2", md: "display-2", lg: "display-1" };

export function HeroFrame({
  size = "lg",
  eyebrow,
  title,
  lines,
  lede,
  breadcrumb,
  actions,
  aside,
  scene,
  readout,
  sceneLeft,
  band = "paper",
  className,
  children,
  n,
  label,
}: {
  size?: Size;
  /** Inline content, it is set inside the page's own <p class="eyebrow">. */
  eyebrow?: React.ReactNode;
  /** Used when `lines` is absent. */
  title?: React.ReactNode;
  /** Authored line breaks. Passing these buys the line-by-line mask reveal. */
  lines?: React.ReactNode[];
  lede?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  /** An optional panel beside the copy. Absent, the copy simply runs wider. */
  aside?: React.ReactNode;
  /** The full-bleed layer behind everything. */
  scene?: React.ReactNode;
  readout?: { k: string; v: React.ReactNode }[];
  /** Overrides --scene-left for a page whose scene wants more or less room. */
  sceneLeft?: string;
  band?: Band;
  className?: string;
  children?: React.ReactNode;
  /** Registers the hero with the spine as the page's first numbered section. */
  n?: string;
  label?: string;
}) {
  const rung = RUNG[size];
  const heading = lines?.length ? (
    <SplitHeading lines={lines} className={rung} />
  ) : title ? (
    <Reveal delay={60}>
      <h1 className={cn(rung, "balance")}>{title}</h1>
    </Reveal>
  ) : null;

  // When the copy has finished arriving. Everything under the heading is timed
  // off this so a three-line title and a one-line title both land in sequence
  // rather than colliding with the lede.
  const settle = lines?.length ? 60 + lines.length * 90 : 150;

  return (
    <section
      data-size={size}
      data-section-n={n}
      data-section-label={label}
      className={cn("hero band", band !== "paper" && `band--${band}`, className)}
      style={sceneLeft ? ({ "--scene-left": sceneLeft } as React.CSSProperties) : undefined}
    >
      {scene ? (
        // Masked here rather than by each scene, so every hero on the site ends
        // its scene the same way: feathered, never cut off at an edge.
        <div className="hero__scene scene-mask" aria-hidden>
          {scene}
        </div>
      ) : null}

      <div className="container-x">
        <div className="hero__grid">
          <div className="lg:col-span-7">
            {breadcrumb ? <Reveal className="mb-6">{breadcrumb}</Reveal> : null}
            {eyebrow ? (
              <Reveal delay={30} className="mb-5">
                <p className="eyebrow">{eyebrow}</p>
              </Reveal>
            ) : null}
            {heading}
            {lede ? (
              <Reveal delay={settle}>
                <p className="lede measure mt-6">{lede}</p>
              </Reveal>
            ) : null}
            {actions ? (
              <Reveal delay={settle + 80} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                {actions}
              </Reveal>
            ) : null}
          </div>

          {aside ? (
            <Reveal delay={settle + 140} className="lg:col-span-4 lg:col-start-9">
              {aside}
            </Reveal>
          ) : null}
        </div>

        {children}

        {readout?.length ? (
          <Reveal delay={settle + 200}>
            <HeroReadout items={readout} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/**
 * The figures under a hero.
 *
 * Values are COMPUTED from content by the caller, services.length,
 * practices.length, the count of practices a service belongs to, and never
 * typed, because a number typed here is an invented fact that nothing will
 * re-check when the content changes. A value that is authored copy must be
 * passed in through <Copy/> so a [[placeholder]] keeps its flag in the cell.
 */
export function HeroReadout({ items, className }: { items: { k: string; v: React.ReactNode }[]; className?: string }) {
  if (!items.length) return null;
  return (
    <dl className={cn("readout", className)}>
      {items.map((it, i) => (
        // min-w-0 so a long value shrinks its track instead of widening the
        // grid; break-words so it wraps rather than running past the cell.
        <div key={`${i}-${it.k}`} className="readout__cell min-w-0 break-words">
          <dt className="readout__k">{it.k}</dt>
          <dd className="readout__v">{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}
