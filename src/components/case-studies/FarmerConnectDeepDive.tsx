import React from "react";

export default function FarmerConnectDeepDive() {
  return (
                <div className="border-t border-ink/10 pt-10 space-y-12">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// TRANSACTION CONCURRENCY & MULTI-PROVIDER AI SYSTEMS</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Race-Free Bidding & Provider Failovers
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed">
                      FarmerConnect orchestrates a highly concurrent marketplace with automated data.gov.in mandi indexes, secure Razorpay verification, and a zero-downtime triple AI-agent matrix.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Race-Free Bidding & Transaction Integrity */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">DATABASE TRANSACTIONS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Concurrency-Safe Bidding Engine</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        To resolve bidding race conditions where multiple buyers compete on the same crop millisecond-boundary, the marketplace handles placements in isolated relational blocks:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-2 rounded text-xs font-mono text-ink">
                        <div className="flex justify-between font-bold text-accent">
                          <span>STAGE / COMMAND</span>
                          <span>ACTION DESCRIPTION</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">1. SELECT ... FOR UPDATE</strong>
                          <span className="text-muted text-[10px]">Acquires exclusive product row locks in PostgreSQL before read checks. Prevents simultaneous outbid states.</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">2. ATOMIC BIDS FLUSH</strong>
                          <span className="text-muted text-[10px]">In the exact transaction window, sets former competitor bids to 'outbid' and queues push triggers in background callbacks.</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">3. TRANSACTION COMMIT / ROLLBACK</strong>
                          <span className="text-muted text-[10px]">Persists the highest bid. Releases locks or rollbacks the session automatically if calculations trigger a validation conflict.</span>
                        </div>
                      </div>
                    </div>

                    {/* Krishi Sahayak 4-Mode Provider Cascade */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">AI ORCHESTRATION</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Cascading Provider Failover Routing</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        The crop assistance chatbot uses a 2x2 intent matrix (Farmer/General × Live/Knowledge) with a self-healing fallback chain to shield operations from API outages:
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent text-xs font-bold block">LIVE MODE</span>
                          <span className="text-[10px] text-muted block mt-1">Queries OpenRouter with web search and falls back to Google Gemini 2.0 Flash with Search grounding.</span>
                        </div>
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent text-xs font-bold block">KNOWLEDGE MODE</span>
                          <span className="text-[10px] text-muted block mt-1">Routes directly to Groq (Llama 3.3 70B) for sub-second, zero-scraping agricultural wisdom.</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted font-mono leading-relaxed">
                        If a specific provider endpoint yields high latency or ratelimits, the server-side router transparently shifts context payloads to the adjacent tier.
                      </p>
                    </div>

                    {/* Hybrid APMC Caching & Government APIs */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">INTEGRATIONS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Hybrid Caching & Proxy Security</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        FarmerConnect integrates India's official <code>data.gov.in</code> commodity API, securing access and enhancing fetch times:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="flex justify-between items-start border-b border-ink/5 pb-2">
                          <div>
                            <span className="font-bold block">24-Hour PostgreSQL Cache</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              Retrieves fresh mandi rates across all states, writes structured snapshots to database cache tables, and serves local data instantly for common queries.
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Stale-While-Revalidate Warnings</span>
                            <span className="text-muted text-[11px] leading-normal block mt-1">
                              If the upstream federal servers drop offline, the gateway serves cached indexes combined with an honest visual notice banner on the UI.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Multi-Tier Security & Compliance */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">SECURITY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Helmet.js & Tiered Throttling Engine</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Because the app provides live bidding, payments, and open AI resources, security layers are embedded at every middleware endpoint:
                      </p>
                      <ul className="space-y-1.5 text-xs font-mono text-ink">
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>7 Throttling Tiers:</strong> Configures rate limits ranging from 5 auth registers/hour to 30 bid creations/minute.</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Cryptographic Signatures:</strong> Razorpay webhook callbacks verify authentic transactions using SHA256 HMAC salts.</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Multimodal Guardrails:</strong> Gemini Vision validates uploaded listing images to block irrelevant uploads before DB insertion.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
  );
}
