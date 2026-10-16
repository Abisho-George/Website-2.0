import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "LeadStrategus use cases";

export default function Image() {
  return ogImage({ kicker: "Use cases", title: "Use cases", sub: "The go-to-market problems B2B technology companies bring to us, and how we solve them." });
}
