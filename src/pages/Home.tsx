import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import GitSection from "@/components/GitSection";
import CICDSection from "@/components/CICDSection";
import DockerSection from "@/components/DockerSection";
import KubernetesSection from "@/components/KubernetesSection";
import CloudModelsSection from "@/components/CloudModelsSection";
import CloudProvidersSection from "@/components/CloudProvidersSection";
import IaCSection from "@/components/IaCSection";
import MonitoringSection from "@/components/MonitoringSection";
import SecuritySection from "@/components/SecuritySection";
import QuizSection from "@/components/QuizSection";
import TerminalSection from "@/components/TerminalSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      const sections = ["intro","git","cicd","docker","kubernetes","cloud-models","cloud-providers","iac","monitoring","security","quiz","terminal"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <IntroSection />
        <GitSection />
        <CICDSection />
        <DockerSection />
        <KubernetesSection />
        <CloudModelsSection />
        <CloudProvidersSection />
        <IaCSection />
        <MonitoringSection />
        <SecuritySection />
        <QuizSection />
        <TerminalSection />
      </main>
      <Footer />
    </div>
  );
}
