import { site } from "./site";

/**
 * LeadStrategus on Clutch. The rating, review count and score breakdown are
 * Clutch's own published figures (clutch.co/profile/leadstrategus), and the
 * highlights are the themes Clutch's summary draws from the reviews.
 *
 * `quotes` holds verbatim review excerpts only, copied from the Clutch
 * profile with the reviewer's title as Clutch shows it. Leave it empty rather
 * than paraphrase: the section shows quote cards only when there are quotes.
 */
export const clutch = {
  url: site.social.clutch,
  rating: "5.0",
  count: 7,
  scores: [
    { k: "Quality", v: "5.0" },
    { k: "Schedule", v: "5.0" },
    { k: "Cost", v: "4.8" },
    { k: "Would refer", v: "5.0" },
  ],
  highlights: ["Good value for the cost", "Flexible pricing", "In-depth market research", "LinkedIn lead generation", "Trains and mentors our team"],
  quotes: [] as { quote: string; who: string; company: string; project?: string }[],
};
