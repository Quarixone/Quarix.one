"use client";

import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactPageForm() {
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
        serviceSlug: "general-contact",
        serviceTitle: "General Contact",
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
      result.message ?? "Your message has been sent. I will contact you soon.",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm sm:p-7 dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Name
          </span>
          <input
            name="name"
            required
            placeholder="Your name"
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
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
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
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
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
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
            placeholder="Optional"
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
            onInvalid={(event) => {
              const input = event.currentTarget;

              if (input.validity.rangeUnderflow) {
                input.setCustomValidity("Minimum budget is INR 5,000.");
              }
            }}
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell me what you want to build, ask, or improve."
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-black/60"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-zinc-950 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {message ? (
        <p
          className={`mt-4 text-center text-sm ${
            status === "error" ? "text-red-500" : "text-emerald-500"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
