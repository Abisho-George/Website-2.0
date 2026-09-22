import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { services } from "@/content/services";
import { IndexScene } from "@/components/visual/IndexScene";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/site/Blocks";
import { practices } from "@/content/practices";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Practices", description: "GTM Strategy, Demand Generation, Revenue Intelligence and Enablement: four B2B go-to-market practices on one operating model, plus the GTM AI Twin.", path: "/practices" });

export default function PracticesHub() {
  return (
    <>
      <PageHero
        art="practices"
        title={<>Four practices. <em>One</em> operating model.</>}
        lede="They share an account universe, a messaging system and a weekly pipeline review, so adding a second practice compounds the first rather than starting over."
        scene={<IndexScene mode="atlas" columns={practices.map((p) => ({ head: p.short, items: p.services }))} />}
        readout={[
          { k: "Practices", v: practices.length },
          { k: "Services", v: services.length },
          { k: "Phases each", v: practices[0].process.length },
          { k: "Shared account universe", v: "one" },
        ]}
      />

      <Section className="hero-next">
        <div className="divide-y divide-rule border-y border-rule">
          {practices.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link href={`/practices/${p.slug}`} className="group grid gap-6 py-9 md:grid-cols-11 md:items-start">
                <div className="md:col-span-5">
                  <h2 className="font-display text-[1.7rem] font-semibold tracking-[-0.03em] transition-colors group-hover:text-ember-ink md:text-[2.1rem]">{p.name}</h2>
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
        <SectionHead title="Start with a diagnostic." lede="Two weeks, fixed fee, and you leave with a written view of what is stalling pipeline and which practice would move it. The fee is credited against whatever you do next." />
        <Button href="/book" variant="paper" className="mt-8">Book a strategy call</Button>
      </Section>

      <CTABand title={<>Which practice does your pipeline <em className="serif-em text-ember">need first?</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Send an enquiry", href: "/contact" }} />
    </>
  );
}
