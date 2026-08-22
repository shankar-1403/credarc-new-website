import { useRef } from "react";
import { Clock, IndianRupee, CalendarClock } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/FadeIn";
import {
  ButtonLink,
  CTABanner,
  PageHero,
  SectionHeading,
} from "../components/ui-kit";
import { platformCosts, platformSteps } from "../data/content";

const costIcons = [Clock, IndianRupee, CalendarClock];

function ParallaxStep({ step, reversed }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-90, 90]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [36, -36]
  );

  return (
    <article
      ref={ref}
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
        <motion.img
          src={step.image}
          alt=""
          className="absolute inset-x-0 -top-[18%] h-[136%] w-full object-cover will-change-transform"
          style={{ y: imageY }}
        />
      </div>
      <motion.div className="will-change-transform" style={{ y: textY }}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1A9B8E]">
          {step.step} · {step.title}
        </p>
        <h3 className="font-display mt-3 text-3xl font-bold text-[#0A1628]">
          {step.headline}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[#5A6B7D] sm:text-lg">
          {step.body}
        </p>
      </motion.div>
    </article>
  );
}

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

      <section className="relative z-10 px-6 md:px-8">
        <FadeIn className="mx-auto max-w-7xl -mt-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-28px_rgba(2,47,132,0.35)] ring-1 ring-[#D5DDE8]">
            <div className="grid sm:grid-cols-3">
              {platformCosts.map((item, i) => {
                const Icon = costIcons[i];

                return (
                  <div
                    key={item.label}
                    className="group relative flex flex-col items-center px-5 py-5 md:px-6 md:py-6"
                  >
                    {i < platformCosts.length - 1 ? (
                      <div className="absolute inset-y-5 right-0 hidden w-px bg-[#D5DDE8] sm:block" />
                    ) : null}

                    <span className="flex size-8 items-center justify-center rounded-xl bg-[#E6F5F3] text-[#1A9B8E] transition duration-300 group-hover:bg-[#1A9B8E] group-hover:text-white">
                      <Icon className="size-4" strokeWidth={2} />
                    </span>
                    <p className="font-display mt-3 text-2xl font-extrabold tracking-tight text-[#022F84] sm:text-3xl">
                      {item.value}
                    </p>
                    <p className="mt-1 max-w-[16rem] text-sm leading-snug text-[#5A6B7D]">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <motion.div
              className="h-0.5 origin-left bg-[#1A9B8E]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <FadeIn>
          <SectionHeading
            label="How it works"
            title="Capture. Generate. Decide. Assure."
            description="Four stages, one data engine — built for low-digitisation environments and assurance-grade outcomes."
          />
        </FadeIn>

        <div className="mt-16 space-y-24 lg:space-y-32">
          {platformSteps.map((step, i) => (
            <ParallaxStep
              key={step.step}
              step={step}
              reversed={i % 2 === 1}
            />
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
