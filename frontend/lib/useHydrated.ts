import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// False during SSR and the hydration render, true afterwards. Used to keep
// decorative duplicates (marquee loop copies) out of the server HTML.
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
