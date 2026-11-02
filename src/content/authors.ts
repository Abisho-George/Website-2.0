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
    linkedin: "https://www.linkedin.com/in/kingshuk/",
    email: "kingshuk@leadstrategus.com",
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
    linkedin: "https://www.linkedin.com/in/aninditahazra/",
    email: "anindita@leadstrategus.com",
  },
  {
    slug: "komala-maran",
    name: "Komala Maran",
    role: "Head Go-To-Market & Growth",
    image: "/founders/komala-maran.jpg",
    bio: "With LeadStrategus for over seven years. Head of GTM and Growth for LeadStrategus.ai.",
    long: [
      "Komala has been with LeadStrategus for over seven years, running account-based marketing programmes, SaaS product launches, and go-to-market strategy for clients across industries. She has done the work the platform now automates, building account lists, running research briefs, designing outreach sequences by hand. As Head of GTM and Growth for LeadStrategus.ai, she leads how the platform reaches and serves solo operators and growth teams. B.Tech from IIIT.",
    ],
    linkedin: "https://www.linkedin.com/in/komalamaran/",
    email: "komala.m@leadstrategus.com",
  },
];

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
