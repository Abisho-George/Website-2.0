"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copy } from "./Copy";
import type { FAQ } from "@/content/types";

export function Accordion({ items, tone = "ember" }: { items: FAQ[]; tone?: "ember" | "ion" }) {
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
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-ember-ink md:py-6"
            >
              <span className="font-display text-[1.05rem] font-medium tracking-[-0.02em] md:text-[1.2rem]">{it.q}</span>
              <Plus data-accordion-icon className={cn("mt-0.5 size-5 shrink-0 transition-transform duration-300", isOpen && "rotate-45", tone === "ion" ? "text-ion" : "text-ember")} />
            </button>
            <div data-accordion-body className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 leading-relaxed text-muted"><Copy text={it.a} /></p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
