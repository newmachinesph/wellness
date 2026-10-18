import { Dna, Zap, Crown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const reasons = [
  {
    icon: Dna,
    title: "Cellular repair",
    body: "Support the foundations that help the body recover, rebuild, and perform.",
  },
  {
    icon: Zap,
    title: "Peak performance",
    body: "Optimize energy, cognition, body composition, and resilience.",
  },
  {
    icon: Crown,
    title: "Concierge access",
    body: "Deliver premium care with privacy, clarity, and high-touch support.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative flex min-h-screen flex-col justify-center border-t border-white/10 bg-surface shadow-[0_-24px_50px_-12px_rgba(0,0,0,0.85)]"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-highlight">
            Why Choose Us
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Care built around how the body actually heals.
          </h2>
          <p className="mt-5 max-w-md text-white/60">
            Every BioWell protocol works toward the same outcomes — restoring
            the systems that let you recover, perform, and feel like yourself
            again.
          </p>
        </Reveal>

        <div className="space-y-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={i * 0.1}>
                <div className="group flex gap-5 rounded-none border border-white/10 bg-cello p-6 transition-colors duration-500 hover:border-accent/40">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-black text-highlight transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-bold">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/60">{reason.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
