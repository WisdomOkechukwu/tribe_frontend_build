export type Store = "ios" | "android";

// iPhone/iPod/iPad, macOS (incl. iPadOS 13+ which reports as Macintosh), watchOS, visionOS, tvOS.
const APPLE_UA = /iPhone|iPad|iPod|Macintosh|Mac OS X|watchOS|visionOS|AppleTV/i;

/** Apple devices go to the App Store; Android, Windows, Linux, ChromeOS and the rest go to Play. */
export function storeForUserAgent(ua: string | null | undefined, osName?: string): Store {
  if (osName && /^(ios|mac ?os|watchos|visionos|tvos)$/i.test(osName)) return "ios";
  return ua && APPLE_UA.test(ua) ? "ios" : "android";
}
