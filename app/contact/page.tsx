"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex-1 w-full bg-background pt-32 pb-stack-xl">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter min-h-[716px]">
          {/* Left Side: Identity & Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 flex flex-col justify-between"
          >
            <div className="space-y-stack-md">
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg max-w-md font-bold leading-none">
                Let's build something great
              </h1>
              <div className="space-y-12 pt-12">
                <div className="space-y-4">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container font-bold">
                    Inquiries
                  </span>
                  <p className="font-headline-md text-2xl font-semibold underline underline-offset-8 decoration-1 decoration-outline-variant hover:decoration-on-surface transition-all cursor-pointer">
                    hello@scope.agency
                  </p>
                </div>
                <div className="space-y-4">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container font-bold">
                    Studio
                  </span>
                  <address className="not-italic font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    422 Creative Lane, Suite 100
                    <br />
                    San Francisco, CA 94103
                  </address>
                </div>
                <div className="space-y-4">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container font-bold">
                    Connect
                  </span>
                  <div className="flex gap-8">
                    <a
                      className="text-on-surface hover:translate-x-1 transition-transform duration-300 font-semibold"
                      href="#"
                    >
                      LinkedIn
                    </a>
                    <a
                      className="text-on-surface hover:translate-x-1 transition-transform duration-300 font-semibold"
                      href="#"
                    >
                      Behance
                    </a>
                    <a
                      className="text-on-surface hover:translate-x-1 transition-transform duration-300 font-semibold"
                      href="#"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Subtle Location Graphic */}
            <div className="mt-stack-lg rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-outline-variant/30 aspect-video md:aspect-auto md:h-64 relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWgfCpRbj6HBkCNG2LJNizFqPcaq0wzFKtWWgsYw01cH_Y9ARvLoBK-LL6n8AuDxBmnEjAr0poUV5sUe_Q6KOCeWqfEQks_0PQbHJrP1E5GxYj10vCIo0qEX4wLTG938yXkRew92Ih_tNJ1diIwM-OHnOk5Z6BjA-C8LtYq7wz_N73iW0wA4sD3p6_F3WGqHs00cllb-4AyHY0Vs-z9yvRFrRedJmu-UDRSsUs9geIZkq-yXzJ7Tx0LHUJzRygHNjUzFOXawGxivz0"
                alt="Scope San Francisco Studio Building"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </motion.div>

          {/* Right Side: Sophisticated Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-6 md:col-start-7 mt-stack-lg md:mt-0"
          >
            {formSubmitted ? (
              <div className="bg-white border border-outline-variant/30 p-12 rounded-xl h-full flex flex-col justify-center items-center text-center space-y-6">
                <span className="material-symbols-outlined text-6xl text-on-surface">check_circle</span>
                <h3 className="font-headline-md text-3xl font-bold">Thank you!</h3>
                <p className="font-body-lg text-on-surface-variant max-w-sm">
                  Your inquiry has been received. Our team will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="relative group border-b border-outline-variant focus-within:border-on-surface transition-colors py-2">
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      placeholder=" "
                      className="block w-full py-2 bg-transparent border-0 focus:ring-0 text-on-surface peer font-body-md focus:outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-4 text-on-surface-variant origin-[0] -translate-y-6 scale-75 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative group border-b border-outline-variant focus-within:border-on-surface transition-colors py-2">
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      placeholder=" "
                      className="block w-full py-2 bg-transparent border-0 focus:ring-0 text-on-surface peer font-body-md focus:outline-none"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-4 text-on-surface-variant origin-[0] -translate-y-6 scale-75 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="space-y-6">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container font-bold">
                    What services are you looking for?
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {["Branding", "Product Design", "Web Development", "Digital Marketing"].map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <label key={service} className="cursor-pointer">
                          <input
                            type="checkbox"
                            name="service"
                            value={service.toLowerCase()}
                            className="hidden"
                            checked={isSelected}
                            onChange={() => handleServiceChange(service)}
                          />
                          <span
                            className={`px-6 py-2 rounded-full border transition-all duration-300 font-label-sm text-xs inline-block ${
                              isSelected
                                ? "bg-on-surface text-white border-on-surface"
                                : "border-outline-variant text-on-surface-variant hover:border-on-surface"
                            }`}
                          >
                            {service}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="space-y-4">
                    <label className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container font-bold">
                      Budget Range
                    </label>
                    <select className="block w-full py-4 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-on-surface focus:outline-none transition-all font-body-md appearance-none cursor-pointer">
                      <option>$10k - $25k</option>
                      <option>$25k - $50k</option>
                      <option>$50k - $100k</option>
                      <option>$100k+</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container font-bold">
                      Timeline
                    </label>
                    <select className="block w-full py-4 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-on-surface focus:outline-none transition-all font-body-md appearance-none cursor-pointer">
                      <option>1 - 3 Months</option>
                      <option>3 - 6 Months</option>
                      <option>Ongoing Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="relative group border-b border-outline-variant focus-within:border-on-surface transition-colors py-2">
                  <textarea
                    required
                    id="message"
                    name="message"
                    placeholder=" "
                    rows={4}
                    className="block w-full py-2 bg-transparent border-0 focus:ring-0 text-on-surface peer font-body-md resize-none focus:outline-none"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-4 text-on-surface-variant origin-[0] -translate-y-6 scale-75 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none"
                  >
                    Tell us about your project
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-on-surface text-white py-6 rounded-full font-label-sm text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all transform active:scale-[0.98] mt-8 flex items-center justify-center gap-3 cursor-pointer"
                >
                  Submit Inquiry
                  <span className="material-symbols-outlined text-white">arrow_forward</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      {/* World Map Section */}
      <section className="border-t border-outline-variant/30 pt-stack-xl pb-stack-xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop overflow-hidden mt-20">
        <div className="space-y-stack-sm mb-12">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-container font-bold">
            Global Presence
          </span>
          <h2 className="font-headline-md text-3xl font-bold">Working with partners worldwide</h2>
        </div>
        <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden group border border-outline-variant/20">
          <div className="w-full h-full bg-surface-container grayscale transition-all duration-1000 group-hover:grayscale-0 relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfoLyQhjvnbzOinbWWIVKWojIkh24doZbGEyVkiWz4CiK17cHQaJnI1ecBbjepXyA-t11Qnr3548jYEeTK5N9cemTmZ1OiIDR6jVDa98azm9HwGtcxzDqpFGJpsYrnLnJyIr1kW-CkNWNSG2t38eRNhZkraaIR0TTuXCiW9eOTs3Yn0tjiOrQLeXwu-WXoR1lhHtLNUjKBPmZnUS_jFQA3qv0a7S60jRkrL45GQ1Z3JWTZoOuG56RbZ5gPUPrze6j2kO5TJoAhId-c"
              alt="Scope Global Presence Nodal Map"
              fill
              className="object-cover opacity-60"
              sizes="100vw"
            />
          </div>
          {/* Interactive Map Pins */}
          <div className="absolute top-1/3 left-1/4 group/pin cursor-pointer">
            <div className="w-3 h-3 bg-on-surface rounded-full animate-ping absolute"></div>
            <div className="w-3 h-3 bg-on-surface rounded-full relative"></div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-on-surface px-3 py-1 rounded shadow-sm opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-label-sm text-[10px] font-bold border border-outline-variant/30">
              San Francisco Hub
            </div>
          </div>
          <div className="absolute top-[45%] left-[48%] group/pin cursor-pointer">
            <div className="w-3 h-3 bg-on-surface rounded-full animate-ping absolute"></div>
            <div className="w-3 h-3 bg-on-surface rounded-full relative"></div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-on-surface px-3 py-1 rounded shadow-sm opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-label-sm text-[10px] font-bold border border-outline-variant/30">
              London Studio
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
