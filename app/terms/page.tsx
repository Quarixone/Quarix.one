import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms - Quarix",
  description:
    "Read the terms for using Quarix templates, services, checkout, and website features.",
};

const terms = [
  {
    title: "Use of the website",
    body: "You agree to use Quarix for lawful purposes only and not to misuse the website, forms, checkout, downloads, or authentication features.",
  },
  {
    title: "Template access",
    body: "Purchased templates are provided for your use after successful payment verification. Do not resell, redistribute, or claim Quarix template files as a separate template product without permission.",
  },
  {
    title: "Service requests",
    body: "Submitting a service request does not create a final project agreement. Scope, timeline, deliverables, and payment terms are confirmed separately before work begins.",
  },
  {
    title: "Payments",
    body: "Payments are processed by Razorpay. You are responsible for providing accurate billing and contact details during checkout or inquiry submission.",
  },
  {
    title: "Availability",
    body: "We aim to keep the website available and reliable, but access may be interrupted for maintenance, provider issues, or technical problems.",
  },
  {
    title: "Changes to terms",
    body: "Quarix may update these terms as the product and services evolve. Continued use of the website means you accept the latest version.",
  },
];

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms"
      title="Terms and Conditions"
      description="Clear terms for using Quarix templates, service inquiries, checkout, and website features."
    >
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <article className="text-left">
          <div className="flex flex-col gap-3 border-b border-zinc-300 pb-5 text-sm font-semibold text-zinc-950 sm:flex-row sm:items-center sm:justify-between dark:border-white/20 dark:text-white">
            <p>Effective May 30, 2026</p>
            <a
              href="/contact"
              className="underline underline-offset-4 transition hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Contact Quarix
            </a>
          </div>

          <div className="mt-8 space-y-7 text-base leading-8 text-zinc-800 dark:text-zinc-200">
            <p className="font-semibold text-zinc-950 dark:text-white">
              Welcome to Quarix. Before using our website, templates, services,
              checkout, or contact forms, please read these Terms and Conditions.
            </p>

            <p>
              These Terms and Conditions explain the basic rules for using
              Quarix. By accessing this website, purchasing a template, creating
              an account, or submitting a service request, you agree to follow
              these terms.
            </p>

            {terms.map((term) => (
              <section key={term.title}>
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                  {term.title}
                </h2>
                <p className="mt-3">{term.body}</p>
              </section>
            ))}

            <p>
              If you do not agree with these terms, please do not use Quarix
              services, templates, checkout, or website features. For questions,
              contact us through the contact page.
            </p>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
