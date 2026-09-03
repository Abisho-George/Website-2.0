import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/site/Blocks";
import { InsightsIndex } from "@/components/site/InsightsIndex";
import { insightsByDate, clusters } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Insights", description: "Writing on B2B go-to-market from the LeadStrategus founders: GTM strategy, demand generation, revenue intelligence and AI in GTM.", path: "/insights" });

export default function InsightsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[var(--nav-h)]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="container-x relative py-20 md:py-28">
          <Reveal><Eyebrow className="mb-6">Insights</Eyebrow></Reveal>
          <Reveal delay={80}><h1 className="display max-w-4xl text-[3rem] md:text-[5.4rem]">Written from the <em className="text-ember">pipeline.</em></h1></Reveal>
          <Reveal delay={160}><p className="lede mt-7 max-w-2xl">Four topics, no filler. What we learned running programmes this quarter, written down so you do not have to learn it the expensive way.</p></Reveal>
        </div>
      </section>
      <Section index="—" label="archive" className="pt-0"><InsightsIndex items={insightsByDate} clusters={clusters} /></Section>
      <CTABand title={<>Rather talk it through than <em className="serif-em text-ember">read about it?</em></>} primary={{ label: "Book a strategy call", href: "/book" }} />
    </>
  );
}
