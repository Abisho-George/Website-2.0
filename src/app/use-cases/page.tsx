import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/Blocks";
import { UseCaseIndex } from "@/components/site/UseCaseIndex";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { useCases, useCaseFamilies, useCaseIndustries } from "@/content/use-cases";
import { buildMetadata, pageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Use cases: programmes in action",
  description: "How LeadStrategus service lines work in practice, by industry: the situation buyers face, the question that matters, what we do, and what changes in the go-to-market motion.",
  path: "/use-cases",
  keywords: ["LeadStrategus use cases", "B2B go-to-market use cases", "demand generation use cases", "ABM use cases", "AI agents for lead generation"],
});

export default function UseCasesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ type: "CollectionPage", name: "Use cases", description: metadata.description as string, path: "/use-cases" })} />
      <PageHero
        eyebrow="Use cases"
        title={<>Programmes in <em>action.</em></>}
        lede="How our service lines work in practice, by industry: the situation buyers face, the question that matters, what we do, and what changes in the go-to-market motion."
        readout={[
          { k: "Use cases", v: useCases.length },
          { k: "Service families", v: useCaseFamilies.length },
          { k: "Industries", v: useCaseIndustries.length },
          { k: "Services shown", v: new Set(useCases.map((u) => u.serviceSlug)).size },
        ]}
      />
      <Section className="hero-next" pad="tight">
        <UseCaseIndex items={useCases} families={useCaseFamilies} industries={useCaseIndustries} />
      </Section>
      <CTABand
        title={<>Seen your situation <em>here?</em></>}
        lede="Tell us what is not converting. A founder replies within one working day."
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: "Send an enquiry", href: "/contact" }}
      />
    </>
  );
}
