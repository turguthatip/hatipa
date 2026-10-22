/**
 * ProjectDetail — a project's case study: header, media and sections, plus
 * previous/next links. Rendered both on the full /projects/[slug] page and
 * inside the bottom sheet that opens over the canvas.
 */
import Link from "next/link";

import DotBackdrop from "@/components/DotBackdrop";
import { getNextProject, getPreviousProject, type Project } from "@/lib/projects";

/* Media sits in the same framed style as the canvas on the collection pages. */
const FRAME = "w-full rounded-2xl border border-(--glass-border) shadow-[0_24px_48px_-24px_rgb(0_0_0/0.4)]";

export default function ProjectDetail({
  project,
  inSheet = false,
}: {
  project: Project;
  /** In the sheet, previous/next replace the history entry so Back closes the sheet. */
  inSheet?: boolean;
}) {
  const previousProject = getPreviousProject(project.slug);
  const nextProject = getNextProject(project.slug);
  // On the full page a plain <a> keeps navigation on full pages; a <Link>
  // would be intercepted and open the next project in a sheet on top.
  const NavLink = inSheet ? Link : "a";

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <header className="relative isolate flex flex-col items-center gap-5 py-16 text-center sm:py-24">
        <DotBackdrop />
        <p className="mono-label">
          {project.company} · {project.year}
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-6xl">
          {project.title}
        </h1>
      </header>

      {project.caseStudy ? (
        <>
          {project.caseStudy.videos?.[0] && (
            <video
              className={`${FRAME} aspect-video bg-border object-cover`}
              src={project.caseStudy.videos[0].src}
              controls
              playsInline
            />
          )}

          <div className="mt-20 flex flex-col gap-16">
            {project.caseStudy.sections.map((section) => (
              <section key={section.heading} className="border-t border-border pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-12">
                  <h2 className="mono-label shrink-0 pt-1.5 sm:w-48">{section.heading}</h2>
                  <div className="flex flex-col gap-4">
                    {section.paragraphs.map((paragraph, i) => (
                      <p key={i} className="text-pretty text-lg leading-relaxed text-foreground">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="list-disc space-y-2 pl-5 text-lg leading-relaxed text-muted-foreground marker:text-muted-foreground">
                        {section.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {section.media?.map((block, i) => {
                  const srcs = Array.isArray(block.src) ? block.src : [block.src];
                  return (
                    <figure key={i} className="mt-10">
                      <div className={srcs.length > 1 ? "grid grid-cols-2 gap-4" : undefined}>
                        {srcs.map((src) =>
                          block.type === "video" ? (
                            <video key={src} className={FRAME} src={src} controls playsInline />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={src} src={src} alt={block.caption ?? ""} className={FRAME} />
                          )
                        )}
                      </div>
                      {block.caption && (
                        <figcaption className="mono-label mt-3">{block.caption}</figcaption>
                      )}
                    </figure>
                  );
                })}
              </section>
            ))}
          </div>

          {project.caseStudy.videos && project.caseStudy.videos.length > 1 && (
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.caseStudy.videos.slice(1).map((video) => (
                <video
                  key={video.src}
                  className={`${FRAME} aspect-video bg-border object-cover`}
                  src={video.src}
                  controls
                  playsInline
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Placeholder hero — replace with real case study imagery. */}
          <div className={`${FRAME} aspect-video bg-border`} />
          <p className="mono-label mt-8 text-center">Case study coming soon</p>
        </>
      )}

      {/* Previous / next */}
      <nav className="mt-24 grid gap-4 sm:grid-cols-2">
        <NavLink
          href={`/projects/${previousProject.slug}`}
          {...(inSheet && { replace: true })}
          className="glass group rounded-2xl p-6 transition-transform hover:-translate-y-1"
        >
          <span className="mono-label">← Previous</span>
          <p className="mt-2 text-lg font-bold tracking-tight text-foreground">
            {previousProject.title}
          </p>
        </NavLink>
        <NavLink
          href={`/projects/${nextProject.slug}`}
          {...(inSheet && { replace: true })}
          className="glass group rounded-2xl p-6 text-right transition-transform hover:-translate-y-1"
        >
          <span className="mono-label">Next →</span>
          <p className="mt-2 text-lg font-bold tracking-tight text-foreground">
            {nextProject.title}
          </p>
        </NavLink>
      </nav>
    </div>
  );
}
