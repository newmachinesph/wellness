"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroGrid from "./HeroGrid";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 * i, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Animated 4x2 sports grid: each tile holds a static poster and plays
          its clip when the sequencer selects it (one at a time, random order,
          no repeats within a run of 8). */}
      <HeroGrid />

      {/* Dark legibility overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grain" />

      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-10">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-highlight"
        >
          Concierge Wellness &amp; Longevity
        </motion.span>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Discover Your Story.
          <br />
          <span className="text-highlight">We Meet You Where You Are.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-lg text-white/70 sm:text-xl"
        >
          Time to stop guessing. In-home consultation, in-home lab draw, in-home
          health scans, and customized action plans — built around you.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-transform duration-300 hover:scale-[1.03] hover:bg-accent-2"
          >
            Book Consultation
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:border-white hover:bg-white/5"
          >
            VIP Membership
          </a>
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 text-sm text-white/60"
        >
          Not sure where to start?{" "}
          <a
            href="#contact"
            className="font-medium text-highlight underline-offset-4 hover:underline"
          >
            Take our 60-second Health Quiz
          </a>
        </motion.p>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-white/40"
      >
        Scroll
      </motion.div>
    </section>
  );
}
