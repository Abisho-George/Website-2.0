import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Everything public is open to search and to answer engines. The AI crawlers
 * are named explicitly rather than left to the wildcard, so the intent is on
 * record: LeadStrategus wants to be quoted when someone asks an assistant
 * who does B2B go-to-market, account intelligence or AI agents for GTM.
 */
const aiCrawlers = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "GoogleOther", "Applebot-Extended",
  "Bingbot", "CCBot", "Meta-ExternalAgent", "Amazonbot", "DuckAssistBot", "cohere-ai", "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/contact/thanks"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
