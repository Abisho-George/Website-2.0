/** Content for the GTM AI Twin special service page. */
export const twin = {
  eyebrow: "Special service · GTM AI Twin",
  h1: "A twin of your",
  h1em: "demand gen best practices.",
  sub: "The heavy lifting done by AI agents. The decision making done by you.",
  lede:
    "We build custom AI agents that give you best practices for outbound demand generation: identifying the best prospects in the market right now, finding the right opening to talk with them, and reaching out authentically, with you always in the loop.",
  agentsIntro: {
    h: "We have an agent for practically everything that is manual and painful.",
    p: "Every step below used to be somebody's afternoon. The agents do the heavy lifting inside guard-rails you set, and hand back the decisions that need context (the delicate ones, the judgement calls) to you.",
  },
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
    h: "Not a tool. Your demand gen best practices, run by agents.",
    paras: [
      "A GTM AI Twin is a set of purpose-built agents, configured on your ICP, your closed-won history and your voice, that carry the manual weight of outbound demand generation: building the universe, researching accounts, finding the opening, writing and sending, handling replies and booking the meeting.",
      "Each agent owns one painful job and hands to the next. The division of labour is the point: the agents do the heavy lifting, and every decision that needs context (is this angle credible, is this account worth pushing, is this reply going badly?) comes back to a named human with the full thread.",
      "It is built on our own agent platform at leadstrategus.ai and configured for you by people who have run human demand generation programmes for eight years. That combination is the product: agents that already know what a good meeting looks like.",
    ],
    notList: [
      "Not a subscription to a generic AI SDR",
      "Not a chatbot bolted onto your website",
      "Not a list-blasting tool with an LLM on top",
      "Not a replacement for your positioning or your closers",
    ],
    isList: [
      "An agent for each manual step of outbound demand gen",
      "Configured on your ICP, wins, losses and voice",
      "Wired into your CRM, email, LinkedIn and calendar",
      "Guard-rails you set, with the judgement calls left to you",
    ],
  },
  why: {
    title: "Why now",
    h: "The window is open. It will not stay open.",
    reasons: [
      { n: "01", t: "The technology crossed the line this year", b: "Agents can now research an account across dozens of sources, reason over your CRM history, write in a specific voice and hold a multi-turn conversation reliably enough to be trusted with first contact. Two years ago none of that was true in production." },
      { n: "02", t: "Buyers have stopped answering generic outbound", b: "Reply rates on template sequences have collapsed. What still works is research-led relevance, one message at a time, and that was never affordable at scale with humans. It is the natural job of an agent." },
      { n: "03", t: "The economics of the SDR team have broken", b: "A fully loaded SDR in the US costs [[$90k to $120k]] a year, ramps for three months and stays for [[fourteen]]. The twin runs every account in your universe for [[less than one of them]] and does not resign." },
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
    { wk: "Weeks 1 to 2", t: "Foundation", b: "ICP, signal taxonomy, account universe, messaging system, CRM and deliverability set-up. The same foundation work that makes any GTM programme succeed." },
    { wk: "Weeks 3 to 4", t: "Agent design & training", b: "Each agent configured on your data and voice, with qualification rules, escalation paths and guard-rails. Dry runs against historical deals." },
    { wk: "Weeks 5 to 6", t: "Supervised run", b: "Live, with a human approving every outbound message and reply for the first fortnight. Autonomy increases as accuracy is proven." },
    { wk: "Week 7 →", t: "Handover & run", b: "The twin runs; we review weekly, tune monthly, and your team owns the escalations. Optional managed operation if you would rather not." },
  ],
};
