"use client";
import { useEffect } from "react";
import { reportClientError } from "@/lib/report-error";

/**
 * The last resort, when the root layout itself fails: replaces the whole
 * document, so it carries its own minimal markup and styles.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
    reportClientError("global", error, { digest: error.digest });
  }, [error]);
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fff", color: "#17120d" }}>
        <div style={{ maxWidth: 520, margin: "20vh auto 0", padding: "0 20px", textAlign: "center" }}>
          <h1 style={{ fontSize: 28, margin: "0 0 12px" }}>This page did not load properly.</h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: "#4a423a", margin: "0 0 24px" }}>
            Please try again. To get in touch, email{" "}
            <a href="mailto:kingshuk@leadstrategus.com" style={{ color: "#b10000" }}>kingshuk@leadstrategus.com</a>.
          </p>
          <button type="button" onClick={() => reset()} style={{ height: 44, padding: "0 24px", borderRadius: 999, border: 0, background: "#e10600", color: "#fff", fontSize: 15, cursor: "pointer" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
