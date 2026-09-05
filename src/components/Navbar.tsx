/**
 * Navbar — site-wide top navigation.
 * Hides when the user scrolls down, reappears as soon as they scroll up.
 * Contains a logo placeholder on the left and nav links on the right.
 * Replace the logo text with an <Image> or SVG once branding is finalised.
 */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      setHidden(scrollingDown && currentScrollY > 80);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border bg-background transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-(--max-width-site) items-center justify-between px-6 py-4">
        {/* Logo placeholder */}
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          hatipa
        </Link>

        {/* Primary navigation */}
        <nav aria-label="Primary">
          <ul className="flex items-center gap-8 text-sm text-muted">
            <li>
              <Link href="/process" className="hover:text-foreground transition-colors">
                Process
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-foreground transition-colors">
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
