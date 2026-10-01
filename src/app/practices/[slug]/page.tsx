import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { IconPlate } from "@/components/ui/IconPlate";
import { JsonLd } from "@/components/ui/JsonLd";
import { FieldPlate } from "@/components/ui/Atmos";
import { Breadcrumb, CTABand, FAQBlock } from "@/components/site/Blocks";
import { HeroFrame } from "@/components/site/HeroFrame";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { ValueChain } from "@/components/site/ValueChain";
import { CaseTeaser } from "@/components/site/CaseTeaser";
import { practiceIconFor } from "@/components/icons/registry";
import { pagedGroups, getGroup } from "@/content/practices";
import { servicesFor, serviceHref, valueChain } from "@/content/services";
import { caseStudies } from "@/content/work";
import { site } from "@/content/site";
import { enquiryFor } from "@/lib/enquiry";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceListJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return pagedGroups.map((g) => ({ slug: g.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGroup((await params).slug);
  if (!g) return {};
  const members = servicesFor(g.slug);
  return buildMetadata({
    title: g.name,
    description: `${g.tagline} ${g.summary}`,
    path: `/practices/${g.slug}`,
    keywords: [g.name, ...members.map((s) => s.name), ...members.flatMap((s) => s.seoTerms.slice(0, 2))],
  });
}

export default async function FamilyPage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGroup((await params).slug);
  if (!g || g.kind === "capability") notFound();
  const members = servicesFor(g.slug);
  const memberSlugs = new Set(members.map((s) => s.slug));
  // the stages this family covers, in chain order
  const stages = valueChain.filter((st) => members.some((s) => s.stages.includes(st)));
  const cases = caseStudies.filter((c) => c.services.some((x) => memberSlugs.has(x))).slice(0, 4);
  const path = `/practices/${g.slug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceListJsonLd(g.name, path, members.map((s) => ({ name: s.name, path: serviceHref(s) }))),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: g.name, path }]),
          ...(g.faq.length ? [faqJsonLd(g.faq)] : []),
        ]}
      />

      <HeroFrame
        size="md"
        breadcrumb={<Breadcrumb items={[{ label: "Services", href: "/services" }, { label: g.short }]} />}
        title={g.name}
        lede={g.summary}
        scene={<FieldPlate fx="80%" fy="35%" />}
        actions={
          <>
            <Button href={`/contact?type=${enquiryFor(g.slug)}`} size="lg">Talk to us about {g.short}</Button>
            {g.slug === "leadstrategus-ai" ? (
              <Button href={site.aiUrl} external size="lg" variant="outline">Visit LeadStrategus.ai</Button>
            ) : (
              <Button href="/book" size="lg" variant="outline">Book a strategy call</Button>
            )}
          </>
        }
        aside={
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <IconPlate icon={practiceIconFor(g.slug)} size="md" />
              <p className="font-display text-[1.05rem] font-medium leading-snug text-ember-ink">{g.tagline}</p>
            </div>
            <ValueChain stages={stages} className="mt-5" />
          </div>
        }
      />

      <Section className="hero-next">
        <SectionHead title={`${members.length} services in ${g.short}`} />
        <ServiceGrid services={members} className="mt-10" />
        {g.slug === "leadstrategus-ai" && (
          <p className="mt-8 text-[0.95rem] text-muted">
            The GTM AI Twin has its own page.{" "}
            <Link href="/gtm-ai-twin" className="link-u text-fg">See how it works</Link>, or{" "}
            <a href={site.aiUrl} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1 text-fg">
              visit LeadStrategus.ai <ArrowUpRight className="size-3.5" />
            </a>
            .
          </p>
        )}
      </Section>

      {cases.length > 0 && (
        <Section band="sand">
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

      {g.pricing && (
        <Section pad="tight" width="mid">
          <Reveal className="card grid gap-6 p-7 md:grid-cols-12 md:items-center md:p-9">
            <div className="md:col-span-8">
              <h2 className="h3">How it is priced</h2>
              <p className="mt-2 text-fg-soft">{g.pricing.model}</p>
              <p className="mt-2 text-sm text-muted">{g.pricing.note}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="text-sm text-muted">From</p>
              <p className="display-3"><Copy text={g.pricing.from} /></p>
              <Link href="/pricing" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ember-ink">
                All pricing <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </Section>
      )}

      {g.faq.length > 0 && (
        <Section band="sand">
          <FAQBlock items={g.faq} title={`${g.short}, answered plainly.`} />
        </Section>
      )}

      <CTABand
        title={<>{g.tagline.replace(/\.$/, "")}<em>.</em></>}
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: "See every service", href: "/services" }}
      />
    </>
  );
}
