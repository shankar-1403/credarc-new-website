import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

export function ButtonLink({
  to,
  href,
  children,
  variant = "primary",
  className,
  ...props
}) {
  const styles = {
    primary:
      "bg-[#022F84] text-white hover:bg-[#011B4D] shadow-[0_10px_30px_-12px_rgba(2,47,132,0.55)]",
    secondary:
      "bg-white/90 text-[#022F84] ring-1 ring-white/60 hover:bg-white",
    outline:
      "bg-transparent text-[#022F84] ring-1 ring-[#022F84]/25 hover:bg-[#022F84]/5",
    teal: "bg-[#1A9B8E] text-white hover:bg-[#158277]",
    ghost:
      "bg-transparent text-white ring-1 ring-white/35 hover:bg-white/10",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5",
    styles[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to || "/"} className={classes} {...props}>
      {children}
    </Link>
  );
}

export function SectionLabel({ children }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1A9B8E]">
      {children}
    </p>
  );
}

export function SectionHeading({ label, title, description, light = false }) {
  return (
    <div className="max-w-3xl">
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl",
          light ? "text-white" : "text-[#0A1628]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-white/75" : "text-[#5A6B7D]"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  label,
  title,
  description,
  image,
  actions,
  compact = false,
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        compact ? "min-h-[52vh]" : "min-h-[70vh]"
      )}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#011B4D]/92 via-[#022F84]/78 to-[#011B4D]/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(26,155,142,0.25),transparent_45%)]" />
      <div
        className={cn(
          "relative mx-auto flex max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:px-8",
          compact ? "min-h-[52vh]" : "min-h-[70vh]"
        )}
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FD4CB]">
          {label}
        </p>
        <h1 className="font-display max-w-4xl text-4xl font-extrabold text-white text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="relative overflow-hidden border-y border-[#022F84]/10 bg-[#022F84]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(26,155,142,0.35),transparent_40%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Get in touch</SectionLabel>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Walk through a live demonstration.
          </h2>
          <p className="mt-3 text-white/75">
            The platform is in production today. Client references and the
            detailed product roadmap are available on request.
          </p>
        </div>
        <ButtonLink to="/contact" variant="secondary" className="shrink-0">
          Request a demo
          <ArrowRight className="size-4" />
        </ButtonLink>
      </div>
    </section>
  );
}
