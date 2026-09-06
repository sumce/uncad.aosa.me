"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const faqs = [
  {
    q: "安装后 AutoCAD 里没有 Ribbon？",
    a: "UNCAD Pro 通过 AutoCAD 官方 Bundle 机制安装，装好即自动加载。若 Ribbon 被隐藏，执行 AutoCAD 原生命令 RIBBON 即可恢复；若提示“未知命令”，重新运行当前版本的安装器。",
  },
  {
    q: "修改了机台 Excel，为什么命令读到的还是旧数据？",
    a: "这是设计使然。机台工作簿只在 U1SET 中点击“刷新”时才解析进本地 SQLite 快照，源文件改动不会偷偷影响图纸，保证所见即所得、结果可复现。",
  },
  {
    q: "型号匹配不到固定清单会怎样？",
    a: "程序会集中询问，要求你选择替代型号或明确删除该行，绝不静默猜写，也不会生成“无来源”的材料。确认后才在一个 CAD 事务中写入。",
  },
  {
    q: "批量更新多个图框时其中一个失败了怎么办？",
    a: "整批回滚。U1F / U1U 等写图命令都在一个 CAD 事务中提交，任一写入失败整批回滚，不留半成品数据，既有图纸不受影响。",
  },
  {
    q: "U1S 和 U1F / U1U 有什么区别？",
    a: "U1S 是只读命令：不修改 CAD、不读取机台数据 Excel，只把现有图框的清单项、数量和米数独立重复提交到 BOQ，适合单独补交。",
  },
  {
    q: "软管直径和长度从哪里来？",
    a: "直径由电缆型号对照表推导，长度取自图纸内的动态块。口径统一、来源可追溯，写进 BOQ 与图纸标注的是同一套数据。",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            eyebrow="常见问题"
            title="安装、数据与可靠性"
            desc="更多细节可执行 U1HELP 查看全部命令的帮助页。"
          />
          <Reveal>
            <Accordion type="single" collapsible className="divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-0">
                  <AccordionTrigger className="py-5 text-left text-[15px] font-medium text-foreground hover:no-underline [&[data-state=open]>svg]:text-muted">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
