import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { Copy } from "@/components/ui/Copy";
import { Marquee } from "@/components/ui/Marquee";
import { CTABand, StatRow } from "@/components/site/Blocks";
import { authors } from "@/content/authors";
import { proof, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About", description: "LeadStrategus is a Bengaluru-headquartered B2B go-to-market firm founded in 2018 by operators who led marketing for AWS, Gartner, SAP and Pluralsight.", path: "/about" });

const principles = [
  { t: "Meetings, not activity", b: "Every report we send has the word 'meeting' in it. Opens and clicks are diagnostics. Pipeline is the outcome." },
  { t: "Diagnose before you prescribe", b: "We read the closed-lost deals before we write a single message. Most GTM problems are upstream of the channel that gets blamed." },
  { t: "Judgement is the product", b: "Software runs the repetition. Humans decide which accounts deserve effort, and that judgement is what we sell, in people and now in agents." },
  { t: "Say the number", b: "Pricing signals on every page, forecasts we will defend, and 'no' on the first call if we are not the right fit." },
];
const timeline = [
  { y: "2018", t: "Founded in Bengaluru", b: "After leading marketing for AWS India, Kingshuk and Anindita Hazra start LeadStrategus to run pipeline for B2B technology companies." },
  { y: "[[2019]]", t: "Productised formats", b: "Webinar-as-a-Service, Quiz-as-a-Service and Lead Generation in a Box launch as fixed-scope programmes." },
  { y: "[[2021]]", t: "Revenue Intelligence", b: "Database-as-a-Service and OSINT briefs become a standalone practice feeding every programme." },
  { y: "[[2024]]", t: "leadstrategus.ai", b: "The agent platform ships: AI revenue agents that find, qualify and convert, built on eight years of programme data." },
  { y: "2026", t: "GTM AI Twin", b: "Custom agents that take over go-to-market end to end, built and run for clients on our own platform." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero art="about" title={<>Operators, <em>not an agency.</em></>} lede="LeadStrategus was started in 2018 by people who had run marketing and business development for global technology vendors in India, and were tired of watching agencies report activity while pipeline stayed flat. We built the firm we wished we could have hired." />

      <Section className="hero-next">
        <StatRow stats={proof.stats} />
        <div className="mt-16"><Marquee speed="50s" items={proof.pedigree.map((p) => <span key={p} className="text-2xl font-medium tracking-tight text-fg/60">{p}</span>)} /></div>
      </Section>

      <Section band="sand">
        <SectionHead title={<>Led by people who have <em className="serif-em">carried the number.</em></>} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {authors.map((a, i) => (
            <Reveal key={a.slug} delay={i * 90}>
              <Link href={`/authors/${a.slug}`} className="card card-hover group block h-full p-7">
                <div className="flex size-16 items-center justify-center rounded-full bg-ember-wash font-display text-xl font-semibold text-ember-ink">{a.name.split(" ").map((s) => s[0]).join("")}</div>
                <div className="mt-6 text-2xl font-medium tracking-tight">{a.name}</div>
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">{a.role}</div>
                <p className="mt-4 leading-relaxed text-muted"><Copy text={a.long[0]} /></p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm">Full profile <ArrowUpRight className="size-4" /></div>
              </Link>
            </Reveal>
          ))}
        </div>
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
            <div><div className="eyebrow mb-2">Headquarters</div><p><Copy text={site.contact.hq} /></p></div>
            <div><div className="eyebrow mb-2">Office</div><p><Copy text={site.contact.office2} /></p></div>
            <div><div className="eyebrow mb-2">Email</div><p><Copy text={site.contact.email} /></p></div>
            <div><div className="eyebrow mb-2">Phone</div><p><Copy text={site.contact.phone} /></p></div>
          </div>
        </div>
      </Section>

      <CTABand title={<>Work with <em className="serif-em text-ember">operators.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Careers", href: "/careers" }} />
    </>
  );
}
