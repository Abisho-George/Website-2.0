import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Six families. One revenue engine.";

export default function Image() {
  return ogImage({ kicker: "Service families", title: "Six families. One revenue engine.", sub: "From deciding where to play to converting the meetings that follow." });
}
