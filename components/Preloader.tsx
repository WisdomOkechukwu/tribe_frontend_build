/**
 * Slow-connection indicator: a stripes progress bar across the top plus a small pill. Only
 * appears if the page hasn't finished loading ~400ms in (fast visits never see it), clears on
 * `load`, and is force-hidden at 4s so a stuck asset never leaves it spinning. Skipped on
 * repeat visits within a session.
 * Driven by classes on <html> set from the inline script below (before hydration).
 */
const SCRIPT = `(function(){var r=document.documentElement;try{if(sessionStorage.getItem("tribe-seen")){r.classList.add("pl-done");return}sessionStorage.setItem("tribe-seen","1")}catch(e){}var t=setTimeout(function(){r.classList.add("pl-show")},400);function done(){clearTimeout(t);r.classList.add("pl-done")}if(document.readyState==="complete")done();else{addEventListener("load",done);setTimeout(done,4000)}})();`;

export function Preloader() {
  return (
    <>
      {/* Non-blocking: SSR content is already readable underneath, so we signal progress
          instead of covering the page. */}
      <div id="preloader" aria-hidden>
        <div className="pl-track">
          <div className="pl-bar stripes absolute inset-y-0 w-2/5 [--stripe-w:5px]" />
        </div>
        <p className="pl-pill flex items-center gap-2 rounded-full bg-purple-900 py-1.5 pl-1.5 pr-4 text-[12px] font-medium text-white shadow-pop">
          {/* plain <img>: next/image would add its own loading pipeline to the loading UI */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/tribe-icon.png" alt="" width={24} height={24} className="pl-mark rounded-full bg-white p-0.5" />
          Loading the good stuff…
        </p>
      </div>
      {/* Static string, no user data — safe to inline. */}
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}
