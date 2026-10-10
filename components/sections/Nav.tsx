"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DOWNLOAD_PATH, NAV_LINKS } from "@/lib/site";
import tribeIcon from "@/public/brand/tribe-icon.png";

export function Logo() {
  return (
    <a href="#top" className="flex items-center" aria-label="Tribe home">
      <Image src={tribeIcon} alt="Tribe" className="h-11 w-auto" priority />
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        className={`mx-auto flex max-w-[1320px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${
          scrolled ? "bg-white/90 shadow-[0_8px_30px_-12px_rgba(44,5,72,.25)] ring-1 ring-ink-900/5 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-[14px] font-medium text-ink-700 transition-colors hover:bg-purple-50 hover:text-purple-700">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={DOWNLOAD_PATH}
          data-store-cta
          className="rounded-full bg-orange-500 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-purple-500"
        >
          Get the app
        </a>
      </nav>
    </header>
  );
}
