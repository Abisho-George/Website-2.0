/**
 * Sends a browser-side error to /api/client-error, which writes it to the
 * server log (Vercel > Logs, search "[client-error]"). A crash in a visitor's
 * browser is otherwise invisible to us: this is how its message and stack
 * trace reach somewhere we can read them.
 */
let sent = 0;

export function reportClientError(kind: string, error: unknown, extra?: { digest?: string }) {
  if (typeof window === "undefined" || sent >= 5) return; // a bad page must not flood the log
  sent++;
  const e = error instanceof Error ? error : new Error(typeof error === "string" ? error : JSON.stringify(error));
  const body = JSON.stringify({
    kind,
    message: String(e.message).slice(0, 1000),
    stack: String(e.stack ?? "").slice(0, 4000),
    digest: extra?.digest ?? (e as Error & { digest?: string }).digest,
    url: window.location.href.slice(0, 500),
    userAgent: navigator.userAgent.slice(0, 300),
  });
  try {
    if (!navigator.sendBeacon?.("/api/client-error", new Blob([body], { type: "application/json" }))) {
      void fetch("/api/client-error", { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* reporting must never throw */
  }
}
