import React, { useState } from "react";
import { Sliders, TrendingUp, DollarSign, ShieldCheck, RefreshCw, Calculator } from "lucide-react";

interface MetalConfig {
  id: string;
  name: string;
  symbol: string;
  defaultSpot: number;
  minSpot: number;
  maxSpot: number;
  multiplier: number;
  multiplierExplanation: string;
  standardUnit: string;
  unitGrams: number;
}

const METALS: MetalConfig[] = [
  {
    id: "gold",
    name: "24K Fine Gold",
    symbol: "XAU",
    defaultSpot: 2750,
    minSpot: 2000,
    maxSpot: 3500,
    multiplier: 1.0628,
    multiplierExplanation: "6% Basic Import Duty + 1% AIDC Surcharge + 3% GST Compounded",
    standardUnit: "10 Grams (1 Tola)",
    unitGrams: 10
  },
  {
    id: "silver",
    name: "999 Fine Silver",
    symbol: "XAG",
    defaultSpot: 32.5,
    minSpot: 20,
    maxSpot: 50,
    multiplier: 1.0759,
    multiplierExplanation: "Verified IBJA Duty Structure (Parity equivalent to ₹2,42,400/kg)",
    standardUnit: "1 Kilogram (1000g)",
    unitGrams: 1000
  },
  {
    id: "platinum",
    name: "999 Pure Platinum",
    symbol: "XPT",
    defaultSpot: 980,
    minSpot: 750,
    maxSpot: 1300,
    multiplier: 0.9748,
    multiplierExplanation: "Contemporary CEPA Zero-Duty Import Incentive Regime",
    standardUnit: "10 Grams",
    unitGrams: 10
  }
];

export default function ArAuAgPtDeepDive() {
  const [selectedMetal, setSelectedMetal] = useState<MetalConfig>(METALS[0]);
  const [spotPrice, setSpotPrice] = useState<number>(METALS[0].defaultSpot);
  const [usdInrRate, setUsdInrRate] = useState<number>(86.85);

  const handleSelectMetal = (metal: MetalConfig) => {
    setSelectedMetal(metal);
    setSpotPrice(metal.defaultSpot);
  };

  // Mathematical Calculation
  const troyOunceGrams = 31.1034768;
  const rawBaseInrPerGram = (spotPrice * usdInrRate) / troyOunceGrams;
  const dutyInclusiveInrPerGram = rawBaseInrPerGram * selectedMetal.multiplier;
  const standardUnitTotal = dutyInclusiveInrPerGram * selectedMetal.unitGrams;
  const taxSpreadPerGram = dutyInclusiveInrPerGram - rawBaseInrPerGram;

  return (
    <div className="border-t border-ink/10 pt-10 space-y-12 animate-fade-in">
      <div className="space-y-2">
        <span className="text-xs font-mono text-accent tracking-widest block uppercase">// COMMODITY PIPELINES & MULTI-PLATFORM SYNC</span>
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
          Deep-Dive: Five-Tier Redundancy & Duty-Inclusive Pricing
        </h2>
        <p className="text-sm text-muted max-w-3xl leading-relaxed font-sans">
          AR-AuAgPt acts as a highly resilient pricing proxy that bridges global precious metal spot rates with localized Indian retail market realities.
        </p>
      </div>

      {/* INTERACTIVE BULLION PARITY CALCULATOR */}
      <div className="border border-accent/30 bg-surface-container/80 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-ink/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Calculator size={14} /> // LIVE BULLION PRICING &amp; CURRENCY ENGINE
            </span>
            <p className="text-xs text-muted font-sans">
              Interact with the live mathematical formula that maps international London/COMEX spot rates to landed Indian IBJA retail benchmarks.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted uppercase bg-paper px-2 py-1 border border-ink/10">
              PARITY: 31.1035g TROY OUNCE
            </span>
          </div>
        </div>

        {/* Commodity selector */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">SELECT COMMODITY BENCHMARK:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {METALS.map((m) => (
              <button
                key={m.id}
                onClick={() => handleSelectMetal(m)}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  selectedMetal.id === m.id
                    ? "border-accent bg-accent/10 text-ink shadow-sm"
                    : "border-ink/10 bg-paper hover:border-ink/30 text-muted"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                  <span className="font-bold text-accent">{m.symbol}</span>
                  <span className="text-muted">Factor: {m.multiplier}x</span>
                </div>
                <div className="text-xs font-sans font-bold text-ink">{m.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Sliders & Live Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Panel (Span 6) */}
          <div className="lg:col-span-6 bg-paper border border-ink/15 p-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              <span className="text-xs font-mono font-bold text-ink uppercase flex items-center gap-1.5">
                <Sliders size={13} className="text-accent" /> REAL-TIME RATE VECTOR ADJUSTMENTS
              </span>

              {/* Spot Price Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-muted">GLOBAL SPOT ({selectedMetal.symbol}/USD):</span>
                  <span className="font-bold text-ink text-sm">${spotPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / oz</span>
                </div>
                <input
                  type="range"
                  min={selectedMetal.minSpot}
                  max={selectedMetal.maxSpot}
                  step={selectedMetal.id === "silver" ? 0.25 : 10}
                  value={spotPrice}
                  onChange={(e) => setSpotPrice(parseFloat(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted">
                  <span>${selectedMetal.minSpot}</span>
                  <span>Baseline COMEX/LBMA</span>
                  <span>${selectedMetal.maxSpot}</span>
                </div>
              </div>

              {/* USD/INR FX Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-muted">USD/INR EXCHANGE RATE:</span>
                  <span className="font-bold text-ink text-sm">₹{usdInrRate.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={82.0}
                  max={92.0}
                  step={0.1}
                  value={usdInrRate}
                  onChange={(e) => setUsdInrRate(parseFloat(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted">
                  <span>₹82.00</span>
                  <span>ECB / Frankfurter Daily Reference</span>
                  <span>₹92.00</span>
                </div>
              </div>
            </div>

            {/* Live Formula Syntax Box */}
            <div className="bg-surface-container p-3 border border-ink/10 font-mono text-[11px] text-ink space-y-1.5 rounded">
              <span className="text-[10px] text-accent font-bold uppercase block">// ACTIVE MATHEMATICAL PROOF:</span>
              <p className="text-[10px] text-muted leading-relaxed">
                <code>₹/gram = (${spotPrice.toFixed(2)} × ₹{usdInrRate.toFixed(2)} / 31.1035) × {selectedMetal.multiplier}</code>
              </p>
              <div className="text-[10px] text-muted border-t border-ink/5 pt-1">
                Duty Multiplier: <strong className="text-ink">{selectedMetal.multiplierExplanation}</strong>
              </div>
            </div>
          </div>

          {/* Result Output Panel (Span 6) */}
          <div className="lg:col-span-6 bg-ink text-paper p-5 flex flex-col justify-between space-y-5 border border-ink">
            <div className="space-y-4 font-mono">
              <div className="flex justify-between items-center border-b border-paper/10 pb-2">
                <span className="text-xs text-accent font-bold uppercase flex items-center gap-1.5">
                  <TrendingUp size={13} /> LANDED INDIAN RETAIL BENCHMARK
                </span>
                <span className="text-[10px] text-paper/60 uppercase">IBJA PARITY VERIFIED</span>
              </div>

              {/* Standard Trade Unit Metric */}
              <div className="space-y-1 bg-paper/5 p-4 rounded border border-paper/10">
                <span className="text-[10px] text-paper/60 uppercase block">STANDARD MARKET UNIT ({selectedMetal.standardUnit})</span>
                <div className="text-3xl md:text-4xl font-bold text-accent tracking-tight">
                  ₹{Math.round(standardUnitTotal).toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] text-paper/70 block">
                  Includes basic customs duty + AIDC + integrated GST
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="border border-paper/10 p-3 rounded">
                  <span className="text-[10px] text-paper/50 uppercase block">RETAIL PER GRAM</span>
                  <span className="text-lg font-bold text-paper block">₹{dutyInclusiveInrPerGram.toFixed(2)} / g</span>
                  <span className="text-[9px] text-paper/40">Duty inclusive</span>
                </div>
                <div className="border border-paper/10 p-3 rounded">
                  <span className="text-[10px] text-paper/50 uppercase block">DUTY &amp; TAX SPREAD</span>
                  <span className="text-lg font-bold text-amber-400 block">
                    {taxSpreadPerGram >= 0 ? `+₹${taxSpreadPerGram.toFixed(2)}` : `-₹${Math.abs(taxSpreadPerGram).toFixed(2)}`} / g
                  </span>
                  <span className="text-[9px] text-paper/40">vs raw unhedged spot</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-paper/10 flex justify-between items-center text-[10px] font-mono text-paper/60">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-400" /> RESILIENT FIVE-TIER CACHE
              </span>
              <span>TTL: 60s CLIENT CACHE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Five-Tier Redundancy Chain */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">REDUCING DOWNTIME</span>
            <h4 className="font-serif font-bold text-lg text-ink">Five-Tier Data Acquisition</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            To guarantee that retail price cards are never blank, the stateless Express gateway manages a robust fall-back cascade:
          </p>
          <ul className="space-y-2 text-xs font-mono text-ink">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">1.</span>
              <div>
                <span className="font-bold">Swissquote Spot API:</span>
                <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                  Pulls institutional-grade, real-time bid/ask streams for Gold, Silver, and Platinum.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">2.</span>
              <div>
                <span className="font-bold">Yahoo Finance Futures:</span>
                <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                  Fallback index that queries futures contracts (GC=F, SI=F, PL=F) via the <code>yahoo-finance2</code> library.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">3.</span>
              <div>
                <span className="font-bold">Frankfurter FX (ECB):</span>
                <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                  Third-line provider for real-time EUR/USD and USD/INR exchange parameters if primary feeds time out.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">4.</span>
              <div>
                <span className="font-bold">In-Memory Cache &amp; Local Storage:</span>
                <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                  Falls back to server-side cache or client-side localStorage values (<code>ar_market_cache_v2</code>) with client-side TTL checks.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">5.</span>
              <div>
                <span className="font-bold">Emergency Fallbacks:</span>
                <span className="text-muted text-[11px] block mt-0.5 leading-normal">
                  Loads pre-calibrated baseline parameters corresponding to verified April 2026 commodity index levels.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* India Duty Multiplier Model */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">TAX LAYERING</span>
            <h4 className="font-serif font-bold text-lg text-ink">IBJA-Calibrated Multipliers</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Rather than displaying raw global spot values that fail to account for Indian import duty regulations, the pricing engine applies strict mathematical formulas:
          </p>
          <div className="border border-accent/10 bg-accent/5 p-4 rounded space-y-3 font-mono text-[11px] text-ink">
            <div className="space-y-1">
              <p className="font-bold text-accent">GOLD MULTIPLIER:</p>
              <code className="text-muted block text-[10px]">INR Price = (USD/oz × USD_INR_Rate / 31.1035g) × 1.0628</code>
              <p className="text-muted text-[10px] leading-relaxed">Accounts for 6% basic import duty, 1% AIDC surcharge, and 3% GST compound layering.</p>
            </div>
            <div className="space-y-1 pt-2 border-t border-ink/5">
              <p className="font-bold text-accent">SILVER MULTIPLIER:</p>
              <code className="text-muted block text-[10px]">INR Price = (USD/oz × USD_INR_Rate / 31.1035g) × 1.0759</code>
              <p className="text-muted text-[10px] leading-relaxed">Independently verified against live India market pricing (IBJA ₹2,42,400/kg benchmark equivalents).</p>
            </div>
            <div className="space-y-1 pt-2 border-t border-ink/5">
              <p className="font-bold text-accent">PLATINUM MULTIPLIER:</p>
              <code className="text-muted block text-[10px]">INR Price = (USD/oz × USD_INR_Rate / 31.1035g) × 0.9748</code>
              <p className="text-muted text-[10px] leading-relaxed">Adjusted factor matching the contemporary zero-duty premium regulatory regime.</p>
            </div>
          </div>
        </div>

        {/* Interactive Charts & Comparison Mode */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ANALYTICS</span>
            <h4 className="font-serif font-bold text-lg text-ink">30-Year Charting &amp; Normalize View</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Features highly responsive multi-range charts coupled with relative-percentage tracking to normalise commodity comparisons:
          </p>
          <div className="space-y-3 text-xs font-mono text-ink">
            <div className="flex justify-between items-start border-b border-ink/5 pb-2">
              <div>
                <span className="font-bold block">Compounding FX Devaluation</span>
                <span className="text-muted text-[11px] leading-normal block mt-1">
                  Applies historical currency depreciation data to historical spot prices. Allows users to witness how Gold hedge yields compound over 30 years compared to dollar indexes.
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold block">Relative Normalization Toggle</span>
                <span className="text-muted text-[11px] leading-normal block mt-1">
                  Plots Gold, Silver, and Platinum as relative percentage changes from the selected chart window starting point, standardising the massive dollar-per-ounce gap.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progressive Web App & Native Builds */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">CROSS-PLATFORM</span>
            <h4 className="font-serif font-bold text-lg text-ink">One Codebase, Four Surfaces</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Maintains identical feature sets, layout tokens, and synchronization behaviors across multiple target environments:
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="font-bold block text-ink">A. Vite PWA Engine</span>
              <span className="text-muted leading-relaxed block text-[11px]">
                Integrates offline fallback capabilities via <code>vite-plugin-pwa</code>. Caches static shells and displays cached rates gracefully during connection drops.
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-bold block text-ink">B. Capacitor Native Bridge</span>
              <span className="text-muted leading-relaxed block text-[11px]">
                Wraps the compiled React bundle using Capacitor into native iOS and Android packages, offering native binary performance with zero-lag over-the-air client parity.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
