import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { IndexScene } from "@/components/visual/IndexScene";
import { CTABand } from "@/components/site/Blocks";
import { InsightsIndex } from "@/components/site/InsightsIndex";
import { insightsByDate, clusters } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Insights", description: "Writing on B2B go-to-market from the LeadStrategus founders: GTM strategy, demand generation, revenue intelligence and AI in GTM.", path: "/insights" });

export default function InsightsPage() {
  return (
    <>
      <PageHero
        art="insights"
        title={<>Written from the <em>pipeline.</em></>}
        lede="Four topics, no filler. What we learned running programmes this quarter, written down so you do not have to learn it the expensive way."
        scene={<IndexScene mode="atlas" columns={clusters.map((c) => ({ head: c.name, items: insightsByDate.filter((i) => i.cluster === c.slug).map((i) => i.title) }))} />}
        readout={[
          { k: "Essays", v: insightsByDate.length },
          { k: "Topics", v: clusters.length },
          { k: "Authors", v: new Set(insightsByDate.map((i) => i.author)).size },
          { k: "Written from", v: "live programmes" },
        ]}
      />
      <Section className="hero-next"><InsightsIndex items={insightsByDate} clusters={clusters} /></Section>
      <CTABand title={<>Rather talk it through than <em className="serif-em text-ember">read about it?</em></>} primary={{ label: "Book a strategy call", href: "/book" }} />
    </>
  );
}
