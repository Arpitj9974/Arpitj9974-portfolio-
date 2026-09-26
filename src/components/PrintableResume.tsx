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
        padding: isModal ? '2rem sm:3rem' : '0',
      }}
    >
      {/* PAGE 1 CONTENT */}
      <div>
        {/* Header */}
        <div className="text-center sm:text-left border-b pb-3" style={{ borderColor: 'rgba(30, 41, 59, 0.2)' }}>
          <h1 className="text-[22pt] font-extrabold tracking-tight leading-none" style={{ color: '#0a0a0a' }}>ARPIT JAISWAL</h1>
          <div className="text-[9pt] font-bold uppercase tracking-wider mt-1" style={{ color: '#0f3d64' }}>
            Product &amp; Business Operations | 4.5 Yrs FinOps · MBA (Analytics &amp; PM) · BCA
          </div>
          
          <div className="text-[9pt] mt-2 flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-0.5" style={{ color: '#4b5563' }}>
            <span>Surat, Gujarat, India</span>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+919624997427" className="hover:underline font-semibold" style={{ color: '#0f3d64' }}>+91 96249 97427</a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:arpitj9974@gmail.com" className="hover:underline font-semibold" style={{ color: '#0f3d64' }}>arpitj9974@gmail.com</a>
          </div>
          
          <div className="text-[9pt] mt-1 flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-0.5" style={{ color: '#4b5563' }}>
            <a href="https://linkedin.com/in/Arpit-Jaiswal9974" target="_blank" rel="noreferrer" className="hover:underline font-semibold" style={{ color: '#0f3d64' }}>
              linkedin.com/in/Arpit-Jaiswal9974
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="https://github.com/Arpitj9974" target="_blank" rel="noreferrer" className="hover:underline font-semibold" style={{ color: '#0f3d64' }}>
              github.com/Arpitj9974
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="https://arpitj9974.vercel.app" target="_blank" rel="noreferrer" className="hover:underline font-semibold" style={{ color: '#0f3d64' }}>
              arpitj9974.vercel.app (Live Portfolio)
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-1.5" style={{ color: '#0f3d64', borderColor: 'rgba(30, 41, 59, 0.2)' }}>SUMMARY</h2>
          <p className="text-[9.5pt] leading-normal text-justify" style={{ color: '#1f2937' }}>
            Product and business operations specialist with 4.5 years of lending operations experience and a technical foundation (BCA + MBA in Analytics &amp; Data Science + Project Management). Built the core lending and data infrastructure at JD Finance, and architected 9 production systems across FinTech, EdTech, AgriTech, and Retail. Expert in translating complex operational friction into structured PRDs, automated workflows, and high-performance software.
          </p>
        </div>

        {/* Experience */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#0f3d64', borderColor: 'rgba(30, 41, 59, 0.2)' }}>EXPERIENCE</h2>
          
          <div className="space-y-3">
            {/* JD Finance */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <h3 className="text-[10pt] font-bold" style={{ color: '#111827' }}>Finance Operations Lead &amp; Systems Builder</h3>
                <span className="text-[9pt] font-semibold" style={{ color: '#374151' }}>JD Finance | Surat, Gujarat</span>
              </div>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#6b7280' }}>
                Aug 2021 – Jun 2024 (Full-time, On-site) | Apr 2025 – Present (Part-time, Hybrid)
              </div>
              <ul className="list-disc ml-4 mt-1 text-[9.5pt] space-y-0.5 leading-[1.3]" style={{ color: '#1f2937' }}>
                <li>Ran end-to-end lending operations: borrower portfolio onboarding, credit validation, loan disbursement, and daily repayment tracking across 120+ active merchant accounts.</li>
                <li>Designed and built the firm&apos;s foundational Excel data and ledger infrastructure from scratch; remains the core operational system running daily operations today with 100% mathematical accuracy.</li>
                <li>Returned in 2025 to spearhead automation tooling, reducing daily account reconciliation time from 45 minutes to under 4 minutes using Google Apps Script and automated data workflows.</li>
                <li>Formulated operational risk checks, delinquency alerts, and EMI schedules to ensure zero accounting discrepancies between field collections and ledger balances.</li>
                <li><strong>Skills:</strong> Process Automation, Business Operations, Amortization Modeling, Advanced Excel, Google Apps Script, Decision Analysis</li>
              </ul>
            </div>

            {/* Work Sarthi */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <h3 className="text-[10pt] font-bold" style={{ color: '#111827' }}>Product Development Lead (Internship)</h3>
                <span className="text-[9pt] font-semibold" style={{ color: '#374151' }}>Work Sarthi | Surat, Gujarat</span>
              </div>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#6b7280' }}>Jan 2026 – Mar 2026</div>
              <ul className="list-disc ml-4 mt-1 text-[9.5pt] space-y-0.5 leading-[1.3]" style={{ color: '#1f2937' }}>
                <li>Worked directly under the Founder &amp; CEO to conceptualize, coordinate, and deliver three digital products from scope definition to production release.</li>
                <li>Led the AI Career Assessment platform: engineered a psychometric scoring engine synthesizing RIASEC, Big Five, and Hofstede frameworks to generate comprehensive career reports in 13 Indian languages.</li>
                <li>Shipped Career Library, a 225-career interactive discovery portal for Class 11–12 students featuring AI-driven academic fit analysis from uploaded marksheets.</li>
                <li><strong>Skills:</strong> Product Coordination, PRD &amp; Spec Writing, Google Apps Script, Multi-Language Localization, Prompt Engineering</li>
              </ul>
            </div>

            {/* CripcoCode */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <h3 className="text-[10pt] font-bold" style={{ color: '#111827' }}>Product Developer – AI &amp; Automation (Internship)</h3>
                <span className="text-[9pt] font-semibold" style={{ color: '#374151' }}>CripcoCode Technologies Pvt Ltd | Surat, Gujarat · Remote</span>
              </div>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#6b7280' }}>Nov 2025 – Jan 2026</div>
              <ul className="list-disc ml-4 mt-1 text-[9.5pt] space-y-0.5 leading-[1.3]" style={{ color: '#1f2937' }}>
                <li>Built and deployed Medicine Image Extraction: an AI computer vision pipeline converting pharmaceutical packaging photos into structured, verified database records.</li>
                <li>Replaced error-prone manual transcription for pharmacists and distributors, slashing cataloging turnaround time by over 80%.</li>
                <li>Architected the system into three decoupled micro-services, ensuring ingestion and local caching continue seamlessly even during database maintenance outages.</li>
                <li><strong>Skills:</strong> Gemini AI, AI Vision Automation, System Architecture, API Integration, Operational Continuity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Selected Projects (Part 1: Vyosha & AspirantFlow) */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#0f3d64', borderColor: 'rgba(30, 41, 59, 0.2)' }}>SELECTED PROJECTS</h2>
          
          <div className="space-y-3">
            {/* Vyosha */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#111827' }}>Vyosha</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#475569', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>FinTech / Lending, Live</span>
                </div>
                <div className="text-[9pt] flex gap-2">
                  <a href="https://vyosha.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>vyosha.vercel.app</a>
                  <span>|</span>
                  <a href="https://github.com/Arpitj9974/Vyosha" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>GitHub</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1f2937' }}>
                Offline-first digital ledger &amp; EMI prepayment platform for micro-merchants and kirana stores. Engineered passbook accounting with Frame-0 local caching, achieving sub-200ms cold-start hydration and offline transaction recording with zero cellular lag. Features exact banking amortization calculation parity, prepayment interest-savings simulation, dynamic NPCI UPI QR collection, and 98% client-side receipt photo compression.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#64748b' }}>Built with: React 19, TypeScript 5.8, Tailwind CSS v4, Firebase Firestore, IndexedDB Disk Cache, PWA</div>
            </div>

            {/* AspirantFlow */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#111827' }}>AspirantFlow</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#475569', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>EdTech / Study Analytics, Live</span>
                </div>
                <div className="text-[9pt] flex gap-2">
                  <a href="https://aspirantflow.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>aspirantflow.vercel.app</a>
                  <span>|</span>
                  <a href="https://github.com/Arpitj9974/Study-Tracker-AJ" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>GitHub</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1f2937' }}>
                Cloud-synchronized exam study planner and velocity analytics engine for 27 national Indian competitive exams (UPSC, SSC, IBPS, JEE, NEET). Uses localStorage cache as the source of truth for instantaneous (&lt;16ms) checkmark interactions; syncs asynchronously to Firestore with a 5-second timeout guard to prevent UI freeze on spotty networks. Features hierarchical taxonomies indexing 1,100+ topics, spaced-repetition revision queues, and multi-exam routing.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#64748b' }}>Built with: HTML5, ES6 Modules, Tailwind CSS, Firebase Auth &amp; Firestore, LocalStorage API, HTML5 postMessage</div>
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
            [ PAGE 1 ENDS HERE · PDF PAGE BREAK ]
          </span>
        </div>
      )}

      {/* PAGE 2 CONTENT */}
      <div className={isModal ? "mt-4" : "pt-1"}>
        {/* Selected Projects Continued (RAW, FreshStamp, FarmerConnect) */}
        <div>
          <div className="space-y-3">
            {/* RAW */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#111827' }}>RAW</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#475569', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>Android / HR Operations, Deployed at ARWS</span>
                </div>
                <div className="text-[9pt]">
                  <a href="https://github.com/Arpitj9974/RAW" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>GitHub</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1f2937' }}>
                Enterprise background call-logging and workforce tracking automation app for high-volume recruitment teams. Captured and logged 100% of recruitment calls in real time, saving HR coordinators 30–60 minutes per day previously lost to manual spreadsheet data entry. Implemented dual-SIM hardware filtering (ensuring personal calls never leave the device), offline-first Room database queuing, and a 4-layer duplicate-prevention system with zero-cost Google Apps Script backend.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#64748b' }}>Built with: Kotlin, Room Database, Android WorkManager, Google Apps Script, Google Sheets API</div>
            </div>

            {/* FreshStamp */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#111827' }}>FreshStamp</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#475569', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>Retail / AI Vision, Live</span>
                </div>
                <div className="text-[9pt] flex gap-2">
                  <a href="https://fresh-stamp.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>fresh-stamp.vercel.app</a>
                  <span>|</span>
                  <a href="https://github.com/Arpitj9974/FreshStamp" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>GitHub</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1f2937' }}>
                Computer-vision expiry tracking and inventory shrinkage prevention tool for retail shopkeepers. Uses Gemini Vision to parse manufacture dates, expiry dates, brand names, and price directly off product packaging in a single photo scan, eliminating manual catalog entry. Provides FIFO batch movement detection to prioritize stock clearance, financial waste analytics on expired inventory, and complete offline guest mode with cloud synchronization.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#64748b' }}>Built with: React, TypeScript, Firebase, Gemini Vision API, Tailwind CSS, Vercel Serverless</div>
            </div>

            {/* FarmerConnect */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[10pt]" style={{ color: '#111827' }}>FarmerConnect</span>
                  <span className="text-[8pt] border px-1 py-0.2 rounded-xs" style={{ color: '#475569', borderColor: '#cbd5e1', backgroundColor: '#f8fafc' }}>AgriTech Marketplace, Live</span>
                </div>
                <div className="text-[9pt] flex gap-2">
                  <a href="https://farmer-connect-aj.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>farmer-connect-aj.vercel.app</a>
                  <span>|</span>
                  <a href="https://github.com/Arpitj9974/FarmerConnect" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#0f3d64' }}>GitHub</a>
                </div>
              </div>
              <p className="text-[9.5pt] mt-0.5 leading-snug text-justify" style={{ color: '#1f2937' }}>
                Direct farmer-to-buyer agricultural marketplace with live auction bidding and market telemetry. Solves middleman price erosion (30–40% loss) via transparent fixed-price listings and real-time auctions backed by database row locking to prevent race-condition bid collisions. Integrated live wholesale mandi prices via the government data.gov.in API, multi-provider AI advisory routing (English/Hindi/Gujarati), and Razorpay payments.
              </p>
              <div className="text-[8.5pt] italic mt-0.5" style={{ color: '#64748b' }}>Built with: React, Node.js, PostgreSQL, Gemini, Groq, OpenRouter, Razorpay, Supabase</div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#0f3d64', borderColor: 'rgba(30, 41, 59, 0.2)' }}>SKILLS &amp; COMPETENCIES</h2>
          
          <div className="space-y-1 text-[9.5pt] leading-[1.32]" style={{ color: '#1f2937' }}>
            <div><strong style={{ color: '#0f3d64' }}>Product &amp; Project Management:</strong> Product Roadmapping, PRD &amp; Spec Writing, Requirements Gathering, Scope Definition, User Story Mapping, Stakeholder Communication, Delivery Ownership, Agile/Scrum</div>
            <div><strong style={{ color: '#0f3d64' }}>Business Operations &amp; Finance:</strong> Lending Operations, Loan Amortization Modeling, Credit &amp; Risk Validation, SOP Creation, Business Process Analysis, Accounting Parity, Collections Workflow</div>
            <div><strong style={{ color: '#0f3d64' }}>Data &amp; Analytics:</strong> SQL, Python, Advanced Excel (Financial Models, Pivot, Dynamic Arrays), Power BI, Tableau, Performance Telemetry, Cohort Analysis, Reporting</div>
            <div><strong style={{ color: '#0f3d64' }}>Automation &amp; Integrations:</strong> Google Apps Script, REST APIs, n8n, Make, Webhooks, Firestore Event Sync, SheetDB</div>
            <div><strong style={{ color: '#0f3d64' }}>AI Orchestration &amp; Tooling:</strong> Prompt Engineering, Structured Outputs, Multi-Provider AI Routing, Google Gemini, Claude API, Groq, NotebookLM</div>
            <div><strong style={{ color: '#0f3d64' }}>Core Technologies:</strong> React, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Firebase, Supabase, Kotlin (Android), Python (FastAPI), Tailwind CSS, Vite, Git, Vercel</div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#0f3d64', borderColor: 'rgba(30, 41, 59, 0.2)' }}>EDUCATION</h2>
          
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
              <div>
                <h3 className="text-[9.5pt] font-bold" style={{ color: '#111827' }}>MBA – Analytics &amp; Data Science + Project Management (Dual Specialization)</h3>
                <div className="text-[9pt]" style={{ color: '#4b5563' }}>Manipal University Jaipur</div>
              </div>
              <span className="text-[9pt] font-bold whitespace-nowrap" style={{ color: '#4b5563' }}>2026 – 2028</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
              <div>
                <h3 className="text-[9.5pt] font-bold" style={{ color: '#111827' }}>BCA – Bachelor of Computer Applications</h3>
                <div className="text-[9pt]" style={{ color: '#4b5563' }}>Bhagwan Mahavir University, Surat</div>
              </div>
              <span className="text-[9pt] font-bold whitespace-nowrap" style={{ color: '#4b5563' }}>2023 – 2026</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-3.5">
          <h2 className="text-[10.5pt] font-extrabold tracking-wider border-b pb-0.5 uppercase mb-2" style={{ color: '#0f3d64', borderColor: 'rgba(30, 41, 59, 0.2)' }}>CERTIFICATIONS</h2>
          
          <ul className="list-disc ml-4 text-[9.5pt] space-y-0.5 leading-[1.3]" style={{ color: '#1f2937' }}>
            <li><strong>Google Prompting Essentials Specialization</strong> | Google | Aug 2025 | Credential ID: NFF6BEFXNP9X</li>
            <li><strong>Mastering Data Structures and Algorithms in C and C++</strong> | Udemy | Oct 2025 | Credential ID: UC-0e9d4f63-26db-4803-8381-ffd8971f1863</li>
            <li><strong>Java Programming – Beginner to Master</strong> | Udemy | Jan 2025 | Credential ID: UC-53933d4d-b063-4c0d-a818-ecd3ecb92ba4</li>
            <li><strong>C++ Programming – Beginner to Advance, Deep Dive in C++</strong> | Udemy | Dec 2024 | Credential ID: UC-bfe2b6ce-881f-4c45-a332-c11a2fc357b4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
