import React, { useState } from "react";
import { DollarSign, ShieldCheck, Clock, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, BarChart2, Layers } from "lucide-react";

export default function JDFinanceDeepDive() {
  // Simulator State
  const [portfolioSize, setPortfolioSize] = useState<number>(2500000); // 25 Lakhs
  const [expectedDaily, setExpectedDaily] = useState<number>(85000);
  const [actualCollected, setActualCollected] = useState<number>(85000);
  const [delinquentCount, setDelinquentCount] = useState<number>(3);

  const delta = actualCollected - expectedDaily;
  const isBalanced = delta === 0;
  const collectionEfficiency = ((actualCollected / expectedDaily) * 100).toFixed(1);

  return (
    <div className="border-t border-ink/10 pt-10 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-accent tracking-widest block uppercase">// FINOPS OPERATIONAL BLUEPRINT</span>
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
          Deep-Dive: Lending Operations & Zero-Defect Data Infrastructure
        </h2>
        <p className="text-sm text-muted max-w-3xl leading-relaxed">
          Running credit operations at <strong>JD Finance</strong> across 4+ years required solving real unit economics, human collection workflows, and liquidity management. Below is an interactive model of the daily cash reconciliation engine and data architecture that replaced manual paper registers.
        </p>
      </div>

      {/* INTERACTIVE SIMULATOR: Daily Close & Cash Reconciliation Engine */}
      <div className="bg-surface-container/70 border border-ink/10 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2.5 py-1 font-bold flex items-center gap-1.5">
              <RefreshCw size={12} className="animate-spin text-accent" />
              INTERACTIVE FINOPS SIMULATOR
            </span>
            <h3 className="font-serif font-bold text-lg text-ink">Daily Evening Cash Reconciliation</h3>
          </div>
          <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
            Simulate Ledger Balancing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">Active Loan Portfolio:</span>
                <span className="font-bold text-ink">₹{portfolioSize.toLocaleString("en-IN")}</span>
              </div>
              <input 
                type="range" 
                min={1000000} 
                max={5000000} 
                step={250000} 
                value={portfolioSize} 
                onChange={(e) => setPortfolioSize(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">Expected Scheduled Collection (Today):</span>
                <span className="font-bold text-ink">₹{expectedDaily.toLocaleString("en-IN")}</span>
              </div>
              <input 
                type="range" 
                min={30000} 
                max={150000} 
                step={5000} 
                value={expectedDaily} 
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setExpectedDaily(val);
                  setActualCollected(val); // default sync
                }}
                className="w-full accent-accent cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">Physical Field Cash Collected:</span>
                <span className={`font-bold ${isBalanced ? "text-accent" : "text-amber-500"}`}>
                  ₹{actualCollected.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={actualCollected} 
                  onChange={(e) => setActualCollected(Number(e.target.value))}
                  className="w-full bg-paper border border-ink/15 px-3 py-1.5 font-mono text-xs text-ink focus:outline-none focus:border-accent"
                />
                <button 
                  onClick={() => setActualCollected(expectedDaily)}
                  className="px-3 py-1 bg-surface-container hover:bg-ink hover:text-paper border border-ink/10 text-[11px] font-mono cursor-pointer whitespace-nowrap transition-colors"
                >
                  Balance Exact
                </button>
                <button 
                  onClick={() => setActualCollected(expectedDaily - 2500)}
                  className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500 hover:text-white border border-amber-500/30 text-amber-600 text-[11px] font-mono cursor-pointer whitespace-nowrap transition-colors"
                >
                  Simulate Shortfall
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">Accounts Flagged Day 3+ Past Due:</span>
                <span className="font-bold text-ink">{delinquentCount} borrowers</span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={12} 
                step={1} 
                value={delinquentCount} 
                onChange={(e) => setDelinquentCount(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>
          </div>

          {/* Results Audit Panel */}
          <div className="bg-paper border border-ink/10 p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono border-b border-ink/10 pb-2">
                <span className="text-muted">AUDIT STATUS:</span>
                {isBalanced ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 size={13} /> 100% RECONCILED (ZERO DELTA)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                    <AlertTriangle size={13} /> DISCREPANCY DETECTED
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-surface-container p-3 border border-ink/5">
                  <span className="text-muted block text-[10px] uppercase">Reconciliation Delta</span>
                  <span className={`text-base font-bold ${isBalanced ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {delta >= 0 ? `+₹${delta.toLocaleString("en-IN")}` : `-₹${Math.abs(delta).toLocaleString("en-IN")}`}
                  </span>
                </div>
                <div className="bg-surface-container p-3 border border-ink/5">
                  <span className="text-muted block text-[10px] uppercase">Collection Rate</span>
                  <span className="text-base font-bold text-ink">{collectionEfficiency}%</span>
                </div>
              </div>

              <div className="text-xs font-mono p-3 bg-surface-container/50 border border-ink/5 space-y-1">
                <span className="text-accent font-bold block">// SYSTEM RECONCILIATION LOGIC:</span>
                <p className="text-[11px] text-muted font-sans leading-relaxed">
                  {isBalanced 
                    ? "Physical cash matches expected schedule down to the exact rupee. Closing ledger signed off in under 15 minutes."
                    : `Discrepancy of ₹${Math.abs(delta).toLocaleString("en-IN")} detected between field collection and scheduled dues. Highlighting collection agent batch for immediate audit.`}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-ink/10 flex justify-between items-center text-[10px] font-mono text-muted">
              <span>LEDGER INTEGRITY: 100%</span>
              <span className="text-accent font-bold">JD FINANCE ENGINE v4.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* BEFORE VS AFTER: Process Re-engineering Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-500/5 border border-amber-500/20 p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>BEFORE: 2021 MANUAL OPERATIONS (PAPER REGISTERS)</span>
          </div>
          <ul className="space-y-2.5 text-xs text-muted font-sans leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Fragmented Recordkeeping:</strong> Daily repayments written across physical notebooks and handwritten slips.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>90-Minute Evening Close:</strong> Partners spent 1.5+ hours manually cross-checking physical cash against notebook entries.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Delayed Risk Discovery:</strong> Defaulting borrowers were only identified 30–45 days after missed payments, increasing bad-debt loss.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Frequent Calculation Errors:</strong> Varying loan tenures and reducing balances caused chronic interest discrepancies.</span>
            </li>
          </ul>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>AFTER: STRUCTURED DATA &amp; AUTOMATION INFRASTRUCTURE (ARPIT'S SYSTEM)</span>
          </div>
          <ul className="space-y-2.5 text-xs text-muted font-sans leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
              <span><strong>Unified Relational Architecture:</strong> Master Loan Ledger linking borrower KYC, disbursements, and atomic repayment logs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
              <span><strong>15-Minute Daily Close (-80% Time):</strong> Automated formulas verify collected cash against expected dues to the exact rupee.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
              <span><strong>Day 3 Early-Warning Matrix:</strong> High-risk accounts flagged on Day 3 of non-payment for immediate, proactive field resolution.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
              <span><strong>4+ Years Operational Continuity:</strong> Zero server costs, zero software fees, still the operational backbone of the business.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3 CORE ARCHITECTURAL LAYERS */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-ink">
          The 3 Structural Layers of the FinOps System
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container border border-ink/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent">
              <Layers size={14} />
              <span>LAYER 01 // LOAN LIFECYCLE</span>
            </div>
            <h4 className="font-serif font-bold text-sm text-ink">Master Portfolio Ledger</h4>
            <p className="text-xs text-muted leading-relaxed font-sans">
              Maintains complete borrower records, principal disbursement timestamps, amortized interest schedules, and real-time outstanding balances.
            </p>
          </div>

          <div className="bg-surface-container border border-ink/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent">
              <RefreshCw size={14} />
              <span>LAYER 02 // DAILY CASH RECON</span>
            </div>
            <h4 className="font-serif font-bold text-sm text-ink">Zero-Defect Balancing Engine</h4>
            <p className="text-xs text-muted leading-relaxed font-sans">
              Compares physical cash collected against expected collections across field agents with zero tolerance, instantly flagging shortfalls before the daily close.
            </p>
          </div>

          <div className="bg-surface-container border border-ink/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent">
              <BarChart2 size={14} />
              <span>LAYER 03 // RISK AGING MATRIX</span>
            </div>
            <h4 className="font-serif font-bold text-sm text-ink">Delinquency Early Warning</h4>
            <p className="text-xs text-muted leading-relaxed font-sans">
              Classifies borrowers into Current, 1-3 Days Overdue, and Default stages, empowering partners to intervene proactively and preserve capital.
            </p>
          </div>
        </div>
      </div>

      {/* 2021 vs 2025 Evolution Banner */}
      <div className="p-6 border border-accent/20 bg-accent/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">// 2025 MODERNIZATION PHASE</span>
          <h4 className="font-serif text-lg font-bold text-ink">From Structured Excel to Automated Workflows</h4>
          <p className="text-xs text-muted font-sans max-w-2xl leading-relaxed">
            Returning in 2025 to lead the financial operations again, Arpit introduced Google Apps Script web triggers and automated WhatsApp payment reminder pipelines to eliminate remaining manual data entry.
          </p>
        </div>
        <div className="shrink-0 font-mono text-xs text-ink font-bold px-3 py-1.5 bg-paper border border-ink/10">
          STATUS: IN ACTIVE PRODUCTION
        </div>
      </div>
    </div>
  );
}
