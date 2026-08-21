import FadeIn from "../components/FadeIn";
import { CTABanner, PageHero } from "../components/ui-kit";
import { valueMetrics, valuePillars } from "../data/content";

export default function Value() {
  return (
    <>
      <PageHero
        label="The value created"
        title="What a business actually gets out of it"
        description="ESG performance is measurable in the same four places any board already looks: the balance sheet, the market, the risk register and the people."
        image="/images/finance-capital.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-14">
        <FadeIn className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#1A9B8E] uppercase">
            Board outcomes
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#0A1628] text-balance sm:text-4xl md:text-5xl">
            Four places any board already looks
          </h2>
        </FadeIn>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-4">
          {/* Large visual */}
          <FadeIn className="relative min-h-[240px] overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 md:min-h-[320px] md:rounded-3xl">
            <img
              src="/images/listed-companies.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="relative flex h-full min-h-[240px] flex-col justify-end p-6 md:min-h-[320px] md:p-7">
              <p className="font-nav text-[11px] font-semibold tracking-[0.16em] text-[#7FD4CB] uppercase">
                The value created
              </p>
              <p className="font-display mt-2 max-w-md text-2xl font-bold text-white text-balance md:text-3xl">
                Measurable where boards already look
              </p>
            </div>
          </FadeIn>

          {/* Metric 1 & 2 */}
          {valueMetrics.slice(0, 2).map((metric, i) => (
            <FadeIn
              key={metric.label}
              delay={0.04 + i * 0.03}
              className="rounded-2xl bg-[#022F84] p-5 text-white md:rounded-3xl"
            >
              <p className="font-display text-2xl font-extrabold sm:text-3xl">
                {metric.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {metric.label}
              </p>
            </FadeIn>
          ))}

          {/* Metric 3 spans 2 */}
          <FadeIn
            delay={0.1}
            className="rounded-2xl bg-[#011B4D] p-5 text-white md:col-span-2 md:rounded-3xl"
          >
            <p className="font-display text-2xl font-extrabold sm:text-3xl">
              {valueMetrics[2].value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              {valueMetrics[2].label}
            </p>
          </FadeIn>

          {/* Four pillars */}
          {valuePillars.map((pillar, i) => (
            <FadeIn
              key={pillar.title}
              delay={0.08 + i * 0.03}
              className="rounded-2xl border border-[#D5DDE8] bg-white p-5 md:rounded-3xl"
            >
              <p className="font-nav text-[10px] font-semibold tracking-[0.16em] text-[#1A9B8E] uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-1 text-lg font-bold text-[#0A1628]">
                {pillar.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {pillar.items.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="text-xs leading-relaxed text-[#5A6B7D]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#5A6B7D]">
          Illustrative metrics. Actual benefit varies by issuer, lender and
          market. Not financial advice.
        </p>
      </section>

      <CTABanner />
    </>
  );
}
