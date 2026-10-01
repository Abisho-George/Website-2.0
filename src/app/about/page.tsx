import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { Copy } from "@/components/ui/Copy";
import { Marquee } from "@/components/ui/Marquee";
import { CTABand, StatRow } from "@/components/site/Blocks";
import { FounderGrid } from "@/components/site/Founders";
import { authors } from "@/content/authors";
import { proof, site } from "@/content/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, pageJsonLd, ids } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About us: operators, not an agency", description: "LeadStrategus is a Bengaluru-headquartered B2B go-to-market firm founded in 2018 by operators who led marketing for AWS, Gartner, SAP and Pluralsight. Meet the founders and see how we work.", path: "/about", keywords: ["LeadStrategus", "about LeadStrategus", "B2B go-to-market firm", "GTM consulting Bengaluru", "Kingshuk Hazra", "Anindita Hazra", "B2B marketing agency India"] });

const principles = [
  { t: "Meetings, not activity", b: "Every report we send has the word 'meeting' in it. Opens and clicks are diagnostics. Pipeline is the outcome." },
  { t: "Diagnose before you prescribe", b: "We read the closed-lost deals before we write a single message. Most GTM problems are upstream of the channel that gets blamed." },
  { t: "Judgement is the product", b: "Software runs the repetition. Humans decide which accounts deserve effort, and that judgement is what we sell, in people and now in agents." },
  { t: "Say the number", b: "Pricing signals on every page, forecasts we will defend, and 'no' on the first call if we are not the right fit." },
];
const timeline = [
  { y: "2018", t: "Founded in Bengaluru", b: "After leading marketing for AWS India, Kingshuk and Anindita Hazra start LeadStrategus to run pipeline for B2B technology companies." },
  { y: "[[2019]]", t: "Productised formats", b: "Webinar-as-a-Service, Quiz-as-a-Service and Lead Generation in a Box launch as fixed-scope programmes." },
  { y: "[[2021]]", t: "Account intelligence", b: "Database-as-a-Service and OSINT briefs become a standalone service line feeding every programme." },
  { y: "[[2024]]", t: "leadstrategus.ai", b: "The agent platform ships: AI revenue agents that find, qualify and convert, built on eight years of programme data." },
  { y: "2026", t: "GTM AI Twin", b: "Custom agents that take over go-to-market end to end, built and run for clients on our own platform." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ type: "AboutPage", name: "About", description: metadata.description as string, path: "/about", about: [ids.org, ...authors.map((a) => ids.person(a.slug))] })} />
      <PageHero art="about" title={<>Operators, <em>not an agency.</em></>} lede="LeadStrategus was started in 2018 by people who had run marketing and business development for global technology vendors in India, and were tired of watching agencies report activity while pipeline stayed flat. We built the firm we wished we could have hired." />

      <Section className="hero-next">
        <StatRow stats={proof.stats} />
        <div className="mt-16"><Marquee speed="50s" items={proof.pedigree.map((p) => <span key={p} className="text-2xl font-medium tracking-tight text-fg/60">{p}</span>)} /></div>
      </Section>

      <Section band="sand">
        <SectionHead title={<>Led by people who have <em className="serif-em">carried the number.</em></>} />
        <FounderGrid authors={authors} className="mt-12" />
      </Section>

      <Section>
        <SectionHead title={<>Four rules we do not <em className="serif-em">bend.</em></>} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-rule md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.t} delay={i * 70} className="bg-paper p-8">
              <h3 className="mt-6 text-xl font-medium tracking-tight">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHead title={<>From programmes to <em className="serif-em">platform.</em></>} />
        <ol className="mt-12 border-l border-rule">
          {timeline.map((t, i) => (
            <Reveal key={t.t} as="li" delay={i * 60} className="relative grid gap-2 py-6 pl-8 md:grid-cols-12">
              <span className="absolute -left-[5px] top-8 size-[9px] rounded-full bg-ember" />
              <div className="font-mono text-sm text-muted md:col-span-2"><Copy text={t.y} /></div>
              <div className="md:col-span-10"><div className="text-xl font-medium tracking-tight">{t.t}</div><p className="mt-1 max-w-2xl text-muted">{t.b}</p></div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section band="sand" tight>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5"><h2 className="h2 balance">Bengaluru, working in your time zone.</h2></div>
          <div className="grid gap-6 text-sm md:col-span-7 md:grid-cols-2">
            <div><div className="eyebrow mb-2">Office</div><p>{site.contact.hq}</p></div>
            <div><div className="eyebrow mb-2">Email</div><p><a className="link-u" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p></div>
          </div>
        </div>
      </Section>

      <CTABand title={<>Work with <em className="serif-em text-ember">operators.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Careers", href: "/careers" }} />
    </>
  );
}
