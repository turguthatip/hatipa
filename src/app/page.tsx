import DotBackdrop from "@/components/DotBackdrop";
import HeatmapLogo from "@/components/HeatmapLogo";
import PageWrapper from "@/components/PageWrapper";
import ProjectFolder from "@/components/ProjectFolder";
import WordsPullUp from "@/components/WordsPullUp";
import { collections, getCollectionProjects } from "@/lib/projects";

export default function HomePage() {
  return (
    <PageWrapper className="pt-6 sm:pt-10">
      {/* First screen: logo, greeting and the project folders. Fills the
          viewport so the sections below only appear once the visitor scrolls. */}
      <section className="relative isolate flex min-h-[calc(100svh-2.5rem)] flex-col items-center justify-center gap-12 pb-16 text-center">
        <DotBackdrop />

        <div className="flex flex-col items-center">
          <HeatmapLogo
            delay={0}
            // The canvas pads the logo for its glow; the negative margin pulls
            // the title up to where the visible logo ends.
            className="m-0 -mb-6 block size-40 sm:-mb-8 sm:size-48 [mask-image:radial-gradient(closest-side,black_75%,transparent)]"
          />
          <h1 className="text-5xl font-bold tracking-[-0.04em] text-foreground sm:text-7xl">
            <WordsPullUp text="Hi, I'm Turgut." />
          </h1>
        </div>

        {/* Top padding leaves room for the cards that fan out of the folders. */}
        <div className="flex flex-col items-center gap-28 pt-24 sm:flex-row sm:gap-10">
          {collections.map((collection) => (
            <ProjectFolder
              key={collection.slug}
              collection={collection}
              projects={getCollectionProjects(collection.slug)}
            />
          ))}
        </div>

        {/* Mouse/trackpad vs touch wording. */}
        <p className="mono-label [@media(hover:none)]:hidden">Click a folder to open</p>
        <p className="mono-label [@media(hover:hover)]:hidden">Tap a folder to open</p>
      </section>

      <section className="mx-auto mt-16 flex max-w-3xl flex-col gap-4 sm:flex-row sm:gap-12">
        <h2 className="mono-label shrink-0 pt-1.5 sm:w-40">What I do</h2>
        <p className="text-pretty text-lg leading-relaxed text-foreground">
          I specialise in crafting UX/UI solutions for digital products that prioritise user satisfaction and help businesses move towards their objectives. My expertise lies in high-fidelity prototyping, user research, visual design, and information architecture
        </p>
      </section>
    </PageWrapper>
  );
}
