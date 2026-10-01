import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Guides and templates";

export default function Image() {
  return ogImage({ kicker: "Resources", title: "Guides and templates", sub: "The worksheets, checklists and benchmarks we use inside client engagements." });
}
