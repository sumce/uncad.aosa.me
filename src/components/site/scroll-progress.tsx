"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Thin reading-progress bar pinned to the very top of the viewport */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        ref={ref}
        className="h-full w-full origin-left bg-gradient-to-r from-foreground via-muted to-foreground"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
