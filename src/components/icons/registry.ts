import {
  Blocks,
  BookOpen,
  Bot,
  BrainCircuit,
  CalendarCheck,
  CalendarDays,
  CirclePlay,
  Cog,
  Compass,
  Cpu,
  Crosshair,
  DatabaseZap,
  Filter,
  GalleryHorizontalEnd,
  Gauge,
  GitFork,
  GraduationCap,
  Handshake,
  Headset,
  Layers,
  LayoutTemplate,
  ListChecks,
  ListOrdered,
  ListTodo,
  Magnet,
  MapPinned,
  Megaphone,
  Merge,
  MessagesSquare,
  MicVocal,
  MonitorPlay,
  Network,
  NotebookPen,
  PackageCheck,
  PenTool,
  Presentation,
  Puzzle,
  Quote,
  Radar,
  Replace,
  Route,
  Ruler,
  Shapes,
  Sigma,
  Stethoscope,
  Store,
  Telescope,
  Ticket,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Resource } from "@/content/resources";

/**
 * The site's iconography, chosen by mechanism rather than by category.
 *
 * Twenty-four service cards that all carry a magnifying glass or a bar chart
 * are twenty-four identical cards. Each mark below depicts what the service
 * physically DOES, OSINT is fragments fitted into a picture, market sizing is
 * a sum of counted units, repositioning is one comparison swapped for another, * so the grid can be scanned without reading a word of it.
 *
 * Two services never share a mark; that is the constraint that makes the grid
 * legible, and it is worth more than any individual icon being the obvious one.
 *
 * Practices and clusters deliberately DO share a mark where they name the same
 * domain: the GTM Strategy practice and the GTM Strategy reading cluster are
 * the same subject seen from two places on the site, and giving them two marks
 * would imply a distinction that does not exist.
 */

/** One per slug in src/content/services.ts. All thirty-six, none repeated. */
export const serviceIcon: Record<string, LucideIcon> = {
  /* ---------------- GTM Strategy & Market Intelligence ---------------- */
  "gtm-setup": Blocks, // a motion assembled from parts: market, buyer, channel, roadmap
  repositioning: Replace, // the old story swapped for the one the market now needs
  "market-intelligence": Network, // the market read as a commercial system, not a number
  "research-and-forecasting": Sigma, // evidence summed into a forward-looking figure
  "scenario-planning": GitFork, // one plan branching into more than one future
  "founder-brand": MicVocal, // one executive voice carried to where buyers listen

  /* ---------------- Account & Buying Intelligence ---------------- */
  "account-prospect-intelligence": DatabaseZap, // a buyer universe kept current, not left to decay
  "intent-account-intelligence": Radar, // a sweep that returns who is moving now
  "osint-for-sales": Puzzle, // public fragments fitted into one picture of an account

  /* ---------------- Positioning, Product Marketing & Revenue Content ---------------- */
  "product-marketing-as-a-service": Megaphone, // the product made understandable in the buyer's world
  "pitch-deck": GalleryHorizontalEnd, // a sequence of slides with one line through it
  "sales-deck": Layers, // a deck system: one spine, adapted per buying stage
  "content-marketing": NotebookPen, // long-form written from the source material
  "sales-messaging": Quote, // a point of view the market can repeat

  /* ---------------- Demand Generation & ABM ---------------- */
  "account-based-marketing": Crosshair, // named accounts held in a reticle, not a segment
  "social-selling": MessagesSquare, // a conversation started in the open
  "lead-generation-in-a-box": PackageCheck, // the missing parts delivered as one package
  "digital-only-sales-funnel": Filter, // a funnel the buyer moves through on their own

  /* ---------------- Sales Enablement & Revenue Productivity ---------------- */
  "sales-marketing-consulting": Route, // the path from strategy to execution
  "diagnostic-workshops": Stethoscope, // find the constraint before treating it
  "inside-sales-setup": Headset, // the human layer on the phone between marketing and sales
  "field-sales-enablement": MapPinned, // the seller in the field, equipped for the account
  "coaching-and-training": Presentation, // a team taught in front of the real work
  "channel-strategy": Handshake, // a partner route to market

  /* ---------------- Event & Community Demand Generation ---------------- */
  "event-abm": CalendarCheck, // an event converted into booked account meetings
  "custom-events": UsersRound, // a small room designed around one conversation
  "webinar-as-a-service": MonitorPlay, // a live session for an assembled audience
  "quiz-as-a-service": Gauge, // answers resolved into a reading
  "event-lead-generation": Ticket, // a third-party show made into a pipeline channel

  /* ---------------- LeadStrategus.ai ---------------- */
  "ai-agent-build": Bot, // one agent, one painful workflow
  "gtm-ai-twin": BrainCircuit, // the commercial logic behind good decisions, encoded
  "ai-demand-gen-system": Workflow, // connected agents from discovery to operations

  /* ---------------- ExpoToFunnel ---------------- */
  "event-discovery": ListOrdered, // shows ranked by where the ICP concentrates
  "buyer-matching": Merge, // the event matched to the buyers you want
  "meeting-intelligence": ListTodo, // a booked meeting followed through

  /* ---------------- Capability layer ---------------- */
  "revenue-operations": Cog, // the engine made measurable and operable
};

/** One per group slug in src/content/practices.ts. */
export const practiceIcon: Record<string, LucideIcon> = {
  "gtm-strategy": Compass, // the bearing chosen before anything is spent
  "account-intelligence": Telescope, // seeing further into the market than the team could unaided
  "positioning-content": PenTool, // the story, drawn deliberately
  "demand-generation": Magnet, // demand pulled toward you
  enablement: GraduationCap, // the team you already have, taught to run the motion
  events: CalendarDays, // demand moments planned on purpose
  "leadstrategus-ai": Cpu, // the AI engine
  expotofunnel: Store, // the event floor, turned into revenue
  "revenue-operations": Cog, // the capability layer under everything
};

/** One per Resource kind in src/content/resources.ts. */
export const resourceIcon: Record<Resource["kind"], LucideIcon> = {
  Guide: BookOpen, // read front to back, once
  Template: LayoutTemplate, // a frame with slots deliberately left empty for you
  Webinar: CirclePlay, // a recording waiting to be played
  Benchmark: Ruler, // your own number held against a fixed scale
  Checklist: ListChecks, // items ticked off one at a time, in order
};

/** One per cluster slug in src/content/insights.ts. Three mirror their practice. */
export const clusterIcon: Record<string, LucideIcon> = {
  "gtm-strategy": Compass,
  "demand-generation": Magnet,
  "revenue-intelligence": Telescope,
  "ai-in-gtm": BrainCircuit, // reasoning wired into a circuit, the agent doing the work
};

/**
 * Total accessors for every map.
 *
 * tsconfig does not set noUncheckedIndexedAccess, so `practiceIcon[slug]` types
 * as LucideIcon even when the key is absent, which means a practice or cluster
 * added to content before it is given a mark compiles cleanly and then crashes
 * at render. Go through these instead of indexing the records directly. The
 * neutral fallback reads as "unclassified" rather than as the wrong mechanism.
 */
export function iconFor(slug: string): LucideIcon {
  return serviceIcon[slug] ?? Shapes;
}
export function practiceIconFor(slug: string): LucideIcon {
  return practiceIcon[slug] ?? Shapes;
}
export function clusterIconFor(slug: string): LucideIcon {
  return clusterIcon[slug] ?? Shapes;
}
export function resourceIconFor(kind: string): LucideIcon {
  return (resourceIcon as Record<string, LucideIcon>)[kind] ?? Shapes;
}
