import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "AI Agents - Quarix",
  description:
    "Quarix AI Agents page is currently a work in progress.",
};

export default function AiAgentsPage() {
  return (
    <PageShell
      eyebrow="AI Agents"
      title="AI agents are coming soon."
      description="We are designing AI agent workflows for business websites, customer support, lead capture, and appointment automation."
      heroClassName="flex min-h-[48vh] flex-col justify-center sm:min-h-[52vh]"
    >
      <div className="pb-16 sm:pb-20" />
    </PageShell>
  );
}
