/**
 * ServicesList — scroll-scrubbed accordion of service cards.
 * Each card's progress is one continuous, UNBOUNDED measure: how far the
 * viewport center has scrolled past the card (negative/zero before
 * reaching it, growing after). Clamped to [0, 1], this alone gives every
 * behavior we want with no extra state: it saturates at fully-open for
 * any further downward scroll (so a card naturally stays open once
 * passed), and eases back down smoothly and proportionally to scroll
 * distance while scrolling up — never a hidden/stale value, so it can't
 * snap shut; cards close one at a time, bottom-most first.
 */
"use client";

import { useEffect, useRef } from "react";

interface Service {
  title: string;
  description: string;
}

/* Placeholder services — replace with your real offering. */
const services: Service[] = [
  {
    title: "UX Research",
    description:
      "I dig into how people actually use a product — interviews, flows, and usability testing — to find where the experience breaks down before any pixels get drawn.",
  },
  {
    title: "UI Design",
    description:
      "High-fidelity interfaces built on a consistent visual language, so every screen feels considered rather than assembled.",
  },
  {
    title: "Prototyping",
    description:
      "Interactive prototypes that let teams and users react to the real flow early, catching issues long before development starts.",
  },
  {
    title: "Design Systems",
    description:
      "Reusable components and clear guidelines that keep a product's design consistent as it grows across teams and features.",
  },
  {
    title: "Branding",
    description:
      "Visual identities — typography, color, and tone — that give a product or company a distinct, recognisable presence.",
  },
];

const COLLAPSED_HEIGHT = 96;
const EXPANDED_HEIGHT = 248;
const OPEN_RANGE = 150; // px on each side of viewport center over which a card eases open/closed

/** Smoothstep easing so the growth eases in/out instead of moving linearly with scroll. */
function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export default function ServicesList() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;

      const viewportCenter = window.innerHeight / 1.365;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // Live top of the card, but a FIXED offset (not the card's own
        // current/animated height) for where its "center" is — this still
        // correctly reflects how much taller any *preceding* cards have
        // grown (real, legitimate document flow), without a feedback loop
        // from the card's own height affecting its own trigger point.
        const cardCenter = card.getBoundingClientRect().top + COLLAPSED_HEIGHT / 2;
        const pastAmount = viewportCenter - cardCenter;
        const t = (pastAmount + OPEN_RANGE) / (OPEN_RANGE * 2);
        const progress = ease(Math.min(1, Math.max(0, t)));

        card.style.height = `${COLLAPSED_HEIGHT + (EXPANDED_HEIGHT - COLLAPSED_HEIGHT) * progress}px`;
        card.style.backgroundColor = `color-mix(in srgb, var(--color-foreground) ${progress * 100}%, var(--color-border))`;

        const mixedText = `color-mix(in srgb, var(--color-background) ${progress * 100}%, var(--color-foreground))`;
        if (titleRefs.current[i]) titleRefs.current[i]!.style.color = mixedText;
        if (numberRefs.current[i]) numberRefs.current[i]!.style.color = mixedText;
        if (descWrapperRefs.current[i]) {
          descWrapperRefs.current[i]!.style.gridTemplateRows = `${progress}fr`;
          descWrapperRefs.current[i]!.style.marginTop = `${12 * progress}px`;
        }
        if (descRefs.current[i]) {
          descRefs.current[i]!.style.color = mixedText;
          descRefs.current[i]!.style.opacity = String(progress);
        }
        if (ringRefs.current[i]) ringRefs.current[i]!.style.opacity = String(progress);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {services.map((service, i) => (
        <div
          key={service.title}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-border px-8 will-change-[height]"
          style={{ height: COLLAPSED_HEIGHT }}
        >
          <div className="relative z-10 flex items-center justify-between gap-6">
            <h3
              ref={(el) => {
                titleRefs.current[i] = el;
              }}
              className="text-2xl font-semibold text-foreground"
            >
              {service.title}
            </h3>
            <span
              ref={(el) => {
                numberRefs.current[i] = el;
              }}
              className="text-sm text-muted"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Grid row scrubbed 0fr → 1fr so it takes zero space when closed
              (keeping the title truly centered) and grows with the reveal. */}
          <div
            ref={(el) => {
              descWrapperRefs.current[i] = el;
            }}
            className="relative z-10 grid overflow-hidden"
            style={{ gridTemplateRows: "0fr" }}
          >
            <p
              ref={(el) => {
                descRefs.current[i] = el;
              }}
              className="max-w-lg min-h-0 overflow-hidden opacity-0"
            >
              {service.description}
            </p>
          </div>

          {/* Decorative rings, faded in alongside the description. */}
          <div
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-0 h-40 w-40 -translate-y-1/2 translate-x-1/4 opacity-0"
          >
            <div className="absolute inset-0 rounded-full border-8 border-background/10" />
            <div className="absolute inset-6 rounded-full border-8 border-background/10" />
            <div className="absolute inset-12 rounded-full border-8 border-background/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
