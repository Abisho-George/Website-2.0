/** Enquiry types, one per family and platform, so a service page can preselect its own. */
export const enquiryTypes = [
  ["gtm-ai-twin", "GTM AI Twin"],
  ["gtm-strategy", "GTM Strategy & Market Intelligence"],
  ["account-intelligence", "Account & Buying Intelligence"],
  ["positioning-content", "Positioning, Product Marketing & Revenue Content"],
  ["demand-generation", "Demand Generation & ABM"],
  ["enablement", "Sales Enablement & Revenue Productivity"],
  ["events", "Event & Community Demand Generation"],
  ["leadstrategus-ai", "LeadStrategus.ai"],
  ["expotofunnel", "ExpoToFunnel"],
  ["other", "Something else"],
] as const;
export type EnquiryType = (typeof enquiryTypes)[number][0];
export const enquiryLabel = (t: string) => enquiryTypes.find((e) => e[0] === t)?.[1] ?? "your enquiry";
/** A group with no enquiry type of its own (the capability layer) maps to "other". */
export const enquiryFor = (group: string) => (enquiryTypes.some((e) => e[0] === group) ? group : "other");
