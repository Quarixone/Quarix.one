/**
 * Plan data for the start forms. Deliberately a plain module, not part of the
 * "use client" form component: a server component importing values across the
 * client boundary receives client references, not the real object.
 */
export type Plan = "website" | "chatbot";

export const PLAN_COPY: Record<
  Plan,
  {
    label: string;
    price: string;
    heading: string;
    specific: { label: string; options: string[] };
  }
> = {
  website: {
    label: "Website",
    price: "From $150",
    heading: "Start a website project",
    specific: {
      label: "How many pages?",
      options: ["1–5 pages", "6–10 pages", "More than 10", "Not sure yet"],
    },
  },
  chatbot: {
    label: "AI Chatbot",
    price: "From $200",
    heading: "Start an AI chatbot project",
    specific: {
      label: "Where should it live?",
      options: ["On our website", "WhatsApp", "Both", "Not sure yet"],
    },
  },
};

export const PLANS = Object.keys(PLAN_COPY) as Plan[];
