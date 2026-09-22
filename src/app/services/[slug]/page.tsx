import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Copy, strip } from "@/components/ui/Copy";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumb, CTABand, FAQBlock } from "@/components/site/Blocks";
import { HeroArt } from "@/components/visual/HeroArt";
import { Bloom, FieldPlate } from "@/components/ui/Atmos";
import { services, getService, servicesFor } from "@/content/services";
import { getPractice } from "@/content/practices";
import { buildMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug); if (!s) return {};
  return buildMetadata({ title: s.name, description: strip(s.summary), path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug); if (!s) notFound();
  const practice = getPractice(s.practiceSlug)!;
  const siblings = servicesFor(s.practiceSlug).filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[
        serviceJsonLd({ name: s.name, description: strip(s.summary), path: `/services/${s.slug}` }),
        faqJsonLd(s.faq),
        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }]),
      ]} />

      <section className="band relative overflow-hidden pt-[var(--nav-h)]">
        <FieldPlate />
        <div className="container-x relative py-12 md:py-16">
          <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: practice.short, href: `/practices/${practice.slug}` }, { label: s.name }]} />
          <div className="mt-9 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal><h1 className="display text-[2.5rem] sm:text-[3.2rem] md:text-[4rem]">{s.name}</h1></Reveal>
              <Reveal delay={80}><p className="mt-5 font-display text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-muted md:text-[1.6rem]">{s.tagline}</p></Reveal>
              <Reveal delay={140}><p className="lede mt-6 max-w-2xl">{s.summary}</p></Reveal>
              <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
                <Button href={`/contact?type=${practice.slug}`} size="lg">Talk about {s.name}</Button>
                <Button href="/book" size="lg" variant="outline">Book a call</Button>
              </Reveal>
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              <div className="ml-auto max-w-[440px] rounded-[var(--radius-xl)] border border-rule bg-sand p-8">
                <HeroArt variant={s.practiceSlug} className="h-auto w-full" />
                <div className="mt-6 flex items-center justify-between border-t border-rule pt-4 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted">
                  <Link href={`/practices/${practice.slug}`} className="transition-colors hover:text-ember-ink">{practice.short}</Link>
                  <span className="text-dim">{s.timeline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section band="sand">
        <div className="grid gap-4 md:grid-cols-3">
          {[["Who it is for", s.forWho], ["Timeline", s.timeline], ["Price", s.pricing]].map(([k, v]) => (
            <Reveal key={k} className="card p-6">
              <div className="font-mono text-[0.66rem] uppercase tracking-[0.15em] text-muted">{k}</div>
              <p className="mt-3 leading-relaxed"><Copy text={v} /></p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="h2 balance">What the engagement includes.</h2>
            <p className="lede mt-4">Scope is fixed in the proposal. If something is not on this list, it is not in the price — and we will say so before you sign rather than after.</p>
            <Button href="/services" variant="outline" className="mt-8">All services</Button>
          </div>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-rule border-y border-rule">
              {s.includes.map((x, i) => (
                <Reveal key={x} as="li" delay={i * 50} className="flex gap-4 py-4">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-ember" />
                  <span className="leading-relaxed"><Copy text={x} /></span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section band="kraft" tight>
        <h2 className="h2 balance">What you end up with.</h2>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {s.deliverables.map((dv, i) => (
            <Reveal key={dv} delay={i * 60} className="card p-5">
              <div className="mb-4 h-px w-9 bg-ember" />
              <p className="font-medium leading-snug"><Copy text={dv} /></p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tight>
        <Reveal className="grid gap-8 rounded-[var(--radius-xl)] border border-ember/30 bg-ember-wash p-8 md:grid-cols-12 md:items-center md:p-10">
          <div className="md:col-span-5">
            <h2 className="h3">{s.timeline}, at a fixed price.</h2>
            <p className="mt-3 text-muted">Part of the {practice.name} practice.</p>
          </div>
          <div className="md:col-span-7">
            <div className="display text-[1.7rem] md:text-[2.2rem]"><Copy text={s.pricing} /></div>
            <p className="mt-3 text-muted">Scoped on a thirty-minute call. Existing clients of this practice usually find it sits inside their retainer.</p>
            <Button href={`/contact?type=${practice.slug}`} className="mt-7">Get a scoped proposal</Button>
          </div>
        </Reveal>
      </Section>

      {s.faq.length > 0 && <Section band="sand"><FAQBlock items={s.faq} title={`Questions about ${s.name}.`} /></Section>}

      {siblings.length > 0 && (
        <Section tight>
          <div className="flex items-end justify-between gap-4">
            <h2 className="h3">More in {practice.short}</h2>
            <Link href={`/practices/${practice.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember-ink">
              The practice <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {siblings.map((x, i) => (
              <Reveal key={x.slug} delay={i * 60} className="h-full">
                <Link href={`/services/${x.slug}`} className="card card-hover group flex h-full flex-col p-5">
                  <h3 className="font-display text-[1.02rem] font-semibold tracking-tight">{x.name}</h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">{x.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[0.8rem] font-medium text-ember-ink">
                    Details <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CTABand title={<>Ready to talk <em>{s.name}?</em></>} primary={{ label: "Book a strategy call", href: "/book" }} secondary={{ label: "Send an enquiry", href: `/contact?type=${practice.slug}` }} />
    </>
  );
}
