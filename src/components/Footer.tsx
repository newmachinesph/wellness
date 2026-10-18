import Image from "next/image";
import { ArrowUpRight, MapPin, AtSign, MessageCircle, Send } from "lucide-react";

const columns = [
  {
    heading: "Services",
    links: ["Regenerative Protocol", "IV Therapy", "Longevity Testing", "Bloodwork"],
  },
  {
    heading: "Company",
    links: ["About Us", "Health Quiz", "VIP Membership", "Contact Us"],
  },
  {
    heading: "Care",
    links: ["Book Consultation", "In-Home Lab Draw", "Health Scans", "Action Plans"],
  },
];

const socials = [
  { label: "Email", Icon: AtSign },
  { label: "Message", Icon: MessageCircle },
  { label: "Telegram", Icon: Send },
];

const legal = ["Privacy", "Terms", "HIPAA Notice", "Accessibility"];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-black shadow-[0_-24px_50px_-12px_rgba(0,0,0,0.85)]">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-highlight/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(23,99,161,0.20),transparent_65%)]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* CTA band */}
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-2 lg:items-end lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-highlight" />
              </span>
              Accepting new clients
            </span>
            <h2 className="mt-6 max-w-md font-serif text-4xl font-bold leading-[1.05] sm:text-5xl">
              Let&apos;s build your longevity plan.
            </h2>
          </div>

          <div className="lg:justify-self-end lg:text-right">
            <p className="text-sm text-white/55">
              Get protocols, research, and concierge openings in your inbox.
            </p>
            <form className="mt-5 flex max-w-md gap-2 lg:ml-auto">
              <input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-highlight/60 focus:bg-white/[0.07]"
              />
              <button
                type="submit"
                className="group inline-flex flex-none items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-transform duration-300 hover:scale-[1.03] hover:bg-accent-2"
              >
                Join
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </form>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/logo.png"
              alt="IAM BioWell"
              width={498}
              height={242}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm text-white/50">
              Concierge wellness and longevity. We meet you where you are — care
              delivered in your home.
            </p>
            <p className="mt-6 flex items-start gap-2 text-sm text-white/50">
              <MapPin size={16} className="mt-0.5 flex-none text-highlight" />
              <span>
                In-home concierge care
                <br />
                By appointment
              </span>
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link}
                      <ArrowUpRight
                        size={13}
                        className="-translate-x-1 text-highlight opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-white/40">
            © 2026 IAM BioWell. Concierge wellness &amp; longevity.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legal.map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/45 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors hover:border-highlight/50 hover:text-highlight"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized brand wordmark bleeding off the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-6 lg:px-10"
      >
        <p className="-mb-[0.18em] bg-gradient-to-b from-[#3a8fd4]/40 via-[#1763a1]/25 to-[#0a1f33]/0 bg-clip-text text-center font-sans text-[18vw] font-bold leading-none tracking-tight text-transparent">
          IAM BioWell
        </p>
      </div>
    </footer>
  );
}
