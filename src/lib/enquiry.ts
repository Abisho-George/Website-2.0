export const enquiryTypes = [
  ["gtm-ai-twin", "GTM AI Twin"],
  ["demand-generation", "Demand Generation"],
  ["gtm-strategy", "GTM Strategy & Positioning"],
  ["revenue-intelligence", "Revenue Intelligence"],
  ["enablement", "Enablement & Coaching"],
  ["other", "Something else"],
] as const;
export type EnquiryType = (typeof enquiryTypes)[number][0];
export const enquiryLabel = (t: string) => enquiryTypes.find((e) => e[0] === t)?.[1] ?? "your enquiry";
