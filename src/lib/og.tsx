import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * One social card design for every route, so a shared link always shows
 * what the page is: a kicker (the family, or the kind of page), the title,
 * and a line of context, on white with the brand rule along the foot.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/*
 * The real shield and the brand fonts are read from disk when an image is
 * drawn, never when this module loads. Pages import their opengraph-image
 * module just to read `size` and `contentType` for their metadata, and on
 * Vercel a page rendered on request (/contact) runs in a function that does
 * not contain public/ or these font files: a read at load time threw ENOENT
 * and broke the page's server render. A missing file now degrades the image
 * (no shield, default font) instead of throwing.
 */
const readOr = (path: string) => {
  try {
    return readFileSync(join(process.cwd(), path));
  } catch {
    return null;
  }
};
let assets: { markSrc: string | null; fonts: { name: string; data: Buffer; weight: 500 | 700; style: "normal" }[] } | null = null;
function loadAssets() {
  if (assets) return assets;
  const mark = readOr("public/brand/mark.png");
  const font = (name: string, file: string, weight: 500 | 700) => {
    const data = readOr(`node_modules/@fontsource/${file}`);
    return data ? [{ name, data, weight, style: "normal" as const }] : [];
  };
  assets = {
    markSrc: mark ? `data:image/png;base64,${mark.toString("base64")}` : null,
    fonts: [
      ...font("Cinzel", "cinzel/files/cinzel-latin-700-normal.woff", 700),
      ...font("Montserrat", "montserrat/files/montserrat-latin-500-normal.woff", 500),
      ...font("Montserrat", "montserrat/files/montserrat-latin-700-normal.woff", 700),
    ],
  };
  return assets;
}

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
const unflag = (s: string) => s.replace(/\[\[|\]\]/g, "");

export function ogImage({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  const { markSrc, fonts } = loadAssets();
  const t = clip(unflag(title), 90);
  const big = t.length <= 34;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#ffffff", color: "#17120d", fontFamily: "Montserrat" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {markSrc ? <img src={markSrc} width={58} height={70} alt="" /> : null}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", fontFamily: "Cinzel", fontSize: 34, fontWeight: 700, letterSpacing: 0.5, color: "#0b1226" }}>LEADSTRATEGUS</div>
              <div style={{ display: "flex", fontFamily: "Montserrat", fontSize: 15, color: "#2a2f3d", letterSpacing: 0.6 }}>Superpower your sales!</div>
            </div>
          </div>
          {kicker ? (
            <div style={{ display: "flex", padding: "10px 20px", borderRadius: 999, background: "#fff0f1", color: "#b10000", fontSize: 22, fontWeight: 700 }}>{clip(unflag(kicker), 40)}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: big ? 84 : 60, letterSpacing: big ? -3 : -1.5, lineHeight: 1.04, fontWeight: 700, maxWidth: 1040 }}>{t}</div>
          {sub ? <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#5b5248", maxWidth: 1000 }}>{clip(unflag(sub), 150)}</div> : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 21, color: "#6e645a" }}>
          <div>leadstrategus.com</div>
          <div>B2B go-to-market, engineered</div>
        </div>
        <div style={{ display: "flex", position: "absolute", bottom: 0, left: 0, right: 0, height: 8 }}>
          <div style={{ flex: 18, background: "#e10600" }} />
          <div style={{ flex: 16, background: "#0b2a6b" }} />
          <div style={{ flex: 24, background: "#0066ff" }} />
          <div style={{ flex: 42, background: "#1667f0" }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      ...(fonts.length ? { fonts } : {}),
    },
  );
}
