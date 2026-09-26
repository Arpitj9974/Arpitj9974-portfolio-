import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import PrintableResume from "./components/PrintableResume";
import TypingText from "./components/TypingText";
import { PROJECTS, PORTFOLIO_OWNER } from "./data";
import { Project } from "./types";
import { 
  ArrowLeft,
  ArrowRight, 
  Briefcase,
  Layers, 
  MapPin, 
  Terminal, 
  Compass, 
  FileText, 
  Send, 
  Calendar, 
  CheckSquare, 
  ExternalLink,
  Sliders,
  ChevronRight,
  TrendingUp,
  X,
  Mail,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Star,
  ArrowDown,
  Check,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import VyoshaDeepDive from "./components/case-studies/VyoshaDeepDive";
import RawDeepDive from "./components/case-studies/RawDeepDive";
import AspirantFlowDeepDive from "./components/case-studies/AspirantFlowDeepDive";
import CareerLibraryDeepDive from "./components/case-studies/CareerLibraryDeepDive";
import WorkSarthiDeepDive from "./components/case-studies/WorkSarthiDeepDive";
import ArAuAgPtDeepDive from "./components/case-studies/ArAuAgPtDeepDive";
import MedicineExtractionDeepDive from "./components/case-studies/MedicineExtractionDeepDive";
import FarmerConnectDeepDive from "./components/case-studies/FarmerConnectDeepDive";
import FreshStampDeepDive from "./components/case-studies/FreshStampDeepDive";
import PRDViewer from "./components/PRDViewer";

const parseHash = (): { tab: string; project: Project | null; mode: "narrative" | "prd" } => {
  if (typeof window === 'undefined') return { tab: "home", project: null, mode: "narrative" };
  const hash = window.location.hash.replace('#', '');
  if (!hash) return { tab: "home", project: null, mode: "narrative" };

  if (hash.startsWith('case-study/')) {
    const raw = hash.replace('case-study/', '');
    const isPrd = raw.endsWith('/prd');
    const projectId = isPrd ? raw.replace(/\/prd$/, '') : raw;
    const project = PROJECTS.find(p => p.id === projectId) || null;
    return { tab: "projects", project, mode: isPrd ? "prd" : "narrative" };
  }

  if (hash.startsWith('prd/')) {
    const projectId = hash.replace('prd/', '');
    const project = PROJECTS.find(p => p.id === projectId) || null;
    return { tab: "projects", project, mode: "prd" };
  }

  const allowedTabs = ["home", "projects", "experience", "contact"];
  if (allowedTabs.includes(hash)) {
    return { tab: hash, project: null, mode: "narrative" };
  }

  return { tab: "home", project: null, mode: "narrative" };
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => parseHash().tab);
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(() => parseHash().project);
  const [caseStudyMode, setCaseStudyMode] = useState<"narrative" | "prd">(() => parseHash().mode);

  const openCaseStudy = (project: Project, mode: "narrative" | "prd" = "narrative") => {
    setCaseStudyMode(mode);
    setSelectedCaseStudy(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Contact state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Copy email handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_OWNER.contactInfo.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  // Amortization chart data (₹10L @ 8.5% for 240 months with prepayment scenario)
  const amortizationData = (() => {
    const P = 1000000; // ₹10 Lakh
    const annualRate = 8.5;
    const r = annualRate / 100 / 12;
    const n = 240; // 20 years
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const data: { month: number; principal: number; interest: number; balanceNormal: number; balancePrepay: number }[] = [];
    let bal = P;
    let balPre = P;
    const prepayAmount = 20000; // monthly extra prepayment
    for (let m = 1; m <= n; m++) {
      const intNormal = bal * r;
      const principalNormal = emi - intNormal;
      bal = Math.max(0, bal - principalNormal);

      const intPre = balPre * r;
      const principalPre = emi - intPre;
      balPre = Math.max(0, balPre - principalPre - prepayAmount);

      if (m % 12 === 0 || m === 1) {
        data.push({
          month: m,
          principal: Math.round(principalNormal),
          interest: Math.round(intNormal),
          balanceNormal: Math.round(bal / 1000),
          balancePrepay: Math.round(Math.max(0, balPre) / 1000)
        });
      }
      if (balPre <= 0 && m % 12 === 0) break;
    }
    return data;
  })();

  const [roiHours, setRoiHours] = useState(3); // ROI slider: hours/day spent in Excel

  const [messagesLog, setMessagesLog] = useState<{ name: string; email: string; message: string; date: string }[]>([]);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [contactError, setContactError] = useState("");

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);


  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Arpit_Jaiswal_Resume_.pdf';
    link.download = 'Arpit_Jaiswal_Resume_.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, [currentTab, selectedCaseStudy]);

  // Synchronize active view state with the URL hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (selectedCaseStudy) {
      const targetHash = caseStudyMode === "prd" 
        ? `case-study/${selectedCaseStudy.id}/prd` 
        : `case-study/${selectedCaseStudy.id}`;
      if (window.location.hash !== `#${targetHash}`) {
        window.location.hash = targetHash;
      }
    } else {
      const targetHash = currentTab === "home" ? "" : currentTab;
      if (window.location.hash !== (targetHash ? `#${targetHash}` : '')) {
        window.location.hash = targetHash;
      }
    }
  }, [currentTab, selectedCaseStudy, caseStudyMode]);

  // Synchronize URL hash changes (like browser back/forward buttons) back to state
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const parsed = parseHash();
      setCurrentTab(parsed.tab);
      setSelectedCaseStudy(parsed.project);
      setCaseStudyMode(parsed.mode);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;

    setIsSending(true);
    setContactError("");

    try {
      const response = await fetch("https://formspree.io/f/xqerpwoz", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: contactName || "Anonymous Visitor",
          email: contactEmail,
          message: contactMessage
        })
      });

      if (response.ok) {
        setContactSuccess(true);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        setTimeout(() => setContactSuccess(false), 6000);
      } else {
        setContactError("Transmission failed. Please try emailing directly.");
      }
    } catch {
      setContactError("Network error. Please check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Curated project domain categories & filter logic
  const QUICK_TAGS = [
    { id: "All", label: "All Systems (9)" },
    { id: "FinTech", label: "FinTech & Lending" },
    { id: "EdTech", label: "EdTech & Careers" },
    { id: "Automation", label: "Operations & Automation" },
    { id: "AgriRetail", label: "AgriTech & Retail" },
    { id: "Python", label: "Python & Analytics" },
    { id: "Mobile", label: "Mobile & Android" }
  ];

  const matchesTag = (p: Project, tag: string): boolean => {
    if (tag === "All") return true;
    if (tag === "FinTech") {
      return ["vyosha", "ar-auagpt", "arws-raw"].includes(p.id) || 
             p.title.toLowerCase().includes("vyosha") || 
             p.description.toLowerCase().includes("lending") ||
             p.description.toLowerCase().includes("fintech");
    }
    if (tag === "EdTech") {
      return ["study-tracker-aj", "career-library"].includes(p.id) || 
             p.title.toLowerCase().includes("aspirant") || 
             p.title.toLowerCase().includes("career");
    }
    if (tag === "Automation") {
      return ["work-sarthi", "medicine-extraction"].includes(p.id) || 
             p.description.toLowerCase().includes("automat") ||
             (p.solution || "").toLowerCase().includes("automat");
    }
    if (tag === "AgriRetail") {
      return ["farmer-connect", "freshstamp"].includes(p.id);
    }
    if (tag === "Python") {
      return p.stack.some(s => /python|pandas|data|streamlit|sql/i.test(s)) ||
             ["arws-raw", "career-library", "medicine-extraction"].includes(p.id);
    }
    if (tag === "Mobile") {
      return p.category === "Mobile" || 
             p.stack.some(s => /android|kotlin|mobile|pwa/i.test(s)) ||
             ["work-sarthi", "vyosha"].includes(p.id);
    }
    return p.category === tag;
  };

  const matchesSearch = (p: Project, query: string): boolean => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const inTitle = p.title.toLowerCase().includes(q);
    const inSubtitle = (p.subtitle || "").toLowerCase().includes(q);
    const inDesc = p.description.toLowerCase().includes(q);
    const inLongDesc = (p.longDescription || "").toLowerCase().includes(q);
    const inCategory = p.category.toLowerCase().includes(q);
    const inStack = p.stack.some(s => s.toLowerCase().includes(q));
    const inProblem = (p.problem || "").toLowerCase().includes(q);
    const inSolution = (p.solution || "").toLowerCase().includes(q);
    const inOutcome = (p.outcome || "").toLowerCase().includes(q);
    return inTitle || inSubtitle || inDesc || inLongDesc || inCategory || inStack || inProblem || inSolution || inOutcome;
  };

  const filteredProjects = PROJECTS.filter(p => matchesTag(p, projectFilter) && matchesSearch(p, searchQuery));

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-paper font-sans">
      
      {/* Header element */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedCaseStudy(null);
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onDownloadResume={handleDownloadResume}
      />

      {/* Main Container Content */}
      <main className="min-h-[70vh]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME PORTFOLIO (THE FIELD REPORT) */}
          {currentTab === "home" && !selectedCaseStudy && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-16 md:space-y-24"
            >
              
              {/* SECTION 01: HERO STATEMENT */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start" id="home-hero">
                <div className="lg:col-span-8 space-y-6">
                  <h1 className="font-serif text-4xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.1]">
                    <TypingText text={PORTFOLIO_OWNER.tagline} speed={40} />
                  </h1>
                  <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-3xl">
                    {PORTFOLIO_OWNER.subLine}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button 
                      onClick={() => setCurrentTab("projects")}
                      className="px-5 py-3 bg-ink hover:bg-accent text-paper text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>View Work</span>
                      <ArrowRight size={14} />
                    </button>
                    
                    <div className="flex items-center gap-3 sm:ml-2 border-t sm:border-t-0 sm:border-l border-ink/10 pt-4 sm:pt-0 sm:pl-5">
                      <a 
                        href={`https://${PORTFOLIO_OWNER.contactInfo.github}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 text-muted hover:text-accent transition-colors"
                        title="GitHub"
                      >
                        <Github size={18} />
                      </a>
                      <a 
                        href={`https://${PORTFOLIO_OWNER.contactInfo.linkedin}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 text-muted hover:text-accent transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a 
                        href={`mailto:${PORTFOLIO_OWNER.contactInfo.email}`}
                        className="p-2 text-muted hover:text-accent transition-colors"
                        title="Email"
                      >
                        <Mail size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right portrait / details card */}
                <div className="lg:col-span-4 bg-surface-container p-6 space-y-4 border border-ink/5 relative group max-w-sm lg:max-w-none mx-auto lg:mx-0 w-full">
                  <div className="aspect-[4/3] bg-ink/10 overflow-hidden relative border border-ink/10">
                    <picture>
                      <source srcSet="/tech_workspace.webp" type="image/webp" />
                      <img 
                        src="/tech_workspace.jpg"
                        alt="Arpit Jaiswal Workspace" 
                        width={960}
                        height={1440}
                        fetchPriority="high"
                        loading="eager"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </picture>
                  </div>
                  
                  <div className="space-y-2 font-mono text-[10px] md:text-xs">
                    <div className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="text-muted">LOCATION:</span>
                      <span className="text-ink font-bold">Surat, Gujarat, India</span>
                    </div>
                    <div className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="text-muted">BACKGROUND:</span>
                      <span className="text-ink font-bold">4.5 Years FinOps (JD Finance)</span>
                    </div>
                    <div className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="text-muted">EDUCATION:</span>
                      <span className="text-ink font-bold">MBA (Analytics &amp; PM) + BCA</span>
                    </div>
                    <div className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="text-muted">FOCUS:</span>
                      <span className="text-ink font-bold">Product Strategy &amp; Operations</span>
                    </div>
                    <div className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="text-muted">CAPABILITY:</span>
                      <span className="text-ink font-bold">Systems Architecture &amp; Delivery</span>
                    </div>
                    <div className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="text-muted">PROJECTS:</span>
                      <span className="text-ink font-bold">{PROJECTS.length} Shipped Solutions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">STATUS:</span>
                      <span className="text-accent font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" /> Open to Product &amp; Operations Roles</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 02: THE BACKSTORY */}
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-6" id="home-backstory">
                <div className="lg:col-span-4 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-ink leading-tight">
                    I did not start in tech.<br />
                    <span className="text-accent">I started in money.</span>
                  </h2>
                  <div className="border-l-2 border-ink/10 pl-4 py-1 text-xs text-muted font-mono space-y-1.5">
                    <p>SURAT, INDIA // REMOTE</p>
                    <p>BCA (CLASS OF 2026)</p>
                    <p>MBA ANALYTICS & DATA SCIENCE + PROJECT MANAGEMENT</p>
                  </div>

                  {/* Career Evolution Timeline */}
                  <div className="pt-6 space-y-4">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-widest block font-bold">// CAREER EVOLUTION</span>
                    <div className="space-y-4 font-mono text-xs relative pl-4 border-l border-ink/10 ml-1.5">
                      
                      {/* 2021 */}
                      <div className="relative space-y-1">
                        <span className="absolute -left-[21.5px] top-1.5 h-2 w-2 rounded-full bg-accent border border-paper" />
                        <div className="text-[10px] font-bold text-muted">2021</div>
                        <div className="text-ink font-bold uppercase text-[11px] leading-tight">FINANCE OPERATIONS</div>
                        <div className="text-muted font-sans text-xs">Lending Operations &amp; Risk Modeling (JD Finance)</div>
                      </div>

                      {/* Arrow */}
                      <div className="text-muted text-[10px] pl-0.5 select-none"><ArrowDown size={11} /></div>

                      {/* 2024 */}
                      <div className="relative space-y-1">
                        <span className="absolute -left-[21.5px] top-1.5 h-2 w-2 rounded-full bg-ink border border-paper" />
                        <div className="text-[10px] font-bold text-muted">2024</div>
                        <div className="text-ink font-bold uppercase text-[11px] leading-tight">TECHNICAL FOUNDATION</div>
                        <div className="text-muted font-sans text-xs">BCA — Systems Architecture, Databases &amp; Logic</div>
                      </div>

                      {/* Arrow */}
                      <div className="text-muted text-[10px] pl-0.5 select-none"><ArrowDown size={11} /></div>

                      {/* 2025 */}
                      <div className="relative space-y-1">
                        <span className="absolute -left-[21.5px] top-1.5 h-2 w-2 rounded-full bg-ink border border-paper" />
                        <div className="text-[10px] font-bold text-muted">2025</div>
                        <div className="text-ink font-bold uppercase text-[11px] leading-tight">MBA + STRATEGY</div>
                        <div className="text-muted font-sans text-xs">Analytics &amp; Data Science, Project Management</div>
                      </div>

                      {/* Arrow */}
                      <div className="text-muted text-[10px] pl-0.5 select-none"><ArrowDown size={11} /></div>

                      {/* NOW */}
                      <div className="relative space-y-1">
                        <span className="absolute -left-[21.5px] top-1.5 h-2 w-2 rounded-full bg-accent animate-pulse border border-paper" />
                        <div className="text-[10px] font-bold text-muted">NOW</div>
                        <div className="text-ink font-bold uppercase text-[11px] leading-tight">PRODUCT &amp; BUSINESS OPS</div>
                        <div className="text-muted font-sans text-xs text-accent font-bold">Turning Operational Friction Into Shipped Software</div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-8 text-sm md:text-base text-muted leading-relaxed font-sans font-light">
                  <div className="p-6 border border-ink/10 bg-surface-container/30 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink uppercase tracking-wider">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span>THE FINANCIAL ORIGIN (JD FINANCE)</span>
                    </div>
                    <p>
                      For 4.5 years I ran the complete lending operation at <strong>JD Finance</strong> — loan disbursement, daily repayment, borrower portfolios — and built the Excel systems the team ran on, because nobody else was going to build them. I came back in 2025 to lead that same function again, this time bringing automation and data tooling into it.
                    </p>
                    <p className="italic text-ink font-serif text-sm border-t border-ink/5 pt-3">
                      "That work taught me something no course does: software fails less often because the code is bad, and more often because nobody understood the process it was supposed to replace."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-ink/10 p-5 space-y-3 bg-paper">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 bg-accent" />
                        <span>BUSINESS &amp; OPERATIONS FIRST</span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        Every system I build starts with operational reality, not code syntax. 4.5 years running lending operations at JD Finance taught me how portfolios work, how capital moves, and where manual bottlenecks drain margins. I design systems around real unit economics and user needs.
                      </p>
                    </div>

                    <div className="border border-ink/10 p-5 space-y-3 bg-paper">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 bg-accent" />
                        <span>TECHNICAL DELIVERY &amp; ARCHITECTURE</span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        My BCA technical foundation means I don't just write theoretical slides or PRDs. I understand system architecture, data models, APIs, and modern developer tooling well enough to architect, prototype, and ship working software directly.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 border border-ink/10 bg-accent/5 text-xs font-mono text-ink/90 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="space-y-1">
                      <span className="font-bold block text-accent uppercase tracking-widest">// THE TECHNO-COMMERCIAL INTERSECTION</span>
                      <p className="font-sans font-light text-muted leading-relaxed text-xs">
                        Finishing my BCA in Surat and pursuing an MBA at Manipal University Jaipur in Analytics &amp; Data Science and Project Management — because the problems worth solving live right where operational logic meets technical execution.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* SECTION 03: PROOF IN NUMBERS */}
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="bg-surface-container py-12 px-6 md:px-12 border border-ink/5" id="home-numbers">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">
                  {PORTFOLIO_OWNER.stats.map((stat, idx) => (
                    <div key={idx} className="space-y-2 pt-6 lg:pt-0 lg:pl-6 first:pl-0 first:pt-0 overflow-hidden">
                      <div className="h-10 md:h-16 flex items-end">
                        <span className={`font-mono font-extrabold text-ink block tracking-tight leading-none ${
                          /[a-zA-Z]/.test(stat.value)
                            ? stat.value.length > 8
                              ? "text-xl md:text-3xl pb-1"
                              : "text-2xl md:text-4xl pb-0.5"
                            : stat.value.length > 4 
                              ? "text-2xl md:text-4xl pb-0.5" 
                              : "text-4xl md:text-6xl"
                        }`}>
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-muted tracking-widest uppercase block">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* SECTION 03b: INTERACTIVE ROI CALCULATOR */}
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="border border-ink/10 bg-paper p-6 md:p-10 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs font-mono text-accent uppercase tracking-widest block font-bold">// INTERACTIVE ROI CALCULATOR</span>
                    <h2 className="font-serif text-2xl font-bold text-ink mt-1">Manual Ops vs. Automation — What's Your Team Losing?</h2>
                    <p className="text-xs text-muted font-sans mt-1">Move the slider to see how much time and money I can save your team by automating repetitive workflows.</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 min-w-[180px]">
                    <span className="text-4xl font-mono font-bold text-ink">{roiHours}h</span>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-widest">DAILY HOURS IN EXCEL/SHEETS</span>
                    <input
                      id="roi-slider"
                      type="range"
                      min={0.5}
                      max={10}
                      step={0.5}
                      value={roiHours}
                      onChange={(e) => setRoiHours(Number(e.target.value))}
                      className="w-full accent-accent cursor-pointer"
                    />
                    <div className="flex justify-between w-full text-[9px] font-mono text-muted">
                      <span>0.5h</span><span>10h</span>
                    </div>
                  </div>
                </div>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[1,2,3,4,5].map(member => ({
                        team: `${member} person${member > 1 ? 's' : ''}`,
                        hoursLost: Math.round(member * roiHours * 250),
                        hoursSaved: Math.round(member * roiHours * 250 * 0.85),
                        moneySaved: Math.round(member * roiHours * 250 * 0.85 * 600)
                      }))}
                      margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="gradLost" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                        </linearGradient>
                        <linearGradient id="gradSaved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                      <XAxis dataKey="team" tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="rgba(0,0,0,0.2)" />
                      <YAxis tickFormatter={(v) => `${v}h`} tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="rgba(0,0,0,0.2)" width={44} />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          name === 'moneySaved' ? `₹${value.toLocaleString('en-IN')}` : `${value} hours`,
                          name === 'hoursLost' ? 'Annual Hours Lost (Manual)' : name === 'hoursSaved' ? 'Annual Hours Saved (Automated)' : 'Annual Value Recovered (₹600/hr)'
                        ]}
                        contentStyle={{ fontFamily: 'monospace', fontSize: 11, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 0 }}
                      />
                      <Legend formatter={(val) => val === 'hoursLost' ? 'Manual Hours Lost' : 'Automated Hours Saved'} wrapperStyle={{ fontSize: 11, fontFamily: 'monospace' }} />
                      <Area type="monotone" dataKey="hoursLost" stroke="#ef4444" strokeWidth={2} fill="url(#gradLost)" dot={false} />
                      <Area type="monotone" dataKey="hoursSaved" stroke="#10b981" strokeWidth={2} fill="url(#gradSaved)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center border-t border-ink/10 pt-4">
                  {[
                    { label: 'Hours Saved / Year (1 person)', value: `${Math.round(roiHours * 250 * 0.85)}h` },
                    { label: 'Value Recovered (₹600/hr)', value: `₹${Math.round(roiHours * 250 * 0.85 * 600).toLocaleString('en-IN')}` },
                    { label: 'Error Rate Reduction', value: '~98%' },
                    { label: 'Typical Automation Time', value: '2–4 Weeks' }
                  ].map(stat => (
                    <div key={stat.label} className="bg-surface-container border border-ink/10 p-3">
                      <div className="text-[10px] font-mono text-muted uppercase tracking-wider">{stat.label}</div>
                      <div className="font-serif font-bold text-ink text-lg mt-0.5">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* SECTION 04: SELECTED WORK PREVIEW */}
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="space-y-8" id="home-selected-work">
                <div className="flex justify-between items-end border-b border-ink/15 pb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-ink mt-1">
                      Selected Systems Work
                    </h2>
                  </div>
                  <button 
                    onClick={() => setCurrentTab("projects")}
                    className="text-xs font-mono text-muted hover:text-accent flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>VIEW ALL ({PROJECTS.length})</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PROJECTS.filter(p => p.featured).slice(0, 3).map((project) => (
                    <div 
                      key={project.id} 
                      className="bg-paper border border-ink/10 hover:border-accent transition-all p-6 space-y-4 group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{project.year} // {project.category}</span>
                          <div className="flex gap-2 items-center">
                            {project.tag && (
                              <span className="text-accent border border-accent/20 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider leading-none">
                                &lt;{project.tag}&gt;
                              </span>
                            )}
                            <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase">FEATURED</span>
                          </div>
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted font-sans leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-ink/5 flex justify-between items-center">
                        <div className="flex gap-1.5 flex-wrap">
                          {project.stack.slice(0, 3).map((s, i) => (
                            <span key={i} className="bg-surface-container text-[10px] font-mono text-muted px-2 py-0.5">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => openCaseStudy(project, "prd")}
                            className="text-xs font-mono font-bold text-accent hover:text-ink flex items-center gap-1 cursor-pointer"
                            title="View 1-Page PRD"
                          >
                            <FileText size={11} />
                            <span>PRD</span>
                          </button>
                          <button 
                            onClick={() => openCaseStudy(project, "narrative")}
                            className="text-xs font-mono text-ink font-bold tracking-wider hover:text-accent flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>CASE STUDY</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {PROJECTS.length === 0 && (
                    <div className="col-span-2 py-12 px-6 border border-dashed border-ink/15 text-center space-y-3 bg-surface-container/50">
                      <span className="text-xs font-mono text-muted uppercase tracking-wider block">// QUEUE EMPTY</span>
                      <p className="text-xs text-muted font-sans">
                        Please provide your real project metrics, system specifications, and outcomes. The portfolio dashboard is ready to render them beautifully.
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>

              {/* SECTION 05: HOW I WORK / PHILOSOPHY */}
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12" id="home-philosophy">
                <div className="lg:col-span-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-ink">
                    Rigorous logic, intentional beauty.
                  </h2>
                  <p className="text-sm text-muted font-sans leading-relaxed">
                    Most enterprise systems are either fast but completely incomprehensible to human eyes, or beautiful but structurally fragile under intense transaction load. I reject this compromise.
                  </p>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "Numbers first", desc: "No feature exists simply because it is easy or trendy. Every line is justified by transaction speeds, reduction of user friction, or data integrity audits." },
                    { title: "Then the build", desc: "We convert analytical spreadsheets into strict Type-safe React components. Clean styling systems using tailwind provide robust speed." },
                    { title: "Always auditing", desc: "A system isn't finished when it compiles. It's finished when we have simulated load, tested API limits, and validated schema pipelines." }
                  ].map((card, idx) => (
                    <div key={idx} className="bg-surface-container p-5 border border-ink/5 space-y-2.5">
                      <span className="text-xs font-mono text-accent tracking-widest block font-bold uppercase">0{idx + 1} / {card.title}</span>
                      <p className="text-xs text-muted leading-relaxed font-sans">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* SECTION 06: SKILLS & ARCHITECTURE */}
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="space-y-10" id="home-toolkit">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink tracking-tight">
                    Professional Capabilities
                  </h2>
                </div>

                {/* Subsection A: What I Do */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                    <span className="h-1 w-3 bg-accent" />
                    <span>What I Do — Strategic Domains</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PORTFOLIO_OWNER.skills.whatIDo.map((col, idx) => (
                      <div key={idx} className="border border-ink/10 p-5 bg-paper space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h4 className="font-mono text-xs font-bold text-ink border-b border-ink/5 pb-2 uppercase tracking-wider flex items-center justify-between">
                            <span>{col.category}</span>
                            <span className="text-accent/65 font-light text-[10px]">0{idx + 1}</span>
                          </h4>
                          <ul className="space-y-2">
                            {col.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs font-sans text-muted leading-relaxed">
                                <span className="h-1 w-1 bg-accent/60 rounded-full mt-1.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subsection B: Tech I Build With */}
                <div className="space-y-4 border-t border-ink/10 pt-8">
                  <h3 className="text-xs font-mono font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                    <span className="h-1 w-3 bg-accent" />
                    <span>Tech I Build With — Tools & Systems</span>
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {PORTFOLIO_OWNER.skills.techBuildWith.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="bg-surface-container border border-ink/5 text-xs font-mono text-ink px-3 py-1.5 rounded-sm hover:border-accent/30 hover:bg-surface-container-high transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.section>

            </motion.div>
          )}

          {/* TAB 2: PROJECTS VIEW (TAGS, TABLES, SUB-CASES) */}
          {currentTab === "projects" && !selectedCaseStudy && (
            <motion.div
              key="projects-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12"
            >
              
              {/* Header intro */}
              <div className="space-y-2 border-b border-ink/10 pb-6">
                <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ink">
                  Projects — things built and shipped.
                </h1>
                <p className="text-sm text-muted max-w-2xl font-sans leading-relaxed">
                  Every product started with a real problem—not a tutorial.<br />
                  Built to simplify work, automate processes, and create value for the people who use them.
                </p>
              </div>

              {/* Search & Tag Filter Control Center */}
              <div className="space-y-4 border-b border-ink/10 pb-6">
                {/* Search Bar Input */}
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-muted pointer-events-none">
                    <Search size={15} />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by technology, domain, or problem... (e.g. FinTech, Amortization, Kotlin, Python, Gemini)"
                    className="w-full pl-10 pr-10 py-3 bg-surface-container border border-ink/15 text-xs md:text-sm font-mono text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 text-muted hover:text-ink cursor-pointer"
                      title="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Quick Curated Domain Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-muted uppercase font-bold tracking-wider mr-1">
                    DOMAINS:
                  </span>
                  {QUICK_TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => setProjectFilter(tag.id)}
                      className={`px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer ${
                        projectFilter === tag.id 
                          ? "bg-ink text-paper border-ink font-bold shadow-sm" 
                          : "bg-surface-container/60 text-muted border-ink/10 hover:border-ink/30 hover:text-ink"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>

                {/* Results Counter / Filter status banner */}
                {(projectFilter !== "All" || searchQuery.trim()) && (
                  <div className="flex items-center justify-between text-xs font-mono bg-accent/5 border border-accent/15 px-3 py-2 text-ink">
                    <span>
                      Found <strong>{filteredProjects.length}</strong> system{filteredProjects.length === 1 ? "" : "s"}
                      {projectFilter !== "All" && ` in ${QUICK_TAGS.find(t => t.id === projectFilter)?.label || projectFilter}`}
                      {searchQuery.trim() && ` matching "${searchQuery}"`}
                    </span>
                    <button
                      onClick={() => {
                        setProjectFilter("All");
                        setSearchQuery("");
                      }}
                      className="text-accent hover:underline font-bold cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic GRID for featured / active filter cards */}
              {projectFilter === "All" && !searchQuery.trim() ? (
                <div className="space-y-12">
                  {/* Featured Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-ink/5 pb-2">
                      <span className="h-2 w-2 bg-accent rounded-full animate-pulse" />
                      <h2 className="font-serif text-lg font-bold text-ink tracking-tight uppercase text-xs font-mono flex items-center gap-1.5">
                        <Star size={12} className="text-accent fill-accent" />
                        <span>Featured Systems Work</span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProjects.filter(p => p.featured).map((p) => (
                        <div 
                          key={p.id} 
                          className="border border-ink/10 bg-paper/50 hover:bg-paper transition-all p-5 flex flex-col justify-between group"
                          id={`project-card-${p.id}`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-center font-mono text-[10px] text-muted">
                              <span>{p.year} // {p.category}</span>
                              <div className="flex gap-2 items-center">
                                {p.tag && (
                                  <span className="text-accent border border-accent/20 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider leading-none">
                                    &lt;{p.tag}&gt;
                                  </span>
                                )}
                                <span className="text-accent font-bold flex items-center gap-1 text-[9px] uppercase tracking-wider">
                                  <Star size={10} className="fill-accent text-accent" />
                                  <span>FEATURED</span>
                                </span>
                              </div>
                            </div>

                            <h3 className="font-serif text-lg font-bold text-ink group-hover:text-accent transition-colors">
                              {p.title}
                            </h3>
                            
                            <p className="text-xs text-muted leading-relaxed font-sans">
                              {p.description}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-ink/5 flex justify-between items-center">
                            <div className="flex gap-1 flex-wrap">
                              {p.stack.slice(0, 2).map((s, idx) => (
                                <span key={idx} className="bg-surface-container text-[9px] font-mono text-muted px-1.5 py-0.5">
                                  {s}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-3">
                              {p.liveUrl && (
                                <a 
                                  href={p.liveUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[11px] font-mono text-muted hover:text-accent transition-colors cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="flex items-center gap-1">Live <ExternalLink size={10} /></span>
                                </a>
                              )}
                              {p.githubUrl && (
                                <a 
                                  href={p.githubUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[11px] font-mono text-muted hover:text-accent transition-colors cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="flex items-center gap-1">Git <ExternalLink size={10} /></span>
                                </a>
                              )}
                              <button 
                                onClick={() => openCaseStudy(p, "prd")}
                                className="text-[11px] font-mono font-bold text-accent hover:text-ink flex items-center gap-1 cursor-pointer"
                                title="View 1-Page PRD"
                              >
                                <FileText size={11} />
                                <span>PRD</span>
                              </button>
                              <button 
                                onClick={() => openCaseStudy(p, "narrative")}
                                className="text-xs font-mono font-bold text-ink hover:text-accent flex items-center gap-0.5 cursor-pointer"
                              >
                                <span>Case Study</span>
                                <ChevronRight size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Internship Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-ink/5 pb-2">
                      <span className="h-2 w-2 bg-accent/70 rounded-full" />
                      <h2 className="font-serif text-lg font-bold text-ink tracking-tight uppercase text-xs font-mono flex items-center gap-1.5">
                        <Briefcase size={13} className="text-accent" />
                        <span>Internship Projects &amp; Products</span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredProjects.filter(p => p.tag === "internship").map((p) => (
                        <div 
                          key={p.id} 
                          className="border border-ink/10 bg-paper/40 hover:bg-paper transition-all p-5 flex flex-col justify-between group"
                          id={`project-card-${p.id}`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-center font-mono text-[10px] text-muted">
                              <span>{p.year} // {p.category}</span>
                              <span className="text-accent border border-accent/20 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider leading-none">
                                &lt;internship&gt;
                              </span>
                            </div>

                            <h3 className="font-serif text-lg font-bold text-ink group-hover:text-accent transition-colors">
                              {p.title}
                            </h3>
                            
                            <p className="text-xs text-muted leading-relaxed font-sans">
                              {p.description}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-ink/5 flex justify-between items-center">
                            <div className="flex gap-1 flex-wrap">
                              {p.stack.slice(0, 2).map((s, idx) => (
                                <span key={idx} className="bg-surface-container text-[9px] font-mono text-muted px-1.5 py-0.5">
                                  {s}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-3">
                              {p.liveUrl && (
                                <a 
                                  href={p.liveUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[11px] font-mono text-muted hover:text-accent transition-colors cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="flex items-center gap-1">Live <ExternalLink size={10} /></span>
                                </a>
                              )}
                              {p.githubUrl && (
                                <a 
                                  href={p.githubUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[11px] font-mono text-muted hover:text-accent transition-colors cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="flex items-center gap-1">Git <ExternalLink size={10} /></span>
                                </a>
                              )}
                              <button 
                                onClick={() => openCaseStudy(p, "prd")}
                                className="text-[11px] font-mono font-bold text-accent hover:text-ink flex items-center gap-1 cursor-pointer"
                                title="View 1-Page PRD"
                              >
                                <FileText size={11} />
                                <span>PRD</span>
                              </button>
                              <button 
                                onClick={() => openCaseStudy(p, "narrative")}
                                className="text-xs font-mono font-bold text-ink hover:text-accent flex items-center gap-0.5 cursor-pointer"
                              >
                                <span>Case Study</span>
                                <ChevronRight size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Other Systems & Modules Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-ink/5 pb-2">
                      <span className="h-2 w-2 bg-muted/60 rounded-full" />
                      <h2 className="font-serif text-lg font-bold text-ink tracking-tight uppercase text-xs font-mono text-muted">
                        Other Systems &amp; Modules
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredProjects.filter(p => !p.featured && p.tag !== "internship").map((p) => (
                        <div 
                          key={p.id} 
                          className="border border-ink/10 bg-paper/30 hover:bg-paper transition-all p-5 flex flex-col justify-between group"
                          id={`project-card-${p.id}`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-center font-mono text-[10px] text-muted">
                              <span>{p.year} // {p.category}</span>
                              {p.tag && (
                                <span className="text-accent border border-accent/20 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider leading-none">
                                  &lt;{p.tag}&gt;
                                </span>
                              )}
                            </div>

                            <h3 className="font-serif text-lg font-bold text-ink group-hover:text-accent transition-colors">
                              {p.title}
                            </h3>
                            
                            <p className="text-xs text-muted leading-relaxed font-sans">
                              {p.description}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-ink/5 flex justify-between items-center">
                            <div className="flex gap-1 flex-wrap">
                              {p.stack.slice(0, 2).map((s, idx) => (
                                <span key={idx} className="bg-surface-container text-[9px] font-mono text-muted px-1.5 py-0.5">
                                  {s}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-3">
                              {p.liveUrl && (
                                <a 
                                  href={p.liveUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[11px] font-mono text-muted hover:text-accent transition-colors cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="flex items-center gap-1">Live <ExternalLink size={10} /></span>
                                </a>
                              )}
                              {p.githubUrl && (
                                <a 
                                  href={p.githubUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[11px] font-mono text-muted hover:text-accent transition-colors cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="flex items-center gap-1">Git <ExternalLink size={10} /></span>
                                </a>
                              )}
                              <button 
                                onClick={() => openCaseStudy(p, "prd")}
                                className="text-[11px] font-mono font-bold text-accent hover:text-ink flex items-center gap-1 cursor-pointer"
                                title="View 1-Page PRD"
                              >
                                <FileText size={11} />
                                <span>PRD</span>
                              </button>
                              <button 
                                onClick={() => openCaseStudy(p, "narrative")}
                                className="text-xs font-mono font-bold text-ink hover:text-accent flex items-center gap-0.5 cursor-pointer"
                              >
                                <span>Case Study</span>
                                <ChevronRight size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((p) => (
                    <div 
                      key={p.id} 
                      className="border border-ink/10 bg-paper/50 hover:bg-paper transition-all p-5 flex flex-col justify-between group"
                      id={`project-card-${p.id}`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center font-mono text-[10px] text-muted">
                          <span>{p.year} // {p.category}</span>
                          <div className="flex gap-2 items-center">
                            {p.tag && (
                              <span className="text-accent border border-accent/20 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider leading-none">
                                &lt;{p.tag}&gt;
                              </span>
                            )}
                            {p.featured && (
                              <span className="text-accent font-bold flex items-center gap-1 text-[9px] uppercase tracking-wider">
                                <Star size={10} className="fill-accent text-accent" />
                                <span>FEATURED</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-ink group-hover:text-accent transition-colors">
                          {p.title}
                        </h3>
                        
                        <p className="text-xs text-muted leading-relaxed font-sans">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-ink/5 flex justify-between items-center">
                        <div className="flex gap-1 flex-wrap">
                          {p.stack.slice(0, 2).map((s, idx) => (
                            <span key={idx} className="bg-surface-container text-[9px] font-mono text-muted px-1.5 py-0.5">
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3">
                          {p.liveUrl && (
                            <a 
                              href={p.liveUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[11px] font-mono text-muted hover:text-accent transition-colors cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="flex items-center gap-1">Live <ExternalLink size={10} /></span>
                            </a>
                          )}
                          {p.githubUrl && (
                            <a 
                              href={p.githubUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[11px] font-mono text-muted hover:text-accent transition-colors cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="flex items-center gap-1">Git <ExternalLink size={10} /></span>
                            </a>
                          )}
                          <button 
                            onClick={() => openCaseStudy(p, "prd")}
                            className="text-[11px] font-mono font-bold text-accent hover:text-ink flex items-center gap-1 cursor-pointer"
                            title="View 1-Page PRD"
                          >
                            <FileText size={11} />
                            <span>PRD</span>
                          </button>
                          <button 
                            onClick={() => openCaseStudy(p, "narrative")}
                            className="text-xs font-mono font-bold text-ink hover:text-accent flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>Case Study</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredProjects.length === 0 && (
                    <div className="col-span-full py-16 px-6 border border-dashed border-ink/15 text-center space-y-4 bg-surface-container/50">
                      <span className="text-xs font-mono text-muted uppercase tracking-wider block">// ZERO MATCHING SYSTEMS FOUND</span>
                      <p className="text-sm text-muted font-sans max-w-md mx-auto leading-relaxed">
                        No projects matched your query <strong>"{searchQuery || projectFilter}"</strong>. Try searching for <em>FinTech</em>, <em>Python</em>, <em>Kotlin</em>, <em>Amortization</em>, or <em>Automation</em>.
                      </p>
                      <button
                        onClick={() => {
                          setProjectFilter("All");
                          setSearchQuery("");
                        }}
                        className="px-4 py-2 bg-ink text-paper text-xs font-mono font-bold tracking-wider uppercase hover:bg-accent transition-colors cursor-pointer"
                      >
                        RESET ALL FILTERS
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Grid Index Table details */}
              <div className="pt-8 space-y-4">
                <span className="text-xs font-mono text-muted tracking-wider block uppercase">// COMPREHENSIVE PROJECT REGISTRY</span>
                
                <div className="overflow-x-auto border border-ink/10 bg-paper">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container border-b border-ink/10 font-mono text-[10px] text-muted tracking-widest uppercase">
                        <th className="p-4">YEAR</th>
                        <th className="p-4">PROJECT</th>
                        <th className="p-4">DESCRIPTION</th>
                        <th className="p-4">CORE STACK</th>
                        <th className="p-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/10 font-mono text-xs text-muted">
                      {filteredProjects.map((p) => (
                        <tr key={p.id} className="hover:bg-surface-container/30 transition-colors">
                          <td className="p-4 font-bold text-ink">{p.year}</td>
                          <td className="p-4 font-serif text-sm font-semibold text-ink">{p.title}</td>
                          <td className="p-4 font-sans text-xs max-w-xs md:max-w-md truncate">{p.description}</td>
                          <td className="p-4">
                            <span className="truncate block max-w-[120px]">{p.stack.join(", ")}</span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button 
                                onClick={() => openCaseStudy(p, "prd")}
                                className="text-accent hover:underline text-[11px] cursor-pointer font-bold flex items-center gap-1"
                                title="View 1-Page PRD"
                              >
                                <FileText size={11} />
                                <span>PRD</span>
                              </button>
                              <button 
                                onClick={() => openCaseStudy(p, "narrative")}
                                className="text-accent hover:underline text-[11px] cursor-pointer"
                              >
                                <span className="flex items-center gap-1">Case Study <ChevronRight size={12} /></span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {PROJECTS.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-muted font-mono text-xs">
                            [ NO SYSTEM RECORDS REGISTERED IN REGISTRY ]
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}

          {/* PORTFOLIO CASE STUDY PAGE VIEW */}
          {selectedCaseStudy && (
            <motion.div
              key="case-study-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12"
            >
              
              {/* Back navigation */}
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-ink/10 text-xs font-mono text-muted hover:text-ink hover:border-ink transition-colors cursor-pointer"
              >
                <ArrowLeft size={13} className="shrink-0" />
                <span>BACK TO PROJECTS</span>
              </button>

              {/* Case study hero heading */}
              <div className="space-y-4 border-b border-ink/10 pb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-accent text-paper text-[10px] font-mono px-2 py-0.5 uppercase tracking-widest">
                    {selectedCaseStudy.year} Case Study
                  </span>
                  <span className="text-xs font-mono text-muted">{selectedCaseStudy.category} Category</span>
                </div>
                
                <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
                  {selectedCaseStudy.title}
                </h1>
                
                <p className="text-lg md:text-xl text-muted font-light leading-relaxed max-w-4xl">
                  {selectedCaseStudy.subtitle || selectedCaseStudy.description}
                </p>
              </div>

              {/* 4-column fact strip with links */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-surface-container p-6 border border-ink/5 divide-y md:divide-y-0 md:divide-x divide-ink/10">
                <div className="space-y-1 pt-4 md:pt-0 md:pl-0">
                  <span className="text-[10px] font-mono text-muted uppercase block">ROLE // INTENT</span>
                  <p className="text-sm font-semibold text-ink">{selectedCaseStudy.role || "Lead Architect"}</p>
                </div>
                <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
                  <span className="text-[10px] font-mono text-muted uppercase block">TIMELINE // CLIENT</span>
                  <p className="text-sm font-semibold text-ink">{selectedCaseStudy.timeline || "3 Months"} // {selectedCaseStudy.client || "In-house"}</p>
                </div>
                <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
                  <span className="text-[10px] font-mono text-muted uppercase block">PROJECT OUTCOME</span>
                  <p className="text-sm font-semibold text-ink">{selectedCaseStudy.outcome || "Operational deployment"}</p>
                </div>
                <div className="space-y-1 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-muted uppercase block mb-1">LINKS // REPOSITORIES</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.liveUrl ? (
                      <a
                        href={selectedCaseStudy.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-accent text-paper hover:bg-accent/80 text-[11px] font-mono font-bold px-2.5 py-1 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="flex items-center gap-1">Live App <ExternalLink size={11} /></span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-muted italic">Internal System</span>
                    )}
                    {selectedCaseStudy.githubUrl ? (
                      <a
                        href={selectedCaseStudy.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-ink/20 text-ink hover:bg-ink/5 text-[11px] font-mono font-bold px-2.5 py-1 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="flex items-center gap-1">GitHub <ExternalLink size={11} /></span>
                      </a>
                    ) : (
                      selectedCaseStudy.liveUrl && <span className="text-[11px] font-mono text-muted italic">Private Repo</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Perspective View Switcher: Narrative vs 1-Page PRD */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-ink/15 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono text-muted uppercase font-bold tracking-wider">VIEW PERSPECTIVE:</span>
                  <div className="inline-flex p-1 bg-surface-container border border-ink/15 gap-1">
                    <button
                      onClick={() => setCaseStudyMode("narrative")}
                      className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        caseStudyMode === "narrative"
                          ? "bg-ink text-paper shadow-sm"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      <BookOpen size={12} />
                      <span>CASE STUDY &amp; ARCHITECTURE</span>
                    </button>

                    <button
                      onClick={() => setCaseStudyMode("prd")}
                      className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        caseStudyMode === "prd"
                          ? "bg-accent text-paper shadow-sm"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      <FileText size={12} />
                      <span>1-PAGE PRD / PRODUCT SPEC</span>
                    </button>
                  </div>
                </div>

                <span className="text-[10px] md:text-[11px] font-mono text-muted">
                  {caseStudyMode === "prd" ? "// Full Product Requirement Document with Acceptance Criteria" : "// Architecture Diagrams & Interactive Telemetry"}
                </span>
              </div>

              {caseStudyMode === "prd" ? (
                <PRDViewer 
                  project={selectedCaseStudy} 
                  onBackToCaseStudy={() => setCaseStudyMode("narrative")} 
                />
              ) : (
                <>
                  {/* Deep dive sections details */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Sticky Mini TOC (lg only) */}
                <div className="hidden lg:block lg:col-span-1">
                  <div className="sticky top-8 space-y-1 border-l border-ink/10 pl-3">
                    <span className="text-[9px] font-mono text-muted uppercase tracking-widest block mb-2">CONTENTS</span>
                    {[
                      { id: "cs-problem", label: "01 Problem" },
                      { id: "cs-solution", label: "02 Solution" },
                      { id: "cs-metrics", label: "03 Metrics" },
                      { id: "cs-deepdive", label: "04 Deep-Dive" }
                    ].map(item => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="block text-[10px] font-mono text-muted hover:text-accent transition-colors py-0.5 cursor-pointer"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Left side text columns (Span 7) */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Problem */}
                  <div id="cs-problem" className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-ink">01 / The Business Problem</h3>
                    <p className="text-sm md:text-base text-muted font-sans leading-relaxed">
                      {selectedCaseStudy.problem || "Legacy infrastructure in enterprise finance operations suffered from massive latency barriers, high risk of user error during manual ledger input, and zero active visual intelligence telemetry."}
                    </p>
                  </div>

                  {/* Built Details / Solution */}
                  <div id="cs-solution" className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-ink">02 / System Architecture Solution</h3>
                    <p className="text-sm md:text-base text-muted font-sans leading-relaxed">
                      {selectedCaseStudy.solution || "We designed a unified client-side dashboard leveraging highly structured UI tokens, responsive layouts, and automatic reconciliations. The system binds key transactional data directly into React state vectors to provide live auditing capabilities."}
                    </p>
                    

                  </div>

                  {/* Conflict Quote block */}
                  <blockquote className="border-l-4 border-accent pl-4 py-1 italic font-serif text-base text-ink bg-surface-container/50">
                    "Transitioning legacy multi-million dollar data pipelines into modern UI interfaces requires absolute architectural honesty. If the telemetry model fails to map cleanly, the user loses trust in seconds."
                    <footer className="font-mono text-[10px] text-muted tracking-wider mt-1 uppercase block">
                      — Arpit Jaiswal, Design Journal
                    </footer>
                  </blockquote>

                </div>

                {/* Right side stats & graphics card (Span 4) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Case Study Impact Metrics */}
                  <div id="cs-metrics" className="bg-surface-container p-6 border border-ink/5 space-y-4">
                    <span className="text-[10px] font-mono text-accent tracking-widest block font-bold uppercase">// 03 / SYSTEM PERFORMANCE METRICS</span>
                    
                    <div className="space-y-4">
                      {(selectedCaseStudy.impactStats || [
                        { label: "Operational Speedup", value: "42%" },
                        { label: "Data Integrity", value: "99.9%" },
                        { label: "Reduction of Errors", value: "98%" }
                      ]).map((stat, idx) => (
                        <div key={idx} className="border-b border-ink/10 pb-3 last:border-0 last:pb-0">
                          <span className="text-3xl font-mono font-bold text-ink block tracking-tight">{stat.value}</span>
                          <span className="text-[10px] font-mono text-muted uppercase block">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stack specifications */}
                  <div className="border border-ink/10 p-5 bg-paper space-y-3">
                    <span className="text-[10px] font-mono text-muted tracking-wider block uppercase font-bold">// TECH SPECIFICATIONS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCaseStudy.stack.map((s, idx) => (
                        <span key={idx} className="bg-surface-container text-xs font-mono text-muted px-2 py-1">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Deep-Dive Anchor (TOC target) */}
              <div id="cs-deepdive" className="space-y-0">
              {/* Specialized VYOSHA Deep-Dive */}
              {selectedCaseStudy.id === "vyosha" && <VyoshaDeepDive amortizationData={amortizationData} />}

              {/* Specialized ARWS RAW Deep-Dive */}
              {selectedCaseStudy.id === "arws-raw" && <RawDeepDive />}

              {/* Specialized STUDY TRACKER AJ Deep-Dive */}
              {selectedCaseStudy.id === "study-tracker-aj" && <AspirantFlowDeepDive />}

              {/* Specialized CAREER LIBRARY Deep-Dive */}
              {selectedCaseStudy.id === "career-library" && <CareerLibraryDeepDive />}

              {/* Specialized WORK SARTHI Deep-Dive */}
              {selectedCaseStudy.id === "work-sarthi" && <WorkSarthiDeepDive />}

              {/* Specialized AR-AUAGPT Deep-Dive */}
              {selectedCaseStudy.id === "ar-auagpt" && <ArAuAgPtDeepDive />}

              {/* Specialized MEDICINE EXTRACTION Deep-Dive */}
              {selectedCaseStudy.id === "medicine-extraction" && <MedicineExtractionDeepDive />}

              {/* Specialized FARMER CONNECT Deep-Dive */}
              {selectedCaseStudy.id === "farmer-connect" && <FarmerConnectDeepDive />}

              {/* Specialized FRESHSTAMP Deep-Dive */}
              {selectedCaseStudy.id === "freshstamp" && <FreshStampDeepDive />}

              </div>{/* end cs-deepdive */}
              </>
              )}

              {/* Bottom Navigation */}
              <div className="pt-8 border-t border-ink/10 flex justify-between items-center">
                <button
                  onClick={() => {
                    const idx = PROJECTS.findIndex(p => p.id === selectedCaseStudy.id);
                    const prevIdx = idx > 0 ? idx - 1 : PROJECTS.length - 1;
                    openCaseStudy(PROJECTS[prevIdx], caseStudyMode);
                  }}
                  className="text-xs font-mono text-muted hover:text-ink cursor-pointer"
                >
                  <span className="flex items-center gap-1.5"><ArrowLeft size={13} /> PREVIOUS CASE</span>
                </button>
                <button
                  onClick={() => {
                    const idx = PROJECTS.findIndex(p => p.id === selectedCaseStudy.id);
                    const nextIdx = idx < PROJECTS.length - 1 ? idx + 1 : 0;
                    openCaseStudy(PROJECTS[nextIdx], caseStudyMode);
                  }}
                  className="text-xs font-mono text-muted hover:text-ink cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">NEXT CASE <ArrowRight size={13} /></span>
                </button>
              </div>

            </motion.div>
          )}

          {/* TAB 3: EXPERIENCE VIEW */}
          {currentTab === "experience" && !selectedCaseStudy && (
            <motion.div
              key="experience-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16"
            >
              
              {/* Header */}
              <div className="space-y-2 border-b border-ink/10 pb-6">
                <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ink">
                  Professional Experience
                </h1>
                <p className="text-sm text-muted max-w-2xl font-sans leading-relaxed">
                  A journey from finance operations to building software—using business experience to create products that solve real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left side Timeline listings (Span 8) */}
                <div className="lg:col-span-8 space-y-10">
                  {PORTFOLIO_OWNER.experience.map((job, idx) => (
                    <div key={idx} className="relative pl-6 border-l border-ink/10 space-y-3">
                      <div className="absolute top-1.5 left-[-4px] h-2 w-2 rounded-full bg-accent" />
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 font-mono text-xs">
                        <span className="text-accent tracking-wider font-bold block uppercase">// {job.duration}</span>
                        <span className="text-muted">{job.location}</span>
                      </div>

                      <div>
                        <h3 className="font-serif text-xl font-bold text-ink leading-tight">{job.role}</h3>
                        <span className="font-mono text-xs font-semibold text-muted">{job.company}</span>
                      </div>

                      <ul className="space-y-2 text-xs md:text-sm text-muted font-sans list-disc pl-4 leading-relaxed">
                        {job.points.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {job.skills.map((s, i) => (
                            <span key={i} className="bg-surface-container text-[10px] font-mono text-muted px-2 py-0.5 border border-ink/5 rounded-sm">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                 {/* Right side Education & Certifications (Span 4) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Education Section */}
                  <div className="bg-surface-container p-6 border border-ink/5 space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-accent" />
                      <span className="text-xs font-mono text-accent tracking-widest block font-bold uppercase">EDUCATION</span>
                    </div>
                    
                    <div className="space-y-4">
                      {PORTFOLIO_OWNER.education.map((edu, idx) => (
                        <div key={idx} className="p-3 bg-paper border border-ink/5 space-y-1.5 rounded-sm">
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-serif font-bold text-sm text-ink">{edu.degree}</span>
                            <span className="text-[10px] font-mono text-accent bg-accent/5 px-1.5 py-0.5 rounded-sm">{edu.duration}</span>
                          </div>
                          <p className="text-xs font-sans text-ink leading-relaxed">{edu.specialization}</p>
                          <p className="text-[11px] font-mono text-muted">{edu.institution}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Credentials / Certifications */}
                  <div className="bg-surface-container p-6 border border-ink/5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-accent" />
                      <span className="text-xs font-mono text-accent tracking-widest block font-bold uppercase">CERTIFICATIONS</span>
                    </div>
                    
                    <div className="space-y-3.5">
                      {PORTFOLIO_OWNER.certifications.map((cert, idx) => (
                        <div key={idx} className="p-3 bg-paper border border-ink/5 space-y-2 rounded-sm hover:border-accent/15 transition-colors">
                          <div className="space-y-0.5">
                            <h4 className="font-sans font-bold text-xs text-ink leading-tight">{cert.name}</h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-muted">
                              <span>{cert.issuer}</span>
                              <span>•</span>
                              <span>{cert.date}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5 pt-1 border-t border-ink/5">
                            <div className="text-[10px] font-mono text-muted flex items-center justify-between">
                              <span>ID: <code className="text-ink">{cert.credentialId}</code></span>
                            </div>
                            <a 
                              href={cert.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[10px] font-mono text-accent hover:text-accent-high font-bold flex items-center gap-0.5 transition-colors cursor-pointer self-start"
                            >
                              <span className="flex items-center gap-1">Show credential <ExternalLink size={10} /></span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Systems logic sidebar card */}
                  <div className="border border-ink/10 p-5 bg-paper space-y-3">
                    <span className="text-[10px] font-mono text-muted tracking-wider block uppercase font-bold">// Surat Operations</span>
                    <p className="text-xs text-muted leading-relaxed font-sans">
                      My work is centered in Surat, Gujarat, India, delivering high-performance, resilient software systems and business integrations to regional and global teams.
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 4: CONTACT VIEW */}
          {currentTab === "contact" && !selectedCaseStudy && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12"
            >
              
              {/* Header */}
              <div className="space-y-2 border-b border-ink/10 pb-6">
                <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ink">
                  Let's build better systems.
                </h1>
                <p className="text-sm text-muted max-w-2xl font-sans">
                  Whether you are looking to audit an existing reconciliation pipeline, integrate server-side AI, or design a clean operational dashboard, get in touch.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Contact Form panel (Span 7) */}
                <div className="lg:col-span-7 bg-surface-container p-6 border border-ink/5 space-y-6">
                  <div className="flex items-center gap-2">
                    <Terminal size={15} className="text-accent" />
                    <span className="text-xs font-mono font-bold text-ink uppercase tracking-wider">SECURE MESSAGING CHANNEL</span>
                  </div>

                  <AnimatePresence>
                    {contactSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2"
                      >
                        <Check size={14} className="text-emerald-700 shrink-0" />
                        <span>Your message has been dispatched! I'll respond within 24 hours.</span>
                      </motion.div>
                    )}
                    {contactError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2"
                      >
                        <X size={14} className="text-red-700 shrink-0" />
                        <span>{contactError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-muted uppercase block mb-1">Your Name</label>
                        <input 
                          type="text" 
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Arpit Jaiswal" 
                          className="w-full bg-paper border border-ink/10 p-2.5 text-xs text-ink focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-muted uppercase block mb-1">Your Email</label>
                        <input 
                          type="email" 
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="e.g. name@company.com" 
                          className="w-full bg-paper border border-ink/10 p-2.5 text-xs text-ink focus:outline-none focus:border-accent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-muted uppercase block mb-1">Transmission Details (Message)</label>
                      <textarea 
                        rows={6}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Detail your operational bottleneck or project specification..." 
                        className="w-full bg-paper border border-ink/10 p-2.5 text-xs text-ink focus:outline-none focus:border-accent resize-none"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSending}
                      className="px-5 py-3 bg-ink hover:bg-accent disabled:opacity-60 text-paper text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                      id="contact-submit-btn"
                    >
                      {isSending ? (
                        <>
                          <span className="animate-spin inline-block h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>SEND DISPATCH</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Direct info column (Span 5) */}
                <div className="lg:col-span-5 space-y-6">

                  {/* Quick-Action Buttons */}
                  <div className="bg-paper border border-ink/15 p-6 space-y-3">
                    <span className="text-[10px] font-mono text-accent tracking-widest block font-bold uppercase">// ONE-CLICK DIRECT CONTACT</span>
                    <p className="text-xs text-muted font-sans">Busy? Skip the form — reach me instantly:</p>
                    <div className="flex flex-col gap-2.5">
                      <button
                        id="copy-email-btn"
                        onClick={handleCopyEmail}
                        className="flex items-center gap-3 px-4 py-3 bg-ink hover:bg-accent text-paper text-xs font-mono font-bold tracking-wider uppercase transition-all w-full cursor-pointer"
                      >
                        {emailCopied ? <Check size={13} className="text-emerald-400" /> : <Mail size={13} />}
                        {emailCopied ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}
                      </button>
                      <a
                        id="whatsapp-contact-btn"
                        href="https://wa.me/919624997427?text=Hi%20Arpit%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all w-full"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        CHAT ON WHATSAPP
                      </a>
                      <a
                        id="call-direct-btn"
                        href="tel:+919624997427"
                        className="flex items-center gap-3 px-4 py-3 border border-ink/20 hover:bg-ink hover:text-paper text-ink text-xs font-mono font-bold tracking-wider uppercase transition-all w-full"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17.92z"/></svg>
                        CALL DIRECT (+91 96249 97427)
                      </a>
                    </div>
                  </div>

                  {/* HQ Info details */}
                  <div className="bg-paper border border-ink/15 p-6 space-y-4">
                    <span className="text-[10px] font-mono text-accent tracking-widest block font-bold uppercase">// CONTACT METRICS & DIRECT CHANNELS</span>
                    
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between border-b border-ink/10 pb-2">
                        <span className="text-muted">LOCATION:</span>
                        <span className="text-ink font-bold">{PORTFOLIO_OWNER.location}</span>
                      </div>
                      <div className="flex justify-between border-b border-ink/10 pb-2">
                        <span className="text-muted">EMAIL:</span>
                        <a href={`mailto:${PORTFOLIO_OWNER.contactInfo.email}`} className="text-ink font-bold hover:text-accent transition-colors">
                          {PORTFOLIO_OWNER.contactInfo.email}
                        </a>
                      </div>
                      <div className="flex justify-between border-b border-ink/10 pb-2">
                        <span className="text-muted">MOBILE:</span>
                        <a href={`tel:${PORTFOLIO_OWNER.contactInfo.phone}`} className="text-ink font-bold hover:text-accent transition-colors">
                          {PORTFOLIO_OWNER.contactInfo.phone}
                        </a>
                      </div>
                      <div className="flex justify-between border-b border-ink/10 pb-2">
                        <span className="text-muted">LINKEDIN:</span>
                        <a href={`https://${PORTFOLIO_OWNER.contactInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-ink font-bold hover:text-accent transition-colors underline decoration-dotted">
                          {PORTFOLIO_OWNER.contactInfo.linkedin}
                        </a>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-muted">GITHUB:</span>
                        <a href={`https://${PORTFOLIO_OWNER.contactInfo.github}`} target="_blank" rel="noreferrer" className="text-ink font-bold hover:text-accent transition-colors underline decoration-dotted">
                          {PORTFOLIO_OWNER.contactInfo.github}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Live Audit Log (Shows logged contact messages!) */}
                  {messagesLog.length > 0 && (
                    <div className="border border-emerald-800/35 bg-emerald-50/20 p-4 space-y-3">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 tracking-wider block uppercase">// ACTIVE TRANSMISSION AUDIT LOG</span>
                      <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar divide-y divide-emerald-800/10">
                        {messagesLog.map((m, idx) => (
                          <div key={idx} className="pt-2 first:pt-0 text-[11px] font-mono space-y-0.5">
                            <div className="flex justify-between text-emerald-900 font-bold">
                              <span>FROM: {m.name}</span>
                              <span>{m.date}</span>
                            </div>
                            <p className="text-muted text-xs truncate">{m.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          )}



        </AnimatePresence>
      </main>

      {/* Footer Element */}
      <Footer scrollToTop={scrollToTop} />

      {/* Interactive PDF Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
        onDownload={handleDownloadResume}
      />

    </div>
  );
}
