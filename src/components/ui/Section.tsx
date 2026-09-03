import { cn } from "@/lib/utils";

export function Section({ children, className, paper, id, tight }: { children: React.ReactNode; className?: string; paper?: boolean; id?: string; tight?: boolean }) {
  return (
    <section id={id} className={cn("relative", tight ? "section-y-sm" : "section-y", paper && "paper", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className, tone }: { children: React.ReactNode; className?: string; tone?: "ember" | "ion" }) {
  return <p className={cn("eyebrow", tone === "ember" && "text-ember", tone === "ion" && "text-ion", className)}>{children}</p>;
}

export function SectionHead({ eyebrow, title, lede, tone, align = "left", className }: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; tone?: "ember" | "ion"; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone} className="mb-5">{eyebrow}</Eyebrow>}
      <h2 className="h2 balance">{title}</h2>
      {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
    </div>
  );
}
