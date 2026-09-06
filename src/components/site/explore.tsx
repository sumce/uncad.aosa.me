import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const stats = [
  { v: "01:06", k: "单机台全程实测" },
  { v: "-75%", k: "相比传统 ~4 分钟" },
  { v: "×3.7", k: "产能倍数（估算）" },
  { v: "~24 h", k: "500 台累计节省" },
];

const pages = [
  {
    href: "/commands",
    title: "命令概述",
    desc: "24 个命令的用途、分步用法与注意事项，含 7 个传统兼容命令对照表。",
  },
  {
    href: "/stats",
    title: "统计图",
    desc: "效率实测可视化：总耗时对比、任务分解、批量节省与产能估算，附数据口径。",
  },
  {
    href: "/pricing",
    title: "套餐对比",
    desc: "Free / Plus / Pro / Enterprise 四档：从免费入门到全功能 + 定制开发（买断制）。",
  },
  {
    href: "/download",
    title: "下载安装",
    desc: "v2.4.2 安装包直链，Windows 10+ / AutoCAD 2022，三步安装，支持 72 小时免费体验。",
  },
];

export function Explore() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="数据与深入了解"
          title="效率，用数字说话"
          desc="以难度适中的机台图纸实测：传统画图 2 分钟+、清单 1 分钟+、BOQ 1 分钟+，UNCAD Pro 全程 1 分 06 秒。"
        />

        {/* stat band */}
        <RevealGroup className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.k} className="bg-background p-6">
              <p className="font-mono text-2xl font-semibold tracking-tight text-foreground">
                {s.v}
              </p>
              <p className="mt-1.5 text-xs text-muted">{s.k}</p>
            </div>
          ))}
        </RevealGroup>

        {/* page links */}
        <div className="mt-16">
          <SectionHeading eyebrow="继续了解" title="每个细节都有专页" />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
            {pages.map((p) => (
              <a key={p.href} href={p.href} className="group block">
                <div className="flex h-full items-start justify-between gap-6 rounded-xl bg-card p-6 transition-colors group-hover:bg-card-strong">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
              </a>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
