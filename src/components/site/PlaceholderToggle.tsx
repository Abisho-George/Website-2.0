"use client";
import { useEffect, useState } from "react";

/** Review aid: shows how many flagged placeholders are on the page and lets a reviewer hide the underlines. */
export function PlaceholderToggle() {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const update = () => setCount(document.querySelectorAll("[data-placeholder]").length);
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  useEffect(() => { document.body.classList.toggle("ph-hidden", hidden); }, [hidden]);
  if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "false") return null;
  return (
    <button
      onClick={() => setHidden(!hidden)}
      className="fixed bottom-4 left-4 z-[60] inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/90 px-3 py-1.5 font-mono text-[0.68rem] text-muted backdrop-blur transition-colors hover:text-fg"
      title="Dashed underlines mark invented facts to verify before launch"
    >
      <span className={`size-1.5 rounded-full ${hidden ? "bg-dim" : "bg-ember"}`} />
      {count} placeholder{count === 1 ? "" : "s"} · {hidden ? "show" : "hide"}
    </button>
  );
}
