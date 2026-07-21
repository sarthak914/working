"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
      const { refreshUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create account.");
        return;
      }

      await refreshUser();

      router.push("/");
      router.refresh();
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }
  
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

        {/* Join Content */}
        <div className="relative z-10 min-h-[42vh] md:min-h-screen flex flex-col justify-center">
          <div className="max-w-[620px] md:-translate-y-[5px]">
            <h1 className="text-[60px] sm:text-[72px] md:text-[88px] lg:text-[96px] font-bold leading-[1.02] tracking-[-0.055em] text-[#0b0b0b]">
              Join the
              <br />
              Collective
            </h1>

            <p className="mt-8 max-w-[500px] text-[16px] md:text-[18px] leading-[1.65] text-[#444748]">
              Become part of a collective shaping thoughtful digital
              experiences. Build, create, and grow with Scope.
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
          <header className="mb-10">
            <h2 className="text-[32px] font-medium leading-tight tracking-[-0.02em] text-[#0b0b0b]">
              Create your account
            </h2>

            <p className="mt-3 text-[16px] leading-relaxed text-[#444748]">
              Elevate your digital presence with Scope.
            </p>
          </header>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-full border border-[#e2e2e2] py-[17px] text-[15px] font-semibold text-[#1a1c1c] hover:bg-[#f9f9f9] transition-colors cursor-pointer"
          >
            <span className="text-[20px] font-bold text-[#4285F4]">
              G
            </span>

            <span>Continue with Google</span>
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-5 my-8">
            <div className="h-px flex-1 bg-[#e2e2e2]" />

            <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#444748]">
              OR
            </span>

            <div className="h-px flex-1 bg-[#e2e2e2]" />
          </div>

          {/* Form */}
          <form
            className="space-y-7"
            onSubmit={handleSignup}
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#444748]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                autoComplete="name"
                placeholder="John Doe"
                required
                className="w-full bg-transparent border-0 border-b border-[#e2e2e2] px-0 pb-4 text-[18px] text-[#1a1c1c] outline-none focus:border-[#0b0b0b] transition-colors placeholder:text-[#747878]"
              />
            </div>

            {/* Work Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#444748]"
              >
                Work Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                placeholder="name@agency.com"
                required
                className="w-full bg-transparent border-0 border-b border-[#e2e2e2] px-0 pb-4 text-[18px] text-[#1a1c1c] outline-none focus:border-[#0b0b0b] transition-colors placeholder:text-[#747878]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#444748]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="new-password"
                placeholder="••••••••"    
                required
                className="w-full bg-transparent border-0 border-b border-[#e2e2e2] px-0 pb-4 text-[18px] text-[#1a1c1c] outline-none focus:border-[#0b0b0b] transition-colors placeholder:text-[#747878]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#444748]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-transparent border-0 border-b border-[#e2e2e2] px-0 pb-4 text-[18px] text-[#1a1c1c] outline-none focus:border-[#0b0b0b] transition-colors placeholder:text-[#0b0b0b]"
              />
            </div>

            {/* Terms */}
            <p className="pt-1 text-[12px] leading-relaxed text-[#444748]">
              By signing up, you agree to our{" "}
              <Link
                href="#"
                className="font-semibold text-[#0b0b0b] underline underline-offset-2"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="font-semibold text-[#0b0b0b] underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
            
            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="text-[13px] text-red-600"
              >
                {error}
              </p>
            )}

            {/* Create Account */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-full bg-[#0b0b0b] py-[19px] text-[14px] uppercase tracking-[0.08em] font-semibold text-white cursor-pointer transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99]"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Login */}
          <div className="mt-10 text-center">
            <p className="text-[16px] text-[#444748]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#0b0b0b] hover:underline underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}