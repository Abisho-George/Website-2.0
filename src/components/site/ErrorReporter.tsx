"use client";
import { useEffect } from "react";
import { reportClientError } from "@/lib/report-error";

/** Reports uncaught browser errors and rejected promises to the server log. */
export function ErrorReporter() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => reportClientError("window.error", e.error ?? e.message);
    const onRejection = (e: PromiseRejectionEvent) => reportClientError("unhandledrejection", e.reason);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
