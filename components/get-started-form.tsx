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
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-7"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold text-sky-300">Project request</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
          Tell me what you need.
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Share a few details and I will reply by email with the next steps.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-300">
            Name
          </span>
          <input
            name="name"
            required
            placeholder="Your name"
            className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-sky-300 focus:bg-black/60 focus:ring-4 focus:ring-sky-400/10"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-300">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-sky-300 focus:bg-black/60 focus:ring-4 focus:ring-sky-400/10"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-300">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-sky-300 focus:bg-black/60 focus:ring-4 focus:ring-sky-400/10"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-300">
            Budget
          </span>
          <select
            name="budget"
            className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-sky-300 focus:bg-black/60 focus:ring-4 focus:ring-sky-400/10"
            defaultValue=""
          >
            <option value="" disabled>
              Select budget
            </option>
            <option value="₹4,999 - ₹9,999">₹4,999 - ₹9,999</option>
            <option value="₹10,000 - ₹19,999">₹10,000 - ₹19,999</option>
            <option value="₹20,000+">₹20,000+</option>
          </select>
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-medium text-zinc-300">
          Project details
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell me about your business, website goals, pages needed, and timeline."
          className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-500 focus:border-sky-300 focus:bg-black/60 focus:ring-4 focus:ring-sky-400/10"
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
