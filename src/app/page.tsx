import { Navbar } from "@/components/site/navbar";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Hero } from "@/components/site/hero";
import { Features } from "@/components/site/features";
import { Workflow } from "@/components/site/workflow";
import { Iso } from "@/components/site/iso";
import { DemoScroll } from "@/components/site/demo-scroll";
import { SpeedRun } from "@/components/site/speed-run";
import { Commands } from "@/components/site/commands";
import { Principles } from "@/components/site/principles";
import { Faq } from "@/components/site/faq";
import { Deploy } from "@/components/site/deploy";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex-1">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SpeedRun />
        <Features />
        <Iso />
        <Workflow />
        <DemoScroll />
        <Commands />
        <Principles />
        <Deploy />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
