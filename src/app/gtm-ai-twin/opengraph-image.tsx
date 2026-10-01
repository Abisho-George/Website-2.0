import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GTM AI Twin";

export default function Image() {
  return ogImage({ kicker: "Special service", title: "GTM AI Twin", sub: "Encode how your best people think about demand generation, then let agents carry the repeatable load." });
}
