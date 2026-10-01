import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Privacy policy";

export default function Image() {
  return ogImage({ title: "Privacy policy" });
}
