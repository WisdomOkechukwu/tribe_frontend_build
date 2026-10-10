import Image from "next/image";
import { biller } from "@/lib/billers";

/** A biller's square brand tile. `size` stays ≤ 56 for PHED, whose source is only 116px. */
export function BillerTile({ id, size = 56, className = "" }: { id: string; size?: number; className?: string }) {
  const b = biller(id);
  return (
    <Image
      src={b.src}
      alt={b.name}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`shrink-0 object-cover ring-1 ring-ink-900/5 ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.28 }}
    />
  );
}
