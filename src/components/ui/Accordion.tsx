"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copy } from "./Copy";
import type { FAQ } from "@/content/types";

export function Accordion({ items, tone = "ember" }: { items: FAQ[]; tone?: "ember" | "twin" }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} data-accordion-item={isOpen ? "open" : "closed"}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-[var(--dur-1)] ease-standard hover:text-ember-ink md:py-6"
            >
              <span className="h4">{it.q}</span>
              <Plus data-accordion-icon // the overshoot curve, so the one thing the reader clicked answers physically
                className={cn("mt-0.5 size-5 shrink-0 transition-transform duration-[var(--dur-1)] ease-overshoot", isOpen && "rotate-45", tone === "twin" ? "text-ember-ink" : "text-ember")} />
            </button>
            <div data-accordion-body // 0fr -> 1fr is the layout-cheap way to animate an unknown height; do not
              // replace it with an explicit height, which measures the child every frame
              className={cn("grid transition-[grid-template-rows] duration-[var(--dur-1)] ease-standard", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 leading-relaxed text-fg-soft"><Copy text={it.a} /></p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
