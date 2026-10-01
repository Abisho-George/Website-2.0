/**
 * Brand assets and colours, from the LeadStrategus brand kit.
 *
 * The shield is cut from the master artwork by scripts/brand/make-mark.mjs,
 * which also writes the favicon and app icons. Three lockups are used:
 *
 *   mark        the shield alone: browser tab, app icons, small spaces
 *   horizontal  shield + LEADSTRATEGUS: the navigation, share images
 *   full        shield + LEADSTRATEGUS + "Superpower your sales!": the footer
 */
export const brand = {
  name: "LEADSTRATEGUS",
  tagline: "Superpower your sales!",
  assets: {
    /** the shield as used on the page (168px tall: 3x its largest display) */
    mark: "/brand/mark-sm.png",
    /** natural size of mark-sm.png, for an exact aspect ratio */
    markSize: { width: 140, height: 168 },
  },
  colors: {
    red: "#e10600", // Strategic Red
    redDeep: "#b10000", // Deep Red
    blue: "#0066ff", // Electric Blue
    navy: "#0b2a6b", // Navy Blue
    silver: "#e8ecf2",
    ink: "#0b1226", // the wordmark
  },
  fonts: {
    wordmark: "Cinzel (Trajan Pro in print), Bold",
    tagline: "Montserrat, Medium",
  },
};
