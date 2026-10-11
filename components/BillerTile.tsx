import Image from "next/image";
import { biller } from "@/lib/billers";

/**
 * A biller's square brand tile. `size` stays ≤ 56 for PHED, whose source is only 116px.
 * The name-on-brand-colour tile sits underneath as the loading and failure state (alt="" image:
 * a failed one renders nothing, so no client JS is needed).
 */
export function BillerTile({ id, size = 56, className = "" }: { id: string; size?: number; className?: string }) {
  const b = biller(id);
  return (
    <span
      role="img"
      aria-label={b.name}
      className={`relative grid shrink-0 place-items-center overflow-hidden ring-1 ring-ink-900/5 ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.28, background: b.bg, color: b.fg }}
    >
      <span aria-hidden className="font-display font-extrabold leading-none" style={{ fontSize: Math.max(9, size * 0.24) }}>
        {b.name}
      </span>
      <Image src={b.src} alt="" width={size} height={size} sizes={`${size}px`} className="absolute inset-0 size-full object-cover" />
    </span>
  );
}
