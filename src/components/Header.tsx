import React from "react";
import { Terminal, LineChart, Download } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const navItems = [
    { id: "home", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Arpit_Jaiswal_Resume_.pdf';
    link.download = 'Arpit_Jaiswal_Resume_.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-ink/10 transition-colors duration-200">
      {/* Top micro-banner */}
      <div className="bg-ink text-paper py-1.5 px-4 md:px-8 text-[10px] md:text-xs font-mono tracking-widest uppercase flex justify-between items-center">
        <span>[ SURAT, GUJARAT, INDIA // FULL-STACK BUILDER & FINANCE ]</span>
        <div className="flex items-center space-x-4">
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
            Full-Stack Builder // Finance Specialist // Shipped 8 Products
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full md:w-auto">
          <nav className="flex items-center space-x-5 text-sm font-medium">
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

            {/* Resume Download Button */}
            <button
              onClick={handleDownloadResume}
              title="Download Resume"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-ink/30 hover:border-accent hover:text-accent text-muted text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
