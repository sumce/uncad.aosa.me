"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Parallax drift on the hero background grid + glow while scrolling */
export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = el.closest("section");
    const grid = section?.querySelector<HTMLElement>("[data-parallax-grid]");
    const glow = section?.querySelector<HTMLElement>("[data-parallax-glow]");
    if (!section || !grid || !glow) return;
    const ctx = gsap.context(() => {
      gsap.to(grid, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(glow, {
        yPercent: 30,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden />;
}
