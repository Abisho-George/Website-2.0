import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconPlate } from "@/components/ui/IconPlate";
import { JsonLd } from "@/components/ui/JsonLd";
import { StaggerItem } from "@/components/motion/Stagger";
import { Breadcrumb, CTABand } from "@/components/site/Blocks";
import { HeroFrame } from "@/components/site/HeroFrame";
import { ServiceCard } from "@/components/site/ServiceGrid";
import { ValueChain } from "@/components/site/ValueChain";
import { CaseTeaser } from "@/components/site/CaseTeaser";
import { FieldPlate } from "@/components/ui/Atmos";
import { iconFor } from "@/components/icons/registry";
import { services, getService, servicesFor, serviceHref } from "@/content/services";
import { getGroup, groupHref as groupHrefFor } from "@/content/practices";
import { casesFor } from "@/content/work";
import { enquiryFor } from "@/lib/enquiry";
import { buildMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

/**
 * One service page. Every word of the four sections is the master portfolio's
 * own copy (src/content/services.ts is generated from it), and the section
 * headings are the document's own questions, asked as headings rather than
 * labelled with small letters above them.
 *
 * GTM AI Twin is one of the thirty-six but has its own page at /gtm-ai-twin,
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s || s.href) notFound();
  const group = getGroup(s.group)!;
  // a platform's services link out to the platform's own website
  const groupHref = groupHrefFor(group);
  const groupPaged = group.kind === "family";
  const siblings = servicesFor(s.group).filter((x) => x.slug !== s.slug);
  const cases = casesFor(s.slug).slice(0, 4);
  const path = `/services/${s.slug}`;

  // the three portfolio questions, phrased for an answer engine with the
  // service named, since a bare "What is the service?" means nothing out of context
  const qa = [
    { q: `What is ${s.name}?`, a: s.what },
    { q: `Why is ${s.name} important now?`, a: s.whyNow },
    { q: `Why choose LeadStrategus for ${s.name}?`, a: s.whyUs.join(" ") },
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

      <HeroFrame
        size="md"
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              ...(groupPaged ? [{ label: group.short, href: groupHref }] : []),
              { label: s.name },
            ]}
          />
        }
        eyebrow={group.name}
        title={s.name}
        lede={s.tagline}
        scene={<FieldPlate fx="78%" fy="40%" />}
        actions={
          <>
            <Button href={`/contact?type=${enquiryFor(s.group)}`} size="lg">Talk about {s.name}</Button>
            <Button href="/book" size="lg" variant="outline">Book a strategy call</Button>
          </>
        }
        aside={
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <IconPlate icon={iconFor(s.slug)} size="md" />
              <p className="text-sm leading-snug text-muted">
                Where {s.name} sits in the revenue engine
              </p>
            </div>
            <ValueChain stages={s.stages} className="mt-5" />
          </div>
        }
      />

      <Section className="hero-next" pad="loose">
        <SectionHead layout="split" title="What is the service?" lede={s.what} />
      </Section>

      <Section band="sand" pad="loose">
        <SectionHead layout="split" title="Why is it important now?" lede={s.whyNow} />
      </Section>

      <Section pad="loose">
        <Reveal><h2 className="h2 balance">Why LeadStrategus?</h2></Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {s.whyUs.map((b, i) => (
            <StaggerItem as="li" key={b} i={i} className="card flex gap-4 p-6">
              <span className="plate plate--sm mt-0.5 shrink-0" aria-hidden><Check className="size-4" /></span>
              <p className="text-[1rem] leading-relaxed text-fg-soft">{b}</p>
            </StaggerItem>
          ))}
        </ul>
      </Section>

      {cases.length > 0 && (
        <Section band="sand" pad="loose">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal><h2 className="h2 balance">Case studies</h2></Reveal>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">
              All case studies <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {cases.map((c, i) => <CaseTeaser key={c.slug} c={c} i={i} />)}
          </div>
        </Section>
      )}

      {siblings.length > 0 && (
        <Section pad="tight">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h3">More in {group.name}</h2>
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
          <p className="mt-8 text-[0.85rem] leading-relaxed text-dim">
            Also known as: {s.seoTerms.join(", ")}.
          </p>
        </Section>
      )}

      <CTABand
        title={s.close}
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: `Talk about ${s.name}`, href: `/contact?type=${enquiryFor(s.group)}` }}
      />
    </>
  );
}

export const dynamicParams = false;
