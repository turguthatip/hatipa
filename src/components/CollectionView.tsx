/**
 * CollectionView — a collection's title, project count and project board on
 * a dotted field with a glow in the folder's colors. Rendered both on the
 * full /work/[collection] page and inside the folder sheet (app/@modal).
 */
import DotBackdrop from "@/components/DotBackdrop";
import ProjectBoard from "@/components/ProjectBoard";
import type { Collection, Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export default function CollectionView({
  collection,
  projects,
  compact = false,
}: {
  collection: Collection;
  projects: Project[];
  /** Tighter header spacing for the sheet. */
  compact?: boolean;
}) {
  return (
    // One continuous dot field for the whole view, fading out at every edge,
    // kept faint so it doesn't compete with the project thumbnails.
    <div className="relative isolate">
      <DotBackdrop className="opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_85%,transparent),radial-gradient(ellipse_65%_100%_at_center,black_55%,transparent_100%)] [mask-composite:intersect]" />

      {/* Soft glow in the folder's own colors behind the title. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-8 left-1/2 -z-10 h-72 w-[min(42rem,100%)] -translate-x-1/2 rounded-full opacity-25 blur-3xl dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(closest-side, ${collection.colors[0]}, ${collection.colors[2]}, transparent)`,
        }}
      />

      {/* Editorial header, aligned with the project grid below: one word per
          line, the project count as a superscript on the first line. */}
      <header
        className={cn(
          "mx-auto mb-14 flex max-w-5xl flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between",
          compact ? "pt-10 sm:pt-14" : "pt-16 sm:pt-24"
        )}
      >
        <h1 className="text-6xl leading-[0.88] font-bold tracking-[-0.05em] text-foreground sm:text-8xl">
          {collection.title.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
              {i === 0 && (
                <sup className="relative top-[0.9em] ml-[0.1em] align-top font-mono text-[0.22em] font-normal tracking-normal text-muted-foreground">
                  ({projects.length})
                </sup>
              )}
            </span>
          ))}
        </h1>
        {projects.length === 0 && (
          <p className="mono-label sm:pb-2 sm:text-right">Coming soon</p>
        )}
      </header>

      {projects.length > 0 && (
        <div className="mx-auto max-w-5xl pb-20">
          <ProjectBoard projects={projects} />
        </div>
      )}
    </div>
  );
}
