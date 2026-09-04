import { calUrl, mailto } from "@/lib/site";
import { FounderAvatar } from "@/components/founder-avatar";
import { QuarixMark } from "@/components/logo";
import { Pricing } from "@/components/pricing";
import { Projects } from "@/components/projects";

function ArrowUpRight() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 ease-out group-hover:-translate-y-px group-hover:translate-x-px"
    >
      <path d="M7.5 16.5 16.5 7.5" />
      <path d="M9 7.5h7.5V15" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="m3.6 7.4 8.4 5.9 8.4-5.9" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section
        data-parallax-hero
        className="mx-auto flex w-full max-w-[560px] flex-col items-start gap-6 px-5 pb-24 pt-[12vh] sm:gap-7 sm:px-6 sm:pt-[15vh]">
        <div data-reveal className="will-reveal text-foreground">
          <QuarixMark size={32} />
        </div>

        <div className="flex w-full flex-col items-start gap-3 sm:gap-3.5">
          <h1
            data-reveal
          className="will-reveal max-w-[500px] text-pretty text-[19px] font-bold leading-[1.32] tracking-[-0.022em] text-foreground sm:text-[22px] md:text-[25px]"
          >
            We design and build digital products
            <br className="hidden sm:inline" />{" "}
            for <span className="text-muted/70">businesses and founders.</span>
          </h1>

          <p
            data-reveal
          className="will-reveal max-w-[480px] text-pretty text-[13px] leading-[1.65] tracking-[-0.006em] text-foreground/75 sm:text-[13.5px]"
          >
            Quarix is a team of designers and AI engineers helping businesses
            build modern websites, AI chatbots, and custom digital products.
          </p>
        </div>

        <p
          data-reveal
          className="will-reveal max-w-[480px] text-pretty text-[13px] leading-[1.65] tracking-[-0.006em] text-foreground/75 sm:text-[13.5px]"
        >
          From idea to launch, we help you build products that are simple,
          useful, and built to grow.
        </p>

        <div
          data-reveal
          className="will-reveal flex max-w-full items-center gap-2.5 rounded-[13px] border border-foreground/10 bg-background px-3 py-2 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors duration-300 hover:border-foreground/20"
        >
          <FounderAvatar />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[11px] leading-[1.4] tracking-[-0.005em] text-muted">
              Schedule a call with the Founder
            </span>
            <a
              href="https://www.gokulakrishnan.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[12.5px] font-medium leading-[1.4] tracking-[-0.012em] text-foreground transition-colors duration-300 hover:text-muted"
            >
              Gokulakrishnan
            </a>
          </div>
        </div>

        <div
          data-reveal
          className="will-reveal flex flex-wrap items-center gap-2"
        >
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[var(--button-from)] to-[var(--button-to)] px-4 py-3 text-[12.5px] sm:py-[9px] font-medium leading-[17px] tracking-[-0.01em] text-[var(--button-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(0,0,0,0.16)] transition-[filter,transform] duration-300 ease-out hover:brightness-110 active:scale-[0.98]"
          >
            Book an intro call
            <ArrowUpRight />
          </a>
          <a
            href={mailto()}
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/12 px-4 py-3 text-[12.5px] sm:py-[9px] font-medium leading-[17px] tracking-[-0.01em] text-foreground transition-colors duration-300 ease-out hover:border-foreground/25"
          >
            <MailIcon />
            Email
          </a>
        </div>
      </section>

      <Projects />
      <Pricing />
    </main>
  );
}
