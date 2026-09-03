import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string; children: React.ReactNode;
  variant?: "primary" | "ion" | "ghost" | "paper" | "outline";
  size?: "sm" | "md" | "lg";
  external?: boolean; arrow?: boolean; className?: string;
  type?: "button" | "submit"; disabled?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 disabled:opacity-50";
const sizes = { sm: "h-9 px-4 text-[0.85rem]", md: "h-11 px-5 text-[0.94rem]", lg: "h-[52px] px-7 text-[1rem]" };
const variants = {
  primary: "bg-ember text-white hover:bg-ember-ink hover:shadow-[0_14px_34px_-16px_rgba(255,90,31,.9)]",
  ion: "bg-ion text-white hover:bg-ion-deep hover:shadow-[0_14px_34px_-16px_rgba(14,110,96,.9)]",
  ghost: "text-fg hover:bg-sand",
  outline: "border border-rule-strong text-fg hover:border-fg hover:bg-sand",
  paper: "bg-ink text-paper hover:bg-ink-3",
};

export function Button({ href, children, variant = "primary", size = "md", external, arrow = true, className, type, disabled }: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Icon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />}
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
