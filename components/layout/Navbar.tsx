"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ============================================================
   NAVBAR
   ============================================================

   The navbar automatically detects the section/background
   underneath it.

   Dark section:
     dark background + light text

   Light section:
     light background + dark text

   Desktop:
     Logo | Work · Services · About | Start a Project ↗

   Mobile:
     Logo | menu -> full-screen overlay
   ============================================================ */

const NAV_LINKS = [
  {
    name: "Work",
    href: "/#work",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "About",
    href: "/about",
  },
];

const STANDARD_EASE = [0.16, 1, 0.3, 1] as const;
const EXIT_EASE = [0.4, 0, 1, 1] as const;

/* ============================================================
   HELPERS
   ============================================================ */

type NavTheme = "dark" | "light";

function parseRgb(color: string) {
  const match = color.match(
    /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/i
  );

  if (!match) {
    return null;
  }

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

function isTransparentColor(color: string) {
  if (!color) {
    return true;
  }

  const normalized = color
    .replace(/\s+/g, "")
    .toLowerCase();

  return (
    normalized === "transparent" ||
    normalized === "rgba(0,0,0,0)"
  );
}

function isDarkColor(color: string) {
  const rgb = parseRgb(color);

  if (!rgb) {
    return false;
  }

  const luminance =
    0.2126 * rgb.r +
    0.7152 * rgb.g +
    0.0722 * rgb.b;

  return luminance < 145;
}

function getElementTheme(
  startingElement: Element | null
): NavTheme {
  let element: Element | null = startingElement;

  while (
    element &&
    element !== document.documentElement
  ) {
    const htmlElement = element as HTMLElement;

    /*
     * Optional explicit override.
     *
     * Any section can use:
     *
     * data-nav-theme="dark"
     *
     * or
     *
     * data-nav-theme="light"
     *
     * This is useful if a section uses an image,
     * canvas, gradient, or transparent background.
     */
    const explicitTheme =
      htmlElement.dataset?.navTheme;

    if (explicitTheme === "dark") {
      return "dark";
    }

    if (explicitTheme === "light") {
      return "light";
    }

    const styles =
      window.getComputedStyle(htmlElement);

    const backgroundColor =
      styles.backgroundColor;

    if (
      backgroundColor &&
      !isTransparentColor(backgroundColor)
    ) {
      return isDarkColor(backgroundColor)
        ? "dark"
        : "light";
    }

    element = element.parentElement;
  }

  /*
   * Final fallback:
   * inspect the body background.
   */
  const bodyBackground =
    window.getComputedStyle(document.body)
      .backgroundColor;

  return isDarkColor(bodyBackground)
    ? "dark"
    : "light";
}

/* ============================================================
   LOGO
   ============================================================ */

function ScopeWordmark({
  style,
}: {
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-label="Scope"
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontWeight: 700,
        letterSpacing: "-0.05em",
        fontSize: "1.25rem",
        lineHeight: 1,
        transition: "color 0.4s ease",
        ...style,
      }}
    >
      Sc

      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "0.72em",
          height: "0.72em",
          marginBottom: "-0.05em",
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="11"
          strokeLinejoin="round"
        >
          <polygon
            points="50,5 95,50 50,95 5,50"
          />
        </svg>
      </span>

      pe
    </span>
  );
}

/* ============================================================
   NAV LINK
   ============================================================ */

function NavLink({
  href,
  children,
  color,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  color: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="scope-nav-link"
      style={{
        color,
        fontSize: "0.8rem",
        fontWeight: active ? 600 : 400,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        textDecoration: "none",
        position: "relative",
        paddingBottom: "2px",
        transition: "color 0.25s ease",
      }}
    >
      {children}

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: active ? "100%" : "0%",
          height: "1px",
          backgroundColor: "currentColor",
          opacity: active ? 0.6 : 0,
          transition:
            "width 0.3s ease, opacity 0.3s ease",
        }}
      />

      <style>{`
        .scope-nav-link:hover > span[aria-hidden="true"] {
          width: 100% !important;
          opacity: 0.4 !important;
        }
      `}</style>
    </Link>
  );
}

/* ============================================================
   MOBILE MENU ANIMATIONS
   ============================================================ */

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.35,
      ease: STANDARD_EASE,
    },
  },

  exit: {
    opacity: 0,
    y: -8,

    transition: {
      duration: 0.2,
      ease: EXIT_EASE,
    },
  },
};

const reducedMenuVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const mobileLinkVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -12,
  },

  visible: (i = 0) => ({
    opacity: 1,
    x: 0,

    transition: {
      delay: i * 0.07 + 0.1,
      duration: 0.4,
      ease: STANDARD_EASE,
    },
  }),
};

const reducedLinkVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },
};

/* ============================================================
   NAVBAR COMPONENT
   ============================================================ */

export default function Navbar() {
  const pathname = usePathname();

  const prefersReducedMotion =
    useReducedMotion();

  const [scrollY, setScrollY] =
    useState(0);

  const [navTheme, setNavTheme] =
    useState<NavTheme>("dark");

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [currentHash, setCurrentHash] =
    useState("");

  const menuBtnRef =
    useRef<HTMLButtonElement>(null);

  const mobileMenuRef =
    useRef<HTMLDivElement>(null);

  const wasMobileOpenRef =
    useRef(false);

  const rafRef =
    useRef<number | null>(null);

  /* ============================================================
     DETECT SECTION UNDER NAVBAR
     ============================================================ */

  const detectNavbarTheme =
    useCallback(() => {
      if (typeof window === "undefined") {
        return;
      }

      const navbarHeight = 72;
      const sampleY = navbarHeight / 2;

      const themedSections =
        Array.from(
          document.querySelectorAll<HTMLElement>(
            '[data-nav-theme="dark"], [data-nav-theme="light"]'
          )
        );

      let activeTheme: NavTheme | null = null;

      for (const section of themedSections) {
        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <= sampleY &&
          rect.bottom > sampleY
        ) {
          const theme =
            section.dataset.navTheme;

          if (
            theme === "dark" ||
            theme === "light"
          ) {
            activeTheme = theme;
            break;
          }
        }
      }

      if (activeTheme) {
        setNavTheme(activeTheme);
        return;
      }

      /*
       * Safe fallback based on page position.
       *
       * The homepage starts with the dark Hero.
       * If no explicitly themed section is found,
       * use dark only at the very top and light
       * everywhere else.
       */
      if (
        pathname === "/" &&
        window.scrollY < 100
      ) {
        setNavTheme("dark");
      } else {
        setNavTheme("light");
      }
    }, [pathname]);

  const updateNavbar =
    useCallback(() => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current =
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          detectNavbarTheme();

          rafRef.current = null;
        });
    }, [detectNavbarTheme]);

  /* ============================================================
     HASH
     ============================================================ */

  const handleHashChange =
    useCallback(() => {
      setCurrentHash(
        window.location.hash
      );

      window.requestAnimationFrame(
        detectNavbarTheme
      );
    }, [detectNavbarTheme]);

  const handleNavLinkClick =
    useCallback((href: string) => {
      const hashIndex =
        href.indexOf("#");

      setCurrentHash(
        hashIndex >= 0
          ? href.slice(hashIndex)
          : ""
      );

      setMobileOpen(false);
    }, []);

  /* ============================================================
     INITIALIZE + SCROLL LISTENERS
     ============================================================ */

  useEffect(() => {
    setScrollY(window.scrollY);

    setCurrentHash(
      window.location.hash
    );

    const firstFrame =
      window.requestAnimationFrame(() => {
        detectNavbarTheme();
      });

    const secondFrame =
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          detectNavbarTheme();
        });
      });

    window.addEventListener(
      "scroll",
      updateNavbar,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateNavbar
    );

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.cancelAnimationFrame(
        firstFrame
      );

      window.cancelAnimationFrame(
        secondFrame
      );

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(
          rafRef.current
        );
      }

      window.removeEventListener(
        "scroll",
        updateNavbar
      );

      window.removeEventListener(
        "resize",
        updateNavbar
      );

      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, [
    pathname,
    detectNavbarTheme,
    updateNavbar,
    handleHashChange,
  ]);

  /* ============================================================
     MOBILE MENU ACCESSIBILITY
     ============================================================ */

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";

      if (wasMobileOpenRef.current) {
        wasMobileOpenRef.current = false;

        menuBtnRef.current?.focus();
      }

      return;
    }

    wasMobileOpenRef.current = true;

    document.body.style.overflow =
      "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusFirstElement = () => {
      const focusableElements =
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          focusableSelector
        );

      focusableElements?.[0]?.focus();
    };

    const frameId =
      window.requestAnimationFrame(
        focusFirstElement
      );

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();

        setMobileOpen(false);

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements =
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          focusableSelector
        );

      if (
        !focusableElements ||
        focusableElements.length === 0
      ) {
        event.preventDefault();

        mobileMenuRef.current?.focus();

        return;
      }

      const firstElement =
        focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      const activeElement =
        document.activeElement;

      if (
        event.shiftKey &&
        activeElement === firstElement
      ) {
        event.preventDefault();

        lastElement.focus();
      } else if (
        !event.shiftKey &&
        activeElement === lastElement
      ) {
        event.preventDefault();

        firstElement.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.cancelAnimationFrame(
        frameId
      );

      document.body.style.overflow = "";

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [mobileOpen]);

  /* ============================================================
     ACTIVE LINK
     ============================================================ */

  const isLinkActive = (
    href: string
  ) => {
    const [linkPath, linkHash] =
      href.split("#");

    const normalizedPath =
      linkPath || "/";

    if (linkHash) {
      return (
        pathname === normalizedPath &&
        currentHash === `#${linkHash}`
      );
    }

    return pathname === normalizedPath;
  };

  /* ============================================================
     NAVBAR COLORS
     ============================================================ */

  const isDark =
    navTheme === "dark";

  const isScrolled =
    scrollY > 20;

  const textColor =
    isDark
      ? "#f2f0ea"
      : "#0e0e0e";

  const mutedColor =
    isDark
      ? "rgba(242, 240, 234, 0.65)"
      : "rgba(14, 14, 14, 0.65)";

  const ctaBorder =
    isDark
      ? "rgba(242, 240, 234, 0.25)"
      : "rgba(14, 14, 14, 0.25)";

  const ctaHoverBg =
    isDark
      ? "rgba(242, 240, 234, 0.08)"
      : "rgba(14, 14, 14, 0.06)";

  /*
   * IMPORTANT:
   *
   * At the very top of the dark Hero,
   * keep the navbar transparent.
   *
   * Once scrolling begins, give it a
   * matching translucent background.
   *
   * Light sections get a light translucent
   * background so the navbar never disappears.
   */

  const navBg =
    isDark
      ? isScrolled
        ? "rgba(8, 8, 8, 0.94)"
        : "transparent"
      : "rgba(249, 249, 249, 0.94)";

  const navBorderColor =
    isDark
      ? "rgba(242, 240, 234, 0.07)"
      : "rgba(14, 14, 14, 0.08)";

  const navBlur =
    isScrolled || !isDark
      ? "blur(20px)"
      : "none";

  const navHeight =
    "clamp(3.5rem, 5vw, 4.5rem)";

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <>
      <nav
        data-scope-navbar="true"
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: navHeight,
          backgroundColor: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter:
            navBlur,
          borderBottom:
            `1px solid ${navBorderColor}`,
          transition:
            "background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease, color 0.35s ease",
        }}
      >
        <div
          className="nav-outer-container"
          style={{
            maxWidth:
              "var(--spacing-container-max)",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding:
              "0 var(--spacing-margin-mobile)",
          }}
        >
          <style>{`
            @media (min-width: 768px) {
              .nav-outer-container {
                padding-left: var(--spacing-margin-desktop) !important;
                padding-right: var(--spacing-margin-desktop) !important;
              }
            }
          `}</style>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
            }}
          >
            {/* LOGO */}

            <Link
              href="/"
              aria-label="Scope - Home"
              onClick={() =>
                handleNavLinkClick("/")
              }
              style={{
                textDecoration: "none",
                color: textColor,
                transition:
                  "color 0.35s ease",
              }}
            >
              <ScopeWordmark />
            </Link>

            {/* DESKTOP LINKS */}

            <div
              className="nav-desktop-links"
              style={{
                display: "none",
                alignItems: "center",
                gap:
                  "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              <style>{`
                @media (min-width: 768px) {
                  .nav-desktop-links {
                    display: flex !important;
                  }
                }
              `}</style>

              {NAV_LINKS.map(
                (link) => (
                  <NavLink
                    key={link.name}
                    href={link.href}
                    color={mutedColor}
                    active={isLinkActive(
                      link.href
                    )}
                    onClick={() =>
                      handleNavLinkClick(
                        link.href
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              )}
            </div>

            {/* RIGHT SIDE */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {/* DESKTOP CTA */}

              <Link
                href="/contact"
                onClick={() =>
                  handleNavLinkClick(
                    "/contact"
                  )
                }
                style={{
                  textDecoration: "none",
                }}
                className="nav-cta-desktop"
              >
                <style>{`
                  .nav-cta-desktop {
                    display: none;
                  }

                  @media (min-width: 768px) {
                    .nav-cta-desktop {
                      display: inline-flex !important;
                    }
                  }

                  .nav-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3em;

                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;

                    padding: 0.55em 1.3em;

                    border: 1px solid ${ctaBorder};

                    color: ${textColor};

                    transition:
                      border-color 0.25s ease,
                      background-color 0.25s ease,
                      color 0.25s ease;

                    cursor: pointer;
                    white-space: nowrap;
                    text-decoration: none;
                  }

                  .nav-cta-btn:hover {
                    border-color: ${textColor};
                    background: ${ctaHoverBg};
                  }

                  .nav-cta-btn:focus-visible {
                    outline: 2px solid ${textColor};
                    outline-offset: 3px;
                  }

                  .nav-cta-arrow {
                    display: inline-block;

                    transition:
                      transform 0.2s ease;
                  }

                  .nav-cta-btn:hover
                  .nav-cta-arrow {
                    transform:
                      translate(1px, -1px);
                  }
                `}</style>

                <span className="nav-cta-btn">
                  Start a Project

                  <span
                    className="nav-cta-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </span>
              </Link>

              {/* MOBILE MENU BUTTON */}

              <button
                ref={menuBtnRef}
                onClick={() =>
                  setMobileOpen(
                    (open) => !open
                  )
                }
                aria-expanded={mobileOpen}
                aria-label={
                  mobileOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-controls="mobile-menu"
                className="nav-mobile-btn"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent:
                    "center",
                  alignItems: "flex-end",
                  gap: "5px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  color: textColor,
                }}
              >
                <style>{`
                  @media (min-width: 768px) {
                    .nav-mobile-btn {
                      display: none !important;
                    }
                  }
                `}</style>

                <span
                  style={{
                    display: "block",
                    width: "22px",
                    height: "1.5px",
                    backgroundColor:
                      "currentColor",
                    transition:
                      "transform 0.3s ease, opacity 0.3s ease",
                    transform:
                      mobileOpen
                        ? "translateY(6.5px) rotate(45deg)"
                        : "none",
                  }}
                />

                <span
                  style={{
                    display: "block",
                    width: "16px",
                    height: "1.5px",
                    backgroundColor:
                      "currentColor",
                    opacity:
                      mobileOpen
                        ? 0
                        : 1,
                    transition:
                      "opacity 0.2s ease",
                  }}
                />

                <span
                  style={{
                    display: "block",
                    width: "22px",
                    height: "1.5px",
                    backgroundColor:
                      "currentColor",
                    transition:
                      "transform 0.3s ease",
                    transform:
                      mobileOpen
                        ? "translateY(-6.5px) rotate(-45deg)"
                        : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ======================================================
          MOBILE MENU
          ====================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            tabIndex={-1}
            variants={
              prefersReducedMotion
                ? reducedMenuVariants
                : mobileMenuVariants
            }
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              backgroundColor:
                "var(--scope-dark)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding:
                "var(--spacing-margin-mobile)",
            }}
          >
            <nav
              aria-label="Mobile navigation"
            >
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {[
                  ...NAV_LINKS,

                  {
                    name:
                      "Start a Project",
                    href: "/contact",
                  },
                ].map(
                  (link, i) => (
                    <motion.li
                      key={link.name}
                      variants={
                        prefersReducedMotion
                          ? reducedLinkVariants
                          : mobileLinkVariants
                      }
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      style={{
                        borderBottom:
                          "1px solid rgba(242,240,234,0.07)",
                        padding:
                          "clamp(1rem, 3vw, 1.5rem) 0",
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() =>
                          handleNavLinkClick(
                            link.href
                          )
                        }
                        style={{
                          display:
                            "block",

                          color:
                            link.name ===
                            "Start a Project"
                              ? "var(--scope-text-on-dark)"
                              : "var(--scope-text-on-dark-muted)",

                          fontSize:
                            "clamp(1.8rem, 6vw, 3rem)",

                          fontWeight:
                            link.name ===
                            "Start a Project"
                              ? 600
                              : 300,

                          letterSpacing:
                            "-0.02em",

                          textDecoration:
                            "none",

                          lineHeight: 1.1,

                          transition:
                            "color 0.2s ease",
                        }}
                      >
                        {link.name}

                        {link.name ===
                          "Start a Project" && (
                          <span
                            aria-hidden="true"
                            style={{
                              marginLeft:
                                "0.2em",
                              fontSize:
                                "0.6em",
                            }}
                          >
                            ↗
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </nav>

            <motion.p
              variants={
                prefersReducedMotion
                  ? reducedLinkVariants
                  : mobileLinkVariants
              }
              custom={5}
              initial="hidden"
              animate="visible"
              style={{
                position: "absolute",
                bottom:
                  "var(--spacing-margin-mobile)",
                left:
                  "var(--spacing-margin-mobile)",
                color:
                  "var(--scope-text-on-dark-muted)",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              © 2024 Scope
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}