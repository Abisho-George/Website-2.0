"use client";
import { useRef } from "react";
import { CanvasScene, type Scene, type SceneEnv } from "./CanvasScene";

/**
 * Hero visual — the firm's actual subject drawn as a diagram:
 * every account in a market enters at the left, three gates thin the field
 * (identify → qualify → book), and the survivors converge on a booked meeting.
 * Ink dots on paper; the ones that survive turn ember.
 */

const GATES = [0.3, 0.56, 0.8];
const LINK_D2 = 7400;
const LINK_DX = 86; // px — beyond this the pair can't be within LINK_D2, so skip the hypot

type P = { x: number; y: number; vx: number; vy: number; stage: number; alive: boolean; t: number; seed: number; fade: number };

const ink = (a: number) => `rgba(23,18,13,${a})`;
const ember = (a: number) => `rgba(228,18,31,${a})`;

function spawn(p?: P): P {
  const q = (p ?? {}) as P;
  q.x = -0.04 - Math.random() * 0.22;
  q.y = 0.1 + Math.random() * 0.8;
  q.vx = 0.001 + Math.random() * 0.0012;
  q.vy = (Math.random() - 0.5) * 0.0003;
  q.stage = 0;
  q.alive = true;
  q.t = 0;
  q.seed = Math.random();
  q.fade = 0;
  return q;
}

function makeScene(): Scene {
  let ps: P[] = [];

  const resize = (env: SceneEnv) => {
    const n = env.w < 700 ? 54 : env.w < 1100 ? 96 : 150;
    ps = Array.from({ length: n }, () => {
      const p = spawn();
      p.x = Math.random() * 1.15 - 0.15;
      p.stage = GATES.filter((g) => p.x > g).length;
      if (p.stage === 3) p.alive = Math.random() < 0.4;
      return p;
    });
  };

  const draw = (ctx: CanvasRenderingContext2D, env: SceneEnv) => {
    const { w, h, reduced, lowPower } = env;
    ctx.clearRect(0, 0, w, h);
    const meet = { x: w * 0.945, y: h * 0.5 };

    // gates
    GATES.forEach((g, i) => {
      const x = w * g;
      ctx.strokeStyle = ink(0.13);
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 7]);
      ctx.beginPath();
      ctx.moveTo(x, h * 0.1);
      ctx.lineTo(x, h - 30);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = ink(0.42);
      ctx.font = "500 10px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.letterSpacing = "1.5px";
      ctx.fillText(["IDENTIFY", "QUALIFY", "BOOK"][i], x, h - 14);
    });

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

    // relationships between qualified accounts — the one O(n²) pass here, so it
    // is bounded on both ends: qualified particles only, and an x-distance
    // reject before the multiply. Off entirely on narrow screens.
    if (!lowPower) {
      ctx.lineWidth = 0.7;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        if (!a.alive || a.stage < 1) continue;
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          if (!b.alive || b.stage < 1) continue;
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
        p.t += 1;
        if (p.stage === 3 && p.alive) {
          const tx = meet.x / w;
          const ty = meet.y / h;
          p.x += (tx - p.x) * 0.022 + 0.0004;
          p.y += (ty - p.y) * 0.035;
          if (Math.abs(p.x - tx) < 0.004 && Math.abs(p.y - ty) < 0.012) spawn(p);
        } else {
          p.x += p.vx;
          p.y += p.vy + Math.sin(p.t / 44 + p.seed * 10) * 0.00022;
          if (!p.alive) {
            p.fade += 0.022;
            if (p.fade >= 1) spawn(p);
          }
        }
        const next = GATES[p.stage];
        if (next !== undefined && p.x >= next) {
          p.stage += 1;
          const keep = [0.6, 0.55, 0.5][p.stage - 1];
          if (p.alive && Math.random() > keep) p.alive = false;
        }
        if (p.x > 1.06) spawn(p);
      }
      const alpha = p.alive ? [0.16, 0.3, 0.55, 0.9][p.stage] : Math.max(0, 0.16 - p.fade * 0.16);
      const r = p.alive ? [1.3, 1.7, 2.2, 2.8][p.stage] : 1.3;
      ctx.fillStyle = p.stage === 0 ? ink(alpha) : ember(alpha);
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

export function SignalField({ className }: { className?: string }) {
  const sceneRef = useRef<Scene | null>(null);
  if (!sceneRef.current) sceneRef.current = makeScene();
  return <CanvasScene scene={sceneRef.current} data-signal-field className={className} />;
}
