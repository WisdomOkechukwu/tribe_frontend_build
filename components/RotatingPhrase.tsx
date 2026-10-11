"use client";

import { useEffect, useRef, useState } from "react";
import { Scribble } from "@/components/Scribble";

const EXIT_MS = 340;

/**
 * Cycles through phrases with exactly ONE phrase in the DOM at any time — exit, swap, enter —
 * so phrases can never overlap or stack. Screen readers always get the first phrase.
 * Static under reduced motion, and paused while off-screen or in a background tab.
 */
export function RotatingPhrase({ phrases, interval = 2600, className = "" }: { phrases: string[]; interval?: number; className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  // step only ever grows: it keys each phrase mount and tells first paint from later swaps
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);

    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      if (!visible || document.hidden) return;
      setLeaving(true);
      swap = setTimeout(() => {
        setStep((n) => n + 1);
        setLeaving(false);
      }, EXIT_MS);
    }, interval);

    return () => {
      io.disconnect();
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, [phrases.length, interval]);

  const index = step % phrases.length;
  const enter = step > 0 && !leaving ? "animate-phrase-in [&_path]:animate-scribble" : "";

  return (
    // the bottom padding keeps the underline inside the mask
    <span ref={root} className={`relative inline-block overflow-hidden whitespace-nowrap pb-[0.28em] align-top ${className}`}>
      <span className="sr-only">{phrases[0]}</span>
      <span
        key={step}
        aria-hidden
        className={`inline-block ${leaving ? "animate-phrase-out" : enter}`}
      >
        <Scribble color="#690dac">{phrases[index]}</Scribble>
      </span>
    </span>
  );
}
