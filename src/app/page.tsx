import PageWrapper from "@/components/PageWrapper";

const projects = [
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

export default function HomePage() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Hi, my name is Turgut
        <br />
        I design digital products
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        I specialise in crafting UX/UI solutions for digital products that prioritise user satisfaction and help businesses move towards their objectives. My expertise lies in high-fidelity prototyping, user research, visual design, and information architecture
      </p>

      <section className="mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Selected projects
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {projects.map((title, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="aspect-4/3 w-full rounded-2xl border-2 border-transparent bg-border transition-colors group-hover:border-foreground" />
              <h3 className="mt-4 text-lg text-foreground">{title}</h3>
            </article>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
