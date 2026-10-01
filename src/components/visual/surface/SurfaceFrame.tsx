import { SYNTHETIC_NOTE } from "@/content/synthetic";
import { cn } from "@/lib/utils";

/**
 * The frame every ambient product surface sits in: a chrome bar, a body, and
 * an optional reel showing how far through its loop the surface is.
 *
 * The frame, not the caller, prints SYNTHETIC_NOTE, and prints it whether or
 * not a `status` was passed. A surface that renders invented data has to say
 * so on its face, and a label a caller can replace with "live" by supplying a
 * status of its own is not a guarantee, it is a default. This one is the only
 * place on the site where that promise is kept, so it is kept unconditionally.
 *
 * A `figure` rather than a `div`: the chrome is genuinely the caption, and a
 * reader on a screen reader meets "illustrative" before the contents.
 */
export function SurfaceFrame({
  title,
  status,
  tone = "paper",
  reel,
  children,
  className,
}: {
  title: string;
  /** Extra chrome, right, set beside the note, never instead of it. */
  status?: React.ReactNode;
  tone?: "paper" | "ink";
  /** 0..1. Omit it and no reel is drawn. */
  reel?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("surface", tone === "ink" && "surface--ink", className)}>
      <figcaption className="surface__chrome">
        <span className="min-w-0 truncate">{title}</span>
        <span className="flex shrink-0 items-center gap-2">
          {status ? (
            <>
              {status}
              <span aria-hidden>·</span>
            </>
          ) : null}
          <span>{SYNTHETIC_NOTE}</span>
        </span>
      </figcaption>

      {children}

      {reel !== undefined && (
        <div className="surface__reel" aria-hidden>
          <i style={{ "--p": Math.min(1, Math.max(0, reel)) } as React.CSSProperties} />
        </div>
      )}
    </figure>
  );
}
