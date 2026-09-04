import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { Copy } from "@/components/ui/Copy";
import { JsonLd } from "@/components/ui/JsonLd";
import { CaseTile, CTABand, FAQBlock, PracticeCard, ProofBar, StatRow } from "@/components/site/Blocks";
import { SignalField } from "@/components/visual/SignalField";
import { TwinRunLog } from "@/components/visual/TwinRunLog";
import { PipelineBars } from "@/components/visual/PipelineBars";
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
  { n: "01", t: "Buyers finish researching before they talk to you.", b: "Your first touch has to be relevant to a decision already in motion. That means intent, triggers and open-source intelligence — not a purchased list." },
  { n: "02", t: "Attention is the only scarce input left.", b: "Generic outbound is filtered before it is read. What still earns a reply is research-led relevance from a person with credibility: social selling, content, events." },
  { n: "03", t: "Execution is becoming software.", b: "The repeatable seventy percent of go-to-market can now be run by agents. Deciding which accounts deserve effort is the human job — and the whole advantage." },
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

      {/* 01 · hero */}
      <section className="band relative overflow-hidden pt-[var(--nav-h)]">
        <SignalField className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,white_0%,rgba(255,255,255,.92)_38%,rgba(255,255,255,.45)_62%,transparent_86%)]" />
        <div className="container-x relative flex min-h-[min(760px,82svh)] flex-col justify-center py-16 md:py-20">
          <Reveal delay={70}>
            <h1 className="display max-w-[15ch] text-[3rem] sm:text-[4.4rem] md:text-[5.8rem] xl:text-[7rem]">
              Go-to-market,<br /><em>engineered.</em>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede mt-7 max-w-2xl">
              LeadStrategus designs, runs and now automates B2B revenue engines — from positioning and intent intelligence to demand generation, enablement, and custom AI agents that book the meetings. Built by operators who ran marketing at AWS, Gartner and SAP.
            </p>
          </Reveal>
          <Reveal delay={210} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/book" size="lg">Book a strategy call</Button>
            <Button href="/gtm-ai-twin" size="lg" variant="outline"><Sparkles className="size-4 text-ember" /> Meet the GTM AI Twin</Button>
          </Reveal>
        </div>
      </section>

      <ProofBar />

      {/* 02 · thesis */}
      <Section>
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
      <Section band="sand">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead title={<>A market of ten thousand is a shortlist of <em className="serif-em">two hundred.</em></>} />
            <p className="lede mt-5">Pipeline is an arithmetic problem before it is a creative one. Every stage below throws work away — so the only question that matters is whether you threw away the right accounts.</p>
            <p className="mt-5 text-sm text-muted">Typical shape of a programme we run in its second quarter. Your numbers will differ; the shape rarely does.</p>
            <Button href="/practices/revenue-intelligence" variant="outline" className="mt-8">How we rank accounts</Button>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="card p-6 md:p-8"><PipelineBars /></Reveal>
          </div>
        </div>
      </Section>

      {/* 04 · practices */}
      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead title={<>Four practices.<br />One <em className="serif-em">operating model.</em></>} lede="Start with the one your pipeline needs. Most clients add a second within a year, because they share the same account universe, messaging system and weekly review." />
          <Link href="/practices" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">All practices <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {practices.map((p, i) => <PracticeCard key={p.slug} p={p} i={i} />)}
        </div>
      </Section>

      {/* 05 · GTM AI Twin — the one ink moment */}
      <Section band="ink" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_85%_40%,rgba(255,90,31,.2),transparent_70%)]" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-45" />
        <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="display text-[2.4rem] md:text-[3.7rem]">A twin of your GTM team. <em>Made of agents.</em></h2>
              <p className="lede mt-6">Custom AI agents that take over go-to-market end to end: identify the prospect, research the account, reach out in your voice, handle the replies, book the meeting. You keep the judgement. The twin keeps the pipeline moving.</p>
              <ul className="mt-8 grid gap-2.5 text-sm text-[#c3b9ac] sm:grid-cols-2">
                {["Built on your ICP, wins and voice", "Wired into CRM, email, LinkedIn, calendar", "Supervised until it earns autonomy", "Accountable to meetings, not activity"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5"><span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-ember" />{t}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/gtm-ai-twin" size="lg">Explore the Twin</Button>
                <Button href="/contact?type=gtm-ai-twin" size="lg" variant="ghost" className="border border-white/25 text-[#f6f2ec] hover:border-white/60 hover:bg-white/5">Scope mine</Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6"><Reveal delay={110}><TwinRunLog /></Reveal></div>
        </div>
      </Section>

      {/* 06 · operating model */}
      <Section band="sand">
        <SectionHead title={<>Diagnose. Design. Deploy. <em className="serif-em">Run.</em></>} lede="Every practice, the Twin included, runs on the same four phases and the same weekly report." />
        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          {phases.map((ph, i) => (
            <Reveal key={ph.p} as="li" delay={i * 70} className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-ember" />
                <span className="h-px flex-1 bg-rule" />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-dim">{ph.d}</span>
              </div>
              <div className="font-display text-xl font-semibold tracking-tight">{ph.p}</div>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">{ph.b}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-16 grid gap-10 border-t border-rule pt-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="font-display text-[1.5rem] font-medium leading-[1.2] tracking-[-0.022em] md:text-[1.9rem]">&ldquo;We report the same five numbers every week: accounts engaged, meetings booked, meetings held, opportunities created, and what we are changing next.&rdquo;</p>
            <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted">Kingshuk Hazra · Founder</p>
          </div>
          <div className="md:col-span-7"><StatRow stats={proof.stats} /></div>
        </div>
      </Section>

      {/* 07 · work */}
      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead title={<>Programmes that produced <em className="serif-em">meetings.</em></>} lede="Anonymised by default. Every number traces to a client review or a signed-off study before it ships." />
          <Link href="/work" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">All work <ArrowRight className="size-4" /></Link>
        </div>
        <div className="rail rail--swipe mt-12 lg:grid-cols-3">
          {featuredCases.map((c, i) => <CaseTile key={c.slug} c={c} i={i} />)}
        </div>
      </Section>

      {/* 08 · operators */}
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead title={<>Operators, <em className="serif-em">not an agency.</em></>} lede="The founders ran marketing for global vendors in India before starting LeadStrategus in 2018. Every engagement is led by someone who has carried the number." />
            <Button href="/about" variant="outline" className="mt-8">About the firm</Button>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {authors.map((a, i) => (
                <Reveal key={a.slug} delay={i * 80} className="h-full">
                  <Link href={`/authors/${a.slug}`} className="card card-hover group flex h-full flex-col p-6">
                    <div className="flex size-14 items-center justify-center rounded-full bg-ember-wash font-display text-xl font-semibold text-ember-ink">{a.name.split(" ").map((s) => s[0]).join("")}</div>
                    <div className="mt-6 font-display text-xl font-semibold tracking-tight">{a.name}</div>
                    <div className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ember-ink">{a.role}</div>
                    <p className="mt-4 text-sm leading-relaxed text-muted"><Copy text={a.bio} /></p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm text-muted transition-colors group-hover:text-ember-ink">Profile <ArrowUpRight className="size-4" /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 border-y border-rule py-5">
          <Marquee speed="64s" items={proof.verticals.map((v) => <span key={v} className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-dim">{v}</span>)} />
        </div>
      </Section>

      {/* 09 · portal */}
      <Section band="kraft">
        <SectionHead title={<>There is a <em className="serif-em">second</em> LeadStrategus.</>} lede="This site is the people. The agents have their own address. Move the seam to see the other side, then cross over." />
        <Reveal className="mt-11"><Portal /></Reveal>
        <p className="mt-3 text-right font-mono text-[0.66rem] uppercase tracking-[0.13em] text-dim">
          <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ember-ink">leadstrategus.ai ↗</a>
        </p>
      </Section>

      {/* 10 · insights */}
      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead title={<>Written from the <em className="serif-em">pipeline.</em></>} />
          <Link href="/insights" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">All insights <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-10 divide-y divide-rule border-y border-rule">
          {insightsByDate.slice(0, 3).map((i, idx) => (
            <Reveal key={i.slug} delay={idx * 60}>
              <Link href={`/insights/${i.slug}`} className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:py-7">
                <div className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-muted md:col-span-3">{getCluster(i.cluster)?.name} · {formatDate(i.date)}</div>
                <div className="md:col-span-8">
                  <div className="font-display text-[1.2rem] font-semibold tracking-[-0.028em] transition-colors group-hover:text-ember-ink md:text-[1.45rem]">{i.title}</div>
                  <p className="mt-1.5 max-w-2xl text-sm text-muted">{i.dek}</p>
                </div>
                <ArrowUpRight className="hidden size-5 justify-self-end text-dim transition-colors group-hover:text-ember-ink md:col-span-1 md:block" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 11 · faq */}
      <Section band="sand"><FAQBlock items={homeFaq} /></Section>

      {/* 12 · cta */}
      <CTABand
        title={<>Tell us what is <em>not converting.</em></>}
        lede="Thirty minutes with a founder. We will tell you which practice fits, what it costs, and whether a twin makes sense for your motion."
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: "Send an enquiry", href: "/contact" }}
      />
    </>
  );
}
