import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Book a strategy call";

export default function Image() {
  return ogImage({ kicker: "Strategy call", title: "Book a strategy call", sub: "Thirty minutes with a founder on your pipeline and what would move it." });
}
