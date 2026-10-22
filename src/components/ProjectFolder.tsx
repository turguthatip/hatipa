/**
 * ProjectFolder — a macOS-style folder for a project collection.
 * The back cover is a live mesh-gradient shader, the front is frosted glass.
 * Once the folder scrolls into view it opens by itself: the front leans
 * forward and up to three project cards fan out. Clicking the folder opens
 * the collection, clicking a card opens that project.
 *
 * The folder has a fixed 288×208 size so the clip-path shapes stay crisp.
 */
"use client";

import Link from "next/link";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { ArrowUpRight } from "lucide-react";

import type { Collection, Project } from "@/lib/projects";

/* Folder silhouettes: the back has its tab on the right, the front on the left. */
const BACK_SHAPE =
  "path('M16 18 H124 C138 18 140 0 156 0 H272 Q288 0 288 16 V192 Q288 208 272 208 H16 Q0 208 0 192 V34 Q0 18 16 18 Z')";
// Relative to the front panel, which starts 44px down so it doesn't block the cards above it.
const FRONT_SHAPE =
  "path('M16 0 H100 C114 0 116 18 132 18 H272 Q288 18 288 34 V148 Q288 164 272 164 H16 Q0 164 0 148 V16 Q0 0 16 0 Z')";

/* Where each card rests inside the folder, and where it fans out to when open. */
const CARD_POSES = [
  { rest: "translate(0, 12px)", fan: "translate(-34px, -74px) rotate(-9deg)" },
  { rest: "translate(0, 6px)", fan: "translate(0, -92px) rotate(-1deg)" },
  { rest: "translate(0, 0)", fan: "translate(34px, -70px) rotate(8deg)" },
];

interface ProjectFolderProps {
  collection: Collection;
  projects: Project[];
}

export default function ProjectFolder({ collection, projects }: ProjectFolderProps) {
  const href = `/work/${collection.slug}`;
  const { ref: folderRef, isOpen } = useOpenInView();
  const cards = projects.slice(0, CARD_POSES.length);
  const count =
    projects.length === 0
      ? "Coming soon"
      : `${projects.length} ${projects.length === 1 ? "project" : "projects"}`;

  return (
    <div
      ref={folderRef}
      data-open={isOpen || undefined}
      className="group relative h-[208px] w-[288px] text-left transition-transform duration-500 ease-out [perspective:900px] hover:-translate-y-1"
    >
      {/* Back cover */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="absolute inset-0 drop-shadow-[0_18px_28px_rgba(0,0,0,0.18)]"
      >
        <div className="size-full" style={{ clipPath: BACK_SHAPE }}>
          <MeshGradient
            className="size-full"
            colors={collection.colors}
            distortion={0.9}
            swirl={0.6}
            grainOverlay={0.15}
            speed={0.35}
          />
        </div>
      </Link>

      {/* Project cards, tucked between back and front */}
      {cards.map((project, i) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          aria-label={project.title}
          className="absolute top-6 left-9 w-[216px] rounded-xl border border-black/5 bg-white p-2 shadow-md transition-transform duration-500 ease-out [transform:var(--rest)] group-data-open:[transform:var(--fan)] group-data-open:delay-[calc(var(--i)*60ms+250ms)] dark:border-white/10 dark:bg-neutral-900"
          style={
            {
              "--rest": CARD_POSES[i].rest,
              "--fan": CARD_POSES[i].fan,
              "--i": i,
            } as CSSProperties
          }
        >
          <div className="flex items-center justify-between gap-2 px-0.5 pb-1.5">
            <span className="truncate text-[11px] font-medium text-foreground">
              {project.company}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">{project.year}</span>
          </div>
          <Thumbnail src={project.thumbnail} />
        </Link>
      ))}

      {/* Frosted front panel */}
      <Link
        href={href}
        className="absolute inset-x-0 top-11 bottom-0 origin-bottom transition-transform duration-500 ease-out group-data-open:delay-150 group-data-open:[transform:rotateX(-24deg)]"
      >
        <div
          className="absolute inset-0 bg-linear-to-b from-(--glass-from) to-(--glass-to) backdrop-blur-xl"
          style={{ clipPath: FRONT_SHAPE }}
        />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              {collection.title}
            </h3>
            <p className="mono-label mt-0.5">{count}</p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background shadow-lg transition-transform duration-300 group-hover:scale-105">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </div>
  );
}

/**
 * Reports the folder as open while it's mostly on screen, so the cards fan
 * out when the visitor lands on it (and fold back when it scrolls away).
 */
function useOpenInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsOpen(entry.isIntersecting), {
      threshold: 0.6,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isOpen };
}

function Thumbnail({ src }: { src?: string }) {
  const className = "aspect-[16/10] w-full rounded-md bg-border object-cover";
  if (!src) return <div className={className} />;
  if (src.endsWith(".mp4")) {
    // #t= makes the browser paint the first frame without autoplaying.
    return <video className={className} src={`${src}#t=0.1`} muted playsInline preload="metadata" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt="" />;
}
