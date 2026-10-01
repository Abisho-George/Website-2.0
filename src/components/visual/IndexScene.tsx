import { StaggerItem } from "@/components/motion/Stagger";
import { Copy } from "@/components/ui/Copy";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The layer behind an index page's hero: that page's own content, set at the
 * contrast of a watermark.
 *
 * An index page already knows fourteen service names and their prices. Drawing
 * an abstract diagram behind it throws that away and decorates instead; setting
 * the real list behind the headline makes the hero say what the page holds
 * before the reader has scrolled a pixel.
 *
 * Type, so DOM and CSS, type rasterised into a canvas is blurry on a retina
 * screen, unselectable by the theme, and invisible to a band override. Colours
 * are the scene tokens; nothing here writes a value.
 *
 * It is aria-hidden: every string on it is already in the page below, and a
 * screen reader hearing the service list twice is worse than not hearing it.
 */

type Column = { head: string; items: string[] };
type Row = { label: string; value: string };

/**
 * A background layer only has to READ as the list, the page carries the whole
 * of it. Capping keeps the composition inside the hero at every height instead
 * of trailing off under the mask.
 */
const MAX_ITEMS = 7;
const MAX_ROWS = 8;

/** Before the first line. The scene settles under the headline, not before it. */
const ENTER = 140;

const flagged = (s: string) => s.includes("[[");

export function IndexScene({
  mode,
  columns,
  rows,
  className,
}: {
  mode: "atlas" | "ledger";
  columns?: Column[];
  rows?: Row[];
  className?: string;
}) {
  const body =
    mode === "atlas" ? (columns?.length ? <Atlas columns={columns} /> : null) : rows?.length ? <Ledger rows={rows} /> : null;
  if (!body) return null;

  return (
    <div
      aria-hidden
      // --rise-2 is the reveal's travel distance. Zeroed for this subtree so the
      // shared .reveal contract gives a fade and nothing else: a background
      // layer that slides is a background layer you look at.
      style={{ "--rise-2": "0px" } as React.CSSProperties}
      className={cn(
        "relative flex h-full w-full select-none flex-col justify-center overflow-hidden px-[var(--gutter)] py-10 lg:py-14",
        className,
      )}
    >
      {body}
    </div>
  );
}

/**
 * The columns as a faint indexed map.
 *
 * The track count follows the data rather than being fixed: a second row of
 * columns lands at the height of the hero's lede and reads as clutter behind
 * it, where one row stays above the copy entirely.
 */
const TRACKS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

function Atlas({ columns }: { columns: Column[] }) {
  return (
    <div className={cn("grid w-full grid-cols-2 gap-x-6 gap-y-8 md:gap-x-8", TRACKS[Math.min(columns.length, 4)] ?? "md:grid-cols-4")}>
      {columns.map((col, ci) => (
        <div key={`${ci}-${col.head}`} className="min-w-0">
          <p className="truncate border-t border-scene-line pt-2 font-mono text-micro uppercase tracking-[0.16em] text-scene-line-2">
            <Copy text={col.head} />
          </p>
          <ul className="mt-3 space-y-1.5">
            {col.items.slice(0, MAX_ITEMS).map((it, i) => (
              // ci + i staggers on the diagonal, so the map fills from its
              // top-left corner rather than column by column.
              <SceneLine key={`${i}-${it}`} i={ci + i} still={flagged(it)} className="flex items-baseline gap-2">
                <span className="shrink-0 font-mono text-micro tabular-nums text-scene-line">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 truncate font-display text-sm text-faint"><Copy text={it} /></span>
              </SceneLine>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** The rows as a right-aligned price ladder. */
function Ledger({ rows }: { rows: Row[] }) {
  return (
    <ul className="ml-auto w-full max-w-lg">
      {rows.slice(0, MAX_ROWS).map((r, i) => (
        <SceneLine key={`${i}-${r.label}`} i={i} still={flagged(r.value)} className="flex items-baseline gap-3 border-b border-scene-line py-2">
          <span className="min-w-0 truncate font-display text-sm text-faint"><Copy text={r.label} /></span>
          <span className="min-w-3 flex-1 self-center border-b border-dashed border-scene-line" />
          <span className="datum shrink-0 text-subtitle text-scene-line-2"><Copy text={r.value} /></span>
        </SceneLine>
      ))}
    </ul>
  );
}

/**
 * One line of the scene.
 *
 * Callers pass their content through UNCHANGED, brackets and all, so this layer
 * cannot drift away from the page it is standing behind, and it renders them
 * through <Copy>, so an unverified figure keeps its flag here too. Stripping
 * the brackets would have made this the one place on the site where an
 * invented number is presented as a plain fact; on /work the ledger's first
 * eight rows are all placeholders. The scene is aria-hidden, so the duplicate
 * underline costs a screen reader nothing. A flagged line is also held still
 * rather than staggered in.
 */
function SceneLine({
  i,
  still,
  className,
  children,
}: {
  i: number;
  still: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (still) return <li className={className}>{children}</li>;
  return (
    <StaggerItem as="li" i={i} step={stagger.tight} from={ENTER} className={className}>
      {children}
    </StaggerItem>
  );
}
