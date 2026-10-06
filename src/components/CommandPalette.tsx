import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Search, 
  FileText, 
  ArrowRight, 
  Download, 
  Sun, 
  Moon, 
  Mail, 
  Github, 
  Linkedin, 
  Sliders, 
  Briefcase, 
  Compass, 
  Layers, 
  Tag, 
  Check,
  Sparkles,
  Volume2,
  VolumeX
} from "lucide-react";
import { PROJECTS, PORTFOLIO_OWNER } from "../data";
import { Project } from "../types";
import { playClick, playPalette, playToggle, playSuccess } from "../utils/soundEngine";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onOpenCaseStudy: (project: Project, mode: "narrative" | "prd") => void;
  onOpenResumeModal: () => void;
  onDownloadResume: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onSelectSkill?: (skill: string) => void;
  isSoundActive?: boolean;
  onToggleSound?: () => void;
  onStartTour?: () => void;
  onScrollToSimulator?: () => void;
}

interface PaletteAction {
  id: string;
  category: "PROJECTS" | "NAVIGATION" | "ACTIONS" | "SKILLS";
  title: string;
  subtitle?: string;
  badge?: string;
  icon: React.ReactNode;
  keywords?: string[];
  run: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectTab,
  onOpenCaseStudy,
  onOpenResumeModal,
  onDownloadResume,
  isDarkMode,
  onToggleTheme,
  onSelectSkill,
  isSoundActive = false,
  onToggleSound,
  onStartTour,
  onScrollToSimulator
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Detect OS for shortcut hint
  const isMac = useMemo(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return /Mac|iPod|iPhone|iPad/.test(navigator.platform || "");
  }, []);

  // Reset query and focus when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setCopiedEmail(false);
      playPalette();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Construct all searchable actions
  const allActions = useMemo<PaletteAction[]>(() => {
    const list: PaletteAction[] = [];

    // 1. Projects (Narrative + PRD)
    PROJECTS.forEach((p) => {
      // Open Case Study
      list.push({
        id: `case-${p.id}`,
        category: "PROJECTS",
        title: p.title,
        subtitle: `${p.year} // ${p.category} — ${p.subtitle || p.description.slice(0, 60)}...`,
        badge: "CASE STUDY",
        icon: <ArrowRight size={14} className="text-accent" />,
        keywords: [p.title, p.category, ...p.stack, ...(p.impactStats?.map(s => s.label) || [])],
        run: () => {
          onOpenCaseStudy(p, "narrative");
          onClose();
        }
      });

      // Open 1-Page PRD
      list.push({
        id: `prd-${p.id}`,
        category: "PROJECTS",
        title: `${p.title} — 1-Page PRD`,
        subtitle: `Product Spec, Requirements, Acceptance Criteria & KPIs`,
        badge: "PRD SPEC",
        icon: <FileText size={14} className="text-accent" />,
        keywords: [p.title, "prd", "spec", "product requirement", ...p.stack],
        run: () => {
          onOpenCaseStudy(p, "prd");
          onClose();
        }
      });
    });

    // 2. Navigation items
    list.push(
      {
        id: "nav-home",
        category: "NAVIGATION",
        title: "About Me & The Field Report",
        subtitle: "Origin story, finance operations background, and core philosophy",
        badge: "TAB",
        icon: <Compass size={14} className="text-ink" />,
        keywords: ["about", "bio", "story", "origin", "jd finance", "background"],
        run: () => {
          onSelectTab("home");
          onClose();
        }
      },
      {
        id: "nav-projects",
        category: "NAVIGATION",
        title: "All Systems Work (10 Shipped Projects)",
        subtitle: "Filtered search, project domain tags, and comparison registry",
        badge: "TAB",
        icon: <Layers size={14} className="text-ink" />,
        keywords: ["projects", "work", "systems", "filter", "registry", "code"],
        run: () => {
          onSelectTab("projects");
          onClose();
        }
      },
      {
        id: "nav-experience",
        category: "NAVIGATION",
        title: "Professional Career Experience & Timeline",
        subtitle: "4+ years FinOps, BCA foundations, MBA Analytics & Certifications",
        badge: "TAB",
        icon: <Briefcase size={14} className="text-ink" />,
        keywords: ["experience", "jobs", "timeline", "jd finance", "education", "mba", "bca"],
        run: () => {
          onSelectTab("experience");
          onClose();
        }
      },
      {
        id: "nav-roi",
        category: "NAVIGATION",
        title: "Interactive ROI & Automation Calculator",
        subtitle: "Calculate annual hours and capital saved by automating manual workflows",
        badge: "TOOL",
        icon: <Sliders size={14} className="text-accent" />,
        keywords: ["roi", "calculator", "hours", "automation", "savings", "excel"],
        run: () => {
          onSelectTab("home");
          onClose();
          setTimeout(() => {
            document.getElementById("roi-slider")?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 200);
        }
      },
      {
        id: "nav-simulator",
        category: "NAVIGATION",
        title: "Live Architecture & FinOps Telemetry Simulator",
        subtitle: "Interactive 4-node pipeline with 1,000 TX batch stream & network fault injection",
        badge: "SIMULATOR",
        icon: <Sliders size={14} className="text-accent" />,
        keywords: ["simulator", "architecture", "telemetry", "pipeline", "amortization", "ledger", "fault", "stream", "batch"],
        run: () => {
          onSelectTab("home");
          onClose();
          if (onScrollToSimulator) {
            onScrollToSimulator();
          } else {
            setTimeout(() => {
              document.getElementById("architecture-simulator")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 250);
          }
        }
      },
      {
        id: "nav-contact",
        category: "NAVIGATION",
        title: "Contact & Direct Channels",
        subtitle: "Secure dispatch form, direct email, WhatsApp, and phone",
        badge: "TAB",
        icon: <Mail size={14} className="text-ink" />,
        keywords: ["contact", "email", "whatsapp", "call", "message", "hire"],
        run: () => {
          onSelectTab("contact");
          onClose();
        }
      }
    );

    // 3. Quick Actions
    list.push(
      {
        id: "act-tour",
        category: "ACTIONS",
        title: "Start 2-Minute Executive Story Tour",
        subtitle: "5-slide interactive recruiter walkthrough: FinOps origin, BCA+MBA synthesis, 10 shipped systems",
        badge: "TOUR",
        icon: <Sparkles size={14} className="text-accent" />,
        keywords: ["tour", "executive", "story", "slides", "presentation", "briefing", "recruiter", "pitch", "summary"],
        run: () => {
          onClose();
          onStartTour?.();
        }
      },
      {
        id: "act-resume-pdf",
        category: "ACTIONS",
        title: "Download Resume PDF (One-Click)",
        subtitle: "Arpit_Jaiswal_Resume_.pdf (Curated 4+ Yrs FinOps & Tech PM)",
        badge: "DOWNLOAD",
        icon: <Download size={14} className="text-accent" />,
        keywords: ["download", "resume", "cv", "pdf"],
        run: () => {
          onDownloadResume();
          onClose();
        }
      },
      {
        id: "act-resume-modal",
        category: "ACTIONS",
        title: "View Interactive Printable Resume",
        subtitle: "Open full-screen modal with web-printable ATS layout",
        badge: "VIEW",
        icon: <FileText size={14} className="text-ink" />,
        keywords: ["view", "resume", "cv", "print", "ats"],
        run: () => {
          onOpenResumeModal();
          onClose();
        }
      },
      {
        id: "act-theme",
        category: "ACTIONS",
        title: `Switch to ${isDarkMode ? "Light Mode" : "Dark Mode"}`,
        subtitle: `Currently in ${isDarkMode ? "Dark (OLED)" : "Light (Warm Paper)"} theme`,
        badge: "TOGGLE",
        icon: isDarkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-indigo-400" />,
        keywords: ["theme", "dark", "light", "mode", "toggle", "color"],
        run: () => {
          playToggle(!isDarkMode);
          onToggleTheme();
          onClose();
        }
      },
      {
        id: "act-copy-email",
        category: "ACTIONS",
        title: copiedEmail ? "Email Copied to Clipboard!" : `Copy Email (${PORTFOLIO_OWNER.contactInfo.email})`,
        subtitle: "Direct address for job proposals and system consulting",
        badge: copiedEmail ? "COPIED" : "CLIPBOARD",
        icon: copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Mail size={14} className="text-ink" />,
        keywords: ["copy", "email", "address", "arpitj9974@gmail.com"],
        run: () => {
          navigator.clipboard.writeText(PORTFOLIO_OWNER.contactInfo.email);
          playSuccess();
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            onClose();
          }, 800);
        }
      },
      {
        id: "act-whatsapp",
        category: "ACTIONS",
        title: "Chat with Arpit on WhatsApp",
        subtitle: "+91 96249 97427 (Fastest response time)",
        badge: "EXTERNAL",
        icon: <Sparkles size={14} className="text-emerald-500" />,
        keywords: ["whatsapp", "chat", "message", "instant"],
        run: () => {
          window.open("https://wa.me/919624997427?text=Hi%20Arpit%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.", "_blank");
          onClose();
        }
      },
      {
        id: "act-github",
        category: "ACTIONS",
        title: "Open GitHub Profile",
        subtitle: "github.com/Arpitj9974 — Public codebases & repositories",
        badge: "EXTERNAL",
        icon: <Github size={14} className="text-ink" />,
        keywords: ["github", "code", "repositories", "git"],
        run: () => {
          window.open(`https://${PORTFOLIO_OWNER.contactInfo.github}`, "_blank");
          onClose();
        }
      },
      {
        id: "act-linkedin",
        category: "ACTIONS",
        title: "Open LinkedIn Profile",
        subtitle: "linkedin.com/in/Arpit-Jaiswal9974 — Network & recommendations",
        badge: "EXTERNAL",
        icon: <Linkedin size={14} className="text-ink" />,
        keywords: ["linkedin", "profile", "network", "connect"],
        run: () => {
          window.open(`https://${PORTFOLIO_OWNER.contactInfo.linkedin}`, "_blank");
          onClose();
        }
      },
      {
        id: "act-audio",
        category: "ACTIONS",
        title: `Turn Audio Feedback ${isSoundActive ? "OFF" : "ON"}`,
        subtitle: `Micro-haptic acoustic synthesis is currently ${isSoundActive ? "ACTIVE (Audible)" : "MUTED (Silent)"}`,
        badge: isSoundActive ? "ACTIVE" : "MUTED",
        icon: isSoundActive ? <Volume2 size={14} className="text-accent" /> : <VolumeX size={14} className="text-muted" />,
        keywords: ["sound", "audio", "sfx", "haptic", "mute", "volume", "tone"],
        run: () => {
          onToggleSound?.();
          onClose();
        }
      }
    );

    // 4. Skills Matrix Quick Highlights
    const keySkills = [
      "Lending Operations",
      "Python",
      "SQL",
      "React",
      "Automation (n8n)",
      "Financial Modeling",
      "System Architecture",
      "TypeScript",
      "Kotlin / Android",
      "Gemini AI"
    ];

    if (onSelectSkill) {
      keySkills.forEach((skill) => {
        list.push({
          id: `skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          category: "SKILLS",
          title: `Filter Skill: "${skill}"`,
          subtitle: `Cross-highlight matching systems in Projects & Experience timeline`,
          badge: "SKILL MATRIX",
          icon: <Tag size={14} className="text-accent" />,
          keywords: [skill, "skill", "filter", "matrix", "tech"],
          run: () => {
            onSelectSkill(skill);
            onClose();
          }
        });
      });
    }

    return list;
  }, [onOpenCaseStudy, onSelectTab, onDownloadResume, onOpenResumeModal, onToggleTheme, isDarkMode, copiedEmail, onSelectSkill, onClose]);

  // Filter actions based on search query
  const filteredActions = useMemo(() => {
    if (!query.trim()) return allActions;
    const q = query.toLowerCase().trim();

    return allActions.filter((action) => {
      const matchTitle = action.title.toLowerCase().includes(q);
      const matchSub = action.subtitle?.toLowerCase().includes(q);
      const matchKeywords = action.keywords?.some(k => k.toLowerCase().includes(q));
      const matchCategory = action.category.toLowerCase().includes(q);
      return matchTitle || matchSub || matchKeywords || matchCategory;
    });
  }, [allActions, query]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within the palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        playClick();
        setSelectedIndex((prev) => (prev < filteredActions.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        playClick();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredActions.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        playClick();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].run();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  // Auto-scroll the selected element into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>(`[data-palette-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-24 px-4 bg-ink/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div 
        className="w-full max-w-2xl bg-paper border border-ink/20 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-ink/10 bg-surface-container/40 gap-3">
          <Search size={18} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search systems, PRDs, skills... (e.g. 'fin', 'roi', 'sql')"
            className="w-full bg-transparent text-sm md:text-base font-mono text-ink placeholder:text-muted/60 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-muted hover:text-ink text-xs font-mono px-1.5 py-0.5 border border-ink/10 cursor-pointer"
            >
              CLEAR
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-paper border border-ink/15 text-[10px] font-mono text-muted uppercase">
              ESC TO CLOSE
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div 
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto divide-y divide-ink/5 p-2 font-mono text-xs"
        >
          {filteredActions.length === 0 ? (
            <div className="py-12 px-6 text-center space-y-2 text-muted">
              <span className="block text-sm font-bold uppercase tracking-wider">// NO MATCHING COMMANDS FOUND</span>
              <p className="text-xs font-sans">
                Try searching for <em>FinDhar</em>, <em>PRD</em>, <em>Resume</em>, <em>ROI</em>, or <em>Python</em>.
              </p>
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  data-palette-index={idx}
                  onClick={action.run}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                    isSelected 
                      ? "bg-ink text-paper" 
                      : "text-ink hover:bg-surface-container/60"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden pr-3">
                    <div className={`p-1.5 border shrink-0 ${isSelected ? "border-paper/30 bg-paper/10 text-paper" : "border-ink/10 bg-paper text-ink"}`}>
                      {action.icon}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold truncate text-xs sm:text-sm">
                          {action.title}
                        </span>
                        {action.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 border uppercase tracking-wider shrink-0 ${
                            isSelected 
                              ? "border-paper/40 text-paper bg-paper/15 font-bold" 
                              : "border-ink/10 text-muted bg-surface-container"
                          }`}>
                            {action.badge}
                          </span>
                        )}
                      </div>
                      {action.subtitle && (
                        <p className={`text-[11px] truncate font-sans mt-0.5 ${isSelected ? "text-paper/75" : "text-muted"}`}>
                          {action.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className={`text-[10px] uppercase tracking-widest ${isSelected ? "text-accent font-bold" : "text-muted/60"}`}>
                      {isSelected ? "SELECT [ENTER]" : action.category}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-ink/10 bg-surface-container/30 flex justify-between items-center text-[10px] font-mono text-muted">
          <div className="flex items-center gap-3">
            <span><kbd className="border border-ink/15 px-1 bg-paper text-ink">UP</kbd> <kbd className="border border-ink/15 px-1 bg-paper text-ink">DOWN</kbd> Navigate</span>
            <span><kbd className="border border-ink/15 px-1 bg-paper text-ink">ENTER</kbd> Select</span>
            <span><kbd className="border border-ink/15 px-1 bg-paper text-ink">ESC</kbd> Close</span>
          </div>
          <span className="hidden sm:inline-block">
            {isMac ? "CMD+K" : "CTRL+K"} SPOTLIGHT
          </span>
        </div>
      </div>
    </div>
  );
}
