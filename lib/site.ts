/**
 * Canonical origin, used for metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment to the real domain.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
