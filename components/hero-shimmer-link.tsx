"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";

type HeroShimmerLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export function HeroShimmerLink({
  href,
  label,
  variant = "primary",
}: HeroShimmerLinkProps) {
  const isPrimary = variant === "primary";

  return (
    <ShimmerButton
      type="button"
      background={isPrimary ? "rgba(9,9,11,1)" : "rgba(255,255,255,1)"}
      shimmerColor={isPrimary ? "#ffffff" : "#18181b"}
      borderRadius="999px"
      className={`h-10 w-full px-5 text-xs font-medium shadow-lg sm:w-auto ${
        isPrimary
          ? "text-white shadow-zinc-950/10"
          : "border-zinc-200 text-zinc-950 shadow-zinc-950/5"
      }`}
      onClick={() => window.location.assign(href)}
    >
      {label}
    </ShimmerButton>
  );
}
