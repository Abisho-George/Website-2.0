import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { caseStudies, getCase } from "@/content/work";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A LeadStrategus case study";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug);
  if (!c) return ogImage({ title: "Case studies" });
  return ogImage({ kicker: c.sample ? "Sample case study" : "Case study", title: c.title, sub: `${c.vertical}, ${c.region}` });
}
