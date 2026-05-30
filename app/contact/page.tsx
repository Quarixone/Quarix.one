import type { Metadata } from "next";
import Link from "next/link";

import { ContactPageForm } from "@/components/contact-page-form";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Contact - Quarix",
  description:
    "Contact Quarix for website services, template support, project questions, and collaboration.",
};

const contactCards = [
  {
    title: "Project inquiries",
    description:
      "Share your idea, goals, timeline, and budget. We will reply with next steps.",
  },
  {
    title: "Template support",
    description:
      "Need help with access, checkout, download links, or template questions? Send the details.",
  },
  {
    title: "Collaboration",
    description:
      "For partnerships, custom design work, and AI website systems, use the same form.",
  },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Tell us what you want to build."
      description="Send a message for services, template questions, support, or collaboration."
    >
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <aside className="space-y-4">
            {contactCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                <h2 className="text-lg font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {card.description}
                </p>
              </article>
            ))}

            <div className="rounded-[1.75rem] bg-zinc-950 p-5 text-white dark:bg-white/[0.06]">
              <p className="text-sm font-semibold">Want a specific service?</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Browse the service plans and choose the exact project type.
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                View services
              </Link>
            </div>
          </aside>

          <ContactPageForm />
        </div>
      </section>
    </PageShell>
  );
}
