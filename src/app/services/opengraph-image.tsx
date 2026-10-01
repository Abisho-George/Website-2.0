import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "One revenue engine. Every part of it.";

export default function Image() {
  return ogImage({ kicker: "Services", title: "One revenue engine. Every part of it.", sub: "36 B2B go-to-market services across strategy, intelligence, positioning, demand generation, enablement, events and AI." });
}
