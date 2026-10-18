"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // React doesn't always emit the `muted` attribute in SSR HTML, so browsers
  // block autoplay. Force muted + play() on the client once mounted.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = video.play();
    if (play) play.catch(() => {});
  }, []);

  return (
    <section
      id="contact"
      className="relative isolate flex min-h-screen items-center overflow-hidden border-t border-white/10 bg-black shadow-[0_-24px_50px_-12px_rgba(0,0,0,0.85)]"
    >
      {/* Background video, inset 8px so a black frame surrounds it. */}
      <div aria-hidden className="absolute inset-[8px] -z-10 overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/use_the_blue_shade_and_dark_ba.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
        {/* Darken for legibility + brand glow + grain */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(23,99,161,0.3),transparent_55%)]" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-highlight">
            Private Concierge Access
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Experience BioWell privately.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
            A concierge care team will help you choose the right starting point
            and build a plan around your goals.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="group inline-flex flex-none items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-transform duration-300 hover:scale-[1.03] hover:bg-accent-2"
            >
              Book Consultation
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex flex-none items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:border-white hover:bg-white/5"
            >
              VIP Membership
            </a>
          </div>

          <p className="mt-5 text-xs text-white/40">
            In-home consultation · lab draw · health scans · customized action
            plans.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
