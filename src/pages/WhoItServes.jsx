import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/FadeIn";
import { CTABanner, PageHero, SectionHeading } from "../components/ui-kit";
import { segments } from "../data/content";
import { cn } from "../lib/utils";

export default function WhoItServes() {
  const [active, setActive] = useState(segments[0].id);
  const current = segments.find((s) => s.id === active) || segments[0];

  return (
    <>
      <PageHero
        label="Who it serves"
        title="Five segments, one data engine"
        description="Each segment has a different trigger — mandate, capital, buyer pressure or public accountability. The underlying engine does not change."
        image="/images/listed-companies.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <FadeIn>
          <div className="flex flex-wrap gap-2 border-b border-[#D5DDE8] pb-4">
            {segments.map((segment) => (
              <button
                key={segment.id}
                type="button"
                onClick={() => setActive(segment.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active === segment.id
                    ? "bg-[#022F84] text-white"
                    : "bg-white/80 text-[#5A6B7D] ring-1 ring-[#D5DDE8] hover:text-[#022F84]"
                )}
              >
                {segment.tab}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1A9B8E]">
                {current.badge}
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold text-[#0A1628] text-balance sm:text-4xl">
                {current.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5A6B7D] sm:text-lg">
                {current.intro}
              </p>

              <div className="mt-10 space-y-8">
                {current.points.map((point) => (
                  <div key={point.title} className="border-l-2 border-[#022F84] pl-5">
                    <h3 className="font-display text-xl font-bold text-[#0A1628]">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5A6B7D]">
                      {point.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <img
              src={current.image}
              alt=""
              className="aspect-[4/5] w-full rounded-3xl object-cover lg:sticky lg:top-28"
            />
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="border-t border-[#D5DDE8] bg-white/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
          <FadeIn>
            <SectionHeading
              label="One engine"
              title="Different triggers. Same assurance trail."
              description="Whether the pressure is SEBI, a lender, an EU buyer or a municipal funding gate — CredArc turns scattered evidence into investor-grade output."
            />
          </FadeIn>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
