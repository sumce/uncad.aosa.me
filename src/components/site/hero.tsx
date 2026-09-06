import { HeroIntro } from "@/components/hero-intro";
import { HeroCounters } from "@/components/hero-counters";
import { HeroParallax } from "@/components/site/hero-parallax";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-28">
      {/* background grid + glow, Vercel style */}
      <div
        aria-hidden
        data-parallax-grid
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black_40%,transparent_100%)]"
      />
      <div
        aria-hidden
        data-parallax-glow
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-glow blur-[140px]"
      />
      <HeroParallax />

      <HeroIntro>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1
            data-hero-line
            style={{ opacity: 0 }}
            className="text-balance text-5xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-7xl"
          >
            画图时间最快压缩至
            <span className="font-mono"> 1 </span>分钟
            <br />
            <span className="bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
              效率提高 75%，1 人 + 1 插件 ≈ 4 人产能
            </span>
          </h1>

          <p
            data-hero-sub
            style={{ opacity: 0 }}
            className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            面向 AutoCAD 的电气/机台图快速填充与统计工具 ——
            更快地绘制 ISO 图，机台 Excel
            一键写进图框。识别 → 匹配 → 回填 → 汇总 →
            输出，全部在 AutoCAD 内部完成，显著减少人工核对与抄写错误。
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a data-hero-cta href="#download" style={{ opacity: 0 }}>
              <Button size="lg">
                获取 UNCAD Pro
              </Button>
            </a>
            <a data-hero-cta href="#iso" style={{ opacity: 0 }}>
              <Button size="lg" variant="outline">
                更快地绘制 ISO 图 →
              </Button>
            </a>
          </div>

          <HeroCounters />
        </div>
      </HeroIntro>
    </section>
  );
}
