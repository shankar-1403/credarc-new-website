import FadeIn from "../components/FadeIn";
import {
  ButtonLink,
  CTABanner,
  PageHero,
  SectionHeading,
} from "../components/ui-kit";
import { platformCosts, platformSteps } from "../data/content";

export default function Platform() {
  return (
    <>
      <PageHero
        label="The platform"
        title="The old cost curve made ESG a luxury. AI removes it."
        description="The manual, consultant-led model cannot scale past the largest few hundred companies. That is the entire reason the market below them is unserved."
        image="/images/platform-capture.jpg"
        actions={
          <ButtonLink to="/contact" variant="teal">
            Request a demo
          </ButtonLink>
        }
      />

      <section className="border-b border-[#D5DDE8] bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 sm:grid-cols-3 md:px-8">
          {platformCosts.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <p className="font-display text-3xl font-extrabold text-[#022F84] sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-[#5A6B7D]">{item.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <FadeIn>
          <SectionHeading
            label="How it works"
            title="Capture. Generate. Decide. Assure."
            description="Four stages, one data engine — built for low-digitisation environments and assurance-grade outcomes."
          />
        </FadeIn>

        <div className="mt-16 space-y-16">
          {platformSteps.map((step, i) => (
            <FadeIn key={step.step}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <img
                  src={step.image}
                  alt=""
                  className="aspect-[16/10] w-full rounded-3xl object-cover"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1A9B8E]">
                    {step.step} · {step.title}
                  </p>
                  <h3 className="font-display mt-3 text-3xl font-bold text-[#0A1628]">
                    {step.headline}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#5A6B7D] sm:text-lg">
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-20 max-w-3xl rounded-3xl bg-[#022F84] px-8 py-10 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7FD4CB]">
            Why this matters commercially
          </p>
          <p className="font-display mt-3 text-2xl font-bold text-balance sm:text-3xl">
            When the marginal cost of a report approaches zero, the addressable
            market widens from 1,000 listed companies to the entire supply chain
            beneath them.
          </p>
        </FadeIn>
      </section>

      <CTABanner />
    </>
  );
}
