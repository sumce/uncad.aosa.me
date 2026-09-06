import { PackageCheck, DatabaseBackup, KeyRound } from "lucide-react";
import { RevealGroup } from "@/components/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const steps = [
  {
    icon: PackageCheck,
    title: "Bundle 安装，即装即用",
    desc: "通过 AutoCAD 官方 Bundle 机制分发，双击安装后打开 AutoCAD 自动加载 UNCAD Ribbon，无需配置开发环境。",
    tags: ["AutoCAD 2022", ".NET Framework 4.8", "x64"],
  },
  {
    icon: DatabaseBackup,
    title: "覆盖前备份，失败自动回滚",
    desc: "内置安装 / 卸载与校验脚本：升级覆盖前自动备份旧版本，安装失败自动回滚，不会留下不可用的 AutoCAD。",
    tags: ["校验脚本", "自动备份", "失败回滚"],
  },
  {
    icon: KeyRound,
    title: "在线授权，实时校验",
    desc: "客户输入授权码即可使用，授权状态在线实时校验；执行 U1A 随时查看版本、构建时间与授权状态。",
    tags: ["授权码激活", "实时校验", "U1A 查询"],
  },
];

export function Deploy() {
  return (
    <section id="deploy" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="部署与授权"
          title="十分钟内跑起来"
          desc="下载安装包 → 输入授权码 → 打开 AutoCAD 开始使用。Ribbon 按「清单 / 标注 / 统计 / 系统」分组，传统键盘命令同样保留。"
        />
        <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative overflow-hidden rounded-xl border border-line bg-card p-6"
            >
              <span className="pointer-events-none absolute -right-2 -top-4 font-mono text-7xl font-bold text-foreground/[0.05]">
                {i + 1}
              </span>
              <s.icon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line bg-card-strong px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
