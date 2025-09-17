"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis"; // (luego podemos migrar a 'lenis')

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<InstanceType<typeof Lenis> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      // algunas typings de lenis no declaran destroy; casteamos seguro:
      (lenis as unknown as { destroy?: () => void }).destroy?.();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
