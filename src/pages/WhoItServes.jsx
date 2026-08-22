import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Factory,
  Landmark,
  Scale,
  Ship,
} from "lucide-react";
import FadeIn from "../components/FadeIn";
import { CTABanner, PageHero, SectionHeading } from "../components/ui-kit";
import { segments } from "../data/content";
import { cn } from "../lib/utils";

const segmentIcons = {
  listed: Building2,
  msme: Factory,
  government: Landmark,
  banks: Scale,
  exporters: Ship,
};

const ease = [0.22, 1, 0.36, 1];

export default function WhoItServes() {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef([]);
  const reduce = useReducedMotion();
  const current = segments[active];
  const CurrentIcon = segmentIcons[current.id] || Building2;

  useEffect(() => {
    const elements = chapterRefs.current.filter(Boolean);
    if (!elements.length) return;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }

        let bestIndex = 0;
        let bestRatio = -1;
        elements.forEach((el, i) => {
          const ratio = ratios.get(el) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = i;
          }
        });

        if (bestRatio > 0) {
          setActive((prev) => (prev === bestIndex ? prev : bestIndex));
        }
      },
      {
        threshold: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        rootMargin: "-20% 0px -40% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (index) => {
    chapterRefs.current[index]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <PageHero
        label="Who it serves"
        title="Five segments, one data engine"
        description="Each segment has a different trigger — mandate, capital, buyer pressure or public accountability. The underlying engine does not change."
        image="/images/listed-companies.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-14">
          <aside className="relative hidden h-full lg:block">
            <div className="sticky top-32 z-10">
              <div className="relative h-[calc(100svh-10.5rem)] w-full overflow-hidden rounded-[1.75rem] bg-[#011B4D]">
                {segments.map((segment, i) => (
                  <motion.img
                    key={segment.id}
                    src={segment.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.45, ease }}
                  />
                ))}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#011B4D] via-[#011B4D]/25 to-transparent" />

                <div className="absolute right-6 bottom-6 left-6">
                  <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-white/10 text-[#7FD4CB] ring-1 ring-white/15">
                    <CurrentIcon className="size-4" />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FD4CB]">
                    {current.badge}
                  </p>
                  <p className="font-display mt-1 text-2xl font-bold text-white">
                    {current.tab}
                  </p>
                  <div className="mt-5 flex gap-1.5">
                    {segments.map((segment, i) => (
                      <button
                        key={segment.id}
                        type="button"
                        aria-label={segment.tab}
                        onClick={() => goTo(i)}
                        className={cn(
                          "h-1 rounded-full transition-all duration-300",
                          i === active
                            ? "w-8 bg-white"
                            : "w-3 bg-white/35 hover:bg-white/70"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div>
            {segments.map((segment, i) => {
              const Icon = segmentIcons[segment.id] || Building2;

              return (
                <article
                  key={segment.id}
                  id={segment.id}
                  ref={(el) => {
                    chapterRefs.current[i] = el;
                  }}
                  className="scroll-mt-28 flex flex-col justify-center border-t border-[#D5DDE8] py-8 first:border-t-0 lg:min-h-[75vh] lg:py-12"
                >
                  <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-2xl lg:hidden">
                    <img
                      src={segment.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#011B4D]/70 to-transparent" />
                    <p className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7FD4CB]">
                      {segment.badge}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[#E6F5F3] text-[#1A9B8E]">
                      <Icon className="size-4" strokeWidth={2} />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1A9B8E]">
                      {segment.tab}
                    </p>
                  </div>

                  <h2 className="font-display mt-3 text-2xl font-bold text-[#0A1628] text-balance lg:text-[1.75rem]">
                    {segment.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#5A6B7D] lg:text-base">
                    {segment.intro}
                  </p>

                  <div className="mt-6 space-y-4">
                    {segment.points.map((point) => (
                      <div
                        key={point.title}
                        className="border-l-2 border-[#1A9B8E]/70 pl-4"
                      >
                        <h3 className="font-display text-base font-bold text-[#0A1628]">
                          {point.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#5A6B7D]">
                          {point.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#D5DDE8] bg-white/60">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8">
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
