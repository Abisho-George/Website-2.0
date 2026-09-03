import type { Metadata } from "next";
import { site } from "@/content/site";

type Meta = {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({ title, description, path = "/", type = "website", noIndex }: Meta): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  const url = `${site.url}${path}`;
  const desc = description ?? site.description;
  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description: desc, url, siteName: site.name, type, locale: "en_IN" },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    foundingDate: "2018",
    founders: [
      { "@type": "Person", name: "Kingshuk Hazra" },
      { "@type": "Person", name: "Anindita Hazra" },
    ],
    address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
    sameAs: [site.social.linkedin, site.aiUrl],
    contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: site.contact.email }],
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
    areaServed: ["IN", "US", "GB", "SG", "AE"],
    serviceType: "B2B go-to-market consulting",
  };
}

export function articleJsonLd(input: { title: string; description: string; path: string; date: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${site.url}${input.path}`,
    datePublished: input.date,
    dateModified: input.date,
    author: { "@type": "Person", name: input.author },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a.replace(/\[\[|\]\]/g, "") },
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
      item: `${site.url}${it.path}`,
    })),
  };
}
