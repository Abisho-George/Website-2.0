/**
 * The site's motion vocabulary, in one place.
 *
 * These are the same five curves and four durations declared in globals.css,
 * exposed to the components that have to drive motion in JS (a count-up, a
 * travelling indicator, a scroll scrub). A CSS hover and a JS entrance on the
 * same card must agree about what this site feels like; if one changes here,
 * change the other there.
 *
 *   entrance   decelerating, anything ARRIVING
 *   standard   state changes that happen in place and do not travel
 *   crisp      near-instant start, long hard stop: mask reveals, rule draws
 *   exit       accelerating, leaving, always one step faster than entering
 *   overshoot  one small bounce, allowed only on marks under ~12px
 *
 * Nothing here imports an animation library. Every entrance on this site is a
 * CSS transition gated by a class, and every continuous animation shares the
 * one ticker in components/visual/surface/ticker.ts. That is a deliberate
 * choice, not an omission: the single-file preview bundle strips all scripts,
 * so anything whose resting state is "invisible until JS says otherwise"
 * ships blank in the artifact the client actually reviews.
 */

/** CSS timing functions, for inline styles and for reference. */
export const ease = {
  entrance: "cubic-bezier(0.16, 0.84, 0.28, 1)",
  standard: "cubic-bezier(0.4, 0.14, 0.2, 1)",
  crisp: "cubic-bezier(0.22, 0, 0, 1)",
  exit: "cubic-bezier(0.5, 0, 0.9, 0.35)",
  overshoot: "cubic-bezier(0.34, 1.28, 0.48, 1)",
} as const;

/** The same curves as coefficients, for anything easing a value by hand. */
export const curve = {
  entrance: [0.16, 0.84, 0.28, 1],
  standard: [0.4, 0.14, 0.2, 1],
  crisp: [0.22, 0, 0, 1],
  exit: [0.5, 0, 0.9, 0.35],
  overshoot: [0.34, 1.28, 0.48, 1],
} as const;

/** Milliseconds, mirroring --dur-1..4. An exit takes the step below its entrance. */
export const dur = {
  1: 220, // control feedback: press, select, lift, accordion
  2: 380, // one element entering
  3: 620, // a block entering; a heading mask reveal
  4: 900, // hard ceiling: hero choreography only
} as const;

export const stagger = { base: 70, tight: 45 } as const;

/** Travel distances in px, mirroring --rise-1..3. */
export const rise = { 1: 10, 2: 18, 3: 28 } as const;

/**
 * Per-frame lerp factors for values that follow rather than animate to a
 * target, a scroll scrub, an indicator chasing the active tab. Higher is
 * tighter. These are frame-rate dependent by design: they are only ever used
 * through the shared ticker, which clamps dt.
 */
export const follow = { scrub: 0.16, travel: 0.26 } as const;

/** Cubic ease-out, the curve a count-up should land on. */
export const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

/** Stagger delay for the i-th sibling, capped so long lists do not trail. */
export function beat(i: number, step: number = stagger.base, cap = 8) {
  return Math.min(i, cap) * step;
}
