"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";

/* Load canvas only on client to avoid SSR issues */
const HeroCanvas = dynamic(() => import("@/components/ui/HeroCanvas"), { ssr: false });

const HERO_EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   ANIMATION VARIANTS — stable module-level references
   Core text stays opacity: 1; motion only enhances reveal.
   ============================================================ */

/**
 * Masked text reveal — lines sweep up from a clip-path.
 * opacity remains 1 so text is never fully removed from layout.
 */
const maskReveal: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    y: 14,
    opacity: 1,
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: HERO_EASE,
    },
  },
};

/** Horizontal reveal for SCOPE. */
const scopeReveal: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    opacity: 1,
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: HERO_EASE,
    },
  },
};

/** Fade with slight lift — opacity always 1. */
const FADE_LIFT_0: Variants = {
  hidden: { opacity: 1, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0, ease: HERO_EASE },
  },
};

const FADE_LIFT_0_1: Variants = {
  hidden: { opacity: 1, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1, ease: HERO_EASE },
  },
};

/** Container that staggers children */
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Reduced-motion: no transform/clip changes, content stays visible. */
const reducedVariant: Variants = {
  hidden: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  visible: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
};

/* ============================================================
   HERO COMPONENT
   ============================================================ */

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;
  const [isInView, setIsInView] = useState(false);
  const [failSafeVisible, setFailSafeVisible] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsInView(true), 80);
    const failSafeTimer = setTimeout(() => setFailSafeVisible(true), 1200);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(failSafeTimer);
    };
  }, []);

  const useMotion = isInView && !reduceMotion && !failSafeVisible;
  const motionInitial = useMotion ? "hidden" : "visible";
  const motionAnimate = "visible";

  const line1Variant = reduceMotion ? reducedVariant : maskReveal;
  const line2Variant = reduceMotion ? reducedVariant : maskReveal;
  const scopeVariant = reduceMotion ? reducedVariant : scopeReveal;
  const eyebrowVariant = reduceMotion ? reducedVariant : FADE_LIFT_0;
  const fade1 = reduceMotion ? reducedVariant : FADE_LIFT_0;
  const fade2 = reduceMotion ? reducedVariant : FADE_LIFT_0_1;

  const headlineFailSafeStyle = failSafeVisible
    ? { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }
    : undefined;

  return (
    <section
      id="hero"
      data-nav-theme="dark"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: "var(--scope-dark)" }}
      aria-label="Hero"
    >
      {/* WebGL Canvas Background */}
      <HeroCanvas reducedMotion={reduceMotion} />

      {/* Gradient footer fade — helps hero content read over canvas edge */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-[1] h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--scope-dark) 0%, transparent 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: "var(--spacing-container-max)",
          margin: "0 auto",
          padding:
            "0 var(--spacing-margin-mobile) clamp(3rem, 7vw, 6rem) var(--spacing-margin-mobile)",
        }}
      >
        {/* Desktop: generous left margin */}
        <style>{`
          @media (min-width: 768px) {
            .hero-inner-pad {
              padding-left: var(--spacing-margin-desktop);
              padding-right: var(--spacing-margin-desktop);
            }
          }
        `}</style>
        <div className="hero-inner-pad">
          {/* ── Eyebrow ── */}
          <motion.div
            variants={eyebrowVariant}
            initial={motionInitial}
            animate={motionAnimate}
            style={{
              color: "var(--scope-text-on-dark-muted)",
              fontSize: "clamp(0.6rem, 1vw, 0.7rem)",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            Digital Agency — Est. 2024
          </motion.div>

          {/* ── HEADLINE: YOUR BUSINESS / HAS MORE / SCOPE. ── */}
          <motion.div
            variants={staggerContainer}
            initial={motionInitial}
            animate={motionAnimate}
            aria-label="Your Business Has More Scope."
          >
            {/* Line 1: YOUR BUSINESS */}
            <div style={{ overflow: "hidden" }}>
              <motion.div
                variants={line1Variant}
                initial={motionInitial}
                animate={motionAnimate}
                className="hero-headline"
                style={{
                  color: "var(--scope-text-on-dark)",
                  ...headlineFailSafeStyle,
                }}
                aria-hidden="true"
              >
                Your Business
              </motion.div>
            </div>

            {/* Line 2: HAS MORE */}
            <div style={{ overflow: "hidden" }}>
              <motion.div
                variants={line2Variant}
                initial={motionInitial}
                animate={motionAnimate}
                className="hero-headline"
                style={{
                  color: "var(--scope-text-on-dark)",
                  marginTop: "-0.02em",
                  ...headlineFailSafeStyle,
                }}
                aria-hidden="true"
              >
                Has More
              </motion.div>
            </div>

            {/* Line 3: SCOPE. — horizontal reveal, strongest emphasis */}
            <div style={{ overflow: "hidden", marginTop: "-0.02em" }}>
              <motion.div
                variants={scopeVariant}
                initial={motionInitial}
                animate={motionAnimate}
                className="hero-headline-scope"
                style={{
                  color: "var(--scope-text-on-dark)",
                  ...headlineFailSafeStyle,
                }}
                aria-hidden="true"
              >
                Scope.
              </motion.div>
            </div>
          </motion.div>

          {/* ── SUPPORTING COPY + CTA ROW ── */}
          <div
            style={{
              marginTop: "clamp(2rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {/* Two-column on larger screens */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              <style>{`
                @media (min-width: 768px) {
                  .hero-bottom-row {
                    flex-direction: row !important;
                    align-items: flex-end !important;
                    justify-content: space-between !important;
                  }
                }
              `}</style>
              <div className="hero-bottom-row" style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                {/* Supporting copy */}
                <motion.p
                  variants={fade1}
                  initial={motionInitial}
                  animate={motionAnimate}
                  style={{
                    color: "var(--scope-text-on-dark-muted)",
                    fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                    lineHeight: 1.65,
                    maxWidth: "38ch",
                    fontWeight: 400,
                  }}
                >
                  We build digital experiences that turn ambitious businesses
                  into brands people notice.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={fade2}
                  initial={motionInitial}
                  animate={motionAnimate}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Primary CTA */}
                  <Link href="/contact" aria-label="Start a Project">
                    <span className="hero-cta-primary">
                      Start a Project{" "}
                      <span aria-hidden="true" className="hero-cta-arrow">↗</span>
                    </span>
                  </Link>

                  {/* Secondary — scroll prompt */}
                  <a
                    href="#services"
                    className="hero-cta-secondary"
                    aria-label="Explore our capabilities"
                  >
                    Explore our capabilities{" "}
                    <span aria-hidden="true">↓</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA STYLES (scoped here to avoid globals bloat) ── */}
      <style>{`
        .hero-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.35em;
          color: var(--scope-text-on-dark);
          font-size: clamp(0.9rem, 1.2vw, 1rem);
          font-weight: 500;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          padding: 0.75em 1.6em;
          border: 1px solid rgba(242, 240, 234, 0.25);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.25s ease, color 0.25s ease;
          white-space: nowrap;
        }
        .hero-cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(242, 240, 234, 0.06);
          transform: translateX(-101%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-cta-primary:hover::before {
          transform: translateX(0);
        }
        .hero-cta-primary:hover {
          border-color: rgba(242, 240, 234, 0.5);
        }
        .hero-cta-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .hero-cta-primary:hover .hero-cta-arrow {
          transform: translate(2px, -2px);
        }
        .hero-cta-primary:focus-visible {
          outline: 2px solid rgba(242, 240, 234, 0.7);
          outline-offset: 3px;
        }

        .hero-cta-secondary {
          color: var(--scope-text-on-dark-muted);
          font-size: clamp(0.78rem, 1vw, 0.85rem);
          font-weight: 400;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.25s ease;
          cursor: pointer;
        }
        .hero-cta-secondary:hover {
          color: var(--scope-text-on-dark);
        }
        .hero-cta-secondary:focus-visible {
          outline: 2px solid rgba(242, 240, 234, 0.7);
          outline-offset: 3px;
          border-radius: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cta-primary::before { transition: none; }
          .hero-cta-arrow { transition: none; }
        }
      `}</style>
    </section>
  );
}
