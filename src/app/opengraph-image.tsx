import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "LeadStrategus: B2B go-to-market, engineered";

export default function Image() {
  return ogImage({ title: "Go-to-market, engineered.", sub: "GTM strategy, account intelligence, demand generation, enablement, events and custom AI agents for B2B technology companies." });
}
