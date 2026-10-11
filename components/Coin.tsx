import Image from "next/image";
import { assetByCode } from "@/lib/rates";

/**
 * A token or currency rendered as its real mark: official token logo or round country flag.
 * The coloured glyph face sits underneath, so a slow logo shows a branded coin rather than a
 * gap. The <img> has alt="" (the label lives on the wrapper): a failed empty-alt image renders
 * nothing, so failure degrades to the glyph with zero JS — keeps this a server component.
 */
export function Coin({ code, size = 64, className = "" }: { code: string; size?: number; className?: string }) {
  const a = assetByCode(code);
  return (
    <span
      role="img"
      aria-label={a.name}
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full font-display font-extrabold ${className}`}
      style={{
        width: size,
        height: size,
        background: a.bg,
        color: a.fg,
        fontSize: size * (a.glyph.length > 1 ? 0.3 : 0.46),
        boxShadow: `0 0 0 ${Math.max(1, size * 0.03)}px rgba(255,255,255,.9), 0 ${size * 0.12}px ${size * 0.3}px -${size * 0.12}px rgba(44,5,72,.45)`,
      }}
    >
      <span aria-hidden>{a.glyph}</span>
      <Image src={a.logo} alt="" width={size} height={size} unoptimized className="absolute inset-0 size-full object-cover" />
      {/* soft sheen so flags and marks read as coins, not stickers */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.35),transparent_55%)] ring-1 ring-inset ring-black/10" />
    </span>
  );
}
