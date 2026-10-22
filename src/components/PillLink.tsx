/**
 * PillLink — small frosted-glass link, used for "back" navigation.
 */
import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function PillLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "glass inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </Link>
  );
}
