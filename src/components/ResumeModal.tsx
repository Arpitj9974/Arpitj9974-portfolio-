import React, { useRef } from "react";
import { X, Printer, FileText, Check, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 md:p-8 animate-fade-in">
      <div className="bg-paper border border-ink/15 shadow-2xl max-w-4xl w-full my-4 flex flex-col rounded-md overflow-hidden">
        
        {/* Top bar */}
        <div className="bg-surface-container border-b border-ink/10 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-ink">Arpit Jaiswal — Professional Resume</h3>
            <p className="text-xs text-muted font-mono mt-0.5">HIGH-FIDELITY VECTOR PRINT ENGINE PREVIEW</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors w-full sm:w-auto justify-center shadow-xs"
            >
              <Printer size={14} />
              <span>Print or Save to PDF</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2.5 border border-ink/20 hover:border-ink text-ink font-mono text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors w-full sm:w-auto justify-center"
            >
              <X size={14} />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/5 border-b border-accent/10 px-6 py-3 text-xs text-ink/90 flex items-start gap-2.5 font-sans">
          <span className="text-accent text-sm">💡</span>
          <p className="leading-relaxed">
            <strong>For a Perfect PDF Download:</strong> Click the <strong className="text-accent">"Print or Save to PDF"</strong> button above, then in your browser's Print dialog, set the Destination to <strong>"Save as PDF"</strong> or <strong>"Microsoft Print to PDF"</strong>. Under More Settings, make sure <strong>"Background graphics"</strong> is checked and Margins are set to <strong>"Default"</strong>.
          </p>
        </div>

        {/* Scrollable Document Stage */}
        <div className="p-4 md:p-8 bg-surface-container/40 overflow-y-auto max-h-[70vh] flex justify-center">
          
          {/* THE RESUME - ALSO ACCESSIBLE TO THE PRINT SELECTOR */}
          <div 
            id="resume-print-root"
            ref={resumeRef}
            className="w-full max-w-[8.27in] bg-white p-8 md:p-12 shadow-md border border-ink/5 text-slate-900 font-sans leading-normal text-left text-[11pt]"
            style={{
              fontFamily: 'Calibri, "Segoe UI", Arial, sans-serif',
              color: '#1a1a1a',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Header */}
            <div className="text-center sm:text-left border-b border-slate-900/10 pb-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">ARPIT JAISWAL</h1>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1.5" style={{ color: '#1f3a5f' }}>
                Full-Stack Builder | Finance Operations | AI &amp; Automation
              </div>
              
              <div className="text-[10pt] text-slate-500 mt-2 flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1">
                <span>Surat, Gujarat, India</span>
                <span className="hidden sm:inline">•</span>
                <a href="tel:+919624997427" className="hover:underline text-slate-700 font-medium">+91 96249 97427</a>
                <span className="hidden sm:inline">•</span>
                <a href="mailto:jaiswalarpit428@gmail.com" className="hover:underline text-slate-700 font-medium">jaiswalarpit428@gmail.com</a>
              </div>
              
              <div className="text-[10pt] text-slate-500 mt-1 flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1">
                <a href="https://linkedin.com/in/Arpit-Jaiswal9974" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5 text-slate-600 font-medium">
                  linkedin.com/in/Arpit-Jaiswal9974
                </a>
                <span className="hidden sm:inline">|</span>
                <a href="https://github.com/Arpitj9974" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5 text-slate-600 font-medium">
                  github.com/Arpitj9974
                </a>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-5">
              <h2 className="text-[11pt] font-extrabold tracking-widest border-b border-slate-900/20 pb-0.5 uppercase mb-2" style={{ color: '#1f3a5f' }}>SUMMARY</h2>
              <p className="text-[10.5pt] text-slate-800 leading-relaxed text-justify">
                Four years in finance operations at JD Finance, running the complete lending operation and building the Excel data infrastructure the team still runs on. Since 2025, eight products designed and deployed across EdTech, AgriTech, FinTech, HealthTech and retail. I build using AI IDE agents: I own the problem definition, the architecture and the trade-offs; the agent handles the keystrokes.
              </p>
            </div>

            {/* Experience */}
            <div className="mt-5">
              <h2 className="text-[11pt] font-extrabold tracking-widest border-b border-slate-900/20 pb-0.5 uppercase mb-3" style={{ color: '#1f3a5f' }}>EXPERIENCE</h2>
              
              <div className="space-y-4">
                {/* JD Finance */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                    <h3 className="text-[11pt] font-extrabold text-slate-900">Finance Operations Lead &amp; Systems Builder</h3>
                    <span className="text-[9.5pt] text-slate-500 font-medium">JD Finance | Surat, Gujarat</span>
                  </div>
                  <div className="text-[9.5pt] text-slate-500 italic mt-0.5">
                    Aug 2021 - Jun 2024 (Full-time, On-site) | Apr 2025 - Present (Part-time, Hybrid)
                  </div>
                  <ul className="list-disc ml-4 mt-1.5 text-[10pt] text-slate-800 space-y-1">
                    <li>Ran the complete lending operation end to end: loan disbursement, daily repayment tracking and borrower account portfolios across the full lifecycle.</li>
                    <li>Designed and built the team's Excel data infrastructure from scratch; it remains the system operations runs on today.</li>
                    <li>Returned in 2025 to lead the same function, introducing automation tooling and data workflows into a process that had been entirely manual.</li>
                    <li><strong>Skills:</strong> Process Automation, Business Operations, Decision-Making &amp; Analysis, Advanced Excel, Google Apps Script</li>
                  </ul>
                </div>

                {/* Work Sarthi */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                    <h3 className="text-[11pt] font-extrabold text-slate-900">Product Development Lead (Internship)</h3>
                    <span className="text-[9.5pt] text-slate-500 font-medium">Work Sarthi | Surat, Gujarat</span>
                  </div>
                  <div className="text-[9.5pt] text-slate-500 italic mt-0.5">Jan 2026 - Mar 2026</div>
                  <ul className="list-disc ml-4 mt-1.5 text-[10pt] text-slate-800 space-y-1">
                    <li>Worked directly under the Founder &amp; CEO to conceive, coordinate and deliver three products end to end.</li>
                    <li>Led the AI Career Assessment platform: a psychometric engine combining RIASEC, Big Five and Hofstede frameworks into one scoring system, producing a personalised career report across 20 career clusters in 13 Indian languages.</li>
                    <li>Delivered Career Library, a 225-career exploration platform for Class 11-12 students, with AI-evaluated fit analysis from an uploaded marksheet.</li>
                    <li><strong>Skills:</strong> Product Coordination, Google Apps Script, AI Integration, Prompt Engineering</li>
                  </ul>
                </div>

                {/* CripcoCode */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                    <h3 className="text-[11pt] font-extrabold text-slate-900">Product Developer - AI &amp; Automation (Internship)</h3>
                    <span className="text-[9.5pt] text-slate-500 font-medium">CripcoCode Technologies Pvt Ltd | Surat, Gujarat</span>
                  </div>
                  <div className="text-[9.5pt] text-slate-500 italic mt-0.5">Remote | Nov 2025 - Jan 2026</div>
                  <ul className="list-disc ml-4 mt-1.5 text-[10pt] text-slate-800 space-y-1">
                    <li>Built and deployed Medicine Image Extraction: an AI application turning a photo of pharmaceutical packaging into a structured database record, replacing manual transcription for pharmacists and stockists.</li>
                    <li>Architected it as three independent services so the extraction pipeline keeps running even when the database is unavailable.</li>
                    <li><strong>Skills:</strong> Gemini AI, AI Automation, System Design, API Integration</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="mt-5 page-break-before">
              <h2 className="text-[11pt] font-extrabold tracking-widest border-b border-slate-900/20 pb-0.5 uppercase mb-3" style={{ color: '#1f3a5f' }}>SELECTED PROJECTS</h2>
              
              <div className="space-y-4">
                {/* Study Tracker AJ */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[11pt] text-slate-900">Study Tracker AJ</span>
                      <span className="text-[9pt] text-slate-500 border border-slate-300 px-1 py-0.2 rounded-sm bg-slate-50">EdTech, Live</span>
                    </div>
                    <div className="text-[9.5pt] text-slate-500 flex gap-2">
                      <a href="https://study-tracker-aj.vercel.app/" target="_blank" rel="noreferrer" className="text-slate-600 hover:underline">study-tracker-aj.vercel.app</a>
                    </div>
                  </div>
                  <p className="text-[10pt] text-slate-800 mt-1">
                    Exam preparation tracking across 27 competitive exams, for aspirants who kept losing track of what to study next. Progress syncs to the cloud automatically across devices. A recommendation engine reads live completion data and surfaces what to study next based on exam priority and weakest areas.
                  </p>
                  <div className="text-[9pt] text-slate-500 italic mt-0.5">Built with: Vanilla JavaScript, Firebase Auth, Firestore</div>
                </div>

                {/* FreshStamp */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[11pt] text-slate-900">FreshStamp</span>
                      <span className="text-[9pt] text-slate-500 border border-slate-300 px-1 py-0.2 rounded-sm bg-slate-50">Retail / AI Vision, Live</span>
                    </div>
                    <div className="text-[9.5pt] text-slate-500 flex gap-2">
                      <a href="https://fresh-stamp.vercel.app/" target="_blank" rel="noreferrer" className="text-slate-600 hover:underline">fresh-stamp.vercel.app</a>
                    </div>
                  </div>
                  <p className="text-[10pt] text-slate-800 mt-1">
                    Expiry tracking for shopkeepers. Gemini Vision reads the date, brand, price and category straight off the packaging in one shot, so nothing gets typed. FIFO batch detection flags which stock to move first; waste analytics show exactly how much money expired and where. Works fully offline as a guest, syncs to cloud on sign-in.
                  </p>
                  <div className="text-[9pt] text-slate-500 italic mt-0.5">Built with: React, TypeScript, Firebase, Gemini Vision, Vercel Serverless</div>
                </div>

                {/* RAW */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[11pt] text-slate-900">RAW</span>
                      <span className="text-[9pt] text-slate-500 border border-slate-300 px-1 py-0.2 rounded-sm bg-slate-50">Android / HR Operations</span>
                    </div>
                  </div>
                  <p className="text-[10pt] text-slate-800 mt-1">
                    HR staff were spending 30-60 minutes a day typing call logs into a spreadsheet. RAW captures each call in the background, filters it by the company SIM, and pushes it to a Google Sheet in real time; personal SIM calls never leave the phone. Offline-first, with a four-layer duplicate-prevention system. The entire backend is a 133-line Google Apps Script: zero hosting cost, because the client had no infrastructure and no budget.
                  </p>
                  <div className="text-[9pt] text-slate-500 italic mt-0.5">Built with: Kotlin, Room, WorkManager, Google Apps Script, Google Sheets</div>
                </div>

                {/* FarmerConnect */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[11pt] text-slate-900">FarmerConnect</span>
                      <span className="text-[9pt] text-slate-500 border border-slate-300 px-1 py-0.2 rounded-sm bg-slate-50">AgriTech Marketplace, Live</span>
                    </div>
                    <div className="text-[9.5pt] text-slate-500 flex gap-2">
                      <a href="https://farmer-connect-aj.vercel.app/" target="_blank" rel="noreferrer" className="text-slate-600 hover:underline">farmer-connect-aj.vercel.app</a>
                    </div>
                  </div>
                  <p className="text-[10pt] text-slate-800 mt-1">
                    Indian farmers lose 30-40% of a crop’s sale price to middlemen; FarmerConnect lets them sell direct. Fixed-price and live-auction selling, with a bidding engine using database row locking so two simultaneous bids cannot both win. Live mandi prices from the government data.gov.in API. An embedded AI assistant answers MSP, crop-disease and scheme questions, routing across three providers so it never goes dark. Razorpay payments, three user roles, English/Hindi/Gujarati.
                  </p>
                  <div className="text-[9pt] text-slate-500 italic mt-0.5">Built with: React, Node.js, PostgreSQL, Gemini, Groq, OpenRouter, Razorpay, Supabase</div>
                </div>

                {/* Work Sarthi Career Platform */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[11pt] text-slate-900">Work Sarthi Career Platform</span>
                      <span className="text-[9pt] text-slate-500 border border-slate-300 px-1 py-0.2 rounded-sm bg-slate-50">EdTech, Live</span>
                    </div>
                    <div className="text-[9.5pt] text-slate-500 flex gap-2">
                      <a href="https://work-sarthi.vercel.app/" target="_blank" rel="noreferrer" className="text-slate-600 hover:underline mr-2">work-sarthi.vercel.app</a>
                      <a href="https://career-library-worksarthi.vercel.app/" target="_blank" rel="noreferrer" className="text-slate-600 hover:underline">career-library-worksarthi.vercel.app</a>
                    </div>
                  </div>
                  <p className="text-[10pt] text-slate-800 mt-1">
                    <strong>AI Career Assessment:</strong> a psychometric engine turning 60+ data points into a personalised career report, combining RIASEC, Big Five and Hofstede into one normalised scoring system, then running four parallel AI calls to produce an 8-10 page report with SWOT analysis and a roadmap, written in the student’s own language across 13 Indian languages. <strong>Career Library:</strong> 225 careers across 14 industries mapped to entrance exams, colleges, eligibility rules and required traits, with AI fit analysis from an uploaded marksheet. Both fully client-side; student data never leaves the browser.
                  </p>
                  <div className="text-[9pt] text-slate-500 italic mt-0.5">Built with: React, Vanilla JavaScript, Gemini, Claude API, Recharts, jsPDF, i18next</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-5 page-break-before">
              <h2 className="text-[11pt] font-extrabold tracking-widest border-b border-slate-900/20 pb-0.5 uppercase mb-3" style={{ color: '#1f3a5f' }}>SKILLS</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-[10pt] font-extrabold text-slate-900 uppercase tracking-wider" style={{ color: '#1f3a5f' }}>What I do</h3>
                  <div className="text-[10pt] text-slate-800 space-y-1.5 mt-1">
                    <div><strong>Project &amp; Product:</strong> Project coordination, Requirement gathering, Scope definition, Stakeholder communication, Product roadmapping, Documentation &amp; technical specs, Delivery ownership</div>
                    <div><strong>Systems &amp; Process:</strong> Business process analysis, Process automation, Workflow design, Systems design, Data infrastructure, Requirements-to-architecture translation</div>
                    <div><strong>Data &amp; Analysis:</strong> SQL, Python, Power BI, Tableau, Advanced Excel, Decision-making &amp; analysis, Reporting</div>
                    <div><strong>Automation:</strong> n8n, Make, Google Apps Script, SheetDB, API integration</div>
                    <div><strong>AI Orchestration:</strong> Prompt engineering, Structured output design, Multi-provider AI routing, AI IDE agents (Antigravity), Google Gemini, Claude, Groq, NotebookLM</div>
                    <div><strong>Domain:</strong> Finance operations, Lending operations, EdTech, AgriTech, Retail</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10pt] font-extrabold text-slate-900 uppercase tracking-wider mt-2.5" style={{ color: '#1f3a5f' }}>Tech I build with</h3>
                  <p className="text-[10pt] text-slate-800 mt-0.5">
                    React, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Firebase, Supabase, Kotlin (Android), Python (FastAPI), Tailwind CSS, Vite, Git, Vercel, Render, Railway
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-5">
              <h2 className="text-[11pt] font-extrabold tracking-widest border-b border-slate-900/20 pb-0.5 uppercase mb-3" style={{ color: '#1f3a5f' }}>EDUCATION</h2>
              
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                  <div>
                    <h3 className="text-[10.5pt] font-extrabold text-slate-900">MBA - Analytics &amp; Data Science + Project Management (dual specialisation)</h3>
                    <div className="text-[10pt] text-slate-700">Manipal University Jaipur</div>
                  </div>
                  <span className="text-[10pt] text-slate-500 font-bold whitespace-nowrap">2026 - 2028</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                  <div>
                    <h3 className="text-[10.5pt] font-extrabold text-slate-900">BCA - Bachelor of Computer Applications</h3>
                    <div className="text-[10pt] text-slate-700">Bhagwan Mahavir University, Surat</div>
                  </div>
                  <span className="text-[10pt] text-slate-500 font-bold whitespace-nowrap">2023 - 2026</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-5">
              <h2 className="text-[11pt] font-extrabold tracking-widest border-b border-slate-900/20 pb-0.5 uppercase mb-3" style={{ color: '#1f3a5f' }}>CERTIFICATIONS</h2>
              
              <ul className="list-disc ml-4 text-[10pt] text-slate-800 space-y-1">
                <li><strong>Google Prompting Essentials Specialization</strong> | Google | Aug 2025 | Credential ID NFF6BEFXNP9X</li>
                <li><strong>Mastering Data Structures and Algorithms in C and C++</strong> | Udemy | Oct 2025</li>
                <li><strong>Java Programming - Beginner to Master</strong> | Udemy | Jan 2025</li>
                <li><strong>C++ Programming - Beginner to Advance, Deep Dive in C++</strong> | Udemy | Dec 2024</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-surface-container border-t border-ink/10 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-ink hover:bg-accent text-paper font-mono text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors"
          >
            Done Checking
          </button>
        </div>
        
      </div>
    </div>
  );
}
