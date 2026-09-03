import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section, SectionHead, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/site/Blocks";
import { practices } from "@/content/practices";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Practices", description: "GTM Strategy, Demand Generation, Revenue Intelligence and Enablement: four B2B go-to-market practices on one operating model, plus the GTM AI Twin.", path: "/practices" });

export default function PracticesHub() {
  return (
    <>
      <section className="relative overflow-hidden pt-[var(--nav-h)]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="container-x relative py-20 md:py-28">
          <Reveal><Eyebrow className="mb-6">Practices</Eyebrow></Reveal>
          <Reveal delay={80}><h1 className="display max-w-4xl text-[3rem] md:text-[5.4rem]">Four practices. <em className="text-ember">One</em> operating model.</h1></Reveal>
          <Reveal delay={160}><p className="lede mt-7 max-w-2xl">They share an account universe, a messaging system and a weekly pipeline review, so adding a second practice compounds the first rather than starting over.</p></Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <div className="divide-y divide-rule border-y border-rule">
          {practices.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link href={`/practices/${p.slug}`} className="group grid gap-6 py-10 md:grid-cols-12 md:items-start">
                <div className="font-mono text-[0.8rem] text-ember md:col-span-1">{p.index}</div>
                <div className="md:col-span-5">
                  <h2 className="text-[1.8rem] font-medium tracking-tight transition-colors group-hover:text-ember md:text-[2.2rem]">{p.name}</h2>
                  <p className="mt-2 text-muted">{p.tagline}</p>
                </div>
                <div className="md:col-span-5">
                  <ul className="flex flex-wrap gap-1.5">{p.services.map((s) => <li key={s} className="rounded-full border border-rule px-2.5 py-1 text-[0.72rem] text-muted">{s}</li>)}</ul>
                </div>
                <div className="md:col-span-1 md:justify-self-end"><ArrowRight className="size-5 text-dim transition-all group-hover:translate-x-1 group-hover:text-fg" /></div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="glow-ember mt-10 grid gap-6 rounded-[var(--radius-xl)] border border-ember/30 bg-paper p-8 md:grid-cols-12 md:items-center md:p-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-ember-ink"><Sparkles className="size-4" /><span className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">Special service</span></div>
            <h2 className="mt-3 text-[1.8rem] font-medium tracking-tight md:text-[2.2rem]">GTM AI Twin</h2>
            <p className="mt-2 max-w-xl text-muted">Custom agents that take over the whole motion, from identifying the prospect to booking the meeting. Every practice above feeds it.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end"><Button href="/gtm-ai-twin" variant="primary">Explore the Twin</Button></div>
        </Reveal>
      </Section>

      <Section band="sand" tight>
        <SectionHead eyebrow="Not sure which?" title="Start with a diagnostic." lede="Two weeks, fixed fee, and you leave with a written view of what is stalling pipeline and which practice would move it. The fee is credited against whatever you do next." />
        <Button href="/book" variant="paper" className="mt-8">Book a strategy call</Button>
      </Section>

      <CTABand title={<>Which practice does your pipeline <em className="serif-em text-ember">need first?</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Send an enquiry", href: "/contact" }} />
    </>
  );
}
