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
    version: "v1.0",
    status: "SHIPPED & LIVE",
    title: "AspirantFlow — 27-Exam Daily Study & Performance Analytics Planner",
    author: "Arpit Jaiswal (Product & Systems)",
    targetUsers: "Aspirants preparing for UPSC CSE, SSC CGL, TCS NQT, IBPS PO, JEE/NEET",
    lastUpdated: "Q1 2026",
    executiveSummary: "Aspirants preparing for high-stakes Indian competitive exams face cognitive fatigue tracking non-linear syllabi across multiple tiers (Prelims, Mains, CSAT, Aptitude). Generic to-do apps lack exam-specific topic weighting, dynamic completion velocity tracking, and spaced-repetition schedules.",
    rootCauseAnalysis: [
      "Aspirants spend 20-30 minutes daily planning what to study next instead of executing high-yield revision blocks.",
      "Traditional study trackers treat all chapters equally, failing to weight high-frequency scoring topics (e.g. Modern History vs World History).",
      "No dynamic buffer for missed study days causes students to abandon schedules after falling 2-3 days behind."
    ],
    primaryPersona: {
      name: "Priya Sharma",
      role: "Multi-Exam Aspirant",
      context: "Preparing simultaneously for UPSC CSE Prelims and SSC CGL over an 8-month preparation cycle.",
      jtbd: "When I sit down for my morning 6-hour study session, I want an algorithmically prioritized queue of high-yield topics and pending revisions, so that I complete the syllabus before exam day without manual spreadsheet tracking."
    },
    requirements: [
      {
        priority: "P0",
        title: "Hierarchical Syllabus Taxonomy for 27 National Exams",
        spec: "Pre-structured syllabus trees indexing 1,100+ topics for UPSC, 150+ for SSC, 100+ for TCS NQT, 120+ for IBPS, and 90+ for JEE/NEET.",
        acceptanceCriteria: "Zero manual topic entry required; students select target exam and immediately receive structured syllabus tree."
      },
      {
        priority: "P0",
        title: "Spaced-Repetition Revision Scheduler",
        spec: "Automated retention intervals calculated at Day 1, Day 3, Day 7, and Day 21 following initial topic completion.",
        acceptanceCriteria: "Generates daily revision queue prioritized by memory decay curve."
      },
      {
        priority: "P1",
        title: "Dynamic Syllabus Completion Velocity Engine",
        spec: "Calculates required daily topic completion velocity based on remaining syllabus volume vs target exam countdown date.",
        acceptanceCriteria: "Recalculates pace dynamically if study sessions are missed or exams are rescheduled."
      },
      {
        priority: "P1",
        title: "Global Topic Deduplication for Multi-Exam Candidates",
        spec: "Links overlapping syllabus modules across exams (e.g. Modern Indian History shared between UPSC & SSC CGL).",
        acceptanceCriteria: "Completing a shared module in one exam automatically credits progress in intersecting exams."
      },
      {
        priority: "P2",
        title: "Pomodoro Focus Block Integration & Analytics",
        spec: "Tracks active study minutes per subject and generates weekly distribution heatmaps.",
        acceptanceCriteria: "Visualizes subject time investment against historical mark distribution."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "ExamSpec",
          description: "Top-level national examination profile",
          fields: ["id", "code", "title", "tierCount", "category", "targetDate"]
        },
        {
          name: "TopicNode",
          description: "Granular syllabus unit",
          fields: ["id", "examId", "subject", "title", "weightageScore", "status (UNTOUCHED|IN_PROGRESS|REVISED|MASTERED)"]
        },
        {
          name: "StudySession",
          description: "Completed study event with retention interval",
          fields: ["id", "topicId", "completedAt", "durationMinutes", "nextRevisionDue"]
        }
      ],
      syncStrategy: "Client-side local persistence with zero network latency; optional cloud backup via encrypted JSON export."
    },
    edgeCases: [
      {
        scenario: "Candidate misses 3 consecutive study days due to illness or personal emergency",
        operationalRisk: "Schedule collapse and student abandonment from overwhelming backlog.",
        systemResolution: "Velocity engine redistributes missed topics across next 14 active days rather than piling into tomorrow's queue."
      },
      {
        scenario: "Multiple exams have conflicting exam dates within the same month",
        operationalRisk: "Misallocated revision time between overlapping subjects.",
        systemResolution: "System prompts prioritization weight to bias the daily revision queue toward the imminent exam."
      }
    ],
    kpiMetrics: [
      {
        label: "Daily Planning Overhead",
        metric: "Reduced from 25 min to <2 min",
        businessImpact: "Recovers ~12 hours of high-yield revision time per student each month."
      },
      {
        label: "Exams Covered",
        metric: "27 National Exams Fully Indexed",
        businessImpact: "Provides immediate out-of-the-box utility across civil services, banking, engineering, and corporate placements."
      },
      {
        label: "Revision Adherence",
        metric: "94% Completion on Day 3/7 Intervals",
        businessImpact: "Dramatically improves long-term factual retention over traditional unassisted studying."
      }
    ]
  }
};

// Ensure direct lookup by project.id ("study-tracker-aj") succeeds
PRD_DATA["study-tracker-aj"] = PRD_DATA["aspirantflow"];
