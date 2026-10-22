import { notFound } from "next/navigation";
import BottomSheet from "@/components/BottomSheet";
import ProjectDetail from "@/components/ProjectDetail";
import { getProject } from "@/lib/projects";

/* In-app navigation to /projects/[slug] lands here and opens the project in a
   bottom sheet over the current page. Direct visits render app/projects/[slug]. */
export default async function ProjectSheet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <BottomSheet title={project.title}>
      <ProjectDetail project={project} inSheet />
    </BottomSheet>
  );
}
