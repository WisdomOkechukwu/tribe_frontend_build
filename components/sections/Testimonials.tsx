"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { Headline } from "@/components/Headline";
import { Icon } from "@/components/Icon";
import t1 from "@/public/images/t1.jpg";
import t2 from "@/public/images/t2.jpg";
import t3 from "@/public/images/t3.jpg";
import t4 from "@/public/images/t4.jpg";

// TODO(content): placeholder voices — swap for real customer quotes (with consent) before launch.
const QUOTES: { img: StaticImageData; quote: string; name: string; meta: string; tone: string }[] = [
  {
    img: t1,
    quote: "My clients pay me in dollars, I swap what I need to Naira and keep the rest. No more begging a P2P vendor at midnight.",
    name: "Chiamaka",
    meta: "Freelance designer · Lagos",
    tone: "bg-purple-500 text-white",
  },
  {
    img: t3,
    quote: "I paid for my Spotify, my data and my mum's light in one sitting. With USDT. That's crazy to me.",
    name: "Kwame",
    meta: "Software dev · Accra",
    tone: "bg-orange-500 text-white",
  },
  {
    img: t2,
    quote: "Token Vault saved my life. My roommates and I finally stopped arguing about who loaded the last token.",
    name: "Zainab",
    meta: "Student · Abuja",
    tone: "bg-warning-400 text-ink-900",
  },
  {
    img: t4,
    quote: "I sent my cousin a Cashpoint code on WhatsApp. He wasn't even on Tribe — signed up, redeemed it, done in two minutes.",
    name: "Tunde",
    meta: "Content creator · Ibadan",
    tone: "bg-ink-900 text-white",
  },
];

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * Math.min(440, window.innerWidth * 0.8), behavior: "smooth" });

  return (
    <section className="overflow-hidden bg-paper pb-24 md:pb-32">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
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
                aria-label={d < 0 ? "Previous" : "Next"}
                className="grid size-14 place-items-center rounded-full border-2 border-ink-900 text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
              >
                <Icon name={d < 0 ? "arrowLeft" : "arrow"} className="size-5" />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scroller}
          className="-mr-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-5 [scrollbar-width:none] md:-mr-10 md:pr-10 [&::-webkit-scrollbar]:hidden"
        >
          {QUOTES.map((q) => (
            <figure key={q.name} className={`flex w-[min(82vw,380px)] shrink-0 snap-start flex-col overflow-hidden rounded-[32px] ${q.tone}`}>
              <div className="relative aspect-[4/3.4]">
                <Image src={q.img} alt={q.name} fill placeholder="blur" sizes="380px" className="object-cover" />
              </div>
              <blockquote className="flex-1 p-6 text-[19px] font-medium leading-snug">&ldquo;{q.quote}&rdquo;</blockquote>
              <figcaption className="px-6 pb-6 text-[14px]">
                <span className="font-semibold">{q.name}</span> <span className="opacity-70">· {q.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
