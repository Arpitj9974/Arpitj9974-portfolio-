import React, { useState, useEffect } from "react";
import { 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  Database, 
  Cpu, 
  Layers, 
  ShieldCheck
} from "lucide-react";
import { playClick, playSuccess, playToggle } from "../utils/soundEngine";

interface PipelineNode {
  id: string;
  name: string;
  stage: string;
  description: string;
  latencyBudget: string;
  icon: React.ReactNode;
}

const NODES: PipelineNode[] = [
  {
    id: "ingestion",
    name: "Ingestion Gateway",
    stage: "01 // CLIENT DISBURSEMENT",
    description: "Accepts high-concurrency borrower loan applications & bulk reconciliation batches.",
    latencyBudget: "< 12ms",
    icon: <Layers size={18} className="text-accent" />
  },
  {
    id: "validation",
    name: "Rule Validation Engine",
    stage: "02 // RISK & BUREAU CHECK",
    description: "Validates debt-to-income, CIBIL bureau scoring, deduplication, and regulatory mandates.",
    latencyBudget: "< 24ms",
    icon: <ShieldCheck size={18} className="text-accent" />
  },
  {
    id: "ledger",
    name: "Amortization State Vector",
    stage: "03 // DUAL-LEDGER MATH",
    description: "Computes reducing-balance EMI schedules, interest-to-principal splits, and ledger entries.",
    latencyBudget: "< 18ms",
    icon: <Cpu size={18} className="text-accent" />
  },
  {
    id: "persistence",
    name: "Persistence & Audit Log",
    stage: "04 // CRYPTOGRAPHIC AUDIT",
    description: "Commits to immutable SQL storage, creates audit trails, and emits real-time telemetry.",
    latencyBudget: "< 15ms",
    icon: <Database size={18} className="text-accent" />
  }
];

export default function ArchitectureSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [meanLatency, setMeanLatency] = useState(17.8);
  const [discrepancies, setDiscrepancies] = useState(0);
  const [faultInjected, setFaultInjected] = useState(false);
  const [rollbackTriggered, setRollbackTriggered] = useState(false);

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
          <span>FINOPS TRANSACTION PIPELINE // 4-STAGE ARCHITECTURE</span>
          <span className="text-accent font-bold">
            {isRunning ? "STREAMING ACTIVE" : rollbackTriggered ? "PIPELINE DISARMED" : "SYSTEM STANDBY"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {NODES.map((node, idx) => {
            const isNodeActive = isRunning && processedCount > (idx * 250);
            
            return (
              <div
                key={node.id}
                className="p-4 border border-ink/10 bg-paper transition-all relative flex flex-col justify-between"
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
                  <span className="text-muted uppercase text-[9px]">
                    {rollbackTriggered && idx === 3
                      ? "DROPPED"
                      : isNodeActive
                        ? "PROCESSING"
                        : "READY"}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${
                    rollbackTriggered && idx === 3
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
    </section>
  );
}
