import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Copy, strip } from "@/components/ui/Copy";
import { Breadcrumb, CTABand } from "@/components/site/Blocks";
import { authors, getAuthor } from "@/content/authors";
import { insightsByDate, getCluster } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() { return authors.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = getAuthor((await params).slug); if (!a) return {};
  return buildMetadata({ title: `${a.name}, ${a.role}`, description: strip(a.bio), path: `/authors/${a.slug}` });
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getAuthor((await params).slug); if (!a) notFound();
  const posts = insightsByDate.filter((i) => i.author === a.slug);
  return (
    <>
      <section className="relative pt-[var(--nav-h)]">
        <div className="container-x py-16 md:py-24">
          <Breadcrumb items={[{ label: "About", href: "/about" }, { label: a.name }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal delay={60}><h1 className="display text-[3rem] md:text-[5rem]">{a.name}</h1></Reveal>
              <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">{a.long.map((p, i) => <Reveal key={i} delay={i * 60}><p><Copy text={p} /></p></Reveal>)}</div>
              {a.linkedin && <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm link-u">LinkedIn <ArrowUpRight className="size-4" /></a>}
            </div>
          </div>
        </div>
      </section>
      {posts.length > 0 && (
        <Section className="pt-0">
          <div className="eyebrow mb-6">Writing</div>
          <div className="divide-y divide-rule border-y border-rule">
            {posts.map((i) => (
              <Link key={i.slug} href={`/insights/${i.slug}`} className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted md:col-span-3">{getCluster(i.cluster)?.name} · {formatDate(i.date)}</div>
                <div className="text-xl font-medium tracking-tight transition-colors group-hover:text-ember md:col-span-9">{i.title}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}
      <CTABand title={<>Talk to <em className="serif-em text-ember">{a.name.split(" ")[0]}.</em></>} primary={{ label: "Book a strategy call", href: "/book" }} />
    </>
  );
}
