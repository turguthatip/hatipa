import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import WordsPullUp from "@/components/WordsPullUp";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        <WordsPullUp text="Hi, my name is Turgut" />
        <br />
        <WordsPullUp text="I design digital products" startIndex={5} />
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        I specialise in crafting UX/UI solutions for digital products that prioritise user satisfaction and help businesses move towards their objectives. My expertise lies in high-fidelity prototyping, user research, visual design, and information architecture
      </p>

      <section className="mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Selected projects
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group"
            >
              <div className="aspect-4/3 w-full rounded-2xl border-2 border-transparent bg-border transition-colors group-hover:border-foreground" />
              <h3 className="mt-4 text-lg text-foreground">{project.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
