/**
 * Search descriptions for service and family pages, written to fit: whole
 * sentences, at most 160 characters, drawn from each page's own copy. The
 * page copy itself runs longer than a search result shows, so these are kept
 * separately rather than cut from it. A page without an entry here falls back
 * to its own copy, trimmed at a sentence.
 */
export const serviceMeta: Record<string, string> = {
  "gtm-setup": "Build the revenue roadmap before you build the pipeline. We define where to play, whom to target, how to position the offer and how to sequence the route.",
  repositioning: "When the market has moved, reposition the business. We revisit your market position, buyers, value proposition and competitive frame when the old story stalls.",
  "market-intelligence": "Understand the market before you commit. We reconstruct markets and assess their size, players, buyers, competition and opportunity spaces.",
  "research-and-forecasting": "Turn market data into forward-looking decisions. We combine primary and secondary research and buyer evidence into scenarios for GTM decisions.",
  "scenario-planning": "Prepare the GTM for more than one future. We build structured scenarios so leadership can see trigger points, risks, options and actions.",
  "founder-brand": "Turn executive authority into market relevance. We help founders and senior executives build a credible point of view tied to the company's GTM goals.",
  "account-prospect-intelligence": "Build the market you can actually sell into. We build curated, ICP-matched company and prospect universes, enriched and validated by people.",
  "intent-account-intelligence": "Know which accounts matter, and why now. We read buying signals across hiring, technology, search and trigger events, then prioritise accounts for outreach.",
  "osint-for-sales": "Turn public evidence into commercial intelligence. We use open-source intelligence to answer specific questions about markets, accounts and buyers.",
  "product-marketing-as-a-service": "Make a complex product easy to understand and buy. We position your product so the right buyers see its relevance, capabilities and commercial value.",
  "pitch-deck": "Make the story easy to follow, and hard to forget. We build pitch decks that combine narrative, evidence and visual structure for the audience you face.",
  "sales-deck": "Give sales a story they can carry. We build the commercial narrative and sales-deck system: problem, value, proof, differentiation, objections and next step.",
  "content-marketing": "Create content that moves the buyer, not just the algorithm. We build company narratives and buyer-focused content tied to business goals.",
  "sales-messaging": "Give buyers a reason to engage before they are ready to buy. We develop research-backed messages and thought-leadership themes that start conversations.",
  "account-based-marketing": "Focus the pipeline on accounts that can matter. We research the people inside target accounts and create qualified conversations through personal outreach.",
  "social-selling": "Build relationships before you ask for the meeting. We use LinkedIn to find target buyers, engage with relevant content and develop real conversations.",
  "lead-generation-in-a-box": "A complete pipeline motion without building the whole team. Our managed demand-generation programme runs from account research to qualified leads.",
  "digital-only-sales-funnel": "Build a buyer-first digital funnel without relying on meetings. We combine intent, content, social selling and messaging so buyers progress online.",
  "sales-marketing-consulting": "Fix the system around the sales team, not just the salesperson. We diagnose GTM, sales and marketing problems and fix process, messaging and pipeline.",
  "diagnostic-workshops": "Find the revenue bottleneck before you train around it. Our structured workshops find the gaps across GTM, demand, sales process and execution.",
  "inside-sales-setup": "Build the human layer between marketing and sales. We set up inside sales: targeting, research, messaging, qualification, meeting setting and handoff.",
  "field-sales-enablement": "Equip sales to convert better, not just work harder. We give field teams the research, messaging, account context and coaching for real conversations.",
  "coaching-and-training": "Turn GTM knowledge into repeatable sales behaviour. We coach, mentor and train sales and marketing teams on GTM, social selling and demand generation.",
  "channel-strategy": "Design the partner route to market. We help you assess and structure channel routes: partner roles, target segments, messaging and enablement.",
  "event-abm": "Turn events into targeted account interactions. We use account intelligence and personal outreach to plan conversations before, during and after events.",
  "custom-events": "Design smaller, higher-value demand moments. We design roundtables, workshops and customer events around a defined audience and business question.",
  "webinar-as-a-service": "Build the audience, content and pipeline around the webinar. We handle audience acquisition, speakers, logistics, follow-up and reporting.",
  "quiz-as-a-service": "Use interaction to create qualified engagement. We design quiz-based campaigns with audience acquisition, content, hosting and post-event lead follow-up.",
  "event-lead-generation": "Make trade shows and conferences a pipeline channel. We research target attendees, book conversations in advance and follow every lead through after the show.",
  "ai-agent-build": "Automate one painful demand-gen workflow. We design and deploy purpose-built AI agents for discovery, research, enrichment or signal interpretation.",
  "ai-demand-gen-system": "From account discovery to revenue operations. We build a connected AI demand-generation system covering intent, prioritisation, outreach and meetings.",
  "event-discovery": "Find the shows where your ICP actually concentrates. ExpoToFunnel ranks trade shows by ICP relevance so you choose events deliberately.",
  "buyer-matching": "Match the event to the buyers you actually want. We find ICP-fit attendees, research them and work toward confirmed meetings before the event.",
  "meeting-intelligence": "Turn a booked event meeting into a better sales conversation. We provide per-meeting research briefs and follow-through after the event.",
  "revenue-operations": "Make the pipeline engine measurable and operable. We connect CRM, data hygiene, lead routing and reporting so your GTM system improves over time.",
};

export const familyMeta: Record<string, string> = {
  "gtm-strategy": "Decide where to win before you spend a rupee winning it. Where to play, whom to target and how to sequence the route to market, grounded in evidence.",
  "account-intelligence": "Know which accounts matter, and why now. The accounts and buyers worth pursuing, the signals that show who to call now, and public evidence put to work.",
  "positioning-content": "Make a complex product easy to understand and buy. Product marketing, decks, revenue content and messaging built from buyer evidence, not features.",
  "demand-generation": "An outsourced pipeline team accountable for meetings, not activity. ABM, social selling and managed demand generation run as one programme.",
  enablement: "Make the team you already have run like the one you wish you had. Consulting, diagnostics, inside and field sales enablement, coaching and channel strategy.",
  events: "Make trade shows and conferences a pipeline channel. Event ABM, custom events, webinars, quizzes and event lead generation, built around real conversations.",
};
