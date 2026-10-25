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
  ChevronRight,
  Sun,
  Moon
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
  // Default to White / Light Paper reading background as requested by user
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

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
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          {/* Ambient Glow */}
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 via-emerald-600/10 to-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl max-h-[94vh] flex flex-col my-auto rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] border overflow-hidden transition-colors duration-200 ${
              isDarkTheme
                ? "bg-[#080d1a]/95 text-slate-200 border-white/15"
                : "bg-white text-slate-850 border-slate-200/90"
            }`}
          >
            {/* Top Reader Navigation Bar */}
            <div className={`flex items-center justify-between gap-3 px-5 sm:px-8 py-3.5 border-b shrink-0 transition-colors duration-200 ${
              isDarkTheme
                ? "bg-[#060a14]/90 border-white/10 text-white"
                : "bg-slate-50/95 border-slate-200/90 text-slate-800"
            }`}>
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
                  isDarkTheme 
                    ? "bg-cyan-500/15 border-cyan-400/30 text-cyan-300"
                    : "bg-emerald-100 border-emerald-300 text-emerald-800"
                }`}>
                  {post.category}
                </span>
                <span className={`hidden sm:inline-flex items-center gap-1 text-xs ${
                  isDarkTheme ? "text-slate-400" : "text-slate-500 font-medium"
                }`}>
                  <Clock size={12} className={isDarkTheme ? "text-cyan-400" : "text-emerald-600"} />
                  {post.readTime}
                </span>
              </div>

              {/* Reader Action Controls */}
              <div className="flex items-center gap-2">
                {/* Reading Background Mode Toggle (White Paper / Dark Night) */}
                <button
                  onClick={() => setIsDarkTheme(prev => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isDarkTheme
                      ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                      : "bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-2xs"
                  }`}
                  title={isDarkTheme ? "Switch to Clean White Background" : "Switch to Night Mode"}
                >
                  {isDarkTheme ? (
                    <>
                      <Sun size={13} className="text-amber-300" />
                      <span className="hidden sm:inline">White Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={13} className="text-slate-600" />
                      <span className="hidden sm:inline">Night Mode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isDarkTheme
                      ? "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-white/80 hover:text-white"
                      : "bg-white hover:bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900 shadow-2xs"
                  }`}
                  title="Copy article link"
                >
                  {copiedLink ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-600 font-bold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={13} className={isDarkTheme ? "text-cyan-400" : "text-emerald-600"} />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close reader"
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
                    isDarkTheme
                      ? "bg-white/5 hover:bg-white/15 border-white/10 text-white/70 hover:text-white"
                      : "bg-white hover:bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900 shadow-2xs"
                  }`}
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable Reader Article Content */}
            <div className={`overflow-y-auto px-5 sm:px-10 py-6 sm:py-8 space-y-6 scrollbar-thin transition-colors duration-200 ${
              isDarkTheme ? "bg-[#080d1a] text-slate-300" : "bg-white text-slate-800"
            }`}>
              {/* Header Title & Author info */}
              <div>
                <h1 
                  id="blog-modal-title"
                  className={`text-2xl sm:text-3xl md:text-4xl font-display font-extrabold leading-snug tracking-tight mb-4 ${
                    isDarkTheme ? "text-white" : "text-slate-900"
                  }`}
                >
                  {post.title}
                </h1>

                <div className={`flex flex-wrap items-center justify-between gap-4 pb-6 border-b ${
                  isDarkTheme ? "border-white/10" : "border-slate-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.authorImage} 
                      alt={post.author}
                      className={`w-11 h-11 rounded-full object-cover border ${
                        isDarkTheme 
                          ? "border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
                          : "border-emerald-500/50 shadow-sm"
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className={`font-bold text-sm leading-tight ${
                        isDarkTheme ? "text-white" : "text-slate-900"
                      }`}>{post.author}</p>
                      <p className={`text-xs ${
                        isDarkTheme ? "text-slate-400" : "text-slate-500"
                      }`}>{post.authorRole}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 text-xs ${
                    isDarkTheme ? "text-slate-400" : "text-slate-500 font-medium"
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className={isDarkTheme ? "text-cyan-400" : "text-emerald-600"} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className={isDarkTheme ? "text-cyan-400" : "text-emerald-600"} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className={`w-full rounded-2xl overflow-hidden relative shadow-lg border flex items-center justify-center ${
                isDarkTheme ? "border-white/10 bg-[#040812]" : "border-slate-200 bg-slate-50"
              }`}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full max-h-[440px] object-cover sm:object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                {isDarkTheme && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-40 pointer-events-none" />
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                      isDarkTheme 
                        ? "bg-white/[0.04] border-white/10 text-cyan-300 font-mono" 
                        : "bg-emerald-50 border-emerald-200 text-emerald-800"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Article Overview / Lead */}
              <p className={`text-base sm:text-[17px] font-normal leading-relaxed italic border-l-4 pl-4 py-2.5 rounded-r-xl ${
                isDarkTheme 
                  ? "text-slate-200 bg-cyan-950/25 border-cyan-400" 
                  : "text-slate-800 bg-emerald-50/80 border-emerald-600 shadow-2xs"
              }`}>
                {post.description}
              </p>

              {/* Dynamic Body Sections */}
              <div className="space-y-8 pt-2">
                {post.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    {section.heading && (
                      <h2 className={`text-xl sm:text-2xl font-display font-bold tracking-tight flex items-center gap-2.5 pt-3 pb-1 border-b ${
                        isDarkTheme ? "text-white border-white/10" : "text-slate-900 border-slate-200"
                      }`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          isDarkTheme ? "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-emerald-600 shadow-xs"
                        }`} />
                        <span>{section.heading}</span>
                      </h2>
                    )}

                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className={`leading-[1.95] text-[15.5px] sm:text-[17px] font-normal ${
                        isDarkTheme ? "text-slate-300/90" : "text-slate-800"
                      }`}>
                        {para.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, pI) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pI} className={`font-bold ${
                              isDarkTheme ? "text-white" : "text-slate-950"
                            }`}>{part.slice(2, -2)}</strong>;
                          }
                          if (part.startsWith('*') && part.endsWith('*')) {
                            return <em key={pI} className={`italic ${
                              isDarkTheme ? "text-cyan-300" : "text-emerald-800 font-medium"
                            }`}>{part.slice(1, -1)}</em>;
                          }
                          return part;
                        })}
                      </p>
                    ))}

                    {/* Quranic Verse / Calligraphic Card */}
                    {section.quranVerse && (
                      <div className={`my-6 p-6 sm:p-7 rounded-2xl relative overflow-hidden group border ${
                        isDarkTheme
                          ? "bg-gradient-to-br from-emerald-950/40 via-[#0a1820]/70 to-amber-950/30 border-emerald-500/30 shadow-[0_4px_30px_rgba(16,185,129,0.12)]"
                          : "bg-gradient-to-br from-[#f8faf8] via-[#ffffff] to-[#fbf8f0] border-emerald-300/80 shadow-md"
                      }`}>
                        <div className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
                          isDarkTheme ? "bg-emerald-500/10" : "bg-emerald-200/30"
                        }`} />
                        
                        {/* Arabic Calligraphy Ayah */}
                        <div 
                          className={`text-right text-xl sm:text-2xl md:text-[28px] font-serif leading-[2.2] tracking-wide py-2 font-normal select-text ${
                            isDarkTheme ? "text-amber-200" : "text-emerald-950 font-medium"
                          }`} 
                          dir="rtl"
                          style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade New', serif" }}
                        >
                          {section.quranVerse.arabic}
                        </div>

                        {/* Translation */}
                        <div className={`mt-4 pt-4 border-t text-sm sm:text-base leading-relaxed ${
                          isDarkTheme 
                            ? "border-emerald-500/20 text-slate-200" 
                            : "border-emerald-200 text-slate-800"
                        }`}>
                          <span className={`font-bold mr-2 ${
                            isDarkTheme ? "text-amber-400" : "text-emerald-800"
                          }`}>বাংলা অর্থ:</span>
                          <span className={isDarkTheme ? "text-slate-100" : "text-slate-900 font-medium"}>
                            {section.quranVerse.translation}
                          </span>
                        </div>

                        {/* Reference / Surah */}
                        {section.quranVerse.reference && (
                          <div className={`mt-2.5 text-xs font-semibold text-right tracking-wider ${
                            isDarkTheme ? "text-emerald-400" : "text-emerald-700 font-bold"
                          }`}>
                            — {section.quranVerse.reference}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pull Quote */}
                    {section.quote && (
                      <div className={`my-5 p-5 sm:p-6 rounded-2xl relative border ${
                        isDarkTheme
                          ? "bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-purple-950/40 border-cyan-500/30"
                          : "bg-amber-50/90 border-amber-300/80 border-l-4 border-l-amber-500 shadow-2xs"
                      }`}>
                        <Quote size={28} className={`absolute top-3 right-4 pointer-events-none ${
                          isDarkTheme ? "text-cyan-400/30" : "text-amber-500/30"
                        }`} />
                        <p className={`font-medium italic text-[15px] sm:text-[16px] leading-relaxed relative z-10 ${
                          isDarkTheme ? "text-cyan-200" : "text-amber-950"
                        }`}>
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
                      <div className={`my-5 p-5 rounded-2xl border space-y-2.5 ${
                        isDarkTheme 
                          ? "bg-white/[0.02] border-white/10" 
                          : "bg-slate-50 border-slate-200 shadow-2xs"
                      }`}>
                        <h4 className={`font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 ${
                          isDarkTheme ? "text-cyan-400" : "text-emerald-700"
                        }`}>
                          <Sparkles size={14} /> Key Takeaways
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                          {section.keyTakeaways.map((item, kIdx) => (
                            <li key={kIdx} className={`flex items-start gap-2 ${
                              isDarkTheme ? "text-slate-300" : "text-slate-800"
                            }`}>
                              <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${
                                isDarkTheme ? "text-emerald-400" : "text-emerald-600"
                              }`} />
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
              <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isDarkTheme ? "border-white/10" : "border-slate-200"
              }`}>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={handleLike}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      hasLiked 
                        ? (isDarkTheme 
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                            : "bg-rose-50 text-rose-600 border border-rose-300 shadow-2xs")
                        : (isDarkTheme
                            ? "bg-white/[0.04] text-slate-300 hover:text-white border border-white/10 hover:bg-white/[0.08]"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300")
                    }`}
                  >
                    <Heart size={15} className={hasLiked ? "fill-rose-500 text-rose-500" : ""} />
                    <span>{likes} Applauds</span>
                  </motion.button>

                  <a 
                    href="https://www.linkedin.com/in/rashidulhaq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isDarkTheme
                        ? "bg-[#0077b5]/20 hover:bg-[#0077b5]/30 text-white border-[#0077b5]/40"
                        : "bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#005582] border-[#0077b5]/30"
                    }`}
                  >
                    <Linkedin size={14} className="text-[#0077b5]" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>

                <button
                  onClick={onClose}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    isDarkTheme
                      ? "bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white border-white/10"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-300"
                  }`}
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
