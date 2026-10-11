"use client";

import { SafeImage } from "@/components/SafeImage";
import { useRef } from "react";
import { Coin } from "@/components/Coin";
import { Headline } from "@/components/Headline";
import { Icon } from "@/components/Icon";
import { HandNote } from "@/components/Scribble";
import { Button } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { DOWNLOAD_PATH } from "@/lib/site";
import friends from "@/public/images/friends.jpg";

const STEPS = [
  { n: "01", title: "Generate a code", body: "Turn Naira into a Cashpoint — one 12-digit code worth exactly what you choose." },
  { n: "02", title: "Share it anyhow", body: "WhatsApp, SMS, a voice note, or written on paper. No account number, no bank name." },
  { n: "03", title: "They redeem it", body: "Already on Tribe? It loads instantly. New here? Sign up and redeem it as your first deposit." },
];

export function CashpointCode({ code, amount, compact = false }: { code: string; amount: string; compact?: boolean }) {
  return (
    <div className={`rounded-card bg-white text-ink-900 ${compact ? "p-3.5" : "p-5"}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-purple-600">
          <span className="size-2 rounded-full bg-orange-500" /> Cashpoint
        </span>
        <span className="flex items-center gap-1.5 text-[13px] font-semibold">
          {amount} <Coin code="NGN" size={18} />
        </span>
      </div>
      <p className={`mt-3 font-mono font-semibold tracking-[0.12em] ${compact ? "text-[20px]" : "text-[26px] md:text-[30px]"}`}>{code}</p>
      <div className="mt-3 flex items-center justify-between text-[12px] text-ink-400">
        <span>Redeemable by anyone on Tribe</span>
        <span className="flex items-center gap-1 font-medium text-purple-600">
          <Icon name="copy" className="size-3.5" /> Copy
        </span>
      </div>
    </div>
  );
}

export function Cashpoints() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-chat]", start: "top 70%", once: true } })
          .from("[data-bubble]", { y: 30, scale: 0.92, autoAlpha: 0, duration: 0.6, ease: "back.out(1.6)", stagger: 0.6 });
      });
    },
    { scope: root },
  );

  return (
    <section id="cashpoints" ref={root} data-theme="dark" className="relative overflow-hidden bg-purple-900 py-24 text-white md:py-32">
      <div className="stripes pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[700px] opacity-20 [--stripe-w:34px]" />
      <div className="container-x relative">
        <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-warning-400">Cashpoints · e don land</p>
        <Headline className="max-w-5xl text-[clamp(3rem,8vw,7.5rem)]" lines={["12 digits that", <span key="2" className="text-orange-400">carry cash.</span>]} />
        <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-purple-100">
          A Cashpoint is Naira packed into a code. Hand it to anyone — your sister on Tribe, or your guy who hasn&apos;t downloaded it yet — and it loads straight into their account.
        </p>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-20">
          <div>
            <ol data-reveal="children" className="divide-y divide-white/10 border-y border-white/10">
              {STEPS.map((s) => (
                <li key={s.n} className="grid grid-cols-[64px_1fr] gap-4 py-7 md:grid-cols-[96px_1fr]">
                  <span className="display text-4xl text-orange-400 md:text-5xl">{s.n}</span>
                  <div>
                    <h3 className="text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-1 text-[16px] text-purple-100">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Button href={DOWNLOAD_PATH} data-store-cta variant="orange" className="mt-10">
              Generate a Cashpoint
            </Button>
          </div>

          <div data-chat className="relative aspect-[4/5] overflow-hidden rounded-panel">
            <SafeImage fallbackLabel="Cashpoints" src={friends} alt="Friends laughing together" fill placeholder="blur" sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-purple-900 via-purple-900/55 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 space-y-2.5 md:inset-x-6 md:bottom-6">
              <div data-bubble className="ml-auto w-fit max-w-[85%] rounded-card rounded-br-md bg-orange-500 px-4 py-3 text-[14px]">
                Here&apos;s your share of the jollof
              </div>
              <div data-bubble className="ml-auto w-[88%]">
                <CashpointCode code="4827 1930 5561" amount="₦5,000" compact />
              </div>
              <div data-bubble className="flex w-fit max-w-[90%] items-center gap-2 rounded-card rounded-bl-md bg-white/15 px-4 py-3 text-[14px] backdrop-blur">
                <Icon name="check" className="size-4 shrink-0 text-success-300" /> Downloaded Tribe, redeemed it. Wallet loaded.
              </div>
            </div>
            <HandNote arrow="down-left" color="#ffffff" className="absolute right-5 top-[30%] hidden sm:flex md:right-8">
              no account number needed
            </HandNote>
            <span className="absolute left-4 top-4 rounded-full bg-warning-400 px-3 py-1.5 text-[12px] font-semibold text-ink-900 md:left-6 md:top-6">
              New to Tribe? Redeem at sign-up
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
