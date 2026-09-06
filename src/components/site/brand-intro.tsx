"use client";

import { useEffect, useRef, useState } from "react";

const TAU = Math.PI * 2;
const LOGO_W = 1109;
const LOGO_H = 919;
const SVG_PATH = `M299.4 6.5 C354.6 6.2 409.8 6.4 465 6.4 471.6 6.5 478.3 5.8 484.8 7.4 497.1 10.3 508.7 19.1 512.5 31.5 515.5 41.1 516.6 51.6 514.2 61.5 509.6 79.1 504.9 96.6 499.7 114 492.8 138.1 486.1 162.2 479.2 186.2 473.2 209.3 466.1 232 460 255 437.4 336.4 414.7 417.8 392.2 499.2 380.1 540.7 369.4 582.4 357.8 624 346.5 664.5 335.3 705.1 324.6 745.8 318.8 767.3 313.4 788.9 307.3 810.3 301.2 833.1 295.5 856.1 289 878.8 286.6 887.9 282.1 896.6 275 902.9 266.8 909.9 255.5 912.3 245 911.6 180 911.6 115 911.7 50 911.6 35.7 912.1 21 904.3 14.6 891.3 9.2 880.2 10.5 867.1 13.3 855.4 19.5 830.3 27.3 805.6 34.5 780.8 37.9 768.9 41.9 757.3 45.2 745.4 57.6 703.3 70.7 661.4 83.1 619.3 89.4 599 95.2 578.5 101.5 558.2 107.8 537.8 113.7 517.3 120 496.9 131.2 461.2 141.8 425.2 153.4 389.6 167.3 344.7 181.1 299.8 195.2 255 208.9 209.5 223.8 164.4 238.1 119.2 247.9 90.1 256.5 60.7 266.7 31.8 271.6 18.1 284.5 6.8 299.4 6.5Z M581.4 6.5 C603.6 6.1 625.8 6.5 648 6.4 676.3 6.3 704.7 6.3 733 6.3 744.4 6.5 755.5 11.5 762.7 20.3 769.7 27.7 770.8 38.3 771.4 48 771.9 56.8 768.9 65.2 767.4 73.7 763.9 93.2 759.8 112.6 755.7 131.9 742.3 202.1 727.5 271.9 714.8 342.2 713.3 353.3 710.2 364.6 712.4 375.8 714.4 384.8 722 391.5 730.5 394.6 736 397 742 397.8 748 397.6 800.3 397.7 852.6 397.6 905 397.7 916.3 397.5 927.6 402.4 935.1 410.9 941.2 417.2 943.3 426 946.1 434.1 951.4 448.8 955.9 463.8 961.4 478.5 970.7 503.1 979.7 527.9 988.3 552.8 994.4 570.9 1001.5 588.5 1007.5 606.5 1016.9 630.7 1023.7 655.7 1033.2 679.7 1047.5 715.5 1061.6 751.4 1074.2 787.9 1079.6 801.9 1084 816.4 1089.7 830.3 1092.2 837 1094.7 843.7 1096.9 850.5 1100.2 861.7 1101.2 874 1097.2 885.1 1093.4 896.2 1084.1 905.2 1073.1 908.9 1065.4 911.9 1057.1 911.5 1049 911.5 900 911.7 751 911.5 602 911.6 587.4 911.6 572.4 903.7 565.7 890.4 562.2 883.5 561.4 875.6 561.9 868 563.3 852.1 567.3 836.6 570.4 820.9 579.3 777.9 588.4 734.9 598 692 613.2 625 627 557.6 642.3 490.6 643.8 482.4 646.2 474.3 647.2 466 648 460.1 646.7 453.8 643.1 449 636.6 439.6 625.4 433.8 614 433.7 572 433.6 530 433.7 488 433.7 477.7 433.8 466.6 430.3 460.2 421.8 454.1 414.7 451.5 405.2 451.5 396 451.3 388.8 453.8 382 455.3 375.1 460.9 354.9 465.8 334.5 471.1 314.2 477.1 291.9 483.8 269.8 489.6 247.4 495.9 224.2 502.1 201 508.9 177.9 513.6 160.1 518.5 142.4 523.6 124.7 530.4 99.9 537.1 75.1 544.3 50.3 546.4 43.4 547.6 36.1 550.7 29.5 555.7 17.1 567.9 7.5 581.4 6.5Z`;

/**
 * Brand intro overlay: particles fly in to form the UNSIAO logo, then the
 * wordmark settles in and the overlay fades out. Plays once per session.
 */
export function BrandIntro() {
  const [done, setDone] = useState(true);
  const [gone, setGone] = useState(true);
  const [mounted, setMounted] = useState(false);
  const fadingRef = useRef(false);
  const cleanupFnsRef = useRef<(() => void)[]>([]);

  // Phase 1: decide whether to play, then mount the overlay
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setDone(false);
    setGone(false);
    setMounted(true);
  }, []);

  // Phase 2: overlay is now in the DOM — start the animation next frame
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    const raf0 = requestAnimationFrame(() => {
      if (cancelled) return;
      try {
        startIntro();
      } catch {
        forceDone();
      }
    });

    function forceDone() {
      if (fadingRef.current) return;
      fadingRef.current = true;
      setDone(true);
      document.body.style.overflow = "";
      setTimeout(() => setGone(true), 700);
    }

    function startIntro() {
      const canvas = document.getElementById("introCanvas") as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d");
      const content = document.getElementById("introContent");
      const text = document.getElementById("introText");
      const svg = document.getElementById("introLogo") as HTMLElement;
      if (!canvas || !ctx || !content || !text || !svg) {
        forceDone();
        return;
      }

      // hard failsafe: never keep the site covered for more than 8s
      const cleanupFns = cleanupFnsRef.current;
      const failsafe = setTimeout(() => forceDone(), 8000);
      cleanupFns.push(() => clearTimeout(failsafe));

      const letters = [...text.querySelectorAll<HTMLElement>(".intro-letter")];
      const timers: number[] = [];
      const timer = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
      cleanupFns.push(() => timers.forEach(clearTimeout));

      const st = {
      running: false,
      landed: false,
      particles: [] as Particle[],
      startTime: 0,
      endTime: 0,
      mouse: { x: -9999, y: -9999, sx: -9999, sy: -9999 },
      W: 0,
      H: 0,
      logoW: 0,
      logoH: 0,
    };

    function layout() {
      st.W = innerWidth;
      st.H = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = st.W * dpr;
      canvas.height = st.H * dpr;
      canvas.style.width = st.W + "px";
      canvas.style.height = st.H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      st.logoH = Math.min(st.W, st.H) * 0.18;
      st.logoW = st.logoH * (LOGO_W / LOGO_H);
      // keep the vector SVG exactly the same size as the particle target
      svg.style.width = st.logoW + "px";
      svg.style.height = st.logoH + "px";
    }

    function computeShift() {
      const textW = text!.offsetWidth;
      const margin = parseFloat(getComputedStyle(text!).marginLeft) || 0;
      return (textW + margin) / 2;
    }

    function sampleLogo() {
      const tmp = document.createElement("canvas");
      tmp.width = st.W;
      tmp.height = st.H;
      const tctx = tmp.getContext("2d", { willReadFrequently: true })!;
      const s = st.logoH / LOGO_H;
      tctx.translate((st.W - st.logoW) / 2, (st.H - st.logoH) / 2);
      tctx.scale(s, s);
      tctx.fill(new Path2D(SVG_PATH));

      let gap = Math.sqrt((st.logoW * st.logoH * 0.38) / 2400);
      gap = Math.round(Math.min(7, Math.max(3, gap)));
      const data = tctx.getImageData(0, 0, st.W, st.H).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < st.H; y += gap) {
        for (let x = 0; x < st.W; x += gap) {
          if (data[(y * st.W + x) * 4 + 3] > 128) pts.push({ x, y });
        }
      }
      return { pts, gap };
    }

    class Particle {
      tx: number; ty: number; sx: number; sy: number; cx: number; cy: number;
      delay: number; dur: number; r: number;
      x: number; y: number; grow = 0; landAt = -1;
      constructor(tx: number, ty: number, gap: number, sweepAt: (x: number) => number) {
        this.tx = tx;
        this.ty = ty;
        const ang = Math.random() * TAU;
        const rad = Math.hypot(st.W, st.H) * (0.55 + Math.random() * 0.35);
        this.sx = st.W / 2 + Math.cos(ang) * rad;
        this.sy = st.H / 2 + Math.sin(ang) * rad;
        const mx = (this.sx + tx) / 2;
        const my = (this.sy + ty) / 2;
        const bend = (Math.random() - 0.5) * 0.8;
        this.cx = mx - (ty - this.sy) * bend;
        this.cy = my + (tx - this.sx) * bend;
        this.delay = sweepAt(tx) + Math.random() * 140;
        this.dur = 900 + Math.random() * 600;
        this.r = gap * (0.44 + Math.random() * 0.18);
        this.x = this.sx;
        this.y = this.sy;
      }
      update(now: number) {
        const t = (now - st.startTime - this.delay) / this.dur;
        this.grow = t <= 0 ? 0 : Math.min(1, t * 4);
        if (t <= 0) {
          this.x = this.sx;
          this.y = this.sy;
          return;
        }
        if (t >= 1) {
          if (this.landAt < 0) this.landAt = now;
          this.x = this.tx;
          this.y = this.ty;
          return;
        }
        const e = 1 - Math.pow(1 - t, 4);
        const a = (1 - e) * (1 - e);
        const b = 2 * (1 - e) * e;
        const c = e * e;
        this.x = a * this.sx + b * this.cx + c * this.tx;
        this.y = a * this.sy + b * this.cy + c * this.ty;
      }
    }

    function drawFrame(now: number) {
      const m = st.mouse;
      m.sx += (m.x - m.sx) * 0.22;
      m.sy += (m.y - m.sy) * 0.22;
      ctx!.clearRect(0, 0, st.W, st.H);
      const R = 90;
      const R2 = R * R;
      ctx!.fillStyle = "#0a0a0a";
      ctx!.beginPath();
      for (const p of st.particles) {
        p.update(now);
        let r = p.r * p.grow;
        if (r <= 0.05) continue;
        if (p.landAt > 0) {
          const k = 1 - (now - p.landAt) / 320;
          if (k > 0) r *= 1 + 0.9 * k;
        }
        const dx = p.x - m.sx;
        const dy = p.y - m.sy;
        const d2 = dx * dx + dy * dy;
        let x = p.x;
        let y = p.y;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1;
          const f = (R - d) / R;
          x += (dx / d) * f * f * 36;
          y += (dy / d) * f * f * 36;
        }
        ctx!.moveTo(x + r, y);
        ctx!.arc(x, y, r, 0, TAU);
      }
      ctx!.fill();
    }

    let raf = 0;
    function frame(now: number) {
      if (!st.running) return;
      drawFrame(now);
      if (!st.landed && now >= st.endTime) {
        st.landed = true;
        handoff();
      }
      raf = requestAnimationFrame(frame);
    }

    function finish() {
      if (fadingRef.current) return;
      fadingRef.current = true;
      st.running = false;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      // let the wordmark linger briefly, then reveal the site
      setTimeout(() => {
        setDone(true);
        document.body.style.overflow = "";
        setTimeout(() => setGone(true), 700);
      }, 1400);
    }

    function handoff() {
      // vector logo first, particles cleared away immediately (no double image)
      content!.classList.add("intro-active");
      canvas.classList.add("intro-hidden");
      timer(() => {
        letters.forEach((el, i) => (el.style.transitionDelay = `${0.1 + i * 0.07}s`));
        // keep the vertical -50% centering, only shift horizontally
        content!.style.transform = `translateX(calc(-50% - ${computeShift()}px)) translateY(-50%)`;
        content!.classList.add("intro-show-text");
        timer(() => letters.forEach((el) => (el.style.transitionDelay = "0s")), 1400);
      }, 450);
      timer(finish, 2100);
    }

    function start() {
      layout();
      content!.classList.remove("intro-active", "intro-show-text");
      content!.style.transform = "";
      canvas.classList.remove("intro-hidden");
      letters.forEach((el) => (el.style.transitionDelay = "0s"));

      const { pts, gap } = sampleLogo();
      if (!pts.length) {
        finish();
        return;
      }
      let minX = Infinity;
      let maxX = -Infinity;
      for (const p of pts) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
      }
      const span = Math.max(1, maxX - minX);
      const SWEEP = 650;
      const sweepAt = (tx: number) => ((tx - minX) / span) * SWEEP;
      st.particles = pts.map((pt) => new Particle(pt.x, pt.y, gap, sweepAt));
      st.startTime = performance.now() + 150;
      st.endTime = st.startTime + SWEEP + 150 + 1500 + 100;
      st.landed = false;
      st.running = true;
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      st.mouse.x = e.clientX;
      st.mouse.y = e.clientY;
    };
    const onLeave = () => {
      st.mouse.x = -9999;
      st.mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    // click anywhere on the overlay to skip
    const onClick = () => finish();
    content.addEventListener("click", onClick);
    cleanupFns.push(() => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      content.removeEventListener("click", onClick);
    });

    try {
      start();
    } catch {
      forceDone();
    }
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf0);
      cleanupFnsRef.current.forEach((fn) => fn());
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] bg-white transition-opacity duration-500"
      style={{
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
      }}
    >
      <canvas id="introCanvas" className="absolute inset-0 transition-opacity duration-500" />
      <div
        id="introContent"
        className="absolute left-1/2 top-1/2 flex items-center opacity-0 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <svg id="introLogo" viewBox="0 0 1109 919" className="block" style={{ width: 195, height: "auto" }}>
          <path fill="#0a0a0a" d={SVG_PATH} />
        </svg>
        <div
          id="introText"
          className="absolute left-full top-1/2 flex -translate-y-1/2 items-center whitespace-nowrap"
          style={{ marginLeft: "0.14em", fontSize: "min(9vw, 64px)", gap: "0.05em" }}
        >
          {"UNSIAO".split("").map((ch, i) => (
            <span
              key={i}
              className="intro-letter font-extrabold text-[#0a0a0a]"
              style={{
                opacity: 0,
                transform: "translate(0.9em, 0.15em) scale(0.85)",
                filter: "blur(9px)",
                transition:
                  "opacity 0.5s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1), filter 0.55s ease",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .intro-hidden { opacity: 0; }
        .intro-active { opacity: 1 !important; }
        .intro-show-text .intro-letter { opacity: 1 !important; transform: translate(0,0) scale(1) !important; filter: blur(0) !important; }
      `}</style>
    </div>
  );
}
