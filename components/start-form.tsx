"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { email as CONTACT } from "@/lib/site";
import { PLAN_COPY, type Plan } from "@/lib/plans";
import { sendEnquiry, type SendResult } from "@/app/start/actions";
import { QuarixMark } from "@/components/logo";

const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500+", "Not sure yet"];
const TIMELINES = ["As soon as possible", "2–4 weeks", "1–3 months", "Flexible"];

const FIELD =
  "w-full rounded-xl border border-foreground/12 bg-transparent px-3.5 py-2.5 text-[13px] leading-[1.5] tracking-[-0.006em] text-foreground transition-colors duration-200 placeholder:text-muted focus:border-foreground/35 focus:outline-none";
const LABEL = "text-[12px] leading-none tracking-[-0.006em] text-muted";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={LABEL}>
        {label}
        {hint ? <span className="ml-1.5 text-muted/70">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

function Select({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="relative">
      <select name={name} defaultValue={options[0]} className={`${FIELD} appearance-none pr-9`}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

/**
 * Builds the message body. Kept separate from the submit handler so a real
 * endpoint can replace the delivery without touching this.
 */
function composeMessage(data: FormData, plan: Plan) {
  const get = (k: string) => String(data.get(k) ?? "").trim();
  const copy = PLAN_COPY[plan];

  return [
    `Plan: ${copy.label}`,
    `Name: ${get("name")}`,
    `Email: ${get("email")}`,
    get("company") ? `Company: ${get("company")}` : null,
    `${copy.specific.label} ${get("specific")}`,
    `Budget: ${get("budget")}`,
    `Timeline: ${get("timeline")}`,
    "",
    "Details:",
    get("details") || "—",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function StartForm({ plan }: { plan: Plan }) {
  const copy = PLAN_COPY[plan];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [sentTo, setSentTo] = useState("");

  const [result, submit, pending] = useActionState<SendResult | null, FormData>(
    async (previous, data) => {
      setSummary(composeMessage(data, plan));
      setSentTo(String(data.get("email") ?? "").trim());
      return sendEnquiry(previous, data);
    },
    null,
  );

  // If Resend is not configured, or the send failed, fall back to opening the
  // visitor's mail app so the enquiry still reaches us.
  useEffect(() => {
    if (!result || result.ok || result.reason === "invalid" || !summary) return;
    window.location.href = `mailto:${CONTACT}?subject=${encodeURIComponent(
      `${copy.label} project`,
    )}&body=${encodeURIComponent(summary)}`;
  }, [result, summary, copy.label]);

  function validate(event: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Tell us your name.";
    const mail = String(data.get("email") ?? "").trim();
    if (!mail) next.email = "We need an address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))
      next.email = "That address doesn't look right.";

    setErrors(next);
    if (Object.keys(next).length > 0) event.preventDefault();
  }

  if (result?.ok) {
    return (
      <div className="flex flex-col items-start gap-6 pt-[6vh]">
        <div className="text-foreground">
          <QuarixMark size={34} />
        </div>

        <h1 className="text-[24px] font-bold leading-[1.28] tracking-[-0.024em] text-foreground sm:text-[28px]">
          Thank you.
        </h1>

        <p className="max-w-[400px] text-pretty text-[13.5px] leading-[1.7] tracking-[-0.006em] text-foreground/75 sm:text-[14px]">
          We have your {copy.label.toLowerCase()} request and we&apos;ll contact
          you soon
          {sentTo ? (
            <>
              {" "}
              at <span className="text-foreground">{sentTo}</span>
            </>
          ) : null}
          .
        </p>

        <Link
          href="/"
          className="mt-2 inline-flex items-center rounded-full border border-foreground/12 px-4 py-3 text-[12.5px] font-medium leading-[17px] tracking-[-0.01em] text-foreground transition-colors duration-300 ease-out hover:border-foreground/25 sm:py-[9px]"
        >
          Back to home
        </Link>
      </div>
    );
  }

  if (result && !result.ok && result.reason !== "invalid" && summary) {
    return (
      <div className="flex flex-col items-start gap-5 pt-[6vh]">
        <div className="text-foreground">
          <QuarixMark size={34} />
        </div>

        <h1 className="text-[24px] font-bold leading-[1.28] tracking-[-0.024em] text-foreground sm:text-[28px]">
          Nearly there.
        </h1>

        <p className="max-w-[420px] text-pretty text-[13.5px] leading-[1.7] tracking-[-0.006em] text-foreground/75 sm:text-[14px]">
          Your mail app should have opened with the details filled in — send it
          and we&apos;ll contact you soon. If nothing opened, copy the summary
          below and email it across.
        </p>

        <pre className="w-full overflow-x-auto whitespace-pre-wrap rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 text-[12px] leading-[1.6] text-foreground/80">
          {summary}
        </pre>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              navigator.clipboard?.writeText(summary).then(
                () => setCopied(true),
                () => setCopied(false),
              )
            }
            className="inline-flex items-center rounded-full bg-gradient-to-b from-[var(--button-from)] to-[var(--button-to)] px-4 py-3 text-[12.5px] font-medium leading-[17px] tracking-[-0.01em] text-[var(--button-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(0,0,0,0.16)] transition-[filter,transform] duration-300 ease-out hover:brightness-110 active:scale-[0.98] sm:py-[9px]"
          >
            {copied ? "Copied" : "Copy summary"}
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-foreground/12 px-4 py-3 text-[12.5px] font-medium leading-[17px] tracking-[-0.01em] text-foreground transition-colors duration-300 ease-out hover:border-foreground/25 sm:py-[9px]"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 flex flex-col items-start gap-3">
        <Link
          href="/#pricing"
          className="text-[12px] leading-none tracking-[-0.006em] text-muted transition-colors duration-300 hover:text-foreground"
        >
          ← Back
        </Link>

        <h1 className="text-[19px] font-bold leading-[1.32] tracking-[-0.022em] text-foreground sm:text-[22px]">
          {copy.heading}
        </h1>

        <p className="text-[12.5px] leading-none tracking-[-0.006em] text-muted">
          {copy.label} — {copy.price}
        </p>

        <p className="mt-1 max-w-[440px] text-pretty text-[13px] leading-[1.65] tracking-[-0.006em] text-foreground/75 sm:text-[13.5px]">
          A few details so we can come back with something useful rather than a
          list of questions.
        </p>
      </div>

      <form action={submit} onSubmit={validate} noValidate className="flex flex-col gap-7">
      <input type="hidden" name="plan" value={plan} />
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Field label="Name">
            <input name="name" type="text" placeholder="Your name" className={FIELD} />
          </Field>
          {errors.name ? (
            <span className="text-[11.5px] text-foreground/60">{errors.name}</span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Field label="Email">
            <input name="email" type="email" placeholder="you@company.com" className={FIELD} />
          </Field>
          {errors.email ? (
            <span className="text-[11.5px] text-foreground/60">{errors.email}</span>
          ) : null}
        </div>
      </div>

      <Field label="Company or product" hint="optional">
        <input name="company" type="text" placeholder="What it's called" className={FIELD} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy.specific.label}>
          <Select name="specific" options={copy.specific.options} />
        </Field>
        <Field label="Budget">
          <Select name="budget" options={BUDGETS} />
        </Field>
      </div>

      <Field label="Timeline">
        <Select name="timeline" options={TIMELINES} />
      </Field>

      <Field label="What are you building?">
        <textarea
          name="details"
          rows={5}
          placeholder="A few lines about the project, who it's for, and anything you already have."
          className={`${FIELD} min-h-[120px] resize-y`}
        />
      </Field>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center rounded-full bg-gradient-to-b from-[var(--button-from)] to-[var(--button-to)] px-5 py-3 text-[12.5px] font-medium leading-[17px] tracking-[-0.01em] text-[var(--button-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(0,0,0,0.16)] transition-[filter,transform] duration-300 ease-out hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:py-[9px]"
        >
          {pending ? "Sending…" : "Send request"}
        </button>
      </div>
      </form>
    </>
  );
}
