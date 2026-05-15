import type { Metadata } from "next";
import { Inter, Inter_Tight, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "LP Retain — Landing Page Generator",
  description:
    "Generate high-converting landing pages from your content. Your local AI agent writes production-ready HTML — one click to deploy.",
  metadataBase: new URL("https://lp-retain.app"),
  openGraph: {
    title: "LP Retain — Landing Page Generator",
    description: "Generate high-converting landing pages from your content. Your local AI agent writes it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${playfair.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--coral)]/30"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
