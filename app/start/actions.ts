"use server";

import { Resend } from "resend";
import { PLANS, PLAN_COPY, type Plan } from "@/lib/plans";
import { email as CONTACT } from "@/lib/site";

export type SendResult =
  | { ok: true }
  /** Resend has no key here — the client falls back to opening the mail app. */
  | { ok: false; reason: "unconfigured" | "invalid" | "failed"; message: string };

const clean = (v: FormDataEntryValue | null) => String(v ?? "").trim();
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function sendEnquiry(
  _previous: SendResult | null,
  formData: FormData,
): Promise<SendResult> {
  // Honeypot: a real person never fills this, bots usually do.
  if (clean(formData.get("company_url"))) return { ok: true };

  const plan = clean(formData.get("plan")) as Plan;
  if (!PLANS.includes(plan)) {
    return { ok: false, reason: "invalid", message: "Unknown plan." };
  }

  const name = clean(formData.get("name"));
  const from = clean(formData.get("email"));
  if (!name || !isEmail(from)) {
    return { ok: false, reason: "invalid", message: "Check your name and email." };
  }

  const copy = PLAN_COPY[plan];
  const lines = [
    `Plan: ${copy.label}`,
    `Name: ${name}`,
    `Email: ${from}`,
    clean(formData.get("company")) ? `Company: ${clean(formData.get("company"))}` : null,
    `${copy.specific.label} ${clean(formData.get("specific"))}`,
    `Budget: ${clean(formData.get("budget"))}`,
    `Timeline: ${clean(formData.get("timeline"))}`,
    "",
    "Details:",
    clean(formData.get("details")) || "—",
  ].filter((l) => l !== null);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return {
      ok: false,
      reason: "unconfigured",
      message: "Email sending is not configured.",
    };
  }

  try {
    const { error } = await new Resend(key).emails.send({
      // Needs a domain verified in Resend; the resend.dev sender only
      // delivers to the address that owns the Resend account.
      from: process.env.RESEND_FROM ?? "Quarix <onboarding@resend.dev>",
      to: process.env.RESEND_TO ?? CONTACT,
      replyTo: from,
      subject: `${copy.label} project — ${name}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[start-form] resend rejected the send:", error.message);
      return { ok: false, reason: "failed", message: "Could not send just now." };
    }
    return { ok: true };
  } catch (cause) {
    console.error("[start-form] resend threw:", cause);
    return { ok: false, reason: "failed", message: "Could not send just now." };
  }
}
