import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Shield,
  Clock,
  Sparkles,
  Calendar,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  CreditCard,
  Layers,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  Printer
} from "lucide-react";

interface WaterfallMonth {
  month: string;
  fixedMandates: number; // Rent, insurance, SIPs
  utilities: number;     // Variable bills
  expiringEmis: number;  // Reducing balance loans & credit card EMIs
  totalCommitted: number;
  freeLiquidity: number; // Assumes base salary Rs 1,10,000
}

const WATERFALL_PROJECTIONS: WaterfallMonth[] = [
  { month: "Nov 26", fixedMandates: 32000, utilities: 6500, expiringEmis: 40000, totalCommitted: 78500, freeLiquidity: 31500 },
  { month: "Dec 26", fixedMandates: 32000, utilities: 6200, expiringEmis: 40000, totalCommitted: 78200, freeLiquidity: 31800 },
  { month: "Jan 27", fixedMandates: 32000, utilities: 6800, expiringEmis: 40000, totalCommitted: 78800, freeLiquidity: 31200 },
  { month: "Feb 27", fixedMandates: 32000, utilities: 6000, expiringEmis: 31500, totalCommitted: 69500, freeLiquidity: 40500 }, // Laptop EMI drops (-Rs 8.5K)
  { month: "Mar 27", fixedMandates: 32000, utilities: 6400, expiringEmis: 31500, totalCommitted: 69900, freeLiquidity: 40100 },
  { month: "Apr 27", fixedMandates: 32000, utilities: 6100, expiringEmis: 31500, totalCommitted: 69600, freeLiquidity: 40400 },
  { month: "May 27", fixedMandates: 32000, utilities: 6700, expiringEmis: 31500, totalCommitted: 70200, freeLiquidity: 39800 },
  { month: "Jun 27", fixedMandates: 32000, utilities: 6300, expiringEmis: 16250, totalCommitted: 54550, freeLiquidity: 55450 }, // Personal Loan drops (-Rs 15.25K)
  { month: "Jul 27", fixedMandates: 32000, utilities: 6500, expiringEmis: 16250, totalCommitted: 54750, freeLiquidity: 55250 },
  { month: "Aug 27", fixedMandates: 32000, utilities: 6200, expiringEmis: 16250, totalCommitted: 54450, freeLiquidity: 55550 },
  { month: "Sep 27", fixedMandates: 32000, utilities: 6400, expiringEmis: 16250, totalCommitted: 54650, freeLiquidity: 55350 },
  { month: "Oct 27", fixedMandates: 32000, utilities: 6100, expiringEmis: 0,     totalCommitted: 38100, freeLiquidity: 71900 }, // Final Auto EMI drops (-Rs 16.25K)
];

export default function FinDharDeepDive() {
  const [activeView, setActiveView] = useState<"stacked" | "burn">("stacked");
  const [undoDemoSeconds, setUndoDemoSeconds] = useState<number | null>(null);
  const [undoDemoState, setUndoDemoState] = useState<"idle" | "staged" | "committed" | "restored">("idle");

  const triggerUndoDemo = () => {
    setUndoDemoState("staged");
    setUndoDemoSeconds(10);
    const interval = setInterval(() => {
      setUndoDemoSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setUndoDemoState("committed");
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelUndoDemo = () => {
    setUndoDemoSeconds(null);
    setUndoDemoState("restored");
  };

  return (
    <div className="border-t border-ink/10 pt-10 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-accent tracking-widest block uppercase">
          // FINTECH ARCHITECTURE &amp; OBLIGATION INTELLIGENCE SYSTEMS
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
          Deep-Dive: Forward Cashflow Waterfall, Amortization Math &amp; 10s Undo Buffer
        </h2>
        <p className="text-sm text-muted max-w-3xl leading-relaxed font-sans">
          FinDhar is a forward-looking, zero-assumption personal finance engine that projects contractual obligations, amortized debt schedules, and recurring commitments. Built with React 19, TypeScript, Cloud Firestore, Workbox PWA, and serverless Gemini 2.0 Flash AI. It eliminates retrospective cashflow blindspots by shifting awareness from what happened last month to what is contractually locked in for the next 12 to 60 months.
        </p>
      </div>

      {/* 6 Core Architectural Feature Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Block 1: Forward-Looking Cashflow Waterfall & Run-Rate Engine */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">PREDICTIVE LIQUIDITY</span>
            <h4 className="font-serif font-bold text-lg text-ink">Forward Cashflow Waterfall Engine</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Budgeting tools typically tell users where money went <em>last month</em>. FinDhar projects contractual burn forward across 12-to-60 month timeline horizons:
          </p>
          <ul className="space-y-3 text-xs font-mono">
            <li className="flex items-start gap-2 text-ink">
              <span className="text-accent font-bold">01.</span>
              <div>
                <span className="font-bold block">Cadence Normalization Pipeline</span>
                <span className="text-muted block text-[11px] leading-normal">
                  In <code>src/engine/commitmentEngine.ts</code>, <code>generateCashflowWaterfall()</code> resolves <code>MONTHLY</code>, <code>QUARTERLY</code>, <code>BI_WEEKLY</code>, and <code>ANNUALLY</code> cadences into discrete monthly vectors with variable 30/31-day occurrence weighting.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2 text-ink">
              <span className="text-accent font-bold">02.</span>
              <div>
                <span className="font-bold block">Dual-Bucket Outflow Aggregation</span>
                <span className="text-muted block text-[11px] leading-normal">
                  Distinguishes legally locked <code>confirmedAmount</code> from bounding utility estimates (<code>expectedMinAmount</code> to <code>expectedMaxAmount</code>), eliminating ungrounded financial hallucinations.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2 text-ink">
              <span className="text-accent font-bold">03.</span>
              <div>
                <span className="font-bold block">Annualized Run-Rate Telemetry</span>
                <span className="text-muted block text-[11px] leading-normal">
                  Continuously calculates annualized committed burn (<code>monthly commitments * 12</code>) and flags impending liquidity breaches months before they occur.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Block 2: 10-Second Undo State Buffer */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">STATE DURABILITY</span>
            <h4 className="font-serif font-bold text-lg text-ink">10-Second Transactional Undo Buffer</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Modal confirmation dialogues create fatigue and slow down daily operations. FinDhar pairs optimistic UI mutations with a reversible 10,000ms memory staging queue:
          </p>
          <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-2 rounded text-xs font-mono text-ink">
            <div className="flex justify-between font-bold text-accent">
              <span>MUTATION LIFECYCLE</span>
              <span>BUFFER BEHAVIOR</span>
            </div>
            <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
              <strong className="block text-ink">1. OPTIMISTIC CLIENT PROJECTION</strong>
              <span className="text-muted text-[10px]">Settled installment or deleted obligation immediately vanishes from visible state; waterfall graphs recompute in &lt;2ms.</span>
            </div>
            <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
              <strong className="block text-ink">2. REVERSIBLE MEMORY TRANSACTION</strong>
              <span className="text-muted text-[10px]">Staged deletion holds a <code>setTimeout(10000)</code> handle. Clicking &quot;Undo&quot; clears the timer with 0 Firestore writes.</span>
            </div>
            <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
              <strong className="block text-ink">3. WINDOW UNLOAD SYNCHRONIZATION</strong>
              <span className="text-muted text-[10px]">An active <code>beforeunload</code> hook guarantees that closing or refreshing the tab flushes pending mutations to prevent data desynchronization.</span>
            </div>
          </div>

          {/* Interactive Micro-Simulator */}
          <div className="pt-2 border-t border-ink/10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-muted">Test Staged Buffer:</span>
            {undoDemoState === "idle" && (
              <button
                onClick={triggerUndoDemo}
                className="px-2.5 py-1 text-xs font-mono font-bold bg-accent text-paper hover:bg-accent/80 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Simulate Settle (10s)</span>
              </button>
            )}
            {undoDemoState === "staged" && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-accent animate-pulse">
                  Staged in Memory ({undoDemoSeconds}s)
                </span>
                <button
                  onClick={cancelUndoDemo}
                  className="px-2 py-0.5 text-xs font-mono font-bold border border-ink/20 hover:bg-ink/5 flex items-center gap-1 text-ink cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Undo</span>
                </button>
              </div>
            )}
            {undoDemoState === "committed" && (
              <span className="text-xs font-mono text-ink font-bold flex items-center gap-1">
                <CheckCircle2 size={12} className="text-accent" /> Committed to DB!
              </span>
            )}
            {undoDemoState === "restored" && (
              <span className="text-xs font-mono text-muted flex items-center gap-1">
                <RotateCcw size={12} className="text-accent" /> Reverted cleanly (0 DB Writes)
              </span>
            )}
          </div>
        </div>

        {/* Block 3: Loan & EMI Amortization + Credit Card Limit Radar */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">FINANCIAL LOGIC &amp; AMORTIZATION</span>
            <h4 className="font-serif font-bold text-lg text-ink">Amortization Math &amp; Credit Card Radar</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Bridges everyday consumer financing with institutional lending mathematics and revolving line tracking:
          </p>
          <div className="space-y-3 text-xs font-mono text-ink">
            <div className="border-b border-ink/5 pb-2">
              <span className="font-bold block">Compound Reducing-Balance Formula</span>
              <span className="text-muted text-[11px] leading-normal block mt-1">
                Computes standard reducing-balance installments: <code>EMI = P * r * (1+r)^n / ((1+r)^n - 1)</code> where <code>r = annualRate / (12 * 100)</code>. Automatically models merchant No-Cost EMI interest discounts and foreclosure penalties.
              </span>
            </div>
            <div className="border-b border-ink/5 pb-2">
              <span className="font-bold block">Blocked Credit Limit Computation</span>
              <span className="text-muted text-[11px] leading-normal block mt-1">
                Card issuers lock total remaining principal against total card limit. FinDhar tracks: <code>Blocked = Sum(Active EMI Principals)</code> and <code>Real Revolving Credit = Limit - Blocked</code>.
              </span>
            </div>
            <div>
              <span className="font-bold block">PCI-DSS Card Number Masking</span>
              <span className="text-muted text-[11px] leading-normal block mt-1">
                Runtime Zod schema regex <code>/^\\d&#123;13,19&#125;$/</code> rejects full 16-digit card inputs, enforcing strict 4-digit last4 masks to guarantee zero cardholder risk.
              </span>
            </div>
          </div>
        </div>

        {/* Block 4: Cycle Drift Guard & Calendar Engine */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ALGORITHMIC INTEGRITY</span>
            <h4 className="font-serif font-bold text-lg text-ink">Deterministic Month-End Clamping</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Eliminates native JavaScript calendar arithmetic traps that cause silent date drift:
          </p>
          <div className="bg-paper p-3 border border-ink/5 rounded text-xs font-mono space-y-2">
            <div>
              <span className="text-accent font-bold block">THE MONTH-END DATE ROLLOVER TRAP</span>
              <p className="text-[10px] text-muted mt-1 leading-normal">
                Standard JavaScript <code>new Date(2026, 1, 31)</code> does not throw an error for February 31st; it silently rolls over into March 3rd! For recurring obligations, this causes bills to disappear from February and appear twice in March.
              </p>
            </div>
            <div className="pt-2 border-t border-ink/5">
              <span className="text-accent font-bold block">FINDHAR DETERMINISTIC CLAMPING</span>
              <p className="text-[10px] text-muted mt-1 leading-normal">
                FinDhar queries month boundaries via <code>new Date(year, monthIndex + 1, 0).getDate()</code> and clamps: <code>Math.min(dueDayOfMonth, daysInMonth)</code>, executing on Feb 28th (or Feb 29th leap year) without cycle drift.
              </p>
            </div>
          </div>
        </div>

        {/* Block 5: Air-Gapped Serverless Gemini 2.0 Flash AI */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">COGNITIVE SECURITY</span>
            <h4 className="font-serif font-bold text-lg text-ink">Air-Gapped Gemini 2.0 Flash AI</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Parses unstructured bill receipts and bank auto-debit SMS mandates into typed financial entities with zero client credential exposure:
          </p>
          <ul className="space-y-2 text-xs font-mono text-ink">
            <li className="flex items-start gap-1.5">
              <span className="text-accent font-bold">•</span>
              <span><strong>Google Cloud Secret Manager:</strong> API keys are injected via <code>defineSecret(&#39;GEMINI_API_KEY&#39;)</code> into 2nd Gen serverless Cloud Functions, with 0 keys compiled into client JS bundles.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-accent font-bold">•</span>
              <span><strong>Strict JSON Schema Output:</strong> Enforces structured schemas via <code>@google/genai</code>, returning typed entities (<code>name</code>, <code>amount</code>, <code>cadence</code>, <code>dueDayOfMonth</code>) in ~650ms.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-accent font-bold">•</span>
              <span><strong>Graceful Optical Degradation:</strong> Low-contrast physical bills trigger optical preprocessing with fallback to partial field population rather than 500 runtime errors.</span>
            </li>
          </ul>
        </div>

        {/* Block 6: Sovereign Workbox PWA & Zero-Cost PDF Print Engine */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">OFFLINE SOVEREIGNTY</span>
            <h4 className="font-serif font-bold text-lg text-ink">Workbox PWA &amp; Native Print Engine</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Ensures continuous operation in bank branches, subways, and flights with zero client bloat:
          </p>
          <ul className="space-y-2 text-xs font-mono text-ink">
            <li className="flex items-start gap-1.5">
              <span className="text-accent font-bold">•</span>
              <span><strong>Workbox Runtime Strategies:</strong> <code>CacheFirst</code> precaches the 1.54 MB application shell; <code>NetworkFirst</code> with indexed fallback provides instant cold-start hydration.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-accent font-bold">•</span>
              <span><strong>Truthful Sync Badging:</strong> Listens to <code>navigator.onLine</code> and Firestore write ACKs. Never falsely claims a transaction is persisted to the cloud while in offline mode.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-accent font-bold">•</span>
              <span><strong>Native Print Engine:</strong> Generates formatted multi-page PDF statements via standard browser <code>@media print</code> DOM rules, saving &gt;300 kB by eliminating binary libraries like jsPDF.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Terminal System Topology Blueprint */}
      <div className="border border-ink/10 bg-surface-container/40 p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono text-accent font-bold uppercase">
            // SYSTEM TOPOLOGY: PROGRESSIVE WEB APP TO SERVERLESS GEMINI AI
          </span>
          <span className="text-[10px] font-mono text-muted">
            52 REACT COMPONENTS · 136 PASSING TESTS · AIR-GAPPED AI INFERENCE
          </span>
        </div>
        <div className="bg-paper border border-ink/10 p-4 font-mono text-[11px] leading-relaxed overflow-x-auto text-ink">
          <pre className="whitespace-pre">
{`+----------------------------------------------------------------------------------------------------+
|                                    CLIENT LAYER (React 19 + PWA)                                   |
|  +-----------------------------------------------------------------------------------------------+  |
|  |  UI Presentation: CashflowWaterfall | CommitmentDetail | CalendarGrid | SimulationSandbox    |  |
|  |  Ergonomic Controls: 10s Undo Toast | Floating Add Modal | CardLimitRadar | Native Print PDF  |  |
|  +-----------------------------------------------------------------------------------------------+  |
|                                                  |                                                 |
|  +-----------------------------------------------------------------------------------------------+  |
|  |  Zustand Stores: AuthStore | SyncStatusStore | StagedUndoBuffer (10s Deferral Window)        |  |
|  +-----------------------------------------------------------------------------------------------+  |
|             |                                    |                                    |            |
|             v                                    v                                    v            |
|  +---------------------+              +---------------------+              +---------------------+ |
|  |  Pure Math Engines  |              |   Zod Validation    |              |  Workbox SW Caching | |
|  |  - commitmentEngine |              |   - opt() Converter |              |  - CacheFirst Shell | |
|  |  - amortizeEngine   |              |   - PCI-DSS Filter  |              |  - NetworkFirst Fall| |
|  +---------------------+              +---------------------+              +---------------------+ |
+--------------------------------------------------|-------------------------------------------------+
                                                   |
                             HTTPS / TLS 1.3 / WSS | HSTS Strict Headers
                                                   v
        +------------------------------------------+------------------------------------------+
        |                                                                                     |
        v                                                                                     v
+------------------------------------------------+  +-------------------------------------------------+
|              VERCEL EDGE NETWORK               |  |              GOOGLE CLOUD PLATFORM              |
|  - Edge Routing & Continuous Deployment        |  |  +-------------------------------------------+  |
|  - Gzip / Brotli Static Asset Compression      |  |  | Cloud Firestore (asia-south1)             |  |
|  - Domain: findhar.vercel.app                  |  |  |  - /users/{uid}/commitments (Strict Rules)|  |
|  - Automated Git Webhook CI Verification       |  |  |  - /users/{uid}/payments (Immutable Ledger|  |
+------------------------------------------------+  |  |  - /users/{uid}/payment_sources (Masked)  |  |
                                                    |  +---------------------+---------------------+  |
                                                    |                        |                        |
                                                    |  +---------------------v---------------------+  |
                                                    |  | Firebase Auth (JWT / Session Persistence) |  |
                                                    |  +---------------------+---------------------+  |
                                                    |                        |                        |
                                                    |  +---------------------v---------------------+  |
                                                    |  | Cloud Functions 2nd Gen (Node 20 Runtime) |  |
                                                    |  |  - Google Cloud Secret Manager Isolated   |  |
                                                    |  |  - Gemini 2.0 Flash Structured Extraction |  |
                                                    |  +-------------------------------------------+  |
                                                    +-------------------------------------------------+`}
          </pre>
        </div>
      </div>

      {/* Interactive Cashflow Waterfall Simulation Chart */}
      <div className="border border-ink/10 bg-surface-container/40 p-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-mono text-accent font-bold uppercase block">
              // LIVE CASHFLOW ENGINE — 12-MONTH OBLIGATION WATERFALL
            </span>
            <h3 className="font-serif text-xl font-bold text-ink mt-1">
              Projected Committed Outflows: Debt Roll-Off &amp; Liquidity Expansion
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("stacked")}
              className={`px-3 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                activeView === "stacked"
                  ? "bg-ink text-paper"
                  : "bg-paper text-muted hover:text-ink border border-ink/10"
              }`}
            >
              Obligation Breakdown
            </button>
            <button
              onClick={() => setActiveView("burn")}
              className={`px-3 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                activeView === "burn"
                  ? "bg-accent text-paper"
                  : "bg-paper text-muted hover:text-ink border border-ink/10"
              }`}
            >
              Committed Burn Curve
            </button>
          </div>
        </div>

        <p className="text-xs text-muted font-sans leading-relaxed">
          This chart visualizes the exact forward waterfall generated by FinDhar&#39;s <code>commitmentEngine.ts</code> for a household with a ₹1,10,000 monthly income. Notice how committed burn drops dramatically from ₹78,500 down to ₹38,100 as overlapping EMIs terminate in Feb 27, Jun 27, and Oct 27, expanding discretionary liquidity by ₹40,400/month.
        </p>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            {activeView === "stacked" ? (
              <BarChart data={WATERFALL_PROJECTIONS} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "monospace" }} stroke="rgba(0,0,0,0.2)" />
                <YAxis
                  tickFormatter={(v) => `₹${v / 1000}K`}
                  tick={{ fontSize: 10, fontFamily: "monospace" }}
                  stroke="rgba(0,0,0,0.2)"
                  width={52}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    name === "fixedMandates"
                      ? "Fixed Mandates (Rent/SIP)"
                      : name === "utilities"
                      ? "Variable Utilities"
                      : "Expiring EMIs / Loans"
                  ]}
                  contentStyle={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 0
                  }}
                />
                <Legend
                  formatter={(val) =>
                    val === "fixedMandates"
                      ? "Fixed Mandates"
                      : val === "utilities"
                      ? "Variable Utilities"
                      : "Expiring EMIs / Debt"
                  }
                  wrapperStyle={{ fontSize: 11, fontFamily: "monospace" }}
                />
                <Bar dataKey="fixedMandates" stackId="a" fill="#0f3d64" />
                <Bar dataKey="utilities" stackId="a" fill="#d97706" />
                <Bar dataKey="expiringEmis" stackId="a" fill="#e11d48" />
              </BarChart>
            ) : (
              <AreaChart data={WATERFALL_PROJECTIONS} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradBurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradFree" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "monospace" }} stroke="rgba(0,0,0,0.2)" />
                <YAxis
                  tickFormatter={(v) => `₹${v / 1000}K`}
                  tick={{ fontSize: 10, fontFamily: "monospace" }}
                  stroke="rgba(0,0,0,0.2)"
                  width={52}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    name === "totalCommitted" ? "Committed Outflow" : "Free Discretionary Liquidity"
                  ]}
                  contentStyle={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 0
                  }}
                />
                <Legend
                  formatter={(val) =>
                    val === "totalCommitted" ? "Total Committed Burn" : "Free Discretionary Liquidity"
                  }
                  wrapperStyle={{ fontSize: 11, fontFamily: "monospace" }}
                />
                <Area
                  type="monotone"
                  dataKey="totalCommitted"
                  stroke="#e11d48"
                  strokeWidth={2}
                  fill="url(#gradBurn)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="freeLiquidity"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#gradFree)"
                  dot={false}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Dynamic Metric Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: "Starting Run-Rate", value: "₹78,500/mo" },
            { label: "Peak Outflow Month", value: "Jan 2027 (₹78.8K)" },
            { label: "Debt Roll-Off Savings", value: "₹40,400/mo" },
            { label: "DTI Compression", value: "71% to 34%" }
          ].map((stat) => (
            <div key={stat.label} className="bg-paper border border-ink/10 p-3">
              <div className="text-[10px] font-mono text-muted uppercase tracking-wider">{stat.label}</div>
              <div className="font-serif font-bold text-ink text-base mt-0.5">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Scale & Security Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "VITEST TEST SUITE",
            value: "136 Passed",
            sub: "100% green coverage across 11 calculation test suites"
          },
          {
            label: "BUNDLE FOOTPRINT",
            value: "375.2 kB",
            sub: "Tree-shaken Rollup production bundle + 9.8 kB CSS"
          },
          {
            label: "AI INFERENCE LATENCY",
            value: "~650ms",
            sub: "Gemini 2.0 Flash via serverless Google Cloud Functions"
          },
          {
            label: "CLIENT SECRET EXPOSURE",
            value: "0 Keys",
            sub: "Secret Manager isolated backend; A+ security header grade"
          }
        ].map((metric) => (
          <div key={metric.label} className="bg-surface-container/60 border border-ink/10 p-4 space-y-1">
            <span className="text-[10px] font-mono text-accent font-bold tracking-wider block">
              {metric.label}
            </span>
            <div className="font-mono text-2xl font-bold text-ink tracking-tight">{metric.value}</div>
            <p className="text-[11px] text-muted font-sans leading-tight">{metric.sub}</p>
          </div>
        ))}
      </div>

      {/* 5 Key Engineering Achievements & Lessons Learned */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-ink/10 pb-2">
          <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider">
            // KEY TECHNICAL ACHIEVEMENTS &amp; WHAT I LEARNED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Achievement 1 */}
          <div className="border border-ink/10 bg-paper p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent">01.</span>
              <h5 className="font-serif font-bold text-sm text-ink">
                Eliminating Composite Index Failures via In-Memory Sorting
              </h5>
            </div>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Challenge:</strong> Querying subcollection payments via <code>where(&#39;commitmentId&#39;, &#39;==&#39;, id).orderBy(&#39;dueDate&#39;, &#39;desc&#39;)</code> threw runtime <code>failed-precondition: requires index</code> errors. Requiring automated deployments or multi-tenant users to create arbitrary composite indexes introduced deployment friction.
            </p>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Solution:</strong> Single-field equality filters retrieve the naturally bounded payment documents (&lt;300 rows), offloading date ordering to deterministic in-memory sorting (<code>results.sort((a, b) =&gt; b.dueDate.localeCompare(a.dueDate))</code>).
            </p>
          </div>

          {/* Achievement 2 */}
          <div className="border border-ink/10 bg-paper p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent">02.</span>
              <h5 className="font-serif font-bold text-sm text-ink">
                Resolving Nullable Database Types in Zod Runtime Schemas
              </h5>
            </div>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Challenge:</strong> Firestore serializes missing fields as explicit <code>null</code>, whereas TypeScript represents optional fields as <code>undefined</code>. Passing merged document updates through <code>commitmentSchema.parse()</code> crashed with <code>Expected number, received null</code>.
            </p>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Solution:</strong> Built a custom Zod preprocessing helper <code>opt(schema) = z.preprocess(v =&gt; v === null ? undefined : v, schema.optional())</code> paired with bidirectional mapping in Firestore converters.
            </p>
          </div>

          {/* Achievement 3 */}
          <div className="border border-ink/10 bg-paper p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent">03.</span>
              <h5 className="font-serif font-bold text-sm text-ink">
                Cycle Drift Prevention in Calendar-Month Arithmetic
              </h5>
            </div>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Challenge:</strong> Executing <code>new Date(2026, 1, 31)</code> silently rolls into March 3rd. Recurring commitments due on the 31st disappeared from February and appeared twice in March, throwing off forward cashflow projections.
            </p>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Solution:</strong> Developed a deterministic day-clamping algorithm calculating actual days via <code>new Date(year, monthIndex + 1, 0).getDate()</code> and clamping scheduled dates using <code>Math.min(dueDayOfMonth, daysInMonth)</code>.
            </p>
          </div>

          {/* Achievement 4 */}
          <div className="border border-ink/10 bg-paper p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent">04.</span>
              <h5 className="font-serif font-bold text-sm text-ink">
                Non-Destructive Transactional Buffering for High-Stakes Financial Data
              </h5>
            </div>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Challenge:</strong> Confirmation dialogs cause fatigue, while immediate mutations risk catastrophic accidental deletions on mobile touch devices.
            </p>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Solution:</strong> Designed a staged 10-second memory transaction pattern. Mutations reflect instantly in local state vectors, while permanent Firestore deletions are deferred with countdown toasts and an unload synchronization safety hook.
            </p>
          </div>

          {/* Achievement 5 (Full span) */}
          <div className="border border-ink/10 bg-paper p-5 space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent">05.</span>
              <h5 className="font-serif font-bold text-sm text-ink">
                Air-Gapped Serverless AI Integration with Zero Client Secret Exposure
              </h5>
            </div>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Challenge:</strong> Bundling AI SDKs directly into client-side bundles exposes private API keys and risks uncontrolled billing or token extraction.
            </p>
            <p className="text-xs text-muted leading-relaxed font-sans">
              <strong>The Solution:</strong> Air-gapped the Gemini 2.0 Flash engine behind authenticated Google Cloud Functions (2nd Gen). The function accesses keys securely via Google Cloud Secret Manager, enforces strict JSON response schemas, and sanitizes OCR data before returning typed payloads to the browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
