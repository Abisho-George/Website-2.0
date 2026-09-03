import { twin } from "@/content/twin";
import { cn } from "@/lib/utils";

/** Six agents, one hand-off chain. A rail runs through them, carrying a signal. */
export function TwinDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-0 right-0 top-[21px] hidden h-px bg-rule md:block" />
      <div className="absolute left-0 top-[21px] hidden h-px w-full overflow-hidden md:block">
        <div className="h-full w-1/5 bg-[linear-gradient(90deg,transparent,var(--color-ember),transparent)] [animation:rail_4.5s_linear_infinite]" />
      </div>
      <ol className="rail rail--swipe md:grid-cols-6 md:gap-4">
        {twin.stages.map((s, i) => (
          <li key={s.key} className="relative">
            <div className="relative z-10 mb-4 flex size-11 items-center justify-center rounded-full border border-ember/40 bg-paper font-mono text-[0.7rem] text-ember-ink">0{i + 1}</div>
            <div className="font-mono text-[0.66rem] uppercase tracking-[0.15em] text-muted">{s.agent}</div>
            <div className="mt-1 font-display text-lg font-semibold tracking-tight">{s.verb}</div>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
