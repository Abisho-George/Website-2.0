import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The one way an icon is mounted on this site.
 *
 * Three presentations, one geometry: the glyph is drawn at the same size and
 * the same stroke in all three, so a plate in a card and a bare mark beside a
 * line of label type read as the same family rather than as two icon sets.
 *
 *   plate  the raised sand plate from globals.css — the card and list-row mark
 *   ring   a hairline circle, for marks on an already-busy surface
 *   bare   the glyph alone, inline beside text (size="sm" matches label/micro)
 *
 * The plate's colour, its lit lip and the tilt it performs when its card is
 * hovered all live in `.plate` in globals.css; reimplementing any of that here
 * would give the site two answers to the same question. Ring and bare instead
 * inherit `currentColor`, which is what lets them sit on paper, sand and an
 * ink band without this file owning a per-band override.
 *
 * No tokens were added to globals.css for this component.
 */

/** One stroke for every icon on the site. Heavier than lucide's default so a
 *  20px glyph holds up next to Bricolage at 620 weight. */
const STROKE = 1.75;

/** `.plate--*` carries only width/height, so the ring borrows it for its box
 *  and the two presentations cannot drift apart. */
const box = { sm: "plate--sm", md: "plate--md", lg: "plate--lg" } as const;
const glyph = { sm: "size-4", md: "size-5", lg: "size-6" } as const;

export function IconPlate({
  icon: Icon,
  presentation = "plate",
  size = "md",
  className,
  label,
}: {
  icon: LucideIcon;
  presentation?: "plate" | "bare" | "ring";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}) {
  const shell =
    presentation === "plate"
      ? cn("plate", box[size])
      : presentation === "ring"
        ? cn("inline-flex items-center justify-center rounded-full border border-rule", box[size])
        : "inline-flex align-middle";

  // An icon that names something is an image; one that repeats adjacent text
  // is furniture, and a screen reader should not read the card title twice.
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  return (
    <span className={cn(shell, "shrink-0", className)} {...a11y}>
      <Icon className={glyph[size]} strokeWidth={STROKE} aria-hidden />
    </span>
  );
}
