import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "What people ask first";

export default function Image() {
  return ogImage({ kicker: "FAQ", title: "What people ask first", sub: "How LeadStrategus engagements work and how the GTM AI Twin differs from an AI SDR." });
}
