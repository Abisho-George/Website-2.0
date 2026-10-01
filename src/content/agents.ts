/**
 * The agent catalogue, the list that lives on leadstrategus.ai, brought onto
 * this page. One agent per manual, painful step of outbound demand generation.
 *
 * PLACEHOLDER: the names, coverage and especially the `status` of each agent
 * are drafted here and must be replaced with the real roster from
 * leadstrategus.ai before launch.
 */
export type AgentStatus = "live" | "building";

export type Agent = {
  slug: string;
  name: string;
  /** What it does, revealed on hover or tap. */
  does: string;
  /** The manual, painful process it removes. */
  replaces: string;
  /** The contextual decision left to you. */
  youDecide: string;
  status: AgentStatus;
};

export type AgentPhase = {
  key: string;
  name: string;
  claim: string;
  agents: Agent[];
};

export const agentPhases: AgentPhase[] = [
  {
    key: "identify",
    name: "Identify",
    claim: "The best prospects in the market right now.",
    agents: [
      {
        slug: "universe",
        name: "Universe Agent",
        does: "Assembles and continuously refreshes your addressable account list from public, licensed and first-party sources, deduplicated against your CRM.",
        replaces: "An analyst rebuilding a list in a spreadsheet every quarter, and a database that decays quietly in between.",
        youDecide: "What counts as addressable. The agent never widens the definition on its own.",
        status: "live",
      },
      {
        slug: "fit",
        name: "Fit Scoring Agent",
        does: "Scores every account against the pattern of your closed-won deals, not a generic firmographic filter, and re-scores as accounts change.",
        replaces: "Reps guessing which accounts are worth an hour, and a scoring model nobody has revisited since it was built.",
        youDecide: "The bar. You set what a passing score means and see why any account cleared it.",
        status: "live",
      },
      {
        slug: "signal",
        name: "Signal Agent",
        does: "Watches for the events that precede a purchase: leadership changes, hiring, funding, migrations, renewals, category research.",
        replaces: "Nobody reading the filings, job boards and announcements that were public all along.",
        youDecide: "Which signals matter in your market, and how strongly each one counts.",
        status: "live",
      },
      {
        slug: "buying-group",
        name: "Buying Group Agent",
        does: "Maps the committee on each account (economic buyer, champion, blocker, influencer) with verified routes to each.",
        replaces: "Single-threading into one contact and losing the deal when they change jobs.",
        youDecide: "Who to lead with, and when to go above or around a stalled champion.",
        status: "live",
      },
      {
        slug: "hygiene",
        name: "CRM Hygiene Agent",
        does: "Fixes duplicates, decay and gaps at source, and re-verifies contact data on a schedule instead of on discovery.",
        replaces: "Reps spending a third of the week cleaning data rather than selling.",
        youDecide: "What gets merged, archived or left alone in your system of record.",
        status: "live",
      },
    ],
  },
  {
    key: "open",
    name: "Open",
    claim: "The right opening to talk with them.",
    agents: [
      {
        slug: "research",
        name: "Account Research Agent",
        does: "Builds a two-page brief per account from public sources: priorities and the evidence for them, stack, org changes, public commitments.",
        replaces: "Four hours of analyst work per account, which is why reps did fifteen minutes instead.",
        youDecide: "Whether the read is right. The brief shows its sources so you can disagree with it.",
        status: "live",
      },
      {
        slug: "angle",
        name: "Angle Agent",
        does: "Finds the one connection between something the account has already committed to publicly and what you actually do.",
        replaces: "Opening lines that reference the company's website and impress nobody.",
        youDecide: "Whether the angle is credible coming from you: the judgement call that decides the reply.",
        status: "live",
      },
      {
        slug: "timing",
        name: "Timing Agent",
        does: "Holds an account back until there is a reason to approach it, and surfaces it the week that reason appears.",
        replaces: "Burning a good account on a generic touch six months before they were ever going to buy.",
        youDecide: "How patient to be. Some markets reward waiting; some punish it.",
        status: "building",
      },
      {
        slug: "competitive",
        name: "Competitive Watch Agent",
        does: "Tracks the vendors you actually meet in deals (pricing moves, positioning shifts, hiring) and keeps the battlecard current.",
        replaces: "A battlecard written once, eighteen months ago, that reps quietly stopped opening.",
        youDecide: "Which comparisons to pick a fight over and which to refuse.",
        status: "building",
      },
      {
        slug: "persona",
        name: "Persona Messaging Agent",
        does: "Maintains value propositions and objection handling per role, drawn from customer interviews and updated as deals close.",
        replaces: "One deck and one pitch used on every person in the buying group.",
        youDecide: "The positioning itself. Agents express it; they do not invent it.",
        status: "live",
      },
    ],
  },
  {
    key: "reach",
    name: "Reach",
    claim: "Reaching out authentically, at scale.",
    agents: [
      {
        slug: "writing",
        name: "Outreach Writing Agent",
        does: "Writes each message from that account's brief, in your voice, one at a time. No merge fields, no template with a name slotted in.",
        replaces: "A sequence written once and sent to four thousand people who can tell.",
        youDecide: "The voice, and approval on every send until the agent has earned autonomy.",
        status: "live",
      },
      {
        slug: "sequence",
        name: "Sequence Agent",
        does: "Orchestrates the steps across email, LinkedIn and calls, adapting the path as the account engages or goes quiet.",
        replaces: "A fixed six-step cadence that treats an interested reader and a cold one identically.",
        youDecide: "How hard to push, and when an account should be left alone.",
        status: "live",
      },
      {
        slug: "social",
        name: "Social Selling Agent",
        does: "Watches your target buying groups on LinkedIn and drafts comments and messages from your leaders' profiles for approval.",
        replaces: "Executives who mean to post and engage, and never find the hour.",
        youDecide: "Every word published under your name. Nothing posts without approval.",
        status: "live",
      },
      {
        slug: "deliverability",
        name: "Deliverability Agent",
        does: "Runs dedicated domains, warming schedules, volume ramps and inbox health so messages arrive rather than filter.",
        replaces: "Discovering months later that the sequences were landing in spam.",
        youDecide: "Nothing, mostly. This is the one part you should want fully automated.",
        status: "live",
      },
      {
        slug: "followup",
        name: "Follow-up Agent",
        does: "Keeps persistence honest: follows up when there is something new to say, and stops when there is not.",
        replaces: "The fifth 'just bumping this to the top of your inbox'.",
        youDecide: "Where the line sits between persistent and irritating in your market.",
        status: "live",
      },
    ],
  },
  {
    key: "convert",
    name: "Convert",
    claim: "Replies handled, meetings booked, you in the loop.",
    agents: [
      {
        slug: "reply",
        name: "Reply Agent",
        does: "Answers straightforward questions, shares the right proof, handles known objections, and escalates anything it is unsure about with the full thread.",
        replaces: "Replies sitting unanswered for two days because the rep was in meetings.",
        youDecide: "Anything involving price, a competitor by name, or an unhappy tone. Those always come to you.",
        status: "live",
      },
      {
        slug: "qualify",
        name: "Qualification Agent",
        does: "Applies your qualification criteria before a meeting is offered, and logs why anything was disqualified.",
        replaces: "A calendar full of meetings that were never going to go anywhere.",
        youDecide: "What qualified means. The agent enforces your bar; it does not set it.",
        status: "live",
      },
      {
        slug: "scheduling",
        name: "Scheduling Agent",
        does: "Offers times, books into the calendar and CRM, confirms with the prospect and chases no-shows.",
        replaces: "Six emails to find thirty minutes.",
        youDecide: "Who takes which meeting, and how much of your week is bookable.",
        status: "live",
      },
      {
        slug: "brief",
        name: "Rep Brief Agent",
        does: "Hands each booked meeting over with the account brief, the thread that earned it and a suggested agenda.",
        replaces: "Walking into a call having skimmed the company's homepage in the lift.",
        youDecide: "How to run the conversation. The agent's job ends at the door.",
        status: "live",
      },
      {
        slug: "reporting",
        name: "Reporting Agent",
        does: "Reports the same five numbers every week (accounts engaged, meetings booked, meetings held, opportunities created, what changed) and what it learned.",
        replaces: "A dashboard of activity metrics that answers no question anyone asked.",
        youDecide: "What to do about the numbers. That was always the job.",
        status: "building",
      },
    ],
  },
];

export const allAgents = agentPhases.flatMap((p) => p.agents);
export const liveCount = allAgents.filter((a) => a.status === "live").length;
export const buildingCount = allAgents.filter((a) => a.status === "building").length;
