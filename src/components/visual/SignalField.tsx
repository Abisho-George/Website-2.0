"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { CanvasScene, type Scene, type SceneEnv } from "./CanvasScene";

/**
 * The hero visual: the firm's actual subject drawn as a diagram.
 *
 * Every account in a market enters at the left, three gates thin the field
 * (identify → qualify → book), and the survivors converge on a booked meeting.
 * Ink dots on paper; the ones that survive turn ember.
 *
 * The geometry is deliberately pushed right. The first version ran the whole
 * width and was then erased under the headline by a white gradient, which
 * bleached most of the drawing to pay for legibility. Now the left third is
 * empty by construction, so the copy sits on paper and the diagram is drawn at
 * full strength where there is room for it.
 *
 * Three z-planes give parallax without a library: a particle's plane scales its
 * radius, its alpha and its speed, so the field has depth rather than being a
 * flat scatter. The gate labels are DOM, not canvas — canvas text is blurry on
 * a retina screen, cannot be themed, and ctx.letterSpacing is silently ignored
 * by Safari below 17.
 */

const GATES = [0.34, 0.6, 0.82];
const MEET_X = 0.9; // inside the frame: the booked meeting is the payoff, not an edge crop
const KEEP = [0.6, 0.55, 0.5];
const PLANES = [0.6, 0.85, 1] as const;
const LINK_D2 = 7400;
const LINK_DX = 86; // px — beyond this no pair can be within LINK_D2
const SWEEP_EVERY = 9000; // ms between scan passes

type P = {
  x: number; y: number; px: number; py: number;
  vx: number; vy: number;
  stage: number; alive: boolean; t: number; seed: number; fade: number; z: number;
};

const ink = (a: number) => `rgba(23,18,13,${a})`;
const ember = (a: number) => `rgba(228,18,31,${a})`;

function spawn(p?: P): P {
  const q = (p ?? {}) as P;
  q.x = -0.04 - Math.random() * 0.22;
  q.y = 0.1 + Math.random() * 0.8;
  q.px = q.x; q.py = q.y;
  q.vx = 0.001 + Math.random() * 0.0012;
  q.vy = (Math.random() - 0.5) * 0.0003;
  q.stage = 0;
  q.alive = true;
  q.t = 0;
  q.seed = Math.random();
  q.fade = 0;
  q.z = PLANES[(Math.random() * PLANES.length) | 0];
  return q;
}

function makeScene(): Scene {
  let ps: P[] = [];

  const resize = (env: SceneEnv) => {
    const n = env.w < 700 ? 40 : env.w < 1100 ? 84 : 132;
    ps = Array.from({ length: n }, () => {
      const p = spawn();
      p.x = Math.random() * 1.15 - 0.15;
      p.px = p.x;
      p.stage = GATES.filter((g) => p.x > g).length;
      if (p.stage === 3) p.alive = Math.random() < 0.4;
      return p;
    });
  };

  const draw = (ctx: CanvasRenderingContext2D, env: SceneEnv) => {
    const { w, h, reduced, lowPower } = env;
    ctx.clearRect(0, 0, w, h);
    const meet = { x: w * MEET_X, y: h * 0.5 };

    // gates
    ctx.setLineDash([2, 7]);
    ctx.strokeStyle = ink(0.13);
    ctx.lineWidth = 1;
    for (const g of GATES) {
      const x = w * g;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.1);
      ctx.lineTo(x, h - 34);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // a scan pass every few seconds, so the field reads as live rather than idle
    if (!reduced) {
      const phase = (env.t % SWEEP_EVERY) / SWEEP_EVERY;
      if (phase < 0.28) {
        const sx = w * (0.1 + (phase / 0.28) * 0.95);
        const grd = ctx.createLinearGradient(sx - 90, 0, sx + 40, 0);
        grd.addColorStop(0, ember(0));
        grd.addColorStop(0.8, ember(0.05));
        grd.addColorStop(1, ember(0));
        ctx.fillStyle = grd;
        ctx.fillRect(sx - 90, 0, 130, h);
      }
    }

    // the booked meeting
    const pulse = 0.5 + 0.5 * Math.sin(env.t / 700);
    const grd = ctx.createRadialGradient(meet.x, meet.y, 0, meet.x, meet.y, 54 + pulse * 16);
    grd.addColorStop(0, ember(0.22));
    grd.addColorStop(1, ember(0));
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(meet.x, meet.y, 72, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ember(1);
    ctx.beginPath();
    ctx.arc(meet.x, meet.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ember(0.45);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(meet.x, meet.y, 11 + pulse * 5, 0, Math.PI * 2);
    ctx.stroke();

    // relationships between qualified accounts — the one O(n²) pass, bounded on
    // both ends: qualified only, and an x-distance reject before the multiply
    if (!lowPower) {
      ctx.lineWidth = 0.7;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        if (!a.alive || a.stage < 2) continue;
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          if (!b.alive || b.stage < 2) continue;
          const dx = (a.x - b.x) * w;
          if (dx > LINK_DX || dx < -LINK_DX) continue;
          const dy = (a.y - b.y) * h;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_D2) {
            ctx.strokeStyle = ember(0.1 * (1 - d2 / LINK_D2));
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
    }

    for (const p of ps) {
      if (!reduced) {
        p.px = p.x; p.py = p.y;
        p.t += 1;
        const speed = p.z === PLANES[0] ? 0.55 : 1;
        if (p.stage === 3 && p.alive) {
          const tx = MEET_X, ty = 0.5;
          p.x += ((tx - p.x) * 0.022 + 0.0004) * speed;
          p.y += (ty - p.y) * 0.035 * speed;
          if (Math.abs(p.x - tx) < 0.004 && Math.abs(p.y - ty) < 0.012) spawn(p);
        } else {
          p.x += p.vx * speed;
          p.y += (p.vy + Math.sin(p.t / 44 + p.seed * 10) * 0.00022) * speed;
          if (!p.alive) {
            p.fade += 0.022;
            if (p.fade >= 1) spawn(p);
          }
        }
        const next = GATES[p.stage];
        if (next !== undefined && p.x >= next) {
          p.stage += 1;
          if (p.alive && Math.random() > KEEP[p.stage - 1]) p.alive = false;
        }
        if (p.x > 1.06) spawn(p);
      }

      const base = p.alive ? [0.16, 0.3, 0.55, 0.9][p.stage] : Math.max(0, 0.16 - p.fade * 0.16);
      const alpha = base * (0.55 + p.z * 0.45);
      const r = (p.alive ? [1.3, 1.7, 2.2, 2.8][p.stage] : 1.3) * p.z;
      const col = p.stage === 0 ? ink : ember;

      // a short trail, so a particle reads as travelling rather than blinking
      if (!reduced && !lowPower && p.alive && p.stage > 0) {
        ctx.strokeStyle = ember(alpha * 0.32);
        ctx.lineWidth = r * 0.8;
        ctx.beginPath();
        ctx.moveTo(p.px * w, p.py * h);
        ctx.lineTo(p.x * w, p.y * h);
        ctx.stroke();
      }

      ctx.fillStyle = col(alpha);
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2);
      ctx.fill();
      if (p.alive && p.stage >= 2) {
        ctx.fillStyle = ember(0.1);
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, r * 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  return { resize, draw };
}

const LABELS = ["Identify", "Qualify", "Book"];

export function SignalField({ className }: { className?: string }) {
  const sceneRef = useRef<Scene | null>(null);
  if (!sceneRef.current) sceneRef.current = makeScene();
  return (
    <div className={cn("relative", className)} aria-hidden>
      <CanvasScene scene={sceneRef.current} data-signal-field className="absolute inset-0 h-full w-full" />
      {/* Not `.eyebrow`: globals.css is unlayered, so its `display: inline-flex`
          outranks Tailwind's `hidden` and the labels would show on a phone,
          where the scene runs full-bleed behind the copy. */}
      {GATES.map((g, i) => (
        <span
          key={LABELS[i]}
          className="absolute bottom-5 hidden -translate-x-1/2 font-mono text-micro uppercase tracking-[0.15em] text-faint lg:block"
          style={{ left: `${g * 100}%` }}
        >
          {LABELS[i]}
        </span>
      ))}
    </div>
  );
}
