import Reveal from "@/components/ui/Reveal";

export default function Tribe() {
  return (
    <section
      id="tribe"
      className="relative isolate flex min-h-screen items-center overflow-hidden border-t border-white/10 bg-black shadow-[0_-24px_50px_-12px_rgba(0,0,0,0.85)]"
    >
      {/* All imagery inset 8px so a plain black frame surrounds the section. */}
      <div aria-hidden className="absolute inset-[8px] -z-10 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(23,99,161,0.15),transparent_40%),radial-gradient(circle_at_75%_70%,rgba(23,99,161,0.08),transparent_45%)]" />

        {/* Founder portrait, anchored to the right edge */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/founder/dennis-jackson.jpg"
            alt=""
            className="h-full w-full object-cover object-right"
            draggable={false}
          />
          {/* Blend the portrait's left edge into black so the copy stays
              legible, and soften the top/bottom seams into the section. */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
        </div>

        {/* Extra left-side darkening so text reads on small screens too */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <Reveal className="max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-highlight">
            The BioWell Principle
          </p>
          <blockquote className="mt-6 font-serif text-3xl font-bold italic leading-[1.25] sm:text-4xl lg:text-5xl">
            “When you restore the body&apos;s internal conversation, healing
            becomes more intelligent.”
          </blockquote>
          <p className="mt-8 max-w-2xl text-lg text-white/65">
            That principle shapes every BioWell service: testing, IV therapy,
            peptides, detox, injectable nutrients, regenerative protocols, and
            membership care.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
