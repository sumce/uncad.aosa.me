import {
  ClipboardList,
  FileSpreadsheet,
  PenLine,
  LayoutPanelTop,
  BarChart3,
  Settings2,
} from "lucide-react";
import { RevealGroup } from "@/components/reveal";
import { SectionHeading } from "@/components/site/section-heading";

type Feature = {
  icon: typeof ClipboardList;
  title: string;
  cmd: string;
  desc: string;
  span?: string;
};

const features: Feature[] = [
  {
    icon: ClipboardList,
    title: "清单生成与更新",
    cmd: "U1F / U1U / U1S",
    desc: "框选图框后按固定清单逐行回填设备、电缆、桥架、线管、软管、断路器与插座。匹配失败的项目集中询问，绝不静默猜写；多图框批量更新，任一失败整批回滚。",
    span: "lg:col-span-2",
  },
  {
    icon: FileSpreadsheet,
    title: "自动 BOQ 输出",
    cmd: "[BOQ]机台ID.xlsx",
    desc: "按机台输出工程量清单，多设备逐列汇总、多图框累加，保留模板项目特征、报价列、公式与样式。",
  },
  {
    icon: PenLine,
    title: "绘图与标注辅助",
    cmd: "U1L / U1LX / U1C / U1R / U1Q 系列",
    desc: "更快地绘制 ISO 图：带长度标注线段、逐段真实毫米距离、软管、拱桥截断、100/200/400mm 桥架标注，取代手工画线标字。",
  },
  {
    icon: LayoutPanelTop,
    title: "图框排版与导出",
    cmd: "XLAYOUT / Xmerge / U1DWG",
    desc: "按机台 ID 分行自动排版、多 DWG 一键合并、按机台分组横向导出独立 DWG，跨图框对象按稳定实体锚点归属。",
  },
  {
    icon: BarChart3,
    title: "统计汇总",
    cmd: "XSTS / UNADD",
    desc: "识别机台并只比较相关回路，导出「应有 / 已框选 / 缺少」对比报告；图纸文字工程量自动汇总。",
  },
  {
    icon: Settings2,
    title: "数据源管理",
    cmd: "U1SET",
    desc: "统一设置中心：机台工作簿由用户选择、点击「刷新」时才解析进本地 SQLite 快照 —— 源文件改动不会偷偷影响图纸，所见即所得、结果可复现，保证每次输出都可追溯。",
    span: "lg:col-span-3",
  },
];

const pains = [
  { k: "机台数据不断更新", v: "图框清单要逐个对照填写" },
  { k: "电缆 / 桥架 / 软管选型", v: "全靠经验匹配固定清单" },
  { k: "多个图框批量更新", v: "改一处漏一处、难追溯" },
  { k: "每台设备单独整理 BOQ", v: "抄写核对，重复劳动" },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="为什么需要它"
          title="做设备与电气施工图时，你在反复解决同一批问题"
        />
        <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p) => (
            <div key={p.k} className="bg-background p-5">
              <p className="text-sm font-medium text-foreground">{p.k}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.v}</p>
            </div>
          ))}
        </RevealGroup>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          UNCAD Pro 以机台 Excel 为准、以图框为单位、以固定清单为约束，把「识别 →
          匹配 → 回填 → 汇总 → 输出」整合到 AutoCAD 内部完成。
        </p>

        <div className="mt-20">
          <SectionHeading eyebrow="核心能力" title="一条工作流，六个支点" />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group relative overflow-hidden rounded-xl border border-line bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-card-strong ${f.span ?? ""}`}
              >
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-card-strong text-foreground/80 transition-colors group-hover:text-foreground">
                    <f.icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <code className="rounded-md border border-line bg-card-strong px-2 py-0.5 font-mono text-[11px] text-muted">
                    {f.cmd}
                  </code>
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
