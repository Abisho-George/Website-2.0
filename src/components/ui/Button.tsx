import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ion" | "ghost" | "paper" | "outline";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/70 disabled:opacity-50";
const sizes = { sm: "h-9 px-4 text-[0.85rem]", md: "h-11 px-5 text-[0.95rem]", lg: "h-13 px-7 text-base" };
const variants = {
  primary: "bg-ember text-ink hover:bg-ember-2 hover:shadow-[0_0_40px_-8px_rgba(255,107,61,.7)]",
  ion: "bg-ion text-ink hover:bg-ion-2 hover:shadow-[0_0_40px_-8px_rgba(124,243,214,.7)]",
  ghost: "text-fg hover:bg-white/6",
  outline: "border border-line-strong text-fg hover:border-fg/60 hover:bg-white/4",
  paper: "bg-ink text-paper hover:bg-ink-3",
};

export function Button({ href, children, variant = "primary", size = "md", external, arrow = true, className, type, disabled }: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Icon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />}
    </>
  );
  const cls = cn(base, sizes[size], variants[variant], className);
  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    ) : (
      <Link href={href} className={cls}>{inner}</Link>
    );
  }
  return <button type={type ?? "button"} disabled={disabled} className={cls}>{inner}</button>;
}
