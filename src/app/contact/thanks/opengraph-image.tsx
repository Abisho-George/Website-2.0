import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Thanks for getting in touch";

export default function Image() {
  return ogImage({ title: "Thanks for getting in touch" });
}
