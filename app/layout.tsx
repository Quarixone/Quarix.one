import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quarix - UI Library for Design Engineers",
  description:
    "UI library and templates built with Next.js, React, TypeScript, Tailwind CSS, and Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
