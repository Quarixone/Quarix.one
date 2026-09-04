import Link from "next/link";
import { QuarixMark } from "@/components/logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[560px] flex-1 flex-col items-start gap-5 px-5 pb-24 pt-[18vh] sm:px-6">
      <div className="text-foreground">
        <QuarixMark size={32} />
      </div>

      <h1 className="text-[19px] font-bold leading-[1.32] tracking-[-0.022em] text-foreground sm:text-[22px]">
        This page doesn&apos;t exist.
      </h1>

      <p className="max-w-[380px] text-pretty text-[13px] leading-[1.65] tracking-[-0.006em] text-foreground/75 sm:text-[13.5px]">
        The link may be out of date, or the page may have moved.
      </p>

      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-full border border-foreground/12 px-4 py-3 text-[12.5px] font-medium leading-[17px] tracking-[-0.01em] text-foreground transition-colors duration-300 ease-out hover:border-foreground/25 sm:py-[9px]"
      >
        Back to home
      </Link>
    </main>
  );
}
