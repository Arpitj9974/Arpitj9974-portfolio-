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
  }
};

// Ensure direct lookup by project.id ("study-tracker-aj") succeeds
PRD_DATA["study-tracker-aj"] = PRD_DATA["aspirantflow"];
