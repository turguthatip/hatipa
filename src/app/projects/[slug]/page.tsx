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

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm text-muted">
        <span>{project.company}</span>
        <span>{project.year}</span>
      </div>

      {project.caseStudy ? (
        <>
          {project.caseStudy.videos?.[0] && (
            <video
              className="mt-8 aspect-video w-full rounded-2xl bg-border object-cover"
              src={project.caseStudy.videos[0].src}
              controls
              playsInline
            />
          )}

          <div className="mt-12 flex max-w-2xl flex-col gap-10">
            {project.caseStudy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i} className="mt-3 text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                    {section.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.media?.map((block, i) => {
                  const srcs = Array.isArray(block.src) ? block.src : [block.src];
                  return (
                    <figure key={i} className="mt-6">
                      <div
                        className={
                          srcs.length > 1
                            ? "grid grid-cols-2 gap-4"
                            : undefined
                        }
                      >
                        {srcs.map((src) =>
                          block.type === "video" ? (
                            <video
                              key={src}
                              className="w-full rounded-2xl"
                              src={src}
                              controls
                              playsInline
                            />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={src}
                              src={src}
                              alt={block.caption ?? ""}
                              className="w-full rounded-2xl"
                            />
                          ),
                        )}
                      </div>
                      {block.caption && (
                        <figcaption className="mt-2 text-sm text-muted">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </section>
            ))}
          </div>

          {project.caseStudy.videos && project.caseStudy.videos.length > 1 && (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.caseStudy.videos.slice(1).map((video) => (
                <video
                  key={video.src}
                  className="aspect-video w-full rounded-2xl bg-border object-cover"
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
          <div className="mt-8 aspect-video w-full rounded-2xl bg-border" />

          <p className="mt-8 max-w-xl text-lg text-muted">
            Case study content coming soon.
          </p>
        </>
      )}

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
