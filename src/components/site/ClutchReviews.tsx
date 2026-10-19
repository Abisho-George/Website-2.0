import { ArrowUpRight, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCarousel } from "./ReviewCarousel";
import { clutch, reviews } from "@/content/reviews";

/** What clients say on Clutch: a centred heading with the rating, then the rotating reviews. */
export function ClutchReviews() {
  return (
    <Section band="sand" pad="tight" label="Clutch reviews">
      <Reveal className="text-center">
        <h2 className="font-display text-[1.7rem] font-bold leading-tight text-fg md:text-[2.1rem]">Here&apos;s what our customers say about us</h2>
        <a
          href={clutch.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[0.95rem] text-fg-soft transition-colors hover:text-fg"
        >
          <span className="flex gap-0.5 text-[#f5a524]" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />)}
          </span>
          <span>5-star rated on Clutch</span>
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </Reveal>
      <div className="mt-6">
        <ReviewCarousel items={reviews} />
      </div>
    </Section>
  );
}
