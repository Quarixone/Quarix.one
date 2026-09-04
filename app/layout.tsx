import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { PageReveal } from "@/components/page-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Quarix is a team of designers and AI engineers building websites, AI chatbots and custom digital products for businesses and founders.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quarix — design and AI engineering studio",
    template: "%s — Quarix",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Quarix",
    title: "Quarix — design and AI engineering studio",
    description,
    url: siteUrl,
  },
  twitter: { card: "summary_large_image", title: "Quarix", description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

const themeScript = `
document.documentElement.classList.add("js");
try {
  const stored = localStorage.getItem("theme");
  const dark = stored === "dark" || (!stored && matchMedia("(prefers-color-scheme: dark)").matches);
  if (dark) document.documentElement.classList.add("dark");
} catch {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased motion-safe:scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PageReveal>
          <header
            data-reveal-late
            style={{ "--delay": "470ms" } as CSSProperties}
            className="flex items-center justify-end px-6 pt-6 sm:px-10 sm:pt-7"
          >
            <ThemeToggle />
          </header>
          {children}
          <Footer />
        </PageReveal>
      </body>
    </html>
  );
}
