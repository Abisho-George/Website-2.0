import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { Copy } from "@/components/ui/Copy";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTABand, FAQBlock, StatRow } from "@/components/site/Blocks";
import { ClientLogos } from "@/components/site/ClientLogos";
import { ClutchReviews } from "@/components/site/ClutchReviews";
import { HeroFrame } from "@/components/site/HeroFrame";
import { FounderGrid } from "@/components/site/Founders";
import { SignalField } from "@/components/visual/SignalField";
import { AgentConsole } from "@/components/visual/surface/AgentConsole";
import { MeetingsBoard } from "@/components/visual/surface/MeetingsBoard";
import { PipelineBars } from "@/components/visual/PipelineBars";
import { Portal } from "@/components/visual/Portal";
import { Bloom, FieldPlate } from "@/components/ui/Atmos";
import { families } from "@/content/practices";
import { featuredUseCases, useCases } from "@/content/case-studies";
import { UseCaseCard } from "@/components/site/UseCaseCard";
import { authors } from "@/content/authors";
import { homeFaq } from "@/content/faq";
import { proof, site } from "@/content/site";
import { buildMetadata, faqJsonLd, pageJsonLd, serviceListJsonLd } from "@/lib/seo";


export const metadata = buildMetadata({
  absoluteTitle: "LeadStrategus | B2B GTM Strategy, Demand Generation and AI Agents",
  description: site.description,
  path: "/",
  keywords: ["B2B go-to-market", "GTM strategy", "B2B demand generation", "account-based marketing", "account intelligence", "sales enablement", "event-led demand generation", "AI agents for sales", "Lead Gen AI Twin", "B2B marketing agency India", "LeadStrategus"],
});

const shifts = [
  { n: "01", t: "Buyers finish researching before they talk to you.", b: "Your first touch has to be relevant to a decision already in motion. That means intent, triggers and open-source intelligence, not a purchased list." },
  { n: "02", t: "Attention is the only scarce input left.", b: "Generic outbound is filtered before it is read. What still earns a reply is research-led relevance from a person with credibility: social selling, content, events." },
  { n: "03", t: "Execution is becoming software.", b: "The repeatable seventy percent of go-to-market can now be run by agents. Deciding which accounts deserve effort is the human job, and the whole advantage." },
];

const phases = [
  { p: "Diagnose", d: "2 weeks", b: "Pipeline archaeology, customer interviews, motion audit. We find out what actually converts." },
  { p: "Design", d: "2 to 4 weeks", b: "ICP, positioning, universe, messaging system, channel mix and the operating plan." },
  { p: "Deploy", d: "4 to 8 weeks", b: "Pods, programmes or agents go live under weekly review. Learning before volume." },
  { p: "Run", d: "Ongoing", b: "Accountable to meetings and opportunities, reported every week, tuned every month." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={[...pageJsonLd({ name: site.name, description: site.description, path: "/" }), serviceListJsonLd("LeadStrategus service families", "/", families.map((f) => ({ name: f.name, path: `/practices/${f.slug}` }))), faqJsonLd(homeFaq)]} />

      {/* 01 · hero, the scene is the page's subject drawn live, not decoration.
           No scrim: the field is built with its left third empty instead of
           being bleached there to buy the headline legibility. */}
      <HeroFrame
        size="lg"
        n="01"
        lines={["Go\u2011to\u2011market,", <em key="e">engineered.</em>]}
        lede="LeadStrategus designs, runs and now automates B2B revenue engines: from positioning and intent intelligence to demand generation, enablement, and custom AI agents that book the meetings. Built by operators who ran marketing at AWS, Gartner and SAP."
        scene={<SignalField className="h-full w-full" />}
        actions={
          <>
            <Button href="/book" size="lg">Book a strategy call</Button>
            <Button href="/lead-gen-ai-twin" size="lg" variant="outline"><Sparkles className="size-4 text-ember" /> Meet the Lead Gen AI Twin</Button>
          </>
        }
      />

      <ClientLogos />
      <ClutchReviews />

      {/* 02 · thesis */}
      <Section n="02" label="Thesis" width="text" pad="loose">
        <SectionHead
          title={<>The buyer moved. <em className="serif-em">Most GTM didn&apos;t.</em></>}
          lede="Three shifts changed what works in B2B pipeline. Everything we do is built around them."
        />
        <ol className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {shifts.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 80} className="relative">
              <div className="mb-6 h-px w-12 bg-ember" />
              <h3 className="font-display text-[1.3rem] font-semibold leading-[1.15] tracking-[-0.028em] md:text-[1.5rem]">{s.t}</h3>
              <p className="mt-3.5 leading-relaxed text-muted">{s.b}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 03 · the arithmetic */}
      <Section n="03" label="The arithmetic" band="sand">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead title={<>A market of ten thousand is a shortlist of <em className="serif-em">two hundred.</em></>} />
            <p className="lede mt-5">Pipeline is an arithmetic problem before it is a creative one. Every stage below throws work away, so the only question that matters is whether you threw away the right accounts.</p>
            <p className="mt-5 text-sm text-muted">Typical shape of a programme we run in its second quarter. Your numbers will differ; the shape rarely does.</p>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="card p-6 md:p-8"><PipelineBars /></Reveal>
          </div>
        </div>
      </Section>

      {/* 05 · Lead Gen AI Twin */}
      <Section n="05" label="Lead Gen AI Twin" band="blush" className="overflow-hidden">
        <Bloom hue="ember" at="br" size={70} />
        <FieldPlate fx="78%" fy="45%" />
        <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="display text-[2.4rem] md:text-[3.7rem]">A twin of your GTM team. <em>Made of agents.</em></h2>
              <p className="lede mt-6">Custom AI agents that take over go-to-market end to end: identify the prospect, research the account, reach out in your voice, handle the replies, book the meeting. You keep the judgement. The twin keeps the pipeline moving.</p>
              <ul className="mt-8 grid gap-2.5 text-sm text-fg-soft sm:grid-cols-2">
                {["Built on your ICP, wins and voice", "Wired into CRM, email, LinkedIn, calendar", "Supervised until it earns autonomy", "Accountable to meetings, not activity"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5"><span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-ember" />{t}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/lead-gen-ai-twin" size="lg">Explore the Twin</Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6"><Reveal delay={110}><AgentConsole /></Reveal></div>
        </div>
      </Section>

      {/* 06 · operating model */}
      <Section n="06" label="Operating model" band="sand">
        <SectionHead title={<>Diagnose. Design. Deploy. <em className="serif-em">Run.</em></>} lede="Every practice, the Twin included, runs on the same four phases and the same weekly report." />
        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          {phases.map((ph, i) => (
            <Reveal key={ph.p} as="li" delay={i * 70} className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-ember" />
                <span className="h-px flex-1 bg-rule" />
                <span className="kicker text-dim">{ph.d}</span>
              </div>
              <div className="font-display text-xl font-semibold tracking-tight">{ph.p}</div>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">{ph.b}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-16 grid gap-10 border-t border-rule pt-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="font-display text-[1.5rem] font-medium leading-[1.2] tracking-[-0.022em] md:text-[1.9rem]">&ldquo;We report the same five numbers every week: accounts engaged, meetings booked, meetings held, opportunities created, and what we are changing next.&rdquo;</p>
            <p className="kicker mt-4 text-muted">Kingshuk Hazra · Founder</p>
          </div>
          <div className="md:col-span-7"><StatRow stats={proof.stats} /></div>
        </div>
      </Section>

      {/* 07 · case studies */}
      <Section n="07" label="Case studies">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead title={<>Case studies from <em className="serif-em">the field.</em></>} lede="How our service lines work in practice, by industry: the challenge, what we did, and what changed in the go-to-market motion." />
          <Link href="/case-studies" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ember-ink transition-colors hover:text-ember-deep">All {useCases.length} case studies <ArrowRight className="size-4" /></Link>
        </div>
        <div className="rail rail--swipe mt-12 md:grid-cols-2 lg:grid-cols-3">
          {featuredUseCases.map((u, i) => <UseCaseCard key={u.slug} u={u} i={i % 3} />)}
        </div>
      </Section>

      {/* 08 · operators */}
      <Section n="08" label="Operators">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead title={<>Operators, <em className="serif-em">not an agency.</em></>} lede="The founders ran marketing for global vendors in India before starting LeadStrategus in 2018. Every engagement is led by someone who has carried the number." />
            <Button href="/about" variant="outline" className="mt-8">About the firm</Button>
          </div>
          <div className="lg:col-span-7">
            <FounderGrid authors={authors} />
          </div>
        </div>
        <div className="mt-14 border-y border-rule py-5">
          <Marquee speed="64s" items={proof.verticals.map((v) => <span key={v} className="kicker text-dim">{v}</span>)} />
        </div>
      </Section>

      {/* 09 · portal */}
      <Section n="09" label="The other side" band="kraft">
        <SectionHead title={<>There is a <em className="serif-em">second</em> LeadStrategus.</>} lede="This site is the people. The agents have their own address. Move the seam to see the other side, then cross over." />
        <Reveal className="mt-11"><Portal /></Reveal>
        <p className="kicker mt-3 text-right text-dim">
          <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ember-ink">leadstrategus.ai ↗</a>
        </p>
      </Section>

      {/* 11 · faq */}
      <Section band="sand"><FAQBlock items={homeFaq} /></Section>

      {/* 12 · cta */}
      <CTABand
        title={<>Tell us what is <em>not converting.</em></>}
        lede="Thirty minutes with a founder. We will tell you which services fit and whether a twin makes sense for your motion."
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: "Send an enquiry", href: "/contact" }}
      />
    </>
  );
}
