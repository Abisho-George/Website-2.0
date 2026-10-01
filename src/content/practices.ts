import type { ServiceGroupSlug } from "./services";
import type { FAQ } from "./types";

/**
 * How the services are grouped, following the master portfolio's MECE control
 * sheet: six LeadStrategus families, two platforms that remain distinct
 * destinations, and one capability layer.
 *
 * The file keeps its old name so its history survives; "practice" in URLs is
 * kept for the same reason. In copy these are families.
 *
 * `job` is the family's primary horizontal job, verbatim from the control
 * sheet. Taglines for the four families that existed before are carried over;
 * the rest are written from the document's own language.
 */
export type GroupKind = "family" | "platform" | "capability";

export type Group = {
  slug: ServiceGroupSlug;
  index: string;
  kind: GroupKind;
  name: string;
  short: string;
  tagline: string;
  summary: string;
  job: string;
  pricing?: { model: string; from: string; note: string };
  faq: FAQ[];
  /** A platform lives on its own website; links go there instead of a page here. */
  url?: string;
};

export const groups: Group[] = [
  {
    slug: "gtm-strategy",
    index: "01",
    kind: "family",
    name: "GTM Strategy & Market Intelligence",
    short: "GTM Strategy",
    tagline: "Decide where to win before you spend a rupee winning it.",
    summary: "The decision work behind a go-to-market: where to play, whom to target, how to position and how to sequence the route to market, grounded in market evidence, research, forecasting and scenario planning, with an executive voice the market will listen to.",
    job: "DECIDE / DISCOVER / POSITION",
    pricing: {
      model: "Fixed-fee diagnostic, then a fixed-fee strategy sprint.",
      from: "[[₹6.5 L / $8k]]",
      note: "Diagnostic-only engagements available. Strategy sprint fee is credited against the first quarter of any Demand Generation retainer.",
    },
    faq: [
      { q: "How is this different from a management consultancy's GTM deck?", a: "We have run the motions we recommend. Every plan includes the operating rhythm, headcount and budget to execute it, and we can stay to run it. Consultancies leave at the deck." },
      { q: "Do you work with pre-revenue companies?", a: "Rarely. Our best work needs at least a handful of paying customers to learn from. If you are pre-revenue we will say so on the first call and point you to a cheaper path." },
      { q: "Can you help a global SaaS company enter India?", a: "Yes, and it is one of our most requested engagements: the founders led India marketing for AWS and other global vendors, so we know which playbooks transfer and which do not." },
      { q: "What do you need from us?", a: "Access to your CRM, ten hours of founder time across six weeks, and introductions to five customers and five lost prospects." },
    ],
  },
  {
    slug: "account-intelligence",
    index: "02",
    kind: "family",
    name: "Account & Buying Intelligence",
    short: "Account Intelligence",
    tagline: "Know which accounts matter, and why now.",
    summary: "The accounts and buyers worth pursuing, found and kept current: a market you can actually sell into, the signals that show which accounts are worth attention now, and public evidence turned into commercial intelligence.",
    job: "DISCOVER / PRIORITISE",
    pricing: {
      model: "Per-account-universe build fee, then a monthly maintenance and intelligence subscription.",
      from: "[[₹1.8 L / $2.2k]]",
      note: "OSINT briefs are scoped per project. Existing Demand Generation clients receive account intelligence inside their retainer.",
    },
    faq: [
      { q: "Is this compliant with GDPR and India's DPDP Act?", a: "Yes. We source from public and licensed data, record lawful basis per record, honour suppression lists and do not process special-category data. We will happily walk your DPO through the pipeline." },
      { q: "Which intent data providers do you use?", a: "We combine third-party intent with first-party (your web and content engagement) and public triggers we monitor ourselves. The ranking model is tuned to your closed-won history, which is why it stops looking like everybody else's feed." },
      { q: "Can you just sell us a list?", a: "We can, and Database-as-a-Service starts there, but a list without a maintenance plan is worth about half its price in six months. We will tell you that on the call." },
      { q: "How do OSINT briefs differ from what my reps can Google?", a: "Depth, structure and time. A brief takes an analyst three to four hours across filings, hiring data, tech-stack detection, executive interviews and social. Reps have fifteen minutes." },
    ],
  },
  {
    slug: "positioning-content",
    index: "03",
    kind: "family",
    name: "Positioning, Product Marketing & Revenue Content",
    short: "Positioning & Content",
    tagline: "Make a complex product easy to understand and buy.",
    summary: "The story the market hears and the sales team carries: product marketing, pitch and sales decks, revenue content, sales messaging and thought leadership, built from buyer evidence rather than product features.",
    job: "POSITION / ENGAGE",
    faq: [],
  },
  {
    slug: "demand-generation",
    index: "04",
    kind: "family",
    name: "Demand Generation & ABM",
    short: "Demand Gen & ABM",
    tagline: "An outsourced pipeline team that is accountable for meetings, not activity.",
    summary: "The engagement engine: account-based marketing, social selling, managed demand generation and a buyer-first digital funnel, run as one programme and judged on the meetings it produces.",
    job: "ENGAGE / MEET",
    pricing: {
      model: "Monthly retainer for a pod, scoped to a meetings target.",
      from: "[[₹3.5 L / $4.2k per month]]",
      note: "Productised formats (Webinar-as-a-Service, Quiz-as-a-Service, Lead Generation in a Box) are priced per programme. Three-month minimum.",
    },
    faq: [
      { q: "Do you guarantee meetings?", a: "We commit to a target and we report against it every week. If we miss it two months running we will tell you why and what changes, or we will end the engagement. We do not sell pay-per-meeting because it produces bad meetings." },
      { q: "Whose tools do you use?", a: "Yours if you have them: HubSpot, Salesforce, Apollo, Clay, LinkedIn Sales Navigator, Smartlead and similar are all familiar. If you do not, we run the programme on our stack and hand it over at the end." },
      { q: "Will you send from our domain?", a: "We set up and warm dedicated sending domains so your primary domain's reputation is never at risk. Social selling always runs from your leaders' real profiles, with their approval on every post." },
      { q: "What is Lead Generation in a Box?", a: "A fixed-scope, fixed-price programme for one segment: universe, messaging, six-week outbound and social campaign, and a handover. It exists for companies that need to prove a motion before funding a retainer." },
    ],
  },
  {
    slug: "enablement",
    index: "05",
    kind: "family",
    name: "Sales Enablement & Revenue Productivity",
    short: "Sales Enablement",
    tagline: "Make the team you already have run like the one you wish you had.",
    summary: "The system around the sales team: consulting, diagnostic workshops, inside sales and field sales enablement, coaching and training, and channel strategy, so the pipeline that arrives is converted.",
    job: "CONVERT / LEARN",
    pricing: {
      model: "Per-cohort fee for training; monthly for coaching.",
      from: "[[₹2.4 L / $2.9k per cohort]]",
      note: "Founder coaching and executive branding are scoped individually. Corporate cohorts of ten-plus receive playbook development included.",
    },
    faq: [
      { q: "Is this classroom sales training?", a: "No. Every session works on live deals and real pipeline. Participants leave each week with something changed in the CRM, not a certificate." },
      { q: "Who delivers it?", a: "The founders and a small bench of senior operators. Nobody who teaches for us has less than fifteen years of quota-carrying or pipeline-owning experience." },
      { q: "Can you train our team on AI tools?", a: "Yes. Our AI-in-GTM programme covers research agents, writing assistants and sequencing automation, with the guard-rails that stop teams sending embarrassing things at scale." },
      { q: "Do you do personal branding for founders?", a: "We do, with a rule: nothing is published without the founder's approval and the ideas have to be theirs. We provide the structure, the cadence and the editing." },
    ],
  },
  {
    slug: "events",
    index: "06",
    kind: "family",
    name: "Event & Community Demand Generation",
    short: "Events & Community",
    tagline: "Make trade shows and conferences a pipeline channel.",
    summary: "Demand moments built on purpose: event ABM, custom events, webinars, quizzes and third-party event lead generation, each designed around the conversations the pipeline needs.",
    job: "ENGAGE / MEET",
    faq: [],
  },
  {
    slug: "leadstrategus-ai",
    index: "07",
    kind: "platform",
    name: "LeadStrategus.ai",
    short: "LeadStrategus.ai",
    tagline: "The AI engine.",
    summary: "Build, deploy and operate an AI demand-generation engine: a single agent for one painful workflow, a GTM AI Twin configured on your own commercial logic, or the full system from account discovery to revenue operations.",
    job: "ALL / OPERATE",
    faq: [],
    url: "https://leadstrategus.ai/",
  },
  {
    slug: "expotofunnel",
    index: "08",
    kind: "platform",
    name: "ExpoToFunnel",
    short: "ExpoToFunnel",
    tagline: "The event-revenue engine.",
    summary: "Event revenue end to end: find the shows where your ICP actually concentrates, match the event to the buyers you want, and turn a booked meeting into a better sales conversation.",
    job: "DECIDE → MEET → CONVERT",
    faq: [],
    url: "https://expotofunnel.com/",
  },
  {
    slug: "revenue-operations",
    index: "09",
    kind: "capability",
    name: "Revenue Operations / GTM Operations",
    short: "Revenue Operations",
    tagline: "Make the pipeline engine measurable and operable.",
    summary: "The capability layer under every family: the operations that make a pipeline engine measurable and operable.",
    job: "LEARN / SCALE",
    faq: [],
  },
];

export const families = groups.filter((g) => g.kind === "family");
export const platforms = groups.filter((g) => g.kind === "platform");
/**
 * Groups that get their own page here. The platforms have their own websites
 * and a one-service capability layer has no page at all.
 */
export const pagedGroups = groups.filter((g) => g.kind === "family");

/** Where a group's name links: its page here, or a platform's own website. */
export function groupHref(g: Group) {
  return g.url ?? (g.kind === "capability" ? "/services" : `/practices/${g.slug}`);
}

export function getGroup(slug: string) {
  return groups.find((g) => g.slug === slug);
}
