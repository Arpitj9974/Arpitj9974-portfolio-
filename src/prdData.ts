export interface PRDSpec {
  projectId: string;
  docId: string;
  version: string;
  status: "SHIPPED & LIVE" | "IN PRODUCTION" | "ALPHA";
  title: string;
  author: string;
  targetUsers: string;
  lastUpdated: string;
  executiveSummary: string;
  rootCauseAnalysis: string[];
  primaryPersona: {
    name: string;
    role: string;
    context: string;
    jtbd: string;
  };
  requirements: {
    priority: "P0" | "P1" | "P2";
    title: string;
    spec: string;
    acceptanceCriteria: string;
  }[];
  dataArchitecture: {
    entities: { name: string; description: string; fields: string[] }[];
    syncStrategy: string;
  };
  edgeCases: {
    scenario: string;
    operationalRisk: string;
    systemResolution: string;
  }[];
  kpiMetrics: {
    label: string;
    metric: string;
    businessImpact: string;
  }[];
}

export const PRD_DATA: Record<string, PRDSpec> = {
  "jd-finance": {
    projectId: "jd-finance",
    docId: "PRD-FINOPS-001",
    version: "v4.0 (Live Infrastructure)",
    status: "SHIPPED & LIVE",
    title: "JD Finance — Lending Operations & Cashflow Reconciliation Infrastructure",
    author: "Arpit Jaiswal (Finance Operations Lead)",
    targetUsers: "Lending Executives, Field Collection Agents, Credit Partners, Borrowers",
    lastUpdated: "2026",
    executiveSummary: "End-to-end data infrastructure and daily cash reconciliation engine managing borrower loan lifecycles, amortized repayment schedules, and portfolio delinquency tracking across 4+ years of active lending operations.",
    rootCauseAnalysis: [
      "Fragmented paper registers and notebooks caused mathematical errors and 90-minute daily accounting close delays.",
      "Lack of real-time aging analysis masked early borrower distress, delaying recovery action until day 30+.",
      "Physical cash collections by field agents lacked an automated daily balance check against theoretical ledger dues."
    ],
    primaryPersona: {
      name: "Suresh Bhai",
      role: "Operations Partner & Lending Manager",
      context: "Responsible for underwriting micro-loans, verifying field agent collections, and balancing daily firm liquidity.",
      jtbd: "When field agents return with daily cash collections, I need instant verification against expected dues so that the cash ledger balances to the exact rupee in under 15 minutes."
    },
    requirements: [
      {
        priority: "P0",
        title: "Master Loan Ledger & Daily Amortization Engine",
        spec: "Relational data structure calculating exact interest accrual, principal reduction, and remaining dues per borrower account.",
        acceptanceCriteria: "Zero math discrepancy across varying repayment cycles (daily, weekly, monthly)."
      },
      {
        priority: "P0",
        title: "Daily Close & Cashflow Balancing Engine",
        spec: "Automated reconciliation formula comparing total physical cash collected against scheduled dues, highlighting discrepancies immediately.",
        acceptanceCriteria: "Produces a single closing audit metric; flags uncollected dues by agent and borrower."
      },
      {
        priority: "P1",
        title: "Delinquency Early Warning & Aging Matrix",
        spec: "Automated classification of accounts into Current, 1-3 Days Overdue, and Default Risk stages.",
        acceptanceCriteria: "Highlights overdue accounts on Day 3 of non-payment for proactive borrower outreach."
      },
      {
        priority: "P2",
        title: "Repayment Automation & Reminder Pipeline",
        spec: "Google Apps Script automation triggering daily collection summaries and scheduled WhatsApp borrower alerts.",
        acceptanceCriteria: "Eliminates manual notification phone calls by 60%."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "BorrowerPortfolio",
          description: "Core borrower KYC, principal disbursed, tenure, and repayment schedule",
          fields: ["borrowerId", "name", "principal", "interestRate", "tenureDays", "disbursementDate", "status"]
        },
        {
          name: "RepaymentLedger",
          description: "Atomic transactional log of all cash collections and receipts",
          fields: ["transactionId", "borrowerId", "collectedAmount", "collectionDate", "agentId", "receiptNumber"]
        },
        {
          name: "DailyReconciliationAudit",
          description: "Closing day summary balancing cash in hand vs scheduled dues",
          fields: ["auditDate", "expectedCollection", "actualCollected", "discrepancyDelta", "closedBy"]
        }
      ],
      syncStrategy: "Field collection inputs -> Instant formula reconciliation -> Master portfolio balance update."
    },
    edgeCases: [
      {
        scenario: "Borrower makes partial payment or extra prepayment",
        operationalRisk: "Interest calculation distortion or incorrect remaining balance.",
        systemResolution: "Dynamic amortization logic recalculates interest on remaining principal instantaneously."
      },
      {
        scenario: "Physical cash collected differs from receipt count",
        operationalRisk: "Cash theft or arithmetic error slipping past daily closing.",
        systemResolution: "Closing balance cell turns high-visibility red until delta is zeroed out and verified."
      }
    ],
    kpiMetrics: [
      { label: "Operational Continuity", metric: "4+ Years", businessImpact: "Still the firm's active operating system" },
      { label: "Daily Cash Balance", metric: "100%", businessImpact: "Zero unaccounted cash leakage" },
      { label: "Daily Closing Time", metric: "-80%", businessImpact: "Reduced from 90 mins to under 15 mins" },
      { label: "Software Infrastructure Cost", metric: "$0", businessImpact: "Zero ongoing SaaS licenses" }
    ]
  },
  vyosha: {
    projectId: "vyosha",
    docId: "PRD-FIN-001",
    version: "v1.2",
    status: "SHIPPED & LIVE",
    title: "Vyosha — Micro-Merchant Digital Ledger & Loan Amortization Engine",
    author: "Arpit Jaiswal (Product & FinOps)",
    targetUsers: "Micro-lenders, NBFC Field Agents, SME Merchants",
    lastUpdated: "Q1 2026",
    executiveSummary: "Daily lending operations in SME finance traditionally rely on physical paper ledgers or cellular-dependent apps. In wholesale markets with spotty connectivity, network drops cause lost collection records, manual duplicate ledger entries, and zero real-time amortization visibility for borrowers.",
    rootCauseAnalysis: [
      "Legacy mobile applications enforce synchronous client-server roundtrips, resulting in 4-8s white splash screens on 2G/3G networks.",
      "Field agents lack offline validation rules, causing balance discrepancies between borrower receipts and head-office spreadsheets.",
      "Borrowers lack instant transparency into prepayment interest savings, disincentivizing early settlements."
    ],
    primaryPersona: {
      name: "Ramesh Bhai",
      role: "SME Micro-Lender & Field Collector",
      context: "Manages daily repayments across 120 borrowers in Surat textile markets; operates in basement shops with poor cellular coverage.",
      jtbd: "When I collect daily cash installments on the market floor, I want instant local recording and immediate balance re-calculation without cellular lag, so that accounts reconcile with 100% integrity."
    },
    requirements: [
      {
        priority: "P0",
        title: "Zero-Latency Offline-First Transaction Engine",
        spec: "Local state persists immediately into IndexedDB/LocalStorage. Dispatches to Firestore queue with optimistic UI updates.",
        acceptanceCriteria: "Record creation completes in <50ms locally regardless of network connectivity state."
      },
      {
        priority: "P0",
        title: "Exact Monthly Amortization Engine",
        spec: "Client-side mathematical engine implementing EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1] with dynamic fraction normalization.",
        acceptanceCriteria: "100% calculation parity with standard banking amortization schedules down to the rupee."
      },
      {
        priority: "P0",
        title: "3-Day Proximity Delinquency Alert System",
        spec: "Normalized midnight boundaries (setHours(0,0,0,0)) calculate exact calendar delta to flag Overdue and Due Soon accounts.",
        acceptanceCriteria: "Zero false-positive overdue flags on settled or pending-same-day balances."
      },
      {
        priority: "P1",
        title: "Prepayment Schedule & Interest-Saved Simulator",
        spec: "Real-time comparison engine modeling regular EMI trajectory vs extra monthly prepayment trajectory.",
        acceptanceCriteria: "Instantly computes total interest saved and tenure reduction in months upon user slider adjustments."
      },
      {
        priority: "P1",
        title: "Client-Side HTML5 Canvas Receipt Compressor",
        spec: "Downscales raw 8MB-12MB phone camera receipt photos to <180KB compressed JPEG before cloud storage dispatch.",
        acceptanceCriteria: "Preserves legible timestamp & merchant signature while slashing upload bandwidth by 95%."
      },
      {
        priority: "P2",
        title: "One-Click PDF Statement Generator",
        spec: "Generates branded borrower passbook statements for export via WhatsApp / print.",
        acceptanceCriteria: "Formatted to standard A4 printable table with zero layout breakage."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "LoanAccount",
          description: "Core loan contract and terms",
          fields: ["id", "borrowerName", "principalAmount", "annualRatePct", "tenureMonths", "startDate", "status"]
        },
        {
          name: "RepaymentRecord",
          description: "Individual installment or prepayment ledger entry",
          fields: ["id", "loanId", "paymentDate", "amountPaid", "type (EMI|PREPAYMENT)", "receiptUrl", "syncStatus"]
        },
        {
          name: "AmortizationSchedule",
          description: "Computed monthly principal/interest schedule vector",
          fields: ["monthNumber", "principalPart", "interestPart", "remainingPrincipal"]
        }
      ],
      syncStrategy: "Optimistic local mutation -> IndexedDB event queue -> Background sync worker with exponential backoff on HTTP 200 ACK."
    },
    edgeCases: [
      {
        scenario: "Prepayment amount exceeds outstanding loan principal",
        operationalRisk: "Negative loan balances and accounting discrepancies.",
        systemResolution: "Engine automatically caps prepayment to principal balance and prorates final interest component."
      },
      {
        scenario: "Network drops midway through camera receipt upload",
        operationalRisk: "Lost payment verification proof for cash collections.",
        systemResolution: "Photo cached in local Base64 storage; background retry trigger fires upon window 'online' event."
      },
      {
        scenario: "Timezone boundary shift on month-end collection dates",
        operationalRisk: "False delinquency warnings triggered on valid payments.",
        systemResolution: "Dates strictly normalized to setHours(0,0,0,0) UTC delta before calculating overdue classification."
      }
    ],
    kpiMetrics: [
      {
        label: "Daily Reconciliation Time",
        metric: "Reduced from 45 min to <4 min",
        businessImpact: "Saves ~20 hours/month per field manager; eliminates end-of-day ledger typing."
      },
      {
        label: "Calculation Parity",
        metric: "100% Accuracy (0 Delta)",
        businessImpact: "Zero borrower disputes over rounding errors or early settlement calculations."
      },
      {
        label: "Bandwidth & Storage Overhead",
        metric: "95% Reduction in Payload",
        businessImpact: "Allows field agents to operate reliably on cellular connections without data caps."
      }
    ]
  },

  aspirantflow: {
    projectId: "aspirantflow",
    docId: "PRD-EDU-002",
    version: "v2.6.0",
    status: "SHIPPED & LIVE",
    title: "AspirantFlow (ArpitPrep Hub) — 101+ Multi-Exam Syllabus Tracker & Study Orchestrator",
    author: "Arpit Jaiswal (Product & Systems Architect)",
    targetUsers: "Aspirants targeting 101+ competitive exams across 15 master domains: Banking (SBI, IBPS, RBI, RRB), Civil Services (UPSC CSE, State PSCs), Defense (NDA, CDS, AFCAT), Engineering (JEE, GATE), Medical (NEET), Management (CAT, XAT), Law (CLAT), and Corporate Placements (TCS NQT, Infosys, Accenture)",
    lastUpdated: "Production v2.6.0",
    executiveSummary: "Aspirants preparing for competitive exams face severe syllabus fragmentation and repetitive study logging across overlapping recruitment cycles. AspirantFlow solves this operational dilemma with an enterprise-grade Progressive Web Application (PWA) featuring cross-exam syllabus deduplication ('study once, benefit everywhere'), specification-driven generic dashboards across 117 variants, 5000ms timeout-guarded cloud synchronization, multi-horizon study planning (ISO 8601), full-length mock test telemetry, and zero-flicker rendering (CLS 0.0) with zero server infrastructure costs.",
    rootCauseAnalysis: [
      "Syllabus Fragmentation & Redundant Logging: Core aptitude (Quant, Reasoning, English, GA) is repeated across multiple exams, forcing students to maintain disjointed records and duplicate study tracking.",
      "Unreliable Network Latency & Study Flow Interruption: EdTech platforms rely on heavy REST frameworks that stall or fail completely in basement libraries or intermittent network zones.",
      "Disconnection Between Long-Term Horizons and Daily Study Execution: Traditional to-do apps lack academic horizon scoping, failing to tie daily micro-tasks to 50-day sprints and exam countdown milestones.",
      "Maintenance Explosion with Bespoke Dashboards: Hardcoding individual interfaces for 100+ exams creates unmaintainable code sprawl without a unified schema-driven architecture."
    ],
    primaryPersona: {
      name: "Priya Sharma",
      role: "Multi-Exam Aspirant & Working Professional",
      context: "Preparing simultaneously for IBPS PO, SBI PO, and SSC CGL while managing a demanding work schedule.",
      jtbd: "When I complete high-yield Quant and Reasoning modules, I need that milestone automatically deduplicated across all my target exams, accessible 100% offline with zero latency, and synchronized to my secondary devices without data loss."
    },
    requirements: [
      {
        priority: "P0",
        title: "Cross-Exam Syllabus Deduplication Engine",
        spec: "Standardizes core competency namespaces (qt3_, rs3_, en_, cdf_) across all active exam tracks. Completing a shared topic in one exam automatically credits progress in intersecting exams.",
        acceptanceCriteria: "Toggling a shared chapter state updates progress across all intersecting exam dashboards and storage keys instantly."
      },
      {
        priority: "P0",
        title: "Specification-Driven Generic Dashboard Architecture (DASH_SPEC)",
        spec: "Generic dashboard runtime engine (dashboard-generic.js) powering 117 exam variant dashboards driven by declarative schema contracts (window.DASH_SPEC).",
        acceptanceCriteria: "Eliminates 30,000+ lines of duplicate dashboard code; adding a new exam variant requires only a schema config definition."
      },
      {
        priority: "P0",
        title: "Resilient Offline-First Bi-Directional Cloud Synchronization",
        spec: "Primary localStorage source of truth with background Firestore sync wrapped in a 5000ms Promise.race timeout circuit breaker and onSnapshot delta listener.",
        acceptanceCriteria: "Sub-16ms UI updates; automatic fallback to offline mode if network latency exceeds 5000ms without blocking navigation."
      },
      {
        priority: "P0",
        title: "4-State Micro-Mastery Progress Engine",
        spec: "Granular 4-state checkpointing: Not Started (0), In Progress (1), Revised Once (2), Mastered (3) with dynamic SVG stroke offset progress dials.",
        acceptanceCriteria: "Atomic state updates dispatched to local storage and parent frame containers via postMessage protocol."
      },
      {
        priority: "P1",
        title: "Multi-Horizon Adaptive Study Planner (AspirantPlanner)",
        spec: "Encapsulated planner engine supporting Daily (date-specific), Weekly (ISO 8601 calendar weeks), Monthly, and Yearly goals, plus multi-day recurring sprint countdowns.",
        acceptanceCriteria: "Syncs with epoch timestamp conflict resolution (todosUpdatedAt); binds exam remaining days directly to daily task queues."
      },
      {
        priority: "P1",
        title: "Full-Length Mock Test Analytics & Performance Engine",
        spec: "Practice mock logging module capturing test date, score, maximum marks, accuracy %, percentile, and qualitative revision notes with aggregate KPI averages.",
        acceptanceCriteria: "Real-time visualization of Latest Score, Best Score, and Cohort Average; synced to users/{uid}/mocks in Firestore."
      },
      {
        priority: "P1",
        title: "Zero-Flicker Layout & View State Initializer (CLS 0.0)",
        spec: "Synchronous head-level pre-render IIFE evaluating user state and URL parameters before DOM construction, toggling init-preptrack vs init-all-exams.",
        acceptanceCriteria: "0.0 Cumulative Layout Shift; eliminates theme flashes and view jumps upon page refresh."
      },
      {
        priority: "P2",
        title: "Role-Based Administrative Telemetry Dashboard",
        spec: "Dedicated admin control panel (admin.html) with database-level security rules whitelisting administrator emails for live cohort observability.",
        acceptanceCriteria: "Displays active learners, aggregate chapter completion distributions, and filterable telemetry tables; redirects unauthorized traffic."
      },
      {
        priority: "P2",
        title: "Global Command Palette (Ctrl+K) & Clean History Navigation",
        spec: "Keyboard-trapped omnibox search modal filtering 101+ exams with fuzzy matching; history.replaceState for in-page subject tab switches.",
        acceptanceCriteria: "Preserves standard browser back-button navigation without polluting history state."
      },
      {
        priority: "P2",
        title: "Full PWA Offline Architecture & Service Worker Lifecycle",
        spec: "Service worker (v58) implementing Network-First routing for HTML documents and Stale-While-Revalidate for 220+ static assets, data models, and fonts.",
        acceptanceCriteria: "100% functional offline; installable standalone PWA on desktop and mobile home screens."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "ExamSpec",
          description: "Top-level national examination profile and subject registry",
          fields: ["id", "code", "title", "domainCategory", "totalChapters", "targetDate", "subjectPrefixes", "schemaConfig"]
        },
        {
          name: "ChapterState",
          description: "Granular syllabus chapter state node",
          fields: ["key", "masteryState (0|1|2|3)", "subjectPrefix", "weightageScore", "lastUpdated"]
        },
        {
          name: "PlannerTask",
          description: "Multi-horizon study task item",
          fields: ["id", "horizon (daily|weekly|monthly|yearly)", "examKey", "title", "targetDate", "done", "createdAt"]
        },
        {
          name: "MockTestRecord",
          description: "Full-length exam practice score telemetry",
          fields: ["id", "examKey", "testDate", "score", "maxMarks", "accuracy", "percentile", "notes"]
        },
        {
          name: "UserProfileDocument",
          description: "Google Firestore cloud document schema at users/{uid}",
          fields: ["uid", "email", "activeExams", "targetDates", "progress", "todos", "todosUpdatedAt", "mocks", "streak"]
        }
      ],
      syncStrategy: "Offline-first localStorage source of truth with 5000ms circuit-breaker Firestore bi-directional sync, real-time onSnapshot listeners, and epoch timestamp conflict resolution."
    },
    edgeCases: [
      {
        scenario: "Intermittent network drop or Google API adblocker during cloud sync",
        operationalRisk: "UI freeze, unhandled promise rejection, or blocking loading spinner.",
        systemResolution: "runWithTimeout circuit breaker rejects at 5000ms, cleanly dropping into local offline mode without interrupting study flow."
      },
      {
        scenario: "Concurrent task modifications across multiple open devices",
        operationalRisk: "Stale offline state overwriting newer cloud modifications.",
        systemResolution: "Timestamp-based conflict resolution (todosUpdatedAt); higher epoch timestamp wins and hydrates local cache."
      },
      {
        scenario: "Exams sharing core prefixes with varying chapter counts",
        operationalRisk: "Out-of-bounds array reads and skewed completion metrics.",
        systemResolution: "Generic engine bounds iteration strictly to the declared totalChapters in that exam's schema config."
      },
      {
        scenario: "Timezone drift during multi-day recurring sprint creation",
        operationalRisk: "UTC midnight shift assigning tasks to incorrect local dates.",
        systemResolution: "toLocalDateString generates local ISO dates (YYYY-MM-DD), eliminating UTC timezone offset errors."
      }
    ],
    kpiMetrics: [
      {
        label: "Exam & Domain Coverage",
        metric: "101+ Exams across 15 Master Domains",
        businessImpact: "Comprehensive multi-exam hub powering Banking, UPSC, SSC, RRB, Engineering, Medical, MBA, Law, Defense, and Placements."
      },
      {
        label: "Codebase Efficiency",
        metric: "30,000+ Lines Duplication Eliminated",
        businessImpact: "Specification-driven generic dashboard controller (window.DASH_SPEC) unified 117 dashboards into a single 170-line engine."
      },
      {
        label: "Network Resilience & Latency",
        metric: "<16ms Local Updates & 5000ms Timeout Circuit",
        businessImpact: "Zero study flow interruptions with 100% offline uptime and instant feedback across low-connectivity environments."
      },
      {
        label: "Cloud Infrastructure Cost",
        metric: "$0 Server Cost (100% Serverless)",
        businessImpact: "Direct client-to-Firestore architecture and edge CDN hosting eliminates recurring server maintenance bills."
      }
    ]
  },

  findhar: {
    projectId: "findhar",
    docId: "PRD-FIN-003",
    version: "v1.0",
    status: "SHIPPED & LIVE",
    title: "FinDhar — Committed Cashflow & Obligation Intelligence System",
    author: "Arpit Jaiswal (Lead FinTech & Systems Architect)",
    targetUsers: "Salaried professionals, freelancers with volatile monthly income, multi-credit-line households managing overlapping EMIs",
    lastUpdated: "Q4 2026",
    executiveSummary: "Personal finance tools predominantly act as digital bank statement categorizers, showing where money went last month after financial damage has already occurred. In emerging, credit-heavy markets with UPI mandates and post-dated EMIs, households fail because contractual obligations quietly compound until committed cashflows exceed available liquidity. FinDhar inverts the paradigm by serving as a forward-looking committed cashflow and obligation engine, projecting contractual burn across 12-to-60 month timeline horizons with deterministic precision.",
    rootCauseAnalysis: [
      "Retrospective expense tracking only alerts users after a cashflow deficit or overdraft occurs, providing zero predictive early warning.",
      "Contractual liabilities (reducing-balance loans, no-cost EMIs, utility mandates, insurance premiums) are fragmented across disparate bank apps without unified multi-year amortization visualization.",
      "Native calendar rollover traps (e.g., February 31 rolling into March 3) create false delinquency notifications and corrupted forward projections."
    ],
    primaryPersona: {
      name: "Aditya Varma",
      role: "Senior Tech Lead & Home Loan Borrower",
      context: "Manages a ₹45L home loan, overlapping consumer electronics EMIs, SIPs, and school fee mandates across multiple credit cards and bank accounts.",
      jtbd: "When I plan major discretionary purchases or consider new credit commitments, I want to see my exact committed contractual outflow for the next 12 to 36 months, so that I never breach my debt-to-income safety limits or deplete emergency savings."
    },
    requirements: [
      {
        priority: "P0",
        title: "Forward-Looking Cashflow Waterfall & Run-Rate Engine",
        spec: "Pure mathematical calculation engine projecting 12-to-60 month non-discretionary commitments across variable cadences (MONTHLY, QUARTERLY, BI_WEEKLY, ANNUALLY) with dynamic bounding ranges.",
        acceptanceCriteria: "Calculates total committed outflow and annualized run-rate in <2ms with zero UI blocking or network roundtrips."
      },
      {
        priority: "P0",
        title: "Exact-Day Compound Amortization Engine",
        spec: "Client-side mathematical amortization implementing reducing-balance compound formula EMI = P * r * (1+r)^n / ((1+r)^n - 1) and flat rate schedules with No-Cost EMI discount handling.",
        acceptanceCriteria: "100% calculation parity with institutional bank loan schedules down to the rupee, automatically deducting decreasing interest from future projections."
      },
      {
        priority: "P0",
        title: "Non-Destructive 10-Second Transactional Undo Buffer",
        spec: "Optimistic UI mutations coupled with a staged 10,000ms memory buffer for settlements and deletions before committing permanent Firestore batch transactions.",
        acceptanceCriteria: "Zero modal confirmation fatigue; users can revert accidental mutations in 1-click; browser unload hook flushes pending buffer."
      },
      {
        priority: "P1",
        title: "Credit Card Blocked Limit & Liquidity Radar",
        spec: "Tracks total credit card limit, aggregate blocked EMI principal liabilities, and real available revolving credit month-by-month with strict PCI-DSS validation rejecting 13-19 digit PAN inputs.",
        acceptanceCriteria: "Accurately decrements blocked limit as monthly installments settle; strictly enforces 4-digit card masks only."
      },
      {
        priority: "P1",
        title: "Deterministic Calendar Month-End Clamping (Cycle Drift Guard)",
        spec: "Dynamic date normalizer evaluating target month boundaries via new Date(year, monthIndex + 1, 0).getDate() and clamping scheduled due dates via Math.min(dueDayOfMonth, daysInMonth).",
        acceptanceCriteria: "Obligations due on the 29th, 30th, or 31st reliably execute on February 28/29 without rolling over into March."
      },
      {
        priority: "P1",
        title: "Air-Gapped Serverless Gemini 2.0 Flash Multimodal Receipt OCR",
        spec: "Serverless 2nd Gen Cloud Functions invoking Gemini 2.0 Flash with Secret Manager API key isolation and strict Zod/JSON schema enforcement.",
        acceptanceCriteria: "Extracts structured obligation fields (name, amount, cadence, dueDay) from raw text or receipt images in ~650ms with 0 client key leaks."
      },
      {
        priority: "P2",
        title: "Sovereign Offline-First Workbox PWA & Zero-Cost PDF Print Engine",
        spec: "Workbox service worker caching app shell and static assets with CacheFirst, dynamic routes with NetworkFirst, and native browser print window generator.",
        acceptanceCriteria: "Full offline functionality with clear sync status indicators; zero heavy third-party PDF dependencies saving >300 kB bundle size."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "Commitment",
          description: "Contractual recurring or amortized financial liability",
          fields: ["id", "name", "amount", "cadence", "dueDayOfMonth", "type (LOAN|EMI|MANDATE|SUBSCRIPTION)", "principalAmount", "interestRate", "installmentCount", "status"]
        },
        {
          name: "PaymentRecord",
          description: "Immutable transaction settlement ledger entry",
          fields: ["id", "commitmentId", "paymentDate", "actualPaidAmount", "referenceNumber", "status (PLANNED|PAID|PREPAID|SKIPPED)"]
        },
        {
          name: "PaymentSource",
          description: "Masked payment instrument or credit card line",
          fields: ["id", "name", "type (CREDIT_CARD|BANK_ACCOUNT|UPI)", "last4", "creditLimit", "blockedAmount", "expiry"]
        },
        {
          name: "CashflowWaterfallInterval",
          description: "Computed monthly projection horizon",
          fields: ["monthYear", "confirmedAmount", "estimatedAmount", "totalCommitted", "activeCommitmentsCount", "terminatingDebtAmount"]
        }
      ],
      syncStrategy: "Optimistic React state update -> Staged 10-second memory undo window -> Cloud Firestore batch mutation (/users/{uid}/*) with offline Workbox IndexedDB sync."
    },
    edgeCases: [
      {
        scenario: "Obligation scheduled on the 31st falls in February or 30-day month",
        operationalRisk: "Native JS Date rolls into March 3rd, corrupting monthly cashflow totals and triggering false overdue alerts.",
        systemResolution: "Engine clamps due date to month-end: Math.min(commitment.dueDayOfMonth, new Date(year, monthIndex + 1, 0).getDate())."
      },
      {
        scenario: "Firestore compound queries fail with missing composite index error",
        operationalRisk: "Runtime application crashes when sorting payments by date within a specific commitment.",
        systemResolution: "Replaced compound Firestore queries with single-field equality filters and offloaded sorting to deterministic client in-memory sort."
      },
      {
        scenario: "Firestore null values fail Zod runtime schema optional validation",
        operationalRisk: "Zod rejects null on optional fields with Expected number, received null, crashing commitment editing and settlement.",
        systemResolution: "Engineered custom Zod preprocessor opt() converting null to undefined before schema validation."
      },
      {
        scenario: "User enters complete 16-digit card number on payment source form",
        operationalRisk: "PCI-DSS compliance violation and storage of unencrypted sensitive cardholder data.",
        systemResolution: "Zod regex /^\\d{13,19}$/ explicitly rejects full PAN inputs; accepts only 4-digit last4 masks."
      },
      {
        scenario: "Browser tab closed or refreshed during active 10-second undo countdown",
        operationalRisk: "Uncommitted deletion in memory buffer lost, causing state mismatch with Firestore database.",
        systemResolution: "Window 'beforeunload' event listener immediately flushes and commits all pending buffer transactions to Firestore."
      }
    ],
    kpiMetrics: [
      {
        label: "Cashflow Deficit Blindspots",
        metric: "100% Elimination via 12-60M Horizon",
        businessImpact: "Warns users months in advance before high-commitment intervals breach liquidity thresholds."
      },
      {
        label: "Amortization Parity",
        metric: "100% Rupee Parity (0 Delta)",
        businessImpact: "Zero variance with institutional banking schedules across reducing balance and flat rate loans."
      },
      {
        label: "Client Security Posture",
        metric: "0 Leaked Secrets / A+ Security Grade",
        businessImpact: "Air-gapped Cloud Functions isolate Gemini API keys with Google Cloud Secret Manager."
      }
    ]
  },

  "arws-raw": {
    projectId: "arws-raw",
    docId: "PRD-HR-004",
    version: "v1.4",
    status: "SHIPPED & LIVE",
    title: "RAW (ARWS Dialer) — Invisible Android Call Intelligence & Zero-Touch Ingestion",
    author: "Arpit Jaiswal (Product & Systems Architect)",
    targetUsers: "SME Recruitment Teams, Headhunters, HR Operations Leads, Dual-SIM Field Executives",
    lastUpdated: "2026",
    executiveSummary: "In fast-paced SME recruitment, staff make 40–80 candidate calls daily across dual-SIM Android smartphones. Manually typing call durations and timestamps into spreadsheets consumes 45–60 minutes of overtime every evening and causes 15–25% record loss from memory fatigue. RAW solves this with an invisible, battery-optimized Android background service that detects call completion, strictly isolates personal SIM calls on hardware boundaries, buffers records locally via Room SQLite, and syncs directly to Google Sheets in real-time with zero server infrastructure costs.",
    rootCauseAnalysis: [
      "Manual Logging Overhead: Recruiter fatigue from spending 45-60 minutes typing call data after work hours, eroding focus on core candidate sourcing.",
      "Data Loss & Interaction Amnesia: Call details recorded hours after conversations suffer from forgotten durations, misattributed phone numbers, and missed follow-ups.",
      "Dual-SIM Privacy Leaks: Generic call tracking tools indiscriminately upload all calls, violating recruiter personal privacy on personal SIM lines.",
      "Zero Infrastructure Budget: Early-stage SME recruitment agencies lack budgets for heavy enterprise ATS software licenses like Bullhorn or Zoho."
    ],
    primaryPersona: {
      name: "Kavita Patel",
      role: "Senior Technical Recruiter",
      context: "Manages active candidate pipelines across 15 engineering openings using a dual-SIM company-issued smartphone.",
      jtbd: "When I complete a candidate screening call on my company SIM, I need the call timestamp, duration, and status immediately logged into our team's Google Sheet without opening an app, while guaranteeing my personal SIM calls remain strictly untracked."
    },
    requirements: [
      {
        priority: "P0",
        title: "Hardware-Level Dual-SIM SIM Boundary Gatekeeper",
        spec: "PhoneStateListener inspects Android subscriptionId upon call completion, enforcing strict cryptographic filtering to verify company SIM ICCID before log creation.",
        acceptanceCriteria: "100% guarantee that personal SIM calls never trigger log entries or network requests."
      },
      {
        priority: "P0",
        title: "Local Room SQLite Transactional Buffer",
        spec: "Foreground service writes raw call records to a local SQLite table before dispatching network calls, with a 1,500ms delay allowing the media service to flush CallLog.Calls.",
        acceptanceCriteria: "Zero log loss during network drops, airplane mode, or basement interview environments."
      },
      {
        priority: "P0",
        title: "Zero-Cost Google Apps Script Ingestion Webhook",
        spec: "133-line Google Apps Script Web App acting as a serverless REST ingestion endpoint appending verified JSON payloads directly to target Google Sheet tabs.",
        acceptanceCriteria: "Atomic row appends execute in <850ms with $0 monthly cloud hosting cost."
      },
      {
        priority: "P1",
        title: "Multi-Layered Deduplication Architecture",
        spec: "Generates an MD5 signature from (phoneNumber + timestamp + durationSeconds) stored locally and verified server-side before sheet appending.",
        acceptanceCriteria: "0.00% duplicate row insertion rate, even upon network retries or device reboots."
      },
      {
        priority: "P1",
        title: "WorkManager Periodic Offline Backfill Engine",
        spec: "Clock-boundary-aligned background worker polling pending un-synced Room records and flushing them upon network reconnection with exponential backoff.",
        acceptanceCriteria: "All offline queued records successfully reach the Google Sheet within 60 seconds of network restoration."
      },
      {
        priority: "P2",
        title: "Low-Power Battery-Optimized Service Architecture",
        spec: "Event-driven architecture activating only during CallLog state changes without continuous GPS or CPU polling.",
        acceptanceCriteria: "Consumes <1.2% total daily battery life across an 8-hour recruitment shift."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "CallRecordEntity",
          description: "Local Room SQLite table tracking captured official calls",
          fields: ["id", "phoneNumber", "callType (INCOMING|OUTGOING|MISSED)", "timestamp", "durationSeconds", "simSubscriptionId", "syncStatus", "hashSignature"]
        },
        {
          name: "SIMFilterRule",
          description: "Hardware configuration defining authorized corporate SIM parameters",
          fields: ["slotIndex", "carrierName", "subscriptionId", "isCompanySIM", "autoSyncEnabled"]
        },
        {
          name: "GoogleSheetIngestionRow",
          description: "Structured row appended to the master recruitment spreadsheet",
          fields: ["recordId", "recruiterName", "candidateNumber", "callDirection", "durationFormatted", "callDate", "callTime", "verifiedStatus"]
        }
      ],
      syncStrategy: "PhoneStateListener event -> 1500ms Media Flush Buffer -> Dual-SIM Gatekeeper -> Room SQLite Local Commit -> Async HTTP POST to Apps Script -> WorkManager retry on network failure."
    },
    edgeCases: [
      {
        scenario: "Device abruptly restarted or powered off during an active recruitment call",
        operationalRisk: "Uncommitted call in memory lost before database write.",
        systemResolution: "Boot-completed broadcast receiver queries Android CallLog.Calls for recent missed un-synced company SIM calls and hydrates Room."
      },
      {
        scenario: "Recruiter physically swaps SIM cards between slot 1 and slot 2 in device tray",
        operationalRisk: "Slot-based filtering logs personal calls to company spreadsheet.",
        systemResolution: "Engine filters by hardware subscriptionId (ICCID) rather than physical slotIndex, ensuring filter integrity regardless of tray position."
      },
      {
        scenario: "Google Apps Script cold start latency exceeds 3000ms",
        operationalRisk: "UI freeze or ANR (Application Not Responding) crash on recruiter device.",
        systemResolution: "Background HTTP client operates on Dispatchers.IO with a 5000ms timeout; failed requests cleanly remain in Room for WorkManager retry."
      }
    ],
    kpiMetrics: [
      { label: "Daily Administrative Overhead", metric: "-60 Minutes Daily", businessImpact: "Completely eliminates end-of-day manual spreadsheet typing for recruiters" },
      { label: "Call Capture Accuracy", metric: "100% Official Logs Captured", businessImpact: "Zero interaction amnesia across client and candidate hiring pipelines" },
      { label: "Duplicate Record Rate", metric: "0.00% Duplicates", businessImpact: "Clean, deduplicated spreadsheet rows verified by cryptographic signatures" },
      { label: "Infrastructure Cost", metric: "$0 Server Cost", businessImpact: "100% serverless Google Apps Script eliminates enterprise ATS subscription bills" }
    ]
  },

  "freshstamp": {
    projectId: "freshstamp",
    docId: "PRD-FMCG-005",
    version: "v2.0",
    status: "SHIPPED & LIVE",
    title: "FreshStamp — Optical Packaging Scanner & FIFO Household Expiry Prevention Engine",
    author: "Arpit Jaiswal (Product & Systems Architect)",
    targetUsers: "Budget-Conscious Households, Elderly Chronic Prescription Users, Local Kirana Grocers",
    lastUpdated: "2026",
    executiveSummary: "Indian households and local kirana grocers discard over ₹50,000 worth of groceries, cosmetics, and prescription medicines annually because expiration dates are stamped in tiny, low-contrast dot-matrix fonts and forgotten in cupboards. Existing inventory apps suffer from 95% abandonment because users refuse to manually type product names and dates. FreshStamp eliminates typing entirely with an optical camera scanner that extracts brand, category, batch, and expiry date in under 3 seconds, pairing it with an offline-first derived FIFO batch engine that alerts users before food or medicine spoils.",
    rootCauseAnalysis: [
      "Micro-Font Expiration Opacity: Dates stamped on crimped seals, jar bottoms, and blister foils are unreadable without active magnification.",
      "High Onboarding Keyboard Friction: Manual typing apps require 45–90 seconds per grocery item, causing immediate user abandonment.",
      "Lack of FIFO Batch Awareness: Households restock newer groceries in front of older items on shelves, allowing older perishables to expire unnoticed."
    ],
    primaryPersona: {
      name: "Meena Shah",
      role: "Household Manager & Elder Caregiver",
      context: "Manages weekly groceries for a family of 5 while tracking 8 daily prescription medicines for elderly parents.",
      jtbd: "When I unpack newly bought groceries and medicines, I need to point my phone camera at the packaging and have the expiry dates instantly recognized and logged into a FIFO alert list in seconds, without typing."
    },
    requirements: [
      {
        priority: "P0",
        title: "Sub-3s Optical Packaging Ingestion Pipeline",
        spec: "Client camera captures packaging image, passing it to an optimized Gemini Vision endpoint that returns structured brand, category, and normalized ISO expiry date.",
        acceptanceCriteria: "Extraction completes in <3000ms with zero manual keyboard data entry."
      },
      {
        priority: "P0",
        title: "Local-First Dual-Channel Persistence",
        spec: "Instant write to localStorage with optimistic UI updates, mirrored asynchronously to Firebase Firestore upon user authentication.",
        acceptanceCriteria: "100% functional for guest users; zero data loss during network dropouts."
      },
      {
        priority: "P0",
        title: "Zero-DB Derived FIFO Batch-Tracking Engine",
        spec: "Pure client-side reducer comparing new scans against existing inventory by product name, generating chronological batch ranks and high-visibility 'USE FIRST' visual stamps.",
        acceptanceCriteria: "Automatically surfaces older-expiring batches at the top of the pantry list."
      },
      {
        priority: "P1",
        title: "Multi-Threshold Expiration Alerts",
        spec: "Calculates countdown days using midnight-normalized boundaries; triggers color-coded status badges for Expired (<0d), Critical (1–7d), and Upcoming (8–30d).",
        acceptanceCriteria: "Zero false-positive alarms on valid shelf-life items."
      },
      {
        priority: "P1",
        title: "Financial Waste Telemetry Dashboard",
        spec: "Tracks item purchase price and aggregates cumulative rupees saved by consuming products before expiration thresholds.",
        acceptanceCriteria: "Visualizes cumulative waste savings and category-wise risk breakdowns."
      },
      {
        priority: "P2",
        title: "Offline-First PWA Asset Caching",
        spec: "Service worker caches app shell, vision assets, and icons for instant offline cold start.",
        acceptanceCriteria: "Sub-200ms cold boot from home screen icon."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "PantryItem",
          description: "Core household consumable product record",
          fields: ["id", "name", "category", "brand", "currentQuantity", "unit", "storageLocation", "createdAt"]
        },
        {
          name: "BatchStock",
          description: "Individual product batch with distinct expiration parameters",
          fields: ["id", "itemId", "batchNumber", "expiryDate", "purchasePrice", "fifoRank", "isOpened", "status"]
        },
        {
          name: "WasteMetric",
          description: "Financial telemetry tracking saved vs expired monetary value",
          fields: ["id", "itemId", "batchId", "itemValueINR", "savedStatus", "resolvedDate"]
        }
      ],
      syncStrategy: "Camera capture -> Local OCR/Vision API -> Optimistic localStorage write -> Firebase Firestore mirror with offline PWA Workbox cache."
    },
    edgeCases: [
      {
        scenario: "Faded or dot-matrix printed expiration date on curved bottle surface",
        operationalRisk: "OCR fails to extract reliable date, leaving field blank.",
        systemResolution: "Client prompts 1-tap calendar picker with smart pre-filled default based on average category shelf-life."
      },
      {
        scenario: "Offline scanning in basement grocery store or pantry without signal",
        operationalRisk: "Network failure blocking receipt or packaging logging.",
        systemResolution: "PWA caches captured photo locally in IndexedDB; dispatches extraction queue automatically when connectivity returns."
      },
      {
        scenario: "Identical brand items scanned with two different expiration dates",
        operationalRisk: "Inventory overwrites earlier batch with newer batch data.",
        systemResolution: "Derived FIFO engine splits item into distinct batches, applying urgent 'USE FIRST' tag to the earlier-expiring product."
      }
    ],
    kpiMetrics: [
      { label: "Annual Household Savings", metric: "₹50,000+ Saved/Yr", businessImpact: "Eliminates preventable perishable food and expensive prescription medicine waste" },
      { label: "Scan Ingestion Speed", metric: "<3 Seconds", businessImpact: "Zero manual keyboard friction drives daily pantry logging compliance" },
      { label: "Offline Availability", metric: "100% PWA Availability", businessImpact: "Works reliably in basement kitchens and grocery aisles with zero network drops" },
      { label: "Spoilage Prevention", metric: "35% Spoilage Reduction", businessImpact: "Derived FIFO batch logic ensures older inventory is prioritized for consumption" }
    ]
  },

  "medicine-extraction": {
    projectId: "medicine-extraction",
    docId: "PRD-PHARMA-006",
    version: "v1.1",
    status: "SHIPPED & LIVE",
    title: "Medicine Image Extraction — Pharmaceutical Packaging Optical Digitizer & Pharmacopoeia Ingestion Engine",
    author: "Arpit Jaiswal (Product & Systems Architect)",
    targetUsers: "Retail Pharmacy Chemists, Pharmaceutical Stockists, Hospital Dispensaries, Warehouse Stock Keepers",
    lastUpdated: "2026",
    executiveSummary: "Retail pharmacies and pharmaceutical distributors process hundreds of incoming medicine boxes daily, manually typing complex alphanumeric batch numbers, expiration dates, and Maximum Retail Prices (MRPs) into legacy inventory software. This manual entry leads to keyboard transcription errors (such as mistaking '0' for 'O' or '8' for 'B'), resulting in failed drug regulatory audits and expired medicine dispensation. Medicine Image Extraction provides a decoupled, three-tier optical extraction pipeline that converts packaging photos into verified database records in under 5 seconds, maintaining audit compliance and zero client credential leakage.",
    rootCauseAnalysis: [
      "Manual Alphanumeric Transcription Fatigue: Typing 10-digit batch codes and expiry dates for 200+ medicine boxes daily causes high error rates.",
      "Regulatory Drug Audit Compliance Risks: Alphanumeric mismatches between invoices and physical stock lead to regulatory penalties and stock lockups.",
      "Monolithic System Fragility: Standard inventory tools crash completely when database connections stall, halting entire retail billing counters."
    ],
    primaryPersona: {
      name: "Rajesh Vora",
      role: "Wholesale Pharmaceutical Distributor & Retail Chemist",
      context: "Manages inward inventory across 450+ SKUs daily; operates under strict CDSCO drug inventory auditing regulations.",
      jtbd: "When incoming crates of medicine arrive, I need my staff to photograph the box labels and have batch numbers, expiry dates, and MRPs instantly verified and ingested into our database in seconds, without typing mistakes."
    },
    requirements: [
      {
        priority: "P0",
        title: "Decoupled Three-Tier Polyglot Microservices",
        spec: "Separates optical extraction (FastAPI) from data persistence (Node.js/MongoDB) and client interface (React), allowing independent scaling and fault isolation.",
        acceptanceCriteria: "Extraction continues to function even during database maintenance or network sync delays."
      },
      {
        priority: "P0",
        title: "Strict Pydantic JSON Schema Validation",
        spec: "FastAPI enforces structured validation schemas for regulatory medicine data: Brand Name, Generic Composition, Batch Number, Expiry Date, and MRP.",
        acceptanceCriteria: "Zero untyped or corrupted data writes; automatically rejects malformed OCR outputs."
      },
      {
        priority: "P0",
        title: "Air-Gapped Credential Gateway",
        spec: "Client uploads photos via server-side proxy; API secrets reside strictly inside server environment variables.",
        acceptanceCriteria: "0 API keys or sensitive credentials exposed on client bundle."
      },
      {
        priority: "P1",
        title: "Graceful Database Degradation Mode",
        spec: "If MongoDB experiences downtime, extraction engine outputs JSON directly to the client screen with verification badges, queueing database write upon recovery.",
        acceptanceCriteria: "Zero disruption to pharmacy counter stock intake."
      },
      {
        priority: "P1",
        title: "3-Tier Multi-Stage File Validation",
        spec: "Validates MIME types and enforces <5MB payload limits across Client, Multer middleware, and FastAPI request inspectors.",
        acceptanceCriteria: "Rejects oversized or corrupt image files with actionable feedback in <100ms."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "MedicineRecord",
          description: "Regulatory pharmaceutical inventory item",
          fields: ["id", "brandName", "genericComposition", "batchNumber", "expiryDate", "mrp", "manufacturer", "verified"]
        },
        {
          name: "ExtractionSession",
          description: "Optical processing session metadata",
          fields: ["sessionId", "rawImageUrl", "latencyMs", "completenessScore", "serviceStatus", "timestamp"]
        },
        {
          name: "AuditLog",
          description: "Regulatory tracking of verified packaging extractions",
          fields: ["logId", "medicineId", "originalBatch", "confirmedBatch", "auditedBy", "auditTimestamp"]
        }
      ],
      syncStrategy: "Client image upload -> Multer validation -> FastAPI Vision processing with Pydantic validation -> MongoDB write with graceful offline degradation fallback."
    },
    edgeCases: [
      {
        scenario: "Foil blister packaging reflecting camera glare directly over the batch code",
        operationalRisk: "Incomplete optical extraction leading to missing batch numbers.",
        systemResolution: "Image normalization adjusts gamma curves; confidence score tags uncertain characters for 1-tap chemist confirmation."
      },
      {
        scenario: "Database server maintenance during peak morning delivery hours",
        operationalRisk: "Failed database writes halting shipment intake.",
        systemResolution: "Extraction service outputs structured JSON payload directly to the client session with offline export option."
      },
      {
        scenario: "Medicine packaging displays dual dates (Manufacturing vs Expiry)",
        operationalRisk: "Manufacturing date erroneously recorded as expiration date.",
        systemResolution: "Pydantic validator inspects prefix tokens ('MFG', 'EXP', 'B.No') to strictly bind correct dates."
      }
    ],
    kpiMetrics: [
      { label: "Extraction Turnaround", metric: "<5 Seconds per Package", businessImpact: "Over 80% time saved compared to manual keyboard data entry" },
      { label: "Regulatory Audit Parity", metric: "0 Transcription Mismatches", businessImpact: "Eliminates alphanumeric typos in drug batch and expiration records" },
      { label: "Client Security Grade", metric: "0 Leaked Credentials", businessImpact: "Strict server-side proxy isolation keeps API secrets air-gapped" },
      { label: "Operational Resilience", metric: "100% Extraction Uptime", businessImpact: "Decoupled microservice architecture ensures optical ingestion never freezes" }
    ]
  },

  "farmer-connect": {
    projectId: "farmer-connect",
    docId: "PRD-AGRI-007",
    version: "v1.3",
    status: "SHIPPED & LIVE",
    title: "FarmerConnect — Direct Agricultural Cooperative Marketplace & Concurrency-Safe Auction Engine",
    author: "Arpit Jaiswal (Product & Systems Architect)",
    targetUsers: "Smallholder Farmers, Rural Agricultural Cooperatives, Commercial Bulk Buyers, Food Processors",
    lastUpdated: "2026",
    executiveSummary: "Smallholder farmers in India lose up to 30–40% of their crop value to cartelized commission middlemen in physical wholesale mandis due to price opacity, auction fixing, and delayed payments. Traditional agri-apps suffer from high latency and concurrency race conditions during live harvest bidding, where simultaneous buyer bids collide. FarmerConnect eliminates intermediary markups by establishing a direct-to-buyer digital marketplace featuring a concurrency-safe auction engine backed by PostgreSQL row-level locks, hybrid 24-hour cached government Mandi benchmark prices (data.gov.in), and a resilient 3-provider multilingual advisory cascade in Gujarati, Hindi, and English.",
    rootCauseAnalysis: [
      "Mandi Cartelization & Commission Leakage: Middlemen absorb up to 40% of farmer margins through hidden grading deductions and auction cartels.",
      "Price Asymmetry & Information Blackout: Farmers lack real-time visibility into official Minimum Support Prices (MSP) and neighboring APMC rates before harvesting.",
      "Auction Concurrency Race Conditions: Standard digital auction portals lack database locking, allowing multiple buyers bidding in the same millisecond to corrupt transaction states."
    ],
    primaryPersona: {
      name: "Bhavesh Patel",
      role: "Cotton & Groundnut Cooperative Farmer",
      context: "Farms 12 acres in Saurashtra, Gujarat; traditionally compelled to sell harvest to local APMC mandi middlemen at discounted rates.",
      jtbd: "When my crop is harvested, I need to check live government benchmark prices in Gujarati, list my lot for direct competitive bidding, and accept verified buyer bids without losing 30% margin to mandi middlemen."
    },
    requirements: [
      {
        priority: "P0",
        title: "Concurrency-Safe Auction Bidding Engine",
        spec: "PostgreSQL transactional row-level lock (SELECT ... FOR UPDATE) serializes incoming bids, verifying bid > highestBid before committing transaction.",
        acceptanceCriteria: "Zero race condition collisions or duplicate winning bids during peak auction milliseconds."
      },
      {
        priority: "P0",
        title: "Hybrid 24-Hour Cached Mandi Benchmark Feed",
        spec: "Integrates official data.gov.in Agmarknet API; warms a 24-hour local cache to serve instant domestic rates by commodity and state.",
        acceptanceCriteria: "100% price feed availability even when government API servers suffer outages."
      },
      {
        priority: "P0",
        title: "Multi-Provider AI Advisory Cascade (Krishi Sahayak)",
        spec: "3-tier automatic failover cascade routing queries across OpenRouter -> Gemini + Search Grounding -> Groq Llama 3.3 for crop advisory and MSP calculations.",
        acceptanceCriteria: "Advisory assistant remains active with <1.5s latency even during individual provider downtime."
      },
      {
        priority: "P1",
        title: "Trilingual Localization & Accessibility",
        spec: "Full system UI and advisory support in Gujarati, Hindi, and English tailored for rural agricultural operators.",
        acceptanceCriteria: "Zero English-only dead ends; accessible navigation for non-English speakers."
      },
      {
        priority: "P1",
        title: "7-Tier Security Throttling & Bot Protection",
        spec: "Rate limiting and token buckets guarding auction endpoints against automated bot bidding and scrapers.",
        acceptanceCriteria: "Protects farmer auctions from artificial price manipulation."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "CropListing",
          description: "Farmer harvest lot offered for sale or auction",
          fields: ["id", "farmerId", "cropName", "variety", "quantityQuintals", "basePriceINR", "auctionType", "status"]
        },
        {
          name: "AuctionBid",
          description: "Atomic transactional bid placed by verified buyer",
          fields: ["id", "listingId", "buyerId", "bidAmountINR", "bidTimestamp", "isWinningBid", "lockVersion"]
        },
        {
          name: "MandiPriceCache",
          description: "Cached APMC benchmark commodity pricing feed",
          fields: ["apmcCode", "commodity", "minPrice", "maxPrice", "modalPrice", "arrivalDate", "lastFetched"]
        },
        {
          name: "AdvisoryQuery",
          description: "Multilingual farmer advisory interaction log",
          fields: ["queryId", "farmerId", "language", "intentCategory", "providerUsed", "responseText"]
        }
      ],
      syncStrategy: "Supabase PostgreSQL row-level transactional lock -> Realtime WebSocket broadcast -> 24h cached Agmarknet API sync -> Multi-provider AI fallback loop."
    },
    edgeCases: [
      {
        scenario: "Two bulk buyers place the identical winning bid in the exact same millisecond",
        operationalRisk: "Dual winner conflict and split contract failure.",
        systemResolution: "PostgreSQL SELECT FOR UPDATE locks the row; the first transaction commits and increments winning bid, immediately rejecting the second."
      },
      {
        scenario: "Official government data.gov.in server suffers weekend downtime",
        operationalRisk: "Mandi price radar displays blank screens to farmers.",
        systemResolution: "24-hour hybrid caching layer serves the last-verified APMC rates with a clear 'Cached Benchmark' timestamp badge."
      },
      {
        scenario: "Spotty 2G mobile internet in rural fields during active bidding",
        operationalRisk: "Buyer bid confirmation stalls or drops.",
        systemResolution: "Optimistic UI state with socket auto-reconnection and exponential backoff ensures bids persist without duplication."
      }
    ],
    kpiMetrics: [
      { label: "Farmer Margin Recovery", metric: "30–40% Middleman Fees Saved", businessImpact: "Direct matchmaking eliminates cartelized intermediary commissions" },
      { label: "Auction Concurrency Parity", metric: "0 Bid Collisions", businessImpact: "Guaranteed transaction serialization via PostgreSQL row-level locks" },
      { label: "Mandi Price Feed Availability", metric: "100% Benchmark Uptime", businessImpact: "24-hour hybrid caching keeps market intelligence accessible during API outages" },
      { label: "Advisory Cascade Uptime", metric: "99.9% Advisory Uptime", businessImpact: "3-tier automated failover prevents system blackout during crop season" }
    ]
  },
  "career-library": {
    projectId: "career-library",
    docId: "PRD-EDTECH-002",
    version: "v2.0 (Shipped & Live)",
    status: "SHIPPED & LIVE",
    title: "Career Library — Interactive Career Discovery & Academic Pathway Taxonomy",
    author: "Arpit Jaiswal (Product & Systems Architect)",
    targetUsers: "Class 10–12 High School Students, Parents, School Counselors, Tier-2/3 Aspirants",
    lastUpdated: "2026",
    executiveSummary: "An open-access, zero-overhead career discovery portal mapping 225+ career paths, 700+ entrance exams, and 5,000+ institutions. Engineered with zero framework overhead, static edge JSON datasets, and multi-dimensional academic fit synthesis, eliminating reliance on expensive private counseling.",
    rootCauseAnalysis: [
      "Over 90% of Indian high school students suffer from narrow career tunnel-vision, recognizing only Engineering or Medicine due to lack of structured guidance.",
      "Structured career mapping (stream requirements -> entrance exams -> colleges -> occupational outcomes) is locked behind expensive private counseling services (₹10,000–₹50,000 per consultation).",
      "Standard government career portals are fragmented, difficult to navigate on mobile, and fail to provide personalized suitability evaluation based on student credentials."
    ],
    primaryPersona: {
      name: "Aarav Sharma",
      role: "Class 11 Science (PCM) Student",
      context: "Studying in a Tier-2 town, questioning whether to continue preparing for JEE or explore alternative high-growth professions matching his aptitude.",
      jtbd: "When planning my post-school education, I need transparent, end-to-end pathway maps connecting high school streams to real entrance exams and colleges, so that I can make confident career decisions without expensive private counselors."
    },
    requirements: [
      {
        priority: "P0",
        title: "Multi-Pathway Navigation & Stream Partitioning",
        spec: "Deliver 3 independent navigation flows (Stream-Based PCM/PCB/Comm/Hum, 3-tier taxonomy drill-down from Industries to Careers, and sub-millisecond client-side keyword search) across 225 professions.",
        acceptanceCriteria: "Search query executes in <50ms over pre-indexed JSON registry with zero network roundtrips."
      },
      {
        priority: "P0",
        title: "9-Section Complete Career Blueprint Templates",
        spec: "Render structured analytical blueprints for every career: career maps, stream eligibility, 700+ entrance exams paired with 5,000+ colleges, specialty tracks, and aptitude profiles.",
        acceptanceCriteria: "100% of the 225 mapped careers provide complete stream-to-college pipeline information without missing fields."
      },
      {
        priority: "P1",
        title: "Academic Marksheet Fit Evaluation Engine",
        spec: "Process local student transcript uploads (PDF/TXT/DOCX) via Web FileReader API on-device, assemble candidate grade context with career trait criteria, and synthesize a 5-dimensional candidate-role-fit report.",
        acceptanceCriteria: "Zero server storage of student marksheets; evaluation delivers structured 5-dimensional feedback on academic fit, trait alignment, and market viability."
      },
      {
        priority: "P2",
        title: "Zero-Framework 14-Theme Dynamic Attribute Styling",
        spec: "Implement CSS custom properties keyed by HTML body data-industry attributes, enabling one lightweight stylesheet to theme 225 careers with zero CSS-in-JS runtime overhead.",
        acceptanceCriteria: "Zero stylesheet bloat; instant theme switching across 14 industry categories with perfect Lighthouse 100 performance."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "CareerTaxonomyEntity",
          description: "Flat-file JSON record detailing one profession across stream requirements, exams, colleges, and trait metrics",
          fields: ["id", "title", "industry", "streamEligibility", "entranceExams", "topColleges", "traits", "specializations"]
        },
        {
          name: "AcademicFitPayload",
          description: "Client-side transcript synthesis vector for candidate suitability scoring",
          fields: ["studentGrades", "targetCareerId", "fitScore", "academicFit", "traitAlignment", "marketViability", "timelineReadiness", "blockers"]
        }
      ],
      syncStrategy: "Static edge flat-file JSON assets pre-indexed at build time -> instant client-side O(1) keyword indexing -> zero background server overhead."
    },
    edgeCases: [
      {
        scenario: "Student uploads non-standard state board marksheet format or scanned image",
        operationalRisk: "Client-side text extraction fails or yields partial grade records.",
        systemResolution: "System falls back to structured manual subject/grade input chips with instant recalculation."
      },
      {
        scenario: "Low-end mobile browser accessing deep 225-career catalog over 2G/3G network",
        operationalRisk: "Heavy bundle download causes page freeze or high bounce rate.",
        systemResolution: "Zero-dependency static HTML/JS architecture loads initial shell in under 150ms with 100% offline-tolerant bookmark persistence."
      }
    ],
    kpiMetrics: [
      { label: "Career Catalog Depth", metric: "225 Professions Mapped", businessImpact: "Broadens career literacy far beyond traditional Engineering and Medicine silos" },
      { label: "Institutional Coverage", metric: "700+ Exams & 5,000+ Colleges", businessImpact: "Direct actionable path from high school stream to target colleges" },
      { label: "Catalog Query Latency", metric: "<50ms Client Search", businessImpact: "Sub-millisecond discovery without server infrastructure overhead" },
      { label: "Guidance Accessibility Cost", metric: "₹0 (100% Open Access)", businessImpact: "Democratizes quality academic counseling for students across Tier-2 and Tier-3 India" }
    ]
  },
  "work-sarthi": {
    projectId: "work-sarthi",
    docId: "PRD-EDTECH-003",
    version: "v2.0 (Shipped & Live)",
    status: "SHIPPED & LIVE",
    title: "Work Sarthi (WSCAT) — Multilingual Psychometric Career Assessment Engine",
    author: "Arpit Jaiswal (Product & Operations Lead)",
    targetUsers: "High School & College Students, Tier-2/3 Vernacular Aspirants, Vocational Trainees, Counselors",
    lastUpdated: "2026",
    executiveSummary: "A scientifically grounded vocational psychometric assessment engine synthesizing RIASEC, Big Five (OCEAN), and Hofstede cultural frameworks. Evaluates 60+ behavioral indicators and executes client-driven parallel inference pipelines to generate personalized 8–10 page career roadmaps in 13 Indian regional languages with 100% browser-level data privacy.",
    rootCauseAnalysis: [
      "Existing psychometric platforms are modeled strictly on Western corporate workforce assumptions, failing to account for Indian familial and cultural decision structures.",
      "Vocational assessments are almost exclusively in English, effectively disenfranchising millions of students in regional vernacular mediums across Tier-2, 3, and rural India.",
      "High latency in multi-section psychometric reporting leads to 40%+ drop-off rates on mobile devices during traditional assessment flows."
    ],
    primaryPersona: {
      name: "Pooja Patel",
      role: "First-Generation College Aspirant (Gujarati Medium)",
      context: "Completing Class 12, seeking scientific career validation in her native tongue without corporate jargon or English language intimidation.",
      jtbd: "When taking a career aptitude test, I need questions and reports delivered in my native language with culturally aligned occupational recommendations, so that I and my family can understand my strengths and choose the right vocational path."
    },
    requirements: [
      {
        priority: "P0",
        title: "Tri-Framework Psychometric Vector Normalization",
        spec: "Unify RIASEC (Holland Codes), Big Five (OCEAN), and Hofstede Cultural Dimensions into a standardized mathematical pipeline tracking 60+ indicators normalized via round((sum / (count * 5)) * 10).",
        acceptanceCriteria: "Guarantees equivalent weighting and mathematical parity across all 60 behavioral input vectors."
      },
      {
        priority: "P0",
        title: "13-Language Multilingual Localization Architecture",
        spec: "Thread active locale parameter directly into UI dictionary keys and AI orchestrator system context, enabling report generation natively in 13 Indian languages (Hindi, Gujarati, Marathi, Tamil, Telugu, Bengali, etc.).",
        acceptanceCriteria: "Entire 8–10 page diagnostic report emits natively in the student's selected regional mother tongue, not through crude machine post-translation."
      },
      {
        priority: "P1",
        title: "Multi-Stage Parallel Inference Pipeline",
        spec: "Structure multi-stage orchestration separating high-level diagnostic clustering (Stage 1) from parallel deep SWOT analysis across career matches (Stage 2 with 4x concurrent calls).",
        acceptanceCriteria: "Reduces end-to-end report generation turnaround by ~60% (sub-20s total pipeline duration)."
      },
      {
        priority: "P1",
        title: "Offline Pearson Fallback Engine & Client Data Sovereignty",
        spec: "Implement client-side trigonometric vector correlation fallback that computes matching arrays if external network drops, generating print-ready 150 DPI vector A4 PDFs entirely inside the browser.",
        acceptanceCriteria: "Zero student assessment data leaves the local browser environment; 100% data privacy and instant fallback capability."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "PsychometricVectorSet",
          description: "Normalized psychological scoring profile combining three distinct academic frameworks",
          fields: ["candidateId", "riasecScores", "oceanScores", "hofstedeScores", "normalizedVector", "assessmentTimestamp"]
        },
        {
          name: "MultilingualReportOutput",
          description: "Structured report payload rendered to printable A4 canvas and PDF",
          fields: ["reportId", "candidateId", "locale", "careerClusters", "swotMatrix", "timestampedRoadmap", "pdfBlobUrl"]
        }
      ],
      syncStrategy: "Client-side Likert vector accumulation -> multi-stage parallel inference -> offline Pearson fallback -> direct browser PDF render with zero server data retention."
    },
    edgeCases: [
      {
        scenario: "Intermittent mobile data connection during multi-stage report inference",
        operationalRisk: "External API call fails, stranding student after completing 60-question assessment.",
        systemResolution: "Client-side Pearson correlation engine activates instantly, computing vector match arrays locally without losing assessment progress."
      },
      {
        scenario: "Student provides uniform extreme responses across all questions (all 1s or all 5s)",
        operationalRisk: "Flat psychometric vector produces undifferentiated recommendations.",
        systemResolution: "Sanity check flags response bias and presents a lightweight 3-question forced-choice tie-breaker before finalizing vector."
      }
    ],
    kpiMetrics: [
      { label: "Vernacular Reach", metric: "13 Indian Regional Languages", businessImpact: "Enables non-metro students to receive career guidance in their native language" },
      { label: "Psychometric Indicator Depth", metric: "60+ Behavioral Vectors", businessImpact: "Scientifically validated triangulation across RIASEC, Big Five, and Hofstede models" },
      { label: "Inference Speedup", metric: "4x Parallel Acceleration (<20s)", businessImpact: "Prevents drop-offs by generating 8-10 page custom reports under 20 seconds" },
      { label: "Data Sovereignty Parity", metric: "100% Client-Side Processing", businessImpact: "Guarantees student privacy with zero cloud database persistence of psychological profiles" }
    ]
  },
  "ar-auagpt": {
    projectId: "ar-auagpt",
    docId: "PRD-COMMODITY-001",
    version: "v3.0 (Shipped & Live)",
    status: "SHIPPED & LIVE",
    title: "AR-AuAgPt — Domestic Precious Metals Index & Landed Parity Platform",
    author: "Arpit Jaiswal (Product & Systems Architect)",
    targetUsers: "Retail Jewelry Buyers, Small Bullion Investors, Local Goldsmiths, Bridal Gift Planners",
    lastUpdated: "2026",
    executiveSummary: "A real-time gold, silver, and platinum pricing platform reflecting true Indian landed rates. Layers domestic import duties (6% Basic Duty), 1% AIDC, and 3% GST on top of global COMEX/London spot bids, standardized in 10g and tola units. Features a 5-tier high-availability data source fallback cascade, ensuring 100% feed reliability for local retail transactions.",
    rootCauseAnalysis: [
      "Mainstream financial tickers only display raw international USD spot gold rates, completely ignoring India's layered tariff regime (6% Basic Customs Duty, 1% AIDC, and 3% GST).",
      "Local retail jewelry buyers lack transparency into true landed costs, leaving them vulnerable to arbitrary jeweler margins and undisclosed markups.",
      "Domestic bullion pricing APIs suffer from frequent midday outages, resulting in blank price widgets during critical retail trading windows.",
    ],
    primaryPersona: {
      name: "Dinesh Parekh",
      role: "Retail Bullion Buyer & Goldsmith",
      context: "Buys 24K gold bars and silver bullion in Surat's jewelry bazaar; needs instant confirmation of true domestic landed rate per 10g before settling counter trade.",
      jtbd: "When evaluating gold or silver purchases, I need instant landed INR rates that include all Indian customs duties and GST per 10g/tola, so that I can verify jeweler quotes against true market parity."
    },
    requirements: [
      {
        priority: "P0",
        title: "Domestic Landed Tax & Tariff Mathematical Conversion",
        spec: "Convert international troy-ounce USD spot bids into true Indian landed rates: (Spot USD * USD/INR / 31.1034768) * Multiplier (6% Customs Duty + 1% AIDC + 3% GST Compounded = 1.0628x factor for Gold, 1.0759x for Silver).",
        acceptanceCriteria: "Achieves exact mathematical parity with published Indian Bullion and Jewellers Association (IBJA) benchmarks down to the rupee."
      },
      {
        priority: "P0",
        title: "5-Tier High-Availability Provider Fallback Cascade",
        spec: "Engineer an Express proxy gateway with sequential automatic fallback across Swissquote, Yahoo Finance, European Central Bank (ECB), historical snapshots, and client localStorage cache.",
        acceptanceCriteria: "Zero price card blackouts; price display maintains 100% availability even during upstream API outages."
      },
      {
        priority: "P1",
        title: "Traditional Indian Unit Normalization (10 Grams & Tola)",
        spec: "Provide instant toggleable pricing views matching local bazaar conventions: 10g, 1 Tola (11.66g), 1 Kilogram, and Troy Ounce, with custom interactive margin simulation sliders.",
        acceptanceCriteria: "Enables consumers to calculate landed material cost before paying jeweler retail making charges."
      },
      {
        priority: "P2",
        title: "Cross-Platform Delivery (Web, PWA & Native Build)",
        spec: "Ship application as a zero-overhead responsive web app, installable offline PWA, and Capacitor-ready mobile application from a single unified codebase.",
        acceptanceCriteria: "PWA installs cleanly on Android and iOS with sub-second cold boot and offline rate display."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "LandedCommodityRate",
          description: "Current domestic spot price record computed from international bids and Indian tariff structure",
          fields: ["metalId", "spotUsd", "usdInrRate", "baseInrPerGram", "dutyInclusivePerGram", "ratePer10g", "ratePerTola", "timestamp"]
        },
        {
          name: "TariffMultiplierConfig",
          description: "Mathematical duty multiplier parameters reflective of current Union Budget trade policies",
          fields: ["metalId", "basicImportDuty", "aidcSurcharge", "gstRate", "compositeMultiplier", "effectiveDate"]
        }
      ],
      syncStrategy: "Cron-warmed Express proxy gateway caches foreign exchange and spot feeds -> 5-tier sequential failover -> client localStorage cache fallback."
    },
    edgeCases: [
      {
        scenario: "Primary upstream financial rate feed (Swissquote) experiences mid-day API failure",
        operationalRisk: "Live price widget fails or shows blank screen during active jewelry market hours.",
        systemResolution: "Express proxy switches automatically to Yahoo Finance and ECB within 250ms with zero disruption to active users."
      },
      {
        scenario: "Sudden intra-day currency fluctuation between USD and INR during high market volatility",
        operationalRisk: "Static calculations display outdated Rupee pricing.",
        systemResolution: "60-second cron-warmed cache refreshes USD/INR forex vectors continuously and serves real-time landed parity."
      }
    ],
    kpiMetrics: [
      { label: "Price Feed Availability", metric: "100% Uptime (5-Tier Cascade)", businessImpact: "Guarantees that buyers and merchants never face blank screens during trades" },
      { label: "Domestic Parity Accuracy", metric: "0.00% Calculation Variance", businessImpact: "Standardized against official Indian Bullion and Jewellers Association (IBJA) landed benchmarks" },
      { label: "Calculation Latency", metric: "<50ms Real-Time Recalculation", businessImpact: "Instant user feedback when adjusting international spot price or currency sliders" },
      { label: "Commodity Coverage", metric: "Gold, Silver & Platinum", businessImpact: "Complete coverage of all three primary precious metal retail investment assets in India" }
    ]
  }
};

// Ensure direct lookup by project.id ("study-tracker-aj") succeeds
PRD_DATA["study-tracker-aj"] = PRD_DATA["aspirantflow"];

