/**
 * Footer — minimal site footer.
 * Shows your name and the current year, pinned to the bottom of the page.
 * Extend with social links or a contact CTA in later phases.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto flex max-w-(--max-width-site) items-center justify-between px-6 py-4 text-sm text-muted">
        <span>Turgut Hatip</span>
        <span>© {year}</span>
      </div>
    </footer>
  );
}
