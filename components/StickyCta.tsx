"use client";

import { useEffect, useState } from "react";
import { StoreButton } from "@/components/StoreButton";

/** Phone-only download bar: shows once the hero CTA scrolls away, hides while any other store CTA is on screen. */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ctas = Array.from(document.querySelectorAll("[data-store-cta]")).filter((el) => !el.closest("[data-sticky-cta]"));
    const visible = new Set<Element>();
    const update = () => setShow(window.scrollY > window.innerHeight * 0.8 && visible.size === 0);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      update();
    });
    ctas.filter((el) => !el.closest("header")).forEach((el) => io.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      data-sticky-cta
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-500 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <StoreButton tone="orange" className="w-full justify-center shadow-pop ring-2 ring-white" />
    </div>
  );
}
