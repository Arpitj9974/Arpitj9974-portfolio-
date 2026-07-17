import React, { useRef } from "react";
import { X, Printer } from "lucide-react";
import PrintableResume from "./PrintableResume";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 md:p-8 animate-fade-in">
      <div className="bg-paper border border-ink/15 shadow-2xl max-w-4xl w-full my-4 flex flex-col rounded-md overflow-hidden">
        
        {/* Top bar */}
        <div className="bg-surface-container border-b border-ink/10 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-ink">Arpit Jaiswal — Professional Resume</h3>
            <p className="text-xs text-muted font-mono mt-0.5">HIGH-FIDELITY VECTOR PRINT ENGINE PREVIEW</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors w-full sm:w-auto justify-center shadow-xs"
            >
              <Printer size={14} />
              <span>Print or Save to PDF</span>
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

        {/* Info Banner */}
        <div className="bg-accent/5 border-b border-accent/10 px-6 py-3 text-xs text-ink/90 flex items-start gap-2.5 font-sans">
          <span className="text-accent text-sm">💡</span>
          <p className="leading-relaxed">
            <strong>For a Perfect PDF Download:</strong> Click the <strong className="text-accent">"Print or Save to PDF"</strong> button above, then in your browser's Print dialog, set the Destination to <strong>"Save as PDF"</strong> or <strong>"Microsoft Print to PDF"</strong>. Under More Settings, make sure <strong>"Background graphics"</strong> is checked and Margins are set to <strong>"Default"</strong>.
          </p>
        </div>

        {/* Scrollable Document Stage */}
        <div className="p-4 md:p-8 bg-surface-container/40 overflow-y-auto max-h-[70vh] flex justify-center">
          <div 
            id="resume-print-root" 
            ref={resumeRef}
            className="w-full max-w-[8.27in] bg-white shadow-md border border-ink/5"
          >
            <PrintableResume isModal={true} />
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-surface-container border-t border-ink/10 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-ink hover:bg-accent text-paper font-mono text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors"
          >
            Done Checking
          </button>
        </div>
        
      </div>
    </div>
  );
}
