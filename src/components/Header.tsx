import React, { useState, useRef, useEffect } from "react";
import { Terminal, LineChart, Download, Sun, Moon, Eye, ChevronDown } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenResumeModal: () => void;
  onDownloadResume: () => void;
}

export default function Header({ currentTab, setCurrentTab, isDarkMode, onToggleTheme, onOpenResumeModal, onDownloadResume }: HeaderProps) {
  const navItems = [
    { id: "home", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ];

  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsResumeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-ink/10 transition-colors duration-300">
      {/* Top micro-banner */}
      <div className="bg-ink text-paper py-1.5 px-4 md:px-8 text-[9px] md:text-xs font-mono tracking-widest uppercase flex justify-between items-center overflow-hidden">
        <span className="hidden sm:inline">[ SURAT, GUJARAT, INDIA // FULL-STACK BUILDER & FINANCE ]</span>
        <span className="inline sm:hidden">[ SURAT, IN // BUILDER & FINANCE ]</span>
        <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
          <span className="hidden md:inline text-accent font-medium">• LIVE PORTFOLIO TERMINAL</span>
          <span className="text-paper/60">IST {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Brand Name */}
        <div 
          onClick={() => setCurrentTab("home")} 
          className="cursor-pointer group flex flex-col"
        >
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors duration-150">
            ARPIT JAISWAL
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-wider text-muted mt-0.5 uppercase">
            Full-Stack Builder // Finance & Project Management // Shipped 8 Products
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full md:w-auto">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 md:gap-x-5 text-xs md:text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative py-1 transition-all duration-150 text-xs md:text-sm font-mono tracking-wider ${
                  currentTab === item.id 
                    ? "text-accent" 
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent" />
                )}
              </button>
            ))}

            {/* Resume Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
                title="Resume Options"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-ink/30 hover:border-accent hover:text-accent text-muted text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer"
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

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-2 text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
