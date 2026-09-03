import Link from "next/link";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="8" className="fill-none stroke-current" strokeWidth="1.5" opacity=".5" />
      <path d="M8 22 L14 14 L19 18 L25 9" className="fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25" cy="9" r="2.6" className="fill-ember" />
    </svg>
  );
}

export function Logo({ className, onDark = true }: { className?: string; onDark?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="LeadStrategus home">
      <Mark className={onDark ? "text-fg" : "text-ink"} />
      <span className="text-[1.05rem] font-medium tracking-tight">
        Lead<span className="font-display italic text-[1.15rem]">Strategus</span>
      </span>
    </Link>
  );
}
