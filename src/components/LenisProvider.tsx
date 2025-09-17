"use client";

import { useEffect, type PropsWithChildren } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const lenis = new Lenis();

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      // @ts-expect-error destroy may exist
      lenis?.destroy?.();
    };
  }, []);

  return <>{children}</>;
}
