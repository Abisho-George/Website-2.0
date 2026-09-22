import { cn } from "@/lib/utils";

/**
 * A timeline read as a quantity rather than as a sentence.
 *
 * "3 weeks" and "12 weeks" set in the same mono line are the same shape on the
 * page, so a reader scanning twenty-four services has no way to tell a short
 * engagement from a quarter of their year without reading every card. Ticks on
 * a scale make that comparable at a glance.
 *
 * The scale is shared on purpose: every meter draws `max` ticks whether or not
 * the service fills them. A meter that resized itself to its own value would be
 * a bar chart with no axis, and three weeks would look identical to twelve.
 *
 * `parseWeeks` never estimates. Months, quarters, "ongoing" and "48 hours" all
 * return null and print as plain text: a retainer has no end to draw, and a
 * month is 4.3 weeks, so rounding one into a fixed bar would state a scope the
 * proposal does not. Days do convert — seven of them are a week, exactly.
 *
 * Tokens: none added. The ticks are `.spec` / `.spec__ticks` / `.spec__tick`
 * from globals.css, which light to ember in sequence on `.card:hover` from the
 * `data-on` and `--i` supplied below. At rest the lit ticks carry --color-dim
 * and the unlit ones fade back: a meter that only reads under a pointer reads
 * not at all on a phone.
 */

/** "4–5 weeks" → 5. The upper bound, because a meter that under-draws the scope
 *  is the error a buyer notices after signing rather than before. */
const WEEKS = /(\d+(?:\.\d+)?)\s*(?:[–—-]\s*(\d+(?:\.\d+)?)\s*)?weeks?\b/i;
const DAYS = /(\d+(?:\.\d+)?)\s*days?\b/i;
/** A tail that means the engagement does not stop where the number does. */
const OPEN_ENDED = /\b(then|ongoing|onward|onwards|minimum|quarterly|monthly|retainer|per\s|each\s)/i;

export function parseWeeks(timeline: string): number | null {
  // An open-ended tail outranks any figure in front of it. "3 weeks to build,
  // then ongoing" is a retainer, and drawing it as the shortest bar on the
  // page states the opposite of what the engagement is.
  if (OPEN_ENDED.test(timeline)) return null;

  const weeks = WEEKS.exec(timeline);
  if (weeks) return whole(Number(weeks[2] ?? weeks[1]));

  const days = DAYS.exec(timeline);
  if (days) return whole(Number(days[1]) / 7);

  return null;
}

/** Sub-week scopes have nothing to draw: a meter cannot show a third of a tick. */
function whole(n: number): number | null {
  const w = Math.round(n);
  return Number.isFinite(w) && w >= 1 ? w : null;
}

export function ScopeMeter({
  timeline,
  max = 12,
  className,
}: {
  timeline: string;
  max?: number;
  className?: string;
}) {
  const weeks = parseWeeks(timeline);

  // No defensible week count. Print the sentence — "Ongoing, quarterly
  // commitment" drawn as a half-filled bar is a claim nobody made. `.spec`
  // still carries the type, so a card with a meter and a card without it line
  // their timelines up on the same baseline.
  if (weeks === null) return <p className={cn("spec", className)}>{timeline}</p>;

  const lit = Math.min(weeks, max);

  return (
    <p className={cn("spec", className)} data-weeks={weeks}>
      {/* the quantity is in the text beside it; the ticks are the picture of it */}
      <span className="spec__ticks shrink-0" aria-hidden>
        {Array.from({ length: max }, (_, i) => (
          <i
            key={i}
            // lit ticks read at rest; sinking the unlit ones instead left the
            // whole meter at 1.37:1 on a white card, which is no meter at all
            className={cn("spec__tick", i < lit ? "bg-dim" : "opacity-40")}
            data-on={i < lit ? "" : undefined}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </span>
      {timeline}
    </p>
  );
}
