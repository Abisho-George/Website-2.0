export type FAQ = { q: string; a: string };

export type Practice = {
  slug: string;
  index: string;
  name: string;
  short: string;
  tagline: string;
  summary: string;
  accent: "ember" | "twin";
  problem: { title: string; points: string[] };
  deliverables: { title: string; body: string }[];
  process: { phase: string; title: string; body: string; duration: string }[];
  sampleOutput: { kind: string; title: string; lines: string[] };
  outcomes: { value: string; label: string }[];
  pricing: { model: string; from: string; note: string };
  faq: FAQ[];
  relatedWork: string[];
  services: string[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  vertical: string;
  region: string;
  practice: string;
  practiceSlug: string;
  title: string;
  summary: string;
  stats: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
  quote?: { text: string; who: string };
  tags: string[];
  featured?: boolean;
  year: string;
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  long: string[];
  linkedin?: string;
};

export type Cluster = { slug: string; name: string; blurb: string };

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  cluster: string;
  author: string;
  date: string;
  body: string[]; // paragraphs; lines beginning with "## " render as h2, "- " as list items
  related?: string[];
};
