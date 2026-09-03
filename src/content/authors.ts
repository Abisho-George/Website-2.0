import type { Author } from "./types";

export const authors: Author[] = [
  {
    slug: "kingshuk-hazra",
    name: "Kingshuk Hazra",
    role: "Founder",
    bio: "Former Head of Marketing, Amazon Web Services India. Two decades across marketing, business-development analytics and advisory at SAP, Oracle, IBM, Gartner, Pluralsight and IMRB.",
    long: [
      "Kingshuk founded LeadStrategus in 2018 after leading marketing for Amazon Web Services in India and, before that, holding progressively senior roles across marketing, BD analytics and advisory at SAP, Oracle Consulting, IBM, Gartner, Pluralsight (Director, Enterprise Marketing) and IMRB.",
      "He is a statistics graduate with an MBA from the Indian Institute of Foreign Trade, which explains why every LeadStrategus engagement starts with the numbers and ends with a forecast someone is prepared to defend.",
      "He writes and speaks on demand generation, intent data and the practical use of AI agents in B2B go-to-market, and still personally runs the diagnostic phase of most GTM Strategy engagements.",
    ],
    linkedin: "https://in.linkedin.com/in/kingshuk",
  },
  {
    slug: "anindita-hazra",
    name: "Anindita Hazra",
    role: "Co-founder",
    bio: "[[Co-founder of LeadStrategus. Leads delivery across the Demand Generation and Enablement practices.]]",
    long: [
      "[[Anindita co-founded LeadStrategus and leads client delivery: the pods, the programmes and the weekly pipeline reviews that keep the firm accountable for meetings rather than activity.]]",
      "[[Her background spans marketing operations, content and programme management for technology companies.]]",
    ],
  },
];

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
