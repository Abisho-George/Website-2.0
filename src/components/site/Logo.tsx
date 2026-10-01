import Link from "next/link";
import { cn } from "@/lib/utils";
import { brand } from "@/content/brand";

/**
 * The LeadStrategus logo, from the brand kit.
 *
 *   <Mark />                       the shield alone
 *   <Logo />                       shield + LEADSTRATEGUS (navigation)
 *   <Logo variant="full" />        shield + LEADSTRATEGUS + "Superpower your sales!" (footer)
 *
 * The shield is a plain <img> so the static preview can inline it.
 */
export function Mark({ className, alt = "" }: { className?: string; alt?: string }) {
  const { width, height } = brand.assets.markSize;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={brand.assets.mark} alt={alt} width={width} height={height} decoding="async" className={cn("h-9 w-auto shrink-0", className)} />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("brand-name text-[1.14rem] leading-none", className)}>{brand.name}</span>;
}

export function Tagline({ className, rules = false }: { className?: string; rules?: boolean }) {
  return (
    <span className={cn("brand-tagline flex items-center gap-2 text-[0.72rem] leading-none", className)}>
      {rules && <span aria-hidden className="h-px w-5 bg-current opacity-40" />}
      {brand.tagline}
      {rules && <span aria-hidden className="h-px w-5 bg-current opacity-40" />}
    </span>
  );
}

export function Logo({ variant = "horizontal", className }: { variant?: "horizontal" | "full"; className?: string }) {
  const full = variant === "full";
  return (
    <Link href="/" className={cn("group inline-flex shrink-0 items-center", full ? "gap-3.5" : "gap-2.5", className)} aria-label="LeadStrategus home">
      <Mark className={cn("transition-transform duration-300 group-hover:scale-105", full ? "h-14" : "h-9")} />
      <span className="flex flex-col items-center gap-1.5">
        <Wordmark className={full ? "text-[1.32rem]" : undefined} />
        {full && <Tagline rules />}
      </span>
    </Link>
  );
}
