import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Terms of use";

export default function Image() {
  return ogImage({ title: "Terms of use" });
}
