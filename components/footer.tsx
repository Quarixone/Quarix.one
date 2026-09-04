import { QuarixMark } from "@/components/logo";

const LINK =
  "text-[11.5px] leading-none tracking-[-0.006em] text-muted transition-colors duration-300 hover:text-foreground";

export function Footer() {
  return (
    <footer data-reveal-scroll className="w-full border-t border-foreground/10">
      <div
        data-reveal-child
        className="will-reveal mx-auto flex w-full max-w-[1000px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-9 sm:px-6 sm:py-10"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-2.5 text-foreground">
            <QuarixMark size={20} />
            <span className="text-[13.5px] font-semibold leading-none tracking-[-0.014em]">
              Quarix
            </span>
          </div>
          <span className="text-[11.5px] leading-none tracking-[-0.006em] text-muted">
            © 2026 — Design and AI engineering studio
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="mailto:quarixone@gmail.com" className={LINK}>
            quarixone@gmail.com
          </a>
          <a
            href="https://www.gokulakrishnan.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            Founder
          </a>
        </div>
      </div>
    </footer>
  );
}
