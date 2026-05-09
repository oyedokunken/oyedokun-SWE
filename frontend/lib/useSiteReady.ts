"use client";

import { useEffect, useState } from "react";

export function useSiteReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handle = () => setReady(true);
    document.addEventListener("siteReady", handle);
    const fallback = setTimeout(() => setReady(true), 4000);
    return () => {
      document.removeEventListener("siteReady", handle);
      clearTimeout(fallback);
    };
  }, []);

  return ready;
}
