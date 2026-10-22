/**
 * PageWrapper — consistent content container for every page.
 * Constrains width to the site max-width token and adds horizontal padding
 * so pages never stretch edge-to-edge on wide viewports.
 *
 * Usage:
 *   <PageWrapper>
 *     <YourPageContent />
 *   </PageWrapper>
 */
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  /** Optional extra Tailwind classes (e.g. "py-24" for a hero section). */
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    // cn() lets a page override the default padding (e.g. "pt-10").
    <main className={cn("mx-auto w-full max-w-(--max-width-site) flex-1 px-6 py-32", className)}>
      {children}
    </main>
  );
}
