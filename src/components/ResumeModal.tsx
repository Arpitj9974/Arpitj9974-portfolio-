import React from "react";
import { X, Download } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export default function ResumeModal({ isOpen, onClose, onDownload }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="bg-paper border border-ink/15 shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top bar */}
        <div className="bg-surface-container border-b border-ink/10 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
          <div>
            <h3 className="font-serif font-bold text-lg text-ink">Arpit Jaiswal — Resume</h3>
            <p className="text-xs text-muted font-mono mt-0.5">PDF PREVIEW</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors w-full sm:w-auto justify-center shadow-xs"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2.5 border border-ink/20 hover:border-ink text-ink font-mono text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors w-full sm:w-auto justify-center"
            >
              <X size={14} />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-charcoal-200 overflow-hidden">
          <iframe
            src="/Arpit_Jaiswal_Resume_.pdf"
            title="Resume Preview"
            className="w-full h-full border-0"
          />
        </div>
        
      </div>
    </div>
  );
}
