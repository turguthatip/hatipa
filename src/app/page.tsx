import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import ServicesList from "@/components/ServicesList";
import WordsPullUp from "@/components/WordsPullUp";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <PageWrapper>
      <h1 className="text-display text-center font-semibold text-foreground">
        <WordsPullUp text="Hi, my name is Turgut, product designer" />
      </h1>
      <p className="mt-6 text-center text-2xl font-medium text-foreground">
        <WordsPullUp text="I design digital products" startIndex={5} />
      </p>

      {/* Placeholder video — replace with a real showreel/hero video. */}
      <div className="mt-20 aspect-video w-full rounded-2xl bg-border" />

      <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-muted">
        I specialise in crafting UX/UI solutions for digital products that prioritise user satisfaction and help businesses move towards their objectives. My expertise lies in high-fidelity prototyping, user research, visual design, and information architecture
      </p>

      <section className="mt-32">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          What I do
        </h2>
        <div className="mt-10">
          <ServicesList />
        </div>
      </section>

      <section className="mt-32">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Selected projects
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group"
            >
              {project.thumbnail ? (
                project.thumbnail.endsWith(".mp4") ? (
                  <video
                    className="aspect-4/3 w-full rounded-2xl border-2 border-transparent object-cover transition-colors group-hover:border-foreground"
                    src={project.thumbnail}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="aspect-4/3 w-full rounded-2xl border-2 border-transparent object-cover transition-colors group-hover:border-foreground"
                    src={project.thumbnail}
                    alt=""
                  />
                )
              ) : (
                <div className="aspect-4/3 w-full rounded-2xl border-2 border-transparent bg-border transition-colors group-hover:border-foreground" />
              )}
              <h3 className="mt-4 text-lg text-foreground">{project.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
