import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Info } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Copy } from "@/components/ui/Copy";
import { Stat } from "@/components/ui/Stat";
import { IconPlate } from "@/components/ui/IconPlate";
import { JsonLd } from "@/components/ui/JsonLd";
import { Bloom } from "@/components/ui/Atmos";
import { Breadcrumb, CTABand } from "@/components/site/Blocks";
import { CaseTeaser } from "@/components/site/CaseTeaser";
import { iconFor } from "@/components/icons/registry";
import { caseStudies, getCase } from "@/content/work";
import { getService, serviceHref } from "@/content/services";
import { getGroup } from "@/content/practices";
import { buildMetadata, breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug);
  if (!c) return {};
  return buildMetadata({
    title: c.title,
    description: `${c.client}, ${c.vertical}. ${c.summary}`,
    path: `/work/${c.slug}`,
    type: "article",
    keywords: [...c.tags, c.vertical, "case study"],
    // a sample is a placeholder, not proof: keep it out of search until it is real
    noIndex: c.sample,
  });
}

/**
 * One case study, in the master portfolio's case-study format:
 * Situation → Question → What LeadStrategus did → Evidence / deliverables
 * → Outcome → What changed in the client's GTM motion.
 */
export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const group = getGroup(c.group);
  const svc = c.services.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = caseStudies.filter((x) => x.slug !== c.slug && x.services.some((s) => c.services.includes(s))).slice(0, 2);
  const path = `/work/${c.slug}`;

  return (
    <>
      <JsonLd
        data={[
          caseStudyJsonLd({ title: c.title, description: c.summary, path, services: svc.map((s) => ({ name: s.name, path: serviceHref(s) })), sample: c.sample }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case studies", path: "/work" }, { name: c.title, path }]),
        ]}
      />

      <section className="band relative overflow-hidden pt-[var(--nav-h)]">
        <Bloom hue="ember" at="tr" size={52} />
        <div className="container-x relative py-12 md:py-16">
          <Breadcrumb items={[{ label: "Case studies", href: "/work" }, { label: c.vertical }]} />
          {c.sample && (
            <Reveal className="mt-7 inline-flex max-w-2xl items-start gap-2.5 rounded-[var(--radius-md)] border border-rule-strong bg-sand px-4 py-3 text-[0.88rem] leading-snug text-fg-soft">
              <Info className="mt-0.5 size-4 shrink-0 text-ember-ink" aria-hidden />
              <span>
                <strong className="font-semibold text-fg">Sample case study.</strong> This page shows the shape of a published case study. The client is anonymous and every figure is a placeholder until a signed-off study replaces it.
              </span>
            </Reveal>
          )}
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-muted">{c.client} · {c.region}</p>
                <h1 className="display-2 mt-3 balance"><Copy text={c.title} /></h1>
              </Reveal>
              <Reveal delay={90}><p className="lede mt-6">{c.summary}</p></Reveal>
            </div>
            <Reveal delay={140} className="lg:col-span-5">
              <div className="surface p-6 md:p-7">
                <div className="grid grid-cols-3 gap-4">
                  {c.stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} size="md" />)}
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-rule pt-5">
                  {svc.map((s) => (
                    <Link key={s.slug} href={serviceHref(s)} className="inline-flex items-center gap-1.5 rounded-full border border-rule px-2.5 py-1 text-[0.76rem] text-muted transition-colors hover:border-ember/40 hover:text-ember-ink">
                      <IconPlate icon={iconFor(s.slug)} presentation="bare" size="sm" />
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section width="text" pad="loose" className="hero-next">
        <article className="prose-ls max-w-none">
          <h2>Situation</h2>
          <p>{c.situation}</p>

          <h2>The question</h2>
          <p className="font-display text-[1.35rem] leading-snug text-fg">{c.question}</p>

          <h2>What LeadStrategus did</h2>
          <ul>{c.whatWeDid.map((x) => <li key={x}>{x}</li>)}</ul>

          <h2>Evidence and deliverables</h2>
          <ul className="!list-none !pl-0">
            {c.evidence.map((x) => (
              <li key={x} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-ember" aria-hidden />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <h2>Outcome</h2>
          <p><Copy text={c.outcome} /></p>

          <h2>What changed in the GTM motion</h2>
          <blockquote>{c.whatChanged}</blockquote>
        </article>
      </Section>

      {group && group.kind !== "capability" && (
        <Section pad="tight" width="text">
          <p className="text-[0.95rem] text-muted">
            Part of{" "}
            <Link href={`/practices/${group.slug}`} className="link-u text-fg">{group.name}</Link>.
          </p>
        </Section>
      )}

      {more.length > 0 && (
        <Section band="sand" pad="tight">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h3">Related case studies</h2>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">
              All case studies <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {more.map((x, i) => <CaseTeaser key={x.slug} c={x} i={i} />)}
          </div>
        </Section>
      )}

      <CTABand
        title={<>Your programme could be <em>next.</em></>}
        primary={{ label: "Book a strategy call", href: "/book" }}
        secondary={{ label: "See every service", href: "/services" }}
      />
    </>
  );
}

