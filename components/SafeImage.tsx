"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

type Props = ImageProps & { /** shown on the fallback tile if the image can't load */ fallbackLabel?: string };

/**
 * next/image with honest loading states: a brand shimmer while the bytes are on their way,
 * a fade-in once decoded, and a branded tile (never a broken-image icon) if it fails.
 * Use this for every photo on the page.
 */
export function SafeImage({ fallbackLabel, className = "", onLoad, onError, alt, ...props }: Props) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  // Cached images can finish before hydration attaches onLoad — catch them on mount.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) setState(img.naturalWidth > 0 ? "ready" : "error");
  }, []);

  return (
    <>
      {state !== "error" && (
        <Image
          {...props}
          alt={alt}
          ref={ref}
          onLoad={(e) => {
            setState("ready");
            onLoad?.(e);
          }}
          onError={(e) => {
            setState("error");
            onError?.(e);
          }}
          className={`${className} transition-opacity duration-500 ${state === "ready" ? "opacity-100" : "opacity-90"}`}
        />
      )}
      {state === "loading" && <span aria-hidden className={`absolute inset-0 shimmer pointer-events-none`} />}
      {state === "error" && (
        <span role="img" aria-label={alt || "Image unavailable"} className={`absolute inset-0 grid place-items-center overflow-hidden bg-purple-50`}>
          <span className="stripes absolute -inset-10 opacity-15 [--stripe-w:22px]" />
          {fallbackLabel && <span className="display relative text-2xl text-purple-900">{fallbackLabel}</span>}
        </span>
      )}
    </>
  );
}
