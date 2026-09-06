import { ShieldCheck, GitBranch, Undo2, Fingerprint, Eye } from "lucide-react";
import { RevealGroup } from "@/components/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const principles = [
  {
    icon: ShieldCheck,
    title: "以固定清单为唯一准绳",
    desc: "清单内嵌于程序随版本发布，未匹配项必须显式替换或删除，杜绝“看似成功实则错误”的静默输出。",
  },
  {
    icon: GitBranch,
    title: "机台数据与固定清单分离",
    desc: "机台 Excel 是输入、固定清单是约束，各自清晰，便于企业维护统一标准。",
  },
  {
    icon: Undo2,
    title: "整批事务、可靠回滚",
    desc: "写图、导出、汇总都有明确预检与事务边界，出错不影响既有图纸和更新过的新版本。",
  },
  {
    icon: Fingerprint,
    title: "统一身份与变更留痕",
    desc: "以 frameinfo_json 保存机台、设备、上下游信息与变更历史，取代靠文字猜测的低可靠做法。",
  },
  {
    icon: Eye,
    title: "严格回填、绝不臆测",
    desc: "空数据保持为空、模糊项目先询问，用户每一步都看得见最终结果。",
  },
];

export function Principles() {
  return (
    <section id="principles" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="设计原则"
          title="我们引以为傲的地方"
          desc="稳定、可追溯与工程标准化，是 UNCAD Pro 与生俱来的约束。"
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className={`rounded-xl border border-line bg-gradient-to-b from-card-strong to-transparent p-6 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <p.icon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
          <div className="flex flex-col justify-between rounded-xl border border-line bg-card p-6">
            <p className="text-sm leading-relaxed text-muted">
              面向 AutoCAD 2022（.NET Framework 4.8 / x64），通过官方 Bundle
              机制安装，装好即自动加载。覆盖前自动备份、失败自动回滚，在线授权实时校验。
            </p>
            <p className="mt-6 font-mono text-xs text-muted">
              AutoCAD 2022 · .NET 4.8 · x64 · Bundle
            </p>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
