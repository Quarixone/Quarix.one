import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThankYouTemplateAccess } from "@/components/thank-you-template-access";

const templates = [
  {
    slug: "codeforge-template",
    name: "Codeforge Template",
    description:
      "A professional landing page template for developer tools and APIs.",
    downloadUrl: "/downloads/codeforge-template.txt",
    livePreviewUrl: "/templates#codeforge-template",
    previewType: "code",
    accent: "from-sky-500 via-cyan-400 to-blue-500",
  },
  {
    slug: "dev-tool-template",
    name: "Dev Tool Template",
    description:
      "A premium template for SaaS tools, AI products, and developer platforms.",
    downloadUrl: "/downloads/dev-tool-template.txt",
    livePreviewUrl: "/templates#dev-tool-template",
    previewType: "pricing",
    accent: "from-violet-500 via-fuchsia-400 to-indigo-500",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    description:
      "A clean portfolio template for showcasing projects, skills, experience, and contact details.",
    downloadUrl: "/downloads/portfolio-template.txt",
    livePreviewUrl: "/templates#portfolio",
    previewType: "code",
    accent: "from-amber-300 via-orange-400 to-rose-500",
  },
  {
    slug: "test-mode-template",
    name: "Test Mode Template",
    description:
      "A test template for previewing the thank-you page, download source code button, and live preview flow without payment.",
    downloadUrl: "/downloads/test-mode-template.txt",
    livePreviewUrl: "/templates#test-mode-template",
    previewType: "code",
    accent: "from-emerald-300 via-sky-400 to-blue-500",
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
    title: template ? `Thank You - ${template.name}` : "Thank You - Quarix",
    description: "Download your Quarix template source code.",
  };
}

export default async function ThankYouPage({ params }: PageProps) {
  const { template: templateSlug } = await params;
  const template = getTemplate(templateSlug);

  if (!template) {
    notFound();
  }

  return <ThankYouTemplateAccess template={template} />;
}
