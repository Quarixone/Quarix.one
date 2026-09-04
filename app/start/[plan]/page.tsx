import { notFound } from "next/navigation";
import { StartForm } from "@/components/start-form";
import { PLANS, PLAN_COPY, type Plan } from "@/lib/plans";

export function generateStaticParams() {
  return PLANS.map((plan) => ({ plan }));
}

export async function generateMetadata({ params }: PageProps<"/start/[plan]">) {
  const { plan } = await params;
  const copy = PLAN_COPY[plan as Plan];
  return { title: copy ? copy.heading : "Start a project" };
}

export default async function StartPlanPage({ params }: PageProps<"/start/[plan]">) {
  const { plan } = await params;
  if (!PLANS.includes(plan as Plan)) notFound();

  return (
    <main className="mx-auto flex w-full max-w-[640px] flex-1 flex-col px-5 pb-24 pt-[10vh] sm:px-6 sm:pt-[12vh]">
      <StartForm plan={plan as Plan} />
    </main>
  );
}
