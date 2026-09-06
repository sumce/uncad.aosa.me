import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UNCAD Pro — AutoCAD 电气/机台图快速填充与统计工具",
  description:
    "UNSIAO.Ltd 出品的 AutoCAD 2022 专业插件集：机台 Excel 一键写进 CAD 图框，自动生成 BOQ、统计工程量并导出成果文件。",
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.setAttribute("data-theme","dark");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
