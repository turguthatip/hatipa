import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Fonts ──────────────────────────────────────────────────
   next/font automatically self-hosts Google Fonts — no layout
   shift, no external network request at runtime.
──────────────────────────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* flex-col so Navbar + content + Footer stack vertically;
          min-h-full ensures Footer stays at the bottom even on short pages. */}
      <body className="flex min-h-full flex-col bg-background text-foreground font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
