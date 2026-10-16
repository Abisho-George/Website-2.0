import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "LeadStrategus use cases: programmes in action";

export default function Image() {
  return ogImage({ kicker: "Use cases", title: "Programmes in action", sub: "How our service lines work in practice, by industry." });
}
