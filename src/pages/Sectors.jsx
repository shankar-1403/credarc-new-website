import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { CTABanner, PageHero, SectionHeading } from "../components/ui-kit";
import { sectors } from "../data/content";
import { cn } from "../lib/utils";

const sectorImages = {
  "Manufacturing & engineering": "/images/manufacturing.jpg",
  "Automotive & components": "/images/manufacturing.jpg",
  "Textiles & apparel": "/images/msme.jpg",
  "Chemicals & fertilisers": "/images/platform-capture.jpg",
  "Pharma & life sciences": "/images/platform-decide.jpg",
  "Metals, mining & cement": "/images/manufacturing.jpg",
  "IT / ITeS & GCCs": "/images/listed-companies.jpg",
  "Logistics & transport": "/images/logistics.jpg",
  "Real estate & infrastructure": "/images/listed-companies.jpg",
  "FMCG, retail & e-commerce": "/images/supply-chain.jpg",
  "Power, renewables & utilities": "/images/renewables.jpg",
  "Healthcare, hospitality & agri": "/images/export-trade.jpg",
};

export default function Sectors() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = sectors[active];
  const image =
    sectorImages[current.sector] || "/images/manufacturing.jpg";

  return (
    <>
      <PageHero
        label="Industry impact"
        title="Where the pressure lands, sector by sector"
        description="The pressure point differs by industry. The data engine does not."
        image="/images/manufacturing.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <FadeIn>
          <SectionHeading
            label="Sector map"
            title="Twelve industries. Four shared problems."
            description="Scattered sources, unstructured evidence, no audit trail, no comparability — solved by one capture-to-assurance engine."
          />
        </FadeIn>

        {/* Desktop: interactive sector browser */}
        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="flex flex-col">
              {sectors.map((row, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={row.sector}
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "group flex items-baseline gap-4 border-b border-[#D5DDE8]/80 py-4 text-left transition",
                      isActive ? "border-[#022F84]" : "hover:border-[#022F84]/40"
                    )}
                  >
                    <span
                      className={cn(
                        "font-nav w-8 shrink-0 text-xs font-semibold tabular-nums transition",
                        isActive ? "text-[#1A9B8E]" : "text-[#5A6B7D]"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display flex-1 text-lg font-bold transition sm:text-xl",
                        isActive
                          ? "text-[#022F84]"
                          : "text-[#0A1628]/70 group-hover:text-[#022F84]"
                      )}
                    >
                      {row.sector}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "size-4 shrink-0 transition",
                        isActive
                          ? "translate-x-0 text-[#1A9B8E] opacity-100"
                          : "-translate-x-1 text-[#5A6B7D] opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.sector}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[2rem] bg-[#011B4D]"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <motion.img
                    src={image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.65 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011B4D] via-[#011B4D]/40 to-transparent" />
                  <div className="absolute right-5 bottom-5 left-5">
                    <p className="font-nav text-xs font-semibold uppercase tracking-[0.18em] text-[#7FD4CB]">
                      Sector {String(active + 1).padStart(2, "0")} / 12
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">
                      {current.sector}
                    </h3>
                  </div>
                </div>

                <div className="grid gap-0 sm:grid-cols-2">
                  <div className="border-t border-white/10 p-6 sm:border-r sm:p-8">
                    <p className="font-nav text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F0A58A]">
                      What bites
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      {current.bites}
                    </p>
                  </div>
                  <div className="border-t border-white/10 p-6 sm:p-8">
                    <p className="font-nav text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FD4CB]">
                      What CredArc delivers
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      {current.delivers}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>

        {/* Mobile: expandable rows */}
        <div className="mt-12 space-y-3 lg:hidden">
          {sectors.map((row, i) => {
            const isOpen = i === active;
            const src = sectorImages[row.sector] || "/images/manufacturing.jpg";

            return (
              <FadeIn key={row.sector} delay={(i % 4) * 0.04}>
                <div className="overflow-hidden rounded-2xl bg-[#011B4D]/[0.97]">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left"
                  >
                    <span className="font-nav text-xs font-semibold text-[#7FD4CB]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display flex-1 text-base font-bold text-white">
                      {row.sector}
                    </span>
                    <span
                      className={cn(
                        "text-lg text-white/50 transition",
                        isOpen && "rotate-45 text-[#7FD4CB]"
                      )}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-40 w-full object-cover"
                        />
                        <div className="space-y-5 px-4 pt-4 pb-5">
                          <div>
                            <p className="font-nav text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F0A58A]">
                              What bites
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-white/75">
                              {row.bites}
                            </p>
                          </div>
                          <div>
                            <p className="font-nav text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FD4CB]">
                              What CredArc delivers
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-white/75">
                              {row.delivers}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
