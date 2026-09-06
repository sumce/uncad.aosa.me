"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/** Hero entrance animation: animates [data-hero-*] children on mount */
export function HeroIntro({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-line]",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
        0.1
      )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        );
    }, el);
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
