import { Link } from "react-router-dom";
import { company, navItems } from "../data/content";
import Logo from "../assets/credarc-dark.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#D5DDE8] bg-white/70 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1fr_1fr_1fr] md:px-8">
        <div>
          <Link to="/" className="inline-block">
            <img src={Logo} alt="CredArc Logo" className="h-10 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5A6B7D]">
            {company.tagline}. An India-native ESG platform already live in
            production for listed companies, MSMEs, government and exporters.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A9B8E]">
            Explore
          </p>
          <ul className="mt-4 space-y-2 grid grid-cols-2">
            {navItems.map((item) => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  className="text-sm text-[#0A1628] transition hover:text-[#022F84]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="text-sm text-[#0A1628] transition hover:text-[#022F84]"
              >
                Request a demo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A9B8E]">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[#5A6B7D]">
            <li>
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-[#022F84] hover:underline"
              >
                {company.email}
              </a>
            </li>
            <li>
              <span className="block font-medium text-[#0A1628]">
                {company.legal}
              </span>
              <span className="mt-1 block">CIN {company.cin}</span>
            </li>
            <li className="leading-relaxed">{company.office}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#D5DDE8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-[#5A6B7D] sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {company.legal}. All rights reserved.
          </p>
          <p>Built for assurance-grade ESG data.</p>
        </div>
      </div>
    </footer>
  );
}
