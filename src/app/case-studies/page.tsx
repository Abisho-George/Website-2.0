import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/Blocks";
import { UseCaseIndex } from "@/components/site/UseCaseIndex";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { useCases, useCaseFamilies, useCaseIndustries } from "@/content/case-studies";
import { buildMetadata, pageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case studies: programmes in action",
  description: "How LeadStrategus service lines work in practice, by industry: the situation buyers face, the question that matters, what we do, and what changes in the go-to-market motion.",
  path: "/case-studies",
  keywords: ["LeadStrategus case studies", "B2B go-to-market case studies", "demand generation case studies", "ABM case studies", "AI agents for lead generation"],
});

export default function UseCasesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ type: "CollectionPage", name: "Case studies", description: metadata.description as string, path: "/case-studies" })} />
      <PageHero
        eyebrow="Case studies"
        title={<>Programmes in <em>action.</em></>}
        lede="How our service lines work in practice, by industry: the situation buyers face, the question that matters, what we do, and what changes in the go-to-market motion."
        readout={[
          { k: "Case studies", v: useCases.length },
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
