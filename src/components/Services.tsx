"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Sparkles,
  Droplets,
  Microscope,
  Syringe,
  Pill,
  Wind,
  Leaf,
  Zap,
  TrendingDown,
  TestTube,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
  title: string;
  icon: LucideIcon;
  body: string;
  image: string;
};

const services: Service[] = [
  {
    title: "Regenerative Protocol",
    icon: Sparkles,
    body: "Quarterly peptide protocols designed for cellular repair and recovery.",
    image: "/hero/stretch.jpg",
  },
  {
    title: "IV Therapy",
    icon: Droplets,
    body: "Customized nutrient infusions for hydration, energy, and immunity.",
    image: "/hero/running.jpg",
  },
  {
    title: "Advanced Longevity Testing",
    icon: Microscope,
    body: "Root-cause diagnostics that map your biological age and health span.",
    image: "/hero/climbing.jpg",
  },
  {
    title: "Injectable Peptides",
    icon: Syringe,
    body: "Targeted cellular signaling via precision injectable delivery.",
    image: "/hero/boxing.jpg",
  },
  {
    title: "Sublingual Peptides",
    icon: Pill,
    body: "Convenient oral peptide delivery for daily optimization.",
    image: "/hero/gym.jpg",
  },
  {
    title: "Nasal Peptides",
    icon: Wind,
    body: "Rapid absorption nasal delivery for cognitive and neuro support.",
    image: "/hero/bike.jpg",
  },
  {
    title: "Detox & Cleanses",
    icon: Leaf,
    body: "CellCore protocols to support drainage and toxin elimination.",
    image: "/hero/hockey.jpg",
  },
  {
    title: "Injectable Vitamins",
    icon: Zap,
    body: "B12, Glutathione, and NAD+ for energy and cellular performance.",
    image: "/hero/basketball.jpg",
  },
  {
    title: "Weight Loss",
    icon: TrendingDown,
    body: "Physician-guided Tirzepatide and Semaglutide programs.",
    image: "/hero/running.jpg",
  },
  {
    title: "Bloodwork",
    icon: TestTube,
    body: "Comprehensive lab panels to track and personalize your protocol.",
    image: "/hero/gym.jpg",
  },
];

// The three service backdrops cycle across every card.
const serviceBgs = ["/service1.jpg", "/service2.jpg", "/service3.jpg"];

// Both CTA cards share one backdrop so the final scene reads as a single unit.
const ctaImages = [serviceBgs[0], serviceBgs[0]];

// Background layers, one per card index (last two are the CTA tiles).
const bgImages = [
  ...services.map((_, i) => serviceBgs[i % serviceBgs.length]),
  ...ctaImages,
];
const COUNT = bgImages.length;

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="flex h-full flex-col rounded-none border border-white/10 bg-surface/80 p-8 backdrop-blur-md">
      <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-highlight">
        <Icon size={22} />
      </span>
      <h3 className="font-serif text-2xl font-bold">{service.title}</h3>
      <p className="mt-3 text-sm text-white/70">{service.body}</p>
      <a
        href="#contact"
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-highlight transition-colors hover:text-white"
      >
        Learn more
        <ArrowRight size={15} />
      </a>
    </article>
  );
}

function PrimaryCta() {
  return (
    <article className="flex h-full flex-col justify-between rounded-none bg-gradient-to-br from-funblue to-cello p-8 text-white">
      <h3 className="font-serif text-2xl font-bold leading-snug">
        Ready to begin your story?
      </h3>
      <a
        href="#contact"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-highlight px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cello transition-transform duration-300 hover:scale-[1.03]"
      >
        Book Consultation
      </a>
    </article>
  );
}

function SecondaryCta() {
  return (
    <article className="flex h-full flex-col justify-between rounded-none bg-surface-2/80 p-8 backdrop-blur-md">
      <h3 className="font-serif text-2xl font-bold leading-snug">
        Not sure where to start?
      </h3>
      <a
        href="#contact"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:border-white hover:bg-white/5"
      >
        Take the 60-second Quiz
      </a>
    </article>
  );
}

export default function Services() {
  const targetRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isDesktop, setIsDesktop] = useState(false);
  const [distance, setDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<number | undefined>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const desktop = mql.matches;
      setIsDesktop(desktop);
      // Translate until the CTA pair's center lands on the viewport center.
      const first = cardRefs.current[COUNT - 2];
      const last = cardRefs.current[COUNT - 1];
      if (desktop && first && last) {
        const pairCenter =
          (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2;
        const travel = Math.max(0, pairCenter - window.innerWidth / 2);
        setDistance(travel);
        setSectionHeight(travel + window.innerHeight);
      } else {
        setDistance(0);
        setSectionHeight(undefined);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    mql.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mql.removeEventListener("change", measure);
    };
  }, []);

  // Focus = the card whose center is nearest the viewport's horizontal focal point.
  const computeActive = useCallback(() => {
    const focal = window.innerWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - focal);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Desktop: recompute focus as the track translates with vertical scroll.
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (isDesktop) computeActive();
  });

  useEffect(() => {
    computeActive();
  }, [computeActive, isDesktop, distance]);

  const cards: ReactNode[] = [
    ...services.map((s) => <ServiceCard key={s.title} service={s} />),
    <PrimaryCta key="cta-primary" />,
    <SecondaryCta key="cta-secondary" />,
  ];

  return (
    <section
      ref={targetRef}
      id="services"
      style={isDesktop ? { height: sectionHeight } : undefined}
      className="relative border-t border-white/10 bg-[#05070f] shadow-[0_-24px_50px_-12px_rgba(0,0,0,0.85)]"
    >
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-black lg:sticky lg:top-0 lg:h-screen lg:justify-center">
        {/* Cross-fading background that tracks the focused card. Inset 8px so a
            plain black frame surrounds the whole panel. */}
        <div aria-hidden className="absolute inset-[8px] -z-10 overflow-hidden bg-black">
          {bgImages.map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1.05 : 1 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/90" />
        </div>

        {/* Heading stays pinned while the track scrolls horizontally */}
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 lg:px-10 lg:pt-0">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-highlight">
            Our Services
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Explore BioWell Services.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            From regenerative peptides to advanced diagnostics, every offering
            is designed for cellular repair, longevity, and peak performance.
          </p>
        </div>

        {/* Horizontal parallax track */}
        <motion.div
          ref={trackRef}
          style={isDesktop ? { x } : undefined}
          onScroll={isDesktop ? undefined : computeActive}
          className="mt-10 flex gap-6 pb-20 max-lg:flex-col max-lg:px-6 lg:pl-[max(1.5rem,calc(50vw-180px))] lg:pr-[max(1.5rem,calc(50vw-372px))] lg:mt-12 lg:pb-0 lg:[scrollbar-width:none]"
        >
          {cards.map((card, i) => {
            // The two CTA cards (indices 10 & 11) act as one focal scene:
            // when focus reaches either, highlight both.
            const focused =
              active >= services.length ? i >= services.length : active === i;
            return (
              <motion.div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                animate={{
                  opacity: !isDesktop || focused ? 1 : 0.4,
                  scale: !isDesktop || focused ? 1 : 0.9,
                }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`w-full shrink-0 rounded-none transition-shadow duration-300 lg:w-[360px] ${
                  isDesktop && focused
                    ? "shadow-[0_0_0_2px_var(--color-accent),0_30px_60px_-20px_rgba(0,0,0,0.8)]"
                    : ""
                }`}
              >
                {card}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
