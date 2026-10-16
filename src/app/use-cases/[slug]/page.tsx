import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { Bloom } from "@/components/ui/Atmos";
import { StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumb, CTABand } from "@/components/site/Blocks";
import { UseCaseRail } from "@/components/site/UseCaseRail";
import { IconPlate } from "@/components/ui/IconPlate";
import { iconFor } from "@/components/icons/registry";
import { useCases, getUseCase, findService, moreLike } from "@/content/use-cases";
import { getService, serviceHref } from "@/content/services";
import { enquiryFor } from "@/lib/enquiry";
import { buildMetadata, breadcrumbJsonLd, useCaseJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const u = getUseCase((await params).slug);
  if (!u) return {};
  return buildMetadata({
    title: u.title,
    description: u.hook,
    path: `/use-cases/${u.slug}`,
    type: "article",
    keywords: [u.service, ...u.related, u.industry, u.family, "use case", "LeadStrategus"],
  });
}

/** A numbered section head: the number in brand red, the title beside it. */
function Head({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[0.75rem] tracking-[0.14em] text-ember-ink">{n}</span>
      <h2 className="h3">{children}</h2>
    </div>
  );
}

/**
 * One use case, in the "Programmes in Action" shape: the story in three beats
 * up top, then situation, the question, what we did, evidence, outcome and
 * what changed in the go-to-market motion.
 */
export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const u = getUseCase((await params).slug);
  if (!u) notFound();
  const path = `/use-cases/${u.slug}`;
  const own = getService(u.serviceSlug);
  const related = u.relatedSlugs.map(getService).filter((s): s is NonNullable<typeof s> => !!s);
  const all = [own, ...related].filter((s): s is NonNullable<typeof s> => !!s);
  const more = moreLike(u);
  const beats = [
    { k: "Challenge", v: u.challenge },
    { k: "Approach", v: u.approach },
    { k: "Result", v: u.result },
  ];
  const glance = Object.entries(u.glance).filter(([k]) => k !== "Industry");

  return (
    <>
      <JsonLd
        data={[
          useCaseJsonLd({ title: u.title, description: u.hook, path, industry: u.industry, services: all.map((s) => ({ name: s.name, path: serviceHref(s) })) }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Use cases", path: "/use-cases" }, { name: u.title, path }]),
        ]}
      />

      {/* hero */}
      <section className="band relative overflow-hidden pt-[var(--nav-h)]">
        <Bloom hue="ember" at="tr" size={56} />
        <div className="container-x relative py-10 md:py-16">
          <Breadcrumb items={[{ label: "Use cases", href: "/use-cases" }, { label: u.family, href: `/use-cases?family=${encodeURIComponent(u.family)}` }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-ember px-3 py-1 text-[0.76rem] font-medium text-white">{u.industry}</span>
                  {own && (
                    <Link href={serviceHref(own)} className="rounded-full border border-rule-strong bg-paper px-3 py-1 text-[0.76rem] text-fg-soft transition-colors hover:border-ember/50 hover:text-ember-ink">
                      {own.name}
                    </Link>
                  )}
                </div>
                <h1 className="display-3 mt-6 balance">{u.title}</h1>
              </Reveal>
              <Reveal delay={90}><p className="lede mt-6 max-w-2xl">{u.hook}</p></Reveal>
            </div>

            <Reveal delay={140} className="lg:col-span-5">
              <aside className="surface p-6 md:p-7">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ember-ink">At a glance</p>
                <dl className="mt-4 divide-y divide-rule">
                  {glance.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3 text-[0.9rem]">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-fg">
                        {k === "Services"
                          ? v.split(/,\s*/).map((name, i, arr) => {
                              const s = findService(name);
                              return (
                                <span key={name}>
                                  {s ? <Link href={serviceHref(s)} className="link-u hover:text-ember-ink">{name}</Link> : name}
                                  {i < arr.length - 1 ? ", " : ""}
                                </span>
                              );
                            })
                          : v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[0.78rem] leading-snug text-dim">{u.note}</p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* the story in three beats */}
      <Section band="blush" pad="tight">
        <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
          {beats.map((b, i) => (
            <StaggerItem
              as="li"
              key={b.k}
              i={i}
              className={cn(
                "relative rounded-[var(--radius-lg)] p-6 md:p-7",
                i === 2 ? "bg-ember text-white shadow-e3" : "border border-ember/15 bg-paper",
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn("font-mono text-[0.7rem] uppercase tracking-[0.14em]", i === 2 ? "text-white/85" : "text-ember-ink")}>
                  0{i + 1} · {b.k}
                </span>
                {i < 2 && <ArrowRight aria-hidden className="hidden size-4 text-ember/60 md:block" />}
              </div>
              <p className={cn("mt-3 font-display text-[1.12rem] font-medium leading-snug tracking-tight md:text-[1.2rem]", i === 2 ? "text-white" : "text-fg")}>{b.v}</p>
            </StaggerItem>
          ))}
        </ol>
      </Section>

      <Section pad="loose" width="mid">
        <div className="space-y-16 md:space-y-20">
          {/* situation */}
          <section>
            <Head n="01">The situation</Head>
            <div className="prose-ls mt-5">{u.situation.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}</div>
          </section>

          {/* the question */}
          <Reveal as="section" className="relative overflow-hidden rounded-[var(--radius-lg)] bg-sand px-6 py-8 md:px-12 md:py-12">
            <Quote aria-hidden className="absolute -right-2 -top-2 size-20 text-ember/10 md:size-28" />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember-ink">02 · The question that mattered</p>
            <p className="relative mt-4 font-display text-[1.4rem] font-medium leading-[1.3] tracking-tight text-fg md:text-[1.85rem]">{u.question}</p>
          </Reveal>

          {/* what we did */}
          <section>
            <Head n="03">What we did</Head>
            <ol className="mt-7 grid gap-4 md:grid-cols-2">
              {u.whatWeDid.map((s, i) => (
                <StaggerItem as="li" key={s.t} i={i} className="card p-6">
                  <span className="font-display text-[2rem] font-semibold leading-none text-ember/25">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-[1.08rem] font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-fg-soft">{s.b}</p>
                </StaggerItem>
              ))}
            </ol>
          </section>

          {/* evidence */}
          <section className="grid gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <Head n="04">What we delivered</Head>
              <p className="mt-3 text-[0.95rem] text-muted">The evidence and working documents the team kept.</p>
            </div>
            <ul className="space-y-3 md:col-span-8">
              {u.evidence.map((x) => (
                <li key={x} className="flex gap-3 rounded-[var(--radius-md)] border border-rule bg-paper px-4 py-3.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ember-wash text-ember-ink"><Check className="size-3.5" aria-hidden /></span>
                  <span className="text-[0.96rem] leading-snug text-fg">{x}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* outcome */}
          <section>
            <Head n="05">The outcome</Head>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {u.outcome.map((o, i) => (
                <StaggerItem key={o.t} i={i} className="rounded-[var(--radius-lg)] border-l-[3px] border-ember bg-ember-wash/60 px-5 py-4">
                  <p className="font-display text-[1.02rem] font-semibold text-ember-ink">{o.t}</p>
                  <p className="mt-1 text-[0.95rem] leading-snug text-fg-soft">{o.b}</p>
                </StaggerItem>
              ))}
            </div>
            {u.outcomeNote && <p className="mt-6 text-[1.02rem] leading-relaxed text-fg">{u.outcomeNote}</p>}
          </section>

          {/* what changed */}
          <section>
            <Head n="06">What changed in the GTM motion</Head>
            <div className="mt-6 rounded-[var(--radius-lg)] border border-ember/20 bg-gradient-to-br from-ember-wash to-paper p-6 text-[1.04rem] leading-relaxed text-fg md:p-9 md:text-[1.12rem]">
              {u.whatChanged.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
          </section>

          {/* services */}
          {all.length > 0 && (
            <section>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-dim">Services in this programme</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {all.map((s) => (
                  <Link
                    key={s.slug}
                    href={serviceHref(s)}
                    className="group inline-flex items-center gap-2 rounded-full border border-rule-strong bg-paper py-1.5 pl-1.5 pr-3.5 text-[0.88rem] text-fg transition-colors hover:border-ember/50 hover:text-ember-ink"
                  >
                    <IconPlate icon={iconFor(s.slug)} presentation="bare" size="sm" />
                    {s.name}
                    <ArrowUpRight className="size-3.5 text-dim transition-colors group-hover:text-ember-ink" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </Section>

      <UseCaseRail items={more} band="sand" title={<>More programmes like this</>} family={u.family} />

      <CTABand
        title={u.ctaHook}
        lede="Tell us where it is stuck. A founder replies within one working day."
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: "Send an enquiry", href: `/contact?type=${enquiryFor(u.group)}` }}
      />
    </>
  );
}
