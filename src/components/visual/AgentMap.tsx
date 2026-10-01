"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { agentPhases, liveCount, buildingCount, type Agent } from "@/content/agents";

/**
 * The agent catalogue as a map: four phases across, the agents that do the
 * manual work stacked under each. Hover on a pointer device, tap on touch, * either way the card opens to show what the agent does, the painful manual
 * process it removes, and the contextual decision it leaves to you.
 */
export function AgentMap() {
  const [open, setOpen] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return (
    <div>
      {/* phase rail, the flow, before the detail */}
      <ol className="mb-10 hidden items-center gap-3 md:flex">
        {agentPhases.map((p, i) => (
          <li key={p.key} className="flex flex-1 items-center gap-3">
            <div className="flex-1">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-[1.05rem] font-semibold tracking-tight">{p.name}</span>
                <span className="font-mono text-[0.64rem] text-dim">{p.agents.length}</span>
              </div>
              <div className="mt-2 h-px w-full bg-rule">
                <div className="h-full bg-ember" style={{ width: `${100 / agentPhases.length}%` }} />
              </div>
              <p className="mt-2 text-[0.8rem] leading-snug text-muted">{p.claim}</p>
            </div>
            {i < agentPhases.length - 1 && <span className="mt-[-28px] text-dim">→</span>}
          </li>
        ))}
      </ol>

      {/* the map */}
      <div className="grid gap-x-4 gap-y-9 md:grid-cols-2 xl:grid-cols-4">
        {agentPhases.map((phase) => (
          <div key={phase.key}>
            <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-rule pb-2.5 md:hidden">
              <span className="font-display text-[1.05rem] font-semibold tracking-tight">{phase.name}</span>
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-dim">{phase.agents.length} agents</span>
            </div>
            <p className="mb-4 text-[0.82rem] leading-snug text-muted md:hidden">{phase.claim}</p>

            <ul className="flex flex-col gap-2.5">
              {phase.agents.map((a) => (
                <AgentCard
                  key={a.slug}
                  agent={a}
                  isOpen={open === a.slug}
                  onEnter={() => canHover && setOpen(a.slug)}
                  onLeave={() => canHover && setOpen((c) => (c === a.slug ? null : c))}
                  onToggle={() => setOpen((c) => (c === a.slug ? null : a.slug))}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-col gap-3 border-t border-rule pt-5 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-ember" /> {liveCount} live
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full border border-rule-strong" /> {buildingCount} in build
          </span>
        </div>
        <span className="text-dim">{canHover ? "Hover an agent for detail" : "Tap an agent for detail"}</span>
      </div>
    </div>
  );
}

function AgentCard({ agent, isOpen, onEnter, onLeave, onToggle }: {
  agent: Agent; isOpen: boolean; onEnter: () => void; onLeave: () => void; onToggle: () => void;
}) {
  const live = agent.status === "live";
  return (
    <li onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        onClick={onToggle}
        onFocus={onEnter}
        aria-expanded={isOpen}
        className={cn(
          "w-full rounded-[var(--radius-md)] border p-3.5 text-left transition-all duration-300",
          isOpen ? "border-ember bg-ember-wash shadow-[0_12px_30px_-20px_rgba(228,18,31,.5)]" : "border-rule bg-paper hover:border-rule-strong",
        )}
      >
        <div className="flex items-start justify-between gap-2.5">
          <span className="font-display text-[0.96rem] font-semibold leading-snug tracking-tight">{agent.name}</span>
          <span
            className={cn("mt-[5px] size-2 shrink-0 rounded-full", live ? "bg-ember" : "border border-rule-strong")}
            title={live ? "Live" : "In build"}
          />
        </div>

        <p className={cn("mt-1.5 text-[0.82rem] leading-snug text-muted transition-all", !isOpen && "line-clamp-2")}>
          {agent.does}
        </p>

        <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div className="overflow-hidden">
            <dl className="mt-3 space-y-2.5 border-t border-ember/25 pt-3 text-[0.78rem] leading-snug">
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.13em] text-ember-ink">Replaces</dt>
                <dd className="mt-1 text-muted">{agent.replaces}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.13em] text-ember-ink">You decide</dt>
                <dd className="mt-1 text-muted">{agent.youDecide}</dd>
              </div>
              <div className="pt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-dim">
                {live ? "Live today" : "In build"}
              </div>
            </dl>
          </div>
        </div>
      </button>
    </li>
  );
}
