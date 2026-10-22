/**
 * DotBackdrop — full-bleed dotted canvas behind a section, faded out
 * towards the edges. Place it inside a `relative isolate` parent.
 */
import { cn } from "@/lib/utils";

export default function DotBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "dot-grid pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]",
        className
      )}
    />
  );
}
