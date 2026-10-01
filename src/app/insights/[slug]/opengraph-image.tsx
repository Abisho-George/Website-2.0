import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { insights, getInsight, getCluster } from "@/content/insights";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "An article from LeadStrategus Insights";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const i = getInsight((await params).slug);
  if (!i) return ogImage({ title: "Insights" });
  return ogImage({ kicker: getCluster(i.cluster)?.name ?? "Insights", title: i.title, sub: i.dek });
}
