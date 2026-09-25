import React from "react";

export default function MedicineExtractionDeepDive() {
  return (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// POLYGLOT MICROSERVICES & ENFORCED AI DETERMINISM</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Polyglot Extraction & Decoupled Inference
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      The Medicine Image Extraction platform coordinates three independent microservices tiers to ingest, validate, and persist pharmaceutical labels with absolute type safety and operational uptime.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Polyglot Pipeline & Decoupled Inference */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ARCHITECTURE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Decoupled Three-Tier Polyglot Stack</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Splitting heavyweight AI workloads from orchestrator processes ensures isolated scaling capabilities and prevents memory bloat:
                      </p>
                      <ul className="space-y-2.5 text-xs font-mono text-ink">
                        <li className="flex gap-2">
                          <span className="text-accent font-bold">1. React 19 Frontend:</span>
                          <span className="text-muted text-[11px] leading-relaxed">
                            Handles drag-and-drop file inputs, instant canvas previews, and client-side 5MB limits.
                          </span>
                        </li>
                        <li className="flex gap-2 border-t border-ink/5 pt-2">
                          <span className="text-accent font-bold">2. Node.js Express Gateway:</span>
                          <span className="text-muted text-[11px] leading-relaxed">
                            Manages file storage via Multer, issues 60s asynchronous timeouts, and handles Mongoose persistence.
                          </span>
                        </li>
                        <li className="flex gap-2 border-t border-ink/5 pt-2">
                          <span className="text-accent font-bold">3. FastAPI Python Engine:</span>
                          <span className="text-muted text-[11px] leading-relaxed">
                            Interacts natively with the <code>google-generativeai</code> SDK, enforcing Pydantic validations on raw bytes.
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Forced AI Determinism & Schema Cleanser */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">AI STABILITY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Strict Determinism & Fallback Cleaning</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To bypass the typical unstructured text pitfalls of probabilistic models, the pipeline layers two coordinated formatting patterns:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-3 rounded text-xs font-mono text-ink">
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold text-accent">A. API-Level Output Enforcement</p>
                          <p className="text-[10px] text-muted">Configures Gemini 2.5 Flash with <code>temperature=0.0</code> and explicitly requests <code>response_mime_type="application/json"</code>.</p>
                        </div>
                        <div className="space-y-1 pt-2 border-t border-ink/5">
                          <p className="text-[11px] font-bold text-accent">B. Multi-Strategy Parser Cascade</p>
                          <p className="text-[10px] text-muted">Runs manual regex sweeps to clear backtick block fencings (<code>```json</code>), isolates brace-boundaries, and extracts nested substrings if parsing hits errors.</p>
                        </div>
                      </div>
                    </div>

                    {/* Three-Tier Classification & Persistence */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">DATA INTEGRITY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Status Categorization & MongoDB Audits</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Saves every transaction into MongoDB Atlas paired with metadata to preserve historical lineage:
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-paper p-2.5 border border-emerald-500/10 rounded">
                          <span className="text-emerald-500 font-mono text-xs font-bold block">SUCCESS</span>
                          <span className="text-[9px] text-muted leading-normal mt-1 block">All four vital variables (name, batch, expiry, price) resolved.</span>
                        </div>
                        <div className="bg-paper p-2.5 border border-amber-500/10 rounded">
                          <span className="text-amber-500 font-mono text-xs font-bold block">PARTIAL</span>
                          <span className="text-[9px] text-muted leading-normal mt-1 block">1 to 3 fields captured. Unresolved variables saved as null.</span>
                        </div>
                        <div className="bg-paper p-2.5 border border-red-500/10 rounded">
                          <span className="text-red-500 font-mono text-xs font-bold block">FAILED</span>
                          <span className="text-[9px] text-muted leading-normal mt-1 block">0 fields found or model rejected image. Error logs saved.</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted font-mono leading-normal">
                        Raw Gemini payload buffers are stored side-by-side with sanitized indexes, enabling retrospective query tuning without re-processing image storage.
                      </p>
                    </div>

                    {/* Graceful Degradation Design */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">RESILIENCE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Uptime Persistence & Fail-Safe Defaults</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Architected specifically to protect runtime operations against external network and service drops:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="flex justify-between items-start border-b border-ink/5 pb-2">
                          <div>
                            <span className="font-bold block">Disconnected Database Extractor</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              If the MongoDB replica set drops offline, the Express listener logs the outage but avoids blocking extraction. It returns real-time JSON responses directly to the client interface.
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Non-Cascading Exception Control</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              If FastAPI errors or times out, Node.js captures the failure and logs a custom administrative ticket with standard default parameters, preventing silent frontend crashes.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
  );
}
