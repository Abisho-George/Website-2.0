import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerItem } from "@/components/motion/Stagger";
import { clutch } from "@/content/reviews";

const Stars = ({ className }: { className?: string }) => (
  <span className={className} role="img" aria-label={`${clutch.rating} out of 5`}>
    {Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-5" fill="currentColor" strokeWidth={0} />)}
  </span>
);

/** What clients say on Clutch: the rating as a raised score card, the breakdown, and any verbatim quotes. */
export function ClutchReviews() {
  return (
    <Section pad="tight" label="Clutch reviews">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="lg:col-span-4">
          <a
            href={clutch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-[20px] border-2 border-ink bg-ember p-7 text-white shadow-[8px_8px_0_0_var(--color-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[11px_11px_0_0_var(--color-ink)]"
          >
            <p className="kicker text-white/90">Rated on Clutch</p>
            <p className="mt-2 font-display text-[4.2rem] font-extrabold leading-none">{clutch.rating}</p>
            <Stars className="mt-3 flex gap-1 text-white" />
            <p className="mt-4 text-[0.95rem] font-medium">From {clutch.count} verified client reviews</p>
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[0.88rem] font-semibold text-ember-ink">
              Read them on Clutch <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </a>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-8">
          <h2 className="h2 balance">What our clients <em>say.</em></h2>
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {clutch.scores.map((s) => (
              <div key={s.k} className="rounded-[14px] border-2 border-ink bg-paper px-4 py-3 shadow-[4px_4px_0_0_var(--color-ink)]">
                <dt className="kicker text-muted">{s.k}</dt>
                <dd className="mt-1 font-display text-[1.6rem] font-bold leading-none">{s.v}</dd>
              </div>
            ))}
          </dl>
          <p className="kicker mt-7 text-fg">What reviewers highlight</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {clutch.highlights.map((h) => (
              <li key={h} className="rounded-full bg-ember-wash px-3.5 py-1.5 text-[0.88rem] font-medium text-ember-ink">{h}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      {clutch.quotes.length > 0 && (
        <ul className="rail rail--swipe mt-12 md:grid-cols-2 lg:grid-cols-3">
          {clutch.quotes.map((q, i) => (
            <StaggerItem as="li" key={q.quote} i={i} className="flex flex-col rounded-[18px] border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_0_var(--color-ink)]">
              <Quote className="size-7 text-ember" aria-hidden />
              <blockquote className="mt-3 flex-1 text-[1rem] leading-relaxed text-fg">&ldquo;{q.quote}&rdquo;</blockquote>
              <p className="mt-5 font-display font-bold">{q.who}</p>
              <p className="text-[0.85rem] text-muted">{q.company}{q.project ? ` · ${q.project}` : ""}</p>
            </StaggerItem>
          ))}
        </ul>
      )}
    </Section>
  );
}
