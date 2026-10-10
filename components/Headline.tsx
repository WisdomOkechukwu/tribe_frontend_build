import type { ReactNode } from "react";

type Props = {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Display headline split into masked lines; ScrollMotion animates each [data-line] up into view. */
export function Headline({ lines, as: Tag = "h2", className = "" }: Props) {
  return (
    <Tag data-headline className={`display ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <span data-line className="block origin-bottom-left">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
