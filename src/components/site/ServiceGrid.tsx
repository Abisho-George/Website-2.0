import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { serviceHref } from "@/content/services";
import { IconPlate } from "@/components/ui/IconPlate";
import { StaggerItem } from "@/components/motion/Stagger";
import { stageLabel } from "@/components/site/ValueChain";
import { iconFor } from "@/components/icons/registry";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The services grid, in three unequal tiers.
 *
 * Cards of identical weight are not a grid, they are a list with borders:
 * nothing is ranked, so the eye has nowhere to land. Each family therefore
 * leads with one FEATURE card at roughly double width that carries the
 * service's own definition; the rest follow as COMPACT cards; ROW is a
 * register line for dense lists.
 *
 * Every card states where the service sits on the value chain, which is the
 * portfolio's own way of telling services apart.
 */

const BEAT = { step: stagger.tight, cap: 6 } as const;

function Stages({ s, className }: { s: Service; className?: string }) {
  // a span of six or more stages (the AI systems) reads as "end to end"
  const span = s.stages.length >= 6;
  return (
    <p className={cn("font-mono text-micro uppercase tracking-[0.13em] text-dim", className)}>
      {span ? `${stageLabel[s.stages[0]]} to ${stageLabel[s.stages[s.stages.length - 1]]}` : s.stages.map((x) => stageLabel[x]).join(" · ")}
    </p>
  );
}

export function ServiceCard({
  service,
  variant = "compact",
  i = 0,
}: {
  service: Service;
  variant?: "feature" | "compact" | "row";
  i?: number;
}) {
  if (variant === "feature") return <FeatureCard service={service} i={i} />;
  if (variant === "row") return <RowCard service={service} i={i} />;
  return <CompactCard service={service} i={i} />;
}

/** One per family. The width is baked into the tier: a feature card that is
 *  not wider than its siblings is just a compact card with more text in it. */
function FeatureCard({ service, i }: { service: Service; i: number }) {
  return (
    <StaggerItem i={i} step={BEAT.step} cap={BEAT.cap} className="h-full md:col-span-2">
      <Link href={serviceHref(service)} className="card group flex h-full flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <IconPlate icon={iconFor(service.slug)} size="lg" />
          <ArrowUpRight className="size-5 shrink-0 text-dim transition-colors duration-[var(--dur-1)] group-hover:text-ember-ink" />
        </div>
        <h3 className="h3 mt-5">{service.name}</h3>
        <p className="mt-2 font-display text-[1.05rem] font-medium leading-snug text-ember-ink">{service.tagline}</p>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-fg-soft">{service.what}</p>
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-rule pt-5 md:mt-auto">
          <Stages s={service} />
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ember-ink">
            Explore <ArrowRight className="size-4 transition-transform duration-[var(--dur-1)] group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </StaggerItem>
  );
}

function CompactCard({ service, i }: { service: Service; i: number }) {
  return (
    <StaggerItem i={i} step={BEAT.step} cap={BEAT.cap} className="h-full">
      <Link href={serviceHref(service)} className="card group flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <IconPlate icon={iconFor(service.slug)} size="md" />
          <ArrowRight className="size-4 shrink-0 text-dim transition-[transform,color] duration-[var(--dur-1)] group-hover:translate-x-0.5 group-hover:text-ember-ink" />
        </div>
        <h3 className="h4 mt-4">{service.name}</h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{service.tagline}</p>
        <div className="mt-auto pt-5">
          <Stages s={service} className="border-t border-rule pt-4" />
        </div>
      </Link>
    </StaggerItem>
  );
}

/** A register line. No `.card`: a row is not a raised surface. */
function RowCard({ service, i }: { service: Service; i: number }) {
  return (
    <StaggerItem i={i} step={BEAT.step} cap={BEAT.cap} className="border-b border-rule">
      <Link href={serviceHref(service)} className="row-item group">
        <IconPlate icon={iconFor(service.slug)} presentation="bare" size="sm" className="text-ember-ink" />
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-6">
          <div className="min-w-0 sm:flex-1">
            <div className="font-display font-semibold tracking-tight transition-colors duration-[var(--dur-1)] group-hover:text-ember-ink">
              {service.name}
            </div>
            <p className="truncate text-[0.84rem] text-muted">{service.tagline}</p>
          </div>
          <Stages s={service} className="mt-1.5 hidden sm:mt-0 sm:block sm:shrink-0" />
        </div>
        <ArrowRight className="size-4 shrink-0 text-dim" aria-hidden />
      </Link>
    </StaggerItem>
  );
}

/**
 * Feature plus compacts, one family.
 *
 * Below 768px the compacts become a horizontal snap rail and the feature keeps
 * the full width above it: one DOM node per service, and the next card peeks.
 * `md:contents` lets one wrapper be the rail on a phone and dissolve into the
 * outer grid above it; it deliberately does not carry `.rail`, whose unlayered
 * `display: grid` would beat the layered `md:contents`.
 */
export function ServiceGrid({
  services,
  featureSlug,
  className,
}: {
  services: Service[];
  featureSlug?: string;
  className?: string;
}) {
  if (services.length === 0) return null;
  const feature = services.find((s) => s.slug === featureSlug) ?? services[0];
  const rest = services.filter((s) => s.slug !== feature.slug);

  return (
    <div className={cn("grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3", className)}>
      <ServiceCard service={feature} variant="feature" i={0} />
      {rest.length > 0 && (
        <div className="rail--swipe grid gap-3.5 md:contents">
          {rest.map((s, idx) => (
            <ServiceCard key={s.slug} service={s} variant="compact" i={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
