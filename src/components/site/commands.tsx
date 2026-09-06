"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const groups: {
  value: string;
  label: string;
  items: { cmd: string; name: string; desc: string }[];
}[] = [
  {
    value: "boq",
    label: "清单与输出",
    items: [
      { cmd: "U1F", name: "清单生成", desc: "读取机台数据，在空图框内生成 CAD 清单，并同步输出 BOQ Excel。" },
      { cmd: "U1U", name: "清单更新", desc: "对已填图框按机台现状批量更新，保留已确认的数量与型号，任一失败整批回滚。" },
      { cmd: "U1S", name: "当前图框提交", desc: "只读图框，把清单项、数量与米数独立重复提交到 BOQ，不修改图纸。" },
      { cmd: "U1DWG", name: "DWG 自动导出", desc: "选中图框按机台 ID 分组横向排列，导出为独立 DWG 文件。" },
      { cmd: "U1SET", name: "配置中心", desc: "集中设置数据源、绘图、统计与输出参数，是全部功能的统一设置入口。" },
    ],
  },
  {
    value: "layout",
    label: "排版与统计",
    items: [
      { cmd: "XLAYOUT", name: "图框自动排版", desc: "把多个图框按机台 ID 分行自动排版，同机台同行、不同机台换行。" },
      { cmd: "Xmerge", name: "DWG 批量合并", desc: "拖入多个 DWG 或文件夹，一键合并到当前图纸，源文件只读不动。" },
      { cmd: "XSTS", name: "机台回路统计", desc: "识别机台并比较已框选 / 应有 / 缺少回路，导出 .xlsx 统计报告。" },
      { cmd: "UNADD", name: "文字统计汇总", desc: "统计图纸 TEXT/MTEXT 中的电缆、桥架与线管工程量，生成统计 MTEXT。" },
      { cmd: "U1A / U1HELP", name: "关于与帮助", desc: "查看版本、构建时间、在线授权状态，或全部命令的用法与注意事项。" },
    ],
  },
  {
    value: "draw",
    label: "绘图与标注",
    items: [
      { cmd: "U1L", name: "带标注线段", desc: "连续绘制独立线段并自动生成长度文字，回车结束、U 撤销上一段。" },
      { cmd: "U1LX", name: "快速标注距离", desc: "沿连通线路逐段填写真实毫米距离，回车写入并跳到下一段。" },
      { cmd: "U1C", name: "线管标注", desc: "为选中曲线生成 2000mm 占位的线管平行标注，可同步软管型号与长度。" },
      { cmd: "U1R", name: "拱桥开洞", desc: "在线段交叉处生成拱桥式开洞，两侧直线与半圆弧合并为一条 Polyline。" },
      { cmd: "U1Q1 / U1Q2 / U1Q4", name: "桥架标注", desc: "为桥架曲线生成 100 / 200 / 400mm 平行标注，内容统一为“型号 + 总长度”。" },
    ],
  },
];

const legacy = [
  ["UNL", "U1L", "带标注线段"],
  ["UNLX", "U1LX", "快速标注距离"],
  ["UNR", "U1R", "拱桥开洞"],
  ["UNQ1", "U1Q1", "100mm 桥架标注"],
  ["UNQ2", "U1Q2", "200mm 桥架标注"],
  ["UNQ4", "U1Q4", "400mm 桥架标注"],
  ["UNADD", "—", "文字统计汇总"],
];

export function Commands() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      groups.map((g) => ({
        ...g,
        items: g.items.filter(
          (it) =>
            !q ||
            it.cmd.toLowerCase().includes(q) ||
            it.name.includes(q) ||
            it.desc.includes(q)
        ),
      })),
    [q]
  );
  const total = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="commands" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="命令总览"
            title="24 个命令，17 个新版 + 7 个传统兼容"
            desc="新版命令固定使用 U1 前缀，传统命令保留 UN 前缀，行为一致。Ribbon 按「清单 / 标注 / 统计 / 系统」分组，也保留键盘入口。"
          />
          {/* search */}
          <Reveal className="shrink-0">
            <div className="flex h-10 w-full items-center gap-2 rounded-full border border-line bg-card px-4 sm:w-64">
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索命令或功能…"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  aria-label="清空搜索"
                  className="cursor-pointer text-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
            <p className="mt-2 text-right font-mono text-[11px] text-muted">
              {q ? `${total} 个匹配` : ""}
            </p>
          </Reveal>
        </div>

        {q ? (
          /* search mode: flat results */
          <div className="mt-10 divide-y divide-line overflow-hidden rounded-xl border border-line">
            {filtered.flatMap((g) =>
              g.items.map((it) => (
                <div
                  key={it.cmd}
                  className="grid gap-2 bg-card px-5 py-4 transition-colors hover:bg-card-strong sm:grid-cols-[220px_1fr] sm:gap-6"
                >
                  <code className="font-mono text-sm text-foreground">{it.cmd}</code>
                  <div>
                    <span className="text-sm font-medium text-foreground">{it.name}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{it.desc}</span>
                  </div>
                </div>
              ))
            )}
            {total === 0 ? (
              <div className="bg-card px-5 py-10 text-center text-sm text-muted">
                没有匹配「{query}」的命令
              </div>
            ) : null}
          </div>
        ) : (
          <Reveal className="mt-12">
            <Tabs defaultValue="boq">
              <TabsList className="flex flex-wrap gap-1 rounded-full border border-line bg-card p-1">
                {groups.map((g) => (
                  <TabsTrigger
                    key={g.value}
                    value={g.value}
                    className="rounded-full px-4 py-1.5 text-sm text-muted transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-fg data-[state=active]:font-medium"
                  >
                    {g.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {groups.map((g) => (
                <TabsContent key={g.value} value={g.value} className="mt-6">
                  <div className="divide-y divide-line overflow-hidden rounded-xl border border-line">
                    {g.items.map((it) => (
                      <div
                        key={it.cmd}
                        className="grid gap-2 bg-card px-5 py-4 transition-colors hover:bg-card-strong sm:grid-cols-[220px_1fr] sm:gap-6"
                      >
                        <code className="font-mono text-sm text-foreground">{it.cmd}</code>
                        <div>
                          <span className="text-sm font-medium text-foreground">{it.name}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">
                            {it.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Reveal>
        )}

        {/* legacy commands table */}
        <Reveal delay={0.05} className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              传统兼容命令（键盘入口）
            </p>
            <a
              href="/commands"
              className="text-xs font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              查看完整命令概述 →
            </a>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {legacy.map(([old, now, name]) => (
              <div key={old} className="bg-background p-4">
                <p className="font-mono text-sm text-foreground">{old}</p>
                <p className="mt-1 text-xs text-muted">
                  {now === "—" ? name : (
                    <>
                      ↔ <code className="font-mono">{now}</code> · {name}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Ribbon 若被隐藏，执行 AutoCAD 原生命令 RIBBON 即可恢复；若提示“未知命令”，重新运行当前版本的安装器。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
