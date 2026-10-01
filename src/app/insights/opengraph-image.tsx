import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Writing from the pipeline";

export default function Image() {
  return ogImage({ kicker: "Insights", title: "Writing from the pipeline", sub: "B2B go-to-market strategy, demand generation, account intelligence and AI agents in GTM." });
}
