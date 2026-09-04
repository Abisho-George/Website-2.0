import { cn } from "@/lib/utils";

type Band = "paper" | "sand" | "kraft" | "ink";

/**
 * A band of the page. Bands change ground colour but share one gutter and one
 * spine, and their edges dissolve rather than cut, so the page stays continuous.
 */
export function Section({
  children, className, band = "paper", id, tight, flush,
}: {
  children: React.ReactNode; className?: string; band?: Band; id?: string;
  tight?: boolean; flush?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("band", band !== "paper" && `band--${band}`, !flush && (tight ? "section-y-sm" : "section-y"), className)}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHead({ title, lede, align = "left", className }: { title: React.ReactNode; lede?: React.ReactNode; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className="h2 balance">{title}</h2>
      {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
    </div>
  );
}
