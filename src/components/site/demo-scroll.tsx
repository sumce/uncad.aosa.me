"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const panels = [
  {
    kind: "video" as const,
    cmd: "U1F",
    title: "清单生成 — 演示",
    video: "https://cloud.aosa.me/d/key/media/U1F.mp4",
    points: [
      "字段、容量与固定清单预检",
      "填充确认窗口逐行核对",
      "成功后自动输出 [BOQ]机台ID.xlsx",
    ],
  },
  {
    kind: "video" as const,
    cmd: "U1U",
    title: "清单更新 — 演示",
    video: "https://cloud.aosa.me/d/key/media/U1U.mp4",
    points: [
      "多图框统一预检，单一事务写入",
      "任一失败整批回滚，不留半成品",
      "重复更新按“机台 ID + 设备”覆盖",
    ],
  },
];

export function DemoScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop: pin the section and scroll the track horizontally
    mm.add("(min-width: 768px)", () => {
      const getScroll = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="demo" className="overflow-hidden">
      <div className="flex h-screen flex-col justify-center py-20">
        <div className="mx-auto mb-10 w-full max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            演示
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            看看它是怎么工作的
          </h2>
        </div>
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 px-6 will-change-transform md:w-max md:pl-[max(1.5rem,calc((100vw-72rem)/2))]"
        >
          {panels.map((p) => (
            <div
              key={p.cmd}
              className={`flex shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-card ${
                p.kind === "video"
                  ? "h-[70vh] w-[92vw] sm:w-[860px]"
                  : "h-[70vh] w-[85vw] sm:w-[680px]"
              }`}
            >
              <video
                className="min-h-0 w-full flex-1 bg-black object-cover"
                src={p.video}
                controls
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <code className="rounded-md border border-line bg-card-strong px-2 py-0.5 font-mono text-xs text-foreground">
                    {p.cmd}
                  </code>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-2 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-line" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {/* end panel */}
          <div className="hidden w-[480px] shrink-0 flex-col justify-center md:flex">
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              还有 20+ 命令
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              绘图标注、拱桥开洞、桥架标注、机台统计…… 全部在{" "}
              <a href="#commands" className="text-foreground underline underline-offset-4">
                命令总览
              </a>{" "}
              中查看。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
