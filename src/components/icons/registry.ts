import {
  BookOpen,
  BrainCircuit,
  Blocks,
  CalendarCheck,
  CirclePlay,
  Compass,
  Crosshair,
  DatabaseZap,
  Gauge,
  GraduationCap,
  Headset,
  LandPlot,
  LayoutTemplate,
  Magnet,
  Mails,
  Megaphone,
  MessagesSquare,
  MicVocal,
  MonitorPlay,
  NotebookPen,
  PackageCheck,
  Presentation,
  Puzzle,
  Radar,
  Replace,
  Ruler,
  Scale,
  Shapes,
  Sigma,
  SquareDashedMousePointer,
  Swords,
  Telescope,
  Waypoints,
  Workflow,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import type { Resource } from "@/content/resources";

/**
 * The site's iconography, chosen by mechanism rather than by category.
 *
 * Twenty-four service cards that all carry a magnifying glass or a bar chart
 * are twenty-four identical cards. Each mark below depicts what the service
 * physically DOES — OSINT is fragments fitted into a picture, market sizing is
 * a sum of counted units, repositioning is one comparison swapped for another —
 * so the grid can be scanned without reading a word of it.
 *
 * Two services never share a mark; that is the constraint that makes the grid
 * legible, and it is worth more than any individual icon being the obvious one.
 *
 * Practices and clusters deliberately DO share a mark where they name the same
 * domain: the GTM Strategy practice and the GTM Strategy reading cluster are
 * the same subject seen from two places on the site, and giving them two marks
 * would imply a distinction that does not exist.
 */

/** One per slug in src/content/services.ts. All twenty-four, none repeated. */
export const serviceIcon: Record<string, LucideIcon> = {
  /* ---------------- GTM Strategy & Positioning ---------------- */
  "gtm-setup": Blocks, // a motion assembled from parts: sizing, segment, story, channels, plan
  repositioning: Replace, // one comparison swapped out for the one that wins
  "icp-definition": SquareDashedMousePointer, // a boundary drawn round who fits, leaving the rest outside
  "pricing-and-packaging": Scale, // willingness to pay weighed against what else the buyer could buy
  "india-entry": LandPlot, // ground measured and staked before anything is built on it
  "founder-brand": MicVocal, // one person's voice carried to where buyers already listen

  /* ---------------- Demand Generation ---------------- */
  "account-based-marketing": Crosshair, // named companies held in a reticle, not a segment
  "social-selling": MessagesSquare, // a reply in a public thread — two people, in the open
  "outbound-sequencing": Mails, // a cadence of sends, never a single message
  "content-marketing": NotebookPen, // long-form written by hand from the source material
  "webinar-as-a-service": MonitorPlay, // a live session run on a screen for an assembled audience
  "quiz-as-a-service": Gauge, // answers resolved to a reading on a scale
  "lead-generation-in-a-box": PackageCheck, // fixed scope sealed, delivered and handed over intact
  "event-lead-generation": CalendarCheck, // a conference converted into booked slots
  "product-marketing-as-a-service": Megaphone, // the launch, announced once and carried into every channel

  /* ---------------- Revenue Intelligence ---------------- */
  "database-as-a-service": DatabaseZap, // a store re-verified on a schedule instead of left to decay
  "intent-account-intelligence": Radar, // a sweep that returns who is moving, ranked by proximity
  "osint-for-sales": Puzzle, // public fragments fitted into one picture of an account
  "market-research": Sigma, // a total summed bottom-up from counted units
  "competitive-intelligence": Swords, // the head-to-head your reps actually meet in the room

  /* ---------------- Enablement ---------------- */
  "sales-coaching": Headset, // coaching by listening in on the rep's real calls
  "marketing-training": Presentation, // a cohort taught in front of the work
  "ai-in-gtm-training": Workflow, // tools wired into a sequence, with the guard-rails placed
  "change-management": Waypoints, // a rollout staged through people, reinforced at each stop
};

/** One per slug in src/content/practices.ts. */
export const practiceIcon: Record<string, LucideIcon> = {
  "gtm-strategy": Compass, // the bearing chosen before a rupee is spent travelling
  "demand-generation": Magnet, // demand pulled toward you, whichever motion does the pulling
  "revenue-intelligence": Telescope, // seeing further into the market than the team could unaided
  enablement: GraduationCap, // the team you already have, taught to run the motion
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
  "ai-in-gtm": BrainCircuit, // reasoning wired into a circuit — the agent doing the work
};

/**
 * Service mark for a slug. Never undefined: a card rendered for a service
 * added to content before it was given a mark still gets a plate, and the
 * neutral fallback reads as "unclassified" rather than as the wrong mechanism.
 */
export function iconFor(slug: string): LucideIcon {
  return serviceIcon[slug] ?? Shapes;
}
