"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { site } from "@/content/site";

import { enquiryTypes, enquiryLabel } from "@/lib/enquiry";
import { deliverLead } from "@/lib/leads";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(120),
  email: z.string().trim().email("Use a work email").max(200),
  company: z.string().trim().min(1, "Which company?").max(200),
  type: z.enum(enquiryTypes.map((t) => t[0]) as [string, ...string[]]),
  message: z.string().trim().min(10, "A sentence or two helps us route it").max(4000),
  source: z.string().max(200).optional(),
  website: z.string().max(0).optional(), // honeypot
  "cf-turnstile-response": z.string().optional(),
});

/** The fields a visitor typed, handed back so a failed send does not clear the form. */
export type FormValues = { name?: string; email?: string; company?: string; type?: string; message?: string };

export type FormState = {
  errors?: Record<string, string>;
  message?: string;
  /** The enquiry could not be delivered: show the fallback email address. */
  failed?: boolean;
  values?: FormValues;
} | null;

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: skip
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(10_000),
    });
    const json = (await res.json()) as { success: boolean };
    return json.success;
  } catch {
    return false;
  }
}

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  const values: FormValues = { name: raw.name, email: raw.email, company: raw.company, type: raw.type, message: raw.message };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] = issue.message;
    return { errors, values };
  }
  if (parsed.data.website) return { message: "Thanks." }; // honeypot hit
  if (!(await verifyTurnstile(parsed.data["cf-turnstile-response"]))) {
    return { message: "Could not verify you are human. Please try again.", values };
  }

  const { name, email, company, type, message, source } = parsed.data;
  // Anything unexpected while delivering becomes the visitor's fallback message
  // rather than a thrown error, which the browser would show as a crash.
  // redirect() works by throwing, so it stays outside this try.
  try {
    const delivered = await deliver({ name, email, company, type, message, source });
    if (!delivered) return { failed: true, values };
  } catch (e) {
    console.error("[enquiry] NOT DELIVERED (unexpected error)", e, JSON.stringify({ name, email, company, type, message, source }));
    return { failed: true, values };
  }
  redirect(`/contact/thanks?type=${encodeURIComponent(type)}`);
}

async function deliver({ name, email, company, type, message, source }: { name: string; email: string; company: string; type: string; message: string; source?: string }) {
  const result = await deliverLead(
    { name, email, company, type, typeLabel: enquiryLabel(type), message, source },
    {
      resendKey: process.env.RESEND_API_KEY,
      from: process.env.LEADS_FROM,
      to: process.env.LEADS_TO || site.contact.email,
      webhookUrl: process.env.CONTACT_WEBHOOK_URL,
      production: process.env.NODE_ENV === "production",
      resendUrl: process.env.RESEND_API_URL,
    },
  );

  // the server log is the record of last resort: what failed, and the lead itself
  // when it reached nowhere, so it can still be recovered by hand
  const lead = JSON.stringify({ name, email, company, type, message, source });
  if (!result.sheet.ok && !result.sheet.skipped) console.error("[enquiry] sheet backup failed:", result.sheet.error);
  if (!result.delivered) {
    console.error("[enquiry] NOT DELIVERED:", result.email.error ?? "no email configured", lead);
    return false;
  }
  if (result.email.skipped) console.info("[enquiry] (no email configured, development)", lead);
  return true;
}
