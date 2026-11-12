import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { UseCaseCard } from "./UseCaseCard";
import type { UseCase } from "@/content/use-cases";

/**
 * A band of use cases for a service, family or the homepage: a heading, up to
 * `max` cards (a swipeable rail on phones) and a link into the full library,
 * pre-filtered when `family` is given.
 */
export function UseCaseRail({
  items, title, lede, family, band = "blush", max = 3, showService = true, id,
}: {
  items: UseCase[];
  title: React.ReactNode;
  lede?: React.ReactNode;
  family?: string;
  band?: "paper" | "sand" | "blush";
  max?: number;
  showService?: boolean;
  id?: string;
}) {
  if (!items.length) return null;
  const href = family ? `/use-cases?family=${encodeURIComponent(family)}` : "/use-cases";
  return (
    <Section band={band} pad="loose" id={id} className="scroll-mt-32">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Use cases</p>
          <h2 className="h2 mt-3 balance">{title}</h2>
          {lede && <p className="lede mt-4">{lede}</p>}
        </Reveal>
        <Link href={href} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ember-ink transition-colors hover:text-ember-deep">
          {family ? `All ${family} use cases` : "All use cases"} <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="rail rail--swipe mt-10 md:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, max).map((u, i) => <UseCaseCard key={u.slug} u={u} i={i} showService={showService} />)}
      </div>
    </Section>
  );
}
