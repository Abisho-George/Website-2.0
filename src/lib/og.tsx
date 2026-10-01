import { ImageResponse } from "next/og";

/**
 * One social card design for every route, so a shared link always shows
 * what the page is: a kicker (the family, or the kind of page), the title,
 * and a line of context, on white with the brand rule along the foot.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
const unflag = (s: string) => s.replace(/\[\[|\]\]/g, "");

export function ogImage({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  const t = clip(unflag(title), 90);
  const big = t.length <= 34;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#ffffff", color: "#17120d", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            <div style={{ display: "flex", width: 44, height: 44, borderRadius: 10, background: "#2438c8", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 6, height: 26, background: "#ffffff" }} />
            </div>
            <div style={{ display: "flex" }}>
              <span style={{ color: "#e4121f" }}>Lead</span>
              <span style={{ color: "#2438c8" }}>Strategus</span>
            </div>
          </div>
          {kicker ? (
            <div style={{ display: "flex", padding: "10px 20px", borderRadius: 999, background: "#fff0f1", color: "#c10d18", fontSize: 22, fontWeight: 600 }}>{clip(unflag(kicker), 40)}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: big ? 88 : 64, letterSpacing: big ? -4 : -2.5, lineHeight: 1.04, fontWeight: 700, maxWidth: 1040 }}>{t}</div>
          {sub ? <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#5b5248", maxWidth: 1000 }}>{clip(unflag(sub), 150)}</div> : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 21, color: "#6e645a" }}>
          <div>leadstrategus.com</div>
          <div>B2B go-to-market, engineered</div>
        </div>
        <div style={{ display: "flex", position: "absolute", bottom: 0, left: 0, right: 0, height: 8 }}>
          <div style={{ flex: 18, background: "#e4121f" }} />
          <div style={{ flex: 16, background: "#141c7a" }} />
          <div style={{ flex: 24, background: "#2438c8" }} />
          <div style={{ flex: 42, background: "#1667f0" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
