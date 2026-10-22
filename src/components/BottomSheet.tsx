/**
 * BottomSheet — slides a route's content up over the current page.
 * Used by the intercepted /projects/[slug] route (app/@modal), so the URL
 * stays shareable while the canvas stays in place behind the sheet.
 *
 * Closes on: dragging the handle down, clicking the backdrop, Esc, or the
 * close button — each animates out, then steps back in history.
 *
 * Capped at max-w-5xl and centred, so it never spans a wide desktop screen.
 */
"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { X } from "lucide-react";

export default function BottomSheet({
  children,
  title,
}: {
  children: ReactNode;
  /** Accessible name for the dialog. */
  title: string;
}) {
  const router = useRouter();
  const dragControls = useDragControls();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(true);

  const close = useCallback(() => setOpen(false), []);

  // Esc to close, lock page scroll behind the sheet, focus the close button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="absolute inset-x-0 bottom-0 mx-auto h-[94svh] w-full max-w-5xl drop-shadow-[0_-24px_48px_rgb(0_0_0/0.35)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) close();
            }}
          >
            <div className="flex size-full flex-col overflow-hidden rounded-t-3xl border-x border-t border-(--glass-border) bg-background">
              {/* Header: drag handle + actions. Dragging starts only here so
                  the content can still scroll normally. */}
              <div
                className="relative flex shrink-0 cursor-grab touch-none items-center justify-end gap-2 px-4 pt-3 pb-2 active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <span
                  aria-hidden
                  className="absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-muted-foreground/40"
                />
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close"
                  onClick={close}
                  className="glass flex size-9 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-6 pb-24">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
