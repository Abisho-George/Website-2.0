"use client";
import { useEffect } from "react";
import { reportClientError } from "@/lib/report-error";
import { site } from "@/content/site";

/**
 * Shown in place of a page that throws while rendering in the browser, inside
 * the normal header and footer, instead of Next's bare "Application error".
 * The error is reported to the server log so it can be fixed.
 */
export default function PageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
    reportClientError("render", error, { digest: error.digest });
  }, [error]);
  return (
    <section className="pt-[var(--nav-h)]">
      <div className="container-x py-24 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="h2">This page did not load properly.</h1>
          <p className="lede mt-5">
            Please try again. If you were getting in touch, you can email us directly at{" "}
            <a href={`mailto:${site.contact.email}`} className="link-u text-ember-ink">{site.contact.email}</a>.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => reset()} className="inline-flex h-11 items-center rounded-full bg-ember px-6 text-[0.94rem] font-medium text-white transition-colors hover:bg-ember-ink">
              Try again
            </button>
            <a href="/" className="inline-flex h-11 items-center rounded-full border border-rule-strong px-6 text-[0.94rem] font-medium text-fg">Go to the home page</a>
          </div>
        </div>
      </div>
    </section>
  );
}
