import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
// `Service` lives in the content file rather than in content/types.ts, unlike
// the other content types; `import type` erases it, so nothing is pulled in.
import type { Service } from "@/content/services";
import { Copy } from "@/components/ui/Copy";
import { IconPlate } from "@/components/ui/IconPlate";
import { ScopeMeter } from "@/components/ui/ScopeMeter";
import { StaggerItem } from "@/components/motion/Stagger";
import { iconFor } from "@/components/icons/registry";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The services grid, in three unequal tiers.
 *
 * Twenty-four cards of identical weight are not a grid, they are a list with
 * borders: nothing is ranked, so the eye has nowhere to land and the reader has
 * to finish all twenty-four taglines to find the one they came for. Each
 * practice group therefore leads with one FEATURE card at roughly double width,
 * the rest follow as COMPACT cards, and ROW is the third tier — a register line
 * for dense lists, where a card's chrome would be noise.
 *
 * Every tier prints the price. The hub's own lede promises the reader can
 * decide before the first call, and a card that withholds what it costs breaks
 * that promise on the page that makes it. Every price in content is a
 * [[placeholder]], so all of them go through <Copy> and keep their flag.
 *
 * Marks come from the registry through `iconFor` rather than `serviceIcon[slug]`
 * directly, so a service added to content before it is given a mark still draws
 * a plate instead of taking its whole practice group down with it.
 *
 * Tokens: none added.
 */

/** Dense enough that the tight beat is the right one; capped so a nine-service
 *  group does not put its last card half a second behind its first. */
const BEAT = { step: stagger.tight, cap: 6 } as const;

const path = (service: Service) => `/services/${service.slug}`;

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

/**
 * One per practice group. The width is baked into the tier rather than passed
 * in, because a feature card that is not wider than its siblings is not a
 * feature card — it is a compact card with more text in it.
 */
function FeatureCard({ service, i }: { service: Service; i: number }) {
  const Icon = iconFor(service.slug);

  return (
    <StaggerItem i={i} step={BEAT.step} cap={BEAT.cap} className="h-full md:col-span-2">
      <Link href={path(service)} className="card card-hover group flex h-full flex-col p-6 md:p-8">
        <div className="flex flex-1 flex-col gap-6 md:grid md:grid-cols-5 md:gap-8">
          <div className="min-w-0 md:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <IconPlate icon={Icon} size="lg" />
              <ArrowUpRight className="size-5 shrink-0 text-dim transition-colors duration-[var(--dur-1)] group-hover:text-ember-ink" />
            </div>
            <h3 className="h3 mt-5">{service.name}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{service.tagline}</p>
          </div>

          {/* the first three only: this is the card that says what the work IS,
              not the page that lists everything in the scope */}
          <ul className="min-w-0 space-y-3 border-t border-rule pt-5 md:col-span-2 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            {service.includes.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.85rem] leading-snug text-fg-soft">
                <Check className="mt-[3px] size-3.5 shrink-0 text-ember" aria-hidden />
                <span><Copy text={item} /></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-rule pt-5">
          <div className="min-w-0">
            <div className="font-mono text-micro uppercase tracking-[0.15em] text-dim">Price</div>
            <div className="tnum mt-1.5 font-display text-[1.15rem] font-semibold tracking-tight">
              <Copy text={service.pricing} />
            </div>
          </div>
          <ScopeMeter timeline={service.timeline} className="min-w-0" />
        </div>
      </Link>
    </StaggerItem>
  );
}

/** The standard card: mark, name, tagline, scope, price. Nothing else fits at
 *  this width without the price losing the bottom line to a "Details" link. */
function CompactCard({ service, i }: { service: Service; i: number }) {
  const Icon = iconFor(service.slug);

  return (
    <StaggerItem i={i} step={BEAT.step} cap={BEAT.cap} className="h-full">
      <Link href={path(service)} className="card card-hover group flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <IconPlate icon={Icon} size="md" />
          <ArrowRight className="size-4 shrink-0 text-dim transition-[transform,color] duration-[var(--dur-1)] group-hover:translate-x-0.5 group-hover:text-ember-ink" />
        </div>
        <h3 className="h4 mt-4">{service.name}</h3>
        <p className="mt-2 text-[0.87rem] leading-relaxed text-muted">{service.tagline}</p>
        <div className="mt-auto pt-5">
          <ScopeMeter timeline={service.timeline} />
          <div className="tnum mt-3 border-t border-rule pt-3 font-display text-[0.95rem] font-semibold tracking-tight">
            <Copy text={service.pricing} />
          </div>
        </div>
      </Link>
    </StaggerItem>
  );
}

/** A register line. No `.card`: a row is not a raised surface, and twenty-four
 *  of them stacked would be twenty-four shadows. `.row-item` carries the hover
 *  travel instead. */
function RowCard({ service, i }: { service: Service; i: number }) {
  const Icon = iconFor(service.slug);

  return (
    <StaggerItem i={i} step={BEAT.step} cap={BEAT.cap} className="border-b border-rule">
      <Link href={path(service)} className="row-item group">
        <IconPlate icon={Icon} presentation="bare" size="sm" className="text-ember-ink" />
        {/* one child, so `.row-item`'s hover travel moves the whole line as a
            unit; inside it the facts stack at 390px and sit on one line above */}
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-6">
          <div className="min-w-0 sm:flex-1">
            <div className="font-display font-semibold tracking-tight transition-colors duration-[var(--dur-1)] group-hover:text-ember-ink">
              {service.name}
            </div>
            <p className="truncate text-[0.84rem] text-muted">{service.tagline}</p>
          </div>
          <div className="mt-1.5 flex items-baseline gap-5 sm:mt-0 sm:shrink-0">
            <span className="hidden font-mono text-micro text-dim lg:inline">{service.timeline}</span>
            <span className="tnum font-display text-[0.9rem] font-semibold tracking-tight">
              <Copy text={service.pricing} />
            </span>
          </div>
        </div>
        <ArrowRight className="size-4 shrink-0 text-dim" aria-hidden />
      </Link>
    </StaggerItem>
  );
}

/**
 * Feature plus compacts, one group of services.
 *
 * Below 768px the compacts become a horizontal snap rail rather than "row"
 * variants, and the feature keeps the full width above it. The rail was the
 * choice because it needs one DOM node per service: rendering rows for mobile
 * and cards for desktop would put all twenty-four links in the document twice,
 * and a phone would trade the mark, the scope meter and the price for a single
 * truncated line. A rail keeps every card whole, keeps each practice group to
 * roughly one screen, and the 82% column leaves the next card visibly peeking.
 *
 * `md:contents` is what lets one wrapper do both: below 768px it is the scroll
 * container, above it dissolves so the compacts become items of the outer grid
 * and can sit beside the feature. It deliberately does NOT carry `.rail` —
 * `.rail`'s unlayered `display: grid` would beat the layered `md:contents` and
 * strand the compacts in a nested grid — so the two utilities below stand in
 * for what `.rail` would have set.
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
