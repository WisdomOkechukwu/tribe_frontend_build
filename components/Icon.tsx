const PATHS = {
  send: "M7 17 17 7M9 7h8v8",
  swap: "M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7",
  pay: "M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  bell: "M6 16V11a6 6 0 1 1 12 0v5l2 2H4l2-2ZM10 21h4",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  check: "m5 12 5 5 9-10",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  plus: "M12 5v14M5 12h14",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  arrowLeft: "M19 12H5m6-6-6 6 6 6",
  chevron: "m9 6 6 6-6 6",
  shield: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z",
  finger: "M12 11v4m-4-6a4 4 0 0 1 8 0v6m-12 0V9a8 8 0 0 1 16 0v3m-8 9v-2",
  lock: "M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4",
  wifi: "M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z",
  tv: "M3 6h18v12H3zM8 21h8",
  gift: "M4 10h16v11H4zM2 7h20v3H2zM12 7v14M12 7S10 3 7.5 3 5 5.5 7 7M12 7s2-4 4.5-4S19 5.5 17 7",
  gamepad: "M6 8h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.6h-6A4 4 0 0 1 2 13v-1a4 4 0 0 1 4-4ZM7 11v3M5.5 12.5h3M16 12h.01M18 14h.01",
  bag: "M5 8h14l-1 13H6L5 8ZM9 8V6a3 3 0 0 1 6 0v2",
  play: "M8 5v14l11-7L8 5Z",
  phone: "M8 2h8v20H8zM11 18h2",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4.35-4.35",
  ball: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4 4 3-1.5 4.5h-5L8 10l4-3Z",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className = "size-5", strokeWidth = 2 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
