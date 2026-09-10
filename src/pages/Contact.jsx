import { useState } from "react";
import FadeIn from "../components/FadeIn";
import { PageHero, SectionLabel } from "../components/ui-kit";
import { company } from "../data/content";
import { submitForm } from "../lib/submitForm";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const inputClass =
  "mt-2 w-full rounded-xl border border-[#D5DDE8] bg-[#F7F9FC] px-4 py-3 text-sm outline-none ring-[#022F84] transition focus:ring-2";
const inputErrorClass = "border-red-500";
const labelClass =
  "text-xs font-semibold uppercase tracking-[0.12em] text-[#5A6B7D]";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    segment: "Listed company",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  function handleFormChange(e) {
    const { name, value } = e.target;

    // Block obviously invalid characters as the user types, same as
    // downstream form-input rules used elsewhere in the org.
    if (name === "name" && /\d/.test(value)) return;
    if (name === "phone") {
      if (/[a-zA-Z]/.test(value)) return;
      if (value.replace(/\D/g, "").length > 12) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const errors = {};

    if (!form.name.trim()) errors.name = "Full name is required.";
    else if (form.name.trim().length < 2)
      errors.name = "Name must be at least 2 characters.";
    else if (/\d/.test(form.name)) errors.name = "Name must not contain numbers.";
    else if (!/^[a-zA-Z\s.'-]+$/.test(form.name.trim()))
      errors.name = "Name contains invalid characters.";

    if (!form.email.trim()) errors.email = "Work email is required.";
    else if (!EMAIL_REGEX.test(form.email.trim()))
      errors.email = "Enter a valid email address (e.g. name@company.com).";

    if (!form.phone.trim()) errors.phone = "Phone number is required.";
    else {
      const digits = form.phone.replace(/\D/g, "");
      if (digits.length !== 10 && digits.length !== 12)
        errors.phone =
          "Enter a 10-digit mobile number or 12-digit number with country code.";
    }

    if (!form.company.trim()) errors.company = "Company is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fix the highlighted fields and try again.");
      return;
    }

    setFormErrors({});
    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      segment: form.segment,
      message: form.message.trim(),
      source: "Contact page",
    };

    try {
      await submitForm(payload);
      setSubmitted(true);
    } catch (err) {
      setError(
        "Something went wrong sending your request. Please try again or email us directly."
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        compact
        label="Get in touch"
        title="We would welcome the opportunity to walk you through a live demonstration."
        description="The platform is in production today. A working demonstration, client references and the detailed product roadmap are available on request."
        image="/images/supply-chain.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <SectionLabel>Contact details</SectionLabel>
            <h2 className="font-display text-3xl font-bold text-[#0A1628]">
              Start a conversation
            </h2>
            <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#5A6B7D]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#022B99]">
                  Email
                </p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 block text-lg font-semibold text-[#022F84] hover:underline"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#022B99]">
                  Entity
                </p>
                <p className="mt-1 text-[#0A1628]">{company.legal}</p>
                <p className="mt-1">CIN {company.cin}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#022B99]">
                  Registered office
                </p>
                <p className="mt-1 max-w-sm">{company.office}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl bg-white/90 p-6 ring-1 ring-[#D5DDE8] sm:p-8">
              {submitted ? (
                <div className="flex min-h-80 flex-col justify-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#022B99]">
                    Request received
                  </p>
                  <h3 className="font-display mt-3 text-3xl font-bold text-[#0A1628]">
                    Thank you — we&apos;ll be in touch shortly.
                  </h3>
                  <p className="mt-4 text-[#5A6B7D]">
                    Prefer email? Reach us directly at{" "}
                    <a
                      href={`mailto:${company.email}`}
                      className="font-semibold text-[#022F84] hover:underline"
                    >
                      {company.email}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleFormChange}
                      aria-invalid={Boolean(formErrors.name)}
                      className={`${inputClass} ${
                        formErrors.name ? inputErrorClass : ""
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Work email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleFormChange}
                        aria-invalid={Boolean(formErrors.email)}
                        className={`${inputClass} ${
                          formErrors.email ? inputErrorClass : ""
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1.5 text-xs font-medium text-red-600">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={handleFormChange}
                        aria-invalid={Boolean(formErrors.phone)}
                        className={`${inputClass} ${
                          formErrors.phone ? inputErrorClass : ""
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="mt-1.5 text-xs font-medium text-red-600">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleFormChange}
                      aria-invalid={Boolean(formErrors.company)}
                      className={`${inputClass} ${
                        formErrors.company ? inputErrorClass : ""
                      }`}
                    />
                    {formErrors.company && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {formErrors.company}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="segment" className={labelClass}>
                      You are
                    </label>
                    <select
                      id="segment"
                      name="segment"
                      value={form.segment}
                      onChange={handleFormChange}
                      className={inputClass}
                    >
                      <option>Listed company</option>
                      <option>MSME</option>
                      <option>Government / PSU</option>
                      <option>Bank / insurer</option>
                      <option>Exporter</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleFormChange}
                      className={`${inputClass} resize-y`}
                      placeholder="Tell us about your reporting timeline, sector or demo preferences."
                    />
                  </div>
                  {error && (
                    <p className="text-sm font-medium text-red-600">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#022F84] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#011B4D] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                  >
                    {submitting ? "Sending…" : "Request a demo"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
