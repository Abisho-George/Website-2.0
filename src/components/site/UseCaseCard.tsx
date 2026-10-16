import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { StaggerItem } from "@/components/motion/Stagger";
import { Tilt } from "@/components/motion/Tilt";
import type { UseCase } from "@/content/case-studies";
import { cn } from "@/lib/utils";

/**
 * A case study as a case file: a red tab carrying the industry, a sheet with
 * a hard ink edge sitting on a solid offset shadow, the title and two lines of
 * context (who the client is, which market). It tips toward the pointer and
 * its shadow turns red when it can be opened.
 */
export function UseCaseCard({ u, i = 0, className, showService = true }: { u: UseCase; i?: number; className?: string; showService?: boolean }) {
  return (
    <StaggerItem i={i} className={cn("h-full", className)}>
      <Tilt>
        <Link href={`/case-studies/${u.slug}`} className="group relative flex h-full flex-col pt-8 focus-visible:outline-none">
          <span className="absolute left-0 top-0 h-9 max-w-[85%] truncate rounded-t-[14px] border-2 border-b-0 border-ink bg-ember px-4 pt-1.5 text-[0.78rem] font-semibold text-white">
            {u.industry}
          </span>
          <div className="relative flex flex-1 flex-col rounded-[18px] rounded-tl-none border-2 border-ink bg-paper p-5 shadow-[6px_6px_0_0_var(--color-ink)] transition-[box-shadow,transform] duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[9px_9px_0_0_var(--color-ember)] group-focus-visible:shadow-[9px_9px_0_0_var(--color-ember)] md:p-6">
            <div className="flex items-start justify-between gap-3">
              <span className="kicker text-muted">{showService ? u.service : "Case study"}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper text-fg transition-colors group-hover:bg-ember group-hover:text-white">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </div>

            <h3 className="mb-5 mt-3 font-display text-[1.08rem] font-bold leading-snug text-fg md:text-[1.15rem]">{u.title}</h3>

            <dl className="mt-auto grid gap-2 text-[0.86rem] leading-snug text-fg-soft">
              <div className="flex gap-2 rounded-[10px] bg-sand px-3 py-2">
                <dt className="sr-only">Client</dt>
                <Building2 className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden />
                <dd>{u.glance["Client profile"]}</dd>
              </div>
              <div className="flex gap-2 rounded-[10px] bg-sand px-3 py-2">
                <dt className="sr-only">Market</dt>
                <MapPin className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden />
                <dd>{u.glance.Markets}</dd>
              </div>
            </dl>
          </div>
        </Link>
      </Tilt>
    </StaggerItem>
  );
}
