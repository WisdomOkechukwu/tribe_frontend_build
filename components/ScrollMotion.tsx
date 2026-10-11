"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Page-wide scroll choreography for plain markup, so sections can stay server components:
 *  - [data-headline]  masked line-by-line rise of its [data-line] children
 *  - [data-reveal]    fade/rise in (optional value = stagger children instead)
 *  - [data-parallax]  drift by the given fraction of its height while in view
 *  - [data-scribble]  SVG path (pathLength=1) draws itself in
 *  - [data-sticker]   wobble around the tilt given as the attribute value
 */
export function ScrollMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-headline]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-line]"), {
          yPercent: 110,
          rotate: 2,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const targets = el.dataset.reveal === "children" ? el.children : el;
        gsap.from(targets, {
          y: 48,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Hand-drawn marks draw themselves in.
      gsap.utils.toArray<SVGPathElement>("[data-scribble]").forEach((path) => {
        gsap.fromTo(
          path,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", delay: 0.35, scrollTrigger: { trigger: path.closest("svg"), start: "top 85%", once: true } },
        );
      });

      // Stickers wobble around their own tilt as the page moves.
      gsap.utils.toArray<HTMLElement>("[data-sticker]").forEach((el) => {
        const base = Number(el.dataset.sticker) || 0;
        gsap.fromTo(
          el,
          { rotate: base - 7, scale: 0.92 },
          { rotate: base + 5, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 0.12;
        gsap.fromTo(
          el,
          { yPercent: -amount * 100 },
          {
            yPercent: amount * 100,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Images and fonts change layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return null;
}
