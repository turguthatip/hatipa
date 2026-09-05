/**
 * WordsPullUp — animates text in word-by-word, each word sliding up
 * and fading in with a staggered delay.
 */
"use client";

import { motion } from "motion/react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  /** Index of the first word, so multiple lines can share one continuous stagger. */
  startIndex?: number;
}

export default function WordsPullUp({
  text,
  className = "",
  startIndex = 0,
}: WordsPullUpProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: (startIndex + i) * 0.08,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
