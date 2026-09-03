"use client";
import { useEffect, useRef } from "react";

/**
 * Hero visual: a field of prospects (dots) flowing through three gates —
 * identify → qualify → book. Survivors converge on the meeting node.
 */
export function SignalField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0; let w = 0, h = 0, dpr = 1;
    const gates = [0.34, 0.6, 0.86];
    type P = { x: number; y: number; vy: number; vx: number; stage: number; alive: boolean; t: number; seed: number; fading: number };
    let ps: P[] = [];
    const isMobile = () => w < 720;
    const N = () => (isMobile() ? 60 : 140);

    const spawn = (p?: P): P => {
      const q: P = p ?? ({} as P);
      q.x = -0.02 - Math.random() * 0.2; q.y = 0.12 + Math.random() * 0.76;
      q.vx = 0.0009 + Math.random() * 0.0011; q.vy = (Math.random() - 0.5) * 0.0003;
      q.stage = 0; q.alive = true; q.t = 0; q.seed = Math.random(); q.fading = 0;
      return q;
    };
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: N() }, () => { const p = spawn(); p.x = Math.random() * 1.1 - 0.1; p.stage = gates.filter((g) => p.x > g).length; if (p.stage === 3) p.alive = Math.random() < 0.35; return p; });
    };
    const ember = (a: number) => `rgba(255,107,61,${a})`;
    const ion = (a: number) => `rgba(124,243,214,${a})`;
    const gray = (a: number) => `rgba(237,235,230,${a})`;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const meet = { x: w * 0.955, y: h * 0.5 };
      // gates
      ctx.save();
      gates.forEach((g, i) => {
        const x = w * g; ctx.strokeStyle = gray(0.10); ctx.lineWidth = 1; ctx.setLineDash([2, 6]);
        ctx.beginPath(); ctx.moveTo(x, h * 0.12); ctx.lineTo(x, h - 34); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = gray(0.38); ctx.font = `500 10px ${getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace"}`; ctx.textAlign = "center";
        ctx.fillText(["IDENTIFY", "QUALIFY", "BOOK"][i], x, h - 18);
      });
      ctx.restore();
      // meeting node
      const pulse = 0.5 + 0.5 * Math.sin(time / 600);
      const grd = ctx.createRadialGradient(meet.x, meet.y, 0, meet.x, meet.y, 60 + pulse * 20);
      grd.addColorStop(0, ion(0.35)); grd.addColorStop(1, ion(0));
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(meet.x, meet.y, 80, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = ion(0.95); ctx.beginPath(); ctx.arc(meet.x, meet.y, 4 + pulse * 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = ion(0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(meet.x, meet.y, 12 + pulse * 4, 0, Math.PI * 2); ctx.stroke();

      // links between nearby stage>=1 particles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i]; if (!a.alive || a.stage < 1) continue;
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j]; if (!b.alive || b.stage < 1) continue;
          const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h; const d2 = dx * dx + dy * dy;
          if (d2 < 90 * 90) { ctx.strokeStyle = ember(0.08 * (1 - d2 / 8100)); ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke(); }
        }
      }

      for (const p of ps) {
        if (!reduced) {
          p.t += 1;
          if (p.stage === 3 && p.alive) {
            // converge on meeting
            const tx = meet.x / w, ty = meet.y / h;
            p.x += (tx - p.x) * 0.02 + 0.0004; p.y += (ty - p.y) * 0.03;
            if (Math.abs(p.x - tx) < 0.004 && Math.abs(p.y - ty) < 0.01) spawn(p);
          } else {
            p.x += p.vx; p.y += p.vy + Math.sin(p.t / 40 + p.seed * 10) * 0.00025;
            if (!p.alive) { p.fading += 0.02; if (p.fading >= 1) spawn(p); }
          }
          const next = gates[p.stage];
          if (next !== undefined && p.x >= next) {
            p.stage += 1;
            const keep = [0.62, 0.55, 0.5][p.stage - 1];
            if (p.alive && Math.random() > keep) p.alive = false;
          }
          if (p.x > 1.05) spawn(p);
        }
        const base = p.alive ? [0.22, 0.45, 0.75, 0.95][p.stage] : Math.max(0, 0.25 - p.fading * 0.25);
        const r = p.alive ? [1.2, 1.6, 2.1, 2.6][p.stage] : 1.2;
        ctx.fillStyle = p.stage === 0 ? gray(base) : p.stage === 3 ? ion(base) : ember(base);
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2); ctx.fill();
        if (p.alive && p.stage >= 2) { ctx.fillStyle = p.stage === 3 ? ion(0.12) : ember(0.12); ctx.beginPath(); ctx.arc(p.x * w, p.y * h, r * 3.2, 0, Math.PI * 2); ctx.fill(); }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    resize(); draw(0);
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(0); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} data-signal-field className={className} aria-hidden />;
}
