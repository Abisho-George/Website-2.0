import { site } from "@/content/site";
import { services, servicesFor, serviceHref } from "@/content/services";
import { groups } from "@/content/practices";
import { homeFaq, twinFaq } from "@/content/faq";
import { authors } from "@/content/authors";
import { insightsByDate } from "@/content/insights";

/**
 * llms.txt (https://llmstxt.org): a plain-text map of the site for language
 * models and answer engines. The short file lists every page with a one-line
 * summary; the full file carries each service's definition, why it matters
 * now and why LeadStrategus, in the portfolio's own words. Both are generated
 * from the same content as the pages, so they cannot drift from them.
 */
const plain = (s: string) => s.replace(/\[\[|\]\]/g, "");
const abs = (path: string) => `${site.url}${path}`;

export function llmsIndex() {
  const out: string[] = [];
  out.push(`# ${site.name}`, "", `> ${plain(site.description)}`, "");
  out.push(
    `${site.name} (${site.legalName}) was founded in ${site.founded} and is headquartered in Bengaluru, India. It works with B2B technology companies in India, the United States, the United Kingdom, Southeast Asia and the Middle East. Its agent platform is at ${site.aiUrl}.`,
    "",
    `Founders: ${authors.map((a) => `${a.name} (${a.role})`).join("; ")}.`,
    "",
  );
  for (const g of groups) {
    const list = servicesFor(g.slug);
    if (!list.length) continue;
    out.push(`## ${g.name}`, "", plain(g.tagline), "");
    if (g.kind !== "capability") out.push(`- [${g.name} overview](${abs(`/practices/${g.slug}`)}): ${plain(g.summary)}`);
    for (const s of list) out.push(`- [${s.name}](${abs(serviceHref(s))}): ${plain(s.tagline)}. ${plain(s.what)}`);
    out.push("");
  }
  out.push("## Company", "");
  out.push(`- [About and founders](${abs("/about")}): who runs LeadStrategus and how the firm works`);
  out.push(`- [Pricing](${abs("/pricing")}): engagement models and starting prices by family`);
  out.push(`- [FAQ](${abs("/faq")}): common questions about engagements, pricing and the GTM AI Twin`);
  out.push(`- [Case studies](${abs("/work")}): case studies by service`);
  out.push(`- [Contact](${abs("/contact")}): enquiries, answered within one working day`);
  out.push(`- [Book a strategy call](${abs("/book")})`, "");
  out.push("## Insights", "");
  for (const i of insightsByDate) out.push(`- [${plain(i.title)}](${abs(`/insights/${i.slug}`)}): ${plain(i.dek)}`);
  out.push("", "## Optional", "", `- [Full text for language models](${abs("/llms-full.txt")}): every service in full, plus FAQs`, "");
  return out.join("\n");
}

export function llmsFull() {
  const out: string[] = [llmsIndex(), "", "---", "", "# Services in full", ""];
  for (const s of services) {
    const g = groups.find((x) => x.slug === s.group);
    out.push(`## ${s.name}`, "");
    out.push(`URL: ${abs(serviceHref(s))}`);
    if (g) out.push(`Family: ${g.name}`);
    out.push(`Value-chain stage: ${s.stages.join(", ")}`);
    if (s.seoTerms.length) out.push(`Also known as: ${s.seoTerms.map(plain).join(", ")}`);
    out.push("", `### What is ${s.name}?`, "", plain(s.what), "");
    out.push(`### Why is ${s.name} important now?`, "", plain(s.whyNow), "");
    out.push(`### Why LeadStrategus for ${s.name}?`, "", ...s.whyUs.map((w) => `- ${plain(w)}`), "");
    out.push(plain(s.close), "");
  }
  out.push("# Frequently asked questions", "");
  for (const f of [...homeFaq, ...twinFaq, ...groups.flatMap((g) => g.faq)]) out.push(`## ${plain(f.q)}`, "", plain(f.a), "");
  return out.join("\n");
}
