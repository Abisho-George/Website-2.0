import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Operators, not an agency.";

export default function Image() {
  return ogImage({ kicker: "About", title: "Operators, not an agency.", sub: "Founded in 2018 by people who ran marketing for AWS, Gartner, SAP and Pluralsight." });
}
