import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy - Quarix",
  description:
    "Read how Quarix collects, uses, and protects information submitted through the website.",
};

const sections = [
  {
    title: "Information we collect",
    body: "When you contact Quarix, request a service, sign in, or purchase a template, we may collect your name, email address, phone number, project details, payment reference, and account information needed to provide the service.",
  },
  {
    title: "How we use information",
    body: "We use your information to respond to inquiries, deliver template access, send receipts, provide support, improve the website, and keep the service secure.",
  },
  {
    title: "Payments and authentication",
    body: "Payments are processed through Razorpay and authentication is handled through Supabase. Quarix does not store your card details. Third-party providers process information according to their own policies.",
  },
  {
    title: "Email communication",
    body: "We may send project replies, payment receipts, account messages, and support communication. You can contact us if you want your information updated or removed.",
  },
  {
    title: "Data security",
    body: "We use reasonable technical and organizational measures to protect submitted information, but no online system can be guaranteed to be fully secure.",
  },
  {
    title: "Contact",
    body: "For privacy questions, contact Quarix through the contact page and include the email address related to your request.",
  },
];

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      description="A simple overview of what information Quarix collects and how it is used."
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
              This Privacy Policy explains how Quarix collects, uses, and
              protects information submitted through our website, templates,
              checkout, account pages, and service forms.
            </p>

            <p>
              By using Quarix, submitting a form, creating an account, or
              purchasing a template, you agree to the practices described in
              this policy.
            </p>

            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-3">{section.body}</p>
              </section>
            ))}

            <p>
              If you have questions about this Privacy Policy or want to request
              an update or removal of your information, contact Quarix through
              the contact page.
            </p>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
