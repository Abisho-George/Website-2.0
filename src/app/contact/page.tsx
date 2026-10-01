import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Copy } from "@/components/ui/Copy";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/content/site";
import { enquiryTypes } from "@/lib/enquiry";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, pageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Contact LeadStrategus", description: "Send an enquiry to LeadStrategus about GTM strategy, account intelligence, demand generation, enablement, events or the GTM AI Twin. Routed by service and answered within one working day.", path: "/contact", keywords: ["contact LeadStrategus", "B2B go-to-market enquiry", "demand generation agency contact", "GTM consulting India"] });

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const valid = enquiryTypes.some((t) => t[0] === type);
  const isTwin = type === "gtm-ai-twin";
  return (
    <>
      <JsonLd data={pageJsonLd({ type: "ContactPage", name: "Contact", description: metadata.description as string, path: "/contact" })} />
      <section className="relative pt-[var(--nav-h)]">
        <div className="container-x grid gap-14 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal delay={80}><h1 className="display text-[2.8rem] md:text-[4.4rem]">Tell us what is <em className={isTwin ? "text-ember-ink" : "text-ember"}>not converting.</em></h1></Reveal>
            <Reveal delay={160}><p className="lede mt-6">Enquiries are routed to the practice lead, not a shared inbox. You will hear from a founder within one working day.</p></Reveal>
            <Reveal delay={220} className="mt-10 space-y-6 text-sm">
              <div><div className="eyebrow mb-2">What happens next</div>
                <ol className="space-y-2 text-muted">
                  <li>01 · A founder reads your note and replies with two or three questions.</li>
                  <li>02 · A thirty-minute call: your motion, your numbers, our honest view.</li>
                  <li>03 · A scoped proposal with a price, or a recommendation to look elsewhere.</li>
                </ol>
              </div>
              <div><div className="eyebrow mb-2">Direct</div>
                <p className="text-muted"><Copy text={site.contact.email} /><br /><Copy text={site.contact.phone} /></p>
              </div>
              <div><div className="eyebrow mb-2">Bengaluru</div><p className="text-muted"><Copy text={site.contact.hq} /></p></div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={120} className="card p-6 md:p-8"><ContactForm defaultType={valid ? type : "gtm-ai-twin"} tone={isTwin ? "twin" : "ember"} /></Reveal>
          </div>
        </div>
      </section>
      <Section band="sand" tight>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div><div className="eyebrow mb-2">Prefer a calendar?</div><p className="text-lg">Book a thirty-minute strategy call directly.</p></div>
          <a href="/book" className="inline-flex h-11 shrink-0 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-ink-2">Open the calendar</a>
        </div>
      </Section>
    </>
  );
}
