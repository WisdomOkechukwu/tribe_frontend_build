import type { ReactNode } from "react";

const PATHS = {
  underline: { viewBox: "0 0 200 20", d: "M3 13C42 5 78 17 118 9s58-4 79 2" },
  circle: { viewBox: "0 0 200 80", d: "M104 7C46 3 6 20 8 43c2 27 74 34 124 31 47-3 66-22 61-42-5-19-50-29-104-24" },
};

/**
 * Hand-drawn mark around inline text. The path is fully drawn by default (no-JS,
 * reduced motion); ScrollMotion draws [data-scribble] paths in as they enter view.
 */
export function Scribble({
  children,
  kind = "underline",
  color = "#ff6220",
  className = "",
}: {
  children: ReactNode;
  kind?: keyof typeof PATHS;
  color?: string;
  className?: string;
}) {
  const p = PATHS[kind];
  const pos = kind === "underline" ? "-bottom-[0.12em] left-0 h-[0.22em] w-full" : "-inset-x-[0.18em] -inset-y-[0.16em]";
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg viewBox={p.viewBox} preserveAspectRatio="none" aria-hidden className={`pointer-events-none absolute ${pos} overflow-visible`}>
        <path
          data-scribble
          d={p.d}
          pathLength={1}
          fill="none"
          stroke={color}
          // no vector-effect="non-scaling-stroke": with pathLength=1 the dash would be measured
          // in screen space and the draw-in never closes (the underline rendered in pieces)
          strokeWidth={kind === "underline" ? 3.5 : 3}
          strokeLinecap="round"
          style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
        />
      </svg>
    </span>
  );
}

const ARROWS = {
  "down-left": "rotate(0)",
  "down-right": "scale(-1,1)",
  "up-left": "scale(1,-1)",
  "up-right": "scale(-1,-1)",
} as const;

/** Handwritten margin note with a doodled arrow — the only place Caveat is used. */
export function HandNote({
  children,
  arrow = "down-left",
  color = "currentColor",
  className = "",
}: {
  children: ReactNode;
  arrow?: keyof typeof ARROWS;
  color?: string;
  className?: string;
}) {
  const below = arrow.startsWith("down");
  const arrowSvg = (
    <svg viewBox="0 0 60 44" className="h-9 w-12" style={{ transform: ARROWS[arrow], color }} aria-hidden>
      <path data-scribble pathLength={1} d="M54 4C40 6 20 12 10 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: 0 }} />
      <path d="M4 26l6 12 10-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <span aria-hidden className={`pointer-events-none inline-flex flex-col font-hand text-[22px] font-bold leading-none md:text-[26px] ${className}`} style={{ color }}>
      {!below && <span className={arrow.endsWith("right") ? "self-end" : "self-start"}>{arrowSvg}</span>}
      <span className="-rotate-3 whitespace-nowrap">{children}</span>
      {below && <span className={arrow.endsWith("right") ? "self-end" : "self-start"}>{arrowSvg}</span>}
    </span>
  );
}
