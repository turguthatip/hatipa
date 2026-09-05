import Link from "next/link";
import { notFound } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import {
  getNextProject,
  getPreviousProject,
  getProject,
  projects,
} from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const previousProject = getPreviousProject(slug);
  const nextProject = getNextProject(slug);

  return (
    <PageWrapper>
      <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
        ← Back to projects
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        {project.title}
      </h1>

      {/* Placeholder hero — replace with real case study imagery. */}
      <div className="mt-8 aspect-video w-full rounded-2xl bg-border" />

      <p className="mt-8 max-w-xl text-lg text-muted">
        Case study content coming soon.
      </p>

      <div className="mt-16 flex items-center justify-between gap-6">
        <Link
          href={`/projects/${previousProject.slug}`}
          className="text-sm text-foreground hover:text-muted transition-colors"
        >
          ← Previous project: {previousProject.title}
        </Link>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="text-sm text-foreground hover:text-muted transition-colors"
        >
          Next project: {nextProject.title} →
        </Link>
      </div>
    </PageWrapper>
  );
}
