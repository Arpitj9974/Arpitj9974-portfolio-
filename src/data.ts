import { Project } from "./types";

export const PORTFOLIO_OWNER = {
  name: "ARPIT JAISWAL",
  title: "Full-Stack Builder & Finance Specialist",
  tagline: "Full-stack builder. Finance background. Eight products shipped and running.",
  subLine: "Surat, Gujarat, India · BCA 2026 · MBA in Analytics & Data Science + Project Management, Manipal University Jaipur",
  portraitUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhp8rfW4bgywHoBSOoKfllFxkKts1homWAosdFGxnfLwK9BE__RVIAruocvkOb2kMGFbllbqG4lYVTGcUBgjDAVEWbesyT4hmC9E16Ai_QJbOTPbLdfam9aDY4gGRGLt3qUqgb1WenwRBxR2AH4hfX44XxupgUkqG3hnxIO3ydhSd3c09bf7Wyy_0t_ex3ypUZUAqICuzKXgfjvrGRDtQhV760jvkMSVgjWHMNrcydHR34hRfxe-YDe3XT5lNKG5OfDQGfnEalqVg", // High quality portrait placeholder
  location: "Surat, Gujarat, India",
  aboutHeading: "Bridging the gap between financial models and full-stack product architectures.",
  aboutText1: "I am a full-stack builder with a deep finance background. I specialize in turning complex, messy business and technical ideas into elegant, fully working web and mobile products.",
  aboutText2: "With solid academic foundations spanning a BCA (Graduating 2026) and an MBA in Analytics & Data Science + Project Management from Manipal University Jaipur, I design software systems that are robust, clean, and fast.",
  officeLocation: "Surat, India / Remote Hub",
  contactInfo: {
    email: "jaiswalarpit428@gmail.com",
    phone: "+91 9624997427",
    linkedin: "linkedin.com/in/Arpit-Jaiswal9974",
    github: "github.com/Arpitj9974"
  },
  stats: [
    { label: "Products Shipped", value: "08" },
    { label: "Tech Stack Modules", value: "12+" },
    { label: "Active Integrations", value: "05" },
    { label: "Data Science Skills", value: "Expert" }
  ],
  toolkit: [
    { category: "SYSTEMS DESIGN", items: ["Information Architecture", "Interface Mechanics", "Figma Prototyping", "State Management Flow"] },
    { category: "TECHNICAL STACK", items: ["React / TypeScript", "Tailwind CSS / Vite", "Node.js & Express", "D3.js / Recharts"] },
    { category: "FINANCE & DATA", items: ["Financial Modelling", "Data Analytics", "SQL / Databases", "Project Management"] }
  ],
  experience: [
    {
      role: "Finance Operations Lead & Systems Builder",
      company: "JD Finance",
      duration: "Aug 2021 – Jun 2024 (FT, On-site) · Apr 2025 – Present (PT, Hybrid)",
      location: "Surat, Gujarat, India",
      points: [
        "Ran the complete lending operation — loan disbursement, daily repayment tracking, and borrower account portfolios across the full lifecycle.",
        "Designed and built the team's Excel data infrastructure from scratch; it's still the system operations runs on.",
        "Returned in 2025 to lead financial operations again, now bringing automation tooling and data workflows into a process that had been entirely manual."
      ],
      skills: ["Process Automation", "Business Operations", "Decision-Making & Analysis", "Advanced Excel", "Google Apps Script"]
    },
    {
      role: "Product Development Lead (Internship)",
      company: "Work Sarthi",
      duration: "Jan 2026 – Mar 2026",
      location: "Surat, Gujarat, India",
      points: [
        "Worked directly under the Founder & CEO to conceive, coordinate, and deliver three products end to end.",
        "Led the AI Career Assessment platform — a psychometric engine combining RIASEC, Big Five, and Hofstede frameworks into one scoring system, generating a personalized career report across 20 career clusters in 13 Indian languages.",
        "Also delivered Career Library, a 225-career exploration platform for Class 11–12 students."
      ],
      skills: ["Product Coordination", "Google Apps Script", "AI Integration", "Prompt Engineering"]
    },
    {
      role: "Product Developer, AI & Automation (Internship)",
      company: "CripcoCode Technologies Pvt Ltd",
      duration: "Nov 2025 – Jan 2026",
      location: "Surat, Gujarat, India · Remote",
      points: [
        "Built and deployed Medicine Image Extraction — an AI application that turns a photo of pharmaceutical packaging into a structured database record, replacing manual transcription for pharmacists and stockists.",
        "Designed it as three independent services so the extraction pipeline keeps running even when the database is down."
      ],
      skills: ["Gemini AI", "AI Automation", "System Design", "API Integration"]
    }
  ],
  certifications: [
    "MBA Candidate (Analytics & Data Science + Project Management)",
    "BCA Graduate (Batch of 2026)",
    "Google UX Design Professional Certificate",
    "Systems Architecture Master Class"
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "study-tracker-aj",
    title: "Study Tracker AJ",
    subtitle: "Full-Stack Progressive Web Application",
    description: "A sophisticated exam preparation management system that unifies 178 chapters across 27 competitive exams under an elegant, cloud-synced dashboard.",
    longDescription: "Study Tracker AJ is a full-stack, progressive learning portal designed to coordinate complex preparation pipelines for high-stakes Indian competitive exams. Progress syncs to the cloud automatically — check a chapter on your laptop, it's already checked on your phone. A built-in recommendation engine reads live completion data and tells you exactly what to focus on next based on exam priority and where you're weakest. Live countdown to exam day, Google sign-in, and a dashboard that shows the whole picture at once.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "Vanilla JavaScript",
      "Firebase Firestore",
      "Firebase Authentication",
      "HTML5 & CSS3 Variables",
      "iframe & postMessage API",
      "SVG Analytics Engines"
    ],
    role: "Full-Stack Software Engineer & Architect",
    timeline: "5 Months (Completed May 2026)",
    client: "Personal Exam Preparation / EdTech Focus",
    outcome: "Built a fully persistent progress engine actively used across multiple devices to manage 178 chapters with a zero-server pricing model and 100% automated layout/theme syncing.",
    problem: "Competitive exam aspirants managing dual prep pipelines face a daunting 178 modules across six subjects. Standard sheets or static checklists are disorganized, introduce extreme layout clutter, and fail to provide actionable, adaptive guidance on what topics to cover next.",
    solution: "Designed a multi-page portal where each subject exists as an independent iframe module. On interaction, a custom event bridge writes progress states to localStorage, which auth-sync.js monitors and updates on Firebase Firestore. Re-hydration is automated instantly upon login. A lightweight recommendations engine checks mathematical progress milestones, dynamically serving custom coaching alerts.",
    impactStats: [
      { label: "Syllabus Chapters Tracked", value: "178" },
      { label: "Academic Subjects", value: "06" },
      { label: "Server Infrastructure Cost", value: "$0" },
      { label: "Progress Hydration Rate", value: "100%" }
    ],
    featured: true,
    liveUrl: "https://study-tracker-aj.vercel.app",
    githubUrl: "https://github.com/Arpitj9974/Study-Tracker-AJ"
  },
  {
    id: "freshstamp",
    title: "FreshStamp",
    subtitle: "AI-Powered Household Expiry Tracker",
    description: "Expiry tracking for shopkeepers. Point the camera at a product — the date, brand, price, and category read themselves off the packaging.",
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
    role: "Lead Full-Stack & AI Systems Architect",
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
    description: "Every career maps to entrance exams, top colleges, eligibility rules, required traits, and where it leads next. Students get an AI evaluation of their fit.",
    longDescription: "Every career maps to entrance exams, top colleges, eligibility rules, required traits, and where it leads next. Students upload their marksheet and get an AI evaluation of their fit for that specific career. Flat-file JSON architecture — no database, no build step, deploys as static files anywhere.",
    year: "2026",
    category: "Web Apps",
    stack: [
      "Vanilla JavaScript",
      "JSON",
      "Claude API"
    ],
    role: "Lead Platform & UX Engineer",
    timeline: "3 Months (Completed June 2026)",
    client: "Indian High School Guidance Initiative",
    outcome: "Created an open-source, O(1) performance exploration portal delivering interactive maps of 225+ paths, 700+ exams, and 5k+ institutions with zero static page-load latency and 100% offline-tolerant bookmarks.",
    problem: "Indian Class 11-12 students face a complex, multi-tiered decision pipeline with scarce structured resources. Standard tools offer superficial summaries, lack concrete stream-to-college maps, and fail to provide personalized suitability evaluation based on actual academic credentials.",
    solution: "Engineered a zero-framework, dynamic page-routing engine mapping taxonomy folders through specialized JSON assets. Built a customized document ingestion engine using FileReader API to extract credentials from marksheets. This content dynamically feeds structured prompting payloads to Claude Sonnet to output comprehensive 5-dimensional candidate-role-fit reports.",
    impactStats: [
      { label: "Careers Mapped", value: "225" },
      { label: "Mapped Entrance Exams", value: "700+" },
      { label: "Colleges Referenced", value: "5,000+" },
      { label: "Design Themes Integrated", value: "14" }
    ],
    featured: true,
    liveUrl: "https://career-library-worksarthi.vercel.app",
    githubUrl: ""
  },
  {
    id: "work-sarthi",
    title: "Career Assessment Test - WSCAT",
    subtitle: "A psychometric engine that turns 60+ data points into a personalized career report.",
    description: "Combines RIASEC, Big Five, and Hofstede's cultural dimensions. Runs four parallel AI calls to build an 8–10 page report.",
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
    role: "Lead Architect & Cognitive Systems Engineer",
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
    featured: true,
    liveUrl: "https://work-sarthi.vercel.app",
    githubUrl: ""
  },
  {
    id: "arws-raw",
    title: "RAW",
    subtitle: "The Invisible HR Call Intelligence Layer",
    description: "HR staff were spending 30–60 minutes a day typing call logs into a spreadsheet. RAW does it invisibly.",
    longDescription: "Runs in the background, detects when a call ends, filters it by the company SIM, and pushes it to a Google Sheet in real time. Personal SIM calls never leave the phone — that boundary is enforced at two independent points in the code, by design. No internet? The call is stored locally and uploaded when the network returns. A four-layer duplicate-prevention system means the same call can never appear twice, even after a failed retry. The entire backend is a 133-line Google Apps Script — zero hosting cost, because the client had no infrastructure and no budget.",
    year: "2024",
    category: "Mobile",
    stack: [
      "Kotlin",
      "Room",
      "WorkManager",
      "Google Apps Script",
      "Google Sheets"
    ],
    role: "Lead Systems & Mobile Architect",
    timeline: "2 Months (Q3 2024)",
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
    featured: true,
    liveUrl: "",
    githubUrl: "https://github.com/Arpitj9974/ARWS-dialer"
  },
  {
    id: "farmer-connect",
    title: "FarmerConnect",
    subtitle: "AI-Powered Agricultural Direct-to-Consumer Cooperative Marketplace",
    description: "Indian farmers lose 30–40% of a crop's sale price to middlemen. FarmerConnect lets them sell direct.",
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
    role: "Full-Stack Engineer & AI Architect",
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
    id: "medicine-extraction",
    title: "Medicine Image Extraction",
    subtitle: "AI-Powered Pharmaceutical Data Digitization",
    description: "Gemini Vision pulls the medicine name, expiry, batch number, and price straight off the packaging — no manual transcription.",
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
    role: "Lead Systems & MLOps Architect",
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
    githubUrl: "https://github.com/Arpitj9974/Medicine-Image-Extraction"
  },
  {
    id: "ar-auagpt",
    title: "AR-AuAgPt",
    subtitle: "Precious Metals Real-Time Domestic Index Platform",
    description: "Import duty, AIDC, and GST layered in and benchmarked against IBJA rates. Five fallback data sources chained together so a price card is never blank.",
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
    role: "Lead Systems & Commodity Architect",
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
