import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "统计图 — UNCAD Pro",
  description: "UNCAD Pro 效率实测数据可视化：时间对比、任务分解与产能估算。",
};

const AXIS = "rgba(127,127,127,0.25)";

/** horizontal bar with direct value label; single hue per entity */
function HBar({
  label,
  value,
  max,
  display,
  color,
}: {
  label: string;
  value: number;
  max: number;
  display: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-24 shrink-0 text-sm text-muted">{label}</span>
      <div className="relative h-7 flex-1">
        <div
          className="absolute inset-y-0 left-0 rounded-r-[4px]"
          style={{ width: `${(value / max) * 100}%`, background: color }}
        />
      </div>
      <span className="w-20 shrink-0 text-right font-mono text-sm tabular-nums text-foreground">
        {display}
      </span>
    </div>
  );
}

function Card({
  title,
  desc,
  children,
  footnote,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
  footnote?: string;
}) {
  return (
    <Reveal>
      <div className="rounded-2xl bg-card p-6 sm:p-8">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
        {desc ? <p className="mt-1.5 text-sm text-muted">{desc}</p> : null}
        <div className="mt-6 space-y-3">{children}</div>
        {footnote ? <p className="mt-5 text-[11px] leading-relaxed text-muted/80">{footnote}</p> : null}
      </div>
    </Reveal>
  );
}

export default function StatsPage() {
  return (
    <div className="flex-1">
      <Navbar />
      <main className="pt-28 pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            divider={false}
            eyebrow="统计图"
            title="效率实测，用数据说话"
            desc="以难度适中的机台图纸为样本：传统方式画图 2 分钟+、填写清单 1 分钟+、整理 BOQ 1 分钟+；UNCAD Pro 全程 1 分 06 秒。"
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {/* chart 1: total time */}
            <Card
              title="单机台总耗时对比"
              desc="传统方式 vs UNCAD Pro（秒，越短越好）"
              footnote="数据来源：现场实测录屏（见首页「实测速度」），传统耗时为工程师经验估计下限。"
            >
              <HBar label="传统方式" value={240} max={240} display="~240 s" color="#a3a3a3" />
              <HBar label="UNCAD Pro" value={66} max={240} display="66 s" color="var(--foreground)" />
            </Card>

            {/* chart 2: task breakdown */}
            <Card
              title="任务时间分解"
              desc="画图 / 填清单 / 整理 BOQ（秒）"
              footnote="UNCAD Pro 中画图由 U1L/U1LX 辅助，清单与 BOQ 由 U1F 自动完成。"
            >
              <div className="space-y-3">
                {[
                  { label: "传统 · 画图", v: 120, c: "#a3a3a3" },
                  { label: "传统 · 清单", v: 60, c: "#a3a3a3" },
                  { label: "传统 · BOQ", v: 60, c: "#a3a3a3" },
                  { label: "UNCAD 全程", v: 66, c: "var(--foreground)" },
                ].map((r) => (
                  <HBar key={r.label} label={r.label} value={r.v} max={120} display={`${r.v} s`} color={r.c} />
                ))}
              </div>
            </Card>

            {/* chart 3: per-machine savings */}
            <Card
              title="批量生产的节省时间"
              desc="不同机台数量下的累计节省（小时，按单台节省 174 秒估算）"
              footnote="估算口径：单台节省 = 240s − 66s ≈ 174s，仅计清单与 BOQ 环节，不含重复核对与返工。"
            >
              <div className="space-y-3">
                {[
                  { n: 10, h: 0.5 },
                  { n: 50, h: 2.4 },
                  { n: 100, h: 4.8 },
                  { n: 500, h: 24.2 },
                ].map((r) => (
                  <HBar
                    key={r.n}
                    label={`${r.n} 台`}
                    value={r.h}
                    max={24.2}
                    display={r.h >= 24 ? "~24 h" : `~${r.h} h`}
                    color="var(--foreground)"
                  />
                ))}
              </div>
            </Card>

            {/* chart 4: capacity */}
            <Card
              title="产能对比（估算）"
              desc="同样 8 小时工作日内可完成的机台出图量"
              footnote="按单机台全程耗时折算，未考虑复核与评审时间；实际收益随图纸复杂度提升。"
            >
              <HBar label="传统方式" value={120} max={440} display="~120 台" color="#a3a3a3" />
              <HBar label="UNCAD Pro" value={440} max={440} display="~440 台" color="var(--foreground)" />
              <div className="mt-4 flex items-baseline gap-3 rounded-xl bg-card-strong px-5 py-4">
                <span className="text-3xl font-medium tracking-tight text-foreground">×3.7</span>
                <span className="text-sm text-muted">产能倍数 · 1 人 + 1 插件 ≈ 4 人产出</span>
              </div>
            </Card>
          </div>

          <Reveal className="mt-10">
            <p className="rounded-xl border border-line px-5 py-4 text-xs leading-relaxed text-muted">
              说明：以上数据基于 v2.4.1 在难度适中图纸上的实测与工程师经验估算，用于展示量级差异；
              实际收益随机台复杂度、回路数量与图纸规范程度不同而变化。欢迎用你们自己的图纸实测对比。
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
