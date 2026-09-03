import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LeadStrategus — Go-to-market, engineered";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#070a0f", color: "#edebe6", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, border: "2px solid #edebe6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#ff6b3d" }} />
          </div>
          LeadStrategus
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, letterSpacing: -4, lineHeight: 1 }}>Go-to-market,</div>
          <div style={{ fontSize: 96, letterSpacing: -4, lineHeight: 1, color: "#ff6b3d" }}>engineered.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#98a1b0" }}>
          <div>Strategy · Demand Generation · Intelligence · Enablement · GTM AI Twin</div>
          <div>Bengaluru → Global</div>
        </div>
      </div>
    ),
    size,
  );
}
