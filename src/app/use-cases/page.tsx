import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/Blocks";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, pageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Use cases",
  description: "How B2B technology companies use LeadStrategus: the go-to-market problems we are brought in to solve, and the services that solve them.",
  path: "/use-cases",
  keywords: ["LeadStrategus use cases", "B2B go-to-market use cases", "demand generation use cases", "AI agents for lead generation"],
});

/** The use cases themselves are added in the next change. */
export default function UseCasesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ type: "CollectionPage", name: "Use cases", description: metadata.description as string, path: "/use-cases" })} />
      <PageHero
        title={<>Use <em>cases.</em></>}
        lede="The go-to-market problems B2B technology companies bring to us, and how we solve them."
      />
      <CTABand
        title={<>Have a problem that is <em>not listed?</em></>}
        lede="Tell us what is not converting. A founder replies within one working day."
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: "Send an enquiry", href: "/contact" }}
      />
    </>
  );
}
