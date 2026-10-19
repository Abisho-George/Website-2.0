import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { StaggerItem } from "@/components/motion/Stagger";
import type { UseCase } from "@/content/case-studies";
import { cn } from "@/lib/utils";

/**
 * A case study as a link card: a thin brand-red rule along the top, the
 * industry, the title and two lines of context (who the client is, which
 * market). Its border warms on hover.
 */
export function UseCaseCard({ u, i = 0, className, showService = true }: { u: UseCase; i?: number; className?: string; showService?: boolean }) {
  return (
    <StaggerItem i={i} className={cn("h-full", className)}>
      <Link
        href={`/case-studies/${u.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-paper p-6 transition-colors duration-300 hover:border-ember/40"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.18] bg-ember transition-transform duration-500 group-hover:scale-x-100" />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-block rounded-full bg-ember-wash px-2.5 py-1 text-[0.75rem] font-semibold text-ember-ink">{u.industry}</span>
            {showService && <p className="mt-2 truncate text-[0.8rem] text-muted">{u.service}</p>}
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-dim transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" aria-hidden />
        </div>

        <h3 className="mb-6 mt-4 font-display text-[1.08rem] font-bold leading-snug text-fg md:text-[1.14rem]">{u.title}</h3>

        <dl className="mt-auto space-y-2 border-t border-rule pt-4 text-[0.86rem] leading-snug text-fg-soft">
          <div className="flex gap-2.5">
            <dt className="sr-only">Client</dt>
            <Building2 className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
            <dd>{u.glance["Client profile"]}</dd>
          </div>
          <div className="flex gap-2.5">
            <dt className="sr-only">Market</dt>
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
            <dd>{u.glance.Markets}</dd>
          </div>
        </dl>
      </Link>
    </StaggerItem>
  );
}
