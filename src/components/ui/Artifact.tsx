import { Copy } from "./Copy";

/** A "sample output" card — an excerpt of a real deliverable, set like a terminal. */
export function Artifact({ kind, title, lines }: { kind: string; title: string; lines: string[]; tone?: "ember" | "twin" }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-ink-2/20 bg-ink text-[#f6f2ec] shadow-[0_28px_60px_-40px_rgba(23,18,13,.75)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-ember" />
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[#b3a89a]">{kind}</span>
        </div>
        <span className="hidden font-mono text-[0.64rem] text-[#7d7264] sm:block">sample · redacted</span>
      </div>
      <div className="px-4 py-5 sm:px-5">
        <p className="mb-4 text-sm font-medium"><Copy text={title} /></p>
        <pre className="scrollbar-none overflow-x-auto whitespace-pre font-mono text-[0.74rem] leading-[1.75] text-[#c3b9ac] sm:text-[0.79rem]">
          {lines.map((l, i) => (
            <span key={i} className="block"><Copy text={l || " "} /></span>
          ))}
        </pre>
      </div>
    </div>
  );
}
