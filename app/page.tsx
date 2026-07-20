"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ShaderCanvas from "@/components/ui/ShaderCanvas";
import Counter from "@/components/ui/Counter";

const services = [
  { icon: "business", title: "Business Websites", desc: "Professional corporate sites that build authority and trust." },
  { icon: "shopping_bag", title: "E-commerce", desc: "Scalable online stores built with Shopify and custom solutions." },
  { icon: "trending_up", title: "SEO", desc: "Strategic optimization to rank your business on top of Google." },
  { icon: "share", title: "Social Media", desc: "Visual storytelling and content strategy for digital growth." },
];

const processSteps = [
  { icon: "search", title: "Discover", desc: "Deep diving into your brand and goals." },
  { icon: "design_services", title: "Design", desc: "Crafting high-end visual solutions." },
  { icon: "code", title: "Develop", desc: "Clean, scalable and fast implementation." },
  { icon: "rocket_launch", title: "Launch", desc: "Polishing and deploying to the world." },
  { icon: "auto_graph", title: "Grow", desc: "Ongoing optimization and scaling." },
];

const testimonials = [
  {
    quote: "Scope completely transformed how we appear online. Our conversion rates have doubled since the relaunch.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn3ejXpn06-Y6Xq7J05QsIuCKKM-gGF26slX4B9cv7JsREMxaCYPiKLw4OeOfn6uhdCAI5pNwN-hVmZ96ohr3w2F34U2XDJmFI6d_y-r0ycmuqL2vDJIAETVFb3KZkYF3EYxKeu9OMkicrDp6RA5Aabq_UAKwUMLVaDBagE8dJ4frcIB1CJMW-G07A-Q3AZT1nv1nmT_9SKcWQksmqsnFv_-4H_4-nvM6xEeNNDQvMWeoMApbaQT2DIdH1DRnxHeeT7VSN6DhAD2Zt",
    name: "Sarah Jenkins",
    role: "CEO at Vora",
  },
  {
    quote: "The attention to detail is unlike any agency we've worked with. They don't just build websites; they build businesses.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAchhHrmt9OYUemk4jBdz1ThFc7Oqmm6eoziCItm9Ua-p87yPBqqL7eBd5qOU-rZEihobdPzwX57gd_4jrMifKw9fvJuYW31FbKWEvm-5CTJrzYc-ox2oSJOAf0yqB2dusKIjm3f_Ad4MhakbsiLHJvE68FbEL76MS1561JKoD3oTfejStBGonZDD7xXIB7gh5e6edXL-8hm8hIHXuY-aoxemQjzFDrCWpmgkHNBCeobxaguSWc4pUbtRXiEYM3ueW_CJTUWOoTLpK8",
    name: "Marcus Chen",
    role: "Founder of Altis",
  },
  {
    quote: "Scope understood our vision immediately. Their process is seamless, professional, and world-class.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBooT7CmLU1QApED376P8csA0mDKRDZAqaY9Eq-rzRo27X--21sD6pxSBUP8qTm-f21hP6ae1sT09YPduCVJAvgYJ9AM5EPD4qQyCWoGgYhJRBkB4AGaet_HjFr1DWGtbW3j7LRKhzxCnhqFwz3_gRrDhjit-4Zc8_QWr55v7SUMB-cvMfekfAVmh_TRO9gLVCwGzITwPDBgB-6Uir6t41OAIeHRaoZm0n44ZgnWH7dm1fbV1QSgtRg_evqAT_b_zSbHQpp4l2yoQ8u",
    name: "Elena Rodriguez",
    role: "Director at Frame Inc.",
  },
];

export default function Home() {
  return (
    <div className="flex-1 w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <ShaderCanvas />
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-center relative z-10 w-full">
          <div className="md:col-span-7 py-stack-lg">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl mb-stack-sm leading-none"
            >
              Building digital experiences that help businesses grow.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10"
            >
              We design websites, brands, and growth systems that turn visitors into customers and ideas into successful businesses.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <button className="bg-[#0B0B0B] text-white px-10 py-5 rounded-full font-body-md text-body-md flex items-center justify-center gap-2 group hover:opacity-90 transition-opacity cursor-pointer">
                  Start Your Project
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="border border-outline-variant px-10 py-5 rounded-full font-body-md text-body-md text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer">
                  View Our Work
                </button>
              </Link>
            </motion.div>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[450px]"
            >
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn2WeVa0GuR44KlE4GE3xDW7XQ4e57txm00U06zI7yoFlVr3bgQ56DaLrHf0yUqdaFSHhlWNw9AgrqZDnqdJTMe98ARO-NZ4ryrYrop1eQqcmzYGocZCxNIToaScRcaIYPVxYTxB70XwvEiRLC24TLrSu-1c9HyHbVeaTjrRI9loUdnG1TgsFoRlCJ8pNudH3lJG_eoF2R7pUnT8tWuQbsV8jtJhtQTx00FZAwR8J9-jGthZ8JQM5jZp2-ThxxWvsxnXP7ceR-2fNd"
                alt="Scope Agency Laptop Mockup"
                fill
                priority
                className="object-contain drop-shadow-2xl animate-pulse"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-stack-md bg-white border-y border-outline-variant/20 overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-stack-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container">
            Trusted by ambitious businesses
          </span>
        </div>
        <div className="relative w-full flex overflow-x-hidden">
          <div className="scrolling-logos-container">
            {/* Set 1 */}
            <div className="flex space-x-24 items-center opacity-40 grayscale flex-none py-2 pr-24">
              <span className="text-3xl font-bold tracking-tighter">GOOGLE</span>
              <span className="text-3xl font-bold tracking-tighter">STRIPE</span>
              <span className="text-3xl font-bold tracking-tighter">SHOPIFY</span>
              <span className="text-3xl font-bold tracking-tighter">SLACK</span>
              <span className="text-3xl font-bold tracking-tighter">INTERCOM</span>
              <span className="text-3xl font-bold tracking-tighter">NOTION</span>
              <span className="text-3xl font-bold tracking-tighter">FRAMER</span>
            </div>
            {/* Set 2 (for seamless loop) */}
            <div className="flex space-x-24 items-center opacity-40 grayscale flex-none py-2 pr-24">
              <span className="text-3xl font-bold tracking-tighter">GOOGLE</span>
              <span className="text-3xl font-bold tracking-tighter">STRIPE</span>
              <span className="text-3xl font-bold tracking-tighter">SHOPIFY</span>
              <span className="text-3xl font-bold tracking-tighter">SLACK</span>
              <span className="text-3xl font-bold tracking-tighter">INTERCOM</span>
              <span className="text-3xl font-bold tracking-tighter">NOTION</span>
              <span className="text-3xl font-bold tracking-tighter">FRAMER</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-stack-xl" id="services">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-stack-lg max-w-2xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-4 block">
              Our Capabilities
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg leading-tight">
              Everything your business needs online.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, borderColor: "#0B0B0B" }}
                className="p-10 bg-white border border-outline-variant/30 rounded-xl group relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="material-symbols-outlined text-4xl mb-6 block text-on-surface">
                    {service.icon}
                  </span>
                  <h3 className="font-headline-md text-xl font-bold mb-3">{service.title}</h3>
                  <p className="font-body-md text-on-surface-variant mb-6">{service.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-on-surface font-semibold group-hover:gap-4 transition-all mt-auto cursor-pointer">
                  Explore <span className="material-symbols-outlined">east</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-stack-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
          <div className="relative">
            <div className="aspect-square bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-2xl relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJAq-bXBdccMQX-pWrMuw23bWnQctvJHxz5mA2AcmiMsI0-MrrW6MIlrt95Sd_zT9ZnXK_97-Jsgo9tB-duMnVpSNs1fi0DnyJD3PeNEqp6quMkpdLHoT70oM-OpwdqF6xhl4mPHOpfDGO1DVe-OXznqLn9S0SRd5bftSH8PSJ6ECoCXgfAKItzVFSOrUhpN8cI6RTy789FpNzCugKMEK6AV3FqT4DxlNrmqciZMaJ7HkXhPPV4Mi7NH90ilAzIs53AppgZmeWuvw_"
                alt="Scope Studio Workplace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#0B0B0B] text-white p-10 rounded-2xl shadow-xl hidden lg:block">
              <p className="font-headline-lg text-4xl mb-0 font-bold">8yr+</p>
              <p className="font-label-sm text-xs text-primary-fixed uppercase tracking-widest">Experience</p>
            </div>
          </div>

          <div className="space-y-stack-md">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg leading-tight">
              We deliver results that move the needle.
            </h2>
            <div className="grid grid-cols-2 gap-gutter">
              <div className="space-y-1">
                <span className="block font-display-xl-mobile text-on-surface font-bold text-5xl">
                  <Counter value={120} suffix="+" />
                </span>
                <span className="font-body-md text-on-surface-variant uppercase tracking-wider text-sm block">
                  Projects Completed
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-display-xl-mobile text-on-surface font-bold text-5xl">
                  <Counter value={98} suffix="%" />
                </span>
                <span className="font-body-md text-on-surface-variant uppercase tracking-wider text-sm block">
                  Satisfaction
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-display-xl-mobile text-on-surface font-bold text-5xl">
                  <Counter value={3} suffix="x" />
                </span>
                <span className="font-body-md text-on-surface-variant uppercase tracking-wider text-sm block">
                  Average Growth
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-display-xl-mobile text-on-surface font-bold text-5xl">
                  24/7
                </span>
                <span className="font-body-md text-on-surface-variant uppercase tracking-wider text-sm block">
                  Dedicated Support
                </span>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/about">
                <button className="bg-[#0B0B0B] text-white px-10 py-5 rounded-full font-body-md text-body-md hover:opacity-90 transition-opacity cursor-pointer">
                  Learn About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Process Timeline */}
      <section className="py-stack-xl bg-white" id="process">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-stack-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-4 block">
              How We Work
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg">
              Our proven process.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-stack-md relative">
            {/* Line background for desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-outline-variant/30 -z-10"></div>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-4"
              >
                <div className="w-24 h-24 bg-white border border-outline-variant flex items-center justify-center rounded-full mx-auto relative z-10 hover:border-on-surface transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h4 className="font-headline-md text-lg font-bold">{step.title}</h4>
                <p className="font-body-md text-on-surface-variant px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-stack-xl bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-stack-lg">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg">
              What our clients say.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {testimonials.map((test, index) => (
              <motion.div
                key={test.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-12 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between min-h-[300px]"
              >
                <p className="font-body-lg text-on-surface-variant italic mb-8">"{test.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden relative">
                    <Image
                      src={test.image}
                      alt={test.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-headline-md text-base font-bold">{test.name}</p>
                    <p className="font-label-sm text-xs text-on-tertiary-container">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-stack-xl relative overflow-hidden bg-on-background text-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center py-stack-lg relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display-xl-mobile md:font-display-xl text-white mb-stack-sm max-w-4xl mx-auto leading-none"
          >
            Ready to grow your business online?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-body-lg text-surface-variant mb-12 max-w-2xl mx-auto"
          >
            Let's create a website and digital strategy that helps your business stand out from the noise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link href="/contact">
              <button className="bg-white text-on-surface px-12 py-6 rounded-full font-body-md text-body-md hover:bg-surface-variant transition-colors cursor-pointer">
                Book a Free Discovery Call
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white/30 text-white px-12 py-6 rounded-full font-body-md text-body-md hover:bg-white/10 transition-colors cursor-pointer">
                Get a Quote
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
