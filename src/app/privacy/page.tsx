import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Copy } from "@/components/ui/Copy";
export const metadata = buildMetadata({ title: "Privacy", path: "/privacy" });
export default function Privacy() {
  return (
    <section className="pt-[var(--nav-h)]"><div className="container-x py-20 md:py-28"><div className="mx-auto max-w-3xl">
      <p className="eyebrow mb-6">Privacy policy</p>
      <h1 className="display text-[2.6rem] md:text-[4rem]">How we handle data.</h1>
      <div className="prose-ls mt-10">
        <p><strong>Who we are.</strong> {site.legalName}, Bengaluru, India. Contact: <Copy text={site.contact.email} />.</p>
        <p><strong>What we collect on this site.</strong> Enquiry form submissions (name, work email, company, message, enquiry type, optional budget) and standard analytics (page views, referrer, device class). We use a honeypot and, where configured, Cloudflare Turnstile to filter spam.</p>
        <p><strong>Why.</strong> To respond to your enquiry, to route it to the right practice lead, and to understand which pages are useful. Lawful basis: legitimate interest and, where applicable, consent.</p>
        <p><strong>Where it goes.</strong> Enquiries are delivered to our inbox and, where configured, to our CRM (HubSpot). Booking requests are handled by Cal.com. We do not sell personal data.</p>
        <p><strong>Our services.</strong> Our Revenue Intelligence practice processes business-contact data on behalf of clients under contract, sourced from public and licensed data, with lawful basis recorded per record and suppression lists honoured. Requests concerning that processing should be addressed to the client and to us at the address above.</p>
        <p><strong>Retention.</strong> Enquiries are kept for [[24 months]] unless a commercial relationship follows.</p>
        <p><strong>Your rights.</strong> Access, correction, deletion and objection under India&apos;s DPDP Act and, where applicable, GDPR and UK GDPR. Email us and we will respond within thirty days.</p>
        <p><strong>Updates.</strong> This policy was last reviewed on [[3 September 2026]].</p>
      </div>
    </div></div></section>
  );
}
