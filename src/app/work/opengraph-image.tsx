import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Case studies by service";

export default function Image() {
  return ogImage({ kicker: "Case studies", title: "Case studies by service", sub: "Situation, question, what we did, evidence, outcome and what changed in the GTM motion." });
}
