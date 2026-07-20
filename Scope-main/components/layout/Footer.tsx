import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-stack-xl pb-stack-md bg-inverse-surface text-inverse-on-surface border-t border-outline/20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Brand Col */}
          <div className="md:col-span-4 mb-8 md:mb-0">
            <h2 className="font-headline-md text-headline-md text-white mb-6">Scope</h2>
            <p className="font-body-md text-on-tertiary-container max-w-xs mb-8">
              World-class digital agency building experiences for ambitious businesses globally.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-outline/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                aria-label="Public"
              >
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-outline/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-6 md:col-span-2">
            <h4 className="font-label-sm text-label-sm text-white mb-6 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/services"
                  className="font-body-md text-body-md text-on-tertiary-container hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="font-body-md text-body-md text-on-tertiary-container hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-body-md text-body-md text-on-tertiary-container hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-body-md text-body-md text-on-tertiary-container hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Support Links */}
          <div className="col-span-6 md:col-span-2">
            <h4 className="font-label-sm text-label-sm text-white mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="font-body-md text-body-md text-on-tertiary-container hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body-md text-body-md text-on-tertiary-container hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Col */}
          <div className="md:col-span-4 mt-8 md:mt-0">
            <h4 className="font-label-sm text-label-sm text-white mb-6 uppercase tracking-widest">Subscribe</h4>
            <p className="text-on-tertiary-container mb-6 font-body-md text-body-md">
              Stay updated with our latest thoughts on digital growth.
            </p>
            <div className="flex border-b border-outline/30 pb-2 group focus-within:border-white transition-colors">
              <input
                className="bg-transparent border-none focus:ring-0 text-white placeholder-on-tertiary-container w-full focus:outline-none"
                placeholder="Your Email"
                type="email"
              />
              <button
                type="button"
                className="text-white cursor-pointer hover:opacity-75 transition-opacity shrink-0"
                aria-label="Subscribe"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-outline/20 mt-stack-md pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-on-tertiary-container font-label-sm text-xs">
          <span>© 2024 Scope Digital Agency. Built for the bold.</span>
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-sm">public</span>
            <span className="font-body-md text-xs">Universal Time (UTC)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
