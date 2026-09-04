/**
 * Canonical origin, used for metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment to the real domain.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Single source of truth for the contact points used across the site. */
export const email = "gokulakrishnxn@gmail.com";
export const calUrl = "https://cal.com/quarix.one/meet";

export const mailto = (subject?: string) =>
  subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
