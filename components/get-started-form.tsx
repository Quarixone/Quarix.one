"use client";

import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type GetStartedFormProps = {
  serviceTitle: string;
  serviceSlug: string;
};

export function GetStartedForm({
  serviceTitle,
  serviceSlug,
}: GetStartedFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceSlug,
        serviceTitle,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        budget: formData.get("budget"),
        message: formData.get("message"),
      }),
    });

    const result = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(result.message ?? "Something went wrong. Please try again.");
      return;
    }

    event.currentTarget.reset();
    setStatus("success");
    setMessage(
      result.message ?? "Your request has been sent. I will contact you soon.",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-zinc-200 bg-white/80 p-5 shadow-2xl shadow-zinc-950/10 backdrop-blur sm:p-7 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/40"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold text-sky-300">Project request</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white">
          Tell me what you need.
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Share a few details and I will reply by email with the next steps.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Name
          </span>
          <input
            name="name"
            required
            placeholder="Your name"
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Budget (INR)
          </span>
          <input
            name="budget"
            type="number"
            min={5000}
            step={500}
            required
            onInvalid={(event) => {
              const input = event.currentTarget;

              input.setCustomValidity(
                input.validity.rangeUnderflow
                  ? "Minimum budget is ₹5,000 only."
                  : "Please enter your budget.",
              );
            }}
            onInput={(event) => {
              event.currentTarget.setCustomValidity("");
            }}
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:focus:bg-black/60"
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Project details
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell me about your business, website goals, pages needed, and timeline."
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white px-5 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send request"}
      </button>

      {message ? (
        <p
          className={`mt-4 text-center text-sm ${
            status === "error"
              ? "text-red-500"
              : "text-emerald-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
