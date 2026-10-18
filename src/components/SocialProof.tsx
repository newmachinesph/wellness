import { Star, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const testimonials = [
  {
    quote:
      "The in-home labs and the plan that followed changed how I think about my health. I finally feel ahead of it instead of chasing it.",
    name: "Dr. Elena Marsh",
    role: "Founder, Marsh Aesthetics",
    image: "/testi1.jpg",
  },
  {
    quote:
      "Every detail is considered. The team meets you where you are — no pressure, just clarity and results I can actually feel.",
    name: "James Okonkwo",
    role: "Professional athlete",
    image: "/testi2.jpg",
  },
  {
    quote:
      "Concierge care that respects my time and privacy. The peptide protocol restored energy I thought I'd lost years ago.",
    name: "Priya Nair",
    role: "VIP Member",
    image: "/testi3.png",
  },
];

export default function SocialProof() {
  return (
    <section
      id="social-proof"
      className="relative flex min-h-screen flex-col justify-center border-t border-white/10 bg-background shadow-[0_-24px_50px_-12px_rgba(0,0,0,0.85)]"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-highlight">
            Social Proof
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Trusted by people who don&apos;t settle for guesswork.
          </h2>
          <p className="mt-5 text-white/60">
            Hundreds of clients have rebuilt their energy, performance, and
            confidence with BioWell&apos;s concierge protocols.
          </p>
        </Reveal>

        {/* Testimonials */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure
                style={{ backgroundImage: `url(${t.image})` }}
                className="group relative flex h-full flex-col overflow-hidden rounded-none border border-white/10 bg-surface-2 bg-cover bg-center p-7 pt-12 transition-colors duration-500 hover:border-accent/40"
              >
                {/* Dark overlay so the text stays readable over the image */}
                <div
                  aria-hidden
                  className="absolute inset-[4px] -z-0 bg-gradient-to-b from-black/70 via-black/75 to-black/90"
                />
                <Quote
                  size={28}
                  className="relative flex-none text-accent/60 transition-colors duration-500 group-hover:text-accent"
                />
                <blockquote className="relative mt-4 flex-1 text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div
                  aria-label="5 out of 5 stars"
                  className="relative mt-6 flex gap-1 text-highlight"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <figcaption className="relative mt-4 border-t border-white/10 pt-4">
                  <p className="font-serif text-base font-bold">{t.name}</p>
                  <p className="mt-0.5 text-sm text-white/55">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
