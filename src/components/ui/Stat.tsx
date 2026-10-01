"use client";
import { Copy } from "./Copy";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";

/**
 * A proof figure. Counts up purely numeric values; renders anything else
 * (with its flags intact) as-is.
 *
 * A figure written as [[1,200]] is an invented number awaiting sign-off. It
 * keeps its dashed underline and it never animates, a placeholder that
 * counts up looks exactly as confident as a verified one, which is the whole
 * problem the flagging exists to solve.
 */
export function Stat({
  value,
  suffix = "",
  label,
  size = "lg",
  delay = 0,
}: {
  value: string;
  suffix?: string;
  label: string;
  size?: "lg" | "md";
  delay?: number;
}) {
  const clean = value.replace(/\[\[|\]\]/g, "");
  const isPh = value.includes("[[");
  const num = Number(clean.replace(/,/g, ""));
  const numeric = !Number.isNaN(num) && /^[\d.,]+$/.test(clean);
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;

  return (
    <div>
      <div className={cn("tnum", size === "lg" ? "display-2" : "display-3")}>
        {numeric ? (
          <CountUp
            value={num}
            decimals={decimals}
            delay={delay}
            animate={!isPh}
            data-stat={clean}
            data-placeholder={isPh ? "" : undefined}
            title={isPh ? "Placeholder: verify before launch" : undefined}
          />
        ) : (
          <span data-placeholder={isPh ? "" : undefined} title={isPh ? "Placeholder: verify before launch" : undefined}>
            {clean}
          </span>
        )}
        <span className="text-ember">{suffix}</span>
      </div>
      <p className="mt-2 max-w-[22ch] text-sm leading-snug text-muted"><Copy text={label} /></p>
    </div>
  );
}
