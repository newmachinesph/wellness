"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Animated 4x2 hero background.
 *
 * Each of the 8 cells holds one sport. Every cell shows its static poster by
 * default. A sequencer plays exactly one cell's video at a time:
 *   poster -> (delay) -> play video -> video ends -> back to poster -> next cell
 *
 * The play order is a random permutation of all 8 cells, so within any run of
 * 8 plays a cell never repeats. When a round of 8 finishes we reshuffle and the
 * next round starts (the only constraint we add is that the first cell of the
 * new round differs from the last cell of the previous one, so two adjacent
 * plays are never the same tile).
 */

type Sport = {
  key: string;
  label: string;
  poster: string;
  video: string;
};

// 8 sports -> 4 columns x 2 rows.
const SPORTS: Sport[] = [
  { key: "basketball", label: "Basketball", poster: "/hero/basketball.jpg", video: "/hero/basketball.mp4" },
  { key: "hockey", label: "Hockey", poster: "/hero/hockey.jpg", video: "/hero/hockey.mp4" },
  { key: "running", label: "Running", poster: "/hero/running.jpg", video: "/hero/running.mp4" },
  { key: "boxing", label: "Boxing", poster: "/hero/boxing.jpg", video: "/hero/boxing.mp4" },
  { key: "gym", label: "Gym", poster: "/hero/gym.jpg", video: "/hero/gym.mp4" },
  { key: "bike", label: "Cycling", poster: "/hero/bike.jpg", video: "/hero/bike.mp4" },
  { key: "climbing", label: "Climbing", poster: "/hero/climbing.jpg", video: "/hero/climbing.mp4" },
  { key: "stretch", label: "Stretch", poster: "/hero/stretch.jpg", video: "/hero/stretch.mp4" },
];

// Pause between one clip stopping and the next starting.
const GAP_MS = 600;
// Initial hold on the all-static grid before the first clip plays.
const INTRO_MS = 1400;
// Safety cap: if a clip never fires `ended` (decode stall, tab throttling),
// move on anyway so the sequence can't get stuck.
const MAX_CLIP_MS = 9000;

// Fisher–Yates, returns a new array. `avoidFirst` keeps the new round's first
// element different from the previous round's last element.
function shuffle(n: number, avoidFirst = -1): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  if (avoidFirst >= 0 && order[0] === avoidFirst) {
    // swap head with a random later slot to avoid back-to-back repeats
    const swap = 1 + Math.floor(Math.random() * (n - 1));
    [order[0], order[swap]] = [order[swap], order[0]];
  }
  return order;
}

export default function HeroGrid() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const orderRef = useRef<number[]>(shuffle(SPORTS.length));
  const cursorRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Index of the cell whose video is currently playing (-1 = all static).
  const [active, setActive] = useState(-1);

  // Halted once section 2 (Services) reaches the top of the viewport; the
  // sequencer stops scheduling clips and pauses any clip mid-play.
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  // Whether the sequence has been kicked off (false under reduced-motion).
  const startedRef = useRef(false);
  // Skip the pause/resume effect on initial mount so it doesn't race the intro.
  const mountedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
    timerRef.current = null;
    watchdogRef.current = null;
  }, []);

  const advance = useCallback(() => {
    if (pausedRef.current) return; // section 2 is at the top — stay static
    if (cursorRef.current >= orderRef.current.length) {
      const last = orderRef.current[orderRef.current.length - 1];
      orderRef.current = shuffle(SPORTS.length, last);
      cursorRef.current = 0;
    }
    const next = orderRef.current[cursorRef.current++];
    setActive(next);
  }, []);

  // Drive playback whenever `active` changes.
  useEffect(() => {
    if (active < 0) return;
    const el = videoRefs.current[active];
    if (!el) return;

    let cancelled = false;
    const toPoster = () => {
      if (cancelled) return;
      clearTimers();
      setActive(-1);
      timerRef.current = setTimeout(advance, GAP_MS);
    };

    el.currentTime = 0;
    const playPromise = el.play();
    if (playPromise && typeof playPromise.catch === "function") {
      // Autoplay can be rejected (e.g. reduced-motion / power saving) — skip on.
      playPromise.catch(() => toPoster());
    }

    el.addEventListener("ended", toPoster, { once: true });
    watchdogRef.current = setTimeout(toPoster, MAX_CLIP_MS);

    return () => {
      cancelled = true;
      el.removeEventListener("ended", toPoster);
      el.pause();
    };
  }, [active, advance, clearTimers]);

  // Kick off the sequence after the intro hold; honor reduced-motion.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave the static grid in place

    startedRef.current = true;
    timerRef.current = setTimeout(advance, INTRO_MS);
    return () => clearTimers();
  }, [advance, clearTimers]);

  // Watch section 2 (Services): once its top edge crosses the top of the
  // viewport it fully covers the hero, so stop the clips; resume when it
  // scrolls back down and the hero is visible again.
  useEffect(() => {
    const target = document.getElementById("services");
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const covered = entry.isIntersecting;
        pausedRef.current = covered;
        setPaused(covered);
      },
      // Collapse the root region to the top edge of the viewport, so the
      // target only counts as intersecting once its top reaches y = 0.
      { rootMargin: "0px 0px -100% 0px", threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  // Apply pause / resume. Skips the first run so it never collides with the
  // intro kickoff above.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (paused) {
      clearTimers();
      setActive(-1); // the active-playback effect's cleanup pauses the clip
    } else if (startedRef.current) {
      clearTimers();
      timerRef.current = setTimeout(advance, GAP_MS);
    }
  }, [paused, advance, clearTimers]);

  const cells = useMemo(() => SPORTS, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-30 overflow-hidden">
      {/* Animated gap layers — only visible through the 8px seams between
          tiles: a flowing brand gradient with light lines travelling over it. */}
      <div className="absolute inset-0 grid-gap-glow" />
      <div className="absolute inset-0 grid-gap-lines" />
      <div className="grid h-full w-full gap-2 grid-cols-2 grid-rows-4 sm:grid-cols-4 sm:grid-rows-2">
        {cells.map((sport, i) => {
          const isActive = i === active;
          return (
            <div key={sport.key} className="relative overflow-hidden bg-black">
              {/* Static poster — always present; sits under the video. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sport.poster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              {/* Video — fades in only while this cell is the active one. */}
              <video
                ref={(node) => {
                  videoRefs.current[i] = node;
                }}
                src={sport.video}
                poster={sport.poster}
                muted
                playsInline
                preload="metadata"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* Subtle seam so tiles read as a grid, not one image. */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
