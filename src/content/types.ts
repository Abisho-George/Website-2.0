export type FAQ = { q: string; a: string };

export type CaseStudy = {
  slug: string;
  /** A placeholder shown until a real, signed-off case study takes its place. */
  sample: boolean;
  client: string;
  vertical: string;
  region: string;
  /** The family the case belongs to. */
  group: import("./services").ServiceGroupSlug;
  /** Service slugs whose pages show this case. */
  services: string[];
  title: string;
  summary: string;
  stats: { value: string; label: string }[];
  situation: string;
  question: string;
  whatWeDid: string[];
  evidence: string[];
  outcome: string;
  whatChanged: string;
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
  /** A path under /public. */
  image?: string;
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
