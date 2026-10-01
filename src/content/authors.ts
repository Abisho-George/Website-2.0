import type { Author } from "./types";

/**
 * The founders. Their details open on the page that mentions them (About,
 * and the home page), so there is no separate profile page; /authors/* 301s
 * to /about#<slug>, which opens that founder's details on arrival.
 *
 * PHOTOS: kingshuk-hazra.jpg and anindita-hazra.jpg were supplied as a pair
 * without names attached. The pairing below is an assumption awaiting
 * confirmation; if it is the wrong way round, swap the two `image` paths.
 */
export const authors: Author[] = [
  {
    slug: "kingshuk-hazra",
    name: "Kingshuk Hazra",
    role: "Founder",
    image: "/founders/kingshuk-hazra.jpg",
    bio: "Former Head of Marketing, Amazon Web Services India. Two decades across marketing, business-development analytics and advisory at SAP, Oracle, IBM, Gartner, Pluralsight and IMRB.",
    long: [
      "Kingshuk founded LeadStrategus in 2018 after leading marketing for Amazon Web Services in India and, before that, holding progressively senior roles across marketing, BD analytics and advisory at SAP, Oracle Consulting, IBM, Gartner, Pluralsight (Director, Enterprise Marketing) and IMRB.",
      "A statistics graduate with an MBA from the Indian Institute of Foreign Trade, Kingshuk is the reason every LeadStrategus engagement starts with the numbers and ends with a forecast someone is prepared to defend.",
      "Kingshuk writes and speaks on demand generation, intent data and the practical use of AI agents in B2B go-to-market, and still personally runs the diagnostic phase of most GTM strategy engagements.",
    ],
    linkedin: "https://in.linkedin.com/in/kingshuk",
  },
  {
    slug: "anindita-hazra",
    name: "Anindita Hazra",
    role: "Co-founder",
    image: "/founders/anindita-hazra.jpg",
    bio: "[[Co-founder of LeadStrategus. Leads client delivery across demand generation and sales enablement.]]",
    long: [
      "[[Anindita co-founded LeadStrategus and leads client delivery: the pods, the programmes and the weekly pipeline reviews that keep the firm accountable for meetings rather than activity.]]",
      "[[Anindita's background spans marketing operations, content and programme management for technology companies.]]",
    ],
  },
];

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
