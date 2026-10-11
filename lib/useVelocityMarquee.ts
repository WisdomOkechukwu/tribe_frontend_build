"use client";

import type { RefObject } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Infinite marquee over a track holding two identical halves. Speeds up with scroll
 * velocity and runs backwards while scrolling up. Paused whenever it is off screen.
 */
export function useVelocityMarquee(root: RefObject<HTMLElement | null>, track: RefObject<HTMLElement | null>, { duration = 38, reverse = false } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = reverse
          ? gsap.fromTo(track.current, { xPercent: -50 }, { xPercent: 0, duration, ease: "none", repeat: -1 })
          : gsap.to(track.current, { xPercent: -50, duration, ease: "none", repeat: -1 });
        // Start deep into the repeats so a negative timeScale never runs out of timeline.
        loop.totalTime(duration * 1000);
        loop.pause(); // runs only while on screen — see onToggle
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
          onUpdate: (self) => {
            const dir = self.direction;
            const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(self.getVelocity()) / 250);
            gsap.to(loop, { timeScale: dir * boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.25, ease: "power2.out" });
          },
        });
        return () => st.kill();
      });
    },
    { scope: root },
  );
}
