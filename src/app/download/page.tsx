import type { Metadata } from "next";
import { Download, ShieldCheck, Undo2, KeyRound } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/reveal";
import { ContactDialog } from "@/components/site/contact-dialog";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "下载 — UNCAD Pro v2.4.2",
  description:
    "下载 UNCAD Pro v2.4.2 安装包。支持 Windows 10 及以上，仅适配 AutoCAD 2022。联系 UNSIAO.Ltd 免费体验 72 小时。",
};

const DOWNLOAD_URL =
  "https://cloud.aosa.me/d/storage/0/0/unsiaoapps/uncad/UNCAD-Pro-v2.4.2.0.zip";

const steps = [
  {
    icon: Download,
    title: "下载安装包",
    desc: "下载 UNCAD-Pro-v2.4.2.0.zip 并解压，运行内置安装器。",
  },
  {
    icon: KeyRound,
    title: "输入授权码",
    desc: "联系 UNSIAO.Ltd 获取授权码（新用户可免费体验 72 小时），安装后输入即可激活。",
  },
  {
    icon: ShieldCheck,
    title: "打开 AutoCAD",
    desc: "启动 AutoCAD 2022，UNCAD Ribbon 自动加载，按「清单 / 标注 / 统计 / 系统」分组开始使用。",
  },
];

const notes = [
  { icon: ShieldCheck, text: "覆盖安装前自动备份旧版本，升级不留后患" },
  { icon: Undo2, text: "安装失败自动回滚，不会留下不可用的 AutoCAD" },
  { icon: KeyRound, text: "在线授权实时校验，U1A 随时查看版本与授权状态" },
];

export default function DownloadPage() {
  return (
    <div className="flex-1">
      <Navbar />
      <main className="pt-28 pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            divider={false}
            eyebrow="下载"
            title="UNCAD Pro v2.4.2"
            desc="Bundle 机制安装，装好即自动加载，无需开发环境。在线授权，输入授权码即可使用。"
          />

          {/* download card */}
          <Reveal className="mt-10">
            <div className="relative overflow-hidden rounded-2xl bg-card p-8 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-sm text-foreground">
                    UNCAD-Pro-v2.4.2.0.zip
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    2026-09-06 发布 · 批量性能优化 · 旧版 frame 图框兼容 · 更新自动弹窗
                  </p>
                </div>
                <a href={DOWNLOAD_URL} download className="shrink-0">
                  <Button size="lg">
                    <Download /> 下载安装包
                  </Button>
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Windows 10 及以上", "AutoCAD 2022", ".NET Framework 4.8", "x64"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-card-strong px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          {/* trial CTA */}
          <Reveal className="mt-4">
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line p-8 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  免费体验 72 小时
                </h3>
                <p className="mt-1 text-sm text-muted">
                  联系 UNSIAO.Ltd 获取体验授权，用你们自己的图纸实测效率 ——
                  画图时间最快压缩至 1 分钟，效率提高 75%。
                </p>
              </div>
              <ContactDialog
                title="联系 UNSIAO.Ltd · 免费体验 72 小时"
                description="留下联系方式即可开通 72 小时全功能体验授权。"
              >
                <Button size="lg" className="shrink-0">
                  联系 UNSIAO.Ltd 免费体验 72 小时
                </Button>
              </ContactDialog>
            </div>
          </Reveal>

          {/* install steps */}
          <div className="mt-16">
            <SectionHeading eyebrow="安装步骤" title="三步跑起来" divider={false} />
            <Reveal className="mt-8 grid gap-4 lg:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.title} className="relative overflow-hidden rounded-xl bg-card p-6">
                  <span className="pointer-events-none absolute -right-2 -top-4 font-mono text-7xl font-bold text-foreground/[0.05]">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* reliability notes */}
          <Reveal className="mt-10">
            <div className="space-y-2.5 rounded-xl border border-line px-6 py-5">
              {notes.map((n) => (
                <p key={n.text} className="flex items-center gap-3 text-sm text-muted">
                  <n.icon className="h-4 w-4 shrink-0 text-foreground/60" />
                  {n.text}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
