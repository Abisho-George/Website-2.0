import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconPlate } from "@/components/ui/IconPlate";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumb } from "@/components/site/Blocks";
import { ServiceCard } from "@/components/site/ServiceGrid";
import { UseCaseCard } from "@/components/site/UseCaseCard";
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

/**
 * One service page, kept deliberately plain: a hero that says what the
 * service is (no side panel), one band for why now and why us, the use cases, related
 * services and a closing call. Grounds are solid colours with hard edges
 * (the .page-solid scope), and the rhythm is tighter than the rest of the site.
 */
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s || s.href) notFound();
  const group = getGroup(s.group)!;
  // a platform's services link out to the platform's own website
  const groupHref = groupHrefFor(group);
  const groupPaged = group.kind === "family";
  const siblings = servicesFor(s.group).filter((x) => x.slug !== s.slug);
  const { own, related } = useCasesForService(s.slug);
  const path = `/services/${s.slug}`;
  const enquiry = `/contact?type=${enquiryFor(s.group)}`;

  // the three portfolio questions, phrased for an answer engine with the
  // service named, since a bare "What is the service?" means nothing out of context
  const qa = [
    { q: `What is ${s.name}?`, a: s.what },
    { q: `Why is ${s.name} important now?`, a: s.whyNow },
    { q: `Why choose LeadStrategus for ${s.name}?`, a: s.whyUs.join(" ") },
  ];

  return (
    <div className="page-solid">
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

      {/* hero: what it is */}
      <section className="bg-paper pt-[var(--nav-h)]">
        <div className="container-x py-10 md:py-14">
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              ...(groupPaged ? [{ label: group.short, href: groupHref }] : []),
              { label: s.name },
            ]}
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <Reveal className="lg:col-span-6">
              <Link href={groupHref} className="inline-flex items-center gap-2.5 rounded-full bg-ember-wash py-1 pl-1 pr-4 text-[0.88rem] font-semibold text-ember-ink hover:bg-ember hover:text-white">
                <IconPlate icon={iconFor(s.slug)} size="sm" />
                {group.name}
              </Link>
              <h1 className="mt-6 font-display text-[2.2rem] font-bold leading-[1.06] tracking-[-0.02em] balance sm:text-[2.7rem] lg:text-[3.3rem]">{s.name}</h1>
              <p className="mt-4 font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.015em] text-ember md:text-[1.45rem]">{s.tagline}.</p>
            </Reveal>
            <Reveal delay={90} className="lg:col-span-6">
              <p className="text-[1.05rem] leading-relaxed text-fg-soft md:text-[1.12rem]">{s.what}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={enquiry} size="lg">Talk to us about this</Button>
                <Button href="/book" size="lg" variant="outline">Book a strategy call</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* why now, why us */}
      <Section band="sand" pad="tight">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h2 className="h3">Why it matters now</h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-fg-soft">{s.whyNow}</p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <h2 className="h3">Why LeadStrategus</h2>
            <ul className="mt-4 space-y-3">
              {s.whyUs.map((b) => (
                <li key={b} className="flex gap-3 rounded-[var(--radius-md)] bg-paper p-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ember text-white"><Check className="size-3.5" aria-hidden /></span>
                  <span className="text-[1rem] leading-relaxed text-fg">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* use cases: two small cards and a way into the library */}
      {(own.length > 0 || related.length > 0) && (
        <Section pad="tight">
          <h2 className="h3">{s.name} in action</h2>
          <div className="rail rail--swipe mt-6 md:grid-cols-2 lg:grid-cols-3">
            {(own.length ? own : related).slice(0, 2).map((u, i) => <UseCaseCard key={u.slug} u={u} i={i} showService={false} />)}
            <Link
              href={`/use-cases?family=${encodeURIComponent((own[0] ?? related[0]).family)}`}
              className="group flex flex-col justify-between rounded-[var(--radius-lg)] bg-ember p-5 text-white transition-colors hover:bg-ember-deep md:p-6"
            >
              <span className="font-display text-[1.25rem] font-bold leading-snug tracking-[-0.015em]">
                See every {group.short} use case
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.92rem] font-semibold">
                Browse use cases <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Section>
      )}

      {/* related services */}
      {siblings.length > 0 && (
        <Section band="sand" pad="tight">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="h3">More in {group.name}</h2>
            {groupPaged && (
              <Link href={groupHref} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ember-ink">
                About this family <ArrowRight className="size-4" />
              </Link>
            )}
            {group.url && (
              <a href={group.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ember-ink">
                Visit {group.name} <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {siblings.slice(0, 6).map((x, i) => <ServiceCard key={x.slug} service={x} variant="compact" i={i} />)}
          </div>
        </Section>
      )}

      {/* close: a solid red band */}
      <section className="bg-ember text-white">
        <div className="container-x flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-14">
          <h2 className="max-w-2xl font-display text-[1.45rem] font-semibold leading-snug tracking-tight md:text-[1.8rem]">{s.close}</h2>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-medium text-ember-ink transition-colors hover:bg-ember-wash">
              Book a strategy call <ArrowRight className="size-4" />
            </Link>
            <Link href={enquiry} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-6 py-3.5 font-medium text-white transition-colors hover:bg-white/10">
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export const dynamicParams = false;
