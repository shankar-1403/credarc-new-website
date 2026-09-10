import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Scale,
  Landmark,
  Globe2,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import FadeIn from "../components/FadeIn";
import {
  ButtonLink,
  CTABanner,
  PageHero,
  SectionLabel,
} from "../components/ui-kit";
import { forces } from "../data/content";
import { cn } from "../lib/utils";

const forceIcons = {
  regulation: Scale,
  capital: Landmark,
  trade: Globe2,
  procurement: ClipboardList,
};

const forceTags = {
  regulation: ["SEBI BRSR", "EPR", "DPDP Act"],
  capital: ["Green finance", "SLL", "Assurance-grade"],
  trade: ["EU CBAM", "CSDDD", "Buyer diligence"],
  procurement: ["Vendor screening", "Tenders", "Scope-3"],
};

export default function WhyNow() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = forces[active];

  return (
    <>
      <PageHero
        label="Why now"
        title="Four forces have turned ESG into a condition of doing business"
        description="None of these are voluntary, and none of them reverse. Each one converts a disclosure into a commercial gate."
        image="/images/why-now.jpg"
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(26,155,142,0.07),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-28">
          <FadeIn>
            <SectionLabel>The shift</SectionLabel>
            <h2 className="font-display max-w-3xl text-2xl font-bold text-[#0A1628] text-balance sm:text-4xl md:text-5xl">
              Four commercial gates. Zero opt-outs.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5A6B7D] sm:text-lg">
              Select a force to see how disclosure became a condition of capital,
              trade and market access.
            </p>
          </FadeIn>

          <FadeIn className="mt-8 sm:mt-12" delay={0.05}>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
              {forces.map((force, i) => {
                const ForceIcon = forceIcons[force.id] || Scale;
                const isActive = i === active;

                return (
                  <button
                    key={force.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative min-w-0 overflow-hidden rounded-xl px-3 py-3.5 text-left transition duration-300 sm:rounded-2xl sm:px-4 sm:py-5",
                      isActive
                        ? "bg-[#022F84] text-white shadow-[0_16px_40px_-16px_rgba(2,47,132,0.65)]"
                        : "bg-white/80 text-[#0A1628] ring-1 ring-[#D5DDE8] hover:ring-[#022F84]/35"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "font-nav text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px]",
                          isActive ? "text-[#07A1EB]" : "text-[#022B99]"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <ForceIcon
                        className={cn(
                          "size-4 transition sm:size-5",
                          isActive
                            ? "text-[#07A1EB]"
                            : "text-[#5A6B7D] group-hover:text-[#022F84]"
                        )}
                        strokeWidth={1.75}
                      />
                    </div>
                    <p
                      className={cn(
                        "font-display mt-3 text-[15px] font-bold sm:mt-4 sm:text-xl",
                        isActive ? "text-white" : "text-[#0A1628]"
                      )}
                    >
                      {force.title}
                    </p>
                    <p
                      className={cn(
                        "mt-1 line-clamp-2 text-[11px] leading-relaxed sm:text-sm",
                        isActive ? "text-white/70" : "text-[#5A6B7D]"
                      )}
                    >
                      {force.headline}
                    </p>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] bg-[#011B4D] sm:mt-8 sm:rounded-[2rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative h-40 w-full sm:h-52 lg:absolute lg:inset-0 lg:h-full">
                  <motion.img
                    src={current.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.65 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011B4D] via-[#011B4D]/40 to-transparent lg:bg-gradient-to-r lg:from-[#011B4D] lg:via-[#011B4D]/80 lg:to-[#011B4D]/15" />
                </div>

                <div className="relative z-10 px-4 py-5 sm:px-8 sm:py-8 lg:grid lg:min-h-[28rem] lg:grid-cols-[6.5rem_minmax(0,32rem)] lg:items-center lg:gap-10 lg:px-12 lg:py-14">
                  <div className="mb-4 flex items-center gap-3 lg:mb-0 lg:flex-col lg:items-start lg:gap-2">
                    <span className="font-display text-3xl font-extrabold leading-none text-white/30 sm:text-4xl lg:text-5xl">
                      0{active + 1}
                    </span>
                    <span className="font-nav text-[10px] font-semibold uppercase tracking-[0.18em] text-[#07A1EB] sm:text-xs">
                      {current.title}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-display text-[1.35rem] font-extrabold leading-snug break-words text-white sm:text-3xl md:text-4xl lg:text-5xl">
                      {current.headline}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed break-words text-white/80 sm:mt-4 sm:text-base lg:text-lg">
                      {current.body}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
                      {(forceTags[current.id] || []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/85 ring-1 ring-white/15 sm:px-3 sm:py-1.5 sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                      <ButtonLink
                        to="/platform"
                        variant="teal"
                        className="w-full justify-center sm:w-auto"
                      >
                        See how CredArc responds
                        <ArrowRight className="size-4" />
                      </ButtonLink>
                      <button
                        type="button"
                        onClick={() =>
                          setActive((prev) => (prev + 1) % forces.length)
                        }
                        className="text-sm font-semibold text-white/65 transition hover:text-white"
                      >
                        Next force →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Consequence band */}
      <section className="relative overflow-hidden">
        <img
          src="/images/finance-capital.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#011B4D]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(26,155,142,0.3),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-28">
          <FadeIn>
            <SectionLabel>The consequence</SectionLabel>
            <h2 className="font-display max-w-4xl text-2xl font-extrabold text-white text-balance sm:text-4xl md:text-5xl">
              ESG spend is no longer discretionary CSR budget — it sits with the
              CFO.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-lg">
              It is defended as risk, capital cost and market access. The
              question is no longer whether to report — it is whether the report
              will survive assurance, diligence and buyer scrutiny.
            </p>
          </FadeIn>

          <FadeIn className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6" delay={0.1}>
            {[
              { label: "Risk", detail: "Penalties, notices, litigation exposure" },
              { label: "Capital cost", detail: "Green and SLL pricing gated on data" },
              { label: "Market access", detail: "CBAM, tenders, vendor lists" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-t border-white/25 pt-5"
              >
                <p className="font-display text-xl font-bold text-[#07A1EB]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-white/65">{item.detail}</p>
              </div>
            ))}
          </FadeIn>

          <FadeIn className="mt-14">
            <p className="max-w-3xl text-xs leading-relaxed text-white/45">
              Sources: SEBI BRSR framework; CPCB / MoEFCC E-Waste (Management)
              Rules 2022; EU CBAM; EU CSDDD.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
