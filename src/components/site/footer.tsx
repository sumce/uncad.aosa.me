import Link from "next/link";

const cols = [
  {
    title: "清单与输出",
    links: [
      ["U1F 清单生成", "#commands"],
      ["U1U 清单更新", "#commands"],
      ["U1S 图框提交", "#commands"],
      ["U1DWG 导出 DWG", "#commands"],
      ["U1SET 配置中心", "#commands"],
    ],
  },
  {
    title: "排版与统计",
    links: [
      ["XLAYOUT 自动排版", "#commands"],
      ["Xmerge 批量合并", "#commands"],
      ["XSTS 回路统计", "#commands"],
      ["UNADD 文字汇总", "#commands"],
    ],
  },
  {
    title: "资源",
    links: [
      ["命令概述（完整）", "/commands"],
      ["效率统计图", "/stats"],
      ["常见问题", "/#faq"],
      ["工作流说明", "/#workflow"],
      ["实测速度", "/#demo"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="#" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/unsiao.svg" alt="UNSIAO" className="h-5 w-auto" />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                UNSIAO Work<sup className="text-[9px] font-normal">™</sup>
              </span>
              <span className="text-sm font-light text-muted">|</span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                UNCAD
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">
              面向 AutoCAD 电气/设备设计团队的效率工具，注重稳定、可追溯与工程标准化。
              UNSIAO.Ltd 开发维护。
            </p>
            <p className="mt-4 font-mono text-xs text-muted">
              AutoCAD 2022 · .NET 4.8 · x64 · Bundle
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {c.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-xs text-muted transition-colors hover:text-foreground">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} UNSIAO.Ltd. 保留所有权利。
          </p>
          <a
            href="https://www.unsiao.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted transition-colors hover:text-foreground"
          >
            www.unsiao.com ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
