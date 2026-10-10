import type { ReactNode } from "react";

/** Hardware shell around an in-app screen. Width drives everything else. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19.4] w-[280px] rounded-[46px] bg-ink-900 p-[9px] shadow-[0_40px_80px_-30px_rgba(44,5,72,.55),inset_0_0_0_2px_#444343] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-white">
        <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-ink-900" />
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold ${dark ? "text-white" : "text-ink-900"}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-current p-[1px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}
