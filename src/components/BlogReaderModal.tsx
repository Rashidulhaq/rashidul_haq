import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Clock, 
  Calendar, 
  Share2, 
  Heart, 
  Check, 
  Copy, 
  BookOpen, 
  Sparkles, 
  Linkedin, 
  Quote, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { BlogPost } from "../data/blogData";

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  const [likes, setLikes] = useState<number>(42);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (post) {
      // Seed random likes between 35 and 95
      setLikes(Math.floor(Math.random() * 50) + 40);
      setHasLiked(false);
      setCopiedSnippetIndex(null);
      setCopiedLink(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!post) return null;

  return createPortal(
    <AnimatePresence>
      {post && (
        <div 
          id="blog-reader-modal-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
          onClick={onClose}
        >
          {/* Ambient Glow */}
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/15 blur-[150px] rounded-full pointer-events-none -z-10" />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col my-auto rounded-2xl sm:rounded-3xl bg-[#080d1a]/95 border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(6,182,212,0.1)] backdrop-blur-3xl overflow-hidden"
          >
            {/* Top Reader Navigation Bar */}
            <div className="flex items-center justify-between gap-3 px-5 sm:px-8 py-4 border-b border-white/10 bg-[#060a14]/90 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-wide">
                  {post.category}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 text-xs">
                  <Clock size={12} className="text-cyan-400" />
                  {post.readTime}
                </span>
              </div>

              {/* Reader Action Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  title="Copy article link"
                >
                  {copiedLink ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={13} className="text-cyan-400" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close reader"
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer hover:scale-105"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable Reader Article Content */}
            <div className="overflow-y-auto px-5 sm:px-10 py-6 sm:py-8 space-y-6 scrollbar-thin">
              {/* Header Title & Author info */}
              <div>
                <h1 
                  id="blog-modal-title"
                  className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white leading-snug tracking-tight mb-4"
                >
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.authorImage} 
                      alt={post.author}
                      className="w-11 h-11 rounded-full object-cover border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">{post.author}</p>
                      <p className="text-slate-400 text-xs">{post.authorRole}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-cyan-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-cyan-400" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 bg-[#040812]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-60" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-cyan-300 text-xs font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Article Overview / Lead */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed italic border-l-2 border-cyan-400 pl-4 py-1 bg-cyan-950/20 rounded-r-xl">
                {post.description}
              </p>

              {/* Dynamic Body Sections */}
              <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                {post.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    {section.heading && (
                      <h2 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight flex items-center gap-2 pt-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span>{section.heading}</span>
                      </h2>
                    )}

                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className="text-slate-300/90 leading-relaxed font-normal">
                        {para}
                      </p>
                    ))}

                    {/* Pull Quote */}
                    {section.quote && (
                      <div className="my-5 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-purple-950/40 border border-cyan-500/30 relative">
                        <Quote size={28} className="text-cyan-400/30 absolute top-3 right-4 pointer-events-none" />
                        <p className="text-cyan-200 font-medium italic text-sm sm:text-[15px] leading-relaxed relative z-10">
                          &ldquo;{section.quote}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Syntax Highlighted Code Snippet */}
                    {section.codeSnippet && (
                      <div className="my-5 rounded-2xl overflow-hidden border border-white/10 bg-[#040711] shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a1020] border-b border-white/10 text-xs">
                          <span className="font-mono text-cyan-400 font-semibold uppercase tracking-wider text-[11px]">
                            {section.codeSnippet.language}
                          </span>
                          <button
                            onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                          >
                            {copiedSnippetIndex === idx ? (
                              <>
                                <Check size={12} className="text-emerald-400" />
                                <span className="text-emerald-400 font-medium">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed scrollbar-thin">
                          <code>{section.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    {/* Key Takeaways */}
                    {section.keyTakeaways && (
                      <div className="my-5 p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-cyan-400">
                          <Sparkles size={14} /> Key Architectural Takeaways
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                          {section.keyTakeaways.map((item, kIdx) => (
                            <li key={kIdx} className="flex items-start gap-2">
                              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Interactive Engagement Bar */}
              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={handleLike}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      hasLiked 
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
                        : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/10 hover:bg-white/[0.08]"
                    }`}
                  >
                    <Heart size={15} className={hasLiked ? "fill-rose-400 text-rose-400" : ""} />
                    <span>{likes} Applauds</span>
                  </motion.button>

                  <a 
                    href="https://www.linkedin.com/in/rashidulhaq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 text-white text-xs font-semibold border border-[#0077b5]/40 transition-all cursor-pointer"
                  >
                    <Linkedin size={14} className="text-[#0077b5]" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BlogReaderModal;
