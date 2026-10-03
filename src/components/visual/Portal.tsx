"use client";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Bloom, FieldPlate } from "@/components/ui/Atmos";

/**
 * The firm has two addresses. Drag the seam: paper on the left is the people,
 * ink on the right is the agents. The one place ink is allowed to take over.
 */
export function Portal() {
  const [x, setX] = useState(54);
  const ref = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    setX(Math.max(14, Math.min(86, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <>
      {/* phones: the two sides stacked, since a seam on a 390px card leaves
          neither side room for its sentence */}
      <div className="grid gap-3 md:hidden">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-rule bg-sand p-6">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">leadstrategus<span className="text-ember-ink">.com</span> · you are here</div>
          <div className="display mt-6 text-[2rem]">The <em>people.</em></div>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">Strategy, demand generation, intelligence and enablement, run by operators who have carried the number.</p>
        </div>
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-ink p-6 text-[#f6f2ec]">
          <div className="relative">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#b3a89a]">leadstrategus<span className="text-ember-2">.ai</span> · the other side</div>
            <div className="display mt-6 text-[2rem]">The <em className="text-ember-2">agents.</em></div>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-[#c3b9ac]">AI revenue agents that find, qualify and convert your next customers. The same judgement, written into software.</p>
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-white">
              Cross over <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>

    <div
      ref={ref}
      data-portal
      onMouseMove={(e) => move(e.clientX)}
      onMouseLeave={() => setX(54)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      className="relative hidden h-[500px] w-full touch-pan-y overflow-hidden rounded-[var(--radius-xl)] border border-rule md:block"
    >
      <div className="absolute inset-0 bg-sand text-ink">
        <FieldPlate />
        <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.15em] text-muted">leadstrategus<span className="text-ember-ink">.com</span> · you are here</div>
          <div>
            <div className="display text-[2.1rem] md:text-[3.6rem]">The <em>people.</em></div>
            <p className="mt-3 max-w-xs text-[0.95rem] text-muted md:max-w-sm">Strategy, demand generation, intelligence and enablement, run by operators who have carried the number.</p>
          </div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.15em] text-dim">est. 2018 · Bengaluru</div>
        </div>
      </div>
      <div data-portal-agents className="absolute inset-0 bg-ink text-[#f6f2ec] transition-[clip-path] duration-200 ease-out" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
        <Bloom hue="ember" at="center" size={80} />
        <FieldPlate />
        <div className="relative flex h-full flex-col justify-between p-6 text-right md:p-10">
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.15em] text-[#b3a89a]">leadstrategus<span className="text-ember-2">.ai</span> · the other side</div>
          <div>
            <div className="display text-[2.1rem] md:text-[3.6rem]">The <em className="text-ember-2">agents.</em></div>
            <p className="ml-auto mt-3 max-w-xs text-[0.95rem] text-[#c3b9ac] md:max-w-sm">AI revenue agents that find, qualify and convert your next customers. The same judgement, written into software.</p>
          </div>
          <div className="flex justify-end">
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-ember-2">
              Cross over <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
      <div data-portal-divider className="pointer-events-none absolute inset-y-0 w-px bg-ember shadow-[0_0_18px_rgba(228,18,31,.7)] transition-[left] duration-200 ease-out" style={{ left: `${x}%` }}>
        <div className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ember/50 bg-paper font-mono text-[0.6rem] text-ember-ink shadow-lg">⇆</div>
      </div>
    </div>
    </>
  );
}