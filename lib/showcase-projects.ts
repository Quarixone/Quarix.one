export type ShowcaseProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  result: string;
  accent: string;
  mockup: "research" | "portfolio" | "dashboard" | "personal" | "ai" | "freelance";
  tags: string[];
  overview: string;
  highlights: string[];
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "quarix-ai",
    title: "quarix.ai",
    subtitle: "AI Business Website",
    category: "Automation",
    description:
      "A conversion-focused website with an AI assistant trained to answer customer questions and capture leads.",
    result: "Built for 24/7 customer replies, appointment requests, and service discovery.",
    accent: "from-orange-500 to-amber-300",
    mockup: "research",
    tags: ["AI chatbot", "Lead capture", "SEO"],
    overview:
      "This project shows how a service business can use a polished website and AI assistant to respond faster, capture better leads, and reduce manual support work.",
    highlights: [
      "AI assistant positioned as the main customer support layer",
      "Clear landing-page structure for trust and conversion",
      "Lead capture flow connected to service inquiries",
    ],
  },
  {
    slug: "gokul-dev",
    title: "gokul.dev",
    subtitle: "Portfolio Site",
    category: "Personal brand",
    description:
      "A sharp portfolio experience for presenting projects, experience, and service offerings.",
    result: "Designed to turn profile visits into project inquiries.",
    accent: "from-zinc-300 to-zinc-500",
    mockup: "portfolio",
    tags: ["Portfolio", "Responsive", "Motion"],
    overview:
      "A personal portfolio direction focused on credibility, project storytelling, and a direct path for potential clients to start a conversation.",
    highlights: [
      "Minimal dark interface with strong visual hierarchy",
      "Project sections designed for quick scanning",
      "Simple inquiry flow for freelance and consulting work",
    ],
  },
  {
    slug: "bookline-app",
    title: "bookline.app",
    subtitle: "Business Booking Platform",
    category: "SaaS",
    description:
      "A business website concept with appointment booking, payment flow, and customer management.",
    result: "Created to reduce manual booking and help customers take action faster.",
    accent: "from-indigo-500 to-violet-400",
    mockup: "dashboard",
    tags: ["Booking", "Payments", "Dashboard"],
    overview:
      "A booking-first business platform concept that combines marketing pages with the operational tools needed to manage customers and appointments.",
    highlights: [
      "Booking journey designed around fewer customer steps",
      "Admin dashboard concept for managing requests",
      "Payment-ready structure for service businesses",
    ],
  },
  {
    slug: "aryan-studio",
    title: "aryan.studio",
    subtitle: "Creator Portfolio",
    category: "Creative",
    description:
      "A minimal dark portfolio layout for freelancers, creators, and independent consultants.",
    result: "Keeps the focus on work, credibility, and a clear contact path.",
    accent: "from-zinc-700 to-zinc-900",
    mockup: "personal",
    tags: ["Creator", "Dark UI", "Contact"],
    overview:
      "A portfolio concept for creators who need a focused, premium web presence without adding unnecessary complexity.",
    highlights: [
      "Content-first layout with a strong intro section",
      "Dark visual style for a premium feel",
      "Contact-first conversion path",
    ],
  },
  {
    slug: "flowpilot-ai",
    title: "flowpilot.ai",
    subtitle: "AI Workflow Page",
    category: "Product",
    description:
      "A landing page for an AI workflow product with strong hero messaging and feature proof.",
    result: "Structured for early signups and product demos.",
    accent: "from-emerald-400 to-cyan-400",
    mockup: "ai",
    tags: ["Landing page", "AI", "Waitlist"],
    overview:
      "A product landing-page concept built to quickly explain an AI workflow tool and guide visitors toward demos or early access.",
    highlights: [
      "Messaging structure for a new AI product",
      "Feature proof cards that support the hero promise",
      "Waitlist-ready call-to-action system",
    ],
  },
  {
    slug: "freelancekit-io",
    title: "freelancekit.io",
    subtitle: "Freelancer Website",
    category: "Services",
    description:
      "A professional service page for freelancers with offerings, social proof, and project CTAs.",
    result: "Designed to explain services clearly and make inquiries easier.",
    accent: "from-blue-500 to-purple-500",
    mockup: "freelance",
    tags: ["Services", "Proof", "CTA"],
    overview:
      "A service website concept for freelancers who want to package their skills clearly and convert visitors into qualified leads.",
    highlights: [
      "Service cards written for quick buyer understanding",
      "Proof and credibility sections for trust",
      "CTA flow that guides users to start a project",
    ],
  },
];

export function getShowcaseProject(slug: string) {
  return showcaseProjects.find((project) => project.slug === slug);
}
