/**
 * One time-driven loop for the whole page.
 *
 * Every ambient surface on the site (canvas scenes, run logs, scrubbed bars)
 * subscribes here instead of calling requestAnimationFrame itself. The loop
 * runs only while at least one subscriber is attached AND the tab is visible,
 * so a backgrounded tab or a page whose animated panels have all scrolled away
 * costs nothing at all.
 *
 * dt is clamped: a tab restored after ten minutes must not fast-forward every
 * subscriber to its end state in a single frame.
 */
import { useEffect, useRef, useState, type RefObject } from "react";

type Frame = (dt: number, t: number) => void;

const MAX_DT = 50;

const subs = new Set<Frame>();
let raf = 0;
let last = 0;
let clock = 0;
let bound = false;

function frame(now: number) {
  const dt = last ? Math.min(MAX_DT, now - last) : 16.7;
  last = now;
  clock += dt;
  // copy: a subscriber may unsubscribe from inside its own callback
  for (const fn of Array.from(subs)) fn(dt, clock);
  if (subs.size && document.visibilityState === "visible") {
    raf = requestAnimationFrame(frame);
  } else {
    raf = 0;
    last = 0;
  }
}

function start() {
  if (raf || !subs.size) return;
  if (typeof document === "undefined" || document.visibilityState !== "visible") return;
  last = 0;
  raf = requestAnimationFrame(frame);
}

function stop() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  last = 0;
}

function bind() {
  if (bound || typeof document === "undefined") return;
  bound = true;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") start();
    else stop();
  });
}

/** Attach a per-frame callback. Returns an unsubscribe function. */
export function subscribe(fn: Frame) {
  bind();
  subs.add(fn);
  start();
  return () => {
    subs.delete(fn);
    if (!subs.size) stop();
  };
}

/** Subscribe to the shared loop only while `active` is true. */
export function useTicker(fn: Frame, active: boolean) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    if (!active) return;
    return subscribe((dt, t) => fnRef.current(dt, t));
  }, [active]);
}

/** True while the element is within `rootMargin` of the viewport. */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "160px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/** Reads the user's motion preference and follows it if they change it mid-session. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}
