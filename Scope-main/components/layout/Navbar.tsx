"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "h-16 bg-white/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-md"
            : "h-20 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm"
        }`}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-full w-full">
          {/* Logo */}
          <Link
            href="/"
            className="font-headline-md text-headline-md tracking-tighter text-on-surface"
          >
            Scope
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-body-md text-body-md transition-all relative py-1 ${
                    isActive
                      ? "text-on-surface font-semibold border-b border-on-surface"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <button className="bg-[#0B0B0B] text-white px-8 py-3 rounded-full font-body-md text-body-md hover:opacity-80 transition-opacity whitespace-nowrap cursor-pointer">
                Let's Talk
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-on-surface hover:opacity-75 transition-opacity"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-3xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 w-full bg-white z-40 border-b border-outline-variant/30 shadow-lg md:hidden"
          >
            <div className="px-margin-mobile py-6 flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-headline-md text-body-md text-xl py-2 ${
                      isActive
                        ? "text-on-surface font-semibold border-b border-on-surface w-fit"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
