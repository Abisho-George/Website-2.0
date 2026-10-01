import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { IndexScene } from "@/components/visual/IndexScene";
import { CTABand } from "@/components/site/Blocks";
import { InsightsIndex } from "@/components/site/InsightsIndex";
import { insightsByDate, clusters } from "@/content/insights";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, pageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Insights on B2B go-to-market", description: "Writing on B2B go-to-market from the LeadStrategus founders: GTM strategy, demand generation, account intelligence and AI agents in GTM.", path: "/insights", keywords: ["B2B go-to-market blog", "GTM strategy articles", "demand generation insights", "account intelligence", "AI in GTM"] });

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ type: "CollectionPage", name: "Insights", description: metadata.description as string, path: "/insights" })} />
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
