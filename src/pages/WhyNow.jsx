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
  const Icon = forceIcons[current.id] || Scale;

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

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <FadeIn>
            <SectionLabel>The shift</SectionLabel>
            <h2 className="font-display max-w-3xl text-3xl font-bold text-[#0A1628] text-balance sm:text-4xl md:text-5xl">
              Four commercial gates. Zero opt-outs.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5A6B7D] sm:text-lg">
              Select a force to see how disclosure became a condition of capital,
              trade and market access.
            </p>
          </FadeIn>

          {/* Force selector */}
          <FadeIn className="mt-12" delay={0.05}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {forces.map((force, i) => {
                const ForceIcon = forceIcons[force.id] || Scale;
                const isActive = i === active;

                return (
                  <button
                    key={force.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl px-4 py-5 text-left transition duration-300",
                      isActive
                        ? "bg-[#022F84] text-white shadow-[0_16px_40px_-16px_rgba(2,47,132,0.65)]"
                        : "bg-white/80 text-[#0A1628] ring-1 ring-[#D5DDE8] hover:ring-[#022F84]/35"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "font-nav text-[11px] font-semibold uppercase tracking-[0.16em]",
                          isActive ? "text-[#7FD4CB]" : "text-[#1A9B8E]"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <ForceIcon
                        className={cn(
                          "size-5 transition",
                          isActive
                            ? "text-[#7FD4CB]"
                            : "text-[#5A6B7D] group-hover:text-[#022F84]"
                        )}
                        strokeWidth={1.75}
                      />
                    </div>
                    <p
                      className={cn(
                        "font-display mt-4 text-lg font-bold sm:text-xl",
                        isActive ? "text-white" : "text-[#0A1628]"
                      )}
                    >
                      {force.title}
                    </p>
                    <p
                      className={cn(
                        "mt-1 line-clamp-2 text-xs leading-relaxed sm:text-sm",
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

          {/* Active force spotlight */}
          <div className="mt-8 overflow-hidden rounded-[2rem] bg-[#011B4D]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-[1fr_1.05fr]"
              >
                <div className="relative min-h-[260px] overflow-hidden lg:min-h-[480px]">
                  <motion.img
                    src={current.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011B4D] via-[#011B4D]/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#011B4D]/40 lg:to-[#011B4D]" />

                  <div className="absolute top-6 left-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                    <Icon className="size-7 text-[#7FD4CB]" strokeWidth={1.75} />
                  </div>

                  <div className="absolute right-6 bottom-6 left-6 lg:hidden">
                    <p className="font-nav text-xs font-semibold uppercase tracking-[0.18em] text-[#7FD4CB]">
                      Force 0{active + 1} · {current.title}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14">
                  <p className="font-nav text-xs font-semibold uppercase tracking-[0.18em] text-[#7FD4CB]">
                    Force 0{active + 1} · {current.title}
                  </p>
                  <h3 className="font-display mt-4 text-3xl font-extrabold text-white text-balance sm:text-4xl md:text-5xl">
                    {current.headline}
                  </h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                    {current.body}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {(forceTags[current.id] || []).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <ButtonLink to="/platform" variant="teal">
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

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <FadeIn>
            <SectionLabel>The consequence</SectionLabel>
            <h2 className="font-display max-w-4xl text-3xl font-extrabold text-white text-balance sm:text-4xl md:text-5xl">
              ESG spend is no longer discretionary CSR budget — it sits with the
              CFO.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              It is defended as risk, capital cost and market access. The
              question is no longer whether to report — it is whether the report
              will survive assurance, diligence and buyer scrutiny.
            </p>
          </FadeIn>

          <FadeIn className="mt-12 grid gap-6 sm:grid-cols-3" delay={0.1}>
            {[
              { label: "Risk", detail: "Penalties, notices, litigation exposure" },
              { label: "Capital cost", detail: "Green and SLL pricing gated on data" },
              { label: "Market access", detail: "CBAM, tenders, vendor lists" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-t border-white/25 pt-5"
              >
                <p className="font-display text-xl font-bold text-[#7FD4CB]">
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
