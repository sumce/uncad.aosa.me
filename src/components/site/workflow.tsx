"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const steps = [
  {
    n: "01",
    title: "刷新数据源",
    desc: "在 U1SET 选择机台工作簿，点击“刷新”导入本地 SQLite 快照。源文件改动不会偷偷影响图纸。",
  },
  {
    n: "02",
    title: "识别图框",
    desc: "框选或点选 frame 图框，程序自动读取机台 ID 与设备名，定位 Excel 回路。",
  },
  {
    n: "03",
    title: "匹配固定清单",
    desc: "设备、电缆、桥架、线管、软管按固定清单自动归类；未匹配项集中询问，绝不静默猜写。",
  },
  {
    n: "04",
    title: "回填确认",
    desc: "在“填充确认”窗口逐行核对、修改数量、替换型号或删除行，确认后在单一 CAD 事务中写入。",
  },
  {
    n: "05",
    title: "汇总输出",
    desc: "自动输出 [BOQ]机台ID.xlsx，多设备逐列汇总、多图框累加，口径统一、全程可追溯。",
  },
];

export function Workflow() {
  const listRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const bar = barRef.current;
    if (!list || !bar) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // progress line draws as the steps scroll through
      gsap.fromTo(
        bar,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: list,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
      // step numbers light up as they pass the middle of the viewport
      gsap.utils.toArray<HTMLElement>("[data-step-n]").forEach((n) => {
        gsap.fromTo(
          n,
          { color: "var(--muted)" },
          {
            color: "var(--foreground)",
            duration: 0.4,
            scrollTrigger: { trigger: n, start: "top 65%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="workflow" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,var(--glow),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="工作流"
          title="识别 → 匹配 → 回填 → 汇总 → 输出"
          desc="整批事务、可靠回滚。写图、导出、汇总都有明确预检与事务边界，出错不影响既有图纸。"
        />
        <div className="relative mt-12">
          {/* track + animated progress line */}
          <div aria-hidden className="absolute bottom-4 left-[31px] top-4 hidden w-px bg-line sm:block" />
          <div
            ref={barRef}
            aria-hidden
            className="absolute bottom-4 left-[31px] top-4 hidden w-px origin-top bg-gradient-to-b from-foreground to-muted sm:block"
            style={{ transform: "scaleY(0)" }}
          />
          <ol ref={listRef} className="space-y-0">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <li className="group relative grid grid-cols-[64px_1fr] gap-6 border-t border-line py-6 transition-colors last:border-b sm:grid-cols-[96px_1fr]">
                  <span
                    data-step-n
                    className="relative z-10 flex items-center gap-3 font-mono text-sm text-muted transition-colors group-hover:text-foreground"
                  >
                    <span className="hidden h-2.5 w-2.5 shrink-0 rounded-full border border-line bg-background sm:inline-block" />
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {s.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
