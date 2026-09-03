import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Book a strategy call", description: "Thirty minutes with a LeadStrategus founder on your pipeline, your motion and what would move it.", path: "/book" });

export default function BookPage() {
  const cal = site.booking.calLink;
  return (
    <section className="relative pt-[var(--nav-h)]">
      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal><Eyebrow className="mb-6">Book</Eyebrow></Reveal>
          <Reveal delay={80}><h1 className="display text-[2.8rem] md:text-[4rem]">Thirty minutes. <em className="text-ember">No pitch.</em></h1></Reveal>
          <Reveal delay={160}><p className="lede mt-6">A founder, your numbers, and an honest view of what would move them. If we are not the right fit we will say so and point you somewhere useful.</p></Reveal>
          <Reveal delay={220} className="mt-8 space-y-3 text-sm text-muted">
            <p>Come with: pipeline by source for the last two quarters, your ICP as you currently define it, and the one motion you suspect is broken.</p>
            <p>Leave with: a diagnosis, a practice recommendation, and a price.</p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          {cal ? (
            <Reveal delay={120} className="card overflow-hidden">
              <iframe src={`https://cal.com/${cal}?embed=true&theme=dark&layout=month_view`} title="Book a strategy call" className="h-[760px] w-full" loading="lazy" />
            </Reveal>
          ) : (
            <Reveal delay={120} className="card p-6 md:p-8">
              <p className="mb-6 rounded-xl border border-rule bg-white/[.03] p-4 font-mono text-[0.72rem] text-muted">Calendar embed not configured. Set <span className="text-fg">NEXT_PUBLIC_CAL_LINK</span> (e.g. <span className="text-fg">leadstrategus/strategy-call</span>) to embed Cal.com here. Until then, requests go through the form.</p>
              <ContactForm defaultType="other" />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
