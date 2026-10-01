import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { site } from "@/content/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, pageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Careers in B2B go-to-market", description: "Work at LeadStrategus in Bengaluru: GTM strategists, demand generation leads, research analysts and AI agent engineers who own a number and run real programmes.", path: "/careers", keywords: ["LeadStrategus careers", "B2B marketing jobs Bengaluru", "GTM strategist jobs", "demand generation jobs India", "AI agent engineer jobs"] });

const roles = [
  { t: "[[GTM Strategist]]", b: "Run diagnostics and strategy sprints with the founders. Five-plus years in B2B marketing or sales with at least one pipeline target owned." },
  { t: "[[Demand Generation Lead]]", b: "Own a client pod and its meetings target. Outbound, social selling, ABM, weekly reporting." },
  { t: "[[Revenue Intelligence Analyst]]", b: "Build account universes, run OSINT briefs, tune intent models against closed-won data." },
  { t: "[[Agent Engineer]]", b: "Design, train and supervise GTM AI Twins on the leadstrategus.ai platform. TypeScript or Python, LLM tooling, and enough curiosity about sales to sit in on calls." },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ type: "WebPage", name: "Careers", description: metadata.description as string, path: "/careers" })} />
      <PageHero art="contact" title={<>Learn GTM by <em>running it.</em></>} lede="A small firm where every person owns a number, works directly with founders who have led marketing at AWS and Gartner, and now builds agents alongside the programmes they run." />
      <Section className="hero-next">
        <div className="eyebrow mb-6">Open roles · Bengaluru, hybrid</div>
        <div className="divide-y divide-rule border-y border-rule">
          {roles.map((r, i) => (
            <Reveal key={i} delay={i * 60} className="grid gap-3 py-7 md:grid-cols-12 md:items-baseline">
              <div className="text-xl font-medium tracking-tight md:col-span-4"><Copy text={r.t} /></div>
              <p className="text-muted md:col-span-6">{r.b}</p>
              <div className="md:col-span-2 md:justify-self-end"><Button href={`mailto:${site.contact.email.replace(/\[\[|\]\]/g, "")}?subject=Application`} variant="outline" size="sm">Apply</Button></div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">No role that fits? Send a note anyway. We hire for judgement first.</p>
      </Section>
    </>
  );
}
