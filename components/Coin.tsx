import Image from "next/image";
import { assetByCode } from "@/lib/rates";

/** A token or currency rendered as its real mark: official token logo or round country flag. */
export function Coin({ code, size = 64, className = "" }: { code: string; size?: number; className?: string }) {
  const a = assetByCode(code);
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-white ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 0 ${Math.max(1, size * 0.03)}px rgba(255,255,255,.9), 0 ${size * 0.12}px ${size * 0.3}px -${size * 0.12}px rgba(44,5,72,.45)`,
      }}
    >
      <Image src={a.logo} alt={a.name} width={size} height={size} unoptimized className="size-full object-cover" />
      {/* soft sheen so flags and marks read as coins, not stickers */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.35),transparent_55%)] ring-1 ring-inset ring-black/10" />
    </span>
  );
}
