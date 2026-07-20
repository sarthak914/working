"use client";

import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* LEFT SIDE */}
      <section className="relative w-full md:w-1/2 min-h-[42vh] md:min-h-screen px-8 md:px-[5.4vw] border-r border-[#eeeeee] overflow-hidden">
        {/* Logo */}
        <Link
          href="/"
          className="absolute top-[55px] md:top-[72px] left-8 md:left-[5.4vw] z-10 flex items-center w-[130px] h-[70px] overflow-hidden"
          aria-label="Scope Home"
        >
          <Image
            src="/scope-logo.png"
            alt="Scope"
            width={400}
            height={200}
            className="absolute left-1/2 top-1/2 w-[160px] max-w-none h-auto -translate-x-1/2 -translate-y-1/2 object-contain"
            priority
          />
        </Link>

        {/* Welcome Content */}
        <div className="relative z-10 min-h-[42vh] md:min-h-screen flex flex-col justify-center">
          <div className="max-w-[540px] md:-translate-y-[5px]">
            <h1 className="text-[60px] sm:text-[72px] md:text-[88px] lg:text-[96px] font-bold leading-[1.02] tracking-[-0.055em] text-[#0b0b0b]">
              Welcome
              <br />
              Back
            </h1>

            <p className="mt-8 max-w-[500px] text-[16px] md:text-[18px] leading-[1.65] text-[#444748]">
              Continue your journey in crafting world-class digital
              experiences. We are building the future of precision
              design, together.
            </p>
          </div>
        </div>

        {/* Subtle Background Glow */}
        <div
          aria-hidden="true"
          className="absolute left-[15%] top-[30%] w-[420px] h-[420px] rounded-full bg-black/[0.025] blur-[140px] pointer-events-none"
        />
      </section>

      {/* RIGHT SIDE */}
      <section className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-8 py-10 md:px-16 lg:px-20 bg-white">
        <div className="w-full max-w-[415px]">
          {/* Heading */}
          <header className="mb-12">
            <h2 className="text-[32px] font-medium leading-tight tracking-[-0.02em] text-[#0b0b0b]">
              Login to your account
            </h2>

            <p className="mt-3 text-[16px] leading-relaxed text-[#444748]">
              Enter your credentials to access the studio.
            </p>
          </header>

          {/* Form */}
          <form
            className="space-y-9"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#444748]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@agency.com"
                required
                className="w-full bg-transparent border-0 border-b border-[#e2e2e2] px-0 pb-4 text-[18px] text-[#1a1c1c] outline-none focus:border-[#0b0b0b] transition-colors placeholder:text-[#747878]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="password"
                  className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#444748]"
                >
                  Password
                </label>

                <Link
                  href="#"
                  className="text-[12px] font-semibold text-[#0b0b0b] hover:opacity-60 transition-opacity"
                >
                  Forgot Password?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-transparent border-0 border-b border-[#e2e2e2] px-0 pb-4 text-[18px] text-[#1a1c1c] outline-none focus:border-[#0b0b0b] transition-colors placeholder:text-[#0b0b0b]"
              />
            </div>

            {/* Sign In */}
            <div className="pt-5">
              <button
                type="submit"
                className="w-full rounded-full bg-[#0b0b0b] py-[19px] text-[16px] font-semibold text-white cursor-pointer transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99]"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Create Account */}
          <div className="mt-12 text-center">
            <p className="text-[16px] text-[#444748]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#0b0b0b] hover:underline underline-offset-4"
              >
                Create an Account
              </Link>
            </p>
          </div>

          {/* Divider + SSO */}
          <div className="mt-10 pt-10 border-t border-[#eeeeee]">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-full border border-[#e2e2e2] py-[17px] text-[16px] text-[#1a1c1c] hover:bg-[#f9f9f9] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                database
              </span>

              <span>Continue with SSO</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}