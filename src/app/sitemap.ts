import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { pagedGroups } from "@/content/practices";
import { caseStudies } from "@/content/work";
import { insights } from "@/content/insights";
import { services } from "@/content/services";

/**
 * Every indexable URL. Sample case studies are left out on purpose: they are
 * noindex placeholders until real, signed-off studies replace them. Founders
 * no longer have pages of their own; they live on /about.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (p: string, priority = 0.6, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${site.url}${p === "/" ? "" : p}` || site.url,
    lastModified: now,
    priority,
    changeFrequency,
  });
  return [
    u("/", 1, "weekly"), u("/services", 0.95, "weekly"), u("/gtm-ai-twin", 0.95, "weekly"), u("/practices", 0.85),
    u("/work", 0.8, "weekly"), u("/insights", 0.8, "weekly"), u("/faq", 0.7), u("/resources", 0.7),
    u("/about", 0.7), u("/contact", 0.7), u("/book", 0.7), u("/careers", 0.4), u("/privacy", 0.2, "yearly"), u("/terms", 0.2, "yearly"),
    ...services.filter((s) => !s.href).map((s) => u(`/services/${s.slug}`, 0.85)),
    ...pagedGroups.map((g) => u(`/practices/${g.slug}`, 0.85)),
    ...caseStudies.filter((c) => !c.sample).map((c) => u(`/work/${c.slug}`, 0.7)),
    ...insights.map((i) => ({ ...u(`/insights/${i.slug}`, 0.6), lastModified: new Date(i.date) })),
  ];
}
