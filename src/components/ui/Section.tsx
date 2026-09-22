import { cn } from "@/lib/utils";

type Band = "paper" | "sand" | "kraft" | "ink";
type Width = "text" | "mid" | "wide" | "full";
type Pad = "tight" | "base" | "loose";

/**
 * A band of the page. Bands change ground colour but share one gutter and one
 * spine, and their edges dissolve rather than cut, so the page stays continuous.
 *
 * `width` and `pad` are the rhythm controls. Every band on this site used to
 * be 1400px wide with the same vertical air, which is why alternating ground
 * colour read as stripes rather than as pace: a dense grid wants a wide
 * measure and less air, an argument wants a narrow one and more.
 *
 * `n`/`label` register the band with the spine, which draws the page's section
 * numbers down the left margin. The numbers existed for months as code
 * comments; this is them made visible.
 */
export function Section({
  children, className, band = "paper", id, tight, flush, width = "wide", pad, n, label,
}: {
  children: React.ReactNode; className?: string; band?: Band; id?: string;
  tight?: boolean; flush?: boolean;
  width?: Width;
  pad?: Pad;
  /** Section number shown on the spine, e.g. "03". */
  n?: string;
  /** Short name shown beside the number when the section is in view. */
  label?: string;
}) {
  // `tight` predates `pad` and means the same as pad="tight"
  const resolvedPad = pad ?? (tight ? "tight" : undefined);
  return (
    <section
      id={id}
      data-section-n={n}
      data-section-label={label}
      data-pad={resolvedPad}
      className={cn("band", band !== "paper" && `band--${band}`, !flush && "section-y", className)}
    >
      <div className="container-x" data-width={width === "wide" ? undefined : width}>{children}</div>
    </section>
  );
}

/**
 * The head of a band. `split` puts the title and the lede in separate columns,
 * which is the difference between four sections that look identical and four
 * that look composed — all twenty-four uses of this used to be the same
 * left-aligned max-w-3xl block.
 */
export function SectionHead({
  title, lede, align = "left", className, eyebrow, layout = "stack", rule = false,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  eyebrow?: { n?: string; label: string };
  layout?: "stack" | "split";
  /** A hairline under the head that draws itself as the head arrives. */
  rule?: boolean;
}) {
  const head = (
    <>
      {eyebrow && (
        <p className="eyebrow mb-4">
          {eyebrow.n && <span className="eyebrow__n">{eyebrow.n}</span>}
          {eyebrow.label}
        </p>
      )}
      <h2 className="h2 balance">{title}</h2>
    </>
  );

  if (layout === "split") {
    return (
      <div className={cn("grid gap-6 md:grid-cols-12 md:gap-10", className)}>
        <div className="md:col-span-6">{head}</div>
        {lede && <p className="lede md:col-span-5 md:col-start-8 md:self-end">{lede}</p>}
        {rule && <div className="md:col-span-12"><span className="hairline rule-draw block" /></div>}
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {head}
      {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
      {rule && <span className="hairline rule-draw mt-7 block" />}
    </div>
  );
}
