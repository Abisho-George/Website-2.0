import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { useCases, getUseCase } from "@/content/use-cases";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A LeadStrategus use case";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const u = getUseCase((await params).slug);
  if (!u) return ogImage({ title: "Use cases" });
  return ogImage({ kicker: `Use case · ${u.industry}`, title: u.title, sub: u.service });
}
