import { notFound } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import PillLink from "@/components/PillLink";
import ProjectDetail from "@/components/ProjectDetail";
import { getCollection, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/* Full page, used on direct visits and refreshes. In-app clicks open the
   same content in a bottom sheet instead (see app/@modal). */
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

  const collection = getCollection(project.collection ?? "selected");

  return (
    <PageWrapper className="pt-6 sm:pt-10">
      <div className="mx-auto max-w-4xl">
        <PillLink href={`/work/${collection?.slug ?? "selected"}`}>
          ← {collection?.title ?? "Projects"}
        </PillLink>
      </div>
      <ProjectDetail project={project} />
    </PageWrapper>
  );
}
