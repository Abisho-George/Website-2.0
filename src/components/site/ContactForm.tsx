"use client";
import { useActionState } from "react";
import { submitEnquiry, type FormState } from "@/app/actions";
import { enquiryTypes } from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const field = "w-full rounded-xl border border-rule bg-paper px-4 py-3 text-[0.95rem] text-fg placeholder:text-dim outline-none transition-colors focus:border-ember focus:ring-2 focus:ring-ember/20";
const label = "mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted";

export function ContactForm({ defaultType = "gtm-ai-twin", tone = "ember" }: { defaultType?: string; tone?: "ember" | "twin" }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitEnquiry, null);
  const err = (k: string) => state?.errors?.[k];
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Name</label>
          <input id="name" name="name" className={cn(field, err("name") && "border-ember")} placeholder="Your name" autoComplete="name" />
          {err("name") && <p className="mt-1.5 text-xs text-ember-ink">{err("name")}</p>}
        </div>
        <div>
          <label className={label} htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" className={cn(field, err("email") && "border-ember")} placeholder="you@company.com" autoComplete="email" />
          {err("email") && <p className="mt-1.5 text-xs text-ember-ink">{err("email")}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="company">Company</label>
          <input id="company" name="company" className={cn(field, err("company") && "border-ember")} placeholder="Company" autoComplete="organization" />
          {err("company") && <p className="mt-1.5 text-xs text-ember-ink">{err("company")}</p>}
        </div>
        <div>
          <label className={label} htmlFor="type">What is this about?</label>
          <select id="type" name="type" defaultValue={defaultType} className={cn(field, "appearance-none")}>
            {enquiryTypes.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="message">Tell us about the pipeline problem</label>
        <textarea id="message" name="message" rows={5} className={cn(field, "resize-y", err("message") && "border-ember")} placeholder="What are you selling, to whom, and what is not working?" />
        {err("message") && <p className="mt-1.5 text-xs text-ember-ink">{err("message")}</p>}
      </div>
      <div>
        <label className={label} htmlFor="budget">Budget range <span className="normal-case tracking-normal text-dim">(optional)</span></label>
        <select id="budget" name="budget" defaultValue="" className={cn(field, "appearance-none")}>
          <option value="">Prefer not to say yet</option>
          <option>Under ₹3 L / $4k per month</option>
          <option>₹3–8 L / $4–10k per month</option>
          <option>₹8 L+ / $10k+ per month</option>
          <option>Project / one-time</option>
        </select>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />}
      {state?.message && <p className="text-sm text-ember-ink">{state.message}</p>}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant={tone === "twin" ? "twin" : "primary"} disabled={pending}>{pending ? "Sending…" : "Send enquiry"}</Button>
        <p className="text-xs text-dim">We reply within one working day. No newsletters, no sequences.</p>
      </div>
    </form>
  );
}
