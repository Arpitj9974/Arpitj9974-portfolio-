import React, { useState } from "react";
import { ExternalLink, Github, Star, Link2, Check } from "lucide-react";

interface ProjectCardLinksProps {
  projectId?: string;
  liveUrl?: string;
  githubUrl?: string;
  repoStatus?: "public" | "client-proprietary" | "internal-infra";
  title: string;
  tag?: string;
  showStar?: boolean;
}

export default function ProjectCardLinks({
  projectId,
  liveUrl,
  githubUrl,
  repoStatus,
  title,
  tag,
  showStar = false,
}: ProjectCardLinksProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!projectId || typeof window === "undefined") return;
    const url = `${window.location.origin}/#case-study/${projectId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          title={`Open Live Application — ${title}`}
          aria-label={`Open Live Application for ${title}`}
          className="h-7 w-7 flex items-center justify-center bg-surface-container hover:bg-accent text-ink/80 hover:text-paper border border-ink/15 hover:border-accent rounded-xs transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={13.5} className="stroke-[2.2]" />
        </a>
      )}

      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          title={`View GitHub Repository — ${title}`}
          aria-label={`View GitHub Repository for ${title}`}
          className="h-7 w-7 flex items-center justify-center bg-surface-container hover:bg-ink text-ink/80 hover:text-paper border border-ink/15 hover:border-ink rounded-xs transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={13.5} className="stroke-[2.2]" />
        </a>
      )}

      {projectId && (
        <button
          type="button"
          onClick={handleCopyLink}
          title={copied ? "Direct Link Copied to Clipboard!" : `Copy Direct Link — ${title}`}
          aria-label={copied ? "Direct Link Copied to Clipboard!" : `Copy Direct Link for ${title}`}
          className={`h-7 w-7 flex items-center justify-center border rounded-xs transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs ${
            copied
              ? "bg-accent text-paper border-accent"
              : "bg-surface-container hover:bg-ink/10 text-ink/70 hover:text-ink border-ink/15"
          }`}
        >
          {copied ? <Check size={13} className="stroke-[2.5]" /> : <Link2 size={13.5} className="stroke-[2.2]" />}
        </button>
      )}

      {repoStatus === "client-proprietary" && (
        <span
          title="Proprietary Client Software (Commercial IP under NDA)"
          className="text-muted border border-ink/15 bg-surface-container/70 px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider leading-none"
        >
          &lt;client-ip&gt;
        </span>
      )}

      {tag && (
        <span className="text-accent border border-accent/20 px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider leading-none">
          &lt;{tag}&gt;
        </span>
      )}

      {showStar && (
        <span
          className="text-accent font-bold flex items-center gap-0.5 text-[9px] uppercase tracking-wider pl-0.5"
          title="Featured System"
        >
          <Star size={11} className="fill-accent text-accent" />
        </span>
      )}
    </div>
  );
}
