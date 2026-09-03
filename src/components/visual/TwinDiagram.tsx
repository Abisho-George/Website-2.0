import { twin } from "@/content/twin";
import { cn } from "@/lib/utils";

/** Six-agent pipeline, with an animated signal travelling along the rail. */
export function TwinDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-line md:block" />
      <div className="absolute left-0 top-[22px] hidden h-px w-full overflow-hidden md:block">
        <div className="h-full w-1/4 bg-[linear-gradient(90deg,transparent,rgba(124,243,214,.9),transparent)] [animation:rail_4s_linear_infinite]" />
      </div>
      <style>{`@keyframes rail { from { transform: translateX(-100%);} to { transform: translateX(400%);} }`}</style>
      <ol className="grid gap-4 md:grid-cols-6 md:gap-3">
        {twin.stages.map((s, i) => (
          <li key={s.key} className="relative">
            <div className="relative z-10 mb-4 flex size-11 items-center justify-center rounded-full border border-ion/50 bg-ink font-mono text-[0.72rem] text-ion">0{i + 1}</div>
            <div className="text-[0.7rem] font-mono uppercase tracking-[0.14em] text-muted">{s.agent}</div>
            <div className="mt-1 text-lg font-medium tracking-tight">{s.verb}</div>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
