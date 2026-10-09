import React, { useState, useEffect } from "react";
import { X, Download, Printer, FileText, Eye } from "lucide-react";
import PrintableResume from "./PrintableResume";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export default function ResumeModal({ isOpen, onClose, onDownload }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<"pdf" | "web">("pdf");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Preview"
    >
      <div 
        className="bg-paper border border-ink/15 shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top bar */}
        <div className="bg-surface-container border-b border-ink/10 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-ink">Arpit Jaiswal — Resume</h3>
              <p className="text-[10px] sm:text-xs text-muted font-mono mt-0.5">
                {viewMode === "pdf" ? "OFFICIAL 2-PAGE PDF DOCUMENT" : "INTERACTIVE PRINTABLE WEB VIEW"}
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="inline-flex p-0.5 bg-paper border border-ink/15 rounded-xs ml-0 sm:ml-2">
              <button
                type="button"
                onClick={() => setViewMode("pdf")}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer rounded-xs ${
                  viewMode === "pdf"
                    ? "bg-ink text-paper shadow-2xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Eye size={12} />
                <span>PDF File</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("web")}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer rounded-xs ${
                  viewMode === "web"
                    ? "bg-accent text-paper shadow-2xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                <FileText size={12} />
                <span>Web Layout</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            {viewMode === "web" && (
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 border border-ink/20 hover:border-accent hover:text-accent text-ink font-mono text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-colors shadow-2xs"
                title="Print clean 2-page resume via browser"
              >
                <Printer size={13} />
                <span>Print</span>
              </button>
            )}

            <button
              type="button"
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-colors shadow-2xs"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-2 border border-ink/20 hover:border-ink text-ink font-mono text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
            >
              <X size={13} />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        {viewMode === "pdf" ? (
          <div className="flex-1 bg-charcoal-200 overflow-hidden">
            <iframe
              src="/Arpit_Jaiswal_Resume_.pdf"
              title="Official PDF Resume Preview"
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="flex-1 bg-surface-container/30 overflow-y-auto p-3 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto bg-white p-5 sm:p-8 md:p-10 shadow-lg border border-ink/10 rounded-xs">
              <PrintableResume isModal={true} />
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
