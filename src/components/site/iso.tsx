import { Route, Ruler, Workflow as Pipe } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const points = [
  {
    icon: Route,
    cmd: "U1L",
    title: "连续绘制带标注线段",
    desc: "像 L 命令一样连续点击端点，每段自动生成长度文字；U 撤销上一段、Esc 全部清除。",
  },
  {
    icon: Ruler,
    cmd: "U1LX",
    title: "3D 正交视图逐段标距",
    desc: "点选一段 U1L 线路，沿连通路线从点击端逐段填写真实毫米距离，回车写入并自动跳到下一段。",
  },
  {
    icon: Pipe,
    cmd: "U1R / U1Q 系列",
    title: "拱桥开洞与桥架标注",
    desc: "交叉处一键开拱桥、合并 Polyline；100 / 200 / 400mm 桥架标注统一为「型号 + 总长度」。",
  },
];

export function Iso() {
  return (
    <section id="iso" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="ISO 绘图"
          title="更快地绘制 ISO 图"
          desc="东南等轴侧 3D 正交绘图习惯，逐段真实毫米距离，拱桥、桥架、软管标注自动生成 —— 从画线到标注一气呵成。"
        />
        <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3">
          {points.map((p) => (
            <div
              key={p.cmd}
              className="group relative overflow-hidden rounded-xl border border-line bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-card-strong"
            >
              <div className="flex items-center justify-between">
                <p.icon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
                <code className="rounded-md border border-line bg-card-strong px-2 py-0.5 font-mono text-[11px] text-muted">
                  {p.cmd}
                </code>
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </RevealGroup>
        <Reveal delay={0.1} className="mt-6">
          <p className="text-xs leading-relaxed text-muted">
            U1L 长度设置必须为正毫米数，非法值回退为 2000mm；拱桥直径等参数在 U1SET
            统一设置中心调整。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
