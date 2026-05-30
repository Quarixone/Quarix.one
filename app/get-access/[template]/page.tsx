import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GetAccessCheckout } from "@/components/get-access-checkout";

const templates = [
  {
    slug: "codeforge-template",
    name: "Codeforge Template",
    description:
      "A professional landing page template for developer tools and APIs.",
    price: "₹999",
    priceLabel: "INR",
    amount: 99900,
    previewType: "code",
    accent: "from-sky-500 via-cyan-400 to-blue-500",
    downloadUrl: "/downloads/codeforge-template.txt",
  },
  {
    slug: "dev-tool-template",
    name: "Dev Tool Template",
    description:
      "A premium template for SaaS tools, AI products, and developer platforms.",
    price: "₹999",
    priceLabel: "INR",
    amount: 99900,
    previewType: "pricing",
    accent: "from-violet-500 via-fuchsia-400 to-indigo-500",
    downloadUrl: "/downloads/dev-tool-template.txt",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    description:
      "A clean portfolio template for showcasing projects, skills, experience, and contact details.",
    price: "₹1",
    priceLabel: "INR",
    amount: 100,
    previewType: "code",
    accent: "from-amber-300 via-orange-400 to-rose-500",
    downloadUrl: "/downloads/portfolio-template.txt",
  },
];

type PageProps = {
  params: Promise<{
    template: string;
  }>;
};

function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug);
}

export function generateStaticParams() {
  return templates.map((template) => ({
    template: template.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { template: templateSlug } = await params;
  const template = getTemplate(templateSlug);

  return {
    title: template ? `Get Access - ${template.name}` : "Get Access - Quarix",
    description: "Complete your Quarix template checkout.",
  };
}

export default async function GetAccessPage({ params }: PageProps) {
  const { template: templateSlug } = await params;
  const template = getTemplate(templateSlug);

  if (!template) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950 dark:bg-[#050505] dark:text-white">
      <GetAccessCheckout template={template} />
    </main>
  );
}
