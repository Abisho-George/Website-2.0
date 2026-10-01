import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { services, getService } from "@/content/services";
import { getGroup } from "@/content/practices";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A LeadStrategus service";

export function generateStaticParams() {
  return services.filter((s) => !s.href).map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) return ogImage({ title: "Services" });
  return ogImage({ kicker: getGroup(s.group)?.short, title: s.name, sub: s.tagline });
}
