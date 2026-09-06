import type { Metadata } from "next";
import { Check, Minus, Download } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup } from "@/components/reveal";
import { ContactDialog } from "@/components/site/contact-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "套餐 — UNCAD Pro",
  description:
    "UNCAD Free / Plus / Pro / Enterprise 四档套餐：从免费入门到全功能 + 定制开发（买断制）。",
};

type Plan = {
  name: string;
  tagline: string;
  highlight?: boolean;
  cta: "download" | "contact";
  features: { ok: boolean; text: string }[];
};

const plans: Plan[] = [
  {
    name: "UNCAD Free",
    tagline: "入门首选，永久免费",
    cta: "download",
    features: [
      { ok: true, text: "U1L 带标注线段" },
      { ok: true, text: "U1Q* 桥架标注（100/200/400mm）" },
      { ok: true, text: "U1U 清单更新" },
      { ok: true, text: "U1F 清单生成" },
      { ok: false, text: "其余 U1 命令与统计工具" },
    ],
  },
  {
    name: "UNCAD Plus",
    tagline: "清单工作流完整体验",
    cta: "contact",
    features: [
      { ok: true, text: "含 Free 全部能力" },
      { ok: true, text: "U1S / U1DWG / U1SET / U1R / U1C" },
      { ok: true, text: "U1LX 快速标注距离" },
      { ok: true, text: "自动 BOQ 输出" },
      { ok: false, text: "X 系列命令不可用（XLAYOUT / Xmerge / XSTS）" },
    ],
  },
  {
    name: "UNCAD Pro",
    tagline: "全部 24 个命令",
    highlight: true,
    cta: "contact",
    features: [
      { ok: true, text: "含 Plus 全部能力" },
      { ok: true, text: "XLAYOUT 图框自动排版" },
      { ok: true, text: "Xmerge DWG 批量合并" },
      { ok: true, text: "XSTS 机台回路统计 + UNADD 文字汇总" },
      { ok: true, text: "在线授权 · 实时校验" },
    ],
  },
  {
    name: "UNCAD Enterprise",
    tagline: "全功能 + 定制开发（买断制）",
    cta: "contact",
    features: [
      { ok: true, text: "全功能支持，等同 Pro" },
      { ok: true, text: "定制命令与专属工作流开发" },
      { ok: true, text: "买断制授权，一次付费长期使用" },
      { ok: true, text: "优先技术支持与版本适配" },
      { ok: true, text: "适合团队 / 企业级统一标准部署" },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="flex-1">
      <Navbar />
      <main className="pt-28 pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            divider={false}
            eyebrow="套餐"
            title="从免费入门到企业定制"
            desc="四档套餐按需选择，所有套餐共享同一安装包与固定清单标准。具体价格与开通方式请联系 UNSIAO.Ltd。"
          />

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6",
                  p.highlight
                    ? "border-foreground/30 bg-card shadow-xl shadow-black/5"
                    : "border-line bg-card"
                )}
              >
                {p.highlight ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-[11px] font-medium text-primary-fg">
                    最受欢迎
                  </span>
                ) : null}
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {p.name}
                </h2>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f.text} className="flex gap-2.5 text-sm leading-relaxed">
                      {f.ok ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted/50" />
                      )}
                      <span className={f.ok ? "text-foreground/85" : "text-muted/70"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {p.cta === "download" ? (
                    <a href="/download" className="block">
                      <Button variant="outline" className="w-full">
                        <Download /> 免费下载
                      </Button>
                    </a>
                  ) : (
                    <ContactDialog
                      title={`联系 UNSIAO.Ltd · 开通 ${p.name}`}
                      description={
                        p.name === "UNCAD Enterprise"
                          ? "定制开发与买断制授权方案，欢迎洽谈。"
                          : p.name === "UNCAD Plus"
                            ? "开通 Plus 或先免费体验 72 小时。"
                            : "开通 Pro 或先免费体验 72 小时。"
                      }
                    >
                      <Button
                        variant={p.highlight ? "default" : "outline"}
                        className="w-full"
                      >
                        联系开通
                      </Button>
                    </ContactDialog>
                  )}
                </div>
              </div>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <p className="rounded-xl border border-line px-5 py-4 text-xs leading-relaxed text-muted">
              说明：各套餐均支持 Windows 10 及以上 + AutoCAD 2022，通过同一安装包安装，按授权码解锁对应命令。
              企业版定制开发按需求评估，交付包含专属命令、安装包与技术文档。价格与试用（新用户可免费体验
              72 小时）请联系 UNSIAO.Ltd。
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
