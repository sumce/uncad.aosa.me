import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "命令概述 — UNCAD Pro",
  description: "UNCAD Pro 全部 24 个命令的用途、使用方法与注意事项。",
};

type Cmd = {
  cmd: string;
  name: string;
  purpose: string;
  usage: string[];
  note?: string;
};

const groups: { id: string; label: string; cmds: Cmd[] }[] = [
  {
    id: "boq",
    label: "清单与输出",
    cmds: [
      {
        cmd: "U1F",
        name: "清单生成",
        purpose: "读取机台数据与图纸统计，在空图框内生成 CAD 清单，并同步输出 BOQ Excel。",
        usage: [
          "先在 U1SET 选择机台工作簿并点击「刷新」，把数据导入本机 SQLite 快照（未刷新前命令不可用）；",
          "框选或点选目标 frame 图框；",
          "执行 U1F，程序做字段、容量与固定清单预检；",
          "在「填充确认」窗口逐行核对自动匹配的设备、电缆、桥架、线管、软管、断路器、插座等，可修改数量、替换电缆型号或删除行；",
          "确认后在单一 CAD 事务中写入，成功后自动输出 [BOQ]机台ID.xlsx 并在命令行显示路径。",
        ],
        note: "未匹配到固定清单的项目必须选择替代或明确删除，程序不会静默猜测提交。",
      },
      {
        cmd: "U1U",
        name: "清单更新",
        purpose: "对已填图框按机台现状批量更新，保留用户已确认的数量与型号。",
        usage: [
          "选择一个或多个已填图框；",
          "执行 U1U，程序从图框/设备块自动读取机台 ID 与设备名并定位 Excel 回路；",
          "多图框先统一预检，再使用一个 CAD 事务写入，任一失败整批回滚；",
          "更新后自动同步 BOQ；批量遇到未匹配固定清单的项目会一次性询问。",
        ],
        note: "重复更新按「机台 ID + 设备」覆盖，不追加重复记录；插座数量按动态块状态保留，不因更新而擅自改写。",
      },
      {
        cmd: "U1S",
        name: "当前图框提交",
        purpose: "只读一个或多个图框，把清单项目编码、单位、数量（含 M 米数）独立重复提交到 BOQ Excel。",
        usage: ["选择一个或多个当前图框；", "执行 U1S，程序直接读取图框与当前清单并写入按机台输出的 BOQ；", "命令行显示提交记录数与文件路径。"],
        note: "不修改 CAD、不读取机台数据 Excel，适合独立重复提交现有图框状态。",
      },
      {
        cmd: "U1DWG",
        name: "DWG 自动导出",
        purpose: "把选中的多个图框按机台 ID 分组，横向排列导出为独立 DWG。",
        usage: ["框选要导出的多个 frame 图框；", "执行 U1DWG；", "输出到 U1SET 设置的「自动记录文件夹」下的 机台ID\\机台ID.dwg，同机台设备框横向排列、间距固定，首框左侧带机台 ID 标题与版本信息。"],
        note: "跨图框的对象按稳定实体锚点归属，不会因外包框相交而误判。",
      },
      {
        cmd: "U1SET",
        name: "配置中心",
        purpose: "集中设置绘图、统计、清单与输出参数，是全部功能的统一设置入口。",
        usage: [
          "执行 U1SET 打开页签式窗口；",
          "在「Excel 数据」选择本地或 HTTP/HTTPS 机台工作簿，点击「刷新」导入快照，并设置自动记录文件夹；",
          "在「线段 / 桥架 / 拱桥 / 统计」等页签调整文字样式、桥架规格、软管占位、端块颜色、统计分类等；",
          "保存时程序会验证路径与数值范围。",
        ],
        note: "修改源 Excel 后必须再次手动点击「刷新」，命令才会读到新数据。",
      },
    ],
  },
  {
    id: "layout",
    label: "排版与统计",
    cmds: [
      {
        cmd: "XLAYOUT",
        name: "图框自动排版",
        purpose: "把选中的多个图框按机台 ID 分行自动排版。",
        usage: ["多选要排版的图框；", "执行 XLAYOUT，鼠标点击指定排版左上角位置（直接回车使用原点）；", "同机台图框放在同一行、不同机台换行，横纵间距固定，每行首框左侧生成高度 25000 的机台 ID 文字；", "排版完成弹出 GUI，显示每个机台及其对应回路数量。"],
        note: "图框移动与机台 ID 文字在同一事务提交，任一失败整体回滚。",
      },
      {
        cmd: "Xmerge",
        name: "DWG 批量合并",
        purpose: "把多个 DWG（或文件夹）一次性合并到当前图纸。",
        usage: ["执行 Xmerge 打开拖放选择窗口；", "拖入 DWG 文件或文件夹（自动递归展开所有子目录）；", "确认后按 XLAYOUT 间距规则导入当前活动图纸。"],
        note: "源文件只读、不会被修改。",
      },
      {
        cmd: "XSTS",
        name: "机台回路统计",
        purpose: "统计图纸中机台，并导出「应有 / 已框选 / 缺少」回路对比报告。",
        usage: ["执行 XSTS 并框选要统计的机台图框；", "程序先识别机台 ID，再只比较这些机台的已框选、应有与缺少回路；", "导出 .xlsx 统计报告。"],
        note: "不会把未框选的机台计入「应有」回路；期望回路优先读取 U1SET 配置的机台 Excel。",
      },
      {
        cmd: "UNADD",
        name: "文字统计汇总",
        purpose: "统计图纸 TEXT/MTEXT 中的电缆、桥架与线管工程量，并在图中生成统计 MTEXT。",
        usage: ["执行 UNADD，框选统计范围（或按设置处理全部可见文字）。"],
        note: "统计来源与分类可在 U1SET → 统计汇总 中分别开关（单行文字 / 多行文字 / 电缆 / 桥架 / 线管）；严格整行匹配，备注类文字不会误计。",
      },
      {
        cmd: "U1A / U1HELP",
        name: "关于与帮助",
        purpose: "U1A 查看软件版本、构建时间、在线授权状态、开发者与使用条款；U1HELP 显示全部公开命令的功能、用法与注意事项。",
        usage: ["执行 U1A 打开「关于」窗口（只读）；", "执行 U1HELP 查看帮助页（只读）。"],
      },
    ],
  },
  {
    id: "draw",
    label: "绘图与标注",
    cmds: [
      {
        cmd: "U1L",
        name: "带标注线段",
        purpose: "连续绘制独立的 Line 线段，并为每段生成长度文字。",
        usage: ["如同 AutoCAD L 命令——点击起点后连续点击各端点；", "回车结束、输入 U 撤销上一段、Esc 全部清除。"],
        note: "长度设置必须为正毫米数，非法值回退为 2000mm。",
      },
      {
        cmd: "U1LX",
        name: "快速标注距离",
        purpose: "为已有的 U1L 线路逐段填写真实毫米距离。",
        usage: ["点选一根 Line 线段，程序沿连通路线从点击端起逐段提示；", "输入真实毫米距离后回车即写入并自动跳到下一段；", "直接回车保留原值，Esc 结束；点击在段中部时会询问向哪一端走。"],
        note: "适用于沿连通线路连续标注真实长度。",
      },
      {
        cmd: "U1C",
        name: "线管标注",
        purpose: "为选中曲线生成线管平行标注。",
        usage: ["框选曲线后执行 U1C，生成固定 2000mm 占位的线管标注。"],
        note: "若预先选中软管动态块或图框，会同步写入软管型号与长度。",
      },
      {
        cmd: "U1R",
        name: "拱桥开洞",
        purpose: "在线段交叉位置生成拱桥式开洞。",
        usage: ["选中交叉处的相关直线并执行 U1R；", "生成后两侧直线与半圆弧合并为一条 Polyline。"],
        note: "拱桥直径在 U1SET 中设置。",
      },
      {
        cmd: "U1Q1 / U1Q2 / U1Q4",
        name: "桥架标注（100 / 200 / 400 mm）",
        purpose: "为选中的曲线生成对应宽度的桥架平行标注。",
        usage: ["选中桥架曲线后执行对应的 U1Q1、U1Q2 或 U1Q4。"],
        note: "标注内容统一为「桥架型号 + 总长度 mm」。",
      },
    ],
  },
];

const legacy: [string, string, string][] = [
  ["UNL", "U1L", "带标注线段"],
  ["UNLX", "U1LX", "快速标注距离"],
  ["UNR", "U1R", "拱桥开洞"],
  ["UNQ1", "U1Q1", "100mm 桥架标注"],
  ["UNQ2", "U1Q2", "200mm 桥架标注"],
  ["UNQ4", "U1Q4", "400mm 桥架标注"],
  ["UNADD", "—", "文字统计汇总"],
];

export default function CommandsPage() {
  return (
    <div className="flex-1">
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            divider={false}
            eyebrow="命令概述"
            title="24 个命令的用途、用法与注意事项"
            desc="新版命令固定使用 U1 前缀，传统命令保留 UN 前缀，行为一致。安装后打开 AutoCAD 加载 UNCAD Ribbon，按「清单 / 标注 / 统计 / 系统」分组展示任务入口。"
          />

          {/* group nav */}
          <Reveal className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-line bg-card px-4 py-1.5 text-sm text-muted transition-colors hover:bg-card-strong hover:text-foreground"
              >
                {g.label}
              </a>
            ))}
          </Reveal>

          {groups.map((g) => (
            <section key={g.id} id={g.id} className="mt-16 scroll-mt-24">
              <h2 className="text-xl font-medium tracking-tight text-foreground">
                {g.label}
              </h2>
              <div className="mt-6 space-y-4">
                {g.cmds.map((c) => (
                  <Reveal key={c.cmd}>
                    <article className="rounded-2xl bg-card p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <code className="rounded-md bg-card-strong px-2.5 py-1 font-mono text-sm text-foreground">
                          {c.cmd}
                        </code>
                        <h3 className="text-base font-semibold tracking-tight text-foreground">
                          {c.name}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                        <span className="font-medium text-muted">用途：</span>
                        {c.purpose}
                      </p>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-muted">使用方法</p>
                        <ol className="mt-2 space-y-1.5">
                          {c.usage.map((u, i) => (
                            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                              <span className="mt-[7px] font-mono text-[11px] text-muted/60">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {u}
                            </li>
                          ))}
                        </ol>
                      </div>
                      {c.note ? (
                        <p className="mt-4 rounded-lg bg-card-strong px-4 py-3 text-xs leading-relaxed text-muted">
                          <span className="font-medium text-foreground">注意</span>
                          <span className="mx-2 text-muted/50">·</span>
                          {c.note}
                        </p>
                      ) : null}
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}

          {/* legacy table */}
          <section className="mt-16 pb-28">
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              传统兼容命令（键盘入口）
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {legacy.map(([old, now, name]) => (
                <div key={old} className="bg-background p-4">
                  <p className="font-mono text-sm text-foreground">{old}</p>
                  <p className="mt-1 text-xs text-muted">
                    {now === "—" ? (
                      name
                    ) : (
                      <>
                        ↔ <code className="font-mono">{now}</code> · {name}
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Ribbon 若被隐藏，执行 AutoCAD 原生命令 RIBBON 恢复；若提示「未知命令」，重新运行当前版本的安装器。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
