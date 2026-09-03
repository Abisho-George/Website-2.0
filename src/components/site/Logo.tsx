import Link from "next/link";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="9" className="fill-none stroke-current" strokeWidth="1.4" opacity=".35" />
      <path d="M8 22.5 L14 14.5 L19 18.5 L24.5 9.5" className="fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24.5" cy="9.5" r="2.8" className="fill-ember" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="LeadStrategus home">
      <Mark />
      <span className="font-display text-[1.12rem] font-semibold tracking-[-0.03em]">
        Lead<span className="font-normal">Strategus</span>
      </span>
    </Link>
  );
}
