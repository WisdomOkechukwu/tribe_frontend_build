"use client";

import { useRef } from "react";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

const WORDS = ["Swap", "Pay", "Send", "Save", "No wahala", "Gift cards", "Cashpoints", "Bills"];

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[0.6em] shrink-0" aria-hidden>
      <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

function Strip({ reverse, className, rotate }: { reverse?: boolean; className: string; rotate: number }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useVelocityMarquee(root, track, { duration: 30, reverse });

  return (
    <div ref={root} className={`absolute inset-x-[-10%] py-3 md:py-4 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <div ref={track} className="flex w-max">
        {[0, 1].map((half) => (
          <div key={half} className="display flex shrink-0 items-center gap-6 pr-6 text-[clamp(2.2rem,5vw,4.2rem)] leading-none md:gap-10 md:pr-10">
            {WORDS.map((w) => (
              <span key={w} className="flex items-center gap-6 md:gap-10">
                {w}
                <Spark />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two crossing marquee strips — the page's loudest moment, used once. */
export function KineticBand() {
  return (
    <section aria-hidden className="relative h-[200px] overflow-hidden bg-paper md:h-[280px]">
      <Strip className="top-[38%] bg-orange-500 text-white" rotate={2.5} reverse />
      <Strip className="top-[24%] bg-purple-500 text-orange-200" rotate={-3} />
    </section>
  );
}
