import React from "react";
import { PORTFOLIO_OWNER } from "../data";
import { Mail, Linkedin, Github, MapPin, ArrowUp } from "lucide-react";

interface FooterProps {
  scrollToTop: () => void;
}

export default function Footer({ scrollToTop }: FooterProps) {
  return (
    <footer className="border-t border-ink/10 bg-paper/50 py-12 px-4 md:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Column 1 - Brand */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-xl font-bold tracking-tight text-ink">
              ARPIT JAISWAL
            </span>
            <p className="text-sm text-muted font-sans max-w-sm">
              Designing robust digital products that align business workflows with full-stack technical precision. Connecting finance, analytics, and clean code.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <MapPin size={12} className="text-accent" />
              <span>Based in Surat, Gujarat, India // Available Worldwide</span>
            </div>
          </div>

          {/* Column 2 - Direct Links */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase block">
              // ACTIVE CHANNELS
            </span>
            <ul className="space-y-2.5 text-sm font-mono">
              <li>
                <a 
                  href={`mailto:${PORTFOLIO_OWNER.contactInfo.email}`}
                  className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
                >
                  <Mail size={14} />
                  <span>{PORTFOLIO_OWNER.contactInfo.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://${PORTFOLIO_OWNER.contactInfo.linkedin}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://${PORTFOLIO_OWNER.contactInfo.github}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Technical Footer */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between items-start md:items-end">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-ink/20 text-xs font-mono text-muted hover:text-ink hover:border-ink transition-colors cursor-pointer"
            >
              <ArrowUp size={12} />
              <span>BACK TO TOP</span>
            </button>
            <div className="text-[10px] font-mono text-muted/60 text-left md:text-right space-y-1">
              <div>© {new Date().getFullYear()} ARPIT JAISWAL. ALL RIGHTS RESERVED.</div>
              <div>BUILT WITH REACT, VITE & TAILWIND CSS v4.</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted/40">
          <div>LOCATED IN SURAT, GUJARAT, INDIA // DESIGN PRINCIPLES : INTEGRITY, PRECISION, FLOW</div>
          <div>SYSTEM_COORDINATES: LAT 21.1702, LON 72.8311 // DEV_REPLAY_ACTIVE</div>
        </div>
      </div>
    </footer>
  );
}
