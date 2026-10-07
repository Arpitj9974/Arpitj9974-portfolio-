import React from "react";
import {
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Calendar,
  Terminal,
  Activity,
  Server,
  BookOpen,
  Sparkles,
  BarChart3,
  Search,
  Clock,
  Compass
} from "lucide-react";

export default function AspirantFlowDeepDive() {
  return (
    <div className="border-t border-ink/10 pt-10 space-y-12 animate-fade-in font-sans">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-accent tracking-widest block uppercase font-bold">
            // EDTECH SYSTEMS ARCHITECTURE &amp; MULTI-EXAM OFFLINE PWA
          </span>
          <span className="bg-accent/10 text-accent font-mono text-[10px] px-2 py-0.5 font-bold uppercase rounded-xs">
            PRODUCTION v2.6.0
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
          Deep-Dive: Cross-Exam Syllabus Deduplication, Generic Runtime &amp; Offline PWA Engine
        </h2>
        <p className="text-sm text-muted max-w-4xl leading-relaxed">
          AspirantFlow (ArpitPrep Hub) is an enterprise-grade Progressive Web Application (PWA) architected to track, schedule, and analyze preparation across 101+ national and state-level competitive exams. Built on a zero-overhead vanilla JavaScript (ES6+) architecture, it features cross-exam syllabus deduplication (&quot;study once, benefit everywhere&quot;), specification-driven generic dashboard dispatching, resilient offline-first cloud synchronization, multi-horizon planning (ISO 8601), and zero-flicker pre-render layout guards (CLS 0.0).
        </p>
      </div>

      {/* High-Level Architecture Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Live Exams Supported", value: "101+ Exams", sub: "15 Master Domains", icon: Compass },
          { label: "Dashboards Powered", value: "117 Hubs", sub: "1 Generic DASH_SPEC Engine", icon: Layers },
          { label: "Syllabus Deduplication", value: "Shared Keys", sub: "qt3_, rs3_, en_, cdf_", icon: Sparkles },
          { label: "Offline PWA Cache", value: "Cache v58", sub: "220+ Precached Assets", icon: Zap },
          { label: "Sync Timeout Guard", value: "5000ms", sub: "Promise.race Circuit Breaker", icon: ShieldCheck },
          { label: "Initial Layout Shift", value: "CLS 0.0", sub: "Synchronous Head Pre-Render", icon: Activity }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-surface-container/60 border border-ink/10 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-accent">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted">{item.label}</span>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="font-serif font-bold text-ink text-base md:text-lg">{item.value}</div>
              <div className="text-[10px] font-mono text-muted">{item.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Block 1: Cross-Exam Syllabus Deduplication */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">STATE DEDUPLICATION</span>
            <h4 className="font-serif font-bold text-lg text-ink">Cross-Exam Syllabus Deduplication Engine</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Multi-exam aspirants (e.g. studying simultaneously for IBPS PO, SSC CGL, RRB NTPC, and TCS NQT) face intense cognitive fatigue re-marking identical mathematical and reasoning chapters across disconnected spreadsheets. AspirantFlow models examination curricula as an interconnected knowledge graph with hierarchical namespacing:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono border-collapse text-ink">
              <thead>
                <tr className="border-b border-ink/10 text-muted uppercase">
                  <th className="text-left py-1">Prefix Namespace</th>
                  <th className="text-left py-1">Subject Scope</th>
                  <th className="text-right py-1">Intersecting Exams</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink/5">
                  <td className="py-1 font-bold text-accent">qt3_*</td>
                  <td className="py-1 text-muted text-[10px]">Quantitative Aptitude (Number Systems, DI, Algebra)</td>
                  <td className="text-right font-bold">SBI, SSC, RRB, TCS</td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="py-1 font-bold text-accent">rs3_*</td>
                  <td className="py-1 text-muted text-[10px]">Logical &amp; Analytical Reasoning (Syllogisms, Puzzles)</td>
                  <td className="text-right font-bold">IBPS, CGL, NTPC, Placement</td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="py-1 font-bold text-accent">en_*</td>
                  <td className="py-1 text-muted text-[10px]">Verbal Ability, Reading Comprehension, Grammar</td>
                  <td className="text-right font-bold">Banking, SSC, CAT, NQT</td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="py-1 font-bold text-accent">cdf_*</td>
                  <td className="py-1 text-muted text-[10px]">Core Coding &amp; Data Structures (Placement Tracks)</td>
                  <td className="text-right font-bold">TCS, Infosys, Accenture</td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="py-1 font-bold text-accent">sbiso_pk_*</td>
                  <td className="py-1 text-muted text-[10px]">Specialized Domain (SBI Specialist Officer IT)</td>
                  <td className="text-right font-bold">Isolated Domain Spec</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted leading-relaxed">
            Marking a chapter as Mastered in TCS NQT dispatches global storage events that instantly hydrate SSC CGL and IBPS PO dashboards, realizing the architectural vision: <em>&quot;Study once, benefit everywhere.&quot;</em>
          </p>
        </div>

        {/* Block 2: Specification-Driven Generic Dashboard Architecture */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">API CONTRACT</span>
            <h4 className="font-serif font-bold text-lg text-ink">Specification-Driven Generic Architecture</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Supporting 101+ competitive exams across 15 domains risked creating over 117 duplicate dashboard scripts. I decoupled presentation from configuration, replacing 30,000+ lines of duplicate logic with a single 170-line runtime engine (<code className="text-accent">dashboard-generic.js</code>) driven by <code className="text-accent">window.DASH_SPEC</code>:
          </p>
          <pre className="text-[10px] font-mono bg-paper p-3 border border-ink/5 overflow-x-auto text-ink">
{`window.DASH_SPEC = {
  examKey: "sbi_po",
  title: "SBI Probationary Officer",
  category: "Banking",
  targetDateKey: "target_sbi_po",
  subjects: [
    { name: "Quantitative Aptitude", prefix: "qt3_", total: 32 },
    { name: "Reasoning Ability", prefix: "rs3_", total: 28 },
    { name: "English Language", prefix: "en_", total: 24 }
  ],
  variants: [{ id: "prelims", label: "Phase 1: Prelims" }]
};`}
          </pre>
          <div className="text-[11px] text-muted space-y-1">
            <div className="font-bold text-ink">15 Master Domain Categories Standardized:</div>
            <div className="text-[10px] leading-relaxed">
              Banking &amp; Insurance (18+ exams), Civil Services / UPSC (12+), Staff Selection / SSC (8+), Railways / RRB (6+), Engineering Entrances / JEE &amp; GATE (10+), Medical / NEET (6+), Management / CAT (8+), Law / CLAT (6+), Defense (8+), Corporate Placement (8+), Teaching, Regulatory, State Police, Nursing, and Pharmacy.
            </div>
          </div>
        </div>

        {/* Block 3: Timeout-Guarded Bi-Directional Cloud Synchronization */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">DISTRIBUTED RESILIENCE</span>
            <h4 className="font-serif font-bold text-lg text-ink">Timeout-Safe Cloud Sync (5000ms Ceiling)</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            In basement libraries and mobile transit, standard Firestore queries stall indefinitely on spotty networks. All cloud writes are wrapped in a defensive 5000ms circuit breaker:
          </p>
          <pre className="text-[10px] font-mono bg-paper p-3 border border-ink/5 overflow-x-auto text-ink">
{`function runWithTimeout(promise, errorMsg) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(errorMsg)), 5000)
    )
  ]);
}`}
          </pre>
          <ul className="space-y-2 text-xs font-mono text-ink">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Optimistic Sub-16ms Local Updates:</span>
                <span className="text-muted block text-[11px]">Checkmarks mutate localStorage instantly and schedule asynchronous cloud sync in the background.</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Timestamp Conflict Resolution:</span>
                <span className="text-muted block text-[11px]">Real-time onSnapshot delta listener compares todosUpdatedAt epoch integers to guarantee recent offline edits supersede older remote snapshots.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Block 4: Zero-Flicker Layout & View State Engine */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">WEB VITALS</span>
            <h4 className="font-serif font-bold text-lg text-ink">Zero-Flicker Pre-Render Architecture (CLS 0.0)</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Client-side preferences (such as toggling between &quot;Active Prep Track&quot; and &quot;All 101 Exams&quot;) frequently cause Flash of Unstyled Content (FOUC) or jarring Cumulative Layout Shift when loaded inside DOMContentLoaded listeners.
          </p>
          <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-2 rounded text-xs font-mono text-ink">
            <div className="font-bold text-accent">// SYNCHRONOUS HEAD-LEVEL PRE-RENDER INVOCATION</div>
            <p className="text-[11px] text-muted leading-relaxed">
              An inline IIFE located directly inside the document &lt;head&gt; inspects <code>localStorage.getItem(&apos;activeExams&apos;)</code> and URL parameters <em>before</em> the browser begins constructing the DOM body.
            </p>
            <p className="text-[11px] text-muted leading-relaxed">
              Synchronously attaching <code>init-preptrack</code> or <code>init-all-exams</code> to <code>document.documentElement</code> enforces scoped CSS display rules before the first paint, guaranteeing a 0.0 Cumulative Layout Shift score.
            </p>
          </div>
          <p className="text-[11px] text-muted">
            This mirrors architectural techniques utilized by Next.js and GitHub to enforce flicker-free theme initialization and authenticated layout guards without server-side rendering delays.
          </p>
        </div>

        {/* Block 5: Multi-Horizon Study Scheduler & Mock Analytics */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">STUDY TELEMETRY</span>
            <h4 className="font-serif font-bold text-lg text-ink">Multi-Horizon Planner &amp; Mock Analytics</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Competitive exam success requires bridging long-term exam countdowns with daily micro-habits. AspirantFlow incorporates two specialized analytical engines:
          </p>
          <ul className="space-y-3 text-xs font-mono text-ink">
            <li className="flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">AspirantPlanner (4-Horizon Scoping):</span>
                <span className="text-muted block text-[11px] leading-normal">
                  Structures preparation across Daily (date-specific), Weekly (ISO 8601 calendar integer), Monthly, and Yearly horizons. Features 50-day and 100-day recurring sprint countdowns linked directly to exam milestones.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Full-Length Mock Test Telemetry:</span>
                <span className="text-muted block text-[11px] leading-normal">
                  Logs practice exams (<code className="text-accent">mocks_${`{examKey}`}</code>) capturing Test Date, Marks, Accuracy %, Percentile, and Revision Notes. Automatically renders score velocity timelines and cohort averages.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Block 6: Role-Based Admin Telemetry & Static Audit Harness */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">QUALITY ENGINEERING</span>
            <h4 className="font-serif font-bold text-lg text-ink">Admin Telemetry &amp; 26-Script Verification Suite</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Maintaining a codebase of 384 files, 223 HTML documents, and 103 curriculum schemas requires production-grade observability and static analysis:
          </p>
          <ul className="space-y-3 text-xs font-mono text-ink">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Role-Based Admin Telemetry (admin.html):</span>
                <span className="text-muted block text-[11px] leading-normal">
                  Secured via declarative Firestore rules whitelisting administrative emails. Monitors real-time platform adoption, active 24-hour learners, and aggregate chapter drop-off heatmaps.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Terminal className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">26 Automated Node.js Verification Suites:</span>
                <span className="text-muted block text-[11px] leading-normal">
                  Custom static analysis scripts parse all 223 HTML documents, verifying script/CSS paths on disk, validating JavaScript syntax (<code className="text-accent">node -c</code>), and ensuring 100% sync prefix whitelist compliance.
                </span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* System Topology Diagram */}
      <div className="border border-ink/10 bg-surface-container/40 p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono text-accent font-bold uppercase">// SYSTEM TOPOLOGY: OFFLINE-FIRST PWA RUNTIME TO CLOUD SYNC</span>
          <span className="text-[10px] font-mono text-muted">384 FILES · 223 HTML DOCS · ZERO BACKEND INFRASTRUCTURE COST</span>
        </div>
        <div className="bg-paper border border-ink/10 p-4 font-mono text-[11px] leading-relaxed overflow-x-auto text-ink">
          <pre className="whitespace-pre">
{`+----------------------------------------------------------------------------------------------------+
|                                      CLIENT BROWSER RUNTIME                                        |
|                                                                                                    |
|  +------------------------+   +------------------------------------+   +------------------------+  |
|  |     Main Hub View      |   |       Modular Exam Dashboards      |   |   Interactive Subject  |  |
|  |      (index.html)      |   |   (dashboards/*/*.html + generic)  |   |         Trackers       |  |
|  +-----------+------------+   +-----------------+------------------+   +-----------+------------+  |
|              |                                  |                                  |               |
|              +----------------------------------+----------------------------------+               |
|                                                 |                                                  |
|                                                 v                                                  |
|                        +------------------------------------------------+                          |
|                        |             GLOBAL APPLICATION BUS             |                          |
|                        |        (assets/nav.js & Custom Events)         |                          |
|                        |  - Omnibox Search (Ctrl+K)   - Modal Engine    |                          |
|                        |  - Clean History Replace     - Toast System    |                          |
|                        +------------------------+-----------------------+                          |
|                                                 |                                                  |
|                    +----------------------------+----------------------------+                     |
|                    v                                                         v                     |
|  +-----------------------------------+                     +------------------------------------+  |
|  |         LOCAL STATE ENGINE        |                     |      OFFLINE SERVICE WORKER        |  |
|  |           (localStorage)          |                     |              (sw.js)               |  |
|  |  - Chapter Keys (qt3_*, ssc_*)    |                     |  - Precache Engine (v58)           |  |
|  |  - Active Prep Configs            |                     |  - Network-First for HTML          |  |
|  |  - AspirantPlanner To-Do Store    |                     |  - Stale-While-Revalidate Assets   |  |
|  +-----------------+-----------------+                     +------------------------------------+  |
|                    |                                                                               |
|                    v                                                                               |
|  +-----------------------------------------------------------------------------------------------+ |
|  |                         CLOUD HYDRATION & BIDIRECTIONAL SYNC ENGINE                           | |
|  |                                    (assets/auth-sync.js)                                      | |
|  |  - runWithTimeout() 5s Circuit Breaker          - Real-Time onSnapshot() Listener             | |
|  |  - Prefix Key Validator (isValidKey)            - Timestamp Conflict Resolver (todosUpdatedAt)| |
|  +------------------------------------------------+----------------------------------------------+ |
+---------------------------------------------------|------------------------------------------------+
                                                    | HTTPS / WebSockets
                                                    v
+----------------------------------------------------------------------------------------------------+
|                                    GOOGLE CLOUD FIREBASE PLATFORM                                  |
|                                                                                                    |
|  +--------------------------------------------------+  +----------------------------------------+  |
|  |             FIREBASE AUTHENTICATION              |  |         CLOUD FIRESTORE NOSQL          |  |
|  |  - Google OAuth 2.0 Identity Provider            |  |  - Collection: users/{uid}             |  |
|  |  - Email / Password Credential Store             |  |  - Document Tree:                      |  |
|  |  - onAuthStateChanged Token Observer             |  |      { profile, progress, todos,       |  |
|  +--------------------------------------------------+  |        activeExams, mocks, targetDates }|  |
|                                                        +-------------------+--------------------+  |
|                                                                            |                       |
|                                                        +-------------------+--------------------+  |
|                                                        |       FIRESTORE SECURITY RULES         |  |
|                                                        |  - Read/Write: request.auth.uid == uid |  |
|                                                        |  - Admin Read: request.auth.token.email|  |
|                                                        +----------------------------------------+  |
+----------------------------------------------------------------------------------------------------+`}
          </pre>
        </div>
      </div>

      {/* Production Scale & Audit Table */}
      <div className="border border-ink/10 bg-surface-container/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-accent font-bold uppercase">// PRODUCTION SCALE &amp; STATIC AUDIT METRICS</span>
          <span className="text-[10px] font-mono text-muted">VERIFIED ACROSS 223 HTML FILES · 0 DEFECTS</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: "Total Codebase Files", value: "384 Files" },
            { label: "HTML Documents", value: "223 Pages" },
            { label: "JavaScript Source Files", value: "144 Modules" },
            { label: "Exam Data Schemas", value: "103 Models" },
            { label: "Interactive Trackers", value: "111 Checklists" },
            { label: "Exam Dashboards", value: "117 Hubs" },
            { label: "Precached Assets", value: "220+ Files" },
            { label: "Audit Verification Suites", value: "26 Scripts" }
          ].map((item, idx) => (
            <div key={idx} className="bg-paper border border-ink/10 p-3 space-y-0.5">
              <div className="text-[10px] font-mono text-muted uppercase tracking-wider">{item.label}</div>
              <div className="font-serif font-bold text-ink text-base">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
