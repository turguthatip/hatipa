export interface Project {
  slug: string;
  title: string;
}

const titles = [
  "UX optimisation for Tap&Sign",
  "UX optimisation for My Vodafone",
  "UX optimisation for Verifier",
  "Digital banking app concept design",
  "Feature design (UX/UI) for Turkcell",
  "Branding for Assuva",
  "Branding for Are Architecture",
  "UX/UI optimisation for Insider",
  "UI design for Insider",
  "Branding for MB Interior Design",
  "Short animation Human Being",
  "Short animation Human Being",
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* Dedupe slugs for repeated titles (e.g. the two "Human Being" animations). */
const slugCounts = new Map<string, number>();

export const projects: Project[] = titles.map((title) => {
  const base = slugify(title);
  const count = slugCounts.get(base) ?? 0;
  slugCounts.set(base, count + 1);
  const slug = count === 0 ? base : `${base}-${count + 1}`;
  return { slug, title };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export function getPreviousProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index - 1 + projects.length) % projects.length];
}
