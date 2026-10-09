import React, { useState, useRef, useEffect } from "react";
import { Terminal, LineChart, Download, Sun, Moon, Eye, ChevronDown, Search } from "lucide-react";
import { PROJECTS } from "../data";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenResumeModal: () => void;
  onDownloadResume: () => void;
  onOpenCommandPalette?: () => void;
  onStartTour?: () => void;
}

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  isDarkMode, 
  onToggleTheme, 
  onOpenResumeModal, 
  onDownloadResume,
  onOpenCommandPalette,
  onStartTour
}: HeaderProps) {
  const navItems = [
    { id: "home", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ];

  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopDropdownRef.current && desktopDropdownRef.current.contains(target);
      const insideMobile = mobileDropdownRef.current && mobileDropdownRef.current.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsResumeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-ink/10 transition-colors duration-300">
      {/* Top micro-banner */}
      <div className="bg-ink text-paper py-1 px-3 sm:px-4 md:px-8 text-[8.5px] sm:text-[9px] md:text-xs font-mono tracking-widest uppercase flex justify-between items-center overflow-hidden">
        <span className="truncate mr-2 sm:mr-3 whitespace-nowrap hidden lg:inline">[ OBSERVE FRICTION // MODEL ARCHITECTURE // SHIP PRODUCTION SYSTEMS ]</span>
        <span className="truncate mr-2 sm:mr-3 whitespace-nowrap hidden sm:inline lg:hidden">[ OBSERVE FRICTION // MODEL // SHIP ]</span>
        <span className="truncate mr-2 whitespace-nowrap inline sm:hidden">[ OBSERVE // MODEL // SHIP ]</span>
        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-4 shrink-0 whitespace-nowrap">
          {onStartTour && (
            <button
              onClick={onStartTour}
              className="text-paper/80 hover:text-accent transition-colors cursor-pointer hidden sm:flex items-center gap-1 font-bold"
              title="Launch 2-Minute Executive Story Tour"
            >
              <span>[ 2-MIN EXECUTIVE TOUR ]</span>
            </button>
          )}
          <span className="text-accent font-medium flex items-center gap-1 sm:gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
            <span>PORTFOLIO ACTIVE</span>
          </span>
          <span className="text-paper/60">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })} IST
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 md:py-3.5 lg:py-5 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-2.5 sm:gap-3 lg:gap-4">
        {/* Row 1 on mobile & tablet: Brand on left, Compact utility actions on right (up to lg) */}
        <div className="flex items-center justify-between w-full lg:w-auto min-w-0">
          {/* Brand Name */}
          <div 
            onClick={() => setCurrentTab("home")} 
            className="cursor-pointer group flex flex-col min-w-0 pr-2 sm:pr-4"
          >
            <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors duration-150 truncate">
              ARPIT JAISWAL
            </span>
            <span className="font-mono text-[8.5px] sm:text-[9px] md:text-[10px] tracking-wider text-muted mt-0.5 uppercase line-clamp-1 lg:line-clamp-none">
              Product &amp; Business Operations // MBA (Analytics &amp; PM) // BCA // 4+ Yrs FinOps
            </span>
          </div>

          {/* Utility Controls for Mobile & Tablet (Visible only on < lg) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0 pl-1.5 sm:pl-3 border-l border-ink/10">
            {/* Mobile/Tablet Resume Dropdown */}
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
                title="Resume Options"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 border border-ink/30 hover:border-accent hover:text-accent text-muted text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer"
              >
                <Download size={12} />
                <span>Resume</span>
                <ChevronDown size={10} className={`transition-transform duration-200 ${isResumeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isResumeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-paper border border-ink/15 shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => { onOpenResumeModal(); setIsResumeDropdownOpen(false); }}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[11px] sm:text-xs font-mono tracking-wider text-ink hover:bg-surface-container hover:text-accent transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Eye size={12} />
                    <span>Preview Resume</span>
                  </button>
                  <div className="border-t border-ink/8" />
                  <button
                    onClick={() => { onDownloadResume(); setIsResumeDropdownOpen(false); }}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[11px] sm:text-xs font-mono tracking-wider text-ink hover:bg-surface-container hover:text-accent transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Download PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile/Tablet Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                title="Search / Command Palette (CTRL+K)"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-surface-container/60 hover:bg-surface-container border border-ink/15 hover:border-accent text-muted hover:text-ink text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer"
              >
                <Search size={13} className="text-accent shrink-0" />
                <span className="hidden sm:inline text-[10px] font-bold">
                  {typeof window !== 'undefined' && /Mac/.test(navigator.platform || '') ? 'CMD+K' : 'CTRL+K'}
                </span>
              </button>
            )}

            {/* Mobile/Tablet Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-1 sm:p-1.5 text-muted hover:text-accent transition-colors duration-200 cursor-pointer shrink-0"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Row 2 on mobile & tablet: Dedicated Full-Width Navigation Bar */}
        {/* On desktop: In-line Navigation + Desktop Controls */}
        <div className="flex items-center justify-between lg:justify-end gap-2.5 sm:gap-4 lg:gap-5 w-full lg:w-auto border-t border-ink/8 lg:border-t-0 pt-2 lg:pt-0">
          {/* Main Navigation Links */}
          <nav className="flex items-center justify-between lg:justify-start gap-1 sm:gap-3 md:gap-5 lg:gap-5 w-full lg:w-auto text-[11px] sm:text-xs md:text-sm font-medium py-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative py-1.5 px-2 sm:px-3 md:px-4 lg:px-0 transition-all duration-150 text-[11px] sm:text-xs md:text-sm font-mono tracking-wider cursor-pointer whitespace-nowrap text-center flex-1 lg:flex-initial ${
                  currentTab === item.id 
                    ? "text-accent font-bold" 
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent" />
                )}
              </button>
            ))}
          </nav>

          {/* Dedicated Utility Actions for Desktop (Hidden on mobile & tablet < lg) */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-2.5 shrink-0 border-l border-ink/15 pl-3 lg:pl-4">
            {/* Desktop Resume Dropdown */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
                title="Resume Options"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-ink/30 hover:border-accent hover:text-accent text-muted text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer"
              >
                <Download size={13} />
                <span>Resume</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${isResumeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isResumeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-paper border border-ink/15 shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => { onOpenResumeModal(); setIsResumeDropdownOpen(false); }}
                    className="w-full px-4 py-3 text-left text-xs font-mono tracking-wider text-ink hover:bg-surface-container hover:text-accent transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Preview Resume</span>
                  </button>
                  <div className="border-t border-ink/8" />
                  <button
                    onClick={() => { onDownloadResume(); setIsResumeDropdownOpen(false); }}
                    className="w-full px-4 py-3 text-left text-xs font-mono tracking-wider text-ink hover:bg-surface-container hover:text-accent transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                title="Open Command Palette (CMD+K / Ctrl+K)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-container/60 hover:bg-surface-container border border-ink/15 hover:border-accent text-muted hover:text-ink text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer"
              >
                <Search size={12} className="text-accent" />
                <span className="text-[10px] font-bold">
                  {typeof window !== 'undefined' && /Mac/.test(navigator.platform || '') ? 'CMD+K' : 'CTRL+K'}
                </span>
              </button>
            )}

            {/* Desktop Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-1.5 text-muted hover:text-accent transition-colors duration-200 cursor-pointer shrink-0"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
