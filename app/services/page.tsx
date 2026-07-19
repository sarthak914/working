"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <div className="flex-1 w-full bg-surface text-on-surface pt-32">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-xl">
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-label-sm text-label-sm text-on-tertiary-container bg-surface-container rounded-full px-4 py-1 inline-block mb-6 uppercase tracking-widest"
            >
              Capabilities
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl leading-none mb-12"
            >
              Our Expertise
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
            >
              We blend artistic intuition with technical precision to build digital experiences that move markets and define categories.
            </motion.p>
          </div>
        </div>
        <div className="mt-stack-md w-full h-[1px] bg-outline-variant/30"></div>
      </section>

      {/* Service 01: Design */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-xl">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <span className="font-headline-md text-headline-md text-outline">01</span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-5xl font-bold">Design</h2>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-12 bg-outline-variant/30"></div>
        </div>

        {/* Bento Grid Design */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Main Feature */}
          <motion.div
            whileHover={{ scale: 1.005, borderColor: "#0B0B0B" }}
            className="col-span-12 lg:col-span-7 bg-white border border-outline-variant/30 rounded-xl overflow-hidden p-6 md:p-10 flex flex-col justify-between min-h-[500px] transition-all duration-300"
          >
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-surface-container relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXtR9hbDX9eUNEA2E3RTUqZ93urnASmatmNxuvcx7gbdJ_ECwBlsD3PEwk5u8vRlSCqRbrWvAfr4aj_RPbeOMCbpwkOdjx1YFzPO7AkWQd0KAa2EUAmq1376NvH8CEEjCNsn_qCHmuJqr6n-bUWBZlzl8RlglIlQxgPM18-iASdENCHhkIUeMj4M_SBuqrllajZyTrH7bI2bTFEgEXMs0abMbXCKiWdaXZXvxrq_qOwxI065UDrVFd2Z5_oaDDrnbS_QQypEziHG4t"
                alt="Scope Visual Architecture Design"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="mt-8">
              <h3 className="font-headline-md text-2xl font-bold mb-4">Visual Architecture</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-8">
                Crafting high-fidelity interfaces that prioritize clarity and emotional resonance. Our design philosophy is rooted in the &quot;Quiet Confidence&quot; of minimalism.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-xs">UI/UX Design</span>
                <span className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-xs">Brand Identity</span>
                <span className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-xs">Motion Systems</span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Features */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-gutter">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.005, borderColor: "#0B0B0B" }}
              className="bg-white border border-outline-variant/30 rounded-xl p-8 flex-1 transition-all duration-300"
            >
              <h4 className="font-label-sm text-label-sm text-on-tertiary-container mb-4">PROCESS</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="font-headline-md text-2xl text-outline/30 font-bold">A</span>
                  <div>
                    <h5 className="font-body-md font-semibold text-base">Immersion</h5>
                    <p className="font-body-md text-on-surface-variant">Deep diving into your brand&apos;s core values and market positioning.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-headline-md text-2xl text-outline/30 font-bold">B</span>
                  <div>
                    <h5 className="font-body-md font-semibold text-base">Iteration</h5>
                    <p className="font-body-md text-on-surface-variant">Rapid prototyping and refinement through relentless testing.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <Link href="/contact" className="w-full">
              <button className="group w-full py-12 border border-[#0B0B0B] rounded-full flex items-center justify-center gap-4 hover:bg-[#0B0B0B] hover:text-white transition-all duration-500 cursor-pointer">
                <span className="font-headline-md text-xl group-hover:text-white transition-colors">Start Designing</span>
                <span className="material-symbols-outlined text-4xl group-hover:text-white group-hover:translate-x-2 transition-all">
                  arrow_forward
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service 02: Development */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-xl">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <span className="font-headline-md text-headline-md text-outline">02</span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-5xl font-bold">Development</h2>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-12 bg-outline-variant/30"></div>
        </div>

        <div className="grid grid-cols-12 gap-gutter">
          {/* Small Features Stack */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.005 }}
              className="bg-inverse-surface text-inverse-on-surface rounded-xl p-8 flex flex-col justify-between aspect-square transition-transform duration-300"
            >
              <span className="material-symbols-outlined text-5xl text-white">terminal</span>
              <div>
                <h3 className="font-headline-md text-white text-2xl font-bold mb-2">Performance First</h3>
                <p className="font-body-md opacity-70">Blazing fast load times and optimized code structures for modern browsers.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.005, borderColor: "#0B0B0B" }}
              className="bg-white border border-outline-variant/30 rounded-xl p-8 flex flex-col justify-between aspect-square transition-all duration-300"
            >
              <span className="material-symbols-outlined text-5xl">database</span>
              <div>
                <h3 className="font-headline-md text-2xl font-bold mb-2">Scalable Systems</h3>
                <p className="font-body-md text-on-surface-variant">Architecture designed to grow with your user base without friction.</p>
              </div>
            </motion.div>
          </div>

          {/* Main Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.005, borderColor: "#0B0B0B" }}
            className="col-span-12 lg:col-span-8 bg-white border border-outline-variant/30 rounded-xl overflow-hidden relative min-h-[400px] transition-all duration-300"
          >
            <div className="p-12 h-full flex flex-col justify-end">
              <div className="max-w-xl">
                <h3 className="font-display-xl-mobile md:text-6xl font-bold leading-tight mb-6">Engineered Excellence.</h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                  We specialize in React, Next.js, and bespoke animation engines that bring static designs to life with fluid motion.
                </p>
                <div className="flex gap-4">
                  <Link href="/contact">
                    <button className="bg-[#0B0B0B] text-white px-8 py-4 rounded-full font-label-sm text-xs cursor-pointer">
                      View Tech Stack
                    </button>
                  </Link>
                  <Link href="/about">
                    <button className="px-8 py-4 border border-outline rounded-full font-label-sm text-xs hover:border-on-surface transition-colors cursor-pointer">
                      The Process
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service 03: Strategy */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-xl">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <span className="font-headline-md text-headline-md text-outline">03</span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-5xl font-bold">Strategy</h2>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-12 bg-outline-variant/30"></div>
        </div>

        <div className="grid grid-cols-12 gap-gutter">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.002, borderColor: "#0B0B0B" }}
            className="col-span-12 bg-white border border-outline-variant/30 rounded-xl overflow-hidden grid grid-cols-12 transition-all duration-300"
          >
            <div className="col-span-12 md:col-span-6 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-headline-lg-mobile md:text-4xl font-bold mb-6">Data-Driven Vision</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                Strategy is the bridge between creativity and commerce. We analyze market gaps to position your brand where it can&apos;t be ignored.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-label-sm text-xs text-on-tertiary-container mb-2 uppercase font-bold">
                    Market Analysis
                  </h4>
                  <p className="font-body-md">In-depth research of competitors and consumer behavior.</p>
                </div>
                <div>
                  <h4 className="font-label-sm text-xs text-on-tertiary-container mb-2 uppercase font-bold">
                    Product Roadmaps
                  </h4>
                  <p className="font-body-md">Phased planning for sustainable growth and innovation.</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 h-[300px] md:h-auto bg-surface-container relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdm1YCevfQ1yFK7hqR7NkY1KHzzx7UjrimNX9DveCyOvj20tvPr0Br8PPa2alVyLGWTBEbZxmu5iZf4tNAb3CyEMlywl_3OsaloCO70sHAL20dscqIk7YL607be_ngURK1xfWZZCg_YWtQzgoyogs5r-yjdZ15SoClx2P7aaIowT-zh0n4VgFURL_qE164Q7g8Cs8zhSy8inZuj4ZzQdMBYrI4mQdxvJlW3bDTCvKJv-5eAVkNIJzdf-pDNSU1PwRxMCH0XS_AuXsQ"
                alt="Scope Strategy Boardroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/0 to-white/20"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-inverse-surface py-stack-xl text-inverse-on-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display-xl-mobile md:font-display-xl mb-12 text-white font-bold leading-none"
          >
            Ready to redefine?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center"
          >
            <Link href="/contact">
              <button className="px-12 py-6 bg-white text-black font-headline-md text-body-md font-semibold rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                Start a Project
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
