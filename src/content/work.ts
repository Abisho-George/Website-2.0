import type { CaseStudy } from "./types";

/**
 * Case studies are anonymised by default. Every number is a PLACEHOLDER
 * until it is traced to a Clutch review or a signed-off study.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "devtools-outbound-engine",
    client: "Series-B developer-tools company",
    vertical: "DevTools / SaaS",
    region: "United States",
    practice: "Demand Generation",
    practiceSlug: "demand-generation",
    title: "An outbound engine that booked [[23]] qualified meetings in its first quarter",
    summary: "Intent-ranked universe, persona-level messaging and a two-person pod turned a dormant outbound motion into the company's largest pipeline source.",
    stats: [
      { value: "[[23]]", label: "qualified meetings, quarter one" },
      { value: "[[41%]]", label: "meeting-to-opportunity" },
      { value: "[[$1.9M]]", label: "pipeline created in six months" },
    ],
    challenge:
      "The company had product-led adoption among individual developers but no repeatable way to reach the platform-engineering leaders who sign enterprise contracts. Two SDRs had churned in a year; sequences were generic and the list was two years old.",
    approach: [
      "Rebuilt the account universe from GitHub activity, job postings and tech-stack detection, then ranked it on fit and live signals.",
      "Interviewed eight customers to write persona-level messaging for VP Engineering, Platform Lead and Head of DevEx.",
      "Ran a six-step outbound sequence across email and LinkedIn from warmed sending domains, with social selling from the CTO's profile.",
      "Delivered every meeting with an account brief and the thread that earned it; reviewed conversion weekly with the CRO.",
    ],
    outcome:
      "Outbound became the largest source of enterprise pipeline within two quarters. The client hired an internal SDR in month seven and we handed over the universe, sequences and playbook.",
    quote: { text: "[[They crafted a tailored messaging sequence based on well-defined buyer personas. We finally sounded like we understood our buyers.]]", who: "[[VP Marketing, client]]" },
    tags: ["Outbound", "Intent data", "Social selling"],
    featured: true,
    year: "2025",
  },
  {
    slug: "healthcare-social-selling",
    client: "Healthcare IT platform",
    vertical: "Healthcare IT",
    region: "India & Middle East",
    practice: "Demand Generation",
    practiceSlug: "demand-generation",
    title: "Social selling from four executive profiles opened [[19]] hospital-group conversations",
    summary: "A leadership-led LinkedIn programme replaced cold calling into hospital administrators, who do not answer the phone.",
    stats: [
      { value: "[[19]]", label: "hospital groups engaged" },
      { value: "[[4]]", label: "executive profiles run" },
      { value: "[[7]]", label: "opportunities in 90 days" },
    ],
    challenge:
      "Hospital CIOs and medical directors were unreachable by phone and email. The company's leadership had credibility in the sector but no presence where those buyers actually spent time.",
    approach: [
      "Mapped every target hospital group's buying committee and their LinkedIn behaviour.",
      "Built a content cadence for four executives: clinical-workflow insight pieces, commentary on regulation, and case notes, each approved by the executive before publishing.",
      "Ran research-led engagement: comments and direct messages that referenced the prospect's own posts, hiring or announcements.",
      "Trained the leadership team to sustain the programme through our Enablement practice.",
    ],
    outcome:
      "Nineteen hospital groups moved into active conversation within ninety days. The programme is now run in-house by the client's marketing team on the playbook we left.",
    tags: ["Social selling", "Enablement", "Healthcare"],
    featured: true,
    year: "2024",
  },
  {
    slug: "docsoft-enterprise-abm",
    client: "Document-management software vendor",
    vertical: "Document Software",
    region: "United Kingdom & Europe",
    practice: "Demand Generation",
    practiceSlug: "demand-generation",
    title: "Event-led ABM that put the company in front of [[14]] of its top-20 target accounts",
    summary: "A tier-1 account programme built around two industry events, with pre-event research, on-site meetings and a post-event nurture that converted.",
    stats: [
      { value: "[[14/20]]", label: "tier-1 accounts met in person" },
      { value: "[[6]]", label: "enterprise opportunities" },
      { value: "[[3]]", label: "closed in the following two quarters" },
    ],
    challenge:
      "The vendor's enterprise deals took eighteen months and depended on a single champion. Twenty named accounts represented most of the year's target, and none had a live conversation.",
    approach: [
      "Deep OSINT briefs on every tier-1 account: buying group, current tooling, contract renewal windows and public priorities.",
      "Pre-event outreach eight weeks out, offering a research-backed point of view rather than a demo.",
      "Ran the on-site programme (Event ABM as a Service): scheduling, briefs for the sales team, follow-up within 24 hours.",
      "Multi-threaded each account post-event with content mapped to each stakeholder's concern.",
    ],
    outcome:
      "Fourteen of twenty tier-1 accounts held face-to-face meetings; six entered the pipeline and three closed within two quarters, the fastest enterprise cycles in the company's history.",
    tags: ["ABM", "Events", "OSINT"],
    featured: true,
    year: "2024",
  },
  {
    slug: "testing-webinar-series",
    client: "Software-testing services firm",
    vertical: "Software Testing / IT Services",
    region: "United States",
    practice: "Demand Generation",
    practiceSlug: "demand-generation",
    title: "Webinar-as-a-Service: a four-part series that built a [[1,100]]-contact engaged database",
    summary: "We ran audience acquisition, content, hosting and follow-up for a quarterly webinar series, so the client's team only had to show up and speak.",
    stats: [
      { value: "[[1,100+]]", label: "registrants across four sessions" },
      { value: "[[46%]]", label: "live attendance rate" },
      { value: "[[28]]", label: "sales conversations generated" },
    ],
    challenge:
      "The firm had genuine expertise in test automation but no audience. Previous webinars drew thirty people, mostly existing customers.",
    approach: [
      "Chose topics from search and community data rather than what the client wanted to present.",
      "Acquired audience through targeted LinkedIn campaigns, partner co-promotion and a Quiz-as-a-Service teaser that qualified interest.",
      "Produced and hosted all four sessions, handled Q&A logistics and delivered a scored attendee list to sales within 24 hours.",
      "Ran a post-series nurture sequence and passed engaged accounts to the client's SDRs with briefs.",
    ],
    outcome:
      "The series built the company's first real marketing database and became a recurring quarterly programme, now in its third year.",
    tags: ["Webinar-as-a-Service", "Quiz-as-a-Service", "Content"],
    year: "2023",
  },
  {
    slug: "cloud-partner-india-entry",
    client: "Cloud consulting partner",
    vertical: "Cloud & Infrastructure",
    region: "India",
    practice: "GTM Strategy",
    practiceSlug: "gtm-strategy",
    title: "Repositioning a global cloud partner for India: from 'we do everything' to one wedge",
    summary: "Market sizing, a single-wedge positioning and a 90-day plan took a partner from zero Indian pipeline to a funded regional practice.",
    stats: [
      { value: "[[6 wks]]", label: "diagnostic to board-approved plan" },
      { value: "[[1]]", label: "wedge offer chosen from eleven services" },
      { value: "[[₹4.2 Cr]]", label: "pipeline in the first two quarters" },
    ],
    challenge:
      "A well-regarded cloud partner entered India with its full global catalogue. Eleven service lines, no local proof, and a sales team that led with credentials nobody recognised.",
    approach: [
      "Bottom-up sizing of the Indian mid-market by workload type and cloud maturity.",
      "Interviews with fourteen Indian CIOs and CTOs on what they would pay a partner for this year.",
      "Positioned the partner on one wedge (cost-optimisation-led migration) with a public benchmark as the proof asset.",
      "Wrote the 90-day operating plan and ran the first quarter through our Demand Generation practice.",
    ],
    outcome:
      "The regional practice hit its first-year pipeline target inside two quarters and was funded for a second wave of hires. The wedge offer is now the partner's lead proposition in two other markets.",
    tags: ["GTM strategy", "India entry", "Positioning"],
    featured: false,
    year: "2025",
  },
  {
    slug: "mediatech-expansion-intel",
    client: "Media-technology company",
    vertical: "Media Technology",
    region: "Southeast Asia",
    practice: "Revenue Intelligence",
    practiceSlug: "revenue-intelligence",
    title: "A living account universe for expansion into three new markets",
    summary: "Database-as-a-Service plus OSINT monitoring gave a media-tech company its first accurate map of broadcasters and publishers across Southeast Asia.",
    stats: [
      { value: "[[2,400]]", label: "accounts mapped and verified" },
      { value: "[[96%]]", label: "contact accuracy on delivery" },
      { value: "[[3]]", label: "markets launched on the dataset" },
    ],
    challenge:
      "The company's expansion plan depended on lists bought from two vendors that disagreed with each other and with reality. Sales spent a third of their time cleaning data.",
    approach: [
      "Defined the ICP and a signal taxonomy with the regional sales lead: ad-tech migrations, streaming launches, leadership changes.",
      "Assembled a universe from twenty-two sources, deduplicated against CRM and verified by hand for tier-1 accounts.",
      "Mapped buying groups for every tier-1 account and switched on OSINT monitoring with a weekly ranked feed.",
      "Trained the SDR team to work from the feed rather than the list.",
    ],
    outcome:
      "Sales stopped cleaning data. The company launched in three markets on the dataset and renewed the intelligence subscription for a second year.",
    tags: ["Database-as-a-Service", "OSINT", "Market research"],
    year: "2024",
  },
];

export function getCase(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
export const featuredCases = caseStudies.filter((c) => c.featured);
