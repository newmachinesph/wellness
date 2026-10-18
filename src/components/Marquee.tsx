const phrases = [
  "Repair Your Cells",
  "Reverse Biological Age",
  "Unlock Peak Performance",
  "Optimize Your Biology",
  "Live Longer Stronger",
  "Built Around You",
];

export default function Marquee() {
  // Two identical halves so the -50% slide loops seamlessly.
  const half = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {phrases.map((phrase, i) => (
        <li key={i} className="flex items-center">
          <span className="px-8 font-serif text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            {phrase}
          </span>
          <span className="text-2xl text-highlight">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative flex h-[120px] w-full items-center overflow-hidden border-y border-white/10 bg-accent">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-accent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-accent to-transparent" />

      <div className="flex w-max animate-marquee">
        {half}
        {half}
      </div>
    </div>
  );
}
