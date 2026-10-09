import { Project, CapabilityDomain, ToolkitCategory } from "./types";

export const PORTFOLIO_OWNER = {
  name: "ARPIT JAISWAL",
  title: "Product & Business Operations, Finance & Systems Architecture",
  tagline: "Solving operational friction through business strategy, FinOps rigor, and systems architecture.",
  subLine: "Surat, Gujarat, India · MBA in Analytics & Data Science + Project Management (Manipal) · BCA 2026",
  portraitUrl: "/tech_workspace.webp", // Optimized Tech & Analytics workspace image
  location: "Surat, Gujarat, India",
  aboutHeading: "Bridging business strategy, financial operations, and software delivery.",
  aboutText1: "I am a product and business operations specialist with 4+ years of finance experience and a BCA technical foundation. I turn complex operational friction into clear product architectures and shipped, functional software.",
  aboutText2: "With an academic foundation spanning a BCA (Graduating 2026) and an MBA in Analytics & Data Science + Project Management from Manipal University Jaipur, I design systems that solve real business problems.",
  officeLocation: "Surat, India / Remote Hub",
  contactInfo: {
    email: "arpitj9974@gmail.com",
    phone: "+91 9624997427",
    linkedin: "linkedin.com/in/Arpit-Jaiswal9974",
    github: "github.com/Arpitj9974"
  },
  stats: [
    { label: "Shipped & Live Systems", value: "10" },
    { label: "Years FinOps (JD Finance)", value: "4+" },
    { label: "Exams Indexed & Mapped", value: "101+" },
    { label: "HR Call Logs Automated", value: "100%" }
  ],
  skills: {
    domains: [
      {
        category: "FinOps & Lending",
        badge: "4+ Yrs Proven",
        items: [
          "Daily cash parity (0.00% ledger drift)",
          "Reducing-balance amortization schedules",
          "Delinquency & aging risk tracking",
          "Collections SOPs & daily accounting close"
        ]
      },
      {
        category: "Product & PRD Specs",
        badge: "End-to-End Specs",
        items: [
          "Ground friction diagnostics & interviews",
          "Functional PRDs, user stories & edge cases",
          "Scope bounding & phase-gate milestones",
          "Data schemas & technical specifications"
        ]
      },
      {
        category: "Systems & Data",
        badge: "Offline-First",
        items: [
          "Relational & NoSQL schemas (Firestore, SQL)",
          "Offline-first PWA caching & durability",
          "State machines & running balance reducers",
          "Low-latency client-side persistence"
        ]
      },
      {
        category: "Process Automation",
        badge: "Zero-Touch Sync",
        items: [
          "Zero-touch background device & call sync",
          "Event webhooks & Google Apps Script",
          "Document & packaging computer vision OCR",
          "Dynamic NPCI UPI QR & automated alerts"
        ]
      }
    ] as CapabilityDomain[],

    toolkitCategories: [
      {
        category: "Financial Modeling & FinOps",
        tools: [
          { name: "Financial Modeling", query: "Financial Modeling" },
          { name: "Loan Ledger Engine", query: "Loan Ledger" },
          { name: "Cashflow Reconciliation", query: "Cashflow" },
          { name: "Amortization Engines", query: "Amortization" },
          { name: "Advanced Excel", query: "Excel" }
        ]
      },
      {
        category: "Data & Analytics",
        tools: [
          { name: "SQL", query: "SQL" },
          { name: "Python", query: "Python" },
          { name: "Power BI", query: "Power BI" },
          { name: "Tableau", query: "Tableau" },
          { name: "Analytics & Telemetry", query: "Analytics" }
        ]
      },
      {
        category: "Systems & Architecture",
        tools: [
          { name: "TypeScript", query: "TypeScript" },
          { name: "React", query: "React" },
          { name: "Cloud Firestore", query: "Firestore" },
          { name: "Offline PWA & IndexedDB", query: "PWA" },
          { name: "REST APIs & Schemas", query: "API" }
        ]
      },
      {
        category: "Automation & Workflows",
        tools: [
          { name: "Google Apps Script", query: "Google Apps Script" },
          { name: "Process Automation", query: "Automation" },
          { name: "Event Webhooks", query: "Webhook" },
          { name: "Computer Vision OCR", query: "OCR" }
        ]
      }
    ] as ToolkitCategory[],

    // Legacy fallback mapping
    whatIDo: [
      {
        category: "FinOps & Business Operations",
        items: [
          "Loan ledger maintenance",
          "Daily cashflow reconciliation",
          "Amortization schedule engines",
          "Borrower delinquency & aging risk",
          "Standard Operating Procedures (SOPs)"
        ]
      },
      {
        category: "Product Strategy & Specifications",
        items: [
          "Ground-level friction observation",
          "Product Requirement Documents (PRDs)",
          "Scope bounding & phase-gate design",
          "Acceptance criteria & edge cases",
          "Data dictionary & schema specs"
        ]
      },
      {
        category: "Systems Architecture & Data Modeling",
        items: [
          "Relational & document schemas",
          "Offline-first PWA architectures",
          "Deterministic state machines",
          "Running balance reducers",
          "Low-connectivity local persistence"
        ]
      },
      {
        category: "Process Automation & Integration",
        items: [
          "Zero-touch background sync",
          "Google Apps Script webhooks",
          "Computer vision OCR pipelines",
          "Dynamic NPCI UPI QR generation",
          "REST API integrations"
        ]
      }
    ],
    techBuildWith: [
      "Financial Modeling",
      "Loan Ledger Engine",
      "Cashflow Reconciliation",
      "Amortization Engines",
      "Advanced Excel",
      "SQL",
      "Python",
      "Power BI",
      "Tableau",
      "TypeScript",
      "React",
      "Cloud Firestore",
      "Offline PWA & IndexedDB",
      "REST APIs & Schemas",
      "Google Apps Script",
      "Process Automation",
      "Event Webhooks",
      "Computer Vision OCR"
    ]
  },
  experience: [
    {
      role: "Finance Operations Lead & Systems Builder",
      company: "JD Finance",
      duration: "Aug 2021 – Jun 2024 (FT, On-site) · Apr 2025 – Present (PT, Hybrid) · 4 years 4 months",
      location: "Surat, Gujarat, India",
      points: [
        "Ran the complete lending operation across 4 years 4 months — loan disbursement, daily repayment tracking, and borrower account portfolios across the full lifecycle.",
        "Designed and built the team's Excel data infrastructure from scratch; it's still the system operations runs on.",
        "Returned in 2025 to lead financial operations again, now bringing automation tooling and data workflows into a process that had been entirely manual."
      ],
      skills: ["Process Automation", "Business Operations", "Decision-Making & Analysis", "Advanced Excel", "Google Apps Script"]
    },
    {
      role: "Product & Operations Lead (Internship)",
      company: "Work Sarthi",
      duration: "Jan 2026 – Mar 2026",
      location: "Surat, Gujarat, India",
      points: [
        "Worked directly under the Founder & CEO to conceive, coordinate, and deliver three products end to end.",
        "Led the AI Career Assessment platform — a psychometric engine combining RIASEC, Big Five, and Hofstede frameworks into one scoring system, generating a personalized career report across 20 career clusters in 13 Indian languages.",
        "Also delivered Career Library, a 225-career exploration platform for Class 11–12 students."
      ],
      skills: ["Product Management", "PRDs & Specs", "AI Integration", "Systems Architecture"]
    },
    {
      role: "Product Operations & AI Systems Specialist (Internship)",
      company: "CripcoCode Technologies Pvt Ltd",
      duration: "Nov 2025 – Jan 2026",
      location: "Surat, Gujarat, India · Remote",
      points: [
        "Conceived, architected, and orchestrated Medicine Image Extraction — an AI computer-vision pipeline that turns photos of pharmaceutical packaging into structured database records, eliminating manual transcription for pharmacists and stockists.",
        "Structured the system into three decoupled microservices so optical extraction and local operations continue uninterrupted during database maintenance windows."
      ],
      skills: ["Gemini Vision AI", "System Architecture", "PRD Specification", "Process Automation"]
    }
  ],
  education: [
    {
      degree: "MBA",
      specialization: "Analytics & Data Science + Project Management (dual specialization)",
      institution: "Manipal University Jaipur",
      duration: "2026 – 2028"
    },
    {
      degree: "BCA",
      specialization: "Bachelor of Computer Applications",
      institution: "Bhagwan Mahavir University, Surat",
      duration: "2023 – 2026"
    }
  ],
  certifications: [
    {
      name: "Google Prompting Essentials Specialization",
      issuer: "Google",
      date: "Aug 2025",
      credentialId: "NFF6BEFXNP9X",
      url: "https://coursera.org/verify/specialization/NFF6BEFXNP9X"
    },
    {
      name: "Mastering Data Structures and Algorithms in C and C++",
      issuer: "Udemy",
      date: "Oct 2025",
      credentialId: "UC-0e9d4f63-26db-4803-8381-ffd8971f1863",
      url: "https://www.udemy.com/certificate/UC-0e9d4f63-26db-4803-8381-ffd8971f1863/"
    },
    {
      name: "Java Programming — Beginner to Master",
      issuer: "Udemy",
      date: "Jan 2025",
      credentialId: "UC-53933d4d-b063-4c0d-a818-ecd3ecb92ba4",
      url: "https://www.udemy.com/certificate/UC-53933d4d-b063-4c0d-a818-ecd3ecb92ba4/"
    },
    {
      name: "C++ Programming — Beginner to Advance, Deep Dive in C++",
      issuer: "Udemy",
      date: "Dec 2024",
      credentialId: "UC-bfe2b6ce-881f-4c45-a332-c11a2fc357b4",
      url: "https://www.udemy.com/certificate/UC-bfe2b6ce-881f-4c45-a332-c11a2fc357b4/"
    }
  ]
};

export const JD_FINANCE_CASE_STUDY: Project = {
  id: "jd-finance",
  title: "JD Finance",
  subtitle: "Lending Operations, Capital Cashflows & Data Infrastructure",
  description: "4+ years running end-to-end credit operations, loan disbursements, and daily repayments with zero-defect custom data infrastructure.",
  cardSummary: "4+ years managing credit disbursements, daily repayment reconciliation, and custom financial data infrastructure.",
  buildingLogic: "In August 2021, when I stepped into JD Finance, loan disbursements and daily repayments were recorded through fragmented paper registers and notebooks. In micro-lending, if your cash collection doesn't balance to the rupee every single evening, risk compounds exponentially. Rather than waiting for expensive enterprise banking software, I observed the ground workflow, mapped the money flow, and built the company's entire data and tracking infrastructure from scratch.",
  purpose: "Establish an end-to-end financial data engine that tracks borrower portfolios, calculates daily amortized interest, flags overdue accounts in real-time, and guarantees 100% daily cash reconciliation.",
  problemSolved: "Eliminated cashflow reconciliation leakage (reduced daily discrepancies to 0%), automated delinquency tracking at Day 3 instead of Day 30, and cut evening close time from 90m to under 15m with $0 software cost.",
  targetUser: "Lending executives, field collection agents, credit partners, and small-business borrowers.",
  aiOrchestration: "Structured the relational ledger schema, interest calculation formulas, and daily cash reconciliation engine, deploying automated Google Apps Script webhooks and automated WhatsApp collection notification pipelines.",
  systemsArchitecture: "Structured the master relational ledger schema, daily amortized interest calculation formulas, and daily cash reconciliation reducers, deploying automated Google Apps Script webhooks and automated alert notification pipelines.",
  valueBadges: ["FinOps Leadership", "4+ Yrs Continuity", "100% Cash Balanced", "-80% Close Time"],
  longDescription: "Ran the complete lending operation across 4 years 4 months — loan disbursement, daily repayment tracking, and borrower account portfolios across the full lifecycle. Designed and built the team's Excel data infrastructure from scratch; it's still the system operations runs on today. Returned in 2025 to lead financial operations again, bringing automation tooling and data workflows into a process that had been entirely manual.",
  year: "2021 – 2026",
  category: "Internal Tools",
  stack: [
    "Financial Modeling",
    "Loan Ledger Engine",
    "Cashflow Reconciliation",
    "Google Apps Script",
    "Process Automation"
  ],
  role: "Finance Operations Lead & Systems Architect",
  timeline: "4+ Years (Continuous Production System)",
  client: "JD Finance (Lending Operations)",
  outcome: "4+ years of uninterrupted operational continuity; 100% daily cash reconciliation; 80%+ reduction in daily accounting close time (from 90m to <15m); $0 spent on enterprise software licenses.",
  problem: "Daily lending operations relied on physical paper ledgers and manual memory. In distributed micro-lending, collection agents collect hundreds of daily cash installments. Reconciling physical cash in hand against theoretical ledger balances took 90+ minutes every evening, suffered from frequent mathematical errors, and hid default risks until accounts were severely past due.",
  solution: "Engineered a master relational loan ledger that automatically computes daily amortization schedules, links disbursements directly to borrower accounts, and compares physical cash collected against expected collections with zero tolerance. Added an automated aging report flagging high-risk borrowers on Day 3 of missed payments, and integrated automated alert triggers.",
  impactStats: [
    { label: "Operational Continuity", value: "4+ Yrs" },
    { label: "Daily Cash Reconciliation", value: "100%" },
    { label: "Daily Close Time", value: "-80%" },
    { label: "Enterprise Software Cost", value: "$0" }
  ],
  featured: false,
  liveUrl: "",
  githubUrl: "",
  repoStatus: "internal-infra",
  tag: "flagship-operations"
};

export const PROJECTS: Project[] = [
  {
    id: "findhar",
    title: "FinDhar",
    subtitle: "Committed Cashflow & Obligation Intelligence System",
    description: "A forward-looking cashflow and debt obligation forecasting engine that projects upcoming loan EMIs and recurring mandates across a 12-to-60 month horizon to prevent month-end liquidity crunches.",
    cardSummary: "Forward-looking cashflow engine mapping upcoming EMIs and recurring mandates to prevent surprise liquidity crunches.",
    buildingLogic: "Traditional budgeting apps look backward—they tell you where your money went last month after the damage is done. In my 4+ years running lending operations at JD Finance, I observed that borrowers default not because they lack income, but because they have zero visibility into compounding debt commitments 3 to 6 months ahead.",
    purpose: "Provide individuals and MSMEs with total forward visibility over committed liabilities, allowing them to stress-test their future cashflow before taking on new debt or major expenses.",
    problemSolved: "Eliminates surprise month-end deficits, credit card EMI debt-traps, and cycle-drift calculation errors across varying 28/30/31-day calendar months.",
    targetUser: "Salaried professionals, retail borrowers, and small business operators managing multiple loans and recurring financial commitments.",
    aiOrchestration: "Formulated the exact-day reducing-balance amortization logic, structured the client-side calculation engine, and integrated OCR receipt parsing with local-first offline state synchronization.",
    systemsArchitecture: "Formulated the exact-day compound reducing-balance amortization engine, structured client-side sub-millisecond waterfall models, and integrated deterministic calendar month-end clamping with offline-first PWA caching.",
    valueBadges: ["FinOps & Lending", "Cashflow Forecast", "12-60M Horizon", "Zero Data Loss"],
    longDescription: "Personal finance applications predominantly suffer from a retrospective flaw: they act as digital bank statement categorizers. Budgeting tools tell users where their money went last month after the financial damage is already done. FinDhar inverts this paradigm: it is not an expense tracker, but a forward-looking obligation and committed cashflow engine. It models fixed, variable, and estimated future financial liabilities—including reducing-balance bank loans, no-cost credit card EMIs, insurance premiums, utility mandates, and recurring subscriptions—mapping them across 12-to-60 month timeline horizons. Features an exact-day compound amortization engine, deterministic calendar month-end clamping (preventing cycle drift in 28/29/30/31-day months), bidirectional payment reconciliation with non-destructive 10-second undo transactions, memory-isolated 'What-If' sandbox simulations, and offline-first PWA caching.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "React 19",
      "TypeScript",
      "Cloud Firestore",
      "Workbox PWA",
      "Gemini 2.0 Flash",
      "Zustand",
      "Zod",
      "Vitest"
    ],
    role: "Product & Operations Architect",
    timeline: "4 Months (Completed Q4 2026)",
    client: "Personal Finance & Committed Obligation Intelligence",
    outcome: "Architected an offline-first PWA with sub-millisecond waterfall generation, 136 passing tests, 10-second transactional undo buffer, deterministic month-end clamping, and air-gapped Gemini 2.0 Flash OCR.",
    problem: "Personal finance applications act as digital bank statement categorizers telling users where money went last month after damage is already done. Contractual obligations (reducing loans, credit card EMIs, recurring mandates) quietly compound until committed cashflow exceeds available liquidity, with zero early-warning visibility.",
    solution: "Shifted financial awareness from retrospective post-mortems to predictive 12-to-60 month obligation waterfalls. Implemented pure math amortization schedules, deterministic month-end date clamping (eliminating February/31st cycle drifts), non-destructive 10-second undo buffers for payment settlements, credit card blocked limit tracking, memory-isolated What-If sandboxes, and air-gapped Gemini 2.0 Flash OCR via Google Cloud Functions.",
    impactStats: [
      { label: "Vitest Test Suite", value: "136 Passed" },
      { label: "AI Parsing Latency", value: "~650ms" },
      { label: "Precached PWA Assets", value: "1.54 MB" },
      { label: "Client Secret Exposure", value: "0 Keys" }
    ],
    featured: true,
    liveUrl: "https://findhar.vercel.app",
    githubUrl: "https://github.com/Arpitj9974/FinDhar"
  },
  {
    id: "study-tracker-aj",
    title: "AspirantFlow",
    subtitle: "ArpitPrep Hub — High-Performance Multi-Exam Syllabus Tracker & Study Orchestrator (v2.6.0)",
    description: "An enterprise-grade Progressive Web Application (PWA) tracking and orchestrating study preparation across 101+ competitive exams and 15 domains with cross-exam syllabus deduplication, offline-first telemetry, and real-time cloud synchronization.",
    cardSummary: "Enterprise multi-exam syllabus tracker & study orchestrator across 101+ exams and 15 domains with cross-exam syllabus deduplication and offline PWA telemetry.",
    buildingLogic: "Competitive exam aspirants routinely prepare for multiple concurrent recruitment cycles (Banking, UPSC, SSC, RRB, Placement) but suffer from severe syllabus fragmentation and repetitive study logging. When a student masters shared topics like Percentages or Syllogisms, that progress is rarely unified across target exams, causing cognitive fatigue and schedule forecasting collapse.",
    purpose: "Unify preparation across 101+ competitive exams through cross-exam syllabus deduplication, multi-horizon study planning, and offline-first PWA telemetry with zero server overhead.",
    problemSolved: "Eliminates syllabus fragmentation, repetitive study logging across exams, and tracking freezes during spotty internet connections with offline-first PWA caching and shared mastery propagation.",
    targetUser: "High-school graduates, university students, working professionals, and full-time aspirants preparing for Banking (SBI, IBPS), Civil Services (UPSC), SSC, Railways (RRB), Engineering (JEE, GATE), Medical (NEET), MBA (CAT), Defense, Law, and Placement exams.",
    aiOrchestration: "Architected the 101-exam declarative curriculum schema (103 data models), cross-exam syllabus deduplication state engine, zero-flicker pre-render pipeline (CLS 0.0), and 5000ms timeout-safe Firestore bi-directional synchronization circuit.",
    systemsArchitecture: "Architected the 101-exam declarative curriculum schema (103 data models), cross-exam syllabus deduplication state engine, zero-flicker pre-render pipeline (CLS 0.0), and 5000ms timeout-safe Firestore bi-directional synchronization circuit.",
    valueBadges: ["101+ Exams (15 Domains)", "Syllabus Deduplication", "Offline-First PWA (v58)", "Multi-Horizon Planner", "$0 Server Cost"],
    longDescription: "AspirantFlow (ArpitPrep Hub) is an enterprise-grade Progressive Web Application (PWA v2.6.0) architected to track, schedule, and analyze preparation across 101+ national and state-level competitive exams spanning 15 master domains. Built on a zero-overhead vanilla JavaScript (ES6+) architecture, it features cross-exam syllabus deduplication ('study once, benefit everywhere'), resilient offline-first bi-directional sync with Google Cloud Firestore guarded by a 5000ms circuit breaker, a generic specification runtime engine powering 117 dashboards, multi-horizon planning (Daily, Weekly ISO 8601, Monthly, Yearly), full-length mock test telemetry, and role-based administrative analytics.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "Vanilla JavaScript (ES6+)",
      "Vanilla CSS3 & Tailwind CSS",
      "Firebase Auth & Firestore NoSQL",
      "Service Worker API (Cache v58)",
      "LocalStorage & DOM Event Bus",
      "Node.js Verification Harness"
    ],
    role: "Product & Systems Architect",
    timeline: "Completed 2026 (Production v2.6.0)",
    client: "National & Multi-Exam Competitive Aspirants",
    outcome: "Architected a zero-overhead, offline-first study orchestrator powering 101+ exams and 117 dashboards across 15 domains. Achieved sub-16ms local persistence, CLS 0.0 layout rendering, 220+ precached PWA assets, and $0 monthly cloud infrastructure cost.",
    problem: "Competitive aspirants targeting multiple exams face syllabus fragmentation, repetitive progress tracking, and frequent application freezes in low-connectivity environments (libraries, basements, trains). Standard web trackers depend on fragile REST calls and duplicate identical subjects across independent silos.",
    solution: "Designed a cross-exam syllabus deduplication engine linking shared core proficiencies (Quant, Reasoning, English, GA) via unified key prefixes. Built a specification-driven generic dashboard controller (window.DASH_SPEC) replacing 30,000+ lines of duplicate code, an offline-first PWA cache (v58), a 5000ms Promise.race timeout circuit breaker for Firestore sync, and synchronous head-level pre-rendering for zero-flicker CLS 0.0.",
    impactStats: [
      { label: "Live Competitive Exams", value: "101+ Exams" },
      { label: "Master Domain Categories", value: "15 Categories" },
      { label: "Variant Dashboards", value: "117 Dashboards" },
      { label: "Precached PWA Assets", value: "220+ Assets (v58)" },
      { label: "Server Infrastructure Cost", value: "$0 (Serverless)" },
      { label: "Layout Shift (CLS)", value: "0.0 Zero-Flicker" }
    ],
    featured: true,
    liveUrl: "https://aspirantflow.vercel.app",
    githubUrl: "https://github.com/Arpitj9974/Study-Tracker-AJ"
  },
  {
    id: "vyosha",
    title: "Vyosha",
    subtitle: "Cloud-Synced, Offline-First Digital Ledger & EMI Prepayment Platform",
    description: "A modern digital passbook and credit ledger (Bahi-Khata) for Indian neighborhood retail shops with instant dynamic UPI QR collection and loan amortization.",
    cardSummary: "Digital kirana passbook & ledger replacing paper notebooks with UPI QR collection and loan amortization.",
    buildingLogic: "Millions of local kirana owners record customer credit (Udhaar) in physical paper notebooks. Pages tear, calculations are made by hand, and chasing debt over phone calls is awkward and time-consuming. In wholesale markets and basements, bad internet makes heavy apps useless.",
    purpose: "Modernize neighborhood store accounting, automate collection reminders via UPI and WhatsApp, and provide multi-prepayment loan amortization without requiring merchants to learn complex accounting software.",
    problemSolved: "Eliminates lost ledger pages, uncollected bad debts, arithmetic calculation mistakes, and slow collection cycles; speeds up merchant cash recovery by up to 5x.",
    targetUser: "Indian kirana store owners, micro-merchants, local trade vendors, and MSMEs needing simple, error-free customer credit management.",
    aiOrchestration: "Designed the dual-entry accounting state model, running balance reducer, and UPI collection flow, delivering an offline-first PWA architecture with sub-200ms cold-start hydration and IndexedDB persistence.",
    systemsArchitecture: "Designed the dual-entry accounting state model, running balance reducer, and dynamic NPCI UPI QR collection flow, delivering an offline-first PWA architecture with sub-200ms cold-start hydration and IndexedDB persistence.",
    valueBadges: ["Kirana FinOps", "UPI QR Collection", "Offline Durability", "5x Faster Recovery"],
    longDescription: "Vyosha (from Vyom + Kosha, 'Treasury of Space') is a high-performance progressive web app (PWA) and fintech ledger platform designed for Indian micro-merchants, kirana stores, and SMEs. Replaces physical paper notebooks with cloud-synchronized, passbook-style running balances, instant dynamic NPCI UPI QR payment generation, and one-tap WhatsApp payment reminders. Built with offline-first local disk caching, Vyosha achieves sub-200ms cold-start hydration via Frame-0 local cache. It also features multi-book isolation, client-side photo receipt compression (98% reduction), an in-app arithmetic evaluation keypad, and a comprehensive multi-prepayment bank loan amortization simulator.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "React 19",
      "TypeScript 5.8",
      "Tailwind CSS v4",
      "Firebase 12 Firestore",
      "IndexedDB",
      "Service Worker PWA",
      "node-qrcode"
    ],
    role: "Product & Operations Architect",
    timeline: "4 Months (Completed Q3 2026)",
    client: "Indian Micro-Merchants, Kirana Stores & MSMEs",
    outcome: "Delivered an offline-first PWA with <200ms cold-start hydration, 100% offline durability with multi-tab IndexedDB synchronization, dynamic UPI payment QR links accelerating collection cycles by up to 5x, and zero-data-loss recovery.",
    problem: "Millions of Indian micro-merchants and kirana owners track credit (Udhaar) and payments (Jama) in physical paper notebooks (Bahi-Khata). These suffer from physical damage, lost pages, calculation errors, lack of offsite backups, awkward debt-chasing, and zero ability to compute running balances or plan loan prepayments on spotty basement/mandi network connections.",
    solution: "Engineered Vyosha as a resilient offline-first PWA backed by Firebase Firestore persistent IndexedDB cache and Frame-0 localStorage hydration (<200ms cold boot). Features pure reducer chronological running balance computation, dynamic NPCI UPI QR code generation and WhatsApp deep-link billing, multi-ledger isolation (business vs personal), an in-app arithmetic expression keypad, client-side 98% image compression for receipts, and an end-to-end Loan Amortization & Multi-Prepayment Simulation engine.",
    impactStats: [
      { label: "Cold-Start Hydration", value: "<200ms" },
      { label: "Collection Speedup", value: "Up to 5x" },
      { label: "Offline Storage Durability", value: "100% IndexedDB" },
      { label: "Photo Receipt Compression", value: "98% (<100KB)" }
    ],
    featured: true,
    liveUrl: "https://vyosha.vercel.app",
    githubUrl: "https://github.com/Arpitj9974/Vyosha"
  },
  {
    id: "freshstamp",
    title: "FreshStamp",
    subtitle: "AI-Powered Household Expiry Tracker",
    description: "Preventing over ₹50,000 in annual household food and medicine waste with a zero-typing camera scanner that reads packaging expiration dates in under 3 seconds and prioritizes items via FIFO batch tracking.",
    cardSummary: "Zero-typing packaging scanner & FIFO pantry tracker preventing over ₹50,000 in annual perishable waste.",
    buildingLogic: "Indian households discard over ₹50,000 worth of groceries, cosmetics, and medicines annually simply because expiration dates are printed in tiny fonts and forgotten in pantry cupboards. Manual logging apps fail because users hate typing.",
    purpose: "Eliminate domestic perishable waste by allowing users to scan packaging in under 3 seconds and receive automatic FIFO alerts before items expire.",
    problemSolved: "Eliminates financial waste from expired pantry goods and removes the friction of manual keyboard data entry.",
    targetUser: "Budget-conscious families, elderly individuals managing multiple prescription medicines, and small neighborhood grocery retailers.",
    aiOrchestration: "Designed the camera-capture ingestion pipeline, structured the multimodal extraction schema, and implemented the local-first storage engine with automated FIFO batch sorting.",
    systemsArchitecture: "Engineered the optical packaging ingestion pipeline, zero-DB derived FIFO batch-sorting state reducer, and local-first dual-channel storage engine with offline PWA caching.",
    valueBadges: ["Waste Prevention", "Zero-Typing Scan", "FIFO Inventory", "₹50K Saved/Yr"],
    longDescription: "FreshStamp is a highly optimized progressive web app designed to eliminate domestic consumable waste. Point the camera at a product — the date, brand, price, and category read themselves off the packaging. Gemini Vision extracts every field in one shot, so nothing gets typed. FIFO batch detection flags which stock to move first when two batches of the same product sit on the shelf. Works fully offline as a guest, syncs to the cloud on sign-in. Waste analytics show exactly how much money expired and in which category.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "React",
      "TypeScript",
      "Firebase",
      "Gemini Vision",
      "Vercel Serverless"
    ],
    role: "Product & Operations Architect",
    timeline: "4 Months (Completed July 2026)",
    client: "Personal Productivity & Zero-Waste Household Initiative",
    outcome: "Successfully built a dual-mode, mobile-first progressive tracking environment enabling 100% data syncing across multiple devices, reducing household perishable waste by an estimated ₹50,000 annually through FIFO automation.",
    problem: "Indian households waste an estimated ₹50,000+ worth of perishable food and consumables annually because there is no convenient way to track items across groceries, medicines, and cosmetics. Existing tools are tedious, requiring manual input for every single entry, which introduces high onboarding friction.",
    solution: "Designed a mobile-first progressive web app backed by a Firebase cloud database. Formed a dual-channel sync pipeline (Firestore and localStorage fallback) with optimistic UI writes. Integrated a serverless Gemini 3.5 Flash vision scanning API to extract packaging parameters in under 3 seconds, coupled with a derived FIFO batch-tracking engine that flags earlier-expiring products with visual stamps.",
    impactStats: [
      { label: "Waste Savings (Annual)", value: "₹50,000+" },
      { label: "Packaging Scan Speed", value: "<3 Seconds" },
      { label: "Dual-Storage Channels", value: "Firestore + Local" },
      { label: "Batch Tracking Engine", value: "Zero-DB FIFO" }
    ],
    featured: true,
    liveUrl: "https://fresh-stamp.vercel.app",
    githubUrl: "https://github.com/Arpitj9974/FreshStamp"
  },
  {
    id: "career-library",
    title: "Career Library",
    subtitle: "225 careers, 14 industries, built for Class 11–12 students who get almost no real guidance.",
    description: "An open-access career discovery portal mapping 225+ career paths, 700+ entrance exams, and 5,000+ institutions for Indian high school students.",
    cardSummary: "Comprehensive career discovery platform mapping 225+ professions, entrance exams, and colleges for Indian students.",
    buildingLogic: "Over 90% of Indian school students only know about Engineering and Medicine because structured career guidance is locked behind expensive private counseling services or confusing government websites.",
    purpose: "Democratize career literacy by connecting every profession to required stream choices, entrance exams, eligibility rules, and top colleges.",
    problemSolved: "Eliminates uninformed stream choices and career misinformation for students who cannot afford private career advisors.",
    targetUser: "Class 10–12 students, tier-2/tier-3 town aspirants, parents, and school academic counselors.",
    aiOrchestration: "Synthesized structured flat-file JSON schemas for 225 professions and built a lightweight, zero-latency static exploration portal with 100% offline-tolerant bookmarks.",
    systemsArchitecture: "Synthesized structured flat-file JSON taxonomy schemas for 225 professions, engineering a zero-dependency, zero-latency static exploration portal with 100% offline-tolerant bookmarks.",
    valueBadges: ["Career Guidance", "225 Professions", "700+ Exams", "Open Access"],
    longDescription: "Every career maps to entrance exams, top colleges, eligibility rules, required traits, and where it leads next. Students upload their marksheet and get an AI evaluation of their fit for that specific career. Flat-file JSON architecture — no database, no build step, deploys as static files anywhere.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "Vanilla JavaScript",
      "JSON",
      "Claude API"
    ],
    role: "Product & Operations Architect",
    timeline: "3 Months (Completed June 2026)",
    client: "Indian High School Guidance Initiative",
    outcome: "Created an open-source, O(1) performance exploration portal delivering interactive maps of 225+ paths, 700+ exams, and 5k+ institutions with zero static page-load latency and 100% offline-tolerant bookmarks.",
    problem: "Indian Class 11-12 students face a complex, multi-tiered decision pipeline with scarce structured resources. Standard tools offer superficial summaries, lack concrete stream-to-college maps, and fail to provide personalized suitability evaluation based on actual academic credentials.",
    solution: "Engineered a zero-framework, dynamic page-routing engine mapping taxonomy folders through specialized JSON assets. Built a customized document ingestion engine using FileReader API to extract credentials from marksheets. This content dynamically feeds structured context and schema-constrained inference payloads to Claude Sonnet to output comprehensive 5-dimensional candidate-role-fit reports.",
    impactStats: [
      { label: "Careers Mapped", value: "225" },
      { label: "Mapped Entrance Exams", value: "700+" },
      { label: "Colleges Referenced", value: "5,000+" },
      { label: "Design Themes Integrated", value: "14" }
    ],
    featured: false,
    liveUrl: "https://career-library-worksarthi.vercel.app",
    githubUrl: "",
    repoStatus: "client-proprietary",
    tag: "internship"
  },
  {
    id: "work-sarthi",
    title: "Career Assessment Test - WSCAT",
    subtitle: "A psychometric engine that turns 60+ data points into a personalized career report.",
    description: "A vocational assessment platform that evaluates 60+ personality and cognitive indicators to produce an 8–10 page career roadmap in 13 Indian languages.",
    cardSummary: "Psychometric career assessment engine generating personalized roadmaps across 13 Indian regional languages.",
    buildingLogic: "Existing psychometric tests are modeled on Western corporate contexts, written exclusively in English, and completely unaffordable for non-metro vernacular students.",
    purpose: "Deliver culturally grounded, scientific career counseling in the student's native mother tongue to guide their post-school education and vocational choices.",
    problemSolved: "Eliminates language and cultural barriers in career guidance; delivers reports in Hindi, Gujarati, Marathi, Tamil, Bengali, and 8 other languages.",
    targetUser: "Regional language students, government school pupils, and vocational training centers across tier-2 and tier-3 India.",
    aiOrchestration: "Designed the psychometric assessment framework, normalized scoring vectors across 13 Indian languages, and built a client-driven parallel inference pipeline generating comprehensive A4 PDF reports.",
    systemsArchitecture: "Designed the psychometric scoring normalization engine across RIASEC, Big Five, and Hofstede models, structuring parallel inference pipelines across 13 Indian regional languages with client-side PDF generation.",
    valueBadges: ["13 Languages", "Psychometrics", "Tier-2/3 Access", "Personalized Report"],
    longDescription: "Combines RIASEC, Big Five, and Hofstede's cultural dimensions into one normalized scoring system, then runs four parallel AI calls to build an 8–10 page report with SWOT analysis and a timestamped action roadmap. 13 Indian languages — the AI writes the report in the student's own language, not just the interface. Fully client-side, so student data never leaves the browser.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "React",
      "Gemini",
      "Recharts",
      "jsPDF",
      "i18next"
    ],
    role: "Product & Operations Architect",
    timeline: "4 Months (Completed April 2026)",
    client: "Indian Student Vocational Guidance Initiative",
    outcome: "Engineered a client-driven testing engine delivering high-fidelity, parallelized AI report generations in under 20 seconds, supporting 13 regional locales and 100% data sovereignty.",
    problem: "Standard vocational guidance tools rely on single questionnaires that generate superficial recommendations, fail to incorporate local cultural/academic context, ignore multi-device security rules, and suffer from high API orchestration latencies.",
    solution: "Created a 10-step onboarding flow spanning multiple assessments with localized translation layers. Architected a multi-stage, client-side API loop that normalizes OCEAN/RIASEC vectors, launches concurrent query threads to Gemini 1.5 Flash, parses loose JSON responses with custom fallbacks, and outputs styled vector canvases formatted as multi-page A4 PDFs.",
    impactStats: [
      { label: "Psychometric Indicators", value: "60+" },
      { label: "Indian Languages (i18n)", value: "13" },
      { label: "API Parallel Factor", value: "4x" },
      { label: "Report Page Yield", value: "8-10 Pages" }
    ],
    featured: false,
    liveUrl: "https://work-sarthi.vercel.app",
    githubUrl: "",
    repoStatus: "client-proprietary",
    tag: "internship"
  },
  {
    id: "arws-raw",
    title: "RAW",
    subtitle: "The Invisible HR Call Intelligence Layer",
    description: "Eliminating 1 hour of daily administrative logging per recruiter through an invisible Android background service that auto-records company-SIM calls to Google Sheets with zero duplicate entries and $0 server cost.",
    cardSummary: "Invisible HR call intelligence tool auto-logging candidate calls to Google Sheets with zero duplicate entries and $0 server cost.",
    buildingLogic: "At ARWS, recruitment staff spent 45 to 60 minutes every evening manually typing call logs into spreadsheets. Critical candidate interactions were forgotten, and recruiters suffered from administrative fatigue.",
    purpose: "Automatically push official candidate call durations and timestamps directly into Google Sheets the second a call finishes, while strictly keeping personal calls 100% private.",
    problemSolved: "Saves 1 full hour of repetitive administrative work per recruiter daily, eliminates memory errors, and costs $0 in cloud hosting.",
    targetUser: "HR recruitment teams, placement agencies, and field coordination staff using dual-SIM Android devices.",
    aiOrchestration: "Modeled the dual-SIM hardware filtering boundary, engineered the Android Room/WorkManager background service, and implemented the zero-cost Google Apps Script ingestion endpoint.",
    systemsArchitecture: "Modeled the hardware-level dual-SIM subscriptionId filtering boundary, engineered the Android Room SQLite transactional buffering service, and built the zero-cost Google Apps Script ingestion endpoint.",
    valueBadges: ["HR Automation", "100% Logs Captured", "-60m Daily Admin", "$0 Server Cost"],
    longDescription: "Runs in the background, detects when a call ends, filters it by the company SIM, and pushes it to a Google Sheet in real time. Personal SIM calls never leave the phone — that boundary is enforced at two independent points in the code, by design. No internet? The call is stored locally and uploaded when the network returns. A four-layer duplicate-prevention system means the same call can never appear twice, even after a failed retry. The entire backend is a 133-line Google Apps Script — zero hosting cost, because the client had no infrastructure and no budget.",
    year: "2026",
    category: "Mobile",
    stack: [
      "Kotlin",
      "Room",
      "WorkManager",
      "Google Apps Script",
      "Google Sheets"
    ],
    role: "Product & Operations Architect",
    timeline: "2 Months (Completed Q3 2026)",
    client: "ARWS HR Operations",
    outcome: "Successfully automated 100% of candidate tracking logs across company devices, saving 45–60 minutes of daily administrative overhead per HR personnel with a provable 0% duplicate record rate.",
    problem: "In high-volume SME recruitment, HR staff carry dual-SIM phones (personal and company). They are expected to manually log dozens of candidate and client calls (number, duration, time, type) into spreadsheets daily. This manual reporting causes memory-loss errors, delayed intelligence, and wastes 30–60 minutes of daily productive time.",
    solution: "We engineered CallTrackingService.kt, an Android foreground service running a PhoneStateListener. Upon transitioning to idle state, it delays 1,500ms (allowing the media service to flush CallLog.Calls), reads logs, filters out personal calls using Android subscriptionId, saves the call record to a Room SQLite table, and performs an immediate HTTP POST to a Google Apps Script Web App. PeriodicSyncWorker.kt runs a clock-boundary-aligned job to process offline backfills, while a multi-layered deduplication architecture guarantees zero duplicate rows in the sheet.",
    impactStats: [
      { label: "Manual Effort Saved", value: "100%" },
      { label: "Daily Admin Overhead", value: "-60m" },
      { label: "Duplicate Entry Rate", value: "0%" },
      { label: "Server Infrastructure Cost", value: "$0" }
    ],
    featured: false,
    liveUrl: "",
    githubUrl: "https://github.com/Arpitj9974/ARWS-dialer",
    tag: "internship"
  },
  {
    id: "medicine-extraction",
    title: "Medicine Image Extraction",
    subtitle: "AI-Powered Pharmaceutical Data Digitization",
    description: "Slashing pharmaceutical cataloging turnaround by over 80% through an optical data ingestion pipeline that reads medicine brand names, batch numbers, expiry dates, and MRPs directly from packaging photos.",
    cardSummary: "Optical packaging digitizer reading batch numbers and expiry dates off medicine boxes in <5 seconds.",
    buildingLogic: "Retail chemists and medical warehouse clerks spend hours manually typing tiny alphanumeric batch numbers and expiry dates into ERP software, leading to transcription errors and inventory auditing discrepancies.",
    purpose: "Automate pharmacy stock intake by letting staff photograph medicine strips or boxes and extracting compliant inventory data in seconds with zero manual typing.",
    problemSolved: "Eliminates manual keyboard transcription errors, reduces inventory processing time from minutes to under 5 seconds, and prevents stock audits from failing.",
    targetUser: "Retail pharmacy chemists, pharmaceutical distributors, hospital dispensaries, and warehouse stock handlers.",
    aiOrchestration: "Defined strict Pydantic JSON validation schemas for regulatory medicine data and engineered a decoupled polyglot parsing pipeline with air-gapped credentials and graceful degradation.",
    systemsArchitecture: "Architected a decoupled three-tier polyglot microservice pipeline, enforcing strict Pydantic JSON validation schemas for regulatory medicine data with air-gapped credential isolation and graceful degradation.",
    valueBadges: ["Pharma Digitization", "Zero-Typing Intake", "<5s Extraction", "Audit Compliance"],
    longDescription: "Gemini Vision pulls the medicine name, expiry, batch number, and price straight off the packaging — no manual transcription. Built as three independent services so the AI keeps working even if the database goes down, and every extraction is classified as complete, partial, or failed so nothing silently disappears.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "React",
      "Node.js",
      "Python (FastAPI)",
      "MongoDB",
      "Gemini"
    ],
    role: "Product & Operations Architect",
    timeline: "5 Months (Completed January 2026)",
    client: "Pharmaceutical Supply Chain & Retail Pharmacies",
    outcome: "Successfully automated medicine packaging data ingestion with an average extraction duration of sub-5 seconds, supporting graceful database degradation and keeping a 0% client-side API credential leak rate.",
    problem: "Healthcare supply chain units rely on manual transcription to record batch numbers, prices, and expiration dates from packaging boxes. This process is highly slow, produces transcription errors, and compromises medication inventory auditing due to data mismatches.",
    solution: "Engineered a decoupled polyglot pipeline separating heavy AI inference from database operations. Formed custom temperature=0.0 and forced response_mime_type schemas inside FastAPI using Pydantic. Built a robust three-tier validation engine (client, Multer, FastAPI) to ensure uploads remain under 5MB while gracefully handling server-database connection drops during extractions.",
    impactStats: [
      { label: "Fields Extracted", value: "4 (Critical)" },
      { label: "Average Extraction Speed", value: "<5 Seconds" },
      { label: "Service Tiers", value: "3 (Polyglot)" },
      { label: "File Validation Steps", value: "3-Tier" }
    ],
    featured: false,
    liveUrl: "https://medicine-image-extraction.vercel.app",
    githubUrl: "https://github.com/Arpitj9974/Medicine-Image-Extraction",
    tag: "internship"
  },
  {
    id: "farmer-connect",
    title: "FarmerConnect",
    subtitle: "AI-Powered Agricultural Direct-to-Consumer Cooperative Marketplace",
    description: "Eliminating 30–40% cartel middleman markups for smallholder farmers through a direct-to-buyer marketplace featuring concurrency-safe live auctions, 24h cached government mandi benchmark rates, and multilingual advisory.",
    cardSummary: "Direct agricultural marketplace eliminating 30–40% mandi middleman cuts with concurrency-safe auctions and government benchmark pricing.",
    buildingLogic: "Smallholder farmers lose up to 40% of their crop value to commission middlemen in wholesale mandis due to price opacity and lack of direct buyer access.",
    purpose: "Enable farmers to sell produce directly at fair market rates, track live government benchmark prices, and get crop guidance in regional languages.",
    problemSolved: "Eliminates exploitative middleman cuts, auction price-fixing, and lack of transparency in agricultural trade.",
    targetUser: "Smallholder farmers, rural agricultural cooperatives, wholesale food buyers, and commercial bulk purchasers.",
    aiOrchestration: "Designed the concurrency-safe auction workflow using PostgreSQL row-level locks, integrated government mandi pricing feeds, and implemented a resilient 3-provider failover advisory architecture in Hindi and Gujarati.",
    systemsArchitecture: "Engineered the concurrency-safe auction engine using PostgreSQL row-level locks (SELECT FOR UPDATE), 24-hour hybrid caching for government Agmarknet APIs, and a 3-provider failover advisory cascade in Gujarati, Hindi, and English.",
    valueBadges: ["AgriTech FinOps", "Direct-to-Buyer", "30-40% Fees Saved", "Multilingual Support"],
    longDescription: "FarmerConnect is a direct-to-buyer agricultural marketplace that eliminates crop trading middlemen using a concurrency-safe bidding engine and a three-provider AI fallback stack. Two selling modes — fixed price and live auction. The bidding engine uses database row locking so two buyers bidding in the same millisecond can't both win. Live mandi prices come straight from the government's data.gov.in API, cached so the app stays fast and stays honest when the source goes down. An embedded AI assistant answers farmer questions on MSP rates, crop disease, and government schemes, routing across three AI providers so it never goes dark. Razorpay payments, three user roles, English/Hindi/Gujarati.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Gemini",
      "Groq",
      "OpenRouter",
      "Razorpay",
      "Supabase"
    ],
    role: "Product & Operations Architect",
    timeline: "6 Months (Completed Q1 2026)",
    client: "Indian Agricultural Direct-to-Consumer Cooperative",
    outcome: "Engineered a robust, race-condition-free auction and bidding infrastructure backed by a resilient three-provider AI cascade, securing critical agricultural data access with zero API key leaks.",
    problem: "Indian crop trading has been dominated by middlemen who absorb up to 40% of crop value. Farmers lack direct channels to verified buyers, suffer from lack of price transparency in domestic mandis, and standard tools are highly susceptible to concurrency race conditions during active auctions.",
    solution: "Designed a secure multi-role portal featuring a SELECT FOR UPDATE transactional locking mechanism in PostgreSQL to prevent bidding race conditions. Integrated official data.gov.in APIs with a 24-hour hybrid caching service. Built the Krishi Sahayak chatbot leveraging a 2x2 intent-and-knowledge matrix with automatic API failover cascading (OpenRouter -> Gemini + Search Grounding -> Groq Llama 3.3).",
    impactStats: [
      { label: "AI Providers Integrated", value: "3 (Automatic Failover)" },
      { label: "Mandi Cash Caching", value: "24-Hour Hybrid" },
      { label: "Middlemen Fees Saved", value: "30-40%" },
      { label: "Throttling Tiers Enforced", value: "7-Tier Security" }
    ],
    featured: false,
    liveUrl: "https://farmer-connect-aj.vercel.app",
    githubUrl: "https://github.com/Arpitj9974/Farmer_Connect"
  },
  {
    id: "ar-auagpt",
    title: "AR-AuAgPt",
    subtitle: "Precious Metals Real-Time Domestic Index Platform",
    description: "A real-time gold, silver, and platinum pricing platform reflecting true Indian landed rates including customs import duties, AIDC, and GST.",
    cardSummary: "Domestic precious metals index platform calculating true Indian landed rates with customs duty and GST.",
    buildingLogic: "Most financial platforms only show raw international USD spot gold prices, ignoring India's 6% customs duty, 1% AIDC, and 3% GST. Local buyers get confused and end up paying arbitrary retail markups.",
    purpose: "Provide local buyers with transparent, landed prices calculated in Indian Rupees, standardized by 10 grams and Tola.",
    problemSolved: "Eliminates consumer confusion, prevents overpaying due to hidden jeweler margins, and offers 30-year historical trend tracking.",
    targetUser: "Retail jewelry buyers, small bullion investors, local goldsmiths, and bridal gift planners.",
    aiOrchestration: "Formulated the domestic customs tax and GST conversion algorithms, engineering an Express proxy gateway with a 5-tier high-availability fallback cascade for precious metal pricing.",
    systemsArchitecture: "Formulated the domestic customs tax, AIDC, and GST conversion algorithms, engineering an Express proxy gateway with a 5-tier high-availability fallback cascade for precious metal pricing.",
    valueBadges: ["Commodity Pricing", "True Indian Landed Tax", "Tola & Gram Units", "100% Availability"],
    longDescription: "Gold, silver, and platinum prices that show what an Indian buyer actually pays — not raw USD spot. Import duty, AIDC, and GST layered in and benchmarked against IBJA rates. Five fallback data sources chained together so a price card is never blank. 30 years of history, interactive charts, and a calculator that speaks in tola and 10g like Indian jewellers do. Ships as a web app, an installable PWA, and a native Android/iOS build from one codebase.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "React",
      "TypeScript",
      "Express",
      "Capacitor",
      "PWA"
    ],
    role: "Product & Operations Architect",
    timeline: "6 Months (Completed March 2026)",
    client: "Indian Commodity & Retail Investor Market",
    outcome: "Successfully engineered a stateless, real-time tracking gateway maintaining 100% price feed availability through automatic Swissquote, Yahoo, ECB, and local storage fallback layers.",
    problem: "Indian commodity buyers need accurate domestic prices reflecting import duties (6% import duty, 1% AIDC, and 3% GST), but standard widgets only display raw global USD spot rates. Existing domestic tools are bloated, suffer from frequent API outages, and lack long-term relative comparison tracking.",
    solution: "Developed an Express proxy service warmed via proactive 60-second cron-like cache triggers to serve pre-calculated rates. Integrated mathematical conversion models mapping raw troy-ounce spot bids to domestic 10g and tola units. Bundled historical charts with procedurally generated noise overlays and relative normalized percentages to empower swift asset-class comparison.",
    impactStats: [
      { label: "Active Metal Feeds", value: "3" },
      { label: "Historical Records (Years)", value: "30" },
      { label: "Resilience Tier Cascades", value: "5-Tier" },
      { label: "Currency Support", value: "USD / INR" }
    ],
    featured: false,
    liveUrl: "https://bullion-live.vercel.app",
    githubUrl: "https://github.com/Arpitj9974/Ar-AuAgPt"
  }
];
