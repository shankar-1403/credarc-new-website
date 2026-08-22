import { useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Building2, Network, Share2 } from "lucide-react";
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

const ease = [0.22, 1, 0.36, 1];

const cascadeSteps = [
  { label: "Starts here", icon: Building2 },
  { label: "First ring", icon: Network },
  { label: "The long tail", icon: Share2 },
];

export default function Roadmap() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = roadmap[active];
  const meta = phaseMeta[active];

  return (
    <>
      <PageHero
        label="Roadmap"
        title="From compliance reporting today to circular materials tomorrow"
        description="Each phase reuses the client relationship and the data already captured. Nothing is rebuilt, and every phase widens the wallet."
        image="/images/renewables.jpg"
      />

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <FadeIn>
            <SectionHeading
              label="The expansion path"
              title="Six phases. One compounding data asset."
              description="Select a phase to see how the platform widens from disclosure into carbon, supply chain and circular materials."
            />
          </FadeIn>

          <FadeIn className="mt-12" delay={0.05}>
            <LayoutGroup>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {roadmap.map((phase, i) => {
                  const isActive = i === active;

                  return (
                    <button
                      key={phase.phase}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className={cn(
                        "relative shrink-0 rounded-full px-4 py-2.5 text-left transition-colors duration-200",
                        isActive
                          ? "text-white"
                          : "text-[#5A6B7D] hover:text-[#022F84]"
                      )}
                    >
                      {isActive && !reduce ? (
                        <motion.span
                          layoutId="roadmap-pill"
                          className="absolute inset-0 rounded-full bg-[#022F84]"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      ) : isActive ? (
                        <span className="absolute inset-0 rounded-full bg-[#022F84]" />
                      ) : null}

                      <span className="relative flex items-center gap-2">
                        <span className="text-[11px] font-semibold tabular-nums tracking-wide opacity-70">
                          0{phase.phase}
                        </span>
                        <span className="font-display text-sm font-bold whitespace-nowrap">
                          {phase.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </FadeIn>

          <div className="mt-8 overflow-hidden rounded-[1.75rem] bg-[#011B4D]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.phase}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease }}
                className="grid lg:grid-cols-2"
              >
                <div className="relative min-h-[240px] overflow-hidden lg:min-h-[420px]">
                  <motion.img
                    src={meta.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { scale: 1.04 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease }}
                  />
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

                  <h3 className="font-display mt-5 text-3xl font-extrabold text-white sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-lg text-white/55">{current.detail}</p>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
                    {meta.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <ButtonLink to="/contact" variant="teal">
                      Request a demo
                      <ArrowRight className="size-4" />
                    </ButtonLink>
                    <button
                      type="button"
                      onClick={() =>
                        setActive((prev) => (prev + 1) % roadmap.length)
                      }
                      className="text-sm font-semibold text-white/70 transition hover:text-white flex items-center gap-2"
                    >
                      Next phase <ArrowRight className="size-4" />
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

          <FadeIn className="mt-14">
            <div className="overflow-hidden rounded-3xl bg-white/8 ring-1 ring-white/15">
              <div className="grid lg:grid-cols-3">
                {compounding.map((item, i) => {
                  const step = cascadeSteps[i];
                  const Icon = step.icon;

                  return (
                    <div
                      key={item.title}
                      className="relative flex flex-col p-7 md:p-8"
                    >
                      {i < compounding.length - 1 ? (
                        <div className="absolute right-0 bottom-8 hidden w-px bg-white/15 lg:top-8 lg:block" />
                      ) : null}
                      {i > 0 ? (
                        <span className="absolute top-1/2 left-0 z-10 hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#011B4D] text-[#7FD4CB] ring-1 ring-white/20 lg:flex">
                          <ArrowRight className="size-4" />
                        </span>
                      ) : null}

                      <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[#7FD4CB]">
                        <Icon className="size-5" strokeWidth={2} />
                      </span>
                      <p className="mt-5 text-[11px] font-semibold tracking-[0.16em] text-[#7FD4CB] uppercase">
                        {step.label}
                      </p>
                      <h3 className="font-display mt-2 text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                        {item.body}
                      </p>
                      <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#7FD4CB]"
                          style={{
                            width: `${((i + 1) / compounding.length) * 100}%`,
                          }}
                        />
                      </div>
                      {i < compounding.length - 1 ? (
                        <p className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#7FD4CB] uppercase lg:hidden">
                          Cascades
                          <ArrowRight className="size-3" />
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

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
