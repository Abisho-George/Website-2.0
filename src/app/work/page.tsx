import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/site/Blocks";
import { WorkIndex } from "@/components/site/WorkIndex";
import { caseStudies } from "@/content/work";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Work", description: "Anonymised B2B go-to-market case studies: outbound engines, social selling, ABM, webinar programmes, GTM repositioning and revenue intelligence.", path: "/work" });

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[var(--nav-h)]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="container-x relative py-20 md:py-28">
          <Reveal><Eyebrow className="mb-6">Work</Eyebrow></Reveal>
          <Reveal delay={80}><h1 className="display max-w-4xl text-[3rem] md:text-[5.4rem]">Programmes that produced <em className="text-ember">meetings.</em></h1></Reveal>
          <Reveal delay={160}><p className="lede mt-7 max-w-2xl">Client names are withheld by default; most of our work is under NDA. Every number is traced to a client review or a signed-off study before it ships.</p></Reveal>
        </div>
      </section>
      <Section className="pt-0"><WorkIndex items={caseStudies} /></Section>
      <CTABand title={<>Your programme could be <em className="serif-em text-ember">next.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "See the practices", href: "/practices" }} />
    </>
  );
}
