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
    bio: "Leads Go-To-Market and Market Intelligence at LeadStrategus. Built the firm’s Market Insights and Open Source Intelligence practice. An IT engineer from IIIT Allahabad.",
    long: [
      "Komala joined LeadStrategus in 2019 and has grown with the firm from Smarketing consultant to Manager of its Market Insights and Open Source Intelligence practice, and now to Head of Go-To-Market. She runs the intelligence engine behind client engagements: the market selection, opportunity assessment, ICP development and account prioritisation that decide who a client should go after, and when. Her work spans international market entry, buyer and competitive intelligence, and intelligence-led demand generation for B2B and technology companies.",
      "An engineer by training, Komala is the reason a LeadStrategus target list comes with a why attached to every account: what changed at that company, why now, and how to start the conversation.",
      "She leads the firm’s use of generative AI and AI agents across research and GTM workflows, and runs LeadStrategus masterclasses on using open-source intelligence to find and research prospects. Outside work, she founded Project Yaadhum and mentors students through the Ministry of Education’s Vidyanjali programme.",
    ],
    linkedin: "https://www.linkedin.com/in/komalamaran/",
    email: "komala.m@leadstrategus.com",
  },
];

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
