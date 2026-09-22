/**
 * Synthetic demonstration data — invented, every line of it.
 *
 * Nothing in this file happened. No company named here is a client, no figure
 * here was measured, and none of it may ever be shown as a case study, a
 * benchmark or a result. It exists for one reason: the ambient product
 * surfaces need something plausible to show, and inventing that content
 * separately inside each surface is how two panels on the same page end up
 * quietly contradicting each other about what the twin is supposedly doing.
 *
 * So it lives here once. The run log, the accounts being scored and the week
 * of meetings are the same fictional week seen from three angles: the run
 * books Northwind Logistics into Thursday 11:30, and Thursday 11:30 is where
 * the board shows it.
 *
 * Every surface that renders any of this must print SYNTHETIC_NOTE in its
 * chrome. That label is the condition on which this data is allowed to exist.
 */

/** The word a framed surface prints so a reader knows what they are looking at. */
export const SYNTHETIC_NOTE = "illustrative";

export type RunTone = "ok" | "warn" | "win";

export type RunLine = {
  /** The agent that emitted the line. Doubles as the console's agent rail. */
  agent: string;
  text: string;
  tone?: RunTone;
};

/** One run of the GTM AI Twin, as its log would read. */
export const runLog: RunLine[] = [
  { agent: "prospecting", text: "universe refreshed · 4,212 accounts scanned · 38 moved to active tier" },
  { agent: "research", text: "brief built · Northwind Logistics · S/4 migration · new CIO · 3 open roles" },
  { agent: "qualify", text: "PASS · ICP tier 1 · fit 0.91 · signal 0.84 · score 87", tone: "ok" },
  { agent: "outreach", text: "drafted 1/6 · VP Applications · email · references integration-risk checklist" },
  { agent: "outreach", text: "sent · warmed domain ls-mail-03 · deliverability 99.2%" },
  { agent: "conversation", text: 'reply · "can you send the checklist and a case?" · handled', tone: "ok" },
  { agent: "conversation", text: 'reply · "how does pricing compare to Vendor X?" · escalated → AE-North', tone: "warn" },
  { agent: "scheduling", text: "meeting booked · Thu 11:30 IST · calendar + CRM updated · brief sent", tone: "win" },
  { agent: "report", text: "today · 38 engaged · 11 replies · 2 escalations · 3 meetings booked" },
];

/** The agents that speak in the run, in the order they first do. */
export const runAgents: string[] = [...new Set(runLog.map((l) => l.agent))];

export type ScanAccount = { name: string; fit: number };

/**
 * The accounts the market scan is shown scoring. Frozen rather than merely
 * typed, so `AccountName` below can be derived from it: a meeting that names
 * a company this file has never heard of then fails to compile, which is the
 * only enforcement that actually holds across two surfaces.
 */
export const scanAccounts = [
  { name: "Northwind Logistics", fit: 0.91 },
  { name: "Bracknell Systems", fit: 0.84 },
  { name: "Vantage Cloud", fit: 0.88 },
  { name: "Fenwick Analytics", fit: 0.79 },
  { name: "Solara Health", fit: 0.93 },
  { name: "Marlowe Data", fit: 0.86 },
] as const satisfies readonly ScanAccount[];

export type AccountName = (typeof scanAccounts)[number]["name"];

export const meetingDays = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
export type MeetingDay = (typeof meetingDays)[number];

/** How the meeting was earned — the firm's own motions, not channels in general. */
export type MeetingSource = "sequence" | "reply" | "social" | "webinar" | "event";

export type Meeting = {
  company: AccountName;
  day: MeetingDay;
  /** 24-hour IST, the clock the run log books in. */
  time: string;
  source: MeetingSource;
};

/** A week of meetings. Five days, six slots, one of them the run log's. */
export const meetings: Meeting[] = [
  { company: "Vantage Cloud", day: "Mon", time: "09:45", source: "sequence" },
  { company: "Fenwick Analytics", day: "Tue", time: "16:15", source: "webinar" },
  { company: "Bracknell Systems", day: "Wed", time: "11:00", source: "social" },
  { company: "Northwind Logistics", day: "Thu", time: "11:30", source: "reply" },
  { company: "Solara Health", day: "Thu", time: "15:00", source: "sequence" },
  { company: "Marlowe Data", day: "Fri", time: "10:15", source: "event" },
];
