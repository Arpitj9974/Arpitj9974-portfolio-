import React from "react";
import { ExternalLink, Github, Star } from "lucide-react";

interface ProjectCardLinksProps {
  liveUrl?: string;
  githubUrl?: string;
  title: string;
  tag?: string;
  showStar?: boolean;
}

export default function ProjectCardLinks({
  liveUrl,
  githubUrl,
  title,
  tag,
  showStar = false,
}: ProjectCardLinksProps) {
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
