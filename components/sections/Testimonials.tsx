"use client";

import type { StaticImageData } from "next/image";
import { SafeImage } from "@/components/SafeImage";
import { useRef, type PointerEvent } from "react";
import { Headline } from "@/components/Headline";
import { Icon } from "@/components/Icon";
import t1 from "@/public/images/t1.jpg";
import t2 from "@/public/images/t2.jpg";
import t3 from "@/public/images/t3.jpg";
import t4 from "@/public/images/t4.jpg";

// TODO(content): placeholder voices and handles — swap for real customer posts (with consent) before launch.
// No like/follower counts on purpose: invented social proof is worse than none.
const POSTS: { img: StaticImageData; quote: string; name: string; handle: string; city: string; tag: string; tilt: string; accent: string }[] = [
  {
    img: t1,
    quote: "My clients pay me in dollars, I swap what I need to Naira and keep the rest. No more begging a P2P vendor at midnight.",
    name: "Chiamaka",
    handle: "@chiamaka.designs",
    city: "Lagos",
    tag: "Swap",
    tilt: "-rotate-2",
    accent: "bg-purple-500",
  },
  {
    img: t3,
    quote: "I paid for my Spotify, my data and my mum's light in one sitting. With USDT. That's crazy to me.",
    name: "Kwame",
    handle: "@kwame.codes",
    city: "Accra",
    tag: "Bills",
    tilt: "rotate-1",
    accent: "bg-orange-500",
  },
  {
    img: t2,
    quote: "Token Vault saved my life. My roommates and I finally stopped arguing about who loaded the last token.",
    name: "Zainab",
    handle: "@zainab_unbothered",
    city: "Abuja",
    tag: "Token Vault",
    tilt: "-rotate-1",
    accent: "bg-warning-400",
  },
  {
    img: t4,
    quote: "Sent my cousin a Cashpoint code on WhatsApp. He wasn't even on Tribe — signed up, redeemed it, done in two minutes.",
    name: "Tunde",
    handle: "@tunde.makes",
    city: "Ibadan",
    tag: "Cashpoints",
    tilt: "rotate-2",
    accent: "bg-ink-900",
  },
];

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);

  const nudge = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * Math.min(420, window.innerWidth * 0.8), behavior: "smooth" });

  // Mouse drag-to-scroll; touch already scrolls natively.
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !scroller.current) return;
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft };
    scroller.current.style.scrollSnapType = "none";
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !scroller.current) return;
    scroller.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const onUp = () => {
    if (!scroller.current) return;
    drag.current = null;
    scroller.current.style.scrollSnapType = "";
  };

  return (
    <section className="overflow-hidden bg-paper pb-24 md:pb-32">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <Headline className="text-[clamp(3rem,6.5vw,6rem)] text-ink-900" lines={["For people", "going places."]} />
            <p data-reveal className="mt-5 text-[17px] leading-relaxed text-ink-500">
              Students, freelancers, side-hustlers and the friend who always sorts the group bill.
            </p>
          </div>
          <div className="flex gap-3">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => nudge(d)}
                aria-label={d < 0 ? "Previous posts" : "Next posts"}
                className="press grid size-14 place-items-center rounded-full border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white"
              >
                <Icon name={d < 0 ? "arrowLeft" : "arrow"} className="size-5" />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scroller}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          className="-mr-5 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-2 py-8 pr-5 select-none [scrollbar-width:none] active:cursor-grabbing md:-mr-10 md:pr-10 [&::-webkit-scrollbar]:hidden"
        >
          {POSTS.map((p) => (
            <article
              key={p.handle}
              className={`w-[min(80vw,360px)] shrink-0 snap-start rounded-panel bg-white p-4 shadow-lift transition-transform duration-500 hover:rotate-0 ${p.tilt}`}
            >
              <header className="flex items-center gap-3 px-1">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                  <SafeImage src={p.img} alt="" fill sizes="44px" className="object-cover" draggable={false} />
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="text-[15px] font-semibold text-ink-900">{p.name}</p>
                  <p className="truncate text-[12px] text-ink-400">
                    {p.handle} · {p.city}
                  </p>
                </div>
                <span className={`size-3 shrink-0 rounded-full ${p.accent}`} aria-hidden />
              </header>
              <blockquote className="px-1 pt-4 text-[17px] font-medium leading-snug text-ink-800">{p.quote}</blockquote>
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-card">
                <SafeImage src={p.img} alt={`${p.name}, a Tribe user`} fill placeholder="blur" sizes="360px" className="object-cover" draggable={false} />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-ink-900 shadow-lift">#{p.tag.replace(/\s/g, "")}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
