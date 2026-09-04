import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/Blocks";
import { WorkIndex } from "@/components/site/WorkIndex";
import { caseStudies } from "@/content/work";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Work", description: "Anonymised B2B go-to-market case studies: outbound engines, social selling, ABM, webinar programmes, GTM repositioning and revenue intelligence.", path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageHero art="work" title={<>Programmes that produced <em>meetings.</em></>} lede="Client names are withheld by default; most of our work is under NDA. Every number is traced to a client review or a signed-off study before it ships." />
      <Section className="hero-next"><WorkIndex items={caseStudies} /></Section>
      <CTABand title={<>Your programme could be <em className="serif-em text-ember">next.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "See the practices", href: "/practices" }} />
    </>
  );
}
