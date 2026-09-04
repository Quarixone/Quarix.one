import type { ReactNode } from "react";

import { calUrl } from "@/lib/site";


function Check() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[3px] shrink-0 text-foreground/55"
    >
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 ease-out group-hover:translate-x-px"
    >
      <path d="M5 12h13" />
      <path d="M12.5 5.5 19 12l-6.5 6.5" />
    </svg>
  );
}

function Flame() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5c.6 3 2.2 4.2 3.6 5.6A7.4 7.4 0 0 1 18 13.6a6 6 0 0 1-12 0c0-2 .8-3.3 1.8-4.4.3 1 .9 1.7 1.7 2 .2-3.4 1.4-6.2 2.5-8.7Z" />
    </svg>
  );
}

function ScopeMark() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.8 20 6v6.2c0 4.4-3.2 7.6-8 9.1-4.8-1.5-8-4.7-8-9.1V6Z" />
      <path d="M9 12.2 11.2 14.4 15.4 10.2" />
    </svg>
  );
}

function Features({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-[12.5px] leading-[1.45] tracking-[-0.006em] text-foreground/80"
        >
          <Check />
          {item}
        </li>
      ))}
    </ul>
  );
}

const CTA_BASE =
  "group mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-[12.5px] sm:py-[10px] font-medium leading-[17px] tracking-[-0.01em] transition-[filter,border-color,transform] duration-300 ease-out active:scale-[0.99]";

const CTA_QUIET = "border border-foreground/12 text-foreground hover:border-foreground/25";

const CTA_SOLID =
  "bg-gradient-to-b from-[var(--button-from)] to-[var(--button-to)] text-[var(--button-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(0,0,0,0.16)] hover:brightness-110";

function Plan({
  name,
  prefix,
  price,
  note,
  cta,
  href,
  features,
  featured = false,
  external = false,
}: {
  name: string;
  prefix?: string;
  price: string;
  note: string;
  cta: string;
  href: string;
  features: string[];
  featured?: boolean;
  external?: boolean;
}) {
  return (
    <div
      data-reveal-child
      className={`will-reveal mx-auto flex h-full w-full max-w-[420px] flex-col rounded-2xl border border-foreground/10 p-6 sm:p-7 lg:mx-0 lg:max-w-none ${
        featured ? "bg-foreground/[0.05]" : "bg-foreground/[0.02]"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[13.5px] leading-none tracking-[-0.012em] text-muted">
            {name}
          </h3>
          {featured ? (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[-0.006em] text-muted">
              <Flame />
              Best Value
            </span>
          ) : null}
        </div>

        <p className="flex items-baseline gap-1.5">
          {prefix ? (
            <span className="text-[12.5px] tracking-[-0.006em] text-muted">
              {prefix}
            </span>
          ) : null}
          <span className="text-[21px] font-bold leading-none tracking-[-0.022em] text-foreground sm:text-[23px]">
            {price}
          </span>
        </p>

        <p className="text-[12.5px] leading-[1.5] tracking-[-0.006em] text-muted lg:min-h-[38px]">
          {note}
        </p>
      </div>

      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={`${CTA_BASE} ${featured ? CTA_SOLID : CTA_QUIET}`}
      >
        {cta}
        <ArrowRight />
      </a>

      <div className="mt-8">
        <Features items={features} />
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      data-reveal-scroll
      className="mx-auto w-full max-w-[1000px] px-5 pb-28 pt-8 sm:px-6"
    >
      <h2
        data-reveal-child
        className="will-reveal mb-10 text-[19px] font-bold leading-[1.32] tracking-[-0.022em] text-foreground sm:text-[22px]"
      >
        Pricing
      </h2>

      <div className="grid items-stretch gap-4 lg:grid-cols-3">
        <Plan
          name="Website"
          prefix="From"
          price="$150"
          note="For individuals, startups, and small businesses."
          cta="Get started"
          href="/start/website"
          features={[
            "Modern responsive website",
            "Up to 5 pages",
            "Mobile & desktop optimized",
            "Basic SEO setup",
            "Contact form",
            "Deployment & setup",
          ]}
        />

        <Plan
          featured
          name="AI Chatbot"
          prefix="From"
          price="$200"
          note="For businesses adding AI to their website or workflow."
          cta="Get started"
          href="/start/chatbot"
          features={[
            "Custom AI chatbot",
            "Website integration",
            "Knowledge base & documents",
            "AI-powered responses",
            "Basic customization",
            "Deployment & setup",
          ]}
        />

        <Plan
          name="Custom"
          price="Let’s talk"
          note="For businesses with larger or custom requirements."
          cta="Contact Quarix"
          href={calUrl}
          external
          features={[
            "Custom web applications",
            "Advanced AI solutions",
            "AI agents & automation",
            "API & third-party integrations",
            "Custom UI/UX",
            "Ongoing support",
          ]}
        />
      </div>

      <p
        data-reveal-child
        className="will-reveal mt-10 flex items-center justify-center gap-2 text-[12px] tracking-[-0.006em] text-muted"
      >
        <ScopeMark />
        Final pricing depends on scope.
      </p>
    </section>
  );
}
