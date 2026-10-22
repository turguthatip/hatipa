/**
 * EndOfPageLinkedIn — the LinkedIn button at the end of the page. It stays
 * hidden while scrolling and, once the visitor reaches the very end, pops up
 * with a springy jump into its spot. Scrolling back up hides it again, so
 * the jump replays next time.
 *
 * Rendered in the root layout after the page content.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import LinkedInButton from "@/components/LinkedInButton";

export default function EndOfPageLinkedIn() {
  const endRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const end = endRef.current;
    if (!end) return;
    const observer = new IntersectionObserver(([entry]) => setAtEnd(entry.isIntersecting));
    observer.observe(end);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="mt-8 mb-10 flex justify-center">
        <motion.div
          initial={false}
          animate={
            atEnd ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.6 }
          }
          // Underdamped spring so the button overshoots a little — the "jump".
          transition={
            atEnd
              ? { type: "spring", stiffness: 420, damping: 14, mass: 0.8 }
              : { duration: 0.2 }
          }
          className={atEnd ? undefined : "pointer-events-none"}
        >
          <LinkedInButton />
        </motion.div>
      </div>
      {/* End-of-page marker: visible means the visitor has hit the bottom. */}
      <div ref={endRef} aria-hidden className="h-px" />
    </>
  );
}
