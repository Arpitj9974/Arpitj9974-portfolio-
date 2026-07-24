import React from "react";

interface PrintableResumeProps {
  isModal?: boolean;
}

export default function PrintableResume({ isModal = false }: PrintableResumeProps) {
  return (
    <div 
      className={`w-full max-w-[8.27in] font-sans text-left text-[9.5pt] leading-snug`}
      style={{
        fontFamily: 'Calibri, "Segoe UI", Arial, sans-serif',
        color: '#1a1a1a',
        backgroundColor: '#ffffff',
        padding: isModal ? '2rem sm:3rem' : '0', // Keep padding 0 for downlader to let html2pdf margins handle page layout
      }}
    >
      {/* PAGE 1 CONTENT */}
      <div>
        {/* Header */}
        <div className="text-center sm:text-left border-b pb-3" style={{ borderColor: 'rgba(30, 41, 59, 0.15)' }}>
          <h1 className="text-[22pt] font-extrabold tracking-tight leading-none" style={{ color: '#1a1a1a' }}>ARPIT JAISWAL</h1>
          <div className="text-[9pt] font-bold uppercase tracking-wider mt-1" style={{ color: '#1f3a5f' }}>
            Full-Stack Builder | Finance Operations | AI &amp; Automation
          </div>
          
          <div className="text-[9pt] mt-2 flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-0.5" style={{ color: '#555555' }}>
            <span>Surat, Gujarat, India</span>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+919624997427" className="hover:underline font-semibold" style={{ color: '#1f3a5f' }}>+91 96249 97427</a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:jaiswalarpit428@gmail.com" className="hover:underline font-semibold" style={{ color: '#1f3a5f' }}>jaiswalarpit428@gmail.com</a>
          </div>
          
          <div className="text-[9pt] mt-0.5 flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-0.5" style={{ color: '#555555' }}>
            <a href="https://linkedin.com/in/Arpit-Jaiswal9974" target="_blank" rel="noreferrer" className="hover:underline font-semibold" style={{ color: '#1f3a5f' }}>
              linkedin.com/in/Arpit-Jaiswal9974
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="https://github.com/Arpitj9974" target="_blank" rel="noreferrer" className="hover:underline font-semibold" style={{ color: '#1f3a5f' }}>
              github.com/Arpitj9974
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-1.5" style={{ color: '#1f3a5f', borderColor: 'rgba(30, 41, 59, 0.2)' }}>SUMMARY</h2>
          <p className="text-[9.5pt] leading-normal text-justify" style={{ color: '#1a1a1a' }}>
            Four years in finance operations at JD Finance, running the complete lending operation and building the Excel data infrastructure the team still runs on. Since 2025, eight products designed and deployed across EdTech, AgriTech, FinTech, HealthTech and retail. I build using AI IDE agents: I own the problem definition, the architecture and the trade-offs; the agent handles the keystrokes.
          </p>
        </div>

        {/* Experience */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#1f3a5f', borderColor: 'rgba(30, 41, 59, 0.2)' }}>EXPERIENCE</h2>
          
          <div className="space-y-3">
            {/* JD Finance */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <h3 className="text-[10pt] font-bold" style={{ color: '#1a1a1a' }}>Finance Operations Lead &amp; Systems Builder</h3>
                <span className="text-[9pt] font-semibold" style={{ color: '#4a4a4a' }}>JD Finance | Surat, Gujarat</span>
              </div>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#555555' }}>
                Aug 2021 - Jun 2024 (Full-time, On-site) | Apr 2025 - Present (Part-time, Hybrid)
              </div>
              <ul className="list-disc ml-4 mt-1 text-[9.5pt] space-y-0.5 leading-[1.3]" style={{ color: '#1a1a1a' }}>
                <li>Ran the complete lending operation end to end: loan disbursement, daily repayment tracking and borrower account portfolios across the full lifecycle.</li>
                <li>Designed and built the team's Excel data infrastructure from scratch; it remains the system operations runs on today.</li>
                <li>Returned in 2025 to lead the same function, introducing automation tooling and data workflows into a process that had been entirely manual.</li>
                <li><b>Skills:</b> Process Automation, Business Operations, Decision-Making &amp; Analysis, Advanced Excel, Google Apps Script</li>
              </ul>
            </div>

            {/* Work Sarthi */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <h3 className="text-[10pt] font-bold" style={{ color: '#1a1a1a' }}>Product Development Lead (Internship)</h3>
                <span className="text-[9pt] font-semibold" style={{ color: '#4a4a4a' }}>Work Sarthi | Surat, Gujarat</span>
              </div>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#555555' }}>Jan 2026 - Mar 2026</div>
              <ul className="list-disc ml-4 mt-1 text-[9.5pt] space-y-0.5 leading-[1.3]" style={{ color: '#1a1a1a' }}>
                <li>Worked directly under the Founder &amp; CEO to conceive, coordinate and deliver three products end to end.</li>
                <li>Led the AI Career Assessment platform: a psychometric engine combining RIASEC, Big Five and Hofstede frameworks into one scoring system, producing a personalised career report across 20 career clusters in 13 Indian languages.</li>
                <li>Delivered Career Library, a 225-career exploration platform for Class 11-12 students, with AI-evaluated fit analysis from an uploaded marksheet.</li>
                <li><b>Skills:</b> Product Coordination, Google Apps Script, AI Integration, Prompt Engineering</li>
              </ul>
            </div>

            {/* CripcoCode */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <h3 className="text-[10pt] font-bold" style={{ color: '#1a1a1a' }}>Product Developer - AI &amp; Automation (Internship)</h3>
                <span className="text-[9pt] font-semibold" style={{ color: '#4a4a4a' }}>CripcoCode Technologies Pvt Ltd | Surat, Gujarat</span>
              </div>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#555555' }}>Remote | Nov 2025 - Jan 2026</div>
              <ul className="list-disc ml-4 mt-1 text-[9.5pt] space-y-0.5 leading-[1.3]" style={{ color: '#1a1a1a' }}>
                <li>Built and deployed Medicine Image Extraction: an AI application turning a photo of pharmaceutical packaging into a structured database record, replacing manual transcription for pharmacists and stockists.</li>
                <li>Architected it as three independent services so the extraction pipeline keeps running even when the database is unavailable.</li>
                <li><b>Skills:</b> Gemini AI, AI Automation, System Design, API Integration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Selected Projects (First 3) */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#1f3a5f', borderColor: 'rgba(30, 41, 59, 0.2)' }}>SELECTED PROJECTS</h2>
          
          <div className="space-y-3">
            {/* Study Tracker AJ */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#1a1a1a' }}>AspirantFlow</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#555555', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>EdTech, Live</span>
                </div>
                <div className="text-[9pt]">
                  <a href="https://aspirantflow.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#1f3a5f' }}>aspirantflow.vercel.app</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1a1a1a' }}>
                Cloud-synchronized online study tracker and planner for competitive exams (UPSC, SSC, IBPS, JEE, NEET). Updates checkmarks locally with zero latency (&lt;16ms) and syncs asynchronously in the background. Features connection timeout guards to completely eliminate connection stalling, dynamic target pacing, and HTML5 cross-frame event sync.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#555555' }}>Built with: HTML5, ES6 Modules, Tailwind CSS, Firebase Auth & Firestore, LocalStorage</div>
            </div>

            {/* FreshStamp */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#1a1a1a' }}>FreshStamp</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#555555', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>Retail / AI Vision, Live</span>
                </div>
                <div className="text-[9pt]">
                  <a href="https://fresh-stamp.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#1f3a5f' }}>fresh-stamp.vercel.app</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1a1a1a' }}>
                Expiry tracking for shopkeepers. Gemini Vision reads the date, brand, price and category straight off the packaging in one shot, so nothing gets typed. FIFO batch detection flags which stock to move first; waste analytics show exactly how much money expired and where. Works fully offline as a guest, syncs to cloud on sign-in.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#555555' }}>Built with: React, TypeScript, Firebase, Gemini Vision, Vercel Serverless</div>
            </div>

            {/* RAW */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#1a1a1a' }}>RAW</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#555555', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>Android / HR Operations</span>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1a1a1a' }}>
                HR staff were spending 30-60 minutes a day typing call logs into a spreadsheet. RAW captures each call in the background, filters it by the company SIM, and pushes it to a Google Sheet in real time; personal SIM calls never leave the phone. Offline-first, with a four-layer duplicate-prevention system. The entire backend is a 133-line Google Apps Script: zero hosting cost, because the client had no infrastructure and no budget.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#555555' }}>Built with: Kotlin, Room, WorkManager, Google Apps Script, Google Sheets</div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE BREAK TRIGGER FOR PERFECT 2-PAGE LAYOUT */}
      <div style={{ pageBreakBefore: "always" }} className="print:break-before-page" />

      {/* Elegant Visual Page Separator in Modal Preview */}
      {isModal && (
        <div className="my-8 border-t-2 border-dashed border-accent/20 relative flex justify-center items-center select-none" style={{ pageBreakBefore: "avoid", pageBreakAfter: "avoid" }}>
          <span className="absolute bg-paper border border-accent/15 px-4 py-1 rounded-full text-[10px] font-mono text-accent uppercase tracking-widest font-bold">
            ✂️ PAGE 1 ENDS HERE (PDF PAGE BREAK)
          </span>
        </div>
      )}

      {/* PAGE 2 CONTENT */}
      <div className={isModal ? "mt-4" : "pt-1"}>
        {/* Selected Projects Continued (FarmerConnect & Work Sarthi) */}
        <div>
          <div className="space-y-3">
            {/* FarmerConnect */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#1a1a1a' }}>FarmerConnect</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#555555', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>AgriTech Marketplace, Live</span>
                </div>
                <div className="text-[9pt]">
                  <a href="https://farmer-connect-aj.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#1f3a5f' }}>farmer-connect-aj.vercel.app</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1a1a1a' }}>
                Indian farmers lose 30-40% of a crop’s sale price to middlemen; FarmerConnect lets them sell direct. Fixed-price and live-auction selling, with a bidding engine using database row locking so two simultaneous bids cannot both win. Live mandi prices from the government data.gov.in API. An embedded AI assistant answers MSP, crop-disease and scheme questions, routing across three providers so it never goes dark. Razorpay payments, three user roles, English/Hindi/Gujarati.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#555555' }}>Built with: React, Node.js, PostgreSQL, Gemini, Groq, OpenRouter, Razorpay, Supabase</div>
            </div>

            {/* Work Sarthi Career Platform */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#1a1a1a' }}>Work Sarthi Career Platform</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#555555', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>EdTech, Live</span>
                </div>
                <div className="text-[9pt] flex gap-2">
                  <a href="https://work-sarthi.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline mr-1" style={{ color: '#1f3a5f' }}>work-sarthi.vercel.app</a>
                  <a href="https://career-library-worksarthi.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#1f3a5f' }}>career-library-worksarthi.vercel.app</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1a1a1a' }}>
                <strong>AI Career Assessment:</strong> a psychometric engine turning 60+ data points into a personalised career report, combining RIASEC, Big Five and Hofstede into one normalised scoring system, then running four parallel AI calls to produce an 8-10 page report with SWOT analysis and a roadmap, written in the student’s own language across 13 Indian languages. <strong>Career Library:</strong> 225 careers across 14 industries mapped to entrance exams, colleges, eligibility rules and required traits, with AI fit analysis from an uploaded marksheet. Both fully client-side; student data never leaves the browser.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#555555' }}>Built with: React, Vanilla JavaScript, Gemini, Claude API, Recharts, jsPDF, i18next</div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#1f3a5f', borderColor: 'rgba(30, 41, 59, 0.2)' }}>SKILLS</h2>
          
          <div className="space-y-2">
            <div>
              <h3 className="text-[9.5pt] font-bold uppercase tracking-wider" style={{ color: '#1f3a5f' }}>What I do</h3>
              <div className="text-[9.5pt] space-y-1 mt-1 leading-[1.35]" style={{ color: '#1a1a1a' }}>
                <div><strong>Project &amp; Product:</strong> Project coordination, Requirement gathering, Scope definition, Stakeholder communication, Product roadmapping, Documentation &amp; technical specs, Delivery ownership</div>
                <div><strong>Systems &amp; Process:</strong> Business process analysis, Process automation, Workflow design, Systems design, Data infrastructure, Requirements-to-architecture translation</div>
                <div><strong>Data &amp; Analysis:</strong> SQL, Python, Power BI, Tableau, Advanced Excel, Decision-making &amp; analysis, Reporting</div>
                <div><strong>Automation:</strong> n8n, Make, Google Apps Script, SheetDB, API integration</div>
                <div><strong>AI Orchestration:</strong> Prompt engineering, Structured output design, Multi-provider AI routing, AI IDE agents (Antigravity), Google Gemini, Claude, Groq, NotebookLM</div>
                <div><strong>Domain:</strong> Finance operations, Lending operations, EdTech, AgriTech, Retail</div>
              </div>
            </div>

            <div>
              <h3 className="text-[9.5pt] font-bold uppercase tracking-wider mt-2" style={{ color: '#1f3a5f' }}>Tech I build with</h3>
              <p className="text-[9.5pt] mt-0.5 leading-[1.35]" style={{ color: '#1a1a1a' }}>
                React, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Firebase, Supabase, Kotlin (Android), Python (FastAPI), Tailwind CSS, Vite, Git, Vercel, Render, Railway
              </p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2.5" style={{ color: '#1f3a5f', borderColor: 'rgba(30, 41, 59, 0.2)' }}>EDUCATION</h2>
          
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
              <div>
                <h3 className="text-[9.5pt] font-bold" style={{ color: '#1a1a1a' }}>MBA - Analytics &amp; Data Science + Project Management (dual specialisation)</h3>
                <div className="text-[9.5pt]" style={{ color: '#4a4a4a' }}>Manipal University Jaipur</div>
              </div>
              <span className="text-[9.5pt] font-bold whitespace-nowrap" style={{ color: '#555555' }}>2026 - 2028</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
              <div>
                <h3 className="text-[9.5pt] font-bold" style={{ color: '#1a1a1a' }}>BCA - Bachelor of Computer Applications</h3>
                <div className="text-[9.5pt]" style={{ color: '#4a4a4a' }}>Bhagwan Mahavir University, Surat</div>
              </div>
              <span className="text-[9.5pt] font-bold whitespace-nowrap" style={{ color: '#555555' }}>2023 - 2026</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#1f3a5f', borderColor: 'rgba(30, 41, 59, 0.2)' }}>CERTIFICATIONS</h2>
          
          <ul className="list-disc ml-4 text-[9.5pt] space-y-0.5 leading-[1.3]" style={{ color: '#1a1a1a' }}>
            <li><strong>Google Prompting Essentials Specialization</strong> | Google | Aug 2025 | Credential ID NFF6BEFXNP9X</li>
            <li><strong>Mastering Data Structures and Algorithms in C and C++</strong> | Udemy | Oct 2025</li>
            <li><strong>Java Programming - Beginner to Master</strong> | Udemy | Jan 2025</li>
            <li><strong>C++ Programming - Beginner to Advance, Deep Dive in C++</strong> | Udemy | Dec 2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
