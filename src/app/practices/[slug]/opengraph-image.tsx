import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { pagedGroups, getGroup } from "@/content/practices";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A LeadStrategus service family";

export function generateStaticParams() {
  return pagedGroups.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGroup((await params).slug);
  if (!g) return ogImage({ title: "Services" });
  return ogImage({ kicker: g.kind === "platform" ? "Platform" : "Service family", title: g.name, sub: g.tagline });
}
