import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Cta() {
  return (
    <section id="download" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-card px-8 py-16 text-center sm:px-16 sm:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow blur-[100px]"
            />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-muted">
              在线授权 · 实时校验
            </p>
            <h2 className="relative mx-auto mt-4 max-w-2xl text-balance text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              今天就让清单不再逐行手抄
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted">
              客户输入授权码即可使用 UNCAD Pro。安装器内置安装/卸载与校验脚本，
              覆盖前自动备份、失败自动回滚。
            </p>
            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg">联系 UNSIAO.Ltd 获取授权</Button>
              <a href="https://www.unsiao.com" target="_blank" rel="noreferrer">
                <Button size="lg" variant="ghost">
                  访问 www.unsiao.com ↗
                </Button>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
