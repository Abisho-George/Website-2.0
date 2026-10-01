import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { IndexScene } from "@/components/visual/IndexScene";
import { MeetingsBoard } from "@/components/visual/surface/MeetingsBoard";
import { CTABand } from "@/components/site/Blocks";
import { WorkIndex } from "@/components/site/WorkIndex";
import { caseStudies } from "@/content/work";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, pageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Case studies by service", description: "B2B go-to-market case studies organised by service: GTM strategy, account intelligence, ABM, social selling, events, enablement and AI agents. Each follows situation, question, what we did, evidence and outcome.", path: "/work", keywords: ["B2B case studies", "go-to-market case studies", "ABM case study", "social selling case study", "demand generation results", "event ABM case study"] });

export default function WorkPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ type: "CollectionPage", name: "Case studies", description: metadata.description as string, path: "/work" })} />
      <PageHero
        art="work"
        title={<>Programmes that produced <em>meetings.</em></>}
        lede="Client names are withheld by default; most of our work is under NDA. Every number is traced to a client review or a signed-off study before it ships."
        scene={<IndexScene mode="ledger" rows={caseStudies.flatMap((c) => c.stats).map((s) => ({ label: s.label, value: s.value }))} />}
        readout={[
          { k: "Case studies", v: caseStudies.length },
          { k: "Sectors", v: new Set(caseStudies.map((c) => c.vertical)).size },
          { k: "Regions", v: new Set(caseStudies.map((c) => c.region)).size },
          { k: "Numbers signed off", v: "every one" },
        ]}
      />
      {/* The board wants room: a five-day grid in a four-column aside breaks
          company names one letter per line. It gets its own band, paired with
          the sentence it illustrates. */}
      <Section band="sand" pad="tight" n="01" label="What lands">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead
              title={<>The output is a <em>calendar,</em> not a report.</>}
              lede="Every programme below is judged on meetings held, not on activity delivered. This is the shape of a week in one of them."
            />
          </div>
          <Reveal delay={90} className="lg:col-span-7"><MeetingsBoard /></Reveal>
        </div>
      </Section>

      <Section n="02" label="Case studies"><WorkIndex items={caseStudies} /></Section>
      <CTABand title={<>Your programme could be <em className="serif-em text-ember">next.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "See the practices", href: "/practices" }} />
    </>
  );
}
