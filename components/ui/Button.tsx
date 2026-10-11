import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "@/components/Icon";

type Variant = "dark" | "orange" | "purple" | "deep" | "light" | "ghost";
type Shape = "pill" | "block";

const VARIANTS: Record<Variant, string> = {
  dark: "bg-ink-900 text-white hover:bg-orange-500",
  orange: "bg-orange-500 text-white hover:bg-purple-500",
  purple: "bg-purple-500 text-white hover:bg-orange-500",
  /** for use on orange or purple bands, where orange/purple hovers would vanish */
  deep: "bg-purple-900 text-white hover:bg-white hover:text-purple-900",
  light: "bg-white text-purple-900 hover:bg-orange-500 hover:text-white",
  ghost: "text-purple-700 hover:bg-purple-50",
};

const SHAPES: Record<Shape, string> = {
  pill: "rounded-full px-7 py-4",
  block: "w-full rounded-card py-4",
};

type Props = {
  variant?: Variant;
  shape?: Shape;
  arrow?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

/** The one CTA. Links only — every action on this page leads somewhere (usually /download). */
export function Button({ variant = "dark", shape = "pill", arrow = true, className = "", children, ...rest }: Props) {
  return (
    <a
      {...rest}
      className={`press group inline-flex items-center justify-center gap-2 text-[15px] font-semibold ${VARIANTS[variant]} ${SHAPES[shape]} ${className}`}
    >
      {children}
      {arrow && <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </a>
  );
}
