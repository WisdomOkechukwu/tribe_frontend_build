"use client";

import { useRef } from "react";
import { Coin } from "@/components/Coin";
import { Icon } from "@/components/Icon";
import { ASSETS } from "@/lib/rates";
import { DOWNLOAD_PATH } from "@/lib/site";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

export function TokenTicker() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useVelocityMarquee(root, track);

  return (
    <section ref={root} aria-label="Supported currencies and tokens" className="overflow-hidden border-y border-ink-900/5 bg-paper py-16 md:py-20">
      <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="display text-[clamp(2.2rem,5vw,4rem)] text-ink-900">
          40+ tokens. <span className="text-purple-500">12 currencies.</span> One wallet.
        </h2>
        <a href={DOWNLOAD_PATH} data-store-cta className="text-[15px] font-semibold text-orange-600 underline decoration-2 underline-offset-4 hover:text-purple-600">
          See them all in the app
        </a>
      </div>
      <div ref={track} className="flex w-max">
        {[0, 1].map((half) => (
          <div key={half} aria-hidden={half === 1} className="flex shrink-0 items-center gap-4 pr-4">
            {ASSETS.map((a) => (
              <div key={a.code} className="flex shrink-0 items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 ring-1 ring-ink-900/5">
                <Coin code={a.code} size={56} />
                <div className="leading-tight">
                  <p className="font-semibold">{a.code}</p>
                  <p className="text-[12px] text-ink-300">{a.name}</p>
                </div>
              </div>
            ))}
            <a
              href={DOWNLOAD_PATH}
              tabIndex={half === 1 ? -1 : undefined}
              aria-label="Get the app"
              className="grid size-[72px] shrink-0 place-items-center rounded-full bg-orange-500 text-white transition-colors hover:bg-purple-500"
            >
              <Icon name="arrow" className="size-7" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
