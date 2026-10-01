"use client";
import { useEffect, useRef, type CanvasHTMLAttributes } from "react";
import { subscribe } from "./surface/ticker";

export type SceneEnv = {
  /** CSS pixels, the context is already scaled by dpr, so draw in these. */
  w: number;
  h: number;
  dpr: number;
  /** Narrow viewport: halve densities, drop the expensive passes. */
  lowPower: boolean;
  reduced: boolean;
  /** Milliseconds since the shared ticker started, and since the previous frame. */
  t: number;
  dt: number;
};

export type Scene = {
  /** Called after every resize, before the first draw at that size. */
  resize?: (env: SceneEnv) => void;
  draw: (ctx: CanvasRenderingContext2D, env: SceneEnv) => void;
};

type Props = {
  /** Built once, on the first client render, see the lazy ref idiom in callers. */
  scene: Scene;
  /** Below this width the scene is told to run cheap. */
  lowPowerWidth?: number;
  /** How far outside the viewport the scene keeps running. */
  rootMargin?: string;
} & CanvasHTMLAttributes<HTMLCanvasElement>;

/**
 * Hosts a canvas scene and owns everything a canvas on a long page must do and
 * usually doesn't: clamp devicePixelRatio, redraw on resize, draw exactly one
 * frame and stop under prefers-reduced-motion, and, the part that matters, * run only while it is actually on screen and the tab is in front.
 *
 * Scenes never call requestAnimationFrame; they subscribe to the one shared
 * ticker, so a page with several of them still has a single loop.
 */
export function CanvasScene({ scene, lowPowerWidth = 700, rootMargin = "160px", ...rest }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef(scene);
  sceneRef.current = scene;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const env: SceneEnv = { w: 0, h: 0, dpr: 1, lowPower: false, reduced, t: 0, dt: 0 };
    let unsub: (() => void) | null = null;
    let onScreen = false;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(1.75, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      env.w = w;
      env.h = h;
      env.dpr = dpr;
      env.lowPower = w < lowPowerWidth;
      sceneRef.current.resize?.(env);
      sceneRef.current.draw(ctx, env);
    };

    const run = () => {
      if (unsub || reduced) return;
      unsub = subscribe((dt, t) => {
        env.dt = dt;
        env.t = t;
        sceneRef.current.draw(ctx, env);
      });
    };
    const halt = () => {
      unsub?.();
      unsub = null;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && document.visibilityState === "visible") run();
        else halt();
      },
      { rootMargin },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.visibilityState === "visible" && onScreen) run();
      else halt();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      halt();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [lowPowerWidth, rootMargin]);

  return <canvas ref={ref} aria-hidden {...rest} />;
}
