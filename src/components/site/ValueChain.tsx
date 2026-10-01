import { cn } from "@/lib/utils";
import { valueChain, type Stage } from "@/content/services";

const LABEL: Record<Stage, string> = {
  DECIDE: "Decide",
  DISCOVER: "Discover",
  PRIORITISE: "Prioritise",
  POSITION: "Position",
  ENGAGE: "Engage",
  MEET: "Meet",
  CONVERT: "Convert",
  "LEARN / SCALE": "Learn & scale",
};

/**
 * The master value chain from the service portfolio, with the stages a given
 * service owns lit in ember. It is the document's own "horizontal logic", so a
 * reader sees where a service sits in the revenue engine without being told.
 *
 * Vertical on every width: eight stages in a row do not fit a phone, and the
 * reading order is the point.
 */
export function ValueChain({ stages, className }: { stages: Stage[]; className?: string }) {
  const on = new Set(stages);
  return (
    <ol className={cn("relative", className)} aria-label="Where this sits in the revenue engine">
      {valueChain.map((s, i) => {
        const lit = on.has(s);
        const last = i === valueChain.length - 1;
        return (
          <li key={s} className="relative flex items-center gap-3.5 py-[7px]">
            {!last && (
              <span
                aria-hidden
                className={cn("absolute left-[5px] top-[22px] h-[calc(100%-8px)] w-px", lit && on.has(valueChain[i + 1]) ? "bg-ember" : "bg-rule")}
              />
            )}
            <span
              aria-hidden
              className={cn(
                "relative z-[1] size-[11px] shrink-0 rounded-full border transition-colors",
                lit ? "border-ember bg-ember shadow-[0_0_0_4px_var(--color-ember-wash)]" : "border-rule-strong bg-paper",
              )}
            />
            <span className={cn("font-mono text-label uppercase tracking-[0.14em]", lit ? "font-medium text-fg" : "text-faint")}>
              {LABEL[s]}
              {lit && <span className="sr-only"> (this service)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export { LABEL as stageLabel };
