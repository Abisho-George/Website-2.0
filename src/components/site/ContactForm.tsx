"use client";
import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { submitEnquiry, type FormState } from "@/app/actions";
import { site } from "@/content/site";
import { enquiryTypes } from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const field = "w-full rounded-xl border border-rule bg-paper px-4 py-3 text-[0.95rem] text-fg placeholder:text-dim outline-none transition-colors focus:border-ember focus:ring-2 focus:ring-ember/20";
const label = "mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted";

export function ContactForm({ defaultType = "gtm-ai-twin", tone = "ember" }: { defaultType?: string; tone?: "ember" | "twin" }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitEnquiry, null);
  const pathname = usePathname();
  const err = (k: string) => state?.errors?.[k];
  // React resets a form after its action runs; the inputs reset to these, so a
  // visitor who hits an error keeps what they typed
  const v = state?.values ?? {};
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Name</label>
          <input id="name" name="name" defaultValue={v.name} className={cn(field, err("name") && "border-ember")} placeholder="Your name" autoComplete="name" />
          {err("name") && <p className="mt-1.5 text-xs text-ember-ink">{err("name")}</p>}
        </div>
        <div>
          <label className={label} htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" defaultValue={v.email} className={cn(field, err("email") && "border-ember")} placeholder="you@company.com" autoComplete="email" />
          {err("email") && <p className="mt-1.5 text-xs text-ember-ink">{err("email")}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="company">Company</label>
          <input id="company" name="company" defaultValue={v.company} className={cn(field, err("company") && "border-ember")} placeholder="Company" autoComplete="organization" />
          {err("company") && <p className="mt-1.5 text-xs text-ember-ink">{err("company")}</p>}
        </div>
        <div>
          <label className={label} htmlFor="type">What is this about?</label>
          <select id="type" name="type" defaultValue={v.type ?? defaultType} className={cn(field, "appearance-none")}>
            {enquiryTypes.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="message">Tell us about the pipeline problem</label>
        <textarea id="message" name="message" rows={5} defaultValue={v.message} className={cn(field, "resize-y", err("message") && "border-ember")} placeholder="What are you selling, to whom, and what is not working?" />
        {err("message") && <p className="mt-1.5 text-xs text-ember-ink">{err("message")}</p>}
      </div>
      <input type="hidden" name="source" value={pathname} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />}
      {state?.message && <p className="text-sm text-ember-ink">{state.message}</p>}
      {state?.failed && <DeliveryFailed values={v} />}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant={tone === "twin" ? "twin" : "primary"} disabled={pending}>{pending ? "Sending…" : "Send enquiry"}</Button>
        <p className="text-xs text-dim">We reply within one working day. No newsletters, no sequences.</p>
      </div>
    </form>
  );
}

/**
 * Shown when the enquiry could not be delivered: never a false "thanks". The
 * visitor's text is still in the form, and the link opens their own mail app
 * with it already written, addressed to the company inbox.
 */
function DeliveryFailed({ values }: { values: NonNullable<FormState>["values"] & object }) {
  const to = site.contact.email;
  const body = [
    ...(values.name ? [`Name: ${values.name}`] : []),
    ...(values.company ? [`Company: ${values.company}`] : []),
    "",
    (values.message ?? "").slice(0, 1500),
  ].join("\n");
  const href = `mailto:${to}?subject=${encodeURIComponent(`Website enquiry${values.company ? `: ${values.company}` : ""}`)}&body=${encodeURIComponent(body)}`;
  return (
    <div role="alert" className="rounded-xl border border-ember/40 bg-ember-wash p-4 text-sm leading-relaxed text-fg">
      <p className="font-medium text-ember-ink">We could not send your enquiry just now.</p>
      <p className="mt-1 text-fg-soft">
        Your message is still in the form. Please email it to{" "}
        <a href={href} className="link-u font-medium text-ember-ink">{to}</a>, or try again in a few minutes.
      </p>
    </div>
  );
}
