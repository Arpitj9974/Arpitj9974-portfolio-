import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Database, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Sliders,
  Terminal,
  Zap,
  Info,
  Code
} from "lucide-react";
import { playClick, playSuccess, playToggle } from "../utils/soundEngine";

interface BusinessRule {
  title: string;
  badge: string;
  description: string;
}

interface PipelineNode {
  id: string;
  name: string;
  stage: string;
  description: string;
  latencyBudget: string;
  inputPayload: Record<string, unknown>;
  codeSnippet: string;
  businessPurpose: string;
  businessRules: BusinessRule[];
  icon: React.ReactNode;
}

const NODES: PipelineNode[] = [
  {
    id: "ingestion",
    name: "Ingestion Gateway",
    stage: "01 // CLIENT DISBURSEMENT",
    description: "Accepts high-concurrency borrower loan applications & bulk reconciliation batches.",
    latencyBudget: "< 12ms",
    icon: <Layers size={18} className="text-accent" />,
    inputPayload: {
      borrowerId: "BOR-SURAT-8842",
      disbursementAmt: 1500000,
      annualRate: 8.5,
      tenureMonths: 180,
      channel: "REST_API_V2"
    },
    businessPurpose: "Accepts borrower loan applications and reconciliation batches with strict schema sanitation and idempotency locks before state changes occur.",
    businessRules: [
      {
        title: "Idempotency Lock Guard",
        badge: "ANTI-DUPLICATION",
        description: "Computes SHA-256 payload hash to guarantee multiple submissions within a 60-second window never trigger duplicate loan disbursements."
      },
      {
        title: "Schema & Boundary Sanitization",
        badge: "COMPLIANCE GATE",
        description: "Validates Aadhaar/PAN formats, tenor windows (12 to 360 months), and disbursement caps (₹50k to ₹50L) before queueing."
      },
      {
        title: "Ingestion SLA Latency",
        badge: "< 12MS SLA",
        description: "Acknowledges client API with unique trace ID and queues for asynchronous rule validation under 12ms."
      }
    ],
    codeSnippet: `// 01. Ingestion & Schema Sanitization
export async function ingestDisbursement(req: DisbursementRequest) {
  const sanitized = sanitizeBorrowerPayload(req.body);
  const idempotencyKey = computeHash(sanitized);
  return await eventBus.publish("LOAN_INGESTED", { payload: sanitized, key: idempotencyKey });
}`
  },
  {
    id: "validation",
    name: "Rule Validation Engine",
    stage: "02 // RISK & BUREAU CHECK",
    description: "Validates debt-to-income, CIBIL bureau scoring, deduplication, and regulatory mandates.",
    latencyBudget: "< 24ms",
    icon: <ShieldCheck size={18} className="text-accent" />,
    inputPayload: {
      creditBureauScore: 782,
      maxDTIThreshold: 0.45,
      actualDTI: 0.31,
      duplicateCheck: "CLEAN",
      kycStatus: "VERIFIED"
    },
    businessPurpose: "Automated risk underwriting gate evaluating debt-to-income, credit bureau scoring, deduplication, and regulatory mandates.",
    businessRules: [
      {
        title: "Debt-to-Income (DTI) Cap",
        badge: "MAX 45% DTI",
        description: "Rejects or flags applications where existing debt obligations exceed 45% of verified monthly disposable cash flow."
      },
      {
        title: "CIBIL Bureau Tiering",
        badge: "MIN 700 SCORE",
        description: "Scores >= 700 qualify for instant Straight-Through Processing (STP); scores between 650-699 route to manual credit underwriting."
      },
      {
        title: "Deduplication & Fraud Shield",
        badge: "FRAUD PREVENTION",
        description: "Cross-references internal loan blacklist and active borrower registry to block circular financing loops."
      }
    ],
    codeSnippet: `// 02. Rule Validation & Credit Guard
export function validateBorrowerRisk(profile: BorrowerProfile): ValidationResult {
  if (profile.dti > MAX_DTI_RATIO) throw new RiskThresholdExceeded("DTI > 45%");
  if (profile.cibilScore < 700) throw new IneligibleCreditTier("CIBIL < 700");
  return { approved: true, riskClass: "TIER_A_PRIME" };
}`
  },
  {
    id: "ledger",
    name: "Amortization State Vector",
    stage: "03 // DUAL-LEDGER MATH",
    description: "Computes reducing-balance EMI schedules, interest-to-principal splits, and ledger entries.",
    latencyBudget: "< 18ms",
    icon: <Cpu size={18} className="text-accent" />,
    inputPayload: {
      monthlyEMI: 14777,
      principalBalance: 1500000,
      firstMonthInterest: 10625,
      firstMonthPrincipal: 4152,
      ledgerDoubleEntry: "BALANCED_0.00"
    },
    businessPurpose: "Dual-entry reducing-balance mathematical engine calculating monthly EMIs, principal/interest splits, and ledger entries.",
    businessRules: [
      {
        title: "Reducing-Balance Formulation",
        badge: "FINANCIAL ACCURACY",
        description: "Interest computed strictly on active outstanding principal balance, eliminating borrower overcharging."
      },
      {
        title: "Dual-Ledger Balancing",
        badge: "ZERO DRIFT (₹0.00)",
        description: "Every disbursement posts equal Debit (Loan Asset) and Credit (Disbursal Bank Account). Zero tolerance for floating pennies."
      },
      {
        title: "Tenure Compression Vector",
        badge: "PREPAYMENT LOGIC",
        description: "Part-prepayments automatically applied directly to principal, compressing overall tenure while keeping EMI predictable."
      }
    ],
    codeSnippet: `// 03. Reducing-Balance Amortization Vector
export function computeAmortizationVector(P: number, r: number, n: number): AmortSchedule {
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return generateMonthlySchedule({ principal: P, rate: r, months: n, emi });
}`
  },
  {
    id: "persistence",
    name: "Persistence & Audit Log",
    stage: "04 // CRYPTOGRAPHIC AUDIT",
    description: "Commits to immutable SQL storage, creates audit trails, and emits real-time telemetry.",
    latencyBudget: "< 15ms",
    icon: <Database size={18} className="text-accent" />,
    inputPayload: {
      dbTransactionId: "TX-2026-X99182",
      auditHash: "SHA256:8f4c2...e9a1b",
      optimisticLockVersion: 1,
      telemetryEmitted: true
    },
    businessPurpose: "Commits to immutable SQL storage with cryptographic hash audit trails, concurrency locks, and automated rollback protection.",
    businessRules: [
      {
        title: "Append-Only Audit Ledger",
        badge: "IMMUTABLE STORAGE",
        description: "Financial records are never deleted or modified in-place; all adjustments require auditable offsetting credit/debit entries."
      },
      {
        title: "Optimistic Locking & Concurrency",
        badge: "RACE CONDITION GUARD",
        description: "Version-tagged row locks prevent simultaneous parallel modifications during high-concurrency batch reconciliation."
      },
      {
        title: "Automatic State Rollback",
        badge: "FAULT RESILIENCE",
        description: "Any downstream database timeout instantly disarms the pipeline and rolls back transient state to prevent orphan disbursements."
      }
    ],
    codeSnippet: `// 04. Atomic Commit & Telemetry Dispatch
export async function commitLedgerTransaction(tx: LedgerTransaction) {
  return await db.$transaction(async (prisma) => {
    await prisma.loanAccount.update({ where: { id: tx.id }, data: tx.payload });
    await prisma.auditLog.create({ data: { hash: tx.auditHash, timestamp: new Date() } });
  });
}`
  }
];

export default function ArchitectureSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [meanLatency, setMeanLatency] = useState(17.8);
  const [discrepancies, setDiscrepancies] = useState(0);
  const [faultInjected, setFaultInjected] = useState(false);
  const [rollbackTriggered, setRollbackTriggered] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [inspectorTab, setInspectorTab] = useState<"business" | "code">("business");
  const animRef = useRef<number | null>(null);

  // Simulation execution loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProcessedCount((prev) => {
        if (faultInjected && prev >= 480 && !rollbackTriggered) {
          setRollbackTriggered(true);
          setIsRunning(false);
          playToggle(true);
          return prev;
        }

        if (prev >= 1000) {
          setIsRunning(false);
          playSuccess();
          return 1000;
        }

        const next = prev + 25;
        // Jitter latency slightly
        setMeanLatency(Number((16.5 + Math.random() * 3.2).toFixed(1)));
        if (next % 150 === 0) {
          setDiscrepancies((d) => d + 2);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isRunning, faultInjected, rollbackTriggered]);

  const handleStartSimulation = () => {
    playClick();
    setProcessedCount(0);
    setDiscrepancies(0);
    setRollbackTriggered(false);
    setIsRunning(true);
  };

  const handleReset = () => {
    playClick();
    setIsRunning(false);
    setProcessedCount(0);
    setDiscrepancies(0);
    setRollbackTriggered(false);
    setFaultInjected(false);
    setMeanLatency(17.8);
  };

  const handleToggleFault = () => {
    playClick();
    setFaultInjected((prev) => !prev);
    if (rollbackTriggered) {
      setRollbackTriggered(false);
    }
  };

  const activeNode = NODES[activeNodeIndex];
  const progressPercent = Math.min(100, Math.round((processedCount / 1000) * 100));

  return (
    <section 
      id="architecture-simulator"
      className="border border-ink/15 bg-paper p-6 md:p-10 space-y-8 animate-in fade-in duration-200"
    >
      {/* Header Statement */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-ink/10 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
              LIVE SYSTEM ARCHITECTURE SIMULATOR
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
            High-Throughput Financial Pipeline &amp; Fault Resilience
          </h2>
          <p className="text-xs md:text-sm text-muted font-sans max-w-2xl leading-relaxed">
            Simulate 1,000 concurrent lending transactions moving through validation, reducing-balance state reconciliation, and atomic persistence. Test resilience with simulated network drops.
          </p>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleStartSimulation}
            disabled={isRunning}
            className="px-4 py-2.5 bg-ink hover:bg-accent disabled:opacity-50 text-paper text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Play size={13} />
            <span>{isRunning ? "PROCESSING BATCH..." : "RUN 1,000 TX BATCH"}</span>
          </button>

          <button
            onClick={handleToggleFault}
            className={`px-3.5 py-2.5 border text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              faultInjected 
                ? "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400" 
                : "border-ink/20 text-muted hover:border-ink hover:text-ink"
            }`}
            title="Inject simulated network timeout at ledger stage"
          >
            <AlertTriangle size={13} />
            <span>FAULT INJECTION: {faultInjected ? "ARMED" : "OFF"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 border border-ink/15 hover:border-ink text-muted hover:text-ink transition-colors cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Real-Time Live Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-surface-container/60 p-4 border border-ink/10 font-mono">
        <div className="space-y-1">
          <span className="text-[10px] text-muted uppercase tracking-wider block">THROUGHPUT</span>
          <div className="text-xl md:text-2xl font-bold text-ink">
            {processedCount} <span className="text-xs text-muted font-normal">/ 1,000 TX</span>
          </div>
          <div className="w-full bg-ink/10 h-1 overflow-hidden">
            <div 
              className={`h-full transition-all duration-75 ${rollbackTriggered ? "bg-red-500" : "bg-accent"}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-muted uppercase tracking-wider block">MEAN LATENCY</span>
          <div className="text-xl md:text-2xl font-bold text-ink">
            {meanLatency} <span className="text-xs text-muted font-normal">ms</span>
          </div>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 block">SLA: &lt; 25ms (HEALTHY)</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-muted uppercase tracking-wider block">DISCREPANCIES ISOLATED</span>
          <div className="text-xl md:text-2xl font-bold text-accent">
            {discrepancies} <span className="text-xs text-muted font-normal">flagged</span>
          </div>
          <span className="text-[9px] text-muted block">AUTOMATIC RECONCILED</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-muted uppercase tracking-wider block">DATA INTEGRITY</span>
          <div className="text-xl md:text-2xl font-bold text-ink">
            {rollbackTriggered ? "ROLLBACK" : "99.98%"}
          </div>
          <span className="text-[9px] text-muted block">
            {rollbackTriggered ? "CORRUPTION PREVENTED" : "DOUBLE-ENTRY BALANCED"}
          </span>
        </div>
      </div>

      {/* Fault Injection Warning Banner (When Triggered) */}
      {rollbackTriggered && (
        <div className="p-4 bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-300 font-mono text-xs flex items-start justify-between gap-4 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold uppercase">
              <AlertTriangle size={15} />
              <span>SIMULATED NETWORK TIMEOUT TRIGGERED AT 480 TX</span>
            </div>
            <p className="font-sans text-xs text-red-800 dark:text-red-200">
              <strong>Optimistic Rollback Active:</strong> In-flight transaction state vector safely reverted. Zero ledger drift, zero phantom balances created. Client received idempotent retry token.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-red-600 text-white font-mono text-[10px] uppercase font-bold hover:bg-red-700 shrink-0 cursor-pointer"
          >
            DISARM &amp; RESET
          </button>
        </div>
      )}

      {/* 4-Node Pipeline Flow Canvas */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] font-mono text-muted uppercase tracking-wider">
          <span>PIPELINE STAGES (CLICK NODE TO INSPECT PAYLOAD &amp; LOGIC)</span>
          <span>ACTIVE INSPECTOR: {activeNode.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {NODES.map((node, idx) => {
            const isSelected = idx === activeNodeIndex;
            const isNodeActive = isRunning && processedCount > (idx * 250);
            
            return (
              <div
                key={node.id}
                onClick={() => {
                  playClick();
                  setActiveNodeIndex(idx);
                }}
                className={`p-4 border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected 
                    ? "border-accent bg-accent/5 ring-1 ring-accent" 
                    : "border-ink/10 bg-paper hover:border-ink/30"
                }`}
              >
                {/* Node Status Indicator */}
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="p-2 border border-ink/10 bg-surface-container">
                    {node.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-muted uppercase bg-surface-container px-1.5 py-0.5">
                    {node.latencyBudget}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-wider block">
                    {node.stage}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-ink leading-tight">
                    {node.name}
                  </h3>
                  <p className="text-[11px] text-muted font-sans line-clamp-2 leading-relaxed">
                    {node.description}
                  </p>
                </div>

                {/* Live Activity Meter */}
                <div className="pt-3 mt-3 border-t border-ink/10 flex justify-between items-center text-[10px] font-mono">
                  <span className={isSelected ? "text-accent font-bold" : "text-muted"}>
                    {isSelected ? "[ SELECTED ]" : "INSPECT ->"}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${
                    rollbackTriggered && idx === 2
                      ? "bg-red-500 animate-ping"
                      : isNodeActive
                        ? "bg-emerald-500 animate-pulse"
                        : "bg-ink/20"
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Deep Inspector Panel */}
      <div className="border border-ink/15 bg-surface-container/30 p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <Terminal size={15} className="text-accent" />
            <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
              STAGE INSPECTION // {activeNode.name}
            </span>
          </div>
          <span className="font-mono text-[11px] text-muted">
            LATENCY BUDGET: <strong className="text-ink">{activeNode.latencyBudget}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* JSON Payload Spec */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider block font-bold">
              // TELEMETRY PAYLOAD SNAPSHOT
            </span>
            <pre className="p-3 bg-paper border border-ink/10 font-mono text-[11px] text-ink overflow-x-auto leading-relaxed">
              {JSON.stringify(activeNode.inputPayload, null, 2)}
            </pre>
          </div>

          {/* Right Panel: Business & Ops Rules (Default) OR Code Implementation */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block font-bold">
                // {inspectorTab === "business" ? "BUSINESS & OPERATIONAL RULES" : "ARCHITECTURAL IMPLEMENTATION EXCERPT"}
              </span>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-paper p-0.5 border border-ink/10 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setInspectorTab("business");
                  }}
                  className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    inspectorTab === "business"
                      ? "bg-ink text-paper font-bold shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                  title="View business rules, compliance gates & risk policies"
                >
                  <CheckCircle2 size={11} className={inspectorTab === "business" ? "text-accent" : ""} />
                  <span>Business Rules</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setInspectorTab("code");
                  }}
                  className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    inspectorTab === "code"
                      ? "bg-ink text-paper font-bold shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                  title="View TypeScript architectural implementation snippet"
                >
                  <Code size={11} className={inspectorTab === "code" ? "text-accent" : ""} />
                  <span>Code Excerpt</span>
                </button>
              </div>
            </div>

            {inspectorTab === "business" ? (
              <div className="space-y-2.5">
                {/* Purpose Callout */}
                <div className="p-3 bg-paper border border-ink/10 text-xs font-sans text-muted leading-relaxed">
                  <span className="font-mono text-[10px] text-accent uppercase font-bold tracking-wider block mb-1">
                    OPERATIONAL MANDATE:
                  </span>
                  {activeNode.businessPurpose}
                </div>

                {/* Structured Business Rules */}
                <div className="space-y-2">
                  {activeNode.businessRules.map((rule, rIdx) => (
                    <div key={rIdx} className="p-3 bg-paper border border-ink/10 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-ink flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                          {rule.title}
                        </span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-surface-container border border-ink/10 text-muted uppercase">
                          {rule.badge}
                        </span>
                      </div>
                      <p className="text-[11px] font-sans text-muted leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <pre className="p-4 bg-paper border border-ink/10 font-mono text-[11px] text-ink leading-relaxed whitespace-pre-wrap break-words text-muted/90 max-h-[300px] overflow-y-auto">
                <code>{activeNode.codeSnippet}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
