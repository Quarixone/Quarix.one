"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";

type ServiceShimmerLinkProps = {
  href: string;
  label: string;
  featured?: boolean;
};

export function ServiceShimmerLink({
  href,
  label,
  featured = false,
}: ServiceShimmerLinkProps) {
  return (
    <ShimmerButton
      type="button"
      background={featured ? "rgba(255,255,255,1)" : "rgba(9,9,11,1)"}
      shimmerColor={featured ? "#18181b" : "#ffffff"}
      borderRadius="1rem"
      className={`h-11 w-full px-5 text-sm font-semibold ${
        featured ? "text-zinc-950" : "text-white"
      }`}
      onClick={() => window.location.assign(href)}
    >
      {label}
    </ShimmerButton>
  );
}
