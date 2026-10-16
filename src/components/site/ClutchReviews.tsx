import { ArrowUpRight, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCarousel } from "./ReviewCarousel";
import { clutch, reviews } from "@/content/reviews";

/**
 * What clients say on Clutch: the rating as a raised score card with the
 * breakdown under it, and the reviews themselves rotating beside it.
 */
export function ClutchReviews() {
  return (
    <Section pad="tight" label="Clutch reviews">
      <Reveal>
        <h2 className="h2 balance">What our clients <em>say.</em></h2>
      </Reveal>
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <a
            href={clutch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-[20px] border-2 border-ink bg-ember p-7 text-white shadow-[8px_8px_0_0_var(--color-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[11px_11px_0_0_var(--color-ink)]"
          >
            <p className="kicker text-white/90">Rated on Clutch</p>
            <p className="mt-2 font-display text-[4.2rem] font-extrabold leading-none">{clutch.rating}</p>
            <span className="mt-3 flex gap-1" role="img" aria-label={`${clutch.rating} out of 5`}>
              {Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-5" fill="currentColor" strokeWidth={0} />)}
            </span>
            <p className="mt-4 text-[0.95rem] font-medium">From {clutch.count} verified client reviews</p>
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[0.88rem] font-semibold text-ember-ink">
              Read them on Clutch <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </a>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {clutch.scores.map((s) => (
              <div key={s.k} className="rounded-[14px] border-2 border-ink bg-paper px-4 py-3 shadow-[4px_4px_0_0_var(--color-ink)]">
                <dt className="kicker text-muted">{s.k}</dt>
                <dd className="mt-1 font-display text-[1.5rem] font-bold leading-none">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={80} className="lg:col-span-8">
          <ReviewCarousel items={reviews} />
        </Reveal>
      </div>
    </Section>
  );
}
