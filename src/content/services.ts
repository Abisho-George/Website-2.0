export type Service = {
  slug: string;
  name: string;
  practiceSlug: "gtm-strategy" | "demand-generation" | "revenue-intelligence" | "enablement";
  tagline: string;
  summary: string;
  forWho: string;
  includes: string[];
  deliverables: string[];
  timeline: string;
  pricing: string;
  faq: { q: string; a: string }[];
  legacyPath?: string;
};

export const services: Service[] = [
  /* ---------------- GTM Strategy & Positioning ---------------- */
  {
    slug: "gtm-setup",
    name: "GTM Setup",
    practiceSlug: "gtm-strategy",
    tagline: "Stand up a go-to-market motion for a new product or a new market.",
    summary:
      "For companies launching into a market they have not sold to before. We size the opportunity bottom-up, define the segment worth attacking first, write the positioning and build the ninety-day plan the team runs on.",
    forWho: "Companies entering a new geography, launching a second product, or selling to a new buyer for the first time.",
    includes: [
      "Bottom-up market sizing with three demand scenarios",
      "ICP and buying-group definition, with disqualifiers",
      "Positioning narrative and category choice",
      "Channel and motion design against your budget and headcount",
      "The 90-day operating plan: owners, targets, weekly rituals",
    ],
    deliverables: ["Market map and sizing model", "Positioning narrative (one page)", "90-day operating plan", "Enablement kit for the team"],
    timeline: "5 weeks",
    pricing: "[[₹6.5 L / $8k]] fixed fee",
    faq: [
      { q: "How is this different from a strategy deck?", a: "It ends with an operating plan and an enablement kit, not a recommendation. We can also stay on to run the first quarter through our Demand Generation practice." },
      { q: "Do you need our CRM?", a: "Yes. The diagnosis starts with your closed-won and closed-lost history; without it we would be guessing." },
    ],
  },
  {
    slug: "repositioning",
    name: "Repositioning",
    practiceSlug: "gtm-strategy",
    tagline: "Reset the story when growth has stalled or the product has moved.",
    summary:
      "Pipeline slows for a reason, and it is usually upstream of the campaigns. We find out which comparison your buyers are actually making, then move it — because the comparison set decides both the win rate and the price.",
    forWho: "Companies whose win rate has fallen, whose deals stall against a status quo, or who have pivoted the product but not the story.",
    includes: [
      "Win/loss interviews with customers and lost prospects",
      "Competitive and alternative analysis, including 'do nothing'",
      "New positioning narrative and messaging hierarchy",
      "Sales and marketing message rollout",
      "Before/after messaging tests on live pipeline",
    ],
    deliverables: ["Win/loss findings", "Positioning narrative", "Persona-level messaging matrix", "Rollout plan"],
    timeline: "5–6 weeks",
    pricing: "[[₹6.5 L / $8k]] fixed fee",
    faq: [
      { q: "Will this change our brand?", a: "Rarely. Positioning is about the comparison a buyer draws; visual identity usually stays as it is." },
      { q: "How do you prove it worked?", a: "We test the new messaging against the old on live pipeline before rollout, and track win rate by segment afterwards." },
    ],
  },
  {
    slug: "icp-definition",
    name: "ICP & Segmentation",
    practiceSlug: "gtm-strategy",
    tagline: "Decide who you are actually for, and who you are not.",
    summary:
      "Most ICPs are firmographic filters that let everyone through. We build one from the behaviour of your best customers, with explicit disqualifiers, so every downstream programme spends effort where it converts.",
    forWho: "Teams whose campaigns reach the wrong accounts, or who cannot explain why some deals close in weeks and others never do.",
    includes: [
      "Closed-won and closed-lost cohort analysis",
      "Fit attributes weighted against real outcomes",
      "Buying-group map: economic buyer, champion, blocker",
      "Trigger events that predict a purchase",
      "Explicit disqualification rules",
    ],
    deliverables: ["ICP definition and scoring model", "Buying-group map", "Trigger taxonomy", "Target account list, tiered"],
    timeline: "3 weeks",
    pricing: "[[₹3.2 L / $3.9k]]",
    faq: [
      { q: "How many customers do you need to analyse?", a: "Thirty closed-won deals is comfortable; we can work with fifteen. Below that the model is opinion rather than evidence." },
    ],
  },
  {
    slug: "pricing-and-packaging",
    name: "Pricing & Packaging",
    practiceSlug: "gtm-strategy",
    tagline: "Tiers, metrics and anchors tested against what buyers will actually pay.",
    summary:
      "Pricing is a positioning decision expressed in numbers. We interview real buyers on willingness to pay, model the alternatives they price you against, and design tiers your sales team can defend without discounting.",
    forWho: "Companies discounting to close, leaving money on the table at the top end, or adding a second product.",
    includes: [
      "Willingness-to-pay interviews with buyers and churned accounts",
      "Value-metric selection",
      "Tier and packaging design",
      "Discount policy and floor pricing",
      "Migration plan for existing customers",
    ],
    deliverables: ["Pricing model", "Packaging and tier definition", "Objection and discount playbook", "Customer migration plan"],
    timeline: "4 weeks",
    pricing: "[[₹4.5 L / $5.5k]]",
    faq: [
      { q: "Do you raise prices?", a: "Sometimes. More often we change what is bundled so the buyer compares you to something more valuable." },
    ],
  },
  {
    slug: "india-entry",
    name: "India Market Entry",
    practiceSlug: "gtm-strategy",
    tagline: "For global SaaS selling into India for the first time.",
    summary:
      "The founders led India marketing for global technology vendors before starting this firm. We know which playbooks transfer, which quietly fail, and how long the first two reference customers really take.",
    forWho: "Global B2B software companies opening India, or partners building an Indian practice.",
    includes: [
      "Bottom-up sizing of the Indian mid-market for your category",
      "Interviews with Indian CIOs, CTOs and buyers in your segment",
      "Localised pricing and packaging",
      "Wedge offer selection and reference-customer strategy",
      "Hiring sequence: what to outsource, what to hire, and when",
    ],
    deliverables: ["India market assessment", "Wedge positioning", "Localised pricing", "First-year operating plan"],
    timeline: "6 weeks",
    pricing: "[[₹7.5 L / $9k]]",
    faq: [
      { q: "Should we hire a country manager first?", a: "Usually not. Build the motion with a small outsourced team, prove it, then hire the person who will scale what already works." },
      { q: "Can you run the first quarter too?", a: "Yes — most India entry clients continue into a Demand Generation retainer for the first two quarters." },
    ],
  },
  {
    slug: "founder-brand",
    name: "Founder & CEO Branding",
    practiceSlug: "gtm-strategy",
    tagline: "Make the person buyers already trust visible where they look.",
    summary:
      "In B2B the founder is often the most credible asset the company has and the least used. We build a point of view, a publishing cadence and an engagement routine — with the founder's own ideas, approved by them, in their voice.",
    forWho: "Founders and CXOs whose expertise is real but invisible outside their existing network.",
    includes: [
      "Point-of-view development sessions",
      "Content calendar and publishing cadence",
      "Ghost-writing with founder approval on everything",
      "Comment and engagement routine on target accounts",
      "Speaking and podcast pipeline",
    ],
    deliverables: ["Point-of-view document", "Monthly content calendar", "Published posts", "Engagement report"],
    timeline: "Ongoing, 3-month minimum",
    pricing: "[[₹1.6 L / $1.9k per month]]",
    faq: [
      { q: "Will it sound like me?", a: "It has to, or it does not work. Nothing publishes without your approval, and the ideas are yours — we provide structure, cadence and editing." },
    ],
  },

  /* ---------------- Demand Generation ---------------- */
  {
    slug: "account-based-marketing",
    name: "Account-Based Marketing",
    practiceSlug: "demand-generation",
    tagline: "Win the twenty accounts that decide your year.",
    summary:
      "A tier-1 programme built around named accounts: deep research on each, multi-threaded outreach across the buying group, and content made for one company rather than a segment. Includes Event ABM, where the meeting happens in person.",
    forWho: "Enterprise and upper mid-market teams where a handful of named accounts represent most of the target.",
    includes: [
      "OSINT brief on every tier-1 account",
      "Buying-group mapping and multi-threading plan",
      "Account-specific content and points of view",
      "Executive-to-executive outreach programmes",
      "Event ABM: pre-event outreach, on-site meetings, 24-hour follow-up",
    ],
    deliverables: ["Account dossiers", "Multi-threading plan per account", "Account-specific assets", "Weekly engagement report"],
    timeline: "One quarter minimum",
    pricing: "[[₹4.5 L / $5.5k per month]]",
    faq: [
      { q: "How many accounts can you run?", a: "Twenty to fifty in tier 1, depending on depth. Beyond that it stops being ABM and becomes segmented outbound." },
      { q: "What is Event ABM?", a: "We build the programme around an industry event your buyers already attend: research and outreach eight weeks out, scheduling and briefs on site, follow-up within a day." },
    ],
    legacyPath: "/account-based-marketing",
  },
  {
    slug: "social-selling",
    name: "Social Selling",
    practiceSlug: "demand-generation",
    tagline: "Pipeline from your leaders' profiles, not an SDR's sequence.",
    summary:
      "Buyers who ignore cold email will reply to a comment from a credible peer. We run research-led engagement from your executives' real LinkedIn profiles: what they publish, who they engage, and the conversations that follow.",
    forWho: "Companies with credible leaders and a buyer who is unreachable by phone or email.",
    includes: [
      "Profile optimisation for the leaders in the programme",
      "Target account and buying-group monitoring",
      "Research-led commenting and direct messaging",
      "Content cadence, approved by the executive",
      "Handover of conversations to sales with context",
    ],
    deliverables: ["Optimised profiles", "Weekly content and engagement", "Conversation log", "Meetings with briefs"],
    timeline: "Three months minimum",
    pricing: "[[₹2.8 L / $3.4k per month]]",
    faq: [
      { q: "Do you post as our executives?", a: "With their approval on every post and message. Programmes where the executive is not involved read as fake and do not produce meetings." },
      { q: "How many profiles?", a: "Two to five works well. One is fragile; more than five is hard to keep authentic." },
    ],
    legacyPath: "/social-selling",
  },
  {
    slug: "outbound-sequencing",
    name: "Outbound & Sales Messaging",
    practiceSlug: "demand-generation",
    tagline: "Sequences written from customer interviews, not templates.",
    summary:
      "Multi-channel outbound run by a pod that owns a meetings target: warmed domains, persona-level messaging, research behind every first touch, and a weekly review of what changed and why.",
    forWho: "Teams whose reply rates have collapsed, or who have never had a repeatable outbound motion.",
    includes: [
      "Dedicated sending domains, warmed and monitored",
      "Persona-level value propositions from customer interviews",
      "Six-step multi-channel sequences",
      "Reply handling and objection library",
      "Weekly pipeline review with the CRO",
    ],
    deliverables: ["Messaging system", "Sequence library", "Deliverability report", "Meetings with account briefs"],
    timeline: "Three months minimum",
    pricing: "[[₹3.5 L / $4.2k per month]]",
    faq: [
      { q: "Will you send from our domain?", a: "Never the primary one. We set up and warm dedicated domains so your main domain's reputation is never at risk." },
      { q: "Do you guarantee meetings?", a: "We commit to a target and report against it weekly. We do not sell pay-per-meeting, because it produces bad meetings." },
    ],
  },
  {
    slug: "content-marketing",
    name: "Content & Technical Writing",
    practiceSlug: "demand-generation",
    tagline: "Content a technical buyer will finish reading.",
    summary:
      "Strategy and production for B2B technology companies, including the deeply technical pieces most agencies cannot write: architecture explainers, benchmark studies, migration guides and documentation-adjacent content.",
    forWho: "Companies selling to engineers, architects and technical evaluators.",
    includes: [
      "Content strategy mapped to buying stages",
      "Search and community-driven topic selection",
      "Technical writing by people who can read your docs",
      "Distribution plan, not just publication",
      "Repurposing into sequences, social and sales assets",
    ],
    deliverables: ["Content strategy", "Editorial calendar", "Published pieces", "Distribution and performance report"],
    timeline: "Ongoing",
    pricing: "[[₹2.2 L / $2.7k per month]]",
    faq: [
      { q: "Can you write about our product without us?", a: "No, and you should distrust anyone who says otherwise. We need an hour a fortnight with someone technical." },
    ],
  },
  {
    slug: "webinar-as-a-service",
    name: "Webinar-as-a-Service",
    practiceSlug: "demand-generation",
    tagline: "You turn up and speak. We handle everything else.",
    summary:
      "Topic selection from real demand data, audience acquisition, production, hosting, moderation and a scored attendee list delivered to sales within a day. The format that most reliably builds a first marketing database.",
    forWho: "Companies with genuine expertise and no audience to show it to.",
    includes: [
      "Topic selection from search and community demand",
      "Audience acquisition: paid, partner and organic",
      "Landing page, registration and reminder flow",
      "Production, hosting and live moderation",
      "Scored attendee list and post-event nurture",
    ],
    deliverables: ["Registrant and attendee database", "Recording and clips", "Scored follow-up list", "Post-event nurture sequence"],
    timeline: "6 weeks per session",
    pricing: "[[₹3.8 L / $4.6k per webinar]]",
    faq: [
      { q: "What attendance should we expect?", a: "We plan for [[40–50%]] of registrants attending live. The number that matters more is how many were in your ICP." },
      { q: "Can you run a series?", a: "Yes, and a quarterly series compounds: each session builds the audience for the next." },
    ],
    legacyPath: "/webinar-as-a-service",
  },
  {
    slug: "quiz-as-a-service",
    name: "Quiz-as-a-Service",
    practiceSlug: "demand-generation",
    tagline: "An assessment your buyer wants to take, that tells you where they are.",
    summary:
      "A scored assessment on a topic your buyers care about — maturity, readiness, risk. It qualifies interest better than a content download, because the answers tell you what the account actually needs.",
    forWho: "Companies who need a top-of-funnel offer better than a gated PDF.",
    includes: [
      "Assessment design and scoring model",
      "Question set reviewed with your subject experts",
      "Landing page, logic and results experience",
      "Audience acquisition",
      "Answers piped into your CRM as qualification data",
    ],
    deliverables: ["Live assessment", "Scored respondent database", "Per-respondent results report", "Follow-up sequences by score band"],
    timeline: "4 weeks",
    pricing: "[[₹2.6 L / $3.2k]]",
    faq: [
      { q: "How is this better than an ebook?", a: "The respondent gets a personalised result they value, and you get structured data about their situation instead of an email address." },
    ],
    legacyPath: "/quiz-as-a-service",
  },
  {
    slug: "lead-generation-in-a-box",
    name: "Lead Generation in a Box",
    practiceSlug: "demand-generation",
    tagline: "Fixed scope, fixed price, one segment, six weeks.",
    summary:
      "A complete demand programme for a single segment, priced up front. It exists so you can prove a motion works before funding a retainer — and if it does not, you find out for a known number.",
    forWho: "Companies who want evidence before committing to an ongoing programme.",
    includes: [
      "Account universe for one segment",
      "Messaging system from customer interviews",
      "Six-week outbound and social campaign",
      "Weekly reporting",
      "Full handover: lists, sequences, playbook",
    ],
    deliverables: ["Account universe", "Messaging system", "Campaign results", "Handover playbook"],
    timeline: "6 weeks",
    pricing: "[[₹4.2 L / $5.1k]] fixed",
    faq: [
      { q: "What if it does not work?", a: "You get the universe, the messaging and an honest written account of why, which is worth more than another quarter of guessing." },
    ],
    legacyPath: "/lead-generation-in-a-box",
  },
  {
    slug: "event-lead-generation",
    name: "Third-Party Event Lead Generation",
    practiceSlug: "demand-generation",
    tagline: "Make the conference you already sponsor pay for itself.",
    summary:
      "Most event spend produces a badge scan list and no pipeline. We work the eight weeks before, the days during and the week after, so your team arrives with a calendar rather than a booth and hope.",
    forWho: "Companies sponsoring or attending industry events without a systematic meeting plan.",
    includes: [
      "Attendee research and target list",
      "Pre-event outreach eight weeks out",
      "On-site meeting scheduling and rep briefs",
      "Booth conversation framework",
      "Follow-up within 24 hours, then nurture",
    ],
    deliverables: ["Target attendee list", "Booked on-site meetings", "Rep briefing pack", "Post-event pipeline report"],
    timeline: "10 weeks around the event",
    pricing: "[[₹3.2 L / $3.9k per event]]",
    faq: [
      { q: "Do you attend?", a: "Not usually. We prepare your team and run the scheduling and follow-up remotely, which is where the value is." },
    ],
  },
  {
    slug: "product-marketing-as-a-service",
    name: "Product Marketing-as-a-Service",
    practiceSlug: "demand-generation",
    tagline: "A product marketing function without the hire.",
    summary:
      "Launches, positioning, competitive enablement, sales collateral and win/loss — run as a fractional function for companies not yet ready for a full-time product marketer.",
    forWho: "Companies shipping faster than they can market, with no PMM in the team.",
    includes: [
      "Launch planning and execution",
      "Messaging and value proposition maintenance",
      "Competitive battlecards, kept current",
      "Sales collateral and demo narratives",
      "Win/loss programme",
    ],
    deliverables: ["Launch plans", "Messaging library", "Battlecards", "Sales collateral", "Quarterly win/loss report"],
    timeline: "Ongoing, quarterly commitment",
    pricing: "[[₹3.4 L / $4.1k per month]]",
    faq: [
      { q: "How much of our time does it take?", a: "Roughly three hours a week from product and one from sales leadership." },
    ],
  },

  /* ---------------- Revenue Intelligence ---------------- */
  {
    slug: "database-as-a-service",
    name: "Database-as-a-Service",
    practiceSlug: "revenue-intelligence",
    tagline: "A living account universe, not a list that decays in your CRM.",
    summary:
      "Your total addressable accounts, assembled from twenty-plus sources, deduplicated against your CRM, verified on delivery and re-verified on a schedule — because a purchased list loses much of its value within a year.",
    forWho: "Teams whose reps spend their week cleaning data instead of selling.",
    includes: [
      "Universe built from twenty-plus sources",
      "Deduplication against your CRM",
      "Human verification for tier-1 accounts",
      "Monthly re-verification and quarterly refresh",
      "CRM hygiene: duplicates, decay and gaps fixed at source",
    ],
    deliverables: ["Verified account universe in your CRM", "Contact routes per account", "Monthly accuracy report"],
    timeline: "3 weeks to build, then ongoing",
    pricing: "[[₹1.8 L / $2.2k]] build, then monthly",
    faq: [
      { q: "Is this GDPR and DPDP compliant?", a: "Yes. Public and licensed sources, lawful basis recorded per record, suppression lists honoured. We will walk your DPO through the pipeline." },
      { q: "What accuracy do you deliver?", a: "[[94%]] on delivery, re-verified monthly. We publish the number in every report, including when it drops." },
    ],
  },
  {
    slug: "intent-account-intelligence",
    name: "Intent & Account Intelligence",
    practiceSlug: "revenue-intelligence",
    tagline: "A weekly ranked list of who to call, and what to say.",
    summary:
      "Third-party intent tuned to your own closed-won history, combined with first-party engagement and public trigger events. The output is a ranked feed with the evidence attached, not a dashboard nobody opens.",
    forWho: "Teams paying for intent data that produces the same accounts as their competitors'.",
    includes: [
      "Signal taxonomy agreed with sales leadership",
      "Model tuned against your closed-won history",
      "Third-party intent plus first-party engagement",
      "Public triggers: leadership changes, hiring, funding, migrations",
      "Weekly ranked feed with suggested first message",
    ],
    deliverables: ["Tuned scoring model", "Weekly ranked account feed", "Evidence and suggested opener per account"],
    timeline: "2 weeks to switch on",
    pricing: "Monthly subscription from [[₹1.4 L / $1.7k]]",
    faq: [
      { q: "Which intent vendor do you use?", a: "We combine third-party intent with signals we monitor ourselves. The tuning to your win history is what stops the feed looking like everyone else's." },
    ],
  },
  {
    slug: "osint-for-sales",
    name: "OSINT for Sales",
    practiceSlug: "revenue-intelligence",
    tagline: "Everything public about an account, structured into an angle.",
    summary:
      "Open-source intelligence applied to accounts: filings, hiring, tech stack, leadership changes, public commitments and executive priorities, assembled into a two-page brief with the one angle that connects your offer to something they have already committed to.",
    forWho: "Enterprise sales teams whose reps have fifteen minutes to prepare for a conversation that needs four hours.",
    includes: [
      "Account priorities and the evidence for them",
      "Buying group with verified contact routes",
      "Technology stack and detected migrations",
      "Hiring and organisational signals",
      "The angle, and the likely objection",
    ],
    deliverables: ["Two-page account brief", "Buying-group map", "Suggested opener and objection handling"],
    timeline: "48 hours per brief",
    pricing: "[[₹14,000 / $170 per brief]], volume rates available",
    faq: [
      { q: "Is this legal?", a: "Entirely. It is public information, gathered systematically. We never reference anything a prospect would be surprised you know." },
      { q: "Can our reps not just Google this?", a: "They could, in about four hours per account. The point is that they do not have four hours." },
    ],
    legacyPath: "/open-source-intelligence-in-sales-and-marketing",
  },
  {
    slug: "market-research",
    name: "Market Research & Forecasting",
    practiceSlug: "revenue-intelligence",
    tagline: "Numbers you can defend in a board meeting.",
    summary:
      "Bottom-up market sizing, demand scenarios and competitive landscapes for board decks, fundraising and market-entry decisions — built from account counts and primary interviews rather than analyst percentages.",
    forWho: "Founders and CROs who need a defensible number for a board, an investor or a market-entry decision.",
    includes: [
      "Bottom-up TAM/SAM/SOM from account counts",
      "Primary interviews with buyers in the segment",
      "Three demand scenarios with stated assumptions",
      "Competitive landscape and share estimates",
      "Board-ready presentation of the findings",
    ],
    deliverables: ["Sizing model, with assumptions exposed", "Interview findings", "Competitive landscape", "Board presentation"],
    timeline: "4–5 weeks",
    pricing: "[[₹4.8 L / $5.8k]]",
    faq: [
      { q: "Do you use analyst reports?", a: "As a cross-check, never as the basis. A top-down percentage of someone else's number is not a forecast." },
    ],
  },
  {
    slug: "competitive-intelligence",
    name: "Competitive Intelligence",
    practiceSlug: "revenue-intelligence",
    tagline: "Know what they ship, what they charge and what they say in the room.",
    summary:
      "A maintained view of the competitors you actually meet in deals: pricing, positioning shifts, release cadence, hiring and the arguments their reps use — with battlecards your sellers will keep open during calls.",
    forWho: "Teams losing deals to the same two or three names and guessing why.",
    includes: [
      "Competitor tracking: product, pricing, positioning, hiring",
      "Loss interviews where you lost to them",
      "Battlecards with real objection handling",
      "Quarterly landscape update",
      "Alerting on material moves",
    ],
    deliverables: ["Competitor profiles", "Battlecards", "Quarterly update", "Loss analysis"],
    timeline: "3 weeks to build, then quarterly",
    pricing: "[[₹2.4 L / $2.9k]] build, then quarterly",
    faq: [
      { q: "How do you get pricing?", a: "From public sources, published rate cards, procurement disclosures and, most usefully, structured loss interviews with prospects who saw both quotes." },
    ],
  },

  /* ---------------- Enablement ---------------- */
  {
    slug: "sales-coaching",
    name: "Founder & Sales Coaching",
    practiceSlug: "enablement",
    tagline: "Codify how your best deals actually close.",
    summary:
      "Fortnightly coaching for founders and first sales hires, working on live pipeline. Every session changes something in the CRM. Over twelve weeks it becomes a playbook the next hire can run.",
    forWho: "Founders still carrying every deal, and the first one or two sales hires learning to.",
    includes: [
      "Call reviews and ride-alongs",
      "Discovery and qualification frameworks",
      "Demo narrative development",
      "Deal clinics on live pipeline",
      "The written playbook, produced as you go",
    ],
    deliverables: ["Sales playbook", "Coaching scorecard", "Deal review cadence", "Manager coaching handover"],
    timeline: "12 weeks",
    pricing: "[[₹2.4 L / $2.9k per cohort]]",
    faq: [
      { q: "Is this classroom training?", a: "No. Every session works on real deals in your pipeline. Participants leave with something changed in the CRM, not a certificate." },
    ],
  },
  {
    slug: "marketing-training",
    name: "Marketing Excellence Training",
    practiceSlug: "enablement",
    tagline: "Move a marketing team from brand activity to pipeline ownership.",
    summary:
      "A cohort programme that teaches a marketing team to plan, measure and defend pipeline contribution — with the operating cadence, metrics and templates to keep running it after we leave.",
    forWho: "Marketing teams measured on activity who are now being asked for pipeline.",
    includes: [
      "Pipeline metrics and attribution that survive scrutiny",
      "Campaign planning and prioritisation",
      "Content engine the team can run without an agency",
      "Sales and marketing service-level agreement",
      "Operating cadence and reporting templates",
    ],
    deliverables: ["Marketing operating system", "Metric definitions", "Campaign templates", "Reporting pack"],
    timeline: "8 weeks",
    pricing: "[[₹3.1 L / $3.7k per cohort]]",
    faq: [
      { q: "Who should attend?", a: "The whole marketing team plus one sales leader. Programmes without sales in the room do not change the SLA." },
    ],
  },
  {
    slug: "ai-in-gtm-training",
    name: "AI in GTM Adoption",
    practiceSlug: "enablement",
    tagline: "Get the tools you already bought actually used.",
    summary:
      "Tool selection, prompts and workflows, guard-rails, and the habit-building that makes AI stick in a revenue team — taught by people who run AI agents in production for clients, not by a slide deck.",
    forWho: "Teams whose AI tooling was bought and never adopted, or who are about to buy.",
    includes: [
      "Tool selection and stack rationalisation",
      "Workflow design for research, writing and sequencing",
      "Prompt libraries for your ICP and voice",
      "Guard-rails: what must never be automated",
      "Adoption tracking and manager reinforcement",
    ],
    deliverables: ["Workflow library", "Prompt library", "Guard-rail policy", "Adoption report"],
    timeline: "6 weeks",
    pricing: "[[₹2.8 L / $3.4k per cohort]]",
    faq: [
      { q: "How is this different from the GTM AI Twin?", a: "This teaches your team to use AI well. The Twin is custom agents we build and run that take the work over. Many clients do the training first." },
    ],
  },
  {
    slug: "change-management",
    name: "GTM Change Management",
    practiceSlug: "enablement",
    tagline: "Make the new motion survive contact with the existing team.",
    summary:
      "New territory models, new segments, new tooling and new comp plans fail on adoption far more often than on design. We run the communication, training and reinforcement that decides whether the change holds.",
    forWho: "Companies rolling out a new GTM motion, structure or system.",
    includes: [
      "Stakeholder and resistance mapping",
      "Communication plan and rollout sequencing",
      "Manager enablement, so it survives our exit",
      "Reinforcement rituals and scorecards",
      "90-day adoption review",
    ],
    deliverables: ["Change plan", "Communication kit", "Manager enablement pack", "Adoption scorecard"],
    timeline: "90 days",
    pricing: "[[₹3.6 L / $4.4k]]",
    faq: [
      { q: "When should you be involved?", a: "Before the design is final. Changes designed without an adoption plan are the ones that get quietly abandoned in month four." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesFor = (practiceSlug: string) => services.filter((s) => s.practiceSlug === practiceSlug);
