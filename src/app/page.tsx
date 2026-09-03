import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead, Eyebrow } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { Copy } from "@/components/ui/Copy";
import { JsonLd } from "@/components/ui/JsonLd";
import { CaseTile, CTABand, FAQBlock, PracticeCard, ProofBar, StatRow } from "@/components/site/Blocks";
import { SignalField } from "@/components/visual/SignalField";
import { TwinRunLog } from "@/components/visual/TwinRunLog";
import { Portal } from "@/components/visual/Portal";
import { practices } from "@/content/practices";
import { featuredCases } from "@/content/work";
import { insightsByDate, getCluster } from "@/content/insights";
import { authors } from "@/content/authors";
import { homeFaq } from "@/content/faq";
import { proof, site } from "@/content/site";
import { faqJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const shifts = [
  { n: "01", t: "Buyers finish researching before they talk to you.", b: "Your first touch has to be relevant to a decision already in motion. That means intent, triggers and open-source intelligence, not a purchased list." },
  { n: "02", t: "Attention is the only scarce input left.", b: "Generic outbound is filtered before it is read. What still earns a reply is research-led relevance from a person with credibility: social selling, content, events." },
  { n: "03", t: "Execution is becoming software.", b: "The repeatable seventy percent of go-to-market can now be run by agents. The judgement about which accounts deserve effort is the human job, and the whole advantage." },
];

const phases = [
  { p: "Diagnose", d: "2 weeks", b: "Pipeline archaeology, customer interviews, motion audit. We find out what actually converts." },
  { p: "Design", d: "2–4 weeks", b: "ICP, positioning, universe, messaging system, channel mix and the operating plan." },
  { p: "Deploy", d: "4–8 weeks", b: "Pods, programmes or agents go live under weekly review. Learning before volume." },
  { p: "Run", d: "Ongoing", b: "Accountable to meetings and opportunities, reported every week, tuned every month." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaq)} />

      {/* 01 · Hero */}
      <section className="relative min-h-[100svh] overflow-hidden pt-[var(--nav-h)]">
        <SignalField className="absolute inset-0 h-full w-full opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_40%,rgba(7,10,15,.92),rgba(7,10,15,.4)_60%,transparent)]" />
        <div className="container-x relative flex min-h-[calc(100svh-var(--nav-h))] flex-col justify-center py-20">
          <Reveal>
            <Eyebrow className="mb-7">B2B go-to-market · Bengaluru → Global · est. 2018</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display max-w-5xl text-[3.2rem] sm:text-[4.6rem] md:text-[6.2rem] xl:text-[7.4rem]">
              Go-to-market,<br /><em className="text-ember">engineered.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mt-8 max-w-2xl">
              LeadStrategus designs, runs and now automates B2B revenue engines: from positioning and intent intelligence to demand generation, enablement, and custom AI agents that book the meetings. Built by operators who ran marketing at AWS, Gartner and SAP.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/book" size="lg">Book a strategy call</Button>
            <Button href="/gtm-ai-twin" size="lg" variant="outline" className="border-ion/50 text-ion hover:border-ion hover:bg-ion/10">
              <Sparkles className="size-4" /> Meet the GTM AI Twin
            </Button>
          </Reveal>
          <div className="mt-16 hidden items-center gap-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-dim md:flex">
            <span>identify</span><span className="h-px w-8 bg-line-strong" /><span>qualify</span><span className="h-px w-8 bg-line-strong" /><span className="text-ion">book</span>
          </div>
        </div>
      </section>

      {/* 02 · Proof */}
      <ProofBar />

      {/* 03 · Thesis */}
      <Section>
        <SectionHead eyebrow="The thesis" title={<>The buyer moved. <em className="serif-em text-muted">Most GTM didn&apos;t.</em></>} lede="Three shifts changed what works in B2B pipeline. Everything we do is built around them." />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-3">
          {shifts.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="bg-ink p-8 md:p-10">
              <div className="display text-[3.4rem] text-ember/90">{s.n}</div>
              <h3 className="mt-8 text-xl font-medium tracking-tight md:text-[1.45rem]">{s.t}</h3>
              <p className="mt-4 leading-relaxed text-muted">{s.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 04 · Practices */}
      <Section className="pt-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead eyebrow="Practices" title={<>Four practices.<br />One operating model.</>} lede="Start with the one your pipeline needs. Most clients add a second within a year, because they share the same account universe, messaging system and weekly review." />
          <Link href="/practices" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">All practices <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {practices.map((p, i) => <PracticeCard key={p.slug} p={p} i={i} />)}
        </div>
      </Section>

      {/* 05 · GTM AI Twin spotlight */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_50%,rgba(124,243,214,.14),transparent_70%)]" />
        <div className="container-x section-y relative">
          <div className="glow-ion relative overflow-hidden rounded-[var(--radius-xl)] border border-ion/30 bg-ink-2/70 p-7 md:p-12 lg:p-16">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Reveal>
                  <Eyebrow tone="ion" className="mb-6">Special service · GTM AI Twin</Eyebrow>
                  <h2 className="display text-[2.6rem] md:text-[4rem]">A twin of your GTM team. <em className="text-ion">Made of agents.</em></h2>
                  <p className="lede mt-6">Custom AI agents that take over go-to-market end to end: identify the prospect, research the account, reach out in your voice, handle the replies, book the meeting. You keep the judgement. The twin keeps the pipeline moving.</p>
                  <ul className="mt-8 grid gap-2 text-sm text-muted sm:grid-cols-2">
                    {["Built on your ICP, wins and voice", "Wired into CRM, email, LinkedIn, calendar", "Supervised until it earns autonomy", "Accountable to meetings, not activity"].map((t) => (
                      <li key={t} className="flex items-start gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-ion" />{t}</li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Button href="/gtm-ai-twin" variant="ion" size="lg">Explore the Twin</Button>
                    <Button href="/contact?type=gtm-ai-twin" variant="outline" size="lg">Scope mine</Button>
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-6">
                <Reveal delay={120}><TwinRunLog /></Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · How an engagement runs */}
      <Section paper>
        <SectionHead eyebrow="How it runs" title={<>Diagnose. Design. Deploy. <em className="serif-em">Run.</em></>} lede="Every practice, including the Twin, runs on the same four phases. Strategy that stops at the deck is a deck; execution without diagnosis is noise." />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-ink/15 bg-ink/15 md:grid-cols-4">
          {phases.map((ph, i) => (
            <Reveal key={ph.p} as="li" delay={i * 80} className="bg-paper p-7 md:p-8">
              <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/55">
                <span>Phase 0{i + 1}</span><span>{ph.d}</span>
              </div>
              <div className="mt-10 text-2xl font-medium tracking-tight">{ph.p}</div>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{ph.b}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="font-display text-[1.7rem] italic leading-tight md:text-[2.2rem]">&ldquo;We report the same five numbers every week: accounts engaged, meetings booked, meetings held, opportunities created, and what we are changing next.&rdquo;</p>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/55">Kingshuk Hazra · Founder</p>
          </div>
          <div className="md:col-span-7">
            <StatRow stats={proof.stats} />
          </div>
        </div>
      </Section>

      {/* 07 · Work */}
      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead eyebrow="Work" title={<>Programmes that produced <em className="serif-em text-muted">meetings.</em></>} lede="Anonymised by default. Every number traces to a client review or a signed-off study before it ships." />
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">All work <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {featuredCases.map((c, i) => <CaseTile key={c.slug} c={c} i={i} />)}
        </div>
      </Section>

      {/* 08 · Operators */}
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Who you work with" title={<>Operators, <em className="serif-em text-muted">not an agency.</em></>} lede="The founders ran marketing for global vendors in India before starting LeadStrategus in 2018. Every engagement is led by someone who has carried the number." />
            <Button href="/about" variant="outline" className="mt-8">About the firm</Button>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {authors.map((a, i) => (
                <Reveal key={a.slug} delay={i * 90}>
                  <Link href={`/authors/${a.slug}`} className="card card-hover group block h-full p-6">
                    <div className="flex size-14 items-center justify-center rounded-full border border-line bg-ink-3 font-display text-2xl italic">{a.name.split(" ").map((s) => s[0]).join("")}</div>
                    <div className="mt-6 text-xl font-medium tracking-tight">{a.name}</div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">{a.role}</div>
                    <p className="mt-4 text-sm leading-relaxed text-muted"><Copy text={a.bio} /></p>
                    <div className="mt-5 inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-fg">Profile <ArrowUpRight className="size-4" /></div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16">
          <Marquee speed="60s" items={proof.verticals.map((v) => <span key={v} className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-dim">{v}</span>)} />
        </div>
      </Section>

      {/* 09 · Portal to .ai */}
      <Section className="pt-0">
        <SectionHead eyebrow="Two sides" title={<>There is a <em className="serif-em">second</em> LeadStrategus.</>} lede="This site is the humans. The agents have their own address. Move the line to see the other side, then cross over." />
        <Reveal className="mt-12"><Portal /></Reveal>
        <p className="mt-4 text-right font-mono text-[0.68rem] uppercase tracking-[0.14em] text-dim"><a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ion">leadstrategus.ai ↗</a></p>
      </Section>

      {/* 10 · Insights */}
      <Section className="pt-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead eyebrow="Insights" title={<>Written from the <em className="serif-em text-muted">pipeline.</em></>} />
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">All insights <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {insightsByDate.slice(0, 3).map((i, idx) => (
            <Reveal key={i.slug} delay={idx * 70}>
              <Link href={`/insights/${i.slug}`} className="group grid gap-3 py-7 md:grid-cols-12 md:items-baseline">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted md:col-span-3">{getCluster(i.cluster)?.name} · {formatDate(i.date)}</div>
                <div className="md:col-span-8">
                  <div className="text-xl font-medium tracking-tight transition-colors group-hover:text-ember md:text-2xl">{i.title}</div>
                  <p className="mt-2 max-w-2xl text-sm text-muted">{i.dek}</p>
                </div>
                <ArrowUpRight className="hidden size-5 justify-self-end text-dim transition-colors group-hover:text-fg md:col-span-1 md:block" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 11 · FAQ */}
      <Section className="pt-0"><FAQBlock items={homeFaq} /></Section>

      {/* 12 · CTA */}
      <CTABand
        title={<>Tell us what is <em className="serif-em text-ember">not converting.</em></>}
        lede="Thirty minutes with a founder. We will tell you which practice fits, what it costs, and whether a twin makes sense for your motion."
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: "Send an enquiry", href: "/contact" }}
      />
    </>
  );
}
