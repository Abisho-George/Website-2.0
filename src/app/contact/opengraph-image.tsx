import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Talk to LeadStrategus";

export default function Image() {
  return ogImage({ kicker: "Contact", title: "Talk to LeadStrategus", sub: "Enquiries routed by service and answered within one working day." });
}
