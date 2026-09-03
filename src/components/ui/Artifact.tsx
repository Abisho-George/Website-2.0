import { Copy } from "./Copy";

/** A mono "sample output" card: looks like a real deliverable excerpt. */
export function Artifact({ kind, title, lines, tone = "ember" }: { kind: string; title: string; lines: string[]; tone?: "ember" | "ion" }) {
  const dot = tone === "ion" ? "bg-ion" : "bg-ember";
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <div className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${dot}`} />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">{kind}</span>
        </div>
        <span className="font-mono text-[0.7rem] text-dim">sample · redacted</span>
      </div>
      <div className="px-5 py-5">
        <p className="mb-4 text-sm font-medium"><Copy text={title} /></p>
        <pre className="scrollbar-none overflow-x-auto whitespace-pre font-mono text-[0.8rem] leading-[1.7] text-muted">
          {lines.map((l, i) => (
            <span key={i} className="block"><Copy text={l || " "} /></span>
          ))}
        </pre>
      </div>
    </div>
  );
}
