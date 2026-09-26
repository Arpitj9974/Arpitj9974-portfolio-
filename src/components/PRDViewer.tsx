import React, { useState } from "react";
import { PRDSpec, PRD_DATA } from "../prdData";
import { Project } from "../types";
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Layers, 
  Users, 
  Database, 
  TrendingUp,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

interface PRDViewerProps {
  project: Project;
  onBackToCaseStudy: () => void;
}

export default function PRDViewer({ project, onBackToCaseStudy }: PRDViewerProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "P0" | "P1" | "P2">("all");

  // Get custom PRD or build fallback PRD from project data
  const prd: PRDSpec = 
    PRD_DATA[project.id] || 
    PRD_DATA[project.id.toLowerCase()] || 
    (project.id === "study-tracker-aj" ? PRD_DATA["aspirantflow"] : undefined) || {
    projectId: project.id,
    docId: `PRD-${project.category.substring(0, 3).toUpperCase()}-00${project.id.length}`,
    version: "v1.0",
    status: "SHIPPED & LIVE",
    title: `${project.title} — Product Requirement & Architecture Spec`,
    author: "Arpit Jaiswal (Product & Systems)",
    targetUsers: `${project.category} stakeholders and end-users`,
    lastUpdated: "2026",
    executiveSummary: project.longDescription || project.description,
    rootCauseAnalysis: [
      project.problem || "Operational friction in legacy workflows caused significant delay and manual data entry overhead.",
      "Lack of structured digital validation led to data inconsistency across distributed environments.",
      "Users lacked an automated, responsive interface to manage and audit real-time system changes."
    ],
    primaryPersona: {
      name: "Domain Practitioner",
      role: `Primary Operator (${project.category})`,
      context: "Responsible for executing day-to-day operations under tight time constraints.",
      jtbd: `When executing daily ${project.category.toLowerCase()} tasks, I need automated, reliable tooling to eliminate manual friction and maintain data integrity.`
    },
    requirements: [
      {
        priority: "P0",
        title: "Core Workflow Automation Engine",
        spec: project.solution || "Client-side state management binding directly to persistent storage with optimistic updates.",
        acceptanceCriteria: "Zero data loss and instantaneous UI updates under all nominal operating conditions."
      },
      {
        priority: "P1",
        title: "Real-Time Telemetry & Impact Auditing",
        spec: "Calculates live operational metrics to provide immediate feedback on system state.",
        acceptanceCriteria: "Reflects changes in <100ms with clear visual indicators."
      },
      {
        priority: "P2",
        title: "Export & Reporting Module",
        spec: "Structured data export for integration with external stakeholder reporting.",
        acceptanceCriteria: "Standardized formatting compatible with enterprise reporting tools."
      }
    ],
    dataArchitecture: {
      entities: [
        {
          name: "CoreRecord",
          description: "Primary transactional entity",
          fields: ["id", "createdAt", "status", "metadata", "payload"]
        },
        {
          name: "AuditLog",
          description: "Chronological operational event history",
          fields: ["id", "recordId", "actionType", "timestamp", "userId"]
        }
      ],
      syncStrategy: "Optimistic local state -> Validated schema validation -> Persistent storage."
    },
    edgeCases: [
      {
        scenario: "Intermittent network drop during state transition",
        operationalRisk: "Discrepancy between client view and backing store.",
        systemResolution: "Local caching with automated re-synchronization on network recovery."
      },
      {
        scenario: "Malformed input payload",
        operationalRisk: "Corrupted database records or calculation crash.",
        systemResolution: "Strict TypeScript type-guards and client-side sanitization."
      }
    ],
    kpiMetrics: (project.impactStats || [
      { label: "Operational Speedup", value: "40%+" },
      { label: "Data Integrity", value: "99.9%" }
    ]).map(stat => ({
      label: stat.label,
      metric: stat.value,
      businessImpact: "Direct operational efficiency improvement measured post-deployment."
    }))
  };

  const filteredRequirements = activeTab === "all" 
    ? prd.requirements 
    : prd.requirements.filter(r => r.priority === activeTab);

  const handleCopySummary = () => {
    const summaryText = `[${prd.docId}] ${prd.title}
Status: ${prd.status} | Author: ${prd.author} | Version: ${prd.version}

EXECUTIVE SUMMARY:
${prd.executiveSummary}

PRIMARY USER PERSONA & JTBD:
${prd.primaryPersona.role} (${prd.primaryPersona.name})
JTBD: "${prd.primaryPersona.jtbd}"

KEY REQUIREMENTS:
${prd.requirements.map(r => `- [${r.priority}] ${r.title}: ${r.spec}`).join("\n")}

MEASURED BUSINESS IMPACT:
${prd.kpiMetrics.map(k => `- ${k.label}: ${k.metric} (${k.businessImpact})`).join("\n")}
`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* Document Meta Header (Styled like an Executive PRD) */}
      <div className="border border-ink/15 bg-paper p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-ink/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-ink text-paper font-mono font-bold text-[10px] px-2 py-0.5 tracking-wider">
                {prd.docId}
              </span>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-[10px] px-2 py-0.5 tracking-wider uppercase flex items-center gap-1">
                <CheckCircle2 size={11} />
                {prd.status}
              </span>
              <span className="text-muted font-mono text-xs">
                Version {prd.version} · Updated {prd.lastUpdated}
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight pt-1">
              {prd.title}
            </h1>
            <p className="text-xs font-mono text-muted">
              AUTHOR: <strong className="text-ink">{prd.author}</strong> · AUDIENCE: <strong>{prd.targetUsers}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleCopySummary}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3.5 py-2 border border-ink/20 hover:border-accent hover:text-accent text-xs font-mono font-bold transition-all cursor-pointer bg-surface-container"
              title="Copy PRD Summary"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copied ? "COPIED PRD!" : "COPY PRD SUMMARY"}</span>
            </button>
            <button
              onClick={onBackToCaseStudy}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-ink text-paper hover:bg-accent text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              <span>CASE STUDY VIEW</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE SUMMARY & ROOT CAUSE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
              <FileText size={13} />
              <span>1.0 / Executive Problem Statement</span>
            </div>
            <p className="text-xs md:text-sm text-ink leading-relaxed font-sans">
              {prd.executiveSummary}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-3 bg-surface-container/60 p-5 border border-ink/10">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink uppercase tracking-wider">
              <AlertCircle size={13} className="text-accent" />
              <span>Root Cause Analysis (Operational Friction)</span>
            </div>
            <ul className="space-y-2 text-xs text-muted font-sans">
              {prd.rootCauseAnalysis.map((rc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent font-mono font-bold shrink-0">1.{idx + 1}</span>
                  <span className="leading-relaxed">{rc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: USER PERSONAS & JOBS-TO-BE-DONE */}
      <div className="border border-ink/10 bg-paper p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
          <Users size={13} />
          <span>2.0 / User Persona &amp; Core Job-to-be-Done (JTBD)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 bg-surface-container p-5 border border-ink/10 space-y-2">
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">TARGET PERSONA</span>
            <div className="font-serif font-bold text-lg text-ink">{prd.primaryPersona.name}</div>
            <div className="text-xs font-mono text-accent font-bold">{prd.primaryPersona.role}</div>
            <p className="text-xs text-muted leading-relaxed font-sans pt-1">
              {prd.primaryPersona.context}
            </p>
          </div>

          <div className="md:col-span-8 border-l-4 border-accent pl-5 py-3 bg-accent/5 flex flex-col justify-center space-y-2">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold block">
              // CORE JOB-TO-BE-DONE FRAMEWORK
            </span>
            <p className="font-serif italic text-sm md:text-base text-ink leading-relaxed">
              "{prd.primaryPersona.jtbd}"
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: FUNCTIONAL REQUIREMENTS MATRIX */}
      <div className="border border-ink/10 bg-paper p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
            <Layers size={13} />
            <span>3.0 / Requirements &amp; Acceptance Criteria</span>
          </div>

          {/* Priority filter pills */}
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span className="text-muted mr-1 uppercase">FILTER:</span>
            {(["all", "P0", "P1", "P2"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 font-bold uppercase transition-colors cursor-pointer ${
                  activeTab === tab 
                    ? "bg-ink text-paper" 
                    : "bg-surface-container text-muted hover:text-ink border border-ink/10"
                }`}
              >
                {tab === "all" ? "ALL" : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredRequirements.map((req, idx) => (
            <div 
              key={idx} 
              className="border border-ink/10 p-5 bg-surface-container/30 hover:border-ink/25 transition-all space-y-2.5"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 uppercase tracking-wider ${
                  req.priority === "P0" 
                    ? "bg-red-100 text-red-800 border border-red-200" 
                    : req.priority === "P1" 
                    ? "bg-amber-100 text-amber-800 border border-amber-200" 
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}>
                  {req.priority} REQUIREMENT
                </span>
                <h2 className="font-serif font-bold text-base text-ink">
                  {req.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1 text-xs">
                <div className="md:col-span-7 space-y-1">
                  <span className="font-mono text-[10px] text-muted uppercase font-bold block">TECHNICAL SPECIFICATION:</span>
                  <p className="text-muted leading-relaxed font-sans">{req.spec}</p>
                </div>
                <div className="md:col-span-5 bg-paper p-3 border border-ink/10 space-y-1">
                  <span className="font-mono text-[10px] text-accent uppercase font-bold block flex items-center gap-1">
                    <Check size={11} /> ACCEPTANCE CRITERIA:
                  </span>
                  <p className="text-ink font-mono text-[11px] leading-relaxed">{req.acceptanceCriteria}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: DATA ARCHITECTURE & SYNC STRATEGY */}
      <div className="border border-ink/10 bg-paper p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
          <Database size={13} />
          <span>4.0 / Data Architecture &amp; Synchronization Strategy</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {prd.dataArchitecture.entities.map((entity, idx) => (
            <div key={idx} className="border border-ink/10 p-4 bg-surface-container/50 space-y-3">
              <div className="border-b border-ink/10 pb-2">
                <span className="text-[10px] font-mono text-accent font-bold uppercase block">// ENTITY</span>
                <span className="font-mono font-bold text-sm text-ink">{entity.name}</span>
                <p className="text-[11px] text-muted leading-tight mt-0.5">{entity.description}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-muted uppercase tracking-wider block">KEY ATTRIBUTES:</span>
                <div className="flex flex-wrap gap-1">
                  {entity.fields.map((field, fIdx) => (
                    <span key={fIdx} className="bg-paper border border-ink/10 text-[10px] font-mono px-1.5 py-0.5 text-ink">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-container p-4 border border-ink/10 space-y-1 text-xs">
          <span className="font-mono text-[10px] text-accent uppercase font-bold block">// RESILIENCE &amp; SYNC STRATEGY</span>
          <p className="font-mono text-ink text-[11px] leading-relaxed">{prd.dataArchitecture.syncStrategy}</p>
        </div>
      </div>

      {/* SECTION 5: OPERATIONAL EDGE CASES & RISK MITIGATION */}
      <div className="border border-ink/10 bg-paper p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
          <ShieldAlert size={13} />
          <span>5.0 / Operational Edge Cases &amp; Risk Guardrails</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prd.edgeCases.map((ec, idx) => (
            <div key={idx} className="border border-ink/10 p-5 bg-surface-container/40 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider block">
                  SCENARIO 0{idx + 1}
                </span>
                <h3 className="font-serif font-bold text-sm text-ink leading-snug">
                  {ec.scenario}
                </h3>
                <div className="pt-1">
                  <span className="text-[9px] font-mono text-red-700 uppercase font-bold block">OPERATIONAL RISK:</span>
                  <p className="text-xs text-muted leading-relaxed font-sans">{ec.operationalRisk}</p>
                </div>
              </div>

              <div className="bg-paper p-3 border border-ink/10 pt-2">
                <span className="text-[9px] font-mono text-emerald-800 uppercase font-bold block flex items-center gap-1">
                  <CheckCircle2 size={10} /> RESOLUTION:
                </span>
                <p className="text-xs text-ink font-mono text-[11px] leading-relaxed mt-0.5">{ec.systemResolution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: MEASURED KPIS & BUSINESS IMPACT */}
      <div className="border border-ink/10 bg-paper p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
          <TrendingUp size={13} />
          <span>6.0 / Post-Deployment KPIs &amp; Business Impact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prd.kpiMetrics.map((kpi, idx) => (
            <div key={idx} className="border border-ink/10 p-6 bg-surface-container/60 space-y-2">
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest block font-bold">
                {kpi.label}
              </span>
              <div className="font-mono text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                {kpi.metric}
              </div>
              <p className="text-xs text-muted font-sans leading-relaxed pt-1">
                {kpi.businessImpact}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
