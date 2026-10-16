import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StaggerItem } from "@/components/motion/Stagger";
import type { UseCase } from "@/content/use-cases";
import { cn } from "@/lib/utils";

/**
 * A use case at a glance: industry and service on top, the title, then the
 * story in three beats on a short track (challenge, approach, result), the
 * last beat lit. The whole card opens the full use case.
 */
export function UseCaseCard({ u, i = 0, className, showService = true }: { u: UseCase; i?: number; className?: string; showService?: boolean }) {
  const beats = [
    { k: "Challenge", v: u.challenge },
    { k: "Approach", v: u.approach },
    { k: "Result", v: u.result },
  ];
  return (
    <StaggerItem i={i} className={cn("h-full", className)}>
      <Link
        href={`/use-cases/${u.slug}`}
        className="group relative flex h-full flex-col rounded-[var(--radius-lg)] border border-rule bg-paper p-6 transition-[border-color,box-shadow,transform] duration-[var(--dur-1)] hover:-translate-y-0.5 hover:border-ember/40 hover:shadow-e3 md:p-7"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-ember-wash px-2.5 py-1 text-[0.72rem] font-medium text-ember-ink">{u.industry}</span>
          {showService && <span className="text-[0.78rem] text-muted">{u.service}</span>}
        </div>
        <h3 className="mt-4 font-display text-[1.14rem] font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-ember-ink md:text-[1.22rem]">
          {u.title}
        </h3>

        <ol className="relative mt-5 space-y-3.5 pl-5">
          <span aria-hidden className="absolute bottom-2 left-[4px] top-2 w-px bg-rule-strong" />
          {beats.map((b, k) => (
            <li key={b.k} className="relative">
              <span aria-hidden className={cn("absolute -left-5 top-[5px] size-[9px] rounded-full border-2", k === 2 ? "border-ember bg-ember" : "border-rule-strong bg-paper")} />
              <span className={cn("block text-[0.7rem] font-semibold uppercase tracking-[0.12em]", k === 2 ? "text-ember-ink" : "text-dim")}>{b.k}</span>
              <span className={cn("mt-0.5 block text-[0.9rem] leading-snug", k === 2 ? "font-medium text-fg" : "text-fg-soft")}>{b.v}</span>
            </li>
          ))}
        </ol>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ember-ink">
          Read the use case <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </StaggerItem>
  );
}
