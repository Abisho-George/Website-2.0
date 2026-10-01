"use client";
import { useEffect } from "react";

/**
 * Opens the <details> inside the element named by the URL hash, so a link to
 * /about#kingshuk-hazra lands with that founder's details already open. Old
 * profile URLs redirect here, so this is what keeps them meaningful.
 */
export function OpenOnHash({ selector }: { selector: string }) {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const host = document.getElementById(id);
      const d = host?.querySelector<HTMLDetailsElement>(selector);
      if (d) d.open = true;
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [selector]);
  return null;
}
