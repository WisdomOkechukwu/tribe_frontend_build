"use client";

import { useRef } from "react";
import { Headline } from "@/components/Headline";
import { Icon, type IconName } from "@/components/Icon";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// TODO(compliance): confirm wording with Tribe's legal team before launch.
const POINTS: { icon: IconName; title: string; body: string }[] = [
  { icon: "finger", title: "Your PIN or your face on every send", body: "Every payment needs your transaction PIN or Face ID. Nothing moves without you." },
  { icon: "phone", title: "Locks itself when you step away", body: "Ten minutes without a tap and Tribe locks. A separate lock PIN or your face opens it again." },
  { icon: "shield", title: "New device? Prove it.", body: "Two-factor checks on every new login, and an alert the second it happens." },
  { icon: "lock", title: "Locked down at rest", body: "Keys and personal data encrypted, with custody handled by licensed partners." },
];

function Padlock() {
  return (
    <svg viewBox="0 0 240 280" className="h-auto w-full max-w-[340px]" aria-hidden>
      <defs>
        <pattern id="lock-stripes" width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
          <rect width="64" height="64" fill="#f0e7f7" />
          <rect width="64" height="22" fill="#690dac" />
          <rect y="32" width="64" height="22" fill="#ff6220" />
        </pattern>
      </defs>
      <path data-shackle d="M62 128V84a58 58 0 0 1 116 0v44" fill="none" stroke="#2c0548" strokeWidth="26" strokeLinecap="round" />
      <g data-body>
        <rect x="18" y="118" width="204" height="150" rx="34" fill="url(#lock-stripes)" />
        <rect x="18" y="118" width="204" height="150" rx="34" fill="none" stroke="#2c0548" strokeWidth="6" />
        <circle cx="120" cy="182" r="20" fill="#2c0548" />
        <rect x="111" y="190" width="18" height="40" rx="9" fill="#2c0548" />
      </g>
    </svg>
  );
}

export function Security() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-lock]", start: "top 70%", once: true } })
          .from("[data-shackle]", { y: -36, duration: 0.01 })
          .to("[data-shackle]", { y: 0, duration: 0.5, ease: "bounce.out" }, 0.6)
          .to("[data-body]", { rotate: -4, transformOrigin: "50% 100%", duration: 0.08, yoyo: true, repeat: 3 }, 1.05);
      });
    },
    { scope: root },
  );

  return (
    <section id="security" ref={root} className="bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <Headline className="text-[clamp(3rem,9vw,8.5rem)] text-ink-900" lines={["Scammers", <span key="2" className="text-purple-500">hate this.</span>]} />
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-ink-500">
              We built Tribe like it&apos;s our own money in there — because it is. Here&apos;s what stands between your balance and the guy in your DMs promising to “double it.”
            </p>
          </div>
          <div data-lock className="flex justify-center md:justify-end">
            <Padlock />
          </div>
        </div>

        <ul data-reveal="children" className="mt-20 grid gap-10 border-t border-ink-900/10 pt-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {POINTS.map((p) => (
            <li key={p.title}>
              <Icon name={p.icon} className="size-7 text-orange-500" />
              <h3 className="mt-4 text-xl font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
