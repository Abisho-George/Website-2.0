import type { FAQ } from "./types";

export const homeFaq: FAQ[] = [
  { q: "What kind of companies do you work with?", a: "B2B technology companies, mostly SaaS, DevTools, cloud, cybersecurity and IT services, from Series A to mid-market, selling into India, the US, UK, Singapore and the Gulf. If you sell to businesses and the deal needs a conversation, we can probably help." },
  { q: "Are you an agency or a consultancy?", a: "Both, deliberately. Strategy without execution is a deck; execution without strategy is noise. Most clients start with one practice and add another within a year." },
  { q: "Where are you based, and do you work with companies outside India?", a: "Headquartered in Bengaluru, working across time zones. Roughly half our clients are outside India; the founders spent years running marketing for global vendors in and out of the country." },
  { q: "How is the GTM AI Twin different from an AI SDR tool?", a: "An AI SDR tool gives you software and a login. The GTM AI Twin is a set of custom agents we build on your ICP, data and CRM, run under supervision until they are good, and hand over with humans still in the loop where judgement matters. It takes over the process, not just one step." },
  { q: "How quickly can we start?", a: "Diagnostics typically kick off within two weeks of a signed proposal. Demand Generation pods and AI Twin builds need three to four weeks of foundation work before anything goes live." },
];

export const twinFaq: FAQ[] = [
  { q: "Is this just an AI SDR tool with a services wrapper?", a: "No. Tools give you a login and leave the hard parts (ICP, data, messaging, deliverability, CRM hygiene, judgement) to you. We build custom agents on our own platform, train them on your closed-won history, run them under supervision and hand them over with the operating rhythm to keep them honest." },
  { q: "What does the twin actually do on its own?", a: "Identifies and ranks accounts, researches them, drafts and sends outreach in your voice across email and LinkedIn, handles replies and objections, qualifies against your criteria, and books meetings straight onto your calendar with a brief attached." },
  { q: "What stays human?", a: "Positioning, offer and pricing decisions; approval of the messaging system; anything the agents are not confident about (they escalate); and the meeting itself. You choose how much autonomy each agent has, and you can dial it up as trust builds." },
  { q: "Which tools does it connect to?", a: "HubSpot and Salesforce natively; Pipedrive and Zoho on request. Email via warmed dedicated domains; LinkedIn via your team's real profiles with their approval workflow; calendars via Google or Microsoft." },
  { q: "How long does a build take?", a: "[[Six weeks]] from kickoff to supervised live run for most companies: two weeks of ICP and data foundation, two weeks of agent design and training, then two weeks of supervised operation before handover." },
  { q: "Who owns the agents and the data?", a: "You do. The account universe, the messaging system, the trained agent configurations and every conversation live in your accounts. If we part ways, they keep running." },
  { q: "Can it work alongside our existing SDR team?", a: "Yes, and that is the most common setup. The twin does the identification, research, first touch and follow-up; your SDRs take the conversations and the meetings. Most teams reallocate SDR time toward higher-value accounts." },
];
