/**
 * ProjectBoard — a collection's projects as labelled frames, two per row with
 * the right column dropped a little for a loose, hand-placed rhythm.
 * Clicking a frame opens the project (in the bottom sheet, see app/@modal).
 */
import Link from "next/link";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export default function ProjectBoard({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
      {projects.map((project, i) => (
        <Frame key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}

function Frame({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", index % 2 === 1 && "sm:mt-20")}
    >
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="mono-label">
          {String(index + 1).padStart(2, "0")} — {project.company}
        </span>
        <span className="mono-label">{project.year}</span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-(--glass-border) bg-card shadow-[0_24px_48px_-24px_rgb(0_0_0/0.4)] ring-foreground transition-[box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:ring-2">
        <Thumbnail src={project.thumbnail} />
      </div>
      <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">{project.title}</h2>
    </Link>
  );
}

function Thumbnail({ src }: { src?: string }) {
  const className = "aspect-4/3 w-full object-cover";
  if (!src) return <div className={cn(className, "bg-border")} />;
  if (src.endsWith(".mp4")) {
    return <video className={className} src={src} autoPlay muted loop playsInline />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt="" />;
}
