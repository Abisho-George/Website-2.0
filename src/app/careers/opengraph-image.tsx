import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Learn GTM by running it.";

export default function Image() {
  return ogImage({ kicker: "Careers", title: "Learn GTM by running it.", sub: "GTM strategists, demand generation leads, research analysts and agent engineers in Bengaluru." });
}
