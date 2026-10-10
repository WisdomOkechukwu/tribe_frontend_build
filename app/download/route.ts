import { NextResponse, userAgent, type NextRequest } from "next/server";
import { storeForUserAgent } from "@/lib/platform";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

export function GET(request: NextRequest) {
  const { ua, os } = userAgent(request);
  const store = storeForUserAgent(ua, os.name);

  const res = NextResponse.redirect(store === "ios" ? APP_STORE_URL : PLAY_STORE_URL, 302);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("Vary", "User-Agent");
  return res;
}
