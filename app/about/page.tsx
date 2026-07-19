"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const philosophyItems = [
  {
    num: "01 / RESTRAINT",
    desc: "Luxury is found in what is left out. We embrace negative space to let your brand's core message breathe and command attention without shouting.",
  },
  {
    num: "02 / PRECISION",
    desc: "Every pixel is intentional. Our design system approach ensures that every interaction feels engineered and purposeful, reflecting technical mastery.",
  },
  {
    num: "03 / PERFORMANCE",
    desc: "Aesthetics are nothing without speed. We build lean, scalable digital infrastructures that perform at the highest level of modern web standards.",
  },
];

const timeline = [
  { year: "2018", event: "The Inception of Scope" },
  { year: "2020", event: "Digital Agency of the Year nominee" },
  { year: "2022", event: "Expansion into Enterprise Design Systems" },
];

const team = [
  {
    name: "Julian Vane",
    role: "Founder & Creative lead",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-HpxCqADvHD--9TmaMsuAI9KA391BqN2vnq2aiYCThzlBSN77lz77SAY-Mvix8PB46nkBGLfYo_PcW8Rvavu6D4IX_tpgY05B2xpdsTNGtjFx_wBHMtlPphIiSlbcJhKv2zsqkftbU6VI9Y3zL1YxDgPJIycqyp74XkEFvv_sTAITlEZ6tG-zf7c8n0vrDmJ9oTxgmoPRod15I1AY22rYLQYmDHdk7OAi0yCO1TPAQ7mqmdh5yhP04H_35aawo7aCkIpmIu6Qie6M",
    desc: "Specializing in minimalist systems and high-end brand architecture.",
  },
  {
    name: "Elena Rossi",
    role: "Head of Engineering",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdtMUD5bkrP1OBZanALF5M86n6Xuz1Y2LAO6CO5lkcjog53bT4n7pduT5xEdJVNgKXrAibVw9kVK7DnNgzeDuMH8jBo9ejveRq5oAiSH9DFRSVRBbc_Mjs5c3B2SI_apqyh4U6mF6jLSBm_Gf-HrX6kZKQIuQgFsRiVnKbAN-E9dxm5ousVrJ_MZs8SxaPr15i8nxJcVQ7cOtZX2xyp2sAH6PdICF8vXZgTkHajS7Io-loyY4rryvKdLxsfY2Su8rReKVznJc2B0H1",
    desc: "Architecting robust, lightning-fast digital infrastructures with precision.",
  },
  {
    name: "Marcus Chen",
    role: "Strategy Director",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQ8eqhMnhw4DyO6ljz5kJ38ZdHJKGaDsxA05JpSPvdP4ZoZYQnXW76MOs1cg_kQUzQLLxA9Oqy1zhXmXNosopEajsF7Gopoga8_ii664bdhw0a3yDA_QaLrvmQwcMr4jmJktiOefDxlUOj6jN5FvslwbPHZRVG-RQG8PBSP_-YBye7O2V7qFbnNqjjpL-PrESh8IoPOFDuHbnGEG7rN6ddNRLiXPGLYRHR0uae0fjT1laZ5nriLx3geS2nPHb1VtBzCZsKh2iTP31",
    desc: "Defining market authority through strategic design and behavioral science.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex-grow w-full bg-background mt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-stack-xl pb-stack-lg">
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 md:col-span-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container mb-6 block"
            >
              Est. 2018
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface leading-none mb-12 font-bold"
            >
              Architecting <br />
              Digital Authority.
            </motion.h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-body-lg text-body-lg text-on-surface-variant"
            >
              We don't just build websites; we create digital legacies. Based in the heart of London, Scope is a boutique digital agency dedicated to the intersection of minimalist aesthetics and high-performance engineering.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="bg-surface-container-low py-stack-xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-12 gap-gutter items-end mb-stack-lg">
            <div className="col-span-12 md:col-span-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight font-semibold"
              >
                Our Philosophy is defined by <span className="italic font-light">Quiet Confidence.</span>
              </motion.h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {philosophyItems.map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-outline-variant/30 pt-8"
              >
                <span className="font-label-sm text-label-sm text-on-surface block mb-4 font-bold">
                  {item.num}
                </span>
                <p className="font-body-md text-body-md text-on-surface-variant">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Timeline */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-5 mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] bg-surface-container overflow-hidden rounded-lg relative"
            >
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwLNplxXOVl-eULTQYDuks4qslcRPWepk0ZM_2uQBTg6SIglbKMAH1pvjgZ0ezxx_1UX9OyRaN5VF74LSx2pPrsk9UITlcUquiwp8U9RSBaZTazON7zUp_8oV5w4Tela8luH1pMbUFy2E6mzkV7nLPumZbCRNfR5zZO-K1v4wOYO3nJGOvWu6n2IudJIuEnaNjLvpbPAqc1Y0e5WsFSxZNhj8aI1YcD_xDAfg8ISuLrqDqEtchHUZ0K84Tfq9bqFvCpfuHqkT6X4AS"
                alt="Scope Modern Office Building"
                fill
                className="object-cover grayscale transition-transform duration-700 hover:scale-105 hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </motion.div>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-headline-md text-3xl font-bold text-on-surface mb-8"
            >
              The Journey of Intent
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-body-lg text-body-lg text-on-surface-variant mb-12"
            >
              Founded in 2018 by three designers who believed the digital landscape had become too noisy. We set out to create a sanctuary for brands that value substance over hype. From a small studio in Shoreditch to a global remote-first powerhouse, our mission has remained unchanged: to elevate digital standards through relentless refinement.
            </motion.p>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex justify-between items-center border-b border-outline-variant/20 pb-4"
                >
                  <span className="font-label-sm text-label-sm text-on-tertiary-container font-bold">
                    {item.year}
                  </span>
                  <span className="font-body-md text-body-md text-on-surface">{item.event}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-on-surface py-stack-xl text-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-stack-lg">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-headline-lg text-4xl md:text-6xl text-white font-bold mb-4"
            >
              The Collective
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-body-md text-body-md text-surface/60 max-w-xl mx-auto"
            >
              Curating excellence through a small, multidisciplinary team of experts.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="group relative aspect-[3/4] bg-surface-container-highest overflow-hidden rounded-lg mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-white font-label-sm text-xs uppercase tracking-widest font-bold">
                      {member.role}
                    </span>
                  </div>
                </div>
                <h4 className="font-headline-md text-2xl font-bold text-white mb-2">{member.name}</h4>
                <p className="font-body-md text-body-md text-surface/50">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section className="py-stack-xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
            <div className="md:col-span-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-semibold"
              >
                The Sanctuary
              </motion.h2>
            </div>
            <div className="md:col-span-6 flex items-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-body-lg text-body-lg text-on-surface-variant"
              >
                Our studio is a physical manifestation of our digital ethos: clean lines, abundant light, and intentional spaces that foster deep creative work.
              </motion.p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-12 md:col-span-8"
            >
              <div className="aspect-video bg-surface-container overflow-hidden rounded-lg relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjxGFrddahzfFm_fX3e4p1pgsQW-JC8tCFC_hywHhqOukhGGp_3lWqJR9nl6KiTIWt3ZkkXYMUXv9MxTO_l9XgoKJemvVSKsR69jxE71SUxHcdDdm126hzx7q7sNDHFpug9mLQYP0KSSOSF4mjENV-k64xynFTMdBYDmY8j-H2_i9drSdGit1KIVtSuQTx0uBoO9GvwVmBrEotszbA2FD2VGtrq26mpjjwGVAdtUU6nDBKmWJSGHCJ6cETqvfVQ9Q5Vch8j86-PeV8"
                  alt="Scope Minimalism Sanctuary Office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
            </motion.div>
            <div className="col-span-12 md:col-span-4 space-y-gutter flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="aspect-square bg-surface-container overflow-hidden rounded-lg relative flex-1 min-h-[200px]"
              >
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSXJwfck_eABAJHmJxpia1QsSJ94MENDi5wfSzvSN7dramoDKA_YdNV_Z0-rqAGBCoRzH2c7I1qm0lGY8pQ1DR5h_UcaMr28tMfEfSIMQOanfnHl3-Amq5cR_Z7dXCei02IKjMe2sIMO0qNKx866dwpVZlDQR5JjH5fGJtt_4qshouqb4PqYCeuLsP1qmXl0SOfC3RdyB9BlZ5eqX7wfpy0YR5FOF6Tom-emUKbDE75pA8rD6gd3l3ONd7izM3RiehHbSZrrYzaOSH"
                  alt="Scope workstation details"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="aspect-square bg-surface-container overflow-hidden rounded-lg relative flex-1 min-h-[200px]"
              >
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpjfgqpnxIyb3irsPckgMB5OCngtgVZbXquKamyvPdGSOb-l0MkEPa0NzhNdIYVRMv6hiRMXKEu-o7xMx2Kkr6p0az40dH3k6qThd_bUWmDalTWbHxSoGXka8WG4DVdZmDAxX7Welk72xMSgmhYFtSCAhSwj-kL7FnQTU4wevo42uXFnSfQjm9DECAuq7NszzdAwylf1LITV6q9MKa643--tfR_gT0kgFnoUQOZHLLW4rgqmp3Kx4tcdEA_xKrayWhkS62e0ZstirC"
                  alt="Scope frosted glass collaborating shadows"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-stack-xl bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display-xl-mobile md:font-display-xl text-on-surface mb-12 font-bold leading-none"
          >
            Ready to transcend?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 bg-on-surface text-surface px-12 py-6 rounded-full hover:opacity-90 transition-all transform hover:scale-105 font-label-sm text-xs uppercase tracking-widest font-bold"
            >
              Start a Conversation
              <span className="material-symbols-outlined text-white">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
