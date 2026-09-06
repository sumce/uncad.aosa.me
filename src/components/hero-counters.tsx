"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroCounters() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        const end = Number(node.dataset.count);
        const suffix = node.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          delay: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mx-auto mt-16 flex max-w-3xl flex-wrap items-start justify-center gap-x-0 gap-y-6">
      {[
        { v: 24, suffix: "", k: "个专业命令" },
        { v: 1, suffix: "", k: "次事务整批回滚" },
        { v: 100, suffix: "%", k: "BOQ 口径可追溯" },
        { v: 0, suffix: "", k: "静默臆测写入" },
      ].map(({ v, suffix, k }, i) => (
        <div
          key={k}
          className={`flex flex-col items-center px-8 sm:px-10 ${
            i > 0 ? "border-l border-line" : ""
          }`}
        >
          <dt
            className="text-3xl font-semibold tracking-tight text-foreground tabular-nums"
            data-count={v}
            data-suffix={suffix}
          >
            {`0${suffix}`}
          </dt>
          <dd className="mt-1.5 whitespace-nowrap text-xs text-muted">{k}</dd>
        </div>
      ))}
    </div>
  );
}
