import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { practices } from "@/content/practices";
import { caseStudies } from "@/content/work";
import { insights } from "@/content/insights";
import { authors } from "@/content/authors";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (p: string, priority = 0.6, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({ url: `${site.url}${p}`, lastModified: now, priority, changeFrequency });
  return [
    u("/", 1, "weekly"), u("/gtm-ai-twin", 0.95, "weekly"), u("/practices", 0.9), u("/work", 0.8, "weekly"), u("/insights", 0.8, "weekly"),
    u("/about", 0.7), u("/contact", 0.7), u("/book", 0.7), u("/careers", 0.4), u("/privacy", 0.2, "yearly"), u("/terms", 0.2, "yearly"),
    ...practices.map((p) => u(`/practices/${p.slug}`, 0.9)),
    ...caseStudies.map((c) => u(`/work/${c.slug}`, 0.7)),
    ...insights.map((i) => ({ ...u(`/insights/${i.slug}`, 0.6), lastModified: new Date(i.date) })),
    ...authors.map((a) => u(`/authors/${a.slug}`, 0.4)),
  ];
}
