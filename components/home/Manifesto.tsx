"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ============================================================
   MANIFESTO SECTION
   Warm off-white editorial moment immediately after the Hero.
   No cards, no icons, no images — typography and whitespace only.

   Visual philosophy: INTENSITY → BREATHING ROOM
   ============================================================ */

const MANIFESTO_EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-50px" } as const;

const REVEAL_FROM = { opacity: 1, y: 20 } as const;
const REVEAL_TO = { opacity: 1, y: 0 } as const;

function useManifestoReveal(delay = 0) {
  const ref = useRef<HTMLParagraphElement | HTMLDivElement | null>(null);
  const isInView = useInView(ref, VIEWPORT);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const inViewport =
      rect.top < window.innerHeight - 50 && rect.bottom > 50;

    if (inViewport) {
      /* Ensure content is readable if IO already missed this element. */
      ref.current.style.opacity = "1";
      ref.current.style.transform = "translateY(0px)";
    }
  }, [mounted]);

  const shouldReveal = mounted && isInView && !reduceMotion;

  return {
    ref,
    initial: reduceMotion ? REVEAL_TO : REVEAL_FROM,
    animate: shouldReveal || reduceMotion ? REVEAL_TO : REVEAL_FROM,
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.9, delay, ease: MANIFESTO_EASE },
  };
}

export default function Manifesto() {
  const line1 = useManifestoReveal(0);
  const line2 = useManifestoReveal(0.1);
  const separator = useManifestoReveal(0.2);
  const line3 = useManifestoReveal(0.3);
  const line4 = useManifestoReveal(0.42);

  return (
    <section
      data-nav-theme="light"
      id="capabilities"
      aria-label="Manifesto"
      style={{
        backgroundColor: "var(--scope-light)",
        padding: "clamp(5rem, 12vw, 11rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border — reinforces the environment change */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "var(--spacing-margin-mobile)",
          right: "var(--spacing-margin-mobile)",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(14,14,14,0.12) 30%, rgba(14,14,14,0.12) 70%, transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "var(--spacing-container-max)",
          margin: "0 auto",
          padding: "0 var(--spacing-margin-mobile)",
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .manifesto-inner { padding-left: var(--spacing-margin-desktop) !important; padding-right: var(--spacing-margin-desktop) !important; }
          }
        `}</style>

        <div className="manifesto-inner" style={{ padding: "0 0" }}>
          {/* Line 1 — quiet entry */}
          <motion.p
            ref={line1.ref}
            className="manifesto-headline"
            initial={line1.initial}
            animate={line1.animate}
            transition={line1.transition}
            style={{
              color: "var(--scope-text-on-light-muted)",
              marginBottom: "0.15em",
            }}
          >
            We don&rsquo;t just put
          </motion.p>

          <motion.p
            ref={line2.ref}
            className="manifesto-headline"
            initial={line2.initial}
            animate={line2.animate}
            transition={line2.transition}
            style={{
              color: "var(--scope-text-on-light-muted)",
              marginBottom: "clamp(1rem, 4vw, 2.5rem)",
            }}
          >
            businesses online.
          </motion.p>

          {/* Thin separator line */}
          <motion.div
            ref={separator.ref}
            initial={separator.initial}
            animate={separator.animate}
            transition={separator.transition}
            style={{
              width: "clamp(2rem, 6vw, 4rem)",
              height: "1px",
              backgroundColor: "rgba(14,14,14,0.2)",
              marginBottom: "clamp(1rem, 4vw, 2.5rem)",
            }}
            aria-hidden="true"
          />

          {/* Line 2 — stronger emphasis */}
          <motion.p
            ref={line3.ref}
            className="manifesto-headline-strong"
            initial={line3.initial}
            animate={line3.animate}
            transition={line3.transition}
            style={{
              color: "var(--scope-text-on-light)",
              marginBottom: "0.1em",
            }}
          >
            We make them
          </motion.p>

          <motion.p
            ref={line4.ref}
            className="manifesto-headline-strong"
            initial={line4.initial}
            animate={line4.animate}
            transition={line4.transition}
            style={{
              color: "var(--scope-text-on-light)",
            }}
          >
            impossible to ignore.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
