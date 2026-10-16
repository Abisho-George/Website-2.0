export type FAQ = { q: string; a: string };

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
