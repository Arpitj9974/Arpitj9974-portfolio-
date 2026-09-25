import React from "react";

export default function AspirantFlowDeepDive() {
  return (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// SYSTEM METRICS & ARCHITECTURE</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Resilient Cloud-Synchronized Sync & Polymorphic Dashboards
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      AspirantFlow is a highly resilient, cloud-synchronized online study planner and tracker featuring a network-resilient sync engine, polymorphic dashboard architectures, and HTML5 cross-frame event propagation.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Polymorphic Variant Engine */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">VARIANT ENGINE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Polymorphic Exam Architecture</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Instead of duplicate HTML/JS templates, a single generic controller (<code className="text-accent">dashboard-generic.js</code>) dynamically reads exam specifications (<code className="text-accent">window.DASH_SPEC</code>) for 20+ variants, updating layout, targets, and counters on-the-fly:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] font-mono border-collapse text-ink">
                          <thead>
                            <tr className="border-b border-ink/10 text-muted uppercase">
                              <th className="text-left py-1">Exam Type</th>
                              <th className="text-left py-1">Core Subjects</th>
                              <th className="text-right py-1">Chapters</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">ðŸ›ï¸ UPSC CSE</td>
                              <td className="py-1 text-muted text-[10px]">Polity, History, Geography, CSAT...</td>
                              <td className="text-right font-bold">1,100+</td>
                            </tr>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">ðŸ’¼ SSC CGL/CHSL</td>
                              <td className="py-1 text-muted text-[10px]">Quant, Reasoning, English, GA...</td>
                              <td className="text-right font-bold">150+</td>
                            </tr>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">⚡ TCS NQT</td>
                              <td className="py-1 text-muted text-[10px]">Speed Math, Aptitude, Coding, English</td>
                              <td className="text-right font-bold">100+</td>
                            </tr>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">ðŸ¦ IBPS PO/Clerk</td>
                              <td className="py-1 text-muted text-[10px]">Quant, Reasoning, Banking, English</td>
                              <td className="text-right font-bold">120+</td>
                            </tr>
                            <tr className="border-b border-ink/5">
                              <td className="py-1">ðŸŽ“ JEE / NEET</td>
                              <td className="py-1 text-muted text-[10px]">Physics, Chemistry, Math / Biology</td>
                              <td className="text-right font-bold">90+</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Timeout-Safe Synchronization */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">DATABASE PROTECTION</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Timeout-Safe Cloud Sync</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To prevent Firestore queries from stalling the UI during connection drops, all database reads/writes are wrapped in a 5-second <code className="text-accent">Promise.race</code> timeout guard:
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
                      <p className="text-[11px] text-muted">
                        If the network fails or Firestore stalls, the app catches the error and cleanly falls back to local-only mode, keeping the candidate's session entirely active.
                      </p>
                    </div>

                    {/* Decoupled Cross-Context Sync */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">EVENT BUS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Cross-Frame postMessage Sync</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To avoid duplicate styling layers and visual fragmentation, roadmaps run inside independent iframes. Status mutations are securely transmitted to the host shell using the HTML5 postMessage API:
                      </p>
                      <pre className="text-[10px] font-mono bg-paper p-3 border border-ink/5 overflow-x-auto text-ink">
{`window.parent.postMessage({
  type: 'storageChange',
  key: 'qt3_5',
  value: '1'
}, '*');`}
                      </pre>
                      <p className="text-[11px] text-muted">
                        The parent window intercepts these messages and coordinates progress updates on the dashboard dials without causing page reloads or full DOM refreshes.
                      </p>
                    </div>

                    {/* Centralized Session Gating & Onboarding */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ROUTE GATES</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Session Gates & Onboarding Flow</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Protects user privacy and enforces demographic collection before displaying the dashboard core:
                      </p>
                      <ul className="space-y-3 text-xs font-mono text-ink">
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">1.</span>
                          <div>
                            <span className="font-bold block">Auth loading overlay injection</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Dynamically injects a full-screen, premium glassmorphic overlay at the body start to prevent layout flashes (FOUC).
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent font-bold">2.</span>
                          <div>
                            <span className="font-bold block">Onboarding & registration gate</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Validates whether the user's demographic survey profile exists in Firestore or local cache. If incomplete, routes users strictly to `onboarding.html`.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
  );
}
