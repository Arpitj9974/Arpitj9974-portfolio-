import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Download, 
  Mail, 
  ExternalLink, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Clock,
  Linkedin
} from "lucide-react";
import { playClick, playSuccess } from "../utils/soundEngine";
import { PORTFOLIO_OWNER } from "../data";

interface ExecutiveTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreProjects: () => void;
  onDownloadResume: () => void;
}

interface TourSlide {
  id: string;
  category: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const TOTAL_SLIDES = 5;
const SLIDE_DURATION_MS = 8000;

export default function ExecutiveTourModal({
  isOpen,
  onClose,
  onExploreProjects,
  onDownloadResume
}: ExecutiveTourModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const progressIntervalRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const goToNextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      playClick();
      setCurrentSlide((prev) => prev + 1);
      setProgress(0);
    } else {
      playSuccess();
      setIsPaused(true);
      setProgress(100);
    }
  }, [currentSlide]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      playClick();
      setCurrentSlide((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    playClick();
    setCurrentSlide(index);
    setProgress(0);
  };

  // Reset slide state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen]);

  // Timer loop for auto-advancing slides
  useEffect(() => {
    if (!isOpen || isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    const intervalStep = 50; // update every 50ms
    const stepIncrement = (intervalStep / SLIDE_DURATION_MS) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextSlide();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isOpen, isPaused, goToNextSlide]);

  // Keyboard navigation listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToNextSlide, goToPrevSlide, onClose]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    if (deltaX < -50) {
      goToNextSlide();
    } else if (deltaX > 50) {
      goToPrevSlide();
    }
    touchStartXRef.current = null;
  };

  if (!isOpen) return null;

  const slides: TourSlide[] = [
    // SLIDE 1: The Origin
    {
      id: "origin",
      category: "THE ORIGIN // 2021-PRESENT",
      stepNumber: "01",
      title: "I Did Not Start in Tech. I Started in Money.",
      subtitle: "4+ years on the ground at JD Finance managing capital flow, debt books & operational reality.",
      content: (
        <div className="space-y-6">
          <div className="p-4 md:p-5 border border-ink/10 bg-surface-container/50 space-y-3 font-sans">
            <p className="text-xs md:text-sm text-ink leading-relaxed">
              Before architecting systems or automating workflows, I managed everyday lending operations: loan disbursement, debt-to-income qualification, reducing-balance amortizations, daily collections, and borrower risk across hundreds of SME accounts.
            </p>
            <p className="italic text-xs font-serif text-ink/80 border-t border-ink/10 pt-2.5">
              &quot;Software fails less often because developers cannot write code, and far more often because nobody understood the operational mechanics it was supposed to replace.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            <div className="p-3 border border-ink/10 bg-paper">
              <span className="text-[10px] text-muted uppercase tracking-wider block">MANAGED CAPITAL</span>
              <span className="text-xl md:text-2xl font-bold text-ink mt-0.5 block">10Cr+ INR</span>
              <span className="text-[10px] text-accent">Active Lending Book</span>
            </div>
            <div className="p-3 border border-ink/10 bg-paper">
              <span className="text-[10px] text-muted uppercase tracking-wider block">GROUND EXPERIENCE</span>
              <span className="text-xl md:text-2xl font-bold text-ink mt-0.5 block">4+ Years</span>
              <span className="text-[10px] text-accent">FinOps &amp; Underwriting</span>
            </div>
            <div className="p-3 border border-ink/10 bg-paper">
              <span className="text-[10px] text-muted uppercase tracking-wider block">LEDGER TOLERANCE</span>
              <span className="text-xl md:text-2xl font-bold text-ink mt-0.5 block">0.00%</span>
              <span className="text-[10px] text-accent">Zero State Drift</span>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 2: The Breaking Point
    {
      id: "friction",
      category: "OPERATIONAL FRICTION // THE CATALYST",
      stepNumber: "02",
      title: "Humans vs Spreadsheets: Why Manual Ops Break",
      subtitle: "Manual workflows don&apos;t fail slowly; they fail catastrophically at volume.",
      content: (
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-muted leading-relaxed font-sans">
            At scale, spreadsheet workarounds rot: formula corruption, duplicate borrower entries, unverified bureau scores, and 3+ hours lost daily in repetitive manual reconciliation. When existing off-the-shelf software failed to meet our operational constraints, I formulated the system logic and orchestrated custom automation to solve it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-red-500/20 bg-red-500/5 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-600 dark:text-red-400">
                <span>[X]</span>
                <span>MANUAL EXCEL BOTTLENECK</span>
              </div>
              <ul className="text-xs space-y-1.5 font-mono text-muted">
                <li>• 12 to 24-hour turnaround per loan decision</li>
                <li>• 3+ daily hours spent manually reconciling entries</li>
                <li>• Undetected duplicate files &amp; human calculation fatigue</li>
                <li>• Fragile workbook schemas with zero immutable audit trails</li>
              </ul>
            </div>

            <div className="border border-accent/30 bg-accent/5 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent">
                <CheckCircle2 size={13} />
                <span>AUTOMATED ARCHITECTURE</span>
              </div>
              <ul className="text-xs space-y-1.5 font-mono text-ink">
                <li>• &lt; 150ms instant automated underwriting pass</li>
                <li>• 85% manual operational hours recovered for team</li>
                <li>• Cryptographic idempotency keys prevent double disbursals</li>
                <li>• Deterministic reducing-balance amortization vectors</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 3: The Synthesis
    {
      id: "synthesis",
      category: "70% MBA STRATEGY + 30% BCA SYSTEMS ARCHITECTURE",
      stepNumber: "03",
      title: "70% Business Strategy & FinOps + 30% Systems Engineering",
      subtitle: "I observe operational friction, formulate the business solution, and architect & ship production systems.",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-ink/10 bg-paper p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-accent" />
                <span className="font-mono text-xs font-bold text-ink">70% MBA // STRATEGY, FINOPS &amp; PM</span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Manipal University Jaipur (Analytics, Data Science &amp; PM) backed by 4+ years leading lending operations at JD Finance. I focus on ground-level problem observation, borrower lifecycle unit economics, risk mitigation, and executive roadmaps.
              </p>
              <div className="flex flex-wrap gap-1 font-mono text-[10px] text-ink">
                <span className="bg-surface-container px-2 py-0.5 border border-ink/5">Unit Economics</span>
                <span className="bg-surface-container px-2 py-0.5 border border-ink/5">FinOps Strategy</span>
                <span className="bg-surface-container px-2 py-0.5 border border-ink/5">Process Design</span>
                <span className="bg-surface-container px-2 py-0.5 border border-ink/5">PRDs &amp; Roadmaps</span>
              </div>
            </div>

            <div className="border border-ink/10 bg-paper p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-accent" />
                <span className="font-mono text-xs font-bold text-ink">30% BCA // SYSTEMS ARCHITECTURE &amp; DELIVERY</span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                BCA foundation provides deep schema literacy, systems architecture, and technical comprehension. I translate operational workflows into relational databases, API contracts, and high-performance offline-first applications.
              </p>
              <div className="flex flex-wrap gap-1 font-mono text-[10px] text-ink">
                <span className="bg-surface-container px-2 py-0.5 border border-ink/5">Systems Architecture</span>
                <span className="bg-surface-container px-2 py-0.5 border border-ink/5">Data Schemas</span>
                <span className="bg-surface-container px-2 py-0.5 border border-ink/5">Offline-First PWAs</span>
                <span className="bg-surface-container px-2 py-0.5 border border-ink/5">API Workflows</span>
              </div>
            </div>
          </div>

          <div className="p-3 border-l-2 border-accent bg-surface-container/60 font-mono text-xs text-ink">
            <strong>Core Principle:</strong> I don&apos;t just write strategy decks or theoretical PRDs. I observe ground-level friction, model the business logic, and architect &amp; deliver end-to-end production systems.
          </div>
        </div>
      )
    },

    // SLIDE 4: The Proof
    {
      id: "proof",
      category: "10 SHIPPED SYSTEMS // PRODUCTION PROOF",
      stepNumber: "04",
      title: "Real Deployed Systems, Not Theoretical Slides",
      subtitle: "10 complete solutions orchestrated with interactive PRDs, live repos &amp; architectural documentation.",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border border-ink/10 bg-paper p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent font-bold">FINTECH &amp; LENDING</span>
                <span className="font-mono text-[9px] text-muted">2025</span>
              </div>
              <h4 className="font-serif text-base font-bold text-ink">FinDhar</h4>
              <p className="text-[11px] text-muted font-sans line-clamp-3">
                Full-featured loan amortization engine &amp; dual-entry bookkeeping platform with real-time interest/principal splits.
              </p>
              <div className="text-[10px] font-mono text-accent pt-1 border-t border-ink/5 font-bold">
                Impact: 42% faster loan processing
              </div>
            </div>

            <div className="border border-ink/10 bg-paper p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent font-bold">OPERATIONS &amp; WORKFORCE</span>
                <span className="font-mono text-[9px] text-muted">2025</span>
              </div>
              <h4 className="font-serif text-base font-bold text-ink">Work Sarthi</h4>
              <p className="text-[11px] text-muted font-sans line-clamp-3">
                Field-workforce coordination and automated call logging system eliminating human reporting overhead.
              </p>
              <div className="text-[10px] font-mono text-accent pt-1 border-t border-ink/5 font-bold">
                Impact: 100% call logs automated
              </div>
            </div>

            <div className="border border-ink/10 bg-paper p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent font-bold">ETL &amp; DATA ENGINE</span>
                <span className="font-mono text-[9px] text-muted">2024</span>
              </div>
              <h4 className="font-serif text-base font-bold text-ink">ARWS RAW</h4>
              <p className="text-[11px] text-muted font-sans line-clamp-3">
                High-volume transactional ETL pipeline ingesting 10,000+ records with schema validation and real-time reconciliation.
              </p>
              <div className="text-[10px] font-mono text-accent pt-1 border-t border-ink/5 font-bold">
                Impact: 0 ledger discrepancies
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container p-3 border border-ink/10 text-xs font-mono">
            <span className="text-muted">Total Portfolio Registry:</span>
            <span className="text-ink font-bold">10 Production Solutions Across FinTech, EdTech, AgriTech &amp; Healthcare</span>
          </div>
        </div>
      )
    },

    // SLIDE 5: The Action / Deployment
    {
      id: "action",
      category: "NEXT STEPS // IMMEDIATE IMPACT",
      stepNumber: "05",
      title: "Ready to Deliver Value in Product & Operations",
      subtitle: "Open to Product Management, Business Operations, and FinTech Strategy opportunities.",
      content: (
        <div className="space-y-6">
          <div className="p-4 border border-accent/20 bg-accent/5 space-y-2 font-sans">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">AVAILABLE IMMEDIATELY FOR ROLES</span>
            </div>
            <p className="text-xs md:text-sm text-muted leading-relaxed">
              Targeting roles as <strong>Product Manager</strong>, <strong>Business Operations Lead</strong>, or <strong>Technical Program Manager</strong>. Located in Surat, India; open to high-impact on-site, hybrid (Mumbai, Bengaluru, NCR), and remote positions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <button
              onClick={() => {
                playSuccess();
                onDownloadResume();
              }}
              className="p-3.5 border border-accent bg-accent text-paper hover:bg-accent/90 transition-all flex items-center justify-between cursor-pointer font-bold text-xs"
            >
              <div className="flex items-center gap-2">
                <Download size={14} />
                <span>DOWNLOAD RESUME PDF</span>
              </div>
              <span className="text-[10px] opacity-80">[PDF]</span>
            </button>

            <a
              href={`mailto:${PORTFOLIO_OWNER.contactInfo.email}?subject=Introductory%20Call%20with%20Arpit%20Jaiswal`}
              onClick={() => playClick()}
              className="p-3.5 border border-ink/20 bg-paper hover:border-ink text-ink transition-all flex items-center justify-between cursor-pointer font-bold text-xs"
            >
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>SCHEDULE 15-MIN INTRO</span>
              </div>
              <ExternalLink size={12} className="text-muted" />
            </a>

            <button
              onClick={() => {
                playClick();
                onExploreProjects();
                onClose();
              }}
              className="p-3.5 border border-ink/20 bg-paper hover:border-ink text-ink transition-all flex items-center justify-between cursor-pointer text-xs"
            >
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-accent" />
                <span>EXPLORE ALL 10 SYSTEMS</span>
              </div>
              <ArrowRight size={13} className="text-muted" />
            </button>

            <a
              href={`https://${PORTFOLIO_OWNER.contactInfo.linkedin}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick()}
              className="p-3.5 border border-ink/20 bg-paper hover:border-ink text-ink transition-all flex items-center justify-between cursor-pointer text-xs"
            >
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="text-accent" />
                <span>CONNECT ON LINKEDIN</span>
              </div>
              <ExternalLink size={12} className="text-muted" />
            </a>
          </div>
        </div>
      )
    }
  ];

  const activeSlide = slides[currentSlide];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-ink/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="2-Minute Executive Story Tour"
    >
      <div 
        className="w-full max-w-3xl bg-paper border border-ink/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Story Segmented Progress Bar */}
        <div className="bg-surface-container px-4 pt-3 pb-2 border-b border-ink/10 space-y-2">
          <div className="grid grid-cols-5 gap-1.5 h-1.5">
            {slides.map((_, idx) => {
              let segmentFillWidth = 0;
              if (idx < currentSlide) {
                segmentFillWidth = 100;
              } else if (idx === currentSlide) {
                segmentFillWidth = progress;
              }

              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  title={`Jump to Slide ${idx + 1}`}
                  className="h-full bg-ink/15 overflow-hidden rounded-xs cursor-pointer focus:outline-hidden hover:bg-ink/30 transition-colors"
                >
                  <div 
                    className="h-full bg-accent transition-all duration-75 ease-linear"
                    style={{ width: `${segmentFillWidth}%` }}
                  />
                </button>
              );
            })}
          </div>

          {/* Micro Top Header Controls */}
          <div className="flex items-center justify-between text-xs font-mono text-muted pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-accent tracking-widest uppercase">
                {activeSlide.category}
              </span>
              <span className="text-ink/30">|</span>
              <span className="text-[10px] text-muted">
                SLIDE {currentSlide + 1} OF {TOTAL_SLIDES}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused((prev) => !prev)}
                className="p-1 text-muted hover:text-ink transition-colors cursor-pointer"
                title={isPaused ? "Resume auto-play" : "Pause auto-play (or hover)"}
              >
                {isPaused ? <Play size={12} className="text-accent" /> : <Pause size={12} />}
              </button>
              <span className="text-[10px] text-muted hidden sm:inline">
                {isPaused ? "[PAUSED]" : "[AUTO-PLAY]"}
              </span>
              <button
                onClick={onClose}
                className="p-1 text-muted hover:text-ink transition-colors cursor-pointer ml-1"
                title="Close tour (ESC)"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Main Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <span className="px-1.5 py-0.5 border border-accent/30 bg-accent/10 text-[10px] font-bold">
                {activeSlide.stepNumber}
              </span>
              <span className="tracking-widest uppercase font-bold text-[10px]">EXECUTIVE BRIEFING</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-ink">
              {activeSlide.title}
            </h3>
            <p className="text-xs md:text-sm text-muted font-sans font-light">
              {activeSlide.subtitle}
            </p>
          </div>

          {/* Dynamic Slide Content */}
          <div className="pt-1">
            {activeSlide.content}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-surface-container px-6 py-4 border-t border-ink/10 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
              className={`px-3 py-1.5 border border-ink/20 flex items-center gap-1 transition-all ${
                currentSlide === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "bg-paper text-ink hover:border-ink cursor-pointer"
              }`}
            >
              <ChevronLeft size={14} />
              <span>PREV</span>
            </button>
            <button
              onClick={goToNextSlide}
              disabled={currentSlide === TOTAL_SLIDES - 1}
              className={`px-3 py-1.5 border border-ink/20 flex items-center gap-1 transition-all ${
                currentSlide === TOTAL_SLIDES - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "bg-paper text-ink hover:border-ink cursor-pointer"
              }`}
            >
              <span>NEXT</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px] text-muted">
            <span>KEYBOARD: [LEFT / RIGHT] SLIDES</span>
            <span>[SPACE] PAUSE</span>
            <span>[ESC] CLOSE</span>
          </div>

          {currentSlide === TOTAL_SLIDES - 1 ? (
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-ink text-paper hover:bg-accent transition-colors font-bold tracking-wider cursor-pointer"
            >
              FINISH TOUR
            </button>
          ) : (
            <button
              onClick={goToNextSlide}
              className="px-4 py-1.5 bg-ink text-paper hover:bg-accent transition-colors font-bold tracking-wider cursor-pointer flex items-center gap-1"
            >
              <span>CONTINUE</span>
              <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
