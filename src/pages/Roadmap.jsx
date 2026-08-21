import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import FadeIn from "../components/FadeIn";
import {
  ButtonLink,
  CTABanner,
  PageHero,
  SectionHeading,
  SectionLabel,
} from "../components/ui-kit";
import { compounding, roadmap } from "../data/content";
import { cn } from "../lib/utils";

const phaseMeta = [
  {
    image: "/images/platform-decide.jpg",
    summary:
      "Company-specific BRSR, GRI and CSRD-aligned disclosure — live in production today.",
  },
  {
    image: "/images/renewables.jpg",
    summary:
      "Scope 1, 2 and 3 inventories with product footprints built on the same captured data.",
  },
  {
    image: "/images/supply-chain.jpg",
    summary:
      "Tier-1 and tier-2 supplier onboarding so value-chain data arrives verified, not surveyed.",
  },
  {
    image: "/images/manufacturing.jpg",
    summary:
      "Plastic, battery, tyre and e-waste EPR obligations tracked against the materials already in system.",
  },
  {
    image: "/images/logistics.jpg",
    summary:
      "Take-back flows, recycler chain-of-custody and certificate ledgers for e-waste programmes.",
  },
  {
    image: "/images/export-trade.jpg",
    summary:
      "Ferrous scrap, ELV and materials recovery — monetising the same waste trail from phase one.",
  },
];

export default function Roadmap() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = roadmap[active];
  const meta = phaseMeta[active];
  const progress = ((active + 1) / roadmap.length) * 100;

  return (
    <>
      <PageHero
        label="Roadmap"
        title="From compliance reporting today to circular materials tomorrow"
        description="Each phase reuses the client relationship and the data already captured. Nothing is rebuilt, and every phase widens the wallet."
        image="/images/renewables.jpg"
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(2,47,132,0.06),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <FadeIn>
            <SectionHeading
              label="The expansion path"
              title="Six phases. One compounding data asset."
              description="Select a phase to see how the platform widens from disclosure into carbon, supply chain and circular materials."
            />
          </FadeIn>

          {/* Progress track */}
          <FadeIn className="mt-14" delay={0.05}>
            <div className="relative">
              <div className="absolute top-5 right-0 left-0 hidden h-[2px] bg-[#D5DDE8] md:block" />
              <motion.div
                className="absolute top-5 left-0 hidden h-[2px] origin-left bg-gradient-to-r from-[#1A9B8E] to-[#022F84] md:block"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:pb-0">
                {roadmap.map((phase, i) => {
                  const isActive = i === active;
                  const isPast = i < active;
                  const isLive = phase.timing === "Live now";

                  return (
                    <button
                      key={phase.phase}
                      type="button"
                      onClick={() => setActive(i)}
                      className="group relative flex min-w-[9.5rem] flex-col items-start text-left md:min-w-0"
                    >
                      <span
                        className={cn(
                          "relative z-10 flex size-10 items-center justify-center rounded-full text-sm font-bold transition duration-300",
                          isActive
                            ? "bg-[#022F84] text-white shadow-[0_10px_30px_-8px_rgba(2,47,132,0.55)] scale-110"
                            : isPast || isLive
                              ? "bg-[#1A9B8E] text-white"
                              : "bg-white text-[#5A6B7D] ring-1 ring-[#D5DDE8] group-hover:ring-[#022F84]/40"
                        )}
                      >
                        {isPast || isLive ? (
                          <CheckCircle2 className="size-5" strokeWidth={2.25} />
                        ) : (
                          phase.phase
                        )}
                      </span>
                      <span
                        className={cn(
                          "mt-4 text-[11px] font-semibold uppercase tracking-[0.14em]",
                          isActive ? "text-[#1A9B8E]" : "text-[#5A6B7D]"
                        )}
                      >
                        {phase.timing}
                      </span>
                      <span
                        className={cn(
                          "font-display mt-1 text-sm font-bold leading-snug transition",
                          isActive
                            ? "text-[#022F84]"
                            : "text-[#0A1628] group-hover:text-[#022F84]"
                        )}
                      >
                        {phase.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Active phase spotlight */}
          <div className="mt-12 overflow-hidden rounded-[2rem] bg-[#011B4D]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.phase}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="relative min-h-[280px] overflow-hidden lg:min-h-[420px]">
                  <motion.img
                    src={meta.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011B4D] via-[#011B4D]/35 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                    <p className="font-display text-4xl font-extrabold text-white/20">
                      0{current.phase}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#1A9B8E] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                      Phase {current.phase}
                    </span>
                    <span className="text-sm font-medium text-[#7FD4CB]">
                      {current.timing}
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-lg text-white/55">{current.detail}</p>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">
                    {meta.summary}
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <ButtonLink to="/contact" variant="teal">
                      Request a demo
                      <ArrowRight className="size-4" />
                    </ButtonLink>
                    <button
                      type="button"
                      onClick={() =>
                        setActive((prev) => (prev + 1) % roadmap.length)
                      }
                      className="text-sm font-semibold text-white/70 transition hover:text-white"
                    >
                      Next phase →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <FadeIn className="mt-16 max-w-3xl">
            <SectionLabel>The compounding logic</SectionLabel>
            <p className="font-display text-2xl font-bold text-[#0A1628] text-balance sm:text-3xl md:text-4xl">
              Phase 1 captures the client&apos;s waste and materials data. That
              same data is what phases 4, 5 and 6 monetise — so the hardest work
              is already done by the time the highest-value phases arrive.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Compounding cascade */}
      <section className="relative overflow-hidden border-y border-[#D5DDE8]">
        <img
          src="/images/supply-chain.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#011B4D]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(26,155,142,0.28),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <FadeIn>
            <SectionHeading
              light
              label="The compounding effect"
              title="Every client won is a door into the supply chain behind them"
              description="This is the structural reason an ESG data platform grows differently from ordinary enterprise software."
            />
          </FadeIn>

          <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {compounding.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="relative border-t border-white/20 pt-6">
                  <p className="font-display text-5xl font-extrabold text-[#7FD4CB] sm:text-6xl">
                    {item.value}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {item.body}
                  </p>
                  {i < compounding.length - 1 ? (
                    <p className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/35 lg:mt-8">
                      Cascades down
                      <ArrowRight className="size-3.5" />
                    </p>
                  ) : null}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 max-w-2xl">
            <p className="text-base text-white/75">
              <span className="font-semibold text-white">Net effect:</span> the
              sales motion is inherited rather than bought, and revenue per
              relationship compounds year on year.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
