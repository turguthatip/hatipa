import PageWrapper from "@/components/PageWrapper";

/* Placeholder project data — replace with real case studies. */
const projects = Array.from({ length: 12 }, (_, i) => ({
  title: `Project ${i + 1}`,
  description: "Short one-line summary of what this project is about.",
}));

export default function HomePage() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Hi, my name is Turgut
        <br />
        I design digital products
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        I specialise in crafting UX/UI solutions for digital products that prioritise user satisfaction and help businesses move towards their objectives. My expertise lies in high-fidelity prototyping, user research, visual design, and information architecture
      </p>

      <section className="mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Selected projects
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-lg border border-border p-6 transition-colors hover:border-foreground"
            >
              <div className="aspect-video w-full rounded-md bg-border" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
