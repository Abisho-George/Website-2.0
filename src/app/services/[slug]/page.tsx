import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconPlate } from "@/components/ui/IconPlate";
import { JsonLd } from "@/components/ui/JsonLd";
import { StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumb, CTABand } from "@/components/site/Blocks";
import { ServiceCard } from "@/components/site/ServiceGrid";
import { ValueChain } from "@/components/site/ValueChain";
import { UseCaseCard } from "@/components/site/UseCaseCard";
import { Bloom, FieldPlate } from "@/components/ui/Atmos";
import { iconFor } from "@/components/icons/registry";
import { services, getService, servicesFor, serviceHref } from "@/content/services";
import { getGroup, groupHref as groupHrefFor } from "@/content/practices";
import { useCasesForService } from "@/content/use-cases";
import { enquiryFor } from "@/lib/enquiry";
import { buildMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

/**
 * One service page. Every word of the four sections is the master portfolio's
 * own copy (src/content/services.ts is generated from it), and the section
 * headings are the document's own questions, asked as headings rather than
 * labelled with small letters above them.
 *
 * Lead Gen AI Twin is one of the thirty-six but has its own page at /lead-gen-ai-twin,
 * so it is not generated here; /services/gtm-ai-twin redirects there.
 */
export function generateStaticParams() {
  return services.filter((s) => !s.href).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) return {};
  const group = getGroup(s.group);
  return buildMetadata({
    title: s.name,
    // the definition reads as a search snippet on its own; the tagline leads
    description: `${s.tagline}. ${s.what}`,
    path: `/services/${s.slug}`,
    keywords: [s.name, ...s.seoTerms, group?.name ?? "", "LeadStrategus"].filter(Boolean),
  });
}

/** A section label: number in brand red, then the name, set in mono. */
function Kicker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted">
      <span className="text-ember-ink">{n}</span>
      <span aria-hidden className="h-px w-6 bg-ember/40" />
      {children}
    </p>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s || s.href) notFound();
  const group = getGroup(s.group)!;
  // a platform's services link out to the platform's own website
  const groupHref = groupHrefFor(group);
  const groupPaged = group.kind === "family";
  const siblings = servicesFor(s.group).filter((x) => x.slug !== s.slug);
  const { own, related } = useCasesForService(s.slug);
  const industries = Array.from(new Set([...own, ...related].map((u) => u.industry)));
  const path = `/services/${s.slug}`;
  const enquiry = `/contact?type=${enquiryFor(s.group)}`;

  // the three portfolio questions, phrased for an answer engine with the
  // service named, since a bare "What is the service?" means nothing out of context
  const qa = [
    { q: `What is ${s.name}?`, a: s.what },
    { q: `Why is ${s.name} important now?`, a: s.whyNow },
    { q: `Why choose LeadStrategus for ${s.name}?`, a: s.whyUs.join(" ") },
  ];

  const anchors = [
    ["what", "What it is"],
    ["why-now", "Why now"],
    ["why-us", "Why LeadStrategus"],
    ...(own.length || related.length ? [["in-action", "In action"]] : []),
    ...(siblings.length ? [["related", "Related services"]] : []),
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: s.name, description: s.what, path, category: group.name, alternateNames: s.seoTerms, questions: qa }),
          faqJsonLd(qa),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            ...(groupPaged ? [{ name: group.name, path: groupHref }] : []),
            { name: s.name, path },
          ]),
        ]}
      />

      {/* hero */}
      <section className="band relative overflow-hidden pt-[var(--nav-h)]">
        <Bloom hue="ember" at="tr" size={60} />
        <FieldPlate fx="82%" fy="34%" />
        <div className="container-x relative py-10 md:py-16 lg:py-20">
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              ...(groupPaged ? [{ label: group.short, href: groupHref }] : []),
              { label: s.name },
            ]}
          />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <Link href={groupHref} className="inline-flex items-center gap-2 rounded-full border border-ember/25 bg-ember-wash py-1 pl-1 pr-3.5 text-[0.8rem] font-medium text-ember-ink transition-colors hover:border-ember/50">
                  <IconPlate icon={iconFor(s.slug)} presentation="bare" size="sm" />
                  {group.name}
                </Link>
                <h1 className="display-2 mt-6 balance">{s.name}</h1>
                <p className="mt-5 font-display text-[1.3rem] font-medium leading-snug tracking-tight text-ember-ink md:text-[1.7rem]">{s.tagline}.</p>
              </Reveal>
              <Reveal delay={120} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={enquiry} size="lg">Talk about {s.name}</Button>
                <Button href="/book" size="lg" variant="outline">Book a strategy call</Button>
              </Reveal>
              {own.length > 0 && (
                <Reveal delay={180} className="mt-10 max-w-2xl border-t border-rule pt-6">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-dim">See it in action</p>
                  <ul className="mt-3 space-y-2">
                    {own.slice(0, 2).map((u) => (
                      <li key={u.slug}>
                        <Link href={`/use-cases/${u.slug}`} className="group flex items-start gap-3 text-[0.98rem] leading-snug text-fg transition-colors hover:text-ember-ink">
                          <span className="mt-0.5 shrink-0 rounded-full bg-ember-wash px-2 py-0.5 text-[0.7rem] font-medium text-ember-ink">{u.industry}</span>
                          <span className="link-u">{u.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>

            <Reveal delay={140} className="lg:col-span-5">
              <aside className="surface overflow-hidden">
                {/* the full chain is a desktop aside; a phone gets the lit stages only */}
                <div className="hidden p-6 md:p-7 lg:block">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ember-ink">Where it sits in the revenue engine</p>
                  <ValueChain stages={s.stages} className="mt-4" />
                </div>
                <div className="flex flex-wrap items-center gap-2 p-5 lg:hidden">
                  <span className="mr-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ember-ink">Revenue stage</span>
                  {s.stages.map((st) => (
                    <span key={st} className="rounded-full bg-ember px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white">{st.toLowerCase().replace(" / ", " & ")}</span>
                  ))}
                </div>
                {(own.length > 0 || related.length > 0) && (
                  <div className="grid grid-cols-2 border-t border-rule bg-sand/60">
                    <a href="#in-action" className="group border-r border-rule p-5 transition-colors hover:bg-ember-wash">
                      <span className="block font-display text-[2rem] font-semibold leading-none text-fg tnum">{own.length + related.length}</span>
                      <span className="mt-1.5 block text-[0.8rem] text-muted group-hover:text-ember-ink">use cases</span>
                    </a>
                    <div className="p-5">
                      <span className="block font-display text-[2rem] font-semibold leading-none text-fg tnum">{industries.length}</span>
                      <span className="mt-1.5 block text-[0.8rem] text-muted">industries</span>
                    </div>
                  </div>
                )}
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* in-page navigation */}
      <div className="sticky top-[var(--nav-h)] z-30 border-y border-rule bg-paper/95 backdrop-blur-xl">
        <div className="container-x scrollbar-none flex gap-6 overflow-x-auto py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
          {anchors.map(([id, l]) => <a key={id} href={`#${id}`} className="shrink-0 text-muted transition-colors hover:text-ember-ink">{l}</a>)}
        </div>
      </div>

      {/* what it is */}
      <Section id="what" pad="loose" className="scroll-mt-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Kicker n="01">What it is</Kicker>
            <h2 className="h2 mt-4 balance">What is {s.name}?</h2>
          </Reveal>
          <Reveal delay={60} className="lg:col-span-8">
            <p className="font-display text-[1.25rem] font-medium leading-[1.45] tracking-tight text-fg md:text-[1.6rem]">{s.what}</p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[0.8rem] text-dim">Also known as</span>
              {s.seoTerms.map((t) => (
                <span key={t} className="rounded-full border border-rule bg-paper px-3 py-1 text-[0.8rem] text-fg-soft">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* why now */}
      <Section id="why-now" band="blush" pad="loose" className="scroll-mt-32">
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="flex justify-center"><Kicker n="02">Why it matters now</Kicker></div>
            <span aria-hidden className="mx-auto mt-6 block font-display text-[5rem] leading-[0.5] text-ember/30">&ldquo;</span>
            <p className="mt-2 font-display text-[1.3rem] font-medium leading-[1.42] tracking-tight text-fg balance md:text-[1.8rem]">{s.whyNow}</p>
          </Reveal>
        </div>
      </Section>

      {/* why us */}
      <Section id="why-us" pad="loose" className="scroll-mt-32">
        <Reveal>
          <Kicker n="03">Why LeadStrategus</Kicker>
          <h2 className="h2 mt-4 max-w-3xl balance">Why teams choose us for {s.name}.</h2>
        </Reveal>
        <ul className="rail rail--swipe mt-10 md:grid-cols-3 md:gap-5">
          {s.whyUs.map((b, i) => (
            <StaggerItem
              as="li"
              key={b}
              i={i}
              className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-paper p-6 transition-[border-color,box-shadow] duration-[var(--dur-1)] hover:border-ember/40 hover:shadow-e3 md:p-7"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-ember transition-transform duration-[var(--dur-2)] group-hover:scale-x-100" />
              <span className="font-display text-[2.6rem] font-semibold leading-none text-ember">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-fg-soft">{b}</p>
            </StaggerItem>
          ))}
        </ul>
      </Section>

      {/* in action */}
      {(own.length > 0 || related.length > 0) && (
        <Section id="in-action" band="sand" pad="loose" className="scroll-mt-32">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Reveal className="max-w-2xl">
              <Kicker n="04">Use cases</Kicker>
              <h2 className="h2 mt-4 balance">{s.name} <em className="serif-em">in action.</em></h2>
              <p className="lede mt-4">How this service plays out with real buying situations, by industry.</p>
            </Reveal>
            <Link href={`/use-cases?family=${encodeURIComponent(own[0]?.family ?? related[0].family)}`} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ember-ink transition-colors hover:text-ember-deep">
              All use cases <ArrowRight className="size-4" />
            </Link>
          </div>
          {own.length > 0 && (
            <div className="rail rail--swipe mt-10 md:grid-cols-2">
              {own.map((u, i) => <UseCaseCard key={u.slug} u={u} i={i} showService={false} />)}
            </div>
          )}
          {related.length > 0 && (
            <div className="mt-10">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-dim">{own.length ? "Also part of these programmes" : "Part of these programmes"}</p>
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {related.slice(0, 6).map((u) => (
                  <li key={u.slug}>
                    <Link href={`/use-cases/${u.slug}`} className="group flex h-full items-start justify-between gap-4 rounded-[var(--radius-md)] border border-rule bg-paper px-4 py-3.5 transition-colors hover:border-ember/40">
                      <span>
                        <span className="block text-[0.72rem] font-medium text-ember-ink">{u.industry} · {u.service}</span>
                        <span className="mt-1 block text-[0.94rem] leading-snug text-fg group-hover:text-ember-ink">{u.title}</span>
                      </span>
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-dim transition-colors group-hover:text-ember-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {/* related services */}
      {siblings.length > 0 && (
        <Section id="related" pad="loose" className="scroll-mt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker n={own.length || related.length ? "05" : "04"}>Related services</Kicker>
              <h2 className="h3 mt-4">More in {group.name}</h2>
            </div>
            {groupPaged && (
              <Link href={groupHref} className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">
                About this family <ArrowRight className="size-4" />
              </Link>
            )}
            {group.url && (
              <a href={group.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">
                Visit {group.name} <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {siblings.slice(0, 6).map((x, i) => <ServiceCard key={x.slug} service={x} variant="compact" i={i} />)}
          </div>
        </Section>
      )}

      <CTABand
        title={s.close}
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: `Talk about ${s.name}`, href: enquiry }}
      />
    </>
  );
}

export const dynamicParams = false;
