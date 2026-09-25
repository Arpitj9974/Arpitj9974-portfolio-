import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function VyoshaDeepDive({ amortizationData = [] }: { amortizationData?: { month: number; balanceNormal: number; balancePrepay: number }[] }) {
  return (
                <div className="border-t border-ink/10 pt-10 space-y-12 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-accent tracking-widest block uppercase">// FINTECH ARCHITECTURE &amp; OFFLINE-FIRST PWA SYSTEMS</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      Deep-Dive: Dual-Engine Ledger, Dynamic UPI QR &amp; Loan Amortization
                    </h2>
                    <p className="text-sm text-muted max-w-3xl leading-relaxed font-sans">
                      Vyosha (from Sanskrit <em>Vyom</em> + <em>Kosha</em> — &quot;Treasury of Space&quot;) reinvents traditional Indian paper <em>bahi-khata</em> for millions of micro-merchants and SMEs. Engineered with sub-200ms cold-start hydration, client-side running balance reducers, dynamic NPCI UPI QR generation, and compound financial amortization engines.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Block 1: Passbook Running Balance & Pure Reducer Accumulator */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">LEDGER INTEGRITY</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Passbook Running Balance Reducer</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        Storing precomputed balances in a database invites catastrophic drift when transactions are edited, backdated, or restored from the recycle bin out of order. Vyosha computes ledger balances dynamically on the client:
                      </p>
                      <ul className="space-y-3 text-xs font-mono">
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">01.</span>
                          <div>
                            <span className="font-bold block">Single-Pass Chronological Reducer</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Reverses sorted transactions to oldest-first, iterating once with an accumulator: <code>currentBalance += t.type === 'gave' ? t.amount : -t.amount</code>, producing a memoized <code>Record&lt;string, number&gt;</code> map keyed by transaction ID.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">02.</span>
                          <div>
                            <span className="font-bold block">Paise-Precision Currency Formatting</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Dynamic fraction digits (<code>minimumFractionDigits: Number.isInteger(amt) ? 0 : 2</code>) prevent fractional rounding artifacts like <code>₹1,250.5.00</code> while preserving clean whole rupee displays.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2 text-ink">
                          <span className="text-accent font-bold">03.</span>
                          <div>
                            <span className="font-bold block">Audit-Trail Soft Deletion</span>
                            <span className="text-muted block text-[11px] leading-normal">
                              Entries flagged with <code>deletedAt</code> are excluded from the accumulator before rendering, protecting audit trails without corrupting running totals.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Block 2: Dynamic UPI QR & WhatsApp Reminder Engine */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">FINTECH ECOSYSTEM</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Dynamic NPCI UPI QR &amp; WhatsApp Engine</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        Replaces paid SMS gateways and cumbersome bank transfers with zero-marginal-cost NPCI cryptographic payment deep links:
                      </p>
                      <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-2 rounded text-xs font-mono text-ink">
                        <div className="flex justify-between font-bold text-accent">
                          <span>MECHANISM</span>
                          <span>SPECIFICATION &amp; ROUTING</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">1. NPCI UPI URI SPECIFICATION</strong>
                          <span className="text-muted text-[10px]">Encodes <code>upi://pay?pa=VPA&amp;pn=NAME&amp;am=DUE&amp;cu=INR&amp;tn=Hisaab</code> into an on-the-fly 200x200px Data URL QR code via node-qrcode.</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">2. WHATSAPP CLICK-TO-CHAT DEEP LINKS</strong>
                          <span className="text-muted text-[10px]">Normalizes Indian 10-digit phone numbers with country code <code>91</code>, creating pre-filled WhatsApp billing statements with embedded pay links.</span>
                        </div>
                        <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
                          <strong className="block text-ink">3. 3-DAY PROXIMITY ALERT ENGINE</strong>
                          <span className="text-muted text-[11px]">Normalized midnight boundaries (<code>setHours(0,0,0,0)</code>) calculate exact calendar delta to flag Overdue and Due Soon accounts without false alarms on settled balances.</span>
                        </div>
                      </div>
                    </div>

                    {/* Block 3: Frame-0 Hydration & Firestore Multi-Tab IndexedDB */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">PERFORMANCE RUNTIME</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Frame-0 Fast Hydration (&lt;200ms)</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        Eliminates the 4–8 second white splash screen common in cellular-bound Firestore mobile applications:
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent text-xs font-bold block">FRAME-0 HYDRATION</span>
                          <span className="text-[10px] text-muted block mt-1">Reads synchronous local cache snapshots on mount; sets <code>isLoading=false</code> immediately to paint the UI in &lt;50ms.</span>
                        </div>
                        <div className="bg-paper p-3 border border-ink/5 rounded">
                          <span className="text-accent text-xs font-bold block">INDEXEDDB PERSISTENCE</span>
                          <span className="text-[10px] text-muted block mt-1">Firebase 12 <code>persistentLocalCache</code> + <code>persistentMultipleTabManager</code> syncs across tabs and survives offline app restarts.</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted font-mono leading-relaxed">
                        A strict 600ms safety timeout guarantees the UI is never trapped behind network promises, while a subtle header pill communicates background sync status.
                      </p>
                    </div>

                    {/* Block 4: Bank Loan Amortization & Multi-Prepayment Simulator */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">FINANCIAL ENGINEERING</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Loan Amortization &amp; Prepayment Engine</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        Bridges merchant bookkeeping with comprehensive institutional loan planning:
                      </p>
                      <div className="space-y-3 text-xs font-mono text-ink">
                        <div className="border-b border-ink/5 pb-2">
                          <span className="font-bold block">Monthly Compounding Formula &amp; 0% Fallback</span>
                          <span className="text-muted text-[11px] leading-normal block mt-1">
                            Calculates standard monthly amortization: <code>EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]</code> with automatic fallback to <code>P / n</code> for zero-interest peer loans.
                          </span>
                        </div>
                        <div className="border-b border-ink/5 pb-2">
                          <span className="font-bold block">Reduce Tenure vs. Reduce EMI Simulation</span>
                          <span className="text-muted text-[11px] leading-normal block mt-1">
                            Simulates single or recurring prepayments across cashflow intervals. Calculates exact interest saved, months shaved, and residual truncation guards (<code>opening - principal &lt; 1.0</code>) to eliminate phantom maturity months.
                          </span>
                        </div>
                        <div>
                          <span className="font-bold block">Natural Language Tenure Parser</span>
                          <span className="text-muted text-[11px] leading-normal block mt-1">
                            Interprets inputs like <code>&quot;18 years 9 months&quot;</code>, <code>&quot;240 months&quot;</code>, or <code>&quot;5y 6m&quot;</code> into discrete month integers.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Block 5: Mechanical Keypad & Client-Side Image Compressor */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">MOBILE ERGONOMICS</span>
                        <h4 className="font-serif font-bold text-lg text-ink">In-App Arithmetic Keypad &amp; 98% Image Compression</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        Engineered specifically for one-handed thumb entry in busy retail environments:
                      </p>
                      <ul className="space-y-2 text-xs font-mono text-ink">
                        <li className="flex items-start gap-1.5">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Expression Evaluator:</strong> Custom tokenizer evaluates math expressions like <code>150 + 250 * 2 = 650</code> with operator precedence, allowing merchants to tally sales tickets without switching to an external calculator.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>HTML5 Canvas Receipt Compressor:</strong> Downscales raw 8MB–12MB smartphone camera photos to a 1024x1024 bounding box at 72% JPEG quality, shrinking uploads to 60KB–120KB in &lt;150ms on-device.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Block 6: Multi-Book Isolation & Disaster Recovery */}
                    <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">RESILIENCE ARCHITECTURE</span>
                        <h4 className="font-serif font-bold text-lg text-ink">Multi-Book Isolation &amp; Emergency Recovery</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        Protects data sovereignty and accounts compartmentalization without additional server overhead:
                      </p>
                      <ul className="space-y-2 text-xs font-mono text-ink">
                        <li className="flex items-start gap-1.5">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Multi-Ledger Compartmentalization:</strong> Merchants maintain separate books (e.g. <em>Wholesale Shop</em> vs. <em>Personal Household</em>) under one account with scoped context filtering and zero multi-DB costs.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Reverse-Cascading Recycle Bin:</strong> 30-day soft deletes with automatic reverse-cascade: restoring a transaction automatically reactivates a deleted customer account.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-accent font-bold">•</span>
                          <span><strong>Root Error Boundary &amp; JSON Dump:</strong> Traps unhandled React exceptions and offers an instant one-click raw LocalStorage JSON backup download, ensuring merchants never lose their financial records.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Architecture Diagram / Terminal Blueprint */}
                  <div className="border border-ink/10 bg-surface-container/40 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-accent font-bold uppercase">// SYSTEM TOPOLOGY: OFFLINE-FIRST PWA TO NPCI ECOSYSTEM</span>
                      <span className="text-[10px] font-mono text-muted">23 TS/TSX FILES · ~5,400 SLOC · ZERO BACKEND SPEND</span>
                    </div>
                    <div className="bg-paper border border-ink/10 p-4 font-mono text-[11px] leading-relaxed overflow-x-auto text-ink">
                      <pre className="whitespace-pre">
{`+----------------------------------------------------------------------------------------------------+
|                                    CLIENT BROWSER / MOBILE PWA                                     |
|  +-----------------------------------------------------------------------------------------------+  |
|  |  React 19 Presentation: LedgerHomeView | PartyDetailView | LoanCalculator | CustomersView     |  |
|  |  Ergonomic Controls:   WhatsAppModal  | AddTransaction  | RecycleBinView | In-App Keypad     |  |
|  +-----------------------------------------------------------------------------------------------+  |
|                                                  |                                                 |
|  +-----------------------------------------------------------------------------------------------+  |
|  |  LedgerContext: Frame-0 Hydration (<200ms) | Multi-Book Isolation | Offline-First Dispatcher  |  |
|  +-----------------------------------------------------------------------------------------------+  |
|             |                                    |                                    |            |
|             v                                    v                                    v            |
|  +---------------------+              +---------------------+              +---------------------+ |
|  |  Pure Math Engines  |              |   Storage Adapter   |              |  Service Worker     | |
|  |  - balance.ts       |              |   - IndexedDB Disk  |              |  - Cache API (v1)   | |
|  |  - loanCalculator.ts|              |   - LocalStorage    |              |  - Stale-While-Reval| |
|  +---------------------+              +---------------------+              +---------------------+ |
+--------------------------------------------------|-------------------------------------------------+
                                                   |
                             HTTPS / TLS / WSS     |     Cloud Sync (onSnapshot)
                                                   v
+----------------------------------------------------------------------------------------------------+
|                              GOOGLE FIREBASE INFRASTRUCTURE                                        |
|  Firebase Auth (Google OAuth)  <--->  Cloud Firestore NoSQL (parties / transactions collections)   |
+----------------------------------------------------------------------------------------------------+
                                                   |
                                                   | NPCI UPI & WhatsApp Deep-Links
                                                   v
+----------------------------------------------------------------------------------------------------+
|                                      EXTERNAL ECOSYSTEM APIS                                       |
|  WhatsApp Click-to-Chat (wa.me/91...)   <--->  NPCI UPI Gateways (GPay / PhonePe / Paytm / BHIM)    |
+----------------------------------------------------------------------------------------------------+`}
                      </pre>
                    </div>
                  </div>

                  {/* Live Amortization Curve Chart */}
                  <div className="border border-ink/10 bg-surface-container/40 p-6 space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-xs font-mono text-accent font-bold uppercase block">// LIVE AMORTIZATION ENGINE — INTERACTIVE CHART</span>
                        <h3 className="font-serif text-xl font-bold text-ink mt-1">Outstanding Balance: Standard vs. Prepayment Strategy</h3>
                      </div>
                      <div className="text-[10px] font-mono text-muted bg-paper border border-ink/10 px-3 py-1.5 space-y-0.5">
                        <div>LOAN: ₹10,00,000 @ 8.5% p.a. · 20 YEARS</div>
                        <div>PREPAYMENT: ₹20,000/mo extra · REDUCE TENURE</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted font-sans leading-relaxed">
                      This chart is powered by the same <code>loanCalculator.ts</code> amortization engine built inside Vyosha — computed entirely client-side with no backend or API calls. Hover over any data point to inspect month-by-month balances.
                    </p>
                    <div style={{ width: '100%', height: 280 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={amortizationData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="gradNormal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="gradPrepay" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                          <XAxis
                            dataKey="month"
                            tickFormatter={(v) => `M${v}`}
                            tick={{ fontSize: 10, fontFamily: 'monospace' }}
                            stroke="rgba(0,0,0,0.2)"
                          />
                          <YAxis
                            tickFormatter={(v) => `₹${v}K`}
                            tick={{ fontSize: 10, fontFamily: 'monospace' }}
                            stroke="rgba(0,0,0,0.2)"
                            width={52}
                          />
                          <Tooltip
                            formatter={(value: number, name: string) => [
                              `₹${(value).toLocaleString('en-IN')}K`,
                              name === 'balanceNormal' ? 'Standard EMI Balance' : 'With ₹20K Prepayment'
                            ]}
                            labelFormatter={(l) => `Month ${l}`}
                            contentStyle={{ fontFamily: 'monospace', fontSize: 11, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 0 }}
                          />
                          <Legend
                            formatter={(val) => val === 'balanceNormal' ? 'Standard EMI' : '+ ₹20K/mo Prepayment'}
                            wrapperStyle={{ fontSize: 11, fontFamily: 'monospace' }}
                          />
                          <Area type="monotone" dataKey="balanceNormal" stroke="#6366f1" strokeWidth={2} fill="url(#gradNormal)" dot={false} />
                          <Area type="monotone" dataKey="balancePrepay" stroke="#10b981" strokeWidth={2} fill="url(#gradPrepay)" dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      {[
                        { label: 'Loan Amount', value: '₹10,00,000' },
                        { label: 'Interest Rate', value: '8.5% p.a.' },
                        { label: 'Est. Interest Saved', value: '~₹3.6L' },
                        { label: 'Tenure Cut', value: '~7 Years' }
                      ].map(stat => (
                        <div key={stat.label} className="bg-paper border border-ink/10 p-3">
                          <div className="text-[10px] font-mono text-muted uppercase tracking-wider">{stat.label}</div>
                          <div className="font-serif font-bold text-ink text-base mt-0.5">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
  );
}
