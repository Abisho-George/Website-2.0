export type Resource = {
  slug: string;
  title: string;
  kind: "Guide" | "Template" | "Webinar" | "Benchmark" | "Checklist";
  blurb: string;
  detail: string;
  gated: boolean;
  cta: string;
  href?: string;
};

export const resources: Resource[] = [
  {
    slug: "icp-definition-worksheet",
    title: "The ICP definition worksheet",
    kind: "Template",
    blurb: "The sheet we use in week one of every GTM engagement: fit attributes, disqualifiers, trigger events and the scoring model behind them.",
    detail: "Twelve pages. Fill it in with thirty closed-won deals and you will have a defensible ICP by the end of an afternoon.",
    gated: true,
    cta: "Get the worksheet",
  },
  {
    slug: "outbound-deliverability-checklist",
    title: "Outbound deliverability checklist",
    kind: "Checklist",
    blurb: "SPF, DKIM, DMARC, domain warming, volume ramps and the sending hygiene that decides whether your sequences are read or filtered.",
    detail: "The checklist our pods run before a single sequence goes live. Includes the warming schedule and the thresholds we hold ourselves to.",
    gated: true,
    cta: "Get the checklist",
  },
  {
    slug: "b2b-pipeline-benchmarks",
    title: "[[B2B pipeline benchmarks 2026]]",
    kind: "Benchmark",
    blurb: "Stage-by-stage conversion across the programmes we ran this year, by segment and motion, with the sample size for each figure stated.",
    detail: "[[Drawn from LeadStrategus programmes across SaaS, DevTools, healthcare IT and IT services. Every figure carries its n.]]",
    gated: true,
    cta: "Read the benchmarks",
  },
  {
    slug: "gtm-ai-readiness",
    title: "GTM AI readiness assessment",
    kind: "Checklist",
    blurb: "Fifteen questions on your data, messaging system, CRM hygiene and operating cadence that determine whether AI agents will work for you yet.",
    detail: "The same qualification we run before scoping a GTM AI Twin. If you score badly, the honest answer is to fix the foundation first.",
    gated: false,
    cta: "Take the assessment",
    href: "/contact?type=gtm-ai-twin",
  },
  {
    slug: "osint-account-brief-template",
    title: "The OSINT account brief template",
    kind: "Template",
    blurb: "The two-page structure our analysts fill for every tier-1 account: priorities, evidence, buying group, likely objection and the angle.",
    detail: "Includes the source checklist — filings, hiring, stack detection, executive interviews — in the order we work them.",
    gated: true,
    cta: "Get the template",
  },
  {
    slug: "demand-gen-2026-webinar",
    title: "[[Future-ready demand generation: an action plan]]",
    kind: "Webinar",
    blurb: "What changed in B2B demand generation, what still works, and the operating plan to act on it. Recording and slides.",
    detail: "[[Run quarterly. The recording, the deck and the written summary are all available.]]",
    gated: false,
    cta: "Watch the recording",
    href: "/insights/demand-generation-2026-what-changed",
  },
];

export const kinds = ["Guide", "Template", "Webinar", "Benchmark", "Checklist"] as const;
