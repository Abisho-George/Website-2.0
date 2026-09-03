"use server";
import { z } from "zod";
import { redirect } from "next/navigation";

import { enquiryTypes } from "@/lib/enquiry";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(120),
  email: z.string().trim().email("Use a work email").max(200),
  company: z.string().trim().min(1, "Which company?").max(200),
  type: z.enum(enquiryTypes.map((t) => t[0]) as [string, ...string[]]),
  message: z.string().trim().min(10, "A sentence or two helps us route it").max(4000),
  budget: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
  "cf-turnstile-response": z.string().optional(),
});

export type FormState = { errors?: Record<string, string>; message?: string } | null;

/** Route enquiries by type. Configure env vars to deliver; otherwise the enquiry is logged server-side. */
function inboxFor(type: string) {
  const map: Record<string, string | undefined> = {
    "gtm-ai-twin": process.env.CONTACT_TO_TWIN,
    "demand-generation": process.env.CONTACT_TO_DEMAND,
    "gtm-strategy": process.env.CONTACT_TO_STRATEGY,
    "revenue-intelligence": process.env.CONTACT_TO_INTEL,
    enablement: process.env.CONTACT_TO_ENABLEMENT,
  };
  return map[type] ?? process.env.CONTACT_TO_DEFAULT ?? "hello@leadstrategus.com";
}

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: skip
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const json = (await res.json()) as { success: boolean };
  return json.success;
}

async function captureHubSpot(data: Record<string, string>) {
  const portal = process.env.HUBSPOT_PORTAL_ID, form = process.env.HUBSPOT_FORM_GUID;
  if (!portal || !form) return;
  await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fields: [
        { name: "firstname", value: data.name }, { name: "email", value: data.email },
        { name: "company", value: data.company }, { name: "message", value: data.message },
        { name: "enquiry_type", value: data.type },
      ],
    }),
  }).catch(() => undefined);
}

async function deliver(to: string, data: Record<string, string>) {
  const hook = process.env.CONTACT_WEBHOOK_URL;
  const payload = { to, ...data, receivedAt: new Date().toISOString() };
  if (hook) {
    await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
  } else {
    console.info("[enquiry]", JSON.stringify(payload));
  }
}

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] = issue.message;
    return { errors };
  }
  if (parsed.data.website) return { message: "Thanks." }; // honeypot hit
  if (!(await verifyTurnstile(parsed.data["cf-turnstile-response"]))) return { message: "Could not verify you are human. Please try again." };
  const data = { ...parsed.data } as Record<string, string>;
  delete data["cf-turnstile-response"]; delete data.website;
  await Promise.all([deliver(inboxFor(parsed.data.type), data), captureHubSpot(data)]);
  redirect(`/contact/thanks?type=${encodeURIComponent(parsed.data.type)}`);
}
