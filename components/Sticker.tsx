import type { ReactNode } from "react";

type Tone = "orange" | "purple" | "yellow" | "ink" | "white";

const TONES: Record<Tone, { bg: string; fg: string }> = {
  orange: { bg: "#ff6220", fg: "#ffffff" },
  purple: { bg: "#690dac", fg: "#ffffff" },
  yellow: { bg: "#ffda35", fg: "#201f1f" },
  ink: { bg: "#201f1f", fg: "#ffffff" },
  white: { bg: "#ffffff", fg: "#2c0548" },
};

// 14-point burst, drawn once and scaled
const BURST =
  "M50 2 58 14 72 7 74 22 89 21 84 36 98 42 87 52 96 64 81 67 83 82 68 80 62 94 50 86 38 94 32 80 17 82 19 67 4 64 13 52 2 42 16 36 11 21 26 22 28 7 42 14Z";

/**
 * Die-cut sticker: white keyline, soft shadow, slightly tilted. ScrollMotion wobbles
 * [data-sticker] around its base tilt, so the tilt lives in the inline transform.
 * Use at most one per section. Position/visibility belong on a wrapper — display and position
 * classes passed in here would fight the sticker's own.
 */
export function Sticker({
  children,
  tone = "orange",
  rotate = -6,
  shape = "pill",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  rotate?: number;
  shape?: "pill" | "burst";
  className?: string;
}) {
  const t = TONES[tone];
  // Die-cut keyline + drop shadow are sticker-specific, not part of the card/panel shadow scale.
  if (shape === "burst") {
    return (
      <span
        data-sticker={rotate}
        aria-hidden
        className={`pointer-events-none relative inline-grid size-24 place-items-center drop-shadow-[0_10px_14px_rgba(44,5,72,.35)] md:size-28 ${className}`}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <path d={BURST} fill={t.bg} stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
        </svg>
        <span className="display relative max-w-[70%] text-center text-[19px] leading-[0.9] md:text-[22px]" style={{ color: t.fg }}>
          {children}
        </span>
      </span>
    );
  }
  return (
    <span
      data-sticker={rotate}
      aria-hidden
      className={`pointer-events-none inline-block whitespace-nowrap rounded-full px-4 py-2 font-display text-[13px] font-extrabold uppercase tracking-wide shadow-[0_0_0_3px_#fff,0_12px_20px_-8px_rgba(44,5,72,.45)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, background: t.bg, color: t.fg }}
    >
      {children}
    </span>
  );
}
