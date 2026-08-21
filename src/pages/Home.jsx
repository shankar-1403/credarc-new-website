import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import {
    ButtonLink,
    CTABanner,
    SectionHeading,
} from "../components/ui-kit";
import {
    company,
    compounding,
    forces,
    heroStats,
    platformSteps,
    roadmap,
} from "../data/content";

const heroStatImages = [
    "/images/listed-companies.jpg",
    "/images/platform-decide.jpg",
    "/images/export-trade.jpg",
    "/images/renewables.jpg",
];

const heroLines = [
    { text: "ESG has stopped", tone: "white" },
    { text: "being a report.", tone: "white" },
    { text: "It is now an", tone: "teal" },
    { text: "economic instrument.", tone: "teal" },
];

export default function Home() {
    const reduce = useReducedMotion();

    return (
        <>
            <section className="relative min-h-svh overflow-hidden bg-[#01101F]">
                <motion.div
                    className="absolute inset-0"
                    initial={reduce ? false : { scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img
                        src="/images/hero-esg.jpg"
                        alt="Renewable energy infrastructure"
                        className="h-full w-full object-cover"
                    />
                </motion.div>

                <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(1,16,31,0.92)_0%,rgba(2,47,132,0.55)_48%,rgba(1,27,77,0.72)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_85%_15%,rgba(26,155,142,0.35),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(2,47,132,0.5),transparent_40%)]" />

                {!reduce && (
                    <>
                        <motion.div
                            className="pointer-events-none absolute -top-24 -right-16 size-[28rem] rounded-full bg-[#1A9B8E]/20 blur-3xl"
                            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="pointer-events-none absolute bottom-0 left-[-10%] size-[22rem] rounded-full bg-[#022F84]/40 blur-3xl"
                            animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
                            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </>
                )}

                <div className="pointer-events-none absolute inset-x-6 top-24 bottom-10 border border-white/10 md:inset-x-10 md:top-28 md:bottom-12" />
                <div className="pointer-events-none absolute top-24 right-6 left-6 h-px bg-gradient-to-r from-transparent via-[#7FD4CB]/50 to-transparent md:top-28 md:right-10 md:left-10" />

                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-[18%] select-none overflow-hidden px-2 md:top-[14%]"
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="font-display text-center text-[18vw] leading-[0.85] font-extrabold tracking-[-0.06em] text-white/[0.07] uppercase sm:text-[15vw] md:text-[13vw]">
                        CredArc
                    </p>
                </motion.div>

                <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-6 pt-32 pb-16 md:px-10 md:pb-20">
                    <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                        <div>
                            <motion.div
                                className="flex items-center gap-3"
                                initial={reduce ? false : { opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.55, delay: 0.2 }}
                            >
                                <span className="h-px w-10 bg-[#7FD4CB]" />
                                <p className="font-nav text-[11px] font-semibold tracking-[0.28em] text-[#7FD4CB] uppercase sm:text-xs">
                                    CredArc Technologies
                                </p>
                            </motion.div>

                            <h1 className="font-display mt-6 max-w-3xl text-[2.35rem] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                                {heroLines.map((line, i) => (
                                    <motion.span
                                        key={line.text}
                                        className={
                                            line.tone === "teal"
                                                ? "block text-[#7FD4CB]"
                                                : "block text-white"
                                        }
                                        initial={reduce ? false : { opacity: 0, y: 28 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.55,
                                            delay: 0.28 + i * 0.08,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        {line.text}
                                    </motion.span>
                                ))}
                            </h1>
                        </div>

                        <motion.div
                            className="max-w-md lg:justify-self-end lg:pb-2"
                            initial={reduce ? false : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.55 }}
                        >
                            <p className="font-nav text-xs font-medium tracking-[0.2em] text-white/55 uppercase">
                                {company.tagline}
                            </p>
                            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                                An India-native ESG platform, already live in production — for
                                listed companies, MSMEs, government, exporters and the value
                                chain behind them.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <ButtonLink to="/contact" variant="teal">
                                    Request a demo
                                    <ArrowRight className="size-4" />
                                </ButtonLink>
                                <ButtonLink to="/why-now" variant="ghost">
                                    See why it matters now
                                </ButtonLink>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#F3F6FA]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(26,155,142,0.08),transparent_45%)]" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <FadeIn>
                            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#1A9B8E] uppercase">
                                The shift
                            </p>
                            <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-[#0A1628] text-balance sm:text-4xl md:text-5xl">
                                Four forces have turned ESG into a condition of doing business
                            </h2>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5A6B7D] sm:text-lg">
                                None of these are voluntary, and none of them reverse. Each one
                                converts a disclosure into a commercial gate.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.1} className="lg:pb-1">
                            <Link
                                to="/why-now"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#022F84] transition hover:text-[#1A9B8E]"
                            >
                                Read the full story
                                <ArrowRight className="size-4" />
                            </Link>
                        </FadeIn>
                    </div>

                    {/* Premium card list — full-bleed image + fade */}
                    <div className="mt-12 space-y-4 md:space-y-5">
                        {forces.map((force, i) => {
                            const contentRight = i % 2 === 1;

                            return (
                                <FadeIn key={force.id} delay={i * 0.05}>
                                    <article className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-[0_12px_36px_-20px_rgba(2,47,132,0.35)] md:min-h-[260px] md:rounded-3xl">
                                        <img
                                            src={force.image}
                                            alt=""
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <div
                                            className={`absolute inset-0 ${
                                                contentRight
                                                    ? "bg-gradient-to-l from-[#011B4D] from-20% via-[#022F84]/92 via-40% to-transparent"
                                                    : "bg-gradient-to-r from-[#011B4D] from-20% via-[#022F84]/92 via-40% to-transparent"
                                            }`}
                                        />

                                        <div
                                            className={`relative flex h-full min-h-[220px] items-center px-6 py-8 md:min-h-[260px] md:px-10 md:py-10 ${
                                                contentRight ? "justify-end" : "justify-start"
                                            }`}
                                        >
                                            <div
                                                className={`flex max-w-xl items-start gap-5 ${
                                                    contentRight ? "text-right flex-row-reverse" : ""
                                                }`}
                                            >
                                                <div className="shrink-0">
                                                    <p className="font-display text-4xl leading-none font-extrabold tracking-[-0.04em] text-white/25 sm:text-5xl">
                                                        {String(i + 1).padStart(2, "0")}
                                                    </p>
                                                    <p className="font-nav mt-2 text-xs font-semibold tracking-[0.18em] text-[#7FD4CB] uppercase">
                                                        {force.title}
                                                    </p>
                                                </div>
                                                <div className="min-w-0 flex-1 pt-1">
                                                    <h3 className="font-display text-2xl font-bold text-white text-balance sm:text-3xl">
                                                        {force.headline}
                                                    </h3>
                                                    <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                                                        {force.body}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </FadeIn>
                            );
                        })}
                    </div>

                    <FadeIn className="mt-12 max-w-3xl">
                        <p className="font-display text-xl font-bold text-[#0A1628] text-balance sm:text-2xl">
                            The consequence: ESG spend is no longer discretionary CSR budget —
                            it sits with the CFO, and it is defended as risk, capital cost and
                            market access.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#022F84]">
                <img
                    src="/images/renewables.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/renewables.jpg"
                >
                    <source src="/videos/platform-bg-v2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#022F84]/88" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(26,155,142,0.18),transparent_50%)]" />

                <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
                    <FadeIn className="max-w-3xl">
                        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#7FD4CB] uppercase">
                            The platform
                        </p>
                        <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
                            The old cost curve made ESG a luxury.{" "}
                            <span className="text-[#7FD4CB]">AI removes it.</span>
                        </h2>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                            Capture, generate, decide and assure — one engine built for
                            low-digitisation environments and assurance-grade outcomes.
                        </p>
                    </FadeIn>

                    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {platformSteps.map((step, i) => (
                            <FadeIn key={step.step} delay={i * 0.05}>
                                <div>
                                    <p className="font-display text-4xl font-extrabold text-white/15">
                                        {step.step}
                                    </p>
                                    <div className="mt-2 h-px w-8 bg-[#1A9B8E]" />
                                    <p className="font-nav mt-3 text-xs font-semibold tracking-[0.18em] text-[#7FD4CB] uppercase">
                                        {step.title}
                                    </p>
                                    <h3 className="font-display mt-2 text-xl font-bold text-white">
                                        {step.headline}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                                        {step.body}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn className="mt-10">
                        <ButtonLink to="/platform" variant="teal">
                            Explore the platform
                            <ArrowDownRight className="size-4" />
                        </ButtonLink>
                    </FadeIn>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
                <FadeIn>
                    <SectionHeading
                        label="The compounding effect"
                        title="Every client won is a door into the supply chain behind them"
                        description="This is the structural reason an ESG data platform grows differently from ordinary enterprise software."
                    />
                </FadeIn>

                <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
                    {compounding.map((item, i) => (
                        <FadeIn key={item.title} delay={i * 0.07}>
                            <div className="relative border-t border-[#D5DDE8] pt-5">
                                <p className="font-display text-4xl font-extrabold text-[#022F84]/20 sm:text-5xl">
                                    {item.value}
                                </p>
                                <h3 className="font-display mt-2 text-xl font-bold text-[#0A1628]">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#5A6B7D]">
                                    {item.body}
                                </p>
                                {i < compounding.length - 1 ? (
                                    <p className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#5A6B7D]/70 uppercase">
                                        Cascades
                                        <ArrowRight className="size-3" />
                                    </p>
                                ) : null}
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden">
                <img
                    src="/images/renewables.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#011B4D]/88" />
                <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
                    <FadeIn>
                        <SectionHeading
                            light
                            label="The expansion path"
                            title="From compliance reporting today to circular materials tomorrow"
                            description="Each phase reuses the client relationship and the data already captured. Nothing is rebuilt, and every phase widens the wallet."
                        />
                    </FadeIn>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {roadmap.map((phase, i) => (
                            <FadeIn key={phase.phase} delay={i * 0.05}>
                                <div className="border-l-2 border-[#1A9B8E] bg-white/5 px-5 py-4 backdrop-blur-sm">
                                    <div className="flex items-baseline justify-between gap-3">
                                        <p className="font-display text-lg font-bold text-white">
                                            {phase.title}
                                        </p>
                                        <span className="text-xs font-medium text-[#7FD4CB]">
                                            {phase.timing}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-white/70">{phase.detail}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn className="mt-10">
                        <ButtonLink to="/roadmap" variant="secondary">
                            View full roadmap
                            <ArrowRight className="size-4" />
                        </ButtonLink>
                    </FadeIn>
                </div>
            </section>

            <CTABanner />
        </>
    );
}
