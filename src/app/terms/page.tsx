import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, pageJsonLd } from "@/lib/seo";
import { site } from "@/content/site";
export const metadata = buildMetadata({ title: "Terms of use", description: "The terms that govern use of the LeadStrategus website and its content.", path: "/terms" });
export default function Terms() {
  return (
    <section className="pt-[var(--nav-h)]"><div className="container-x py-20 md:py-28"><div className="mx-auto max-w-3xl">
      <JsonLd data={pageJsonLd({ type: "WebPage", name: "Terms of use", description: metadata.description as string, path: "/terms" })} />
      <p className="eyebrow mb-6">Terms of use</p>
      <h1 className="display text-[2.6rem] md:text-[4rem]">The short version.</h1>
      <div className="prose-ls mt-10">
        <p>This website is operated by {site.legalName}. By using it you agree to these terms.</p>
        <p><strong>Content.</strong> Everything on this site is provided for general information. Case studies are anonymised and figures are illustrative until verified; nothing here is a guarantee of results for your business. Engagement terms are set out in individual proposals and master service agreements.</p>
        <p><strong>Intellectual property.</strong> Text, design, code and visuals are ours unless stated. You may quote short extracts with attribution and a link.</p>
        <p><strong>Third parties.</strong> Links to leadstrategus.ai, LinkedIn, Clutch, Cal.com and others are provided for convenience; their terms apply on their sites.</p>
        <p><strong>Liability.</strong> To the extent permitted by law we exclude liability for loss arising from use of this site. Governing law: India, courts of Bengaluru.</p>
      </div>
    </div></div></section>
  );
}
