/**
 * The glowing heat-map logo, adapted from shaderscn's heatmap-hero block
 * (shadcn registry: @shaderscn/heatmap-hero).
 *
 * The logo should be a dark, filled shape on a transparent background
 * (like public/hatipa-logo.svg). Remote images need CORS headers.
 */
"use client";

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Heatmap, type PaperShaderElement } from "@paper-design/shaders-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const DEFAULT_COLORS = [
  "#11206a",
  "#1f3ba2",
  "#2f63e7",
  "#6bd7ff",
  "#ffe679",
  "#ff991e",
  "#ff4c00",
];

/**
 * HeatmapLogo — the glowing logo as an inline glyph, sized in em so it
 * scales with the surrounding text. The canvas is larger than the visible
 * logo (room for the glow to fade), so negative margins pull the
 * neighbouring words in to where the logo itself starts and ends.
 */
export default function HeatmapLogo({
  logo = "/hatipa-logo.svg",
  colors = DEFAULT_COLORS,
  speed = 1,
  delay = 0,
  className,
}: {
  logo?: string;
  /** Heat colors, from coolest to hottest. */
  colors?: string[];
  speed?: number;
  /** Seconds before the glyph pulls up, to sync with WordsPullUp. */
  delay?: number;
  className?: string;
}) {
  // Only a logo the browser has actually loaded is handed to the shader,
  // so one that fails (e.g. missing CORS headers) simply doesn't glow.
  const [loadedLogo, setLoadedLogo] = useState<string | null>(null);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => setLoadedLogo(logo);
    image.src = logo;
    return () => {
      image.onload = null;
    };
  }, [logo]);

  return (
    <motion.span
      aria-hidden
      initial={{ y: "30%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className={cn(
        "pointer-events-none relative -mx-[0.34em] -my-[0.45em] inline-block size-[1.8em] align-middle",
        className
      )}
    >
      {loadedLogo === logo && (
        // Heatmap processes the logo before drawing it, which suspends until ready.
        <Suspense fallback={null}>
          <Glow logo={logo} colors={colors} speed={speed} />
        </Suspense>
      )}
    </motion.span>
  );
}

function Glow({ logo, colors, speed }: { logo: string; colors: string[]; speed: number }) {
  const ref = useRef<PaperShaderElement>(null);

  // Runs once the processed logo is on screen.
  useLayoutEffect(() => {
    ref.current?.animate(
      { opacity: [0, 1], scale: [0.96, 1] },
      { duration: 1200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );
  }, [logo]);

  return (
    <Heatmap
      ref={ref}
      className="size-full"
      image={logo}
      suspendWhenProcessingImage
      colors={colors}
      colorBack="#00000000"
      contour={0.5}
      angle={0}
      noise={0}
      innerGlow={0.5}
      outerGlow={0.5}
      // Heatmap pads the logo to leave room for the glow. Drawing it at 4/7
      // fits the padding on the canvas, so the glow fades out before the edge.
      scale={4 / 7}
      speed={speed}
    />
  );
}
