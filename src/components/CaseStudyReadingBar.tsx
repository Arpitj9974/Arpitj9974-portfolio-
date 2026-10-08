import React, { useState, useEffect } from "react";
import { ArrowLeft, FileText, Check, Link2, Sparkles } from "lucide-react";

interface CaseStudyReadingBarProps {
  title: string;
  year: string;
  category: string;
  mode: "narrative" | "prd";
  onSwitchMode: (mode: "narrative" | "prd") => void;
  onClose: () => void;
}

const SECTIONS = [
  { id: "cs-problem", label: "01 Problem" },
  { id: "cs-solution", label: "02 Architecture" },
  { id: "cs-metrics", label: "03 Metrics" },
  { id: "cs-deepdive", label: "04 Deep-Dive" }
];

export default function CaseStudyReadingBar({
  title,
  year,
  category,
  mode,
  onSwitchMode,
  onClose
}: CaseStudyReadingBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("01 Problem");
  const [isScrolledPastHeader, setIsScrolledPastHeader] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Track scroll depth percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setIsScrolledPastHeader(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (mode === "prd") {
      setActiveSection("1-Page PRD");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = SECTIONS.find((s) => s.id === entry.target.id);
            if (found) {
              setActiveSection(found.label);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
      }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mode]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      {/* 1. Ultra-thin fixed top progress bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-ink/10 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-accent transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Floating wayfinding HUD capsule (appears when scrolled past main hero) */}
      <aside 
        aria-label="Case study reading navigation"
        className={`fixed bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:max-w-3xl z-40 bg-paper/95 backdrop-blur-md border border-ink/20 shadow-lg py-2 px-3 sm:px-4 rounded-xs transition-all duration-250 ease-out transform ${
          isScrolledPastHeader 
            ? "translate-y-0 opacity-100" 
            : "translate-y-16 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-6 font-mono text-xs">
          
          {/* Left: Quick Back button & Title/Section indicator */}
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <button
              onClick={onClose}
              className="px-2 py-1 bg-surface-container hover:bg-accent hover:text-paper border border-ink/10 text-ink transition-colors cursor-pointer shrink-0 rounded-xs flex items-center gap-1 font-bold text-[10px]"
              title="Return to Projects Catalog"
            >
              <ArrowLeft size={12} />
              <span className="hidden sm:inline">PROJECTS</span>
            </button>
            <span className="font-bold text-ink truncate uppercase text-[11px] max-w-[120px] sm:max-w-[200px]">
              {title}
            </span>
            <span className="text-muted/60 hidden sm:inline">/</span>
            <span className="text-accent font-bold tracking-wider shrink-0 uppercase text-[10px] hidden sm:inline">
              {activeSection}
            </span>
          </div>

          {/* Right: Mode switcher & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* PRD vs Narrative Switcher */}
            <div className="flex items-center border border-ink/10 p-0.5 bg-surface-container/60 rounded-xs">
              <button
                onClick={() => onSwitchMode("narrative")}
                className={`px-2 py-0.5 text-[10px] tracking-wider transition-all cursor-pointer rounded-xs ${
                  mode === "narrative" 
                    ? "bg-ink text-paper font-bold shadow-xs" 
                    : "text-muted hover:text-ink"
                }`}
              >
                CASE
              </button>
              <button
                onClick={() => onSwitchMode("prd")}
                className={`px-2 py-0.5 text-[10px] tracking-wider transition-all cursor-pointer flex items-center gap-1 rounded-xs ${
                  mode === "prd" 
                    ? "bg-accent text-paper font-bold shadow-xs" 
                    : "text-muted hover:text-ink"
                }`}
              >
                <FileText size={10} />
                <span>PRD</span>
              </button>
            </div>

            {/* Quick Share Link */}
            <button
              onClick={handleCopyLink}
              title="Copy Case Study Link"
              className="p-1.5 border border-ink/10 hover:border-accent hover:text-accent text-muted transition-colors cursor-pointer rounded-xs"
            >
              {copiedLink ? <Check size={12} className="text-emerald-500" /> : <Link2 size={12} />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-2 py-1 bg-surface-container border border-ink/10 hover:border-accent hover:text-accent text-ink text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer rounded-xs"
              title="Close Case Study"
            >
              EXIT
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
