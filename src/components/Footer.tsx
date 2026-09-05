/**
 * Footer — minimal site footer.
 * Shows your name and the current year, pinned to the bottom of the page.
 * Extend with social links or a contact CTA in later phases.
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto flex max-w-(--max-width-site) items-center px-6 py-4 text-sm text-muted">
        <a
          href="https://www.linkedin.com/in/turguthatipoglu/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
