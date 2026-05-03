import { useEffect, useRef } from "react";
import type { App } from "vue";

export default function MichaelManzano() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In dev mode, React intentionally runs every useEffect twice (mount → cleanup → mount)
    // to help catch bugs. The problem: the remote import() is async, so by the time the
    // first promise resolves, the cleanup has already run — but vueApp was still undefined,
    // so nothing got unmounted. Then the second run also resolves and we try to mount Vue
    // onto a div that already has a Vue app on it, causing a crash.
    //
    // `cancelled` fixes this. Each effect run closes over its own copy of `cancelled`.
    // When the first run's cleanup fires, it sets *its* cancelled = true. When that first
    // promise finally resolves, it sees cancelled = true and bails out — no mount happens.
    // The second run has a fresh cancelled = false, so it mounts cleanly.
    //
    // `vueApp` is for the real-world case: when the user navigates away from /me, the
    // cleanup runs with an actual vueApp reference and properly tears down the Vue instance.
    let vueApp: App | undefined;
    let cancelled = false;
    // @ts-expect-error -- module federation remote
    import("michaelmanzano/App").then(({ mount }) => {
      if (cancelled || !ref.current) return;
      vueApp = mount(ref.current, "/me");
    });
    return () => {
      cancelled = true;
      if (vueApp) vueApp.unmount();
    };
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
