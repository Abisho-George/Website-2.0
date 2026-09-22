"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { runAgents, runLog, type RunTone } from "@/content/synthetic";
import { SurfaceFrame } from "./SurfaceFrame";
import { subscribe, useInView, useReducedMotion } from "./ticker";

/**
 * The twin at work: an agent rail on the left, a log that types itself in on
 * the right. The nearest thing to the product footage this site does not have,
 * and the honest version of it — every word in it is synthetic and the frame
 * says so.
 *
 * Only one ambient surface may animate per viewport, so this and MeetingsBoard
 * never share a band. Two terminals typing at each other across a page is a
 * screensaver, not an argument.
 *
 * Three things here are deliberate and easy to undo by accident:
 *
 *   1. The full run is what renders on the server, and the client blanks it in
 *      a layout effect before typing it back. A reader without JS, a crawler
 *      and the script-stripped preview bundle all get the whole log; nothing
 *      here is invisible until JS says otherwise.
 *   2. Typing writes `textContent` from the shared ticker. At 55 characters a
 *      second, `useState(text.slice(0, i))` would re-render this subtree
 *      fifty-five times a second for as long as it is on screen.
 *   3. Every row is in the DOM from the first paint and is only made
 *      transparent, so the surface is at its final height immediately and the
 *      page never reflows as lines arrive.
 *
 * Colours are pinned to tokens that are correct on a dark ground in any band
 * (kraft, sand, ember-2, ok-2) rather than to `--color-dim` and its
 * neighbours, which `.band--ink` remaps but a `.surface--ink` sitting on a
 * paper band does not.
 */

const CPS = 55; // characters a second — a person reading over an operator's shoulder
const LEAD = 420; // ms before the first line, so arriving on the surface is not instant
const LINE_GAP = 280; // ms of quiet between lines
const HOLD = 4600; // ms the finished run stays up before it runs again
const CARET_MS = 540; // ms per caret phase, driven by the ticker so it stops when everything else does

const TONE: Record<RunTone, string> = {
  ok: "text-sand",
  warn: "text-ember-2",
  win: "text-ok-2",
};

type Row = { row: HTMLElement; text: HTMLElement; caret: HTMLElement };

function rowsOf(log: HTMLElement): Row[] {
  return Array.from(log.querySelectorAll<HTMLElement>("[data-line]")).flatMap((row) => {
    const text = row.querySelector<HTMLElement>("[data-line-text]");
    const caret = row.querySelector<HTMLElement>("[data-caret]");
    return text && caret ? [{ row, text, caret }] : [];
  });
}

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function AgentConsole({ className }: { className?: string }) {
  const logRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  // completed lines. It drives the reel and nothing else, so it changes nine
  // times a run rather than once a frame.
  const [done, setDone] = useState(runLog.length);
  const reduced = useReducedMotion();
  const inView = useInView(logRef, "180px");

  useIsomorphicLayoutEffect(() => {
    const log = logRef.current;
    if (!log) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    rowsOf(log).forEach(({ row, text, caret }, i) => {
      row.style.opacity = "0";
      text.textContent = "";
      caret.style.display = i === 0 ? "" : "none";
    });
    setDone(0);
  }, []);

  useEffect(() => {
    const log = logRef.current;
    const rail = railRef.current;
    if (!log || !rail) return;
    const rows = rowsOf(log);
    if (!rows.length) return;
    const rails = Array.from(rail.querySelectorAll<HTMLElement>("[data-agent]"));

    /** Light the agent that is speaking. -1 is nobody. */
    const light = (i: number) => {
      const agent = runLog[i]?.agent;
      for (const el of rails) {
        const on = el.dataset.agent === agent;
        el.classList.toggle("text-ember-2", on);
        el.classList.toggle("text-kraft-2/55", !on);
      }
    };

    /** Only the line being written carries a caret. */
    const caretOn = (i: number) => {
      rows.forEach(({ caret }, k) => {
        caret.style.display = k === i ? "" : "none";
      });
    };

    if (reduced) {
      // the whole run, at rest, with nothing subscribed to anything
      rows.forEach(({ row, text, caret }, i) => {
        row.style.opacity = "";
        text.textContent = runLog[i].text;
        caret.style.opacity = "";
      });
      light(-1);
      caretOn(runLog.length - 1);
      setDone(runLog.length);
      return;
    }
    if (!inView) return; // frozen exactly where it stopped, until it comes back

    // The DOM is the state: resume at the first unfinished line, so scrolling
    // away mid-line and back does not restart the run.
    let i = rows.findIndex(({ text }, k) => (text.textContent ?? "").length < runLog[k].text.length);
    if (i < 0) i = runLog.length;
    let chars = i < runLog.length ? (rows[i].text.textContent ?? "").length : 0;
    let lit = -1;
    let wait = i >= runLog.length ? HOLD : i === 0 && chars === 0 ? LEAD : 0;

    const stop = subscribe((dt, t) => {
      const caret = rows[Math.min(i, rows.length - 1)].caret;
      caret.style.opacity = Math.floor(t / CARET_MS) % 2 ? "0" : "1";

      if (wait > 0) {
        wait -= dt;
        return;
      }

      if (i >= runLog.length) {
        for (const r of rows) {
          r.row.style.opacity = "0";
          r.text.textContent = "";
        }
        i = 0;
        chars = 0;
        lit = -1;
        wait = 620;
        light(-1);
        caretOn(0);
        setDone(0);
        return;
      }

      const { row, text } = rows[i];
      if (lit !== i) {
        lit = i;
        row.style.opacity = "";
        light(i);
        caretOn(i);
      }

      const full = runLog[i].text;
      chars = Math.min(full.length, chars + (dt / 1000) * CPS);
      const n = Math.floor(chars);
      if ((text.textContent ?? "").length !== n) text.textContent = full.slice(0, n);

      if (n >= full.length) {
        i += 1;
        chars = 0;
        setDone(i);
        wait = i >= runLog.length ? HOLD : LINE_GAP;
      }
    });

    // leave the caret solid while the run is paused, rather than frozen mid-blink
    return () => {
      stop();
      for (const { caret } of rows) caret.style.opacity = "";
    };
  }, [reduced, inView]);

  return (
    <SurfaceFrame
      tone="ink"
      title="gtm-ai-twin"
      status={
        <span className="flex items-center gap-2">
          <span className="dot-live size-1.5 rounded-full bg-ember" aria-hidden />
          live run
        </span>
      }
      reel={done / runLog.length}
      className={className}
    >
      <div className="sm:grid sm:grid-cols-[auto_minmax(0,1fr)]">
        {/* The roster, so the log reads as a division of labour rather than one
            machine muttering. A wrapped strip on a narrow screen, a rail beside
            the log from 640px — the same seven elements either way. */}
        <div
          ref={railRef}
          className="flex flex-wrap gap-x-3 gap-y-1 border-b border-kraft-2/15 px-4 py-3 sm:flex-col sm:gap-y-2 sm:border-b-0 sm:border-r sm:py-5"
        >
          {runAgents.map((a) => (
            <div
              key={a}
              data-agent={a}
              className="font-mono text-micro tracking-[0.1em] text-kraft-2/55 transition-colors duration-[var(--dur-1)] ease-standard"
            >
              {a}
            </div>
          ))}
        </div>

        <div ref={logRef} data-agent-log className="px-4 py-3 font-mono text-micro leading-[1.9] sm:py-5 sm:text-label">
          {runLog.map((l, i) => (
            <div key={i} data-line className="flex flex-wrap gap-x-2 sm:flex-nowrap sm:gap-x-3">
              <span className="shrink-0 text-kraft-2/65 sm:w-[6.2rem]">▸ {l.agent}</span>
              {/* the caret rides inside the text box, so it sits after the last
                  character typed however the line has wrapped */}
              <span className={cn("min-w-0 break-words text-kraft-2", l.tone && TONE[l.tone])}>
                <span data-line-text>{l.text}</span>
                <i
                  data-caret
                  aria-hidden
                  className="ml-1 inline-block h-[0.95em] w-[0.5em] translate-y-[2px] bg-ember-2"
                  style={i === runLog.length - 1 ? undefined : { display: "none" }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </SurfaceFrame>
  );
}
