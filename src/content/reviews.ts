import { site } from "./site";

/**
 * LeadStrategus on Clutch. The rating, review count and score breakdown are
 * Clutch's published figures (clutch.co/profile/leadstrategus).
 *
 * Each review keeps the reviewer's headline quote word for word and Clutch's
 * feedback summary, but never the reviewer's name or company: the reviewer is
 * described by role, kind of company, size and region only.
 */
export type Review = {
  quote: string;
  summary: string;
  role: string;
  company: string;
  size: string;
  region: string;
  project: string;
  date: string;
  scores: { quality: number; schedule: number; cost: number; refer: number };
};

export const clutch = {
  url: site.social.clutch,
  rating: "5.0",
  count: 7,
  scores: [
    { k: "Quality", v: "5.0" },
    { k: "Schedule", v: "5.0" },
    { k: "Cost", v: "4.8" },
    { k: "Would refer", v: "5.0" },
  ],
};

export const reviews: Review[] = [
  {
    quote: "LeadStrategus' ABM model is extremely well-researched.",
    summary: "LeadStrategus' efforts have generated over 20 qualified leads and close to 20 meetings in four months. The team delivers on time and communicates effectively via virtual meetings, emails, and messaging apps. Their well-researched ABM model and personalized messaging are hallmarks of their work.",
    role: "Head of Marketing",
    company: "IT services company",
    size: "1,001 to 5,000 employees",
    region: "United States",
    project: "Demand generation and market research",
    date: "Dec 2025",
    scores: { quality: 5, schedule: 5, cost: 5, refer: 5 },
  },
  {
    quote: "LeadStrategus's commitment to in-depth understanding exceeded initial project goals.",
    summary: "LeadStrategus crafted a tailored messaging sequence based on well-defined buyer personas, helping the client communicate more effectively with their target audience. The detail-oriented team exhibited a commitment to delivering on time and eagerly accommodated requests and scope changes throughout.",
    role: "CEO",
    company: "IT company",
    size: "1,001 to 5,000 employees",
    region: "India",
    project: "Market research",
    date: "Feb 2024",
    scores: { quality: 5, schedule: 5, cost: 5, refer: 5 },
  },
  {
    quote: "They delivered on time and were dedicated to their work.",
    summary: "The client was satisfied with LeadStrategus' services. The team delivered on time and responded to the client's needs promptly. They were also highly dedicated to their work, which impressed the client. The partners communicated via in-person and virtual meetings, email, and messaging apps.",
    role: "Director of Technology",
    company: "IT services firm",
    size: "11 to 50 employees",
    region: "India",
    project: "Market research and marketing strategy",
    date: "Jun 2023",
    scores: { quality: 5, schedule: 5, cost: 5, refer: 5 },
  },
  {
    quote: "We had a good time working with LeadStrategus across multiple instances.",
    summary: "LeadStrategus sent out over 1,800 connection requests and successfully connected with 26% of those prospective clients. The team also generated deep conversations with 70 connections and converted 40% of them. The internal stakeholders were particularly impressed with the vendor's creative prowess.",
    role: "Former VP",
    company: "IT solutions firm",
    size: "201 to 500 employees",
    region: "India",
    project: "LinkedIn lead generation",
    date: "Mar 2023",
    scores: { quality: 5, schedule: 5, cost: 4, refer: 5 },
  },
  {
    quote: "They were flexible enough to make any last-minute changes.",
    summary: "Thanks to LeadStrategus' efforts, the client was able to connect with various prospects and meet with some of them. The team handled the entire project very well: they were always on top of tasks, making sure all deadlines and goals were met. They were also flexible, knowledgeable, and accessible.",
    role: "Head of Strategic Initiatives",
    company: "Data management software company",
    size: "501 to 1,000 employees",
    region: "India",
    project: "Lead generation",
    date: "Feb 2023",
    scores: { quality: 5, schedule: 5, cost: 4.5, refer: 5 },
  },
  {
    quote: "I liked the deep interest with which they worked on different aspects.",
    summary: "With LeadStrategus handling sales and marketing activities, the client gained critical domain knowledge that opened doors for more opportunities. Regular calls and progress updates with the team led to a smooth workflow. They stayed helpful throughout the project.",
    role: "Founder & CEO",
    company: "Predictive analytics company",
    size: "1 to 10 employees",
    region: "India",
    project: "Sales and marketing",
    date: "Jan 2023",
    scores: { quality: 5, schedule: 5, cost: 5, refer: 5 },
  },
  {
    quote: "Their expertise in digging out information through secondary research at every stage was very impressive.",
    summary: "The final report by LeadStrategus was picked up by local financial media and publication houses. It also enabled the client to create a successful event that managed to garner a lot of reactions from the market. The team was able to deliver a smooth workflow throughout the engagement.",
    role: "Director",
    company: "Global professional services firm",
    size: "10,001+ employees",
    region: "India",
    project: "Market study and report",
    date: "Jan 2023",
    scores: { quality: 5, schedule: 5, cost: 5, refer: 5 },
  },
];
