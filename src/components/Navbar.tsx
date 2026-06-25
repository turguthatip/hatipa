/**
 * Navbar — site-wide top navigation.
 * Contains a logo placeholder on the left and three nav links on the right.
 * Replace the logo text with an <Image> or SVG once branding is finalised.
 */
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-(--max-width-site) items-center justify-between px-6 py-4">
        {/* Logo placeholder */}
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          hatipa
        </Link>

        {/* Primary navigation */}
        <nav aria-label="Primary">
          <ul className="flex items-center gap-8 text-sm text-muted">
            <li>
              <Link href="/work" className="hover:text-foreground transition-colors">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
