import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { StaggerItem } from "@/components/motion/Stagger";
import type { UseCase } from "@/content/use-cases";
import { cn } from "@/lib/utils";

/**
 * A use case as a small link card: the industry, the title, and two lines of
 * context (who the client is, which market). The detail lives on the use
 * case's own page; the card only has to make it worth opening.
 */
export function UseCaseCard({ u, i = 0, className, showService = true }: { u: UseCase; i?: number; className?: string; showService?: boolean }) {
  return (
    <StaggerItem i={i} className={cn("h-full", className)}>
      <Link
        href={`/use-cases/${u.slug}`}
        className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-rule bg-paper p-5 transition-colors duration-[var(--dur-1)] hover:border-ember md:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <span className="rounded-full bg-ember px-2.5 py-0.5 text-[0.75rem] font-semibold text-white">{u.industry}</span>
            {showService && <span className="text-[0.8rem] text-muted">{u.service}</span>}
          </div>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand text-fg transition-colors group-hover:bg-ember group-hover:text-white">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>

        <h3 className="mt-4 font-display text-[1.06rem] font-bold leading-snug tracking-[-0.015em] text-fg mb-5 md:text-[1.12rem]">{u.title}</h3>

        <dl className="mt-auto space-y-1.5 border-t border-rule pt-4 text-[0.86rem] leading-snug text-fg-soft">
          <div className="flex gap-2">
            <dt className="sr-only">Client</dt>
            <Building2 className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden />
            <dd>{u.glance["Client profile"]}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="sr-only">Market</dt>
            <MapPin className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden />
            <dd>{u.glance.Markets}</dd>
          </div>
        </dl>
      </Link>
    </StaggerItem>
  );
}
