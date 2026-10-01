import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Metadata and structured data for every page.
 *
 * SEO: one title, description and canonical per page, Open Graph and Twitter
 * cards that agree with them, and keywords drawn from the service portfolio's
 * own legacy and SEO terms.
 *
 * AEO and GEO: answer engines and generative search read structured data and
 * plain definitional sentences far more reliably than layout. So the JSON-LD
 * here is one linked graph rather than isolated blobs: the Organization, the
 * WebSite, every Service and both founders carry stable @ids, and each page
 * points at them instead of restating them. A service page also publishes its
 * three portfolio questions as an FAQPage, which is the shape an answer engine
 * quotes from.
 *
 * Anything still marked [[placeholder]] in content is either stripped of its
 * brackets (copy) or left out entirely (contact facts), because structured
 * data is read as fact and an unverified phone number is worse than none.
 */

const unflag = (s: string) => s.replace(/\[\[|\]\]/g, "");
const isFlagged = (s: string) => s.includes("[[");

/**
 * Search results show roughly 155 to 160 characters of a description. Longer
 * copy is cut at a sentence if one ends in range, otherwise at a word.
 */
export function fitDescription(text: string, max = 160) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const sentences = t.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let out = "";
  for (const sn of sentences) {
    if ((out + sn).trim().length > max) break;
    out += sn;
  }
  out = out.trim();
  if (out.length >= 90) return out;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + "\u2026";
}

export const ids = {
  org: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  person: (slug: string) => `${site.url}/about#${slug}`,
  service: (path: string) => `${site.url}${path}#service`,
};

type Meta = {
  title?: string;
  /** Use as the whole title, without the " | LeadStrategus" suffix. */
  absoluteTitle?: string;
  description?: string;
  path?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  keywords?: string[];
  /** For articles. */
  published?: string;
  modified?: string;
  authors?: string[];
  section?: string;
};

export function buildMetadata({
  title, absoluteTitle, description, path = "/", type = "website", noIndex, keywords, published, modified, authors, section,
}: Meta): Metadata {
  // a long title keeps its words and drops the brand suffix, which search
  // results would cut off anyway
  const suffixed = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  const fullTitle = absoluteTitle ?? (title && suffixed.length > 70 ? title : suffixed);
  const url = `${site.url}${path === "/" ? "" : path}`;
  const desc = fitDescription(unflag(description ?? site.description));
  return {
    // the layout sets the template; an absolute title stops it doubling up
    title: { absolute: fullTitle },
    description: desc,
    keywords: keywords?.length ? keywords.map(unflag) : undefined,
    alternates: { canonical: url || site.url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: url || site.url,
      siteName: site.name,
      type,
      locale: "en_IN",
      ...(type === "article"
        ? { publishedTime: published, modifiedTime: modified ?? published, authors, section }
        : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

/** The firm itself. Published once, in the root layout; everything else refers to it by @id. */
export function orgJsonLd(founders: { slug: string; name: string; role: string; image?: string; linkedin?: string; bio: string }[]) {
  const email = isFlagged(site.contact.email) ? undefined : site.contact.email;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ids.org,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/apple-icon.png`, width: 180, height: 180 },
        image: `${site.url}/opengraph-image`,
        description: unflag(site.description),
        slogan: site.tagline,
        foundingDate: String(site.founded),
        founder: founders.map((f) => ({ "@id": ids.person(f.slug) })),
        address: { "@type": "PostalAddress", streetAddress: site.contact.address.street, addressLocality: site.contact.address.locality, addressRegion: site.contact.address.region, postalCode: site.contact.address.postalCode, addressCountry: site.contact.address.country },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Place", name: "Southeast Asia" },
          { "@type": "Place", name: "Middle East" },
        ],
        knowsAbout: [
          "Go-to-market strategy", "B2B demand generation", "Account-based marketing", "Account intelligence",
          "Intent data", "Open-source intelligence for sales", "Product marketing", "Sales enablement",
          "Event-led demand generation", "AI agents for demand generation", "Revenue operations",
        ],
        sameAs: [site.social.linkedin, site.social.clutch, site.aiUrl, "https://expotofunnel.com/"],
        ...(email ? { email, contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email, availableLanguage: ["en"] }] } : {}),
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: site.url,
        name: site.name,
        description: unflag(site.description),
        publisher: { "@id": ids.org },
        inLanguage: "en-IN",
      },
      ...founders.map((f) => personNode(f)),
    ],
  };
}

function personNode(f: { slug: string; name: string; role: string; image?: string; linkedin?: string; bio: string }) {
  return {
    "@type": "Person",
    "@id": ids.person(f.slug),
    name: f.name,
    jobTitle: f.role,
    description: unflag(f.bio),
    worksFor: { "@id": ids.org },
    url: ids.person(f.slug),
    ...(f.image ? { image: `${site.url}${f.image}` } : {}),
    ...(f.linkedin ? { sameAs: [f.linkedin] } : {}),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  category?: string;
  alternateNames?: string[];
  questions?: { q: string; a: string }[];
}) {
  const url = `${site.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ids.service(input.path),
    name: input.name,
    description: unflag(input.description),
    url,
    serviceType: input.name,
    ...(input.category ? { category: input.category } : {}),
    ...(input.alternateNames?.length ? { alternateName: input.alternateNames.map(unflag) } : {}),
    provider: { "@id": ids.org },
    areaServed: ["IN", "US", "GB", "SG", "AE"],
    audience: { "@type": "BusinessAudience", audienceType: "B2B technology companies" },
    mainEntityOfPage: url,
  };
}

/** A list of services, for a hub or a family page. */
export function serviceListJsonLd(name: string, path: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: `${site.url}${path}`,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${site.url}${it.path}`,
    })),
  };
}

export function articleJsonLd(input: {
  title: string; description: string; path: string; date: string; author: string; authorSlug?: string; section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: unflag(input.title),
    description: unflag(input.description),
    url: `${site.url}${input.path}`,
    mainEntityOfPage: `${site.url}${input.path}`,
    datePublished: input.date,
    dateModified: input.date,
    image: `${site.url}${input.path}/opengraph-image`,
    ...(input.section ? { articleSection: input.section } : {}),
    author: input.authorSlug ? { "@id": ids.person(input.authorSlug), name: input.author } : { "@type": "Person", name: input.author },
    publisher: { "@id": ids.org },
    inLanguage: "en-IN",
  };
}

/** A case study is an Article about the service it evidences. */
export function caseStudyJsonLd(input: {
  title: string; description: string; path: string; services: { name: string; path: string }[]; sample: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    genre: "Case study",
    headline: unflag(input.title),
    description: unflag(input.description),
    url: `${site.url}${input.path}`,
    mainEntityOfPage: `${site.url}${input.path}`,
    about: input.services.map((s) => ({ "@id": ids.service(s.path), name: s.name })),
    publisher: { "@id": ids.org },
    // a sample is not evidence and should not be surfaced as such
    ...(input.sample ? { creativeWorkStatus: "Draft" } : {}),
    inLanguage: "en-IN",
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: unflag(i.q),
      acceptedAnswer: { "@type": "Answer", text: unflag(i.a) },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === "/" ? "" : it.path}` || site.url,
    })),
  };
}

export function personJsonLd(f: { slug: string; name: string; role: string; image?: string; linkedin?: string; bio: string }) {
  return { "@context": "https://schema.org", ...personNode(f) };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage" | "ItemPage";

/**
 * The page itself, tied into the graph: which site it belongs to, who it is
 * about, and its breadcrumb trail. `speakable` points voice and answer
 * engines at the heading and the lede, the two places every page states
 * what it is in a sentence.
 */
export function pageJsonLd(input: {
  type?: PageType;
  name: string;
  description: string;
  path: string;
  crumbs?: { name: string; path: string }[];
  about?: string[];
}) {
  const url = `${site.url}${input.path === "/" ? "" : input.path}` || site.url;
  const crumbs = input.crumbs ?? (input.path === "/" ? [] : [{ name: "Home", path: "/" }, { name: input.name, path: input.path }]);
  return [
    {
      "@context": "https://schema.org",
      "@type": input.type ?? "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: unflag(input.name),
      description: unflag(input.description),
      isPartOf: { "@id": ids.website },
      about: input.about?.length ? input.about.map((id) => ({ "@id": id })) : { "@id": ids.org },
      publisher: { "@id": ids.org },
      inLanguage: "en-IN",
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".lede"] },
    },
    ...(crumbs.length ? [breadcrumbJsonLd(crumbs)] : []),
  ];
}
