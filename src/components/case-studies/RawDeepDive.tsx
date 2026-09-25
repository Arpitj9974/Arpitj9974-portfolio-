import React from "react";

export default function RawDeepDive() {
  return (
                <div className="border-t border-ink/10 pt-10 space-y-10">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// TECHNICAL BLUEPRINT</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: System Mechanics & Defense Pipelines
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      RAW stands for <strong>Record, Analyse, Work</strong>. To meet ARWS's production-grade standard, the system was engineered to survive device sleeps, unstable cellular coverage, and hardware dual-SIM contexts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Block 1: 4-Layer Deduplication */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">CORE PIPELINE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">4-Layer Duplication Prevention</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        The most common failure mode in call-logging systems is duplicate writes due to poor network retry states. RAW addresses this with an end-to-end 4-layer defense pipeline:
                      </p>
                      <ul className="space-y-3 text-xs font-mono">
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">L1:</span>
                          <div>
                            <span className="font-bold block">5-Factor Collision-Proof Key</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Constructs a unique ID hash: <code>normalizedNum_dateMillis_duration_callType_simId</code> with millisecond precision.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">L2:</span>
                          <div>
                            <span className="font-bold block">Room DB Unique Constraints</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Database-level unique indexing on <code>uniqueCallId</code> with an idempotent <code>OnConflictStrategy.IGNORE</code> layer.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">L3:</span>
                          <div>
                            <span className="font-bold block">Kotlin Coroutines Mutex Lock</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              SyncManager uses <code>syncMutex.tryLock()</code> to prevent overlapping background upload cycles from executing concurrently.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">L4:</span>
                          <div>
                            <span className="font-bold block">Server-Side R_A_CheckDuplicate</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              The Apps Script scans Column H via a single batch range search before applying any row append operation, yielding a truly idempotent loop.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Block 2: Multi-SIM Separation */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">PRIVACY ENGINE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Dual-SIM Hardware Separation</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        ARWS agents carry their personal contacts on the same devices used for professional calls. Standard Call Log trackers capture everything, violating privacy laws. RAW enforces strict boundary isolation:
                      </p>
                      <ul className="space-y-3 text-xs font-mono">
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">01.</span>
                          <div>
                            <span className="font-bold block">Active Subscription ID Picker</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              During Setup, <code>SubscriptionManager</code> lists active SIM ids and carriers. The user binds their official Company SIM.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">02.</span>
                          <div>
                            <span className="font-bold block">Double-Gate Discard Code Path</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              SIM validation checks are integrated both in real-time within <code>CallTrackingService.kt</code> and during the batch log scanner.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">03.</span>
                          <div>
                            <span className="font-bold block">Immediate Memory Flush</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Personal calls trigger an instant discard log and are never cached, written to the DB, or outputted to log files.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Block 3: WorkManager Boundary Alignment */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">BG STRATEGY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Clock-Boundary Aligned Sync</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Rather than utilizing battery-intensive and volatile intervals (which Android Doze mode forcefully kills), RAW uses a mathematical clock-grid system:
                      </p>
                      <div className="border-l-2 border-accent/30 pl-3 space-y-2 text-xs">
                        <p className="font-mono text-[11px] text-ink">
                          <strong>Boundary Floor Algorithm:</strong><br />
                          The system snaps time intervals to floor-aligned 30-minute marks (e.g. <code>:00</code> or <code>:30</code>). When the worker runs, it calculates precisely:
                        </p>
                        <pre className="bg-paper p-2 font-mono text-[10px] text-muted overflow-x-auto whitespace-pre">
{`fun getCurrentBoundary(now: Long): Long {
  val cal = Calendar.getInstance().apply { timeInMillis = now }
  val min = cal.get(Calendar.MINUTE)
  cal.set(Calendar.MINUTE, if (min >= 30) 30 else 0)
  cal.set(Calendar.SECOND, 0)
  cal.set(Calendar.MILLISECOND, 0)
  return cal.timeInMillis
}`}
                        </pre>
                        <p className="text-[11px] text-muted leading-normal">
                          This boundary alignment guarantees no overlapping scan queries and guarantees 100% data replication with zero data duplication.
                        </p>
                      </div>
                    </div>

                    {/* Block 4: Low-Latency OS Hook */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">OS HEURISTIC</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Native Android Telephony Hacks</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Android's media layer is notoriously asynchronous. Building real-time background syncs requires overriding typical lifecycle behaviors:
                      </p>
                      <ul className="space-y-3 text-xs font-mono">
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">A.</span>
                          <div>
                            <span className="font-bold block">1500ms Database Write Wait-State</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              The OS does not write <code>CallLog.Calls</code> immediately upon going idle. A custom main-thread <code>Looper Handler</code> delays call reads to guarantee the fresh call record is flushed.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">B.</span>
                          <div>
                            <span className="font-bold block">START_STICKY + BootReceiver Durability</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Declared with <code>foregroundServiceType="dataSync"</code>. Survives both Operating System low-memory (OOM) sweeps and hardware reboots automatically.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">C.</span>
                          <div>
                            <span className="font-bold block">Serverless Apps Script Webhook</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              A lightweight Web App script is deployed on Google Apps Script, handling POST parameters, validating phone numbers and fields, and mapping records at $0 infrastructure cost.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
  );
}
