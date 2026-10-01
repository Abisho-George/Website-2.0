/**
 * Brand assets.
 *
 * To use the real artwork, drop the files into /public/brand and fill in the
 * paths below, nothing else needs to change:
 *
 *   public/brand/mark.svg       the shield (square, transparent)
 *   public/brand/wordmark.svg   "LeadStrategus" in full colour, for light grounds
 *   public/brand/wordmark-light.svg   knockout version, for the dark nav
 *
 * Leave a path as null and the built-in vector version is used instead.
 */
export const brand = {
  assets: {
    mark: null as string | null,
    wordmark: null as string | null,
    wordmarkLight: null as string | null,
  },
  colors: {
    red: "#e4121f",
    redLight: "#ff4452",
    blue: "#2438c8",
    blueLight: "#1667f0",
    navy: "#141c7a",
  },
};
