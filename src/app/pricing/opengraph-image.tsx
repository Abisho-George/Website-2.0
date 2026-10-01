import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "What engagements cost";

export default function Image() {
  return ogImage({ kicker: "Pricing", title: "What engagements cost", sub: "Fixed-price diagnostics, programme retainers and the GTM AI Twin, scoped in thirty minutes." });
}
