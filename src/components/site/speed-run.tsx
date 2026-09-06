"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function SpeedRun() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);

  // keep timer in sync with actual video playback
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setElapsed(v.currentTime);
    const onEnd = () => {
      setDone(true);
      setRunning(false);
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
    };
  }, []);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    setDone(false);
    setElapsed(0);
    setRunning(true);
    v.muted = false;
    v.play().catch(() => setRunning(false));
  };

  const reset = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setElapsed(0);
    setRunning(false);
    setDone(false);
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow blur-[140px]"
      />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              实测速度
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              传统 4 分钟 +<span className="mx-3 text-muted">vs</span>
              UNCAD <span className="font-mono">01:06</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              难度适中的图纸：传统画图 2 分钟+、填写清单 1 分钟+、整理 BOQ 1
              分钟+；用 UNCAD 一共只要 1 分 06 秒 —— 清单秒出、BOQ
              秒出，绘制一个机台更省时间，节省 75%。点击开始播放并计时。
            </p>

            {/* comparison bars */}
            <div className="mt-6 max-w-xl space-y-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-20 shrink-0 text-muted">传统方式</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                  <div className="h-full w-full rounded-full bg-muted" />
                </div>
                <span className="w-16 shrink-0 text-right font-mono text-muted">~4 分钟</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-20 shrink-0 text-foreground">UNCAD Pro</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                  <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-foreground to-muted" />
                </div>
                <span className="w-16 shrink-0 text-right font-mono text-foreground">01:06</span>
              </div>
              <p className="pt-1 text-xs text-emerald-600 dark:text-emerald-400">
                节省 75% 时间 · 清单秒出 · BOQ 秒出
              </p>
            </div>
          </div>

          {/* timer */}
          <div className="flex items-center gap-4">
            {done ? (
              <Badge className="bg-emerald-500/10 !text-emerald-600 px-4 py-2 text-lg font-semibold tracking-wide dark:!text-emerald-400">
                完成！
              </Badge>
            ) : null}
            <div
              className={`rounded-xl border px-5 py-3 font-mono text-4xl font-semibold tabular-nums tracking-tight transition-colors ${
                done
                  ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                  : running
                    ? "border-foreground/30 text-foreground"
                    : "border-line text-muted"
              }`}
            >
              {fmt(elapsed)}
            </div>
          </div>
        </div>

        {/* video + start overlay */}
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-line bg-black">
          <video
            ref={videoRef}
            className="max-h-[80vh] w-full"
            src="https://cloud.aosa.me/d/key/media/sp1.mp4"
            preload="metadata"
            playsInline
            controls={running}
          />
          {!running && !done ? (
            <button
              onClick={start}
              aria-label="开始播放并计时"
              className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-5 bg-background/60 backdrop-blur-[2px] transition-colors hover:bg-background/45"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-fg shadow-[0_0_40px_rgba(127,127,127,0.35)] transition-transform group-hover:scale-105">
                <Play className="ml-1 h-8 w-8 fill-current" />
              </span>
              <span className="text-sm font-medium text-foreground">
                开始播放 · 计时
              </span>
            </button>
          ) : null}
          {done ? (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/95 to-transparent px-6 pb-5 pt-14">
              <span className="text-lg font-semibold text-foreground">
                完成！用时 {fmt(elapsed)}
              </span>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw /> 重新计时
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
