import { useState } from "react";
import FadeIn from "../components/FadeIn";
import { PageHero, SectionLabel } from "../components/ui-kit";
import { company } from "../data/content";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        compact
        label="Get in touch"
        title="We would welcome the opportunity to walk you through a live demonstration."
        description="The platform is in production today. A working demonstration, client references and the detailed product roadmap are available on request."
        image="/images/supply-chain.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <SectionLabel>Contact details</SectionLabel>
            <h2 className="font-display text-3xl font-bold text-[#0A1628]">
              Start a conversation
            </h2>
            <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#5A6B7D]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1A9B8E]">
                  Email
                </p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 block text-lg font-semibold text-[#022F84] hover:underline"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1A9B8E]">
                  Entity
                </p>
                <p className="mt-1 text-[#0A1628]">{company.legal}</p>
                <p className="mt-1">CIN {company.cin}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1A9B8E]">
                  Registered office
                </p>
                <p className="mt-1 max-w-sm">{company.office}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl bg-white/90 p-6 ring-1 ring-[#D5DDE8] sm:p-8">
              {submitted ? (
                <div className="flex min-h-80 flex-col justify-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1A9B8E]">
                    Request received
                  </p>
                  <h3 className="font-display mt-3 text-3xl font-bold text-[#0A1628]">
                    Thank you — we&apos;ll be in touch shortly.
                  </h3>
                  <p className="mt-4 text-[#5A6B7D]">
                    Prefer email? Reach us directly at{" "}
                    <a
                      href={`mailto:${company.email}`}
                      className="font-semibold text-[#022F84] hover:underline"
                    >
                      {company.email}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5A6B7D]"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="mt-2 w-full rounded-xl border border-[#D5DDE8] bg-[#F7F9FC] px-4 py-3 text-sm outline-none ring-[#022F84] transition focus:ring-2"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5A6B7D]"
                      >
                        Work email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-2 w-full rounded-xl border border-[#D5DDE8] bg-[#F7F9FC] px-4 py-3 text-sm outline-none ring-[#022F84] transition focus:ring-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5A6B7D]"
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        required
                        className="mt-2 w-full rounded-xl border border-[#D5DDE8] bg-[#F7F9FC] px-4 py-3 text-sm outline-none ring-[#022F84] transition focus:ring-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="segment"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5A6B7D]"
                    >
                      You are
                    </label>
                    <select
                      id="segment"
                      name="segment"
                      className="mt-2 w-full rounded-xl border border-[#D5DDE8] bg-[#F7F9FC] px-4 py-3 text-sm outline-none ring-[#022F84] transition focus:ring-2"
                      defaultValue="Listed company"
                    >
                      <option>Listed company</option>
                      <option>MSME</option>
                      <option>Government / PSU</option>
                      <option>Bank / insurer</option>
                      <option>Exporter</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5A6B7D]"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-2 w-full resize-y rounded-xl border border-[#D5DDE8] bg-[#F7F9FC] px-4 py-3 text-sm outline-none ring-[#022F84] transition focus:ring-2"
                      placeholder="Tell us about your reporting timeline, sector or demo preferences."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#022F84] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#011B4D] sm:w-auto"
                  >
                    Request a demo
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
