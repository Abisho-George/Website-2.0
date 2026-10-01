/**
 * Site-wide configuration.
 * Anything wrapped in [[double brackets]] anywhere in /content is a PLACEHOLDER:
 * it renders with a dashed underline and is listed in PLACEHOLDERS.md.
 */
export const site = {
  name: "LeadStrategus",
  legalName: "LeadStrategus Private Limited",
  tagline: "Go-to-market, engineered",
  description:
    "LeadStrategus is a Bengaluru-headquartered B2B go-to-market firm. We design, run and automate revenue engines for technology companies, from positioning and intent intelligence to demand generation, enablement and custom AI agents that book the meetings.",
  url: "https://leadstrategus.com",
  aiUrl: "https://leadstrategus.ai",
  founded: 2018,
  contact: {
    email: "kingshuk@leadstrategus.com",
    hq: "Novel Office, Brigade Tech Park, near ITPL Main Road, Pattandur Agrahara, Whitefield, Bengaluru, Karnataka 560066",
    address: {
      street: "Novel Office, Brigade Tech Park, near ITPL Main Road, Pattandur Agrahara",
      locality: "Whitefield, Bengaluru",
      region: "Karnataka",
      postalCode: "560066",
      country: "IN",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/leadstrategus",
    clutch: "https://clutch.co/profile/leadstrategus",
    instagram: "https://www.instagram.com/leadstrategus/",
  },
  booking: {
    // Set NEXT_PUBLIC_CAL_LINK (e.g. "leadstrategus/strategy-call") to embed Cal.com on /book
    calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
  },
};

export const nav = {
  primary: [
    { label: "Practices", href: "/practices", mega: true },
    { label: "GTM AI Twin", href: "/gtm-ai-twin", highlight: true },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Book a strategy call", href: "/book" },
};

export const proof = {
  // The founders' prior employers. Public on LinkedIn/Crunchbase.
  pedigree: ["AWS", "Gartner", "SAP", "Oracle", "IBM", "Pluralsight", "IMRB"],
  clutch: { rating: "5.0", reviews: "[[7]]" },
  stats: [
    { value: "8", suffix: "yrs", label: "running B2B pipeline programmes" },
    { value: "[[120]]", suffix: "+", label: "GTM engagements delivered" },
    { value: "[[14]]", suffix: "", label: "countries our clients sell into" },
    { value: "[[3.2]]", suffix: "×", label: "median pipeline lift in year one" },
  ],
  verticals: [
    "SaaS", "DevTools", "Cloud & Infrastructure", "Healthcare IT", "Document Software",
    "Software Testing", "Media Technology", "Cybersecurity", "Fintech", "IT Services",
  ],
};
