"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#features", label: "核心能力" },
  { href: "/#iso", label: "ISO 绘图" },
  { href: "/#workflow", label: "工作流" },
  { href: "/commands", label: "命令概述" },
  { href: "/stats", label: "统计图" },
  { href: "/pricing", label: "套餐" },
  { href: "/#faq", label: "常见问题" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setTheme(t === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "切换到亮色主题" : "切换到暗色主题"}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-card-strong hover:text-foreground"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="#" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/unsiao.svg" alt="UNSIAO" className="h-5 w-auto" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            UNSIAO Work<sup className="text-[9px] font-normal">™</sup>
          </span>
          <span className="text-neutral-400/60 text-sm font-light">|</span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            UNCAD
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) =>
            l.href.startsWith("/#") || l.href === "/commands" || l.href === "/stats" ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-foreground">
                {l.label}
              </a>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="/download" className="hidden sm:block">
            <Button size="sm" variant="outline">
              下载
            </Button>
          </a>
          <a href="#download">
            <Button size="sm">获取授权</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
