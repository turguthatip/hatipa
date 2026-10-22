import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import EndOfPageLinkedIn from "@/components/EndOfPageLinkedIn";
import { cn } from "@/lib/utils";

/* ─── Fonts ──────────────────────────────────────────────────
   next/font automatically self-hosts Google Fonts — no layout
   shift, no external network request at runtime.
──────────────────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  /* Optical sizing: large headlines automatically use Inter's tighter Display cut. */
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turgut Hatip — Portfolio",
  description: "Designer & developer portfolio.",
  /* Remove once the site is live on its final domain. */
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  /** Parallel route slot (app/@modal) — the project bottom sheet. */
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, geistMono.variable)}
    >
      {/* flex-col + min-h-full so pages can grow (flex-1) to fill the screen. */}
      <body className="flex min-h-full flex-col overflow-x-clip bg-background text-foreground font-sans">
        {children}
        {/* Hidden while scrolling; jumps into place when the visitor hits the end. */}
        <EndOfPageLinkedIn />
        {modal}
      </body>
    </html>
  );
}
