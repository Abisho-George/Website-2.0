import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "LeadStrategus case studies: programmes in action";

export default function Image() {
  return ogImage({ kicker: "Case studies", title: "Programmes in action", sub: "How our service lines work in practice, by industry." });
}
