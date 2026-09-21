import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  Code2
} from "lucide-react";

export interface ProjectItem {
  title: string;
  description?: string;
  longDescription?: string;
  image?: string;
  technologies?: string[];
  tags?: string[];
  skills?: string[];
  category?: string;
  liveUrl?: string;
  liveLink?: string;
  githubUrl?: string;
  link?: string;
  highlights?: string[];
  features?: string[];
  featured?: boolean;
  actionLabel?: string;
  overviewTitle?: string;
  highlightsTitle?: string;
  tagsTitle?: string;
}

export interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onShowComingSoon?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose,
  onShowComingSoon
}) => {
  const [imageError, setImageError] = useState(false);

  // Reset image error state whenever project changes
  useEffect(() => {
    setImageError(false);
  }, [project]);

  // Handle ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Derived fields with smart fallbacks
  const category = project.category || "Project Showcase";
  const title = project.title || "";
  const overview = project.longDescription || project.description || "Comprehensive technical overview for this engineering project.";
  const highlightsList = project.highlights || project.features || [];
  const techList = project.technologies || project.tags || project.skills || [];
  const liveUrl = project.liveUrl || project.liveLink;
  const githubUrl = project.githubUrl || project.link;
  const actionLabel = project.actionLabel || "Launch Live Demo ↗";
  const overviewTitle = project.overviewTitle || "PROJECT OVERVIEW";
  const highlightsTitle = project.highlightsTitle || "KEY ARCHITECTURAL HIGHLIGHTS";
  const tagsTitle = project.tagsTitle || "TECHNOLOGIES & LIBRARIES";

  // Render modal directly into document.body using createPortal
  return createPortal(
    <div 
      id="project-details-modal-wrapper"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        className="relative w-full max-w-3xl max-h-[90vh] my-auto overflow-y-auto custom-scrollbar rounded-2xl bg-[#0a0f1c] border border-slate-700/90 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accessible Close Button (✕) */}
        <button
          id="close-project-modal-btn"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          title="Close (Press Escape)"
        >
          <X size={16} />
        </button>

        {/* Category Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide mb-2.5">
          {category}
        </div>

        {/* Title */}
        <h2 
          id="modal-project-title"
          className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-snug pr-8"
        >
          {title}
        </h2>

        {/* Large Project Preview Image with Referrer Policy & Fallback */}
        <div className="relative w-full h-56 sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-xl my-5 bg-[#040711] flex items-center justify-center">
          {project.image && !imageError ? (
            <img
              src={project.image}
              alt={title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1427] to-[#050711] text-cyan-400/60 p-6 text-center">
              <Code2 size={42} className="mb-2 text-cyan-400/70" />
              <span className="text-xs font-mono text-slate-400 tracking-wider">PROJECT PREVIEW</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/70 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Detailed Project Overview Paragraph */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2">
            <Layers size={14} className="text-cyan-400" />
            <span>{overviewTitle}</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
            {overview}
          </p>
        </div>

        {/* Key Architectural Highlights Checklist with Checkmark Icons */}
        {highlightsList && highlightsList.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3">
              <ShieldCheck size={14} className="text-cyan-400" />
              <span>{highlightsTitle}</span>
            </div>
            <div className="space-y-2.5">
              {highlightsList.map((highlight: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-[#0e1628]/80 border border-white/5 hover:border-cyan-500/20 text-slate-200 text-xs sm:text-sm font-medium transition-all"
                >
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                  <span className="leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Badges */}
        {techList && techList.length > 0 && (
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2.5 block">
              {tagsTitle}
            </span>
            <div className="flex flex-wrap gap-2">
              {techList.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-medium hover:border-cyan-400/30 hover:text-cyan-300 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prominent Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-700/60 mt-auto">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Primary Action Button (Live Demo / View Certificate) */}
            {liveUrl ? (
              <a
                id="modal-launch-demo-btn"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00d2ff] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_26px_rgba(0,210,255,0.6)] transition-all cursor-pointer active:scale-95"
              >
                <ExternalLink size={14} strokeWidth={2.5} />
                <span>{actionLabel}</span>
              </a>
            ) : (
              <button
                id="modal-launch-demo-btn"
                onClick={() => {
                  onClose();
                  onShowComingSoon?.();
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00d2ff]/20 hover:bg-[#00d2ff]/30 text-[#38bdf8] font-bold text-xs sm:text-sm border border-cyan-400/40 transition-all cursor-pointer active:scale-95"
              >
                <ExternalLink size={14} strokeWidth={2.5} />
                <span>{actionLabel}</span>
              </button>
            )}

            {/* View on GitHub Button */}
            {githubUrl && (
              <a
                id="modal-view-github-btn"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#11192e] hover:bg-[#1a2542] border border-white/15 hover:border-white/30 text-white font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer active:scale-95"
              >
                <Github size={14} />
                <span>View on GitHub</span>
              </a>
            )}
          </div>

          {/* Keyboard Shortcut Indicator */}
          <span className="text-xs text-white/40 font-mono tracking-wide hidden sm:block">
            Press ESC to close
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
