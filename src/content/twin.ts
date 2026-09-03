/** Content for the GTM AI Twin special service page. */
export const twin = {
  eyebrow: "Special service · GTM AI Twin",
  h1: "A twin of your GTM team.",
  h1em: "Made of agents.",
  lede:
    "We build custom AI agents that take over your go-to-market end to end: identifying the right prospects, researching them, reaching out in your voice, handling replies, and booking qualified meetings on your calendar. You keep the judgement. The twin keeps the pipeline moving.",
  stages: [
    { key: "identify", agent: "Prospecting Agent", verb: "Identify", body: "Scans your addressable market continuously, ranks accounts on fit and live buying signals, and refreshes the universe as companies change." },
    { key: "research", agent: "Research Agent", verb: "Research", body: "Builds a brief on every account and contact: hiring, tech stack, funding, leadership changes, public priorities, and the angle that makes an approach relevant." },
    { key: "qualify", agent: "Qualification Agent", verb: "Qualify", body: "Applies your definition of a good account before any outreach, so the twin spends effort where your best customers came from." },
    { key: "engage", agent: "Outreach Agent", verb: "Engage", body: "Writes and sends multi-channel sequences in your voice, one message at a time, referencing the research rather than a template." },
    { key: "handle", agent: "Conversation Agent", verb: "Handle", body: "Answers replies, works objections, shares the right proof, and escalates anything it is unsure about to a human with the full thread." },
    { key: "book", agent: "Scheduling Agent", verb: "Book", body: "Offers times, books the meeting into your calendar and CRM, sends the brief to the rep, and confirms with the prospect." },
  ],
  what: {
    title: "What is it",
    h: "Not a tool. A team that happens to be software.",
    paras: [
      "A GTM AI Twin is a set of purpose-built agents, designed and trained on your ICP, your closed-won history and your voice, that runs the repeatable seventy percent of go-to-market on its own: finding accounts, researching them, reaching out, handling replies and booking meetings.",
      "Each agent owns one stage and hands to the next, the way a good SDR team does, except it works every account, every day, with a research brief behind every message. Where judgement is required, the twin escalates to a named human with the full context, and learns from what they decide.",
      "It is built on our own agent platform at leadstrategus.ai and configured for you by the people who have run human GTM programmes for eight years. That combination is the product: agents that already know what a good meeting looks like.",
    ],
    notList: [
      "Not a subscription to a generic AI SDR",
      "Not a chatbot bolted onto your website",
      "Not a list-blasting tool with an LLM on top",
      "Not a replacement for your positioning or your closers",
    ],
    isList: [
      "Custom agents for each stage of your motion",
      "Trained on your ICP, wins, losses and voice",
      "Wired into your CRM, email, LinkedIn and calendar",
      "Supervised until it earns autonomy, then handed over",
    ],
  },
  why: {
    title: "Why now",
    h: "The window is open. It will not stay open.",
    reasons: [
      { n: "01", t: "The technology crossed the line this year", b: "Agents can now research an account across dozens of sources, reason over your CRM history, write in a specific voice and hold a multi-turn conversation reliably enough to be trusted with first contact. Two years ago none of that was true in production." },
      { n: "02", t: "Buyers have stopped answering generic outbound", b: "Reply rates on template sequences have collapsed. What still works is research-led relevance, one message at a time, and that was never affordable at scale with humans. It is the natural job of an agent." },
      { n: "03", t: "The economics of the SDR team have broken", b: "A fully loaded SDR in the US costs [[$90–120k]] a year, ramps for three months and stays for [[fourteen]]. The twin runs every account in your universe for [[less than one of them]] and does not resign." },
      { n: "04", t: "Proprietary GTM systems compound", b: "Every conversation the twin has makes the next one better: messaging, qualification, timing. The companies that build this now will have a two-year data lead on those that wait for it to arrive in a tool." },
    ],
  },
  whyUs: {
    title: "Why LeadStrategus",
    h: "Eight years of human GTM, now written into agents.",
    points: [
      { t: "We know what a good meeting looks like", b: "We have booked thousands of them for B2B technology companies since 2018. The agents inherit that judgement: the qualification rules, the objection handling, the angles that work per persona." },
      { t: "We build on our own platform", b: "The agents live on leadstrategus.ai, built by us. That means no waiting on a vendor's roadmap, and a twin that can be shaped to your motion rather than the other way round." },
      { t: "Operators, not integrators", b: "The founders ran marketing at AWS, Gartner, SAP and Pluralsight. The team has carried pipeline targets. We are not a systems integrator learning sales on your budget." },
      { t: "Accountable to meetings", b: "We report the same way we always have: accounts engaged, meetings booked, meetings held, opportunities created, every week. Activity metrics are not the point." },
      { t: "Human judgement stays in the loop", b: "Every agent has an escalation path to a named person on your team or ours. Autonomy is earned stage by stage, and you can see every decision the twin makes." },
      { t: "India cost base, global standards", b: "Built and run from Bengaluru for clients selling into the US, UK, Singapore and the Gulf. The economics that make the twin possible are the same ones that built our services business." },
    ],
  },
  build: [
    { wk: "Weeks 1–2", t: "Foundation", b: "ICP, signal taxonomy, account universe, messaging system, CRM and deliverability set-up. The same foundation work that makes any GTM programme succeed." },
    { wk: "Weeks 3–4", t: "Agent design & training", b: "Each agent configured on your data and voice, with qualification rules, escalation paths and guard-rails. Dry runs against historical deals." },
    { wk: "Weeks 5–6", t: "Supervised run", b: "Live, with a human approving every outbound message and reply for the first fortnight. Autonomy increases as accuracy is proven." },
    { wk: "Week 7 →", t: "Handover & run", b: "The twin runs; we review weekly, tune monthly, and your team owns the escalations. Optional managed operation if you would rather not." },
  ],
  pricing: {
    model: "A one-time build fee, then a monthly run fee.",
    from: "[[₹9.5 L / $11.5k build · ₹2.8 L / $3.4k per month]]",
    note: "Scoped to your universe size and channels. For most mid-market companies the monthly run fee is [[below one SDR's fully loaded cost]]. Build fee credited against the run fee for annual commitments.",
  },
};
