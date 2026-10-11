import { BRAND_PATHS } from "@/lib/brandMarks";
import { giftBrand } from "@/lib/giftcards";

export function BrandMark({ id, className = "size-6" }: { id: string; className?: string }) {
  const b = giftBrand(id);
  if (b.mark && BRAND_PATHS[b.mark]) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d={BRAND_PATHS[b.mark]} />
      </svg>
    );
  }
  return <span className="font-display text-[0.9em] font-extrabold tracking-tight">{b.wordmark ?? b.name}</span>;
}

/** Glossy brand-coloured gift card: mark top-right, name bottom-left, "GIFT CARD" bottom-right. */
export function GiftCard({ id, amount, size = "sm", className = "" }: { id: string; amount?: string; size?: "sm" | "lg"; className?: string }) {
  const b = giftBrand(id);
  const lg = size === "lg";
  return (
    <div
      className={`relative flex aspect-[1.6] shrink-0 flex-col justify-between overflow-hidden ${
        lg ? "w-full rounded-card p-7" : "w-[210px] rounded-chip p-4"
      } ${className}`}
      style={{ background: b.bg, color: b.fg }}
    >
      {/* diagonal sheen, like light catching a plastic card */}
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,transparent_30%,rgba(255,255,255,.16)_44%,rgba(255,255,255,.04)_52%,transparent_60%)]" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
      <div className="relative flex justify-end">
        <BrandMark id={id} className={lg ? "size-12" : "size-6"} />
      </div>
      <div className="relative flex items-end justify-between gap-3">
        <div className="leading-tight">
          <p className={`font-semibold ${lg ? "text-2xl" : "text-[15px]"}`}>{b.name}</p>
          {amount && <p className={`font-display font-extrabold tracking-tight ${lg ? "text-5xl" : "text-xl"}`}>{amount}</p>}
        </div>
        <span className={`font-semibold uppercase tracking-[0.18em] opacity-80 ${lg ? "text-[12px]" : "text-[8px]"}`}>Gift card</span>
      </div>
    </div>
  );
}
