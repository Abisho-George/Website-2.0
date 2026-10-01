import { HeroFrame } from "./HeroFrame";
import type { HeroArt } from "@/components/visual/HeroArt";

type Art = React.ComponentProps<typeof HeroArt>["variant"];

/**
 * The old page opening, kept as a thin adapter over HeroFrame.
 *
 * Its signature is unchanged so all eight callers compile untouched while
 * they convert one at a time; `art` is accepted and ignored, because the
 * 320x240 hairline drawing it named is exactly what the new hero replaces, * it sat in a 5-of-12 column roughly 540px wide, which guaranteed about
 * 160px of empty column on every template.
 *
 * A page that has been converted passes a `scene` and a computed `readout`
 * to HeroFrame directly. This file goes away once the last one has.
 */
export function PageHero({
  title,
  lede,
  children,
  className,
  scene,
  readout,
  eyebrow,
  aside,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Accepted for source compatibility and deliberately unused. */
  art?: Art;
  children?: React.ReactNode;
  className?: string;
  scene?: React.ReactNode;
  readout?: { k: string; v: React.ReactNode }[];
  eyebrow?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <HeroFrame size="md" title={title} lede={lede} className={className} scene={scene} readout={readout} eyebrow={eyebrow} aside={aside}>
      {children}
    </HeroFrame>
  );
}
