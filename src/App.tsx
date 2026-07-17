import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import PrintableResume from "./components/PrintableResume";
import TypingText from "./components/TypingText";
import { PROJECTS, PORTFOLIO_OWNER } from "./data";
import { Project } from "./types";
import { 
  ArrowRight, 
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
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  
  // Contact state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
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

  // Filter project listing
  const filteredProjects = projectFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === projectFilter);

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
                <div className="lg:col-span-4 bg-surface-container p-6 space-y-4 border border-ink/5 relative group">
                  <div className="aspect-[4/5] bg-ink/10 overflow-hidden relative border border-ink/10">
                    <img 
                      src={PORTFOLIO_OWNER.portraitUrl}
                      alt="Arpit Jaiswal Portrait" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-ink/80 text-paper px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase">
                      FIG 01. ARPIT JAISWAL, PORTRAIT
                    </div>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="text-muted">LOCATION:</span>
                      <span className="text-ink font-bold">Surat, India</span>
                    </div>
                    <div className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="text-muted">FOCUS:</span>
                      <span className="text-ink font-bold">Full-Stack & Finance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">STATUS:</span>
                      <span className="text-accent font-bold">● ACTIVE</span>
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
                </div>

                <div className="lg:col-span-8 space-y-8 text-sm md:text-base text-muted leading-relaxed font-sans font-light">
                  <div className="p-6 border border-ink/10 bg-surface-container/30 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink uppercase tracking-wider">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span>THE FINANCIAL ORIGIN (JD FINANCE)</span>
                    </div>
                    <p>
                      For nearly three years I ran the complete lending operation at <strong>JD Finance</strong> — loan disbursement, daily repayment, borrower portfolios — and built the Excel systems the team ran on, because nobody else was going to build them. I came back in 2025 to lead that same function again, this time bringing automation and data tooling into it.
                    </p>
                    <p className="italic text-ink font-serif text-sm border-t border-ink/5 pt-3">
                      "That work taught me something no course does: software fails less often because the code is bad, and more often because nobody understood the process it was supposed to replace."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-ink/10 p-5 space-y-3 bg-paper">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 bg-accent" />
                        <span>8 SHIPPED SYSTEMS</span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        So I started building. Eight products, deployed and live — an exam tracker used by aspirants across 27 competitive exams, an AI vision scanner that reads expiry dates off packaging for shopkeepers, a background Android app that deleted an hour of daily data entry for an HR team, a farmer-to-buyer marketplace with a live bidding engine. Not tutorials. Real things, with real users and real bugs I had to go fix on a Sunday.
                      </p>
                    </div>

                    <div className="border border-ink/10 p-5 space-y-3 bg-paper">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 bg-accent" />
                        <span>AI WORKING METHOD</span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        I build with AI IDE agents as my working method — I own the architecture, the trade-offs, and the decisions about what gets built and why; the agent handles the keystrokes. That's how one person ships a Kotlin app with a four-layer deduplication system and a full-stack PostgreSQL marketplace in the same year. It's also why I care more about whether a system solves the actual problem than about which framework it's written in.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 border border-ink/10 bg-accent/5 text-xs font-mono text-ink/90 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="space-y-1">
                      <span className="font-bold block text-accent uppercase tracking-widest">// THE ACADEMIC CROSSOVER</span>
                      <p className="font-sans font-light text-muted leading-relaxed text-xs">
                        I'm finishing my BCA in Surat and starting an MBA at Manipal University Jaipur in Analytics & Data Science and Project Management — because the problems worth solving live where business logic meets the technical one.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* SECTION 03: PROOF IN NUMBERS */}
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }} className="bg-surface-container py-12 px-6 md:px-12 border border-ink/5" id="home-numbers">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">
                  {PORTFOLIO_OWNER.stats.map((stat, idx) => (
                    <div key={idx} className="space-y-2 pt-6 lg:pt-0 lg:pl-6 first:pl-0 first:pt-0">
                      <span className="text-4xl md:text-6xl font-mono font-extrabold text-ink block tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-mono text-muted tracking-widest uppercase block">
                        {stat.label}
                      </span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {PROJECTS.filter(p => p.featured).slice(0, 2).map((project) => (
                    <div 
                      key={project.id} 
                      className="bg-paper border border-ink/10 hover:border-accent transition-all p-6 space-y-4 group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{project.year} // {project.category}</span>
                          <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase">FEATURED</span>
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
                        <button 
                          onClick={() => setSelectedCaseStudy(project)}
                          className="text-xs font-mono text-ink font-bold tracking-wider hover:text-accent flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>CASE STUDY</span>
                          <ArrowRight size={12} />
                        </button>
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
                <p className="text-sm text-muted max-w-2xl font-sans">
                  A comprehensive audit of eight key applications designed, structured, and implemented to solve complex analytical workflows.
                </p>
              </div>

              {/* Category tag filter row */}
              <div className="flex flex-wrap items-center gap-2 border-b border-ink/5 pb-4">
                <span className="text-xs font-mono text-muted mr-2">Filter Category:</span>
                {["All", "Data", "Web Apps", "Mobile", "Internal Tools"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectFilter(cat)}
                    className={`px-3 py-1 text-xs font-mono transition-all border cursor-pointer ${
                      projectFilter === cat 
                        ? "bg-ink text-paper border-ink font-bold" 
                        : "bg-surface-container text-muted border-ink/5 hover:border-ink/20 hover:text-ink"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic GRID for featured / active filter cards */}
              {projectFilter === "All" ? (
                <div className="space-y-12">
                  {/* Featured Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-ink/5 pb-2">
                      <span className="h-2 w-2 bg-accent rounded-full animate-pulse" />
                      <h2 className="font-serif text-lg font-bold text-ink tracking-tight uppercase text-xs font-mono">
                        ★ Featured Systems Work
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
                              <span className="text-accent font-bold">★ FEATURED</span>
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
                                  Live ↗
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
                                  Git ↗
                                </a>
                              )}
                              <button 
                                onClick={() => setSelectedCaseStudy(p)}
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

                  {/* Non-featured Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-ink/5 pb-2">
                      <span className="h-2 w-2 bg-muted/60 rounded-full" />
                      <h2 className="font-serif text-lg font-bold text-ink tracking-tight uppercase text-xs font-mono text-muted">
                        Other Systems & Modules
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProjects.filter(p => !p.featured).map((p) => (
                        <div 
                          key={p.id} 
                          className="border border-ink/10 bg-paper/30 hover:bg-paper transition-all p-5 flex flex-col justify-between group"
                          id={`project-card-${p.id}`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-center font-mono text-[10px] text-muted">
                              <span>{p.year} // {p.category}</span>
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
                                  Live ↗
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
                                  Git ↗
                                </a>
                              )}
                              <button 
                                onClick={() => setSelectedCaseStudy(p)}
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
                          {p.featured && <span className="text-accent font-bold">★ FEATURED</span>}
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
                              Live ↗
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
                              Git ↗
                            </a>
                          )}
                          <button 
                            onClick={() => setSelectedCaseStudy(p)}
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
                    <div className="col-span-full py-16 px-6 border border-dashed border-ink/15 text-center space-y-3 bg-surface-container/50">
                      <span className="text-xs font-mono text-muted uppercase tracking-wider block">// SYSTEM ARCHIVE EMPTY</span>
                      <p className="text-xs text-muted font-sans">
                        No matching projects found. Supply your project details, and the workspace will instantly index and map them across categories.
                      </p>
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
                      {PROJECTS.map((p) => (
                        <tr key={p.id} className="hover:bg-surface-container/30 transition-colors">
                          <td className="p-4 font-bold text-ink">{p.year}</td>
                          <td className="p-4 font-serif text-sm font-semibold text-ink">{p.title}</td>
                          <td className="p-4 font-sans text-xs max-w-xs md:max-w-md truncate">{p.description}</td>
                          <td className="p-4">
                            <span className="truncate block max-w-[120px]">{p.stack.join(", ")}</span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => setSelectedCaseStudy(p)}
                              className="text-accent hover:underline text-[11px] cursor-pointer"
                            >
                              Case Study →
                            </button>
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
                <span>← BACK TO PROJECTS</span>
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
                        Live App ↗
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
                        GitHub ↗
                      </a>
                    ) : (
                      selectedCaseStudy.liveUrl && <span className="text-[11px] font-mono text-muted italic">Private Repo</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Deep dive sections details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left side text columns (Span 8) */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* Problem */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-ink">01 / The Business Problem</h3>
                    <p className="text-sm md:text-base text-muted font-sans leading-relaxed">
                      {selectedCaseStudy.problem || "Legacy infrastructure in enterprise finance operations suffered from massive latency barriers, high risk of user error during manual ledger input, and zero active visual intelligence telemetry."}
                    </p>
                  </div>

                  {/* Built Details / Solution */}
                  <div className="space-y-3">
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
                  <div className="bg-surface-container p-6 border border-ink/5 space-y-4">
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

              {/* Specialized ARWS RAW Deep-Dive */}
              {selectedCaseStudy.id === "arws-raw" && (
                <div className="border-t border-ink/10 pt-10 space-y-10">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// TECHNICAL BLUEPRINT</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: System Mechanics & Defense Pipelines
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      RAW stands for <strong>Record, Analyse, Work</strong>. To meet ARWS's production-grade standard, the system was engineered to survive device sleeps, unstable cellular coverage, and hardware dual-SIM contexts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Block 1: 4-Layer Deduplication */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">CORE PIPELINE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">4-Layer Duplication Prevention</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        The most common failure mode in call-logging systems is duplicate writes due to poor network retry states. RAW addresses this with an end-to-end 4-layer defense pipeline:
                      </p>
                      <ul className="space-y-3 text-xs font-mono">
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">L1:</span>
                          <div>
                            <span className="font-bold block">5-Factor Collision-Proof Key</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Constructs a unique ID hash: <code>normalizedNum_dateMillis_duration_callType_simId</code> with millisecond precision.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">L2:</span>
                          <div>
                            <span className="font-bold block">Room DB Unique Constraints</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Database-level unique indexing on <code>uniqueCallId</code> with an idempotent <code>OnConflictStrategy.IGNORE</code> layer.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">L3:</span>
                          <div>
                            <span className="font-bold block">Kotlin Coroutines Mutex Lock</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              SyncManager uses <code>syncMutex.tryLock()</code> to prevent overlapping background upload cycles from executing concurrently.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">L4:</span>
                          <div>
                            <span className="font-bold block">Server-Side R_A_CheckDuplicate</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              The Apps Script scans Column H via a single batch range search before applying any row append operation, yielding a truly idempotent loop.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Block 2: Multi-SIM Separation */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">PRIVACY ENGINE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Dual-SIM Hardware Separation</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        ARWS agents carry their personal contacts on the same devices used for professional calls. Standard Call Log trackers capture everything, violating privacy laws. RAW enforces strict boundary isolation:
                      </p>
                      <ul className="space-y-3 text-xs font-mono">
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">01.</span>
                          <div>
                            <span className="font-bold block">Active Subscription ID Picker</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              During Setup, <code>SubscriptionManager</code> lists active SIM ids and carriers. The user binds their official Company SIM.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">02.</span>
                          <div>
                            <span className="font-bold block">Double-Gate Discard Code Path</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              SIM validation checks are integrated both in real-time within <code>CallTrackingService.kt</code> and during the batch log scanner.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">03.</span>
                          <div>
                            <span className="font-bold block">Immediate Memory Flush</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Personal calls trigger an instant discard log and are never cached, written to the DB, or outputted to log files.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Block 3: WorkManager Boundary Alignment */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">BG STRATEGY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Clock-Boundary Aligned Sync</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Rather than utilizing battery-intensive and volatile intervals (which Android Doze mode forcefully kills), RAW uses a mathematical clock-grid system:
                      </p>
                      <div className="border-l-2 border-accent/30 pl-3 space-y-2 text-xs">
                        <p className="font-mono text-[11px] text-ink">
                          <strong>Boundary Floor Algorithm:</strong><br />
                          The system snaps time intervals to floor-aligned 30-minute marks (e.g. <code>:00</code> or <code>:30</code>). When the worker runs, it calculates precisely:
                        </p>
                        <pre className="bg-paper p-2 font-mono text-[10px] text-muted overflow-x-auto whitespace-pre">
{`fun getCurrentBoundary(now: Long): Long {
  val cal = Calendar.getInstance().apply { timeInMillis = now }
  val min = cal.get(Calendar.MINUTE)
  cal.set(Calendar.MINUTE, if (min >= 30) 30 else 0)
  cal.set(Calendar.SECOND, 0)
  cal.set(Calendar.MILLISECOND, 0)
  return cal.timeInMillis
}`}
                        </pre>
                        <p className="text-[11px] text-muted leading-normal">
                          This boundary alignment guarantees no overlapping scan queries and guarantees 100% data replication with zero data duplication.
                        </p>
                      </div>
                    </div>

                    {/* Block 4: Low-Latency OS Hook */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">OS HEURISTIC</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Native Android Telephony Hacks</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Android's media layer is notoriously asynchronous. Building real-time background syncs requires overriding typical lifecycle behaviors:
                      </p>
                      <ul className="space-y-3 text-xs font-mono">
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">A.</span>
                          <div>
                            <span className="font-bold block">1500ms Database Write Wait-State</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              The OS does not write <code>CallLog.Calls</code> immediately upon going idle. A custom main-thread <code>Looper Handler</code> delays call reads to guarantee the fresh call record is flushed.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">B.</span>
                          <div>
                            <span className="font-bold block">START_STICKY + BootReceiver Durability</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Declared with <code>foregroundServiceType="dataSync"</code>. Survives both Operating System low-memory (OOM) sweeps and hardware reboots automatically.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">C.</span>
                          <div>
                            <span className="font-bold block">Serverless Apps Script Webhook</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              A lightweight Web App script is deployed on Google Apps Script, handling POST parameters, validating phone numbers and fields, and mapping records at $0 infrastructure cost.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}

              {/* Specialized STUDY TRACKER AJ Deep-Dive */}
              {selectedCaseStudy.id === "study-tracker-aj" && (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// SYSTEM METRICS & ARCHITECTURE</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Full-Stack Synergy & Smart Coach Engine
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      Study Tracker AJ is a highly optimized, zero-framework progressive preparation environment built with native web primitives and Firebase serverless cloud databases.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Subject Curriculum & Architecture */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">CURRICULUM</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Multi-Subject Architecture</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        The preparation scope tracks 178 modules partitioned between immediate high-ROI NQT tasks (Phase 1) and advanced SSC CGL concepts (Phase 2) across 6 subjects:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] font-mono border-collapse text-ink">
                          <thead>
                            <tr className="border-b border-ink/10 text-muted uppercase">
                              <th className="text-left py-1">Subject</th>
                              <th className="text-center py-1">Chapters</th>
                              <th className="text-center py-1">NQT</th>
                              <th className="text-center py-1">SSC</th>
                              <th className="text-right py-1">Accent</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">⚡ Speed Math</td>
                              <td className="text-center font-bold">28</td>
                              <td className="text-center">28</td>
                              <td className="text-center text-muted">0</td>
                              <td className="text-right text-orange-500">Orange</td>
                            </tr>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">🔢 Quant Aptitude</td>
                              <td className="text-center font-bold">41</td>
                              <td className="text-center">27</td>
                              <td className="text-center">14</td>
                              <td className="text-right text-purple-400">Purple</td>
                            </tr>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">🧠 Logical Reasoning</td>
                              <td className="text-center font-bold">44</td>
                              <td className="text-center">23</td>
                              <td className="text-center">21</td>
                              <td className="text-right text-blue-400">Blue</td>
                            </tr>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">📝 English Language</td>
                              <td className="text-center font-bold">26</td>
                              <td className="text-center">25</td>
                              <td className="text-center">1</td>
                              <td className="text-right text-emerald-400">Green</td>
                            </tr>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">💻 NQT Coding</td>
                              <td className="text-center font-bold">16</td>
                              <td className="text-center">16</td>
                              <td className="text-center text-muted">0</td>
                              <td className="text-right text-amber-500">Amber</td>
                            </tr>
                            <tr>
                              <td className="py-1">🌍 General Knowledge</td>
                              <td className="text-center font-bold">23</td>
                              <td className="text-center">12</td>
                              <td className="text-center">11</td>
                              <td className="text-right text-pink-400">Pink</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Adaptive Recommendations */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">AI ADVISOR</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Smart Recommendation Engine</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Rather than displaying static, unhelpful lists, Study Tracker AJ reads current checklist levels on each load and dynamically generates high-ROI strategic alerts via <code>renderSmartSuggestion()</code>:
                      </p>
                      <div className="space-y-2 font-mono text-xs text-ink">
                        <div className="border border-red-500/20 bg-red-500/5 p-2 rounded">
                          <span className="text-[10px] text-red-400 uppercase tracking-wider block font-bold">// CRITICAL BLOCKER</span>
                          <p className="text-xs font-sans mt-1">"🔴 Finish Coding first — it's NQT-exclusive and has the highest stake in short-term placement ratios."</p>
                        </div>
                        <div className="border border-amber-500/20 bg-amber-500/5 p-2 rounded">
                          <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold">// STRATEGIC DEFENSE</span>
                          <p className="text-xs font-sans mt-1">"⚠️ Complete Phase 1 of Quant + Reasoning — representing the absolute highest core ROI for TCS NQT scorecards."</p>
                        </div>
                      </div>
                    </div>

                    {/* iframe Theme Isolation & Dynamic Injection */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">SANDBOX</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Theme Injection & Iframe Bridges</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To enable isolation and speed up independent builds, trackers operate as standalone child HTML files within parent wrappers. Standard iframes create visual fragmentation. The system bridges this gap seamlessly:
                      </p>
                      <div className="border-l-2 border-accent/30 pl-3 space-y-2 text-xs">
                        <p className="font-mono text-[11px] text-ink">
                          <strong>The CSS Injection Strategy:</strong>
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                          A central <code>injectTheme(iframe)</code> routine directly targets the iframe's content document root, projecting all parent CSS variables, tokens, fonts, and dark backgrounds cleanly into the sandbox context.
                        </p>
                        <p className="font-mono text-[11px] text-ink mt-2">
                          <strong>The Height Sync Protocol:</strong>
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                          The child triggers parent updates through the HTML5 <code>postMessage</code> API with custom payloads (<code>'iframeHeight'</code>), adjusting dimensions on-the-fly to remove secondary scrollbars.
                        </p>
                      </div>
                    </div>

                    {/* Real-time sync pipeline */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">CLOUD ARCHITECTURE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Real-Time Firebase Synchronization</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        A dual-storage persistence loop guarantees offline protection and high-durability cross-device sync.
                      </p>
                      <ul className="space-y-3 text-xs font-mono">
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">1.</span>
                          <div>
                            <span className="font-bold block">Local Cache Checkpoint</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Checkbox states write immediately to localStorage via <code>localStorage.setItem()</code>, giving zero-latency feedback loops.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">2.</span>
                          <div>
                            <span className="font-bold block">Cross-Iframe Event Bridge</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Parent windows intercept child mutations using standard window <code>'storage'</code> event listeners, keeping multiple windows fully coordinated.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">3.</span>
                          <div>
                            <span className="font-bold block">Firestore Map Document Sync</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Validated mutations trigger a debounced <code>updateDoc()</code> or <code>setDoc(merge: true)</code> to the user's specific Firestore document.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}

              {/* Specialized CAREER LIBRARY Deep-Dive */}
              {selectedCaseStudy.id === "career-library" && (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// DISCOVERY ENGINE & AI MATRIX</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Information Density & Multi-Path Discovery
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      Career Library is a zero-framework, high-performance static SPA serving over 10,000 structured academic and occupational data points directly on the client edge.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Discovery Pathways */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">DISCOVERY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Multi-Pathway Architecture</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To match varying stages of a student's cognitive planning, three independent navigation flows map into a unified taxonomy:
                      </p>
                      <ul className="space-y-3 text-xs font-mono text-ink">
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">01.</span>
                          <div>
                            <span className="font-bold block">Stream-Based Partitioning</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Filters by secondary disciplines (PCM, PCB, Commerce, Humanities), immediately showing comprehensive non-traditional alternatives to break narrow academic tunnel-vision.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">02.</span>
                          <div>
                            <span className="font-bold block">3-Tier Taxonomy Drill-Down</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Hierarchical catalog scaling from broad <strong>Industries</strong> down to <strong>Career Families</strong> and ultimately <strong>Individual Careers</strong> with automated deep breadcrumbs.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">03.</span>
                          <div>
                            <span className="font-bold block">Client-Side O(1) Instant Search</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              A lightweight, pre-indexed JSON registry enables sub-millisecond keyword matches over 225 careers with zero background API overhead.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* AI Assessment Engine */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">AI ANALYSIS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Personalized Marksheet Fit Evaluation</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        The platform's flagship feature provides structured career suitability analysis by evaluating academic transcripts or marksheets against a career's exact profile parameters:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-3 rounded text-xs font-mono">
                        <span className="text-[10px] text-accent uppercase tracking-wider block font-bold">// CLAUDE PROMPT COMPOSITION</span>
                        <div className="text-[11px] text-ink leading-relaxed space-y-1">
                          <p><strong>1. Parsing:</strong> Web API <code>FileReader</code> processes local files (PDF/TXT/DOCX) on-the-fly.</p>
                          <p><strong>2. Context Assembly:</strong> Dynamically merges parsed raw academic grades with career-specific traits, entrance criteria, and educational pathways.</p>
                          <p><strong>3. Synthesis:</strong> Claude Sonnet evaluates the candidate on 5 distinct dimensions: <em>academic fit, trait alignment, market viability, timeline readiness, and potential blockers</em>.</p>
                        </div>
                      </div>
                    </div>

                    {/* Highly Structured Templates */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">DATA DEPTH</span>
                        <h4 className="font-serif font-bold text-lg text-ink">9-Section Complete Career Blueprint</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Rather than surface-level definitions, every single career features deep analytical data. The dynamic templating covers:
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-ink">
                        <div className="bg-paper p-2 border border-ink/5">
                          <span className="font-bold block text-accent">A. Careers Map</span>
                          <span className="text-muted text-[10px]">Paths mapping PCM/PCB/Comm streams to degrees.</span>
                        </div>
                        <div className="bg-paper p-2 border border-ink/5">
                          <span className="font-bold block text-accent">B. Exams & Colleges</span>
                          <span className="text-muted text-[10px]">700+ entrance exams paired with 5,000+ top Indian colleges.</span>
                        </div>
                        <div className="bg-paper p-2 border border-ink/5">
                          <span className="font-bold block text-accent">C. Specialty Tracks</span>
                          <span className="text-muted text-[10px]">Detailed sub-specializations & role splits.</span>
                        </div>
                        <div className="bg-paper p-2 border border-ink/5">
                          <span className="font-bold block text-accent">D. Ideal Traits</span>
                          <span className="text-muted text-[10px]">Core psychological profiles & required aptitudes.</span>
                        </div>
                      </div>
                    </div>

                    {/* Zero-Framework Styling Architecture */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">CRAFTSMANSHIP</span>
                        <h4 className="font-serif font-bold text-lg text-ink">No-Framework Performance & Theming</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Career Library demonstrates how high design fidelity can be achieved entirely with native, zero-runtime standard utilities:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="flex justify-between items-start border-b border-ink/5 pb-2">
                          <div>
                            <span className="font-bold block">14-Theme Attribute Engine</span>
                            <span className="text-muted text-[11px] leading-normal">
                              CSS custom properties applied via HTML body <code>data-industry="..."</code> attributes allow one stylesheet to elegantly re-theme 225 pages on loading.
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">IntersectionObserver Header</span>
                            <span className="text-muted text-[11px] leading-normal">
                              Tracks scrolling inside deep career templates to automatically update and highlight the primary sub-nav menu sections.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Specialized WORK SARTHI Deep-Dive */}
              {selectedCaseStudy.id === "work-sarthi" && (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// COGNITIVE AI PIPELINE & MULTILINGUAL PERSISTENCE</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Multi-Stage Parallel AI & 13-Language i18n
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      Work Sarthi coordinates multiple psychological frameworks and launches parallel client-side API requests to deliver personalized career roadmaps with absolute data sovereignty.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Multi-Framework Psychometrics */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">PSYCHOMETRICS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Tri-Framework Normalization</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        The core assessment unifies three academically validated behavioral frameworks, tracking over 60 dynamic vectors through a standardized mathematical pipeline:
                      </p>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent font-mono text-xs font-bold block">RIASEC</span>
                          <span className="text-[10px] text-muted font-mono uppercase block mt-1">Holland Codes</span>
                          <span className="text-[11px] text-ink block mt-1 leading-tight">Realistic, Social, Enterprising, etc.</span>
                        </div>
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent font-mono text-xs font-bold block">OCEAN</span>
                          <span className="text-[10px] text-muted font-mono uppercase block mt-1">Big Five</span>
                          <span className="text-[11px] text-ink block mt-1 leading-tight">Openness to Neuroticism.</span>
                        </div>
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent font-mono text-xs font-bold block">HOFSTEDE</span>
                          <span className="text-[10px] text-muted font-mono uppercase block mt-1">Cultural Dimensions</span>
                          <span className="text-[11px] text-ink block mt-1 leading-tight">6 dimensions of social values.</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted font-mono">
                        Standardized scoring maps individual Likert inputs via <code>round((sum / (count * 5)) * 10)</code> to guarantee equivalent weighting.
                      </p>
                    </div>

                    {/* AI Pipeline Orchestration */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ORCHESTRATION</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Parallel AI Engine & fallbacks</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Fires sequential and concurrent REST API endpoints directly to Google Gemini 1.5 Flash in a structured multi-stage topology to shrink generation times by ~60%:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-3 rounded text-xs font-mono text-ink">
                        <div className="space-y-1.5">
                          <p className="text-[11px] flex justify-between">
                            <strong>Stage 1: Main Diagnostic</strong>
                            <span className="text-accent font-bold">1x Call (45s timeout)</span>
                          </p>
                          <p className="text-[10px] text-muted">Generates overall clusters, themes, and high-level SWOT metrics in forced JSON.</p>
                        </div>
                        <div className="space-y-1.5 pt-2 border-t border-ink/5">
                          <p className="text-[11px] flex justify-between">
                            <strong>Stage 2: Parallel Deep SWOTs</strong>
                            <span className="text-accent font-bold">4x Calls (Promise.all)</span>
                          </p>
                          <p className="text-[10px] text-muted">Launches concurrent API requests for localized career match analyses and comparative ranking justifications.</p>
                        </div>
                        <div className="space-y-1.5 pt-2 border-t border-ink/5">
                          <p className="text-[11px] flex justify-between">
                            <strong>Fallback: Offline Pearson Engine</strong>
                            <span className="text-muted font-bold">Client-Side Array Math</span>
                          </p>
                          <p className="text-[10px] text-muted">Calculates trigonometric vector overlaps if API throttles, yielding instantly formatted matching arrays.</p>
                        </div>
                      </div>
                    </div>

                    {/* i18n & Prompt Localization */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">LOCALIZATION</span>
                        <h4 className="font-serif font-bold text-lg text-ink">13-Language Multi-National i18n</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Rather than standard English-only interfaces, Work Sarthi integrates a high-fidelity localization architecture targeting India's diverse student demographics:
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="font-mono font-bold block text-ink">A. Framework Mapping</span>
                          <span className="text-muted leading-relaxed block text-[11px]">
                            Leverages <code>i18next</code> and <code>react-i18next</code> to handle over 1,000 UI dictionary keys spanning English, Hindi, Tamil, Telugu, Gujarati, and 8 other regional tongues.
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono font-bold block text-ink">B. Prompt Language Injection</span>
                          <span className="text-muted leading-relaxed block text-[11px]">
                            The current locale parameter threads directly into the AI orchestrator's system context. This instructs Gemini to emit all advisory outputs natively in the requested language.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PDF Export & Admin Panel */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">UTILITIES</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Enterprise-Grade PDF & Control Panel</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Supports high-fidelity exporting and real-time prompt modification with local administration controls:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="flex justify-between items-start border-b border-ink/5 pb-2">
                          <div>
                            <span className="font-bold block">150 DPI PDF Vector Export</span>
                            <span className="text-muted text-[11px] leading-normal">
                              Uses <code>html2canvas</code> and <code>jsPDF</code> to slice complex Recharts radar displays and HTML hierarchies cleanly into print-ready A4 reports.
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Live Prompt-Tuning Dashboard</span>
                            <span className="text-muted text-[11px] leading-normal">
                              Provides a password-protected route allowing administrators to edit the active core prompts, persist changes to localStorage, or export responses to clean CSV arrays.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Specialized AR-AUAGPT Deep-Dive */}
              {selectedCaseStudy.id === "ar-auagpt" && (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// COMMODITY PIPELINES & MULTI-PLATFORM SYNC</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Five-Tier Redundancy & Duty-Inclusive Pricing
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      AR-AuAgPt acts as a highly resilient pricing proxy that bridges global precious metal spot rates with localized Indian retail market realities.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Five-Tier Redundancy Chain */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">REDUCING DOWNTIME</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Five-Tier Data Acquisition</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To guarantee that retail price cards are never blank, the stateless Express gateway manages a robust fall-back cascade:
                      </p>
                      <ul className="space-y-2 text-xs font-mono text-ink">
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">1.</span>
                          <div>
                            <span className="font-bold">Swissquote Spot API:</span>
                            <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                              Pulls institutional-grade, real-time bid/ask streams for Gold, Silver, and Platinum.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">2.</span>
                          <div>
                            <span className="font-bold">Yahoo Finance Futures:</span>
                            <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                              Fallback index that queries futures contracts (GC=F, SI=F, PL=F) via the <code>yahoo-finance2</code> library.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">3.</span>
                          <div>
                            <span className="font-bold">Frankfurter FX (ECB):</span>
                            <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                              Third-line provider for real-time EUR/USD and USD/INR exchange parameters if primary feeds time out.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">4.</span>
                          <div>
                            <span className="font-bold">In-Memory Cache & Local Storage:</span>
                            <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                              Falls back to server-side cache or client-side localStorage values (<code>ar_market_cache_v2</code>) with client-side TTL checks.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">5.</span>
                          <div>
                            <span className="font-bold">Emergency Fallbacks:</span>
                            <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                              Loads pre-calibrated baseline parameters corresponding to verified April 2026 commodity index levels.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* India Duty Multiplier Model */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">TAX LAYERING</span>
                        <h4 className="font-serif font-bold text-lg text-ink">IBJA-Calibrated Multipliers</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Rather than displaying raw global spot values that fail to account for Indian import duty regulations, the pricing engine applies strict mathematical formulas:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-4 rounded space-y-3 font-mono text-[11px] text-ink">
                        <div className="space-y-1">
                          <p className="font-bold text-accent">GOLD MULTIPLIER:</p>
                          <code className="text-muted block text-[10px]">INR Price = (USD/oz × USD_INR_Rate / 31.1035g) × 1.0628</code>
                          <p className="text-muted text-[10px] leading-relaxed">Accounts for 6% basic import duty, 1% AIDC surcharge, and 3% GST compound layering.</p>
                        </div>
                        <div className="space-y-1 pt-2 border-t border-ink/5">
                          <p className="font-bold text-accent">SILVER MULTIPLIER:</p>
                          <code className="text-muted block text-[10px]">INR Price = (USD/oz × USD_INR_Rate / 31.1035g) × 1.0759</code>
                          <p className="text-muted text-[10px] leading-relaxed">Independently verified against live India market pricing (IBJA ₹2,42,400/kg benchmark equivalents).</p>
                        </div>
                        <div className="space-y-1 pt-2 border-t border-ink/5">
                          <p className="font-bold text-accent">PLATINUM MULTIPLIER:</p>
                          <code className="text-muted block text-[10px]">INR Price = (USD/oz × USD_INR_Rate / 31.1035g) × 0.9748</code>
                          <p className="text-muted text-[10px] leading-relaxed">Adjusted factor matching the contemporary zero-duty premium regulatory regime.</p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Charts & Comparison Mode */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ANALYTICS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">30-Year Charting & Normalize View</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Features highly responsive multi-range charts coupled with relative-percentage tracking to normalise commodity comparisons:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="flex justify-between items-start border-b border-ink/5 pb-2">
                          <div>
                            <span className="font-bold block">Compounding FX Devaluation</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              Applies historical currency depreciation data to historical spot prices. Allows users to witness how Gold hedge yields compound over 30 years compared to dollar indexes.
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Relative Normalization Toggle</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              Plots Gold, Silver, and Platinum as relative percentage changes from the selected chart window starting point, standardising the massive dollar-per-ounce gap.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progressive Web App & Native Builds */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">CROSS-PLATFORM</span>
                        <h4 className="font-serif font-bold text-lg text-ink">One Codebase, Four Surfaces</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Maintains identical feature sets, layout tokens, and synchronization behaviors across multiple target environments:
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div className="space-y-1">
                          <span className="font-bold block text-ink">A. Vite PWA Engine</span>
                          <span className="text-muted leading-relaxed block text-[11px]">
                            Integrates offline fallback capabilities via <code>vite-plugin-pwa</code>. Caches static shells and displays cached rates gracefully during connection drops.
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="font-bold block text-ink">B. Capacitor Native Bridge</span>
                          <span className="text-muted leading-relaxed block text-[11px]">
                            Wraps the compiled React bundle using Capacitor into native iOS and Android packages, offering native binary performance with zero-lag over-the-air client parity.
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Specialized MEDICINE EXTRACTION Deep-Dive */}
              {selectedCaseStudy.id === "medicine-extraction" && (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// POLYGLOT MICROSERVICES & ENFORCED AI DETERMINISM</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Polyglot Extraction & Decoupled Inference
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      The Medicine Image Extraction platform coordinates three independent microservices tiers to ingest, validate, and persist pharmaceutical labels with absolute type safety and operational uptime.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Polyglot Pipeline & Decoupled Inference */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ARCHITECTURE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Decoupled Three-Tier Polyglot Stack</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Splitting heavyweight AI workloads from orchestrator processes ensures isolated scaling capabilities and prevents memory bloat:
                      </p>
                      <ul className="space-y-2.5 text-xs font-mono text-ink">
                        <li className="flex gap-2">
                          <span className="text-accent font-bold">1. React 19 Frontend:</span>
                          <span className="text-muted text-[11px] leading-relaxed">
                            Handles drag-and-drop file inputs, instant canvas previews, and client-side 5MB limits.
                          </span>
                        </li>
                        <li className="flex gap-2 border-t border-ink/5 pt-2">
                          <span className="text-accent font-bold">2. Node.js Express Gateway:</span>
                          <span className="text-muted text-[11px] leading-relaxed">
                            Manages file storage via Multer, issues 60s asynchronous timeouts, and handles Mongoose persistence.
                          </span>
                        </li>
                        <li className="flex gap-2 border-t border-ink/5 pt-2">
                          <span className="text-accent font-bold">3. FastAPI Python Engine:</span>
                          <span className="text-muted text-[11px] leading-relaxed">
                            Interacts natively with the <code>google-generativeai</code> SDK, enforcing Pydantic validations on raw bytes.
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Forced AI Determinism & Schema Cleanser */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">AI STABILITY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Strict Determinism & Fallback Cleaning</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To bypass the typical unstructured text pitfalls of probabilistic models, the pipeline layers two coordinated formatting patterns:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-3 rounded text-xs font-mono text-ink">
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold text-accent">A. API-Level Output Enforcement</p>
                          <p className="text-[10px] text-muted">Configures Gemini 2.5 Flash with <code>temperature=0.0</code> and explicitly requests <code>response_mime_type="application/json"</code>.</p>
                        </div>
                        <div className="space-y-1 pt-2 border-t border-ink/5">
                          <p className="text-[11px] font-bold text-accent">B. Multi-Strategy Parser Cascade</p>
                          <p className="text-[10px] text-muted">Runs manual regex sweeps to clear backtick block fencings (<code>```json</code>), isolates brace-boundaries, and extracts nested substrings if parsing hits errors.</p>
                        </div>
                      </div>
                    </div>

                    {/* Three-Tier Classification & Persistence */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">DATA INTEGRITY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Status Categorization & MongoDB Audits</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Saves every transaction into MongoDB Atlas paired with metadata to preserve historical lineage:
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-paper p-2.5 border border-emerald-500/10 rounded">
                          <span className="text-emerald-500 font-mono text-xs font-bold block">SUCCESS</span>
                          <span className="text-[9px] text-muted leading-normal mt-1 block">All four vital variables (name, batch, expiry, price) resolved.</span>
                        </div>
                        <div className="bg-paper p-2.5 border border-amber-500/10 rounded">
                          <span className="text-amber-500 font-mono text-xs font-bold block">PARTIAL</span>
                          <span className="text-[9px] text-muted leading-normal mt-1 block">1 to 3 fields captured. Unresolved variables saved as null.</span>
                        </div>
                        <div className="bg-paper p-2.5 border border-red-500/10 rounded">
                          <span className="text-red-500 font-mono text-xs font-bold block">FAILED</span>
                          <span className="text-[9px] text-muted leading-normal mt-1 block">0 fields found or model rejected image. Error logs saved.</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted font-mono leading-normal">
                        Raw Gemini payload buffers are stored side-by-side with sanitized indexes, enabling retrospective query tuning without re-processing image storage.
                      </p>
                    </div>

                    {/* Graceful Degradation Design */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">RESILIENCE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Uptime Persistence & Fail-Safe Defaults</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Architected specifically to protect runtime operations against external network and service drops:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="flex justify-between items-start border-b border-ink/5 pb-2">
                          <div>
                            <span className="font-bold block">Disconnected Database Extractor</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              If the MongoDB replica set drops offline, the Express listener logs the outage but avoids blocking extraction. It returns real-time JSON responses directly to the client interface.
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Non-Cascading Exception Control</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              If FastAPI errors or times out, Node.js captures the failure and logs a custom administrative ticket with standard default parameters, preventing silent frontend crashes.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Specialized FARMER CONNECT Deep-Dive */}
              {selectedCaseStudy.id === "farmer-connect" && (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// TRANSACTION CONCURRENCY & MULTI-PROVIDER AI SYSTEMS</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Race-Free Bidding & Provider Failovers
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      FarmerConnect orchestrates a highly concurrent marketplace with automated data.gov.in mandi indexes, secure Razorpay verification, and a zero-downtime triple AI-agent matrix.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Race-Free Bidding & Transaction Integrity */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">DATABASE TRANSACTIONS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Concurrency-Safe Bidding Engine</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To resolve bidding race conditions where multiple buyers compete on the same crop millisecond-boundary, the marketplace handles placements in isolated relational blocks:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-2 rounded text-xs font-mono text-ink">
                        <div className="flex justify-between font-bold text-accent">
                          <span>STAGE / COMMAND</span>
                          <span>ACTION DESCRIPTION</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">1. SELECT ... FOR UPDATE</strong>
                          <span className="text-muted text-[10px]">Acquires exclusive product row locks in PostgreSQL before read checks. Prevents simultaneous outbid states.</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">2. ATOMIC BIDS FLUSH</strong>
                          <span className="text-muted text-[10px]">In the exact transaction window, sets former competitor bids to 'outbid' and queues push triggers in background callbacks.</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">3. TRANSACTION COMMIT / ROLLBACK</strong>
                          <span className="text-muted text-[10px]">Persists the highest bid. Releases locks or rollbacks the session automatically if calculations trigger a validation conflict.</span>
                        </div>
                      </div>
                    </div>

                    {/* Krishi Sahayak 4-Mode Provider Cascade */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">AI ORCHESTRATION</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Cascading Provider Failover Routing</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        The crop assistance chatbot uses a 2x2 intent matrix (Farmer/General × Live/Knowledge) with a self-healing fallback chain to shield operations from API outages:
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent text-xs font-bold block">LIVE MODE</span>
                          <span className="text-[10px] text-muted block mt-1">Queries OpenRouter with web search and falls back to Google Gemini 2.0 Flash with Search grounding.</span>
                        </div>
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent text-xs font-bold block">KNOWLEDGE MODE</span>
                          <span className="text-[10px] text-muted block mt-1">Routes directly to Groq (Llama 3.3 70B) for sub-second, zero-scraping agricultural wisdom.</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted font-mono leading-relaxed">
                        If a specific provider endpoint yields high latency or ratelimits, the server-side router transparently shifts context payloads to the adjacent tier.
                      </p>
                    </div>

                    {/* Hybrid APMC Caching & Government APIs */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">INTEGRATIONS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Hybrid Caching & Proxy Security</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        FarmerConnect integrates India's official <code>data.gov.in</code> commodity API, securing access and enhancing fetch times:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="flex justify-between items-start border-b border-ink/5 pb-2">
                          <div>
                            <span className="font-bold block">24-Hour PostgreSQL Cache</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              Retrieves fresh mandi rates across all states, writes structured snapshots to database cache tables, and serves local data instantly for common queries.
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Stale-While-Revalidate Warnings</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              If the upstream federal servers drop offline, the gateway serves cached indexes combined with an honest visual notice banner on the UI.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Multi-Tier Security & Compliance */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">SECURITY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Helmet.js & Tiered Throttling Engine</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Because the app provides live bidding, payments, and open AI resources, security layers are embedded at every middleware endpoint:
                      </p>
                      <ul className="space-y-1.5 text-xs font-mono text-ink">
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>7 Throttling Tiers:</strong> Configures rate limits ranging from 5 auth registers/hour to 30 bid creations/minute.</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Cryptographic Signatures:</strong> Razorpay webhook callbacks verify authentic transactions using SHA256 HMAC salts.</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Multimodal Guardrails:</strong> Gemini Vision validates uploaded listing images to block irrelevant uploads before DB insertion.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}

              {/* Specialized FRESHSTAMP Deep-Dive */}
              {selectedCaseStudy.id === "freshstamp" && (
                <div className="border-t border-ink/10 pt-10 space-y-12 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// MULTIMODAL COMPUTER VISION & CLOUD ARCHITECTURES</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Gemini Vision OCR & Dual-Storage Sync
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed font-sans">
                      FreshStamp leverages advanced Gemini 3.5 Flash JSON extraction parameters alongside real-time multi-device cloud persistence patterns and smart FIFO consumption warnings.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Gemini Vision OCR extraction */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">COMPUTER VISION</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Gemini 3.5 Flash JSON Mode</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        To bypass the high friction of typing product info manually, the app converts images to structured, typed objects securely:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-2 rounded text-xs font-mono text-ink">
                        <div className="flex justify-between font-bold text-accent">
                          <span>STEP / PARAMETER</span>
                          <span>ACTION DESCRIPTION</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">1. MULTIPART DATA TRANSFERS</strong>
                          <span className="text-muted text-[10px]">Converts camera images to data URIs inside the browser, passing them base64-encoded to serverless microservices.</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">2. FORCED JSON SCHEMA</strong>
                          <span className="text-muted text-[10px]">Utilizes <code>responseMimeType: 'application/json'</code> to mandate strict schema compatibility across 7 parsed values (name, dates, price).</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">3. TEMPORAL FALLBACKS</strong>
                          <span className="text-muted text-[10px]">Automatically resolves imprecise packaging dates (e.g. "Best Before Oct 2026") to absolute end-of-month calendar dates.</span>
                        </div>
                      </div>
                    </div>

                    {/* Dual Sync Pipeline */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">PERSISTENCE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Dual-Channel Sync & Fallbacks</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        Optimistic UI writes are paired with local/cloud replication models for bulletproof performance and seamless offline usage:
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent text-xs font-bold block">GUEST CHANNELS</span>
                          <span className="text-[10px] text-muted block mt-1">Saves snapshots locally with relative seeds. Transitioning to Google login migrates all offline records.</span>
                        </div>
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent text-xs font-bold block">CLOUD PERSISTENCE</span>
                          <span className="text-[10px] text-muted block mt-1">Fires non-blocking Firestore document payloads to isolate, validate, and secure entries across devices.</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted font-mono leading-relaxed">
                        All local caching operations are namespace-isolated using authenticated Firebase IDs, completely eliminating browser state corruption.
                      </p>
                    </div>

                    {/* FIFO Batch rotation */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ALGORITHMS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">FIFO Batch Rotation Engine</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        FreshStamp tracks multiple inventory instances without adding redundant tables or bloating your database footprint:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="flex justify-between items-start border-b border-ink/5 pb-2">
                          <div>
                            <span className="font-bold block">Derived State Multi-Batching</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              Detects items sharing the same name and brand at runtime, calculating batch counts (Batch X of Y) with zero database overhead.
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Temporal Proximity Engine</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              Computes calendar differences precisely down to day/month/year deltas, applying pulsing 'Consume First! 💡' warning badges to earlier-expiring items.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shelf Life consumed and export-backup system */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">UTILITIES</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Shelf Life Ratios & JSON Backups</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        Designed with advanced user utility helpers to secure data ownership and track item status transitions:
                      </p>
                      <ul className="space-y-1.5 text-xs font-mono text-ink">
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Shelf Life Progress:</strong> Displays active consumable ratios: <code>(Today - MFD) / (EXP - MFD)</code> with dynamic color shifting.</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Data Backups:</strong> Implements zero-dependency browser download anchors to back up and restore datasets with ease.</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Verified Zero Waste:</strong> Features positive reinforcement stats panels when no items are wasted during active billing intervals.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}

              {/* Bottom Navigation */}
              <div className="pt-8 border-t border-ink/10 flex justify-between items-center">
                <button
                  onClick={() => {
                    const idx = PROJECTS.findIndex(p => p.id === selectedCaseStudy.id);
                    const prevIdx = idx > 0 ? idx - 1 : PROJECTS.length - 1;
                    setSelectedCaseStudy(PROJECTS[prevIdx]);
                  }}
                  className="text-xs font-mono text-muted hover:text-ink cursor-pointer"
                >
                  ← PREVIOUS CASE
                </button>
                <button
                  onClick={() => {
                    const idx = PROJECTS.findIndex(p => p.id === selectedCaseStudy.id);
                    const nextIdx = idx < PROJECTS.length - 1 ? idx + 1 : 0;
                    setSelectedCaseStudy(PROJECTS[nextIdx]);
                  }}
                  className="text-xs font-mono text-muted hover:text-ink cursor-pointer"
                >
                  NEXT CASE →
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
                <p className="text-sm text-muted max-w-2xl font-sans">
                  Three years of operational finance management intersecting with custom frontend engineering, design systems, and AI SDK deployments.
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
                              Show credential ↗
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
                        className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono"
                      >
                        ✔ Your message has been dispatched! I'll respond within 24 hours.
                      </motion.div>
                    )}
                    {contactError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-mono"
                      >
                        ✘ {contactError}
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
