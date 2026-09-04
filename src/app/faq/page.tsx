import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTABand } from "@/components/site/Blocks";
import { PageHero } from "@/components/site/PageHero";
import { homeFaq, twinFaq } from "@/content/faq";
import { practices } from "@/content/practices";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "How LeadStrategus engagements work: what we cost, how quickly we start, what we guarantee, how the GTM AI Twin differs from an AI SDR tool, and how we handle data compliance.",
  path: "/faq",
});

const groups = [
  { id: "firm", title: "The firm", items: homeFaq },
  ...practices.map((p) => ({ id: p.slug, title: p.name, items: p.faq })),
  { id: "twin", title: "GTM AI Twin", items: twinFaq },
];

const all = groups.flatMap((g) => g.items);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(all)} />
      <PageHero
        art="insights"
        title={<>Answers, <em>before you ask.</em></>}
        lede={`${all.length} questions we are asked most, grouped by what they are about. If yours is not here, a founder will answer it on the first call.`}
      />

      <Section className="hero-next">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+28px)]">
              <div className="mb-4 font-display text-lg font-semibold tracking-tight">On this page</div>
              <ul className="space-y-1.5">
                {groups.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="flex items-baseline justify-between gap-3 rounded-lg px-2.5 py-1.5 -mx-2.5 text-sm text-muted transition-colors hover:bg-sand hover:text-ink">
                      {g.title}
                      <span className="font-mono text-[0.68rem] text-dim">{g.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-[var(--radius-lg)] border border-rule bg-sand p-5">
                <p className="text-sm leading-relaxed text-muted">Still unanswered? Ask a founder directly — we reply within one working day.</p>
                <Button href="/contact" size="sm" className="mt-4">Ask us</Button>
              </div>
            </div>
          </aside>

          <div className="space-y-14 lg:col-span-9">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-[calc(var(--nav-h)+28px)]">
                <Reveal><h2 className="h2 mb-6 balance">{g.title}</h2></Reveal>
                <Accordion items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </Section>

      <CTABand title={<>Ask the question that <em>isn&apos;t here.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Send an enquiry", href: "/contact" }} />
    </>
  );
}
