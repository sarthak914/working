"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string; // Used for filter matching: Fintech, SaaS, E-commerce
  tags: string[];
  image: string;
  layout: "featured" | "half" | "full-width";
  offset?: boolean;
}

const allProjects: Project[] = [
  {
    id: "luminary",
    title: "Luminary Analytics",
    category: "SaaS",
    tags: ["SaaS", "2024"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9UDS2k5_lYkXx1LLzCdlmzKPaxGP7hGzpzHtPsz_VnY6GAOo3bAOzN20Q6YNFRawvem0iBur80kHWiGuwL4221TkzCaF14lc4Jqo6etJmyWV3jP9xZQ1VPAnUognlFvIfAmP5dcGyCmMJPFuiCIiyXEhyWu2CqULW3kDY-KD_azDn6gG0G4GgBoFsitHo1xMuPDWaH1strHC1Xu7tx3HBD2RlEBhi0MVonYVfjgQ6rfeutEQl5ViOIaPHcnO8A9-f8eeemUG7IvPi",
    layout: "featured",
  },
  {
    id: "vault",
    title: "Vault Mobile Banking",
    category: "Fintech",
    tags: ["Fintech"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAoQQ6dfDL5vXjzcSUCzWaEL589DAeORFe0m_BP4EXQ_K2G7wghlMKfN05sWuJlHucH_gsU-kIl7SZFTj7t7oPlSU8ZBRZOkiGc4eXYjrYjfxtQZWFM_FDUdwy3097DQPhqwlBCdJL81n3PgUqTeAhx8VS4D61qXggvVJuDsgse55W8OgaqhQ8SabYZda22EnCG1072cAAzCbHARTwUg5539kt6EuKm008SXdTWyTwryE7B7o57NeswIGe1h_3BFXgzOcCERIdH5Wu",
    layout: "half",
  },
  {
    id: "arc",
    title: "Arc Atelier",
    category: "E-commerce",
    tags: ["E-commerce"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHzhXy0t5qmSiOepRZNoSGv4g8jGqmtLGiUJW_RVqzVTPYvQsVyWJRoaM7jyE4B1G7LxVR_5GpC3Kq1uXpuap1-9am7IszLwHl7-3iY0hU74j28cYixn5kbpBWe8fUuybzJXFtci9Y0qFiCXZNHY2C0ZIsASSFxipYjIYbOKA2EKMvX3262zLAn50ZZGeaXNqy55lv9JVKSLWMgxBn_zLJ8UmuXr2bIXU-f61NmqviV3hd99fbXFimXxCVXWGVqhlZbl6mOnLDMAQQ",
    layout: "half",
    offset: true,
  },
  {
    id: "nebula",
    title: "Nebula Cloud Orchestrator",
    category: "SaaS", // Falls under SaaS for simple filtering matching
    tags: ["Cloud Infrastructure", "Product"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXi2fRbtnMU6J2iswGJJTcWBVwSYS_C574zm4CUe02MXZvLHHsjZ1sqPgFjimULU5UL1kwt3A6YDVeXhkDHj3ZCuXTzc-f8VG38D94JdiHsEn5h3sFy4sy_mAZmBonYJ2BUcPXlSQ4pJ7g1em9uqAonpdozQwwLlLBE9i62qfegSfrB2n30ylru3zfRIWSLQfq-cOzL_iSMMGlo04uXu6LOqkkmefe3iMT4Px7s3aT6-fL0iimeP4SrBQWcBLzOB8fvouy3cCMh1wk",
    layout: "full-width",
  },
];

const categories = ["All", "Fintech", "SaaS", "E-commerce"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = allProjects.filter((project) => {
    if (selectedCategory === "All") return true;
    return project.category === selectedCategory;
  });

  return (
    <div className="flex-1 w-full bg-background pt-32">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
          <div className="md:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8 leading-none"
            >
              Selected Works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
            >
              A curated collection of digital experiences built for industry leaders. We merge architectural precision with creative soul.
            </motion.p>
          </div>
          <div className="md:col-span-4 flex md:justify-end mt-8 md:mt-0">
            <div className="flex items-center gap-6 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-label-sm text-xs uppercase tracking-widest whitespace-nowrap pb-1 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "text-on-surface border-b border-on-surface font-semibold"
                      : "text-on-tertiary-container hover:text-on-surface"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-stack-xl pb-stack-xl mt-12">
        <motion.div layout className="space-y-stack-xl">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              if (project.layout === "featured") {
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-surface-container mb-8 rounded-xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                      <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/40 transition-colors duration-300 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-5xl opacity-0 group-hover:opacity-100 transition-opacity">
                          visibility
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                      <div className="md:col-span-6">
                        <div className="flex items-center gap-3 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="font-headline-md text-2xl md:text-3xl font-bold mb-4">
                          {project.title}
                        </h2>
                      </div>
                      <div className="md:col-span-6 flex md:items-end md:justify-end">
                        <Link
                          href="/contact"
                          className="group/link flex items-center gap-2 font-label-sm text-xs uppercase tracking-widest border-b border-transparent hover:border-on-surface transition-all"
                        >
                          View Case Study
                          <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              if (project.layout === "full-width") {
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <div className="relative aspect-[2/1] overflow-hidden bg-surface-container mb-8 rounded-xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/40 transition-colors duration-300 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-5xl opacity-0 group-hover:opacity-100 transition-opacity">
                          visibility
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                      <div className="md:col-span-7">
                        <div className="flex items-center gap-3 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="font-headline-md text-2xl md:text-3xl font-bold mb-4">
                          {project.title}
                        </h2>
                      </div>
                      <div className="md:col-span-5 flex md:items-end md:justify-end">
                        <Link
                          href="/contact"
                          className="group/link flex items-center gap-2 font-label-sm text-xs uppercase tracking-widest border-b border-transparent hover:border-on-surface transition-all"
                        >
                          View Case Study
                          <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              // Alternating half grids
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`group inline-block w-full md:w-[calc(50%-12px)] vertical-align-top ${
                    project.offset ? "md:mt-40" : "mr-[24px]"
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-container mb-8 rounded-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-5xl opacity-0 group-hover:opacity-100 transition-opacity">
                        visibility
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-headline-md text-2xl font-bold mb-4">{project.title}</h2>
                  <Link
                    href="/contact"
                    className="group/link flex items-center gap-2 font-label-sm text-xs uppercase tracking-widest border-b border-transparent hover:border-on-surface transition-all w-fit"
                  >
                    View Case Study
                    <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <div className="flex justify-center pt-stack-md">
          <button className="px-12 py-5 border border-outline rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-all duration-300 cursor-pointer">
            Load More Work
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface-container-lowest border-t border-outline/10 py-stack-xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8 leading-tight">
            Ready to start?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
            Let’s build something that matters. Reach out to our design lead today.
          </p>
          <Link href="/contact" className="inline-block">
            <button className="bg-[#0B0B0B] text-white px-10 py-4 rounded-full font-label-sm text-xs uppercase tracking-widest hover:opacity-80 transition-all cursor-pointer">
              Start a Project
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
