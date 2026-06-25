import PageWrapper from "@/components/PageWrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Hi, I&apos;m Turgut.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        {/* Placeholder — replace with your real intro copy in Phase 2. */}
        I design and build things for the web. This is my portfolio.
      </p>
    </PageWrapper>
  );
}
