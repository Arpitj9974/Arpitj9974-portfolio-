import React, { useState } from "react";
import { Camera, Scan, CheckCircle2, AlertTriangle, Clock, Sparkles, RefreshCw, FileCode } from "lucide-react";

interface SamplePackage {
  id: string;
  name: string;
  category: string;
  type: string;
  rawTextStamp: string;
  parsed: {
    productName: string;
    brand: string;
    mfd: string;
    expiryDate: string;
    batchNo: string;
    mrp: string;
    status: "FRESH" | "CRITICAL" | "EXPIRED";
    daysLeft: number;
    shelfLifeRatio: number;
    fifoAlert: string;
  };
}

const SAMPLE_PACKAGES: SamplePackage[] = [
  {
    id: "milk",
    name: "Amul Taaza Milk 500ml",
    category: "Dairy & Perishables",
    type: "Short Life (Critical)",
    rawTextStamp: "PKG: 23/09/2026 06:14 // USE BY: 25/09/2026 // B.NO: AT-892 // ₹28.00",
    parsed: {
      productName: "Amul Taaza Homogenised Toned Milk",
      brand: "Amul",
      mfd: "2026-09-23",
      expiryDate: "2026-09-25",
      batchNo: "AT-892",
      mrp: "₹28.00",
      status: "CRITICAL",
      daysLeft: 1,
      shelfLifeRatio: 85,
      fifoAlert: "⚠️ Rotate to front rack. Must consume within 24h."
    }
  },
  {
    id: "medicine",
    name: "Dolo 650mg Paracetamol Foil",
    category: "Pharmaceuticals",
    type: "Extended Shelf Life",
    rawTextStamp: "B.No. DL-4019 // MFG.DATE: JAN 2025 // EXP.DATE: DEC 2027 // M.R.P. ₹34.50",
    parsed: {
      productName: "Dolo 650 Paracetamol IP Tablets",
      brand: "Micro Labs",
      mfd: "2025-01-01",
      expiryDate: "2027-12-31",
      batchNo: "DL-4019",
      mrp: "₹34.50",
      status: "FRESH",
      daysLeft: 462,
      shelfLifeRatio: 22,
      fifoAlert: "✅ Optimum condition. Safe for general inventory."
    }
  },
  {
    id: "bread",
    name: "Harvest Gold Multigrain Bread",
    category: "Bakery Products",
    type: "Expired Edge Case",
    rawTextStamp: "MFD 17/09/26 // BEST BEFORE 5 DAYS FROM PKG // ₹55.00 // B#B-14",
    parsed: {
      productName: "Harvest Gold Multigrain Sliced Bread",
      brand: "Harvest Gold",
      mfd: "2026-09-17",
      expiryDate: "2026-09-22",
      batchNo: "B-14",
      mrp: "₹55.00",
      status: "EXPIRED",
      daysLeft: -3,
      shelfLifeRatio: 100,
      fifoAlert: "⛔ PAST EXPIRY DATE. Quarantine immediately from shelf."
    }
  }
];

export default function FreshStampDeepDive() {
  const [activeSample, setActiveSample] = useState<SamplePackage>(SAMPLE_PACKAGES[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleSelectSample = (sample: SamplePackage) => {
    setIsScanning(true);
    setActiveSample(sample);
    setTimeout(() => {
      setIsScanning(false);
    }, 350);
  };

  return (
    <div className="border-t border-ink/10 pt-10 space-y-12 animate-fade-in">
      <div className="space-y-2">
        <span className="text-xs font-mono text-accent tracking-widest block uppercase">// MULTIMODAL COMPUTER VISION & CLOUD ARCHITECTURES</span>
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
          Deep-Dive: Gemini Vision OCR & Dual-Storage Sync
        </h2>
        <p className="text-sm text-muted max-w-3xl leading-relaxed font-sans">
          FreshStamp leverages advanced Gemini 3.5 Flash JSON extraction parameters alongside real-time multi-device cloud persistence patterns and smart FIFO consumption warnings.
        </p>
      </div>

      {/* INTERACTIVE OCR SCANNER DEMO */}
      <div className="border border-accent/30 bg-surface-container/80 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-ink/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Camera size={14} /> // LIVE OCR EXTRACTION SIMULATOR
            </span>
            <p className="text-xs text-muted font-sans">
              Test how FreshStamp extracts dates, prices, and batch numbers off noisy consumer packaging on-device.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted uppercase bg-paper px-2 py-1 border border-ink/10">
              ENGINE: GEMINI 3.5 FLASH JSON
            </span>
          </div>
        </div>

        {/* Sample selection buttons */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">SELECT SAMPLE PACKAGING:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_PACKAGES.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectSample(s)}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  activeSample.id === s.id
                    ? "border-accent bg-accent/10 text-ink shadow-sm"
                    : "border-ink/10 bg-paper hover:border-ink/30 text-muted"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                  <span className="font-bold text-ink">{s.category}</span>
                  <span className={s.parsed.status === "EXPIRED" ? "text-red-500 font-bold" : s.parsed.status === "CRITICAL" ? "text-amber-500 font-bold" : "text-emerald-600 font-bold"}>
                    {s.type}
                  </span>
                </div>
                <div className="text-xs font-sans font-bold text-ink truncate">{s.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Simulator Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Packaging Viewfinder (Span 6) */}
          <div className="lg:col-span-6 bg-ink text-paper p-5 flex flex-col justify-between relative overflow-hidden font-mono border border-ink">
            {/* Viewfinder Target HUD */}
            <div className="flex justify-between items-center text-[10px] text-paper/60 border-b border-paper/10 pb-2">
              <span className="flex items-center gap-1.5 text-accent font-bold">
                <Scan size={12} className={isScanning ? "animate-spin" : ""} /> CAMERA VIEWFINDER (1024x1024)
              </span>
              <span>CONFIDENCE: 99.2%</span>
            </div>

            {/* Simulated Packaging Graphic */}
            <div className="py-8 px-4 my-auto relative border border-dashed border-paper/20 rounded bg-paper/5 text-center space-y-3">
              {/* Laser scan animation line */}
              {isScanning && (
                <div className="absolute inset-0 bg-accent/15 border-b-2 border-accent animate-pulse" />
              )}
              
              <span className="text-xs font-serif font-bold text-paper block tracking-wide">
                {activeSample.name}
              </span>
              
              {/* Highlighted Bounding Box Target */}
              <div className="inline-block p-2.5 border-2 border-accent bg-accent/20 rounded relative">
                <span className="absolute -top-2.5 left-2 bg-accent text-paper text-[8px] font-mono uppercase px-1 font-bold">
                  OCR TARGET DETECTED
                </span>
                <code className="text-xs text-paper block font-mono">
                  {activeSample.rawTextStamp}
                </code>
              </div>

              <div className="text-[10px] text-paper/50">
                Extracted via Multimodal Base64 Buffer // ISO-8601 Temporal Fallback
              </div>
            </div>

            {/* Viewfinder Footer */}
            <div className="flex justify-between items-center pt-2 border-t border-paper/10 text-[10px] text-paper/60">
              <span>LATENCY: 142ms</span>
              <span>RESOLUTION: 72% JPEG OPTIMIZED</span>
            </div>
          </div>

          {/* Parsed JSON Result & Inventory Decision (Span 6) */}
          <div className="lg:col-span-6 bg-paper border border-ink/15 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-ink uppercase flex items-center gap-1.5">
                  <FileCode size={13} className="text-accent" /> STRUCTURED JSON OUTPUT
                </span>
                
                {/* Status Pill */}
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider ${
                  activeSample.parsed.status === "EXPIRED"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : activeSample.parsed.status === "CRITICAL"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}>
                  {activeSample.parsed.status === "EXPIRED" ? "⛔ EXPIRED" : activeSample.parsed.status === "CRITICAL" ? "⚠️ EXPIRES SOON" : "✅ FRESH"}
                </span>
              </div>

              {/* JSON code block */}
              <pre className="bg-surface-container p-3 text-[11px] font-mono text-ink overflow-x-auto border border-ink/10 leading-relaxed rounded">
{`{
  "productName": "${activeSample.parsed.productName}",
  "brand": "${activeSample.parsed.brand}",
  "batchNo": "${activeSample.parsed.batchNo}",
  "mfd": "${activeSample.parsed.mfd}",
  "expiryDate": "${activeSample.parsed.expiryDate}",
  "mrp": "${activeSample.parsed.mrp}",
  "daysRemaining": ${activeSample.parsed.daysLeft},
  "status": "${activeSample.parsed.status}"
}`}
              </pre>

              {/* Shelf Life Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-muted">
                  <span>SHELF LIFE EXPENDED</span>
                  <span>{activeSample.parsed.shelfLifeRatio}%</span>
                </div>
                <div className="w-full bg-ink/10 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      activeSample.parsed.status === "EXPIRED" ? "bg-red-500" : activeSample.parsed.status === "CRITICAL" ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(100, activeSample.parsed.shelfLifeRatio)}%` }}
                  />
                </div>
              </div>

              {/* FIFO Inventory Recommendation */}
              <div className="p-3 bg-surface-container/60 border border-ink/10 text-xs font-mono text-ink space-y-1">
                <span className="text-[10px] text-muted block uppercase font-bold">// FIFO DISPATCH DIRECTIVE:</span>
                <p className="text-xs leading-relaxed font-sans">{activeSample.parsed.fifoAlert}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Gemini Vision OCR extraction */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">COMPUTER VISION</span>
            <h4 className="font-serif font-bold text-lg text-ink">Gemini 3.5 Flash JSON Mode</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            To bypass the high friction of typing product info manually, the app converts images to structured, typed objects securely:
          </p>
          <div className="border border-accent/10 bg-accent/5 p-3.5 space-y-2 rounded text-xs font-mono text-ink">
            <div className="flex justify-between font-bold text-accent">
              <span>STEP / PARAMETER</span>
              <span>ACTION DESCRIPTION</span>
            </div>
            <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
              <strong className="block text-ink">1. MULTIPART DATA TRANSFERS</strong>
              <span className="text-muted text-[10px]">Converts camera images to data URIs inside the browser, passing them base64-encoded to serverless microservices.</span>
            </div>
            <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
              <strong className="block text-ink">2. FORCED JSON SCHEMA</strong>
              <span className="text-muted text-[10px]">Utilizes <code>responseMimeType: 'application/json'</code> to mandate strict schema compatibility across 7 parsed values (name, dates, price).</span>
            </div>
            <div className="pt-1 border-t border-ink/5 text-[11px] leading-relaxed">
              <strong className="block text-ink">3. TEMPORAL FALLBACKS</strong>
              <span className="text-muted text-[10px]">Automatically resolves imprecise packaging dates (e.g. "Best Before Oct 2026") to absolute end-of-month calendar dates.</span>
            </div>
          </div>
        </div>

        {/* Dual Sync Pipeline */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">PERSISTENCE</span>
            <h4 className="font-serif font-bold text-lg text-ink">Dual-Channel Sync & Fallbacks</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Optimistic UI writes are paired with local/cloud replication models for bulletproof performance and seamless offline usage:
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-paper p-3 border border-ink/5 rounded">
              <span className="text-accent text-xs font-bold block">GUEST CHANNELS</span>
              <span className="text-[10px] text-muted block mt-1">Saves snapshots locally with relative seeds. Transitioning to Google login migrates all offline records.</span>
            </div>
            <div className="bg-paper p-3 border border-ink/5 rounded">
              <span className="text-accent text-xs font-bold block">CLOUD PERSISTENCE</span>
              <span className="text-[10px] text-muted block mt-1">Fires non-blocking Firestore document payloads to isolate, validate, and secure entries across devices.</span>
            </div>
          </div>
          <p className="text-[11px] text-muted font-mono leading-relaxed">
            All local caching operations are namespace-isolated using authenticated Firebase IDs, completely eliminating browser state corruption.
          </p>
        </div>

        {/* FIFO Batch rotation */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">ALGORITHMS</span>
            <h4 className="font-serif font-bold text-lg text-ink">FIFO Batch Rotation Engine</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            FreshStamp tracks multiple inventory instances without adding redundant tables or bloating your database footprint:
          </p>
          <div className="space-y-3 text-xs font-mono text-ink">
            <div className="flex justify-between items-start border-b border-ink/5 pb-2">
              <div>
                <span className="font-bold block">Derived State Multi-Batching</span>
                <span className="text-muted text-[11px] leading-normal block mt-1">
                  Detects items sharing the same name and brand at runtime, calculating batch counts (Batch X of Y) with zero database overhead.
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold block">Temporal Proximity Engine</span>
                <span className="text-muted text-[11px] leading-normal block mt-1">
                  Computes calendar differences precisely down to day/month/year deltas, applying pulsing 'Consume First! 💡' warning badges to earlier-expiring items.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shelf Life consumed and export-backup system */}
        <div className="bg-surface-container/60 border border-ink/10 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-mono text-xs px-2 py-0.5 font-bold">UTILITIES</span>
            <h4 className="font-serif font-bold text-lg text-ink">Shelf Life Ratios & JSON Backups</h4>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Designed with advanced user utility helpers to secure data ownership and track item status transitions:
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-ink">
            <li className="flex items-start gap-1">
              <span className="text-accent font-bold">•</span>
              <span><strong>Shelf Life Progress:</strong> Displays active consumable ratios: <code>(Today - MFD) / (EXP - MFD)</code> with dynamic color shifting.</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-accent font-bold">•</span>
              <span><strong>Data Backups:</strong> Implements zero-dependency browser download anchors to back up and restore datasets with ease.</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-accent font-bold">•</span>
              <span><strong>Verified Zero Waste:</strong> Features positive reinforcement stats panels when no items are wasted during active billing intervals.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
