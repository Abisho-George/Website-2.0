import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LeadStrategus — Go-to-market, engineered";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#ffffff", color: "#17120d", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
          <div style={{ display: "flex", width: 44, height: 44, borderRadius: 10, background: "#2438c8", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 6, height: 26, background: "#ffffff" }} />
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#e4121f" }}>Lead</span>
            <span style={{ color: "#2438c8" }}>Strategus</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, letterSpacing: -4, lineHeight: 1, fontWeight: 700 }}>Go-to-market,</div>
          <div style={{ fontSize: 92, letterSpacing: -4, lineHeight: 1, fontWeight: 700, color: "#ff5a1f" }}>engineered.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 21, color: "#6e645a" }}>
          <div>Strategy · Demand Generation · Intelligence · Enablement · GTM AI Twin</div>
          <div>Bengaluru → Global</div>
        </div>
        <div style={{ display: "flex", position: "absolute", bottom: 0, left: 0, right: 0, height: 8 }}>
          <div style={{ flex: 18, background: "#e4121f" }} />
          <div style={{ flex: 16, background: "#141c7a" }} />
          <div style={{ flex: 24, background: "#2438c8" }} />
          <div style={{ flex: 42, background: "#1667f0" }} />
        </div>
      </div>
    ),
    size,
  );
}
