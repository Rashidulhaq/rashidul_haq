import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ExternalLink, 
  Code2, 
  ArrowRight, 
  Github, 
  ChevronRight, 
  Zap,
  Sparkles,
  Star,
  Check,
  Layers,
  Search,
  X,
  RotateCcw
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";
import ProjectModal, { ProjectItem } from "./ProjectModal";

export default function Projects({ 
  onShowComingSoon 
}: { 
  onShowComingSoon?: () => void 
}) {
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Exact categories matching the user reference
  const categories = [
    { id: "All", label: "All" },
    { id: "React", label: "React" },
    { id: "JavaScript", label: "JavaScript" },
    { id: "HTML/CSS", label: "HTML/CSS" },
    { id: "Full Stack", label: "Full Stack" },
    { id: "Other", label: "Other" }
  ];

  const matchesCategory = (p: typeof PORTFOLIO_DATA.projects[0], catId: string): boolean => {
    if (catId === "All") return true;

    const titleLower = p.title.toLowerCase();
    const catLower = p.category.toLowerCase();
    const tagsLower = p.tags.map(t => t.toLowerCase());

    if (catId === "React") {
      return (
        titleLower.includes("react") ||
        catLower.includes("react") ||
        tagsLower.some(t => t.includes("react"))
      );
    }

    if (catId === "JavaScript") {
      return (
        titleLower.includes("javascript") ||
        catLower.includes("javascript") ||
        tagsLower.some(t => t.includes("javascript") || t === "js" || t === "pwa" || t === "indexeddb")
      );
    }

    if (catId === "HTML/CSS") {
      return (
        tagsLower.some(t => t.includes("html") || t.includes("css") || t.includes("tailwind")) ||
        catLower.includes("html") ||
        catLower.includes("css")
      );
    }

    if (catId === "Full Stack") {
      return (
        catLower.includes("full stack") ||
        catLower.includes("e-commerce") ||
        tagsLower.some(t => 
          t.includes("full stack") || 
          t.includes("php") || 
          t.includes("mysql") || 
          t.includes("node") || 
          t.includes("express") || 
          t.includes("firebase") ||
          t.includes("database")
        )
      );
    }

    if (catId === "Other") {
      return (
        tagsLower.some(t => ["python", "arduino", "iot", "c#", "java", ".net", "sensors", "tensorflow", "embedded"].some(k => t.includes(k))) ||
        catLower.includes("iot") ||
        catLower.includes("java") ||
        catLower.includes("deep learning") ||
        catLower.includes("microprocessor")
      );
    }

    return true;
  };

  const getCategoryCount = (catId: string) => {
    if (catId === "All") return PORTFOLIO_DATA.projects.length;
    return PORTFOLIO_DATA.projects.filter(p => matchesCategory(p, catId)).length;
  };

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((p) => {
      // Category match
      if (!matchesCategory(p, selectedCategory)) {
        return false;
      }

      // Search query match
      if (!searchQuery.trim()) {
        return true;
      }

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = p.title.toLowerCase().includes(q);
      const descMatch = p.description.toLowerCase().includes(q);
      const catMatch = p.category.toLowerCase().includes(q);
      const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
      const featureMatch = p.features?.some((f) => f.toLowerCase().includes(q));

      return titleMatch || descMatch || catMatch || tagMatch || featureMatch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, 8);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Anchor for backward compatibility with #portfolio */}
      <span id="portfolio" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="layout-container relative z-10">
        {/* ========================================================= */}
        {/* SPOTLIGHT SHOWCASE: FEATURED MASTERPIECE (FLAGSHIP CARD)  */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-7xl mx-auto mb-20 px-2 sm:px-4"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 px-1">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-[11px] font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-md">
                <Sparkles size={12} className="text-brand-light" />
                <span>Spotlight Showcase</span>
              </div>
              
              <div className="relative inline-block">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-display font-bold text-white tracking-tight leading-tight">
                  Featured <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent inline-block">Masterpiece</span>
                </h3>
                <div className="absolute -inset-2 bg-brand/20 blur-xl rounded-full opacity-35 -z-10" />
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#ec4899] rounded-full mt-2 opacity-80" />
              </div>

              <p className="text-white/60 text-xs sm:text-sm mt-2.5 font-normal max-w-xl">
                Flagship production web application highlighting modern architecture, responsive performance, and dual-engine AI.
              </p>
            </div>

            <a
              href="https://github.com/Rashidulhaq/khorcha.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-light hover:text-white transition-colors group self-start sm:self-auto pb-1"
            >
              <span>Read case study on GitHub</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Masterpiece Showcase Container */}
          <div className="relative rounded-2xl sm:rounded-[2rem] p-4 sm:p-7 lg:p-9 bg-gradient-to-b from-[#080d1a]/95 via-[#060913]/98 to-[#04060d] border border-white/10 hover:border-brand/40 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(99,102,241,0.08)] backdrop-blur-2xl overflow-hidden transition-all duration-500 group/spotlight">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-500/15 to-purple-500/10 blur-[110px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-gradient-to-tr from-pink-500/10 to-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
              
              {/* Left Column: Browser Mockup Frame */}
              <div className="lg:col-span-7">
                <div className="rounded-xl bg-[#040711] border border-white/10 shadow-2xl overflow-hidden group/frame">
                  {/* Browser Header Bar */}
                  <div className="px-3.5 py-2.5 bg-[#080d1a] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0d1829] border border-cyan-500/25 text-[10px] font-medium text-cyan-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>khorchaai.vercel.app</span>
                    </div>

                    <div className="w-10" />
                  </div>

                  {/* Browser Content */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#02040a]">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
                      alt="Khorcha AI Preview"
                      className="w-full h-full object-cover group-hover/frame:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#070b16]/90 border border-white/10 backdrop-blur-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-brand-light text-[10px] font-bold">
                          AI
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white leading-none">Dual-Engine AI Expense Engine</p>
                          <p className="text-[9.5px] text-slate-400 mt-0.5">Gemini 3.8 Flash + Bangla/Banglish NLP</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[9.5px] font-semibold">
                        Offline Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Project Details & Actions */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0a1e30] border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold tracking-wide">
                    React 19 + TypeScript
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-300 text-[11px] font-semibold tracking-wide">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>Featured Flagship</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl lg:text-[1.65rem] font-display font-bold text-white leading-snug tracking-tight">
                    Khorcha AI – Intelligent Expense Tracker & Financial Health
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed mt-2">
                    Privacy-first personal money management built for Bangladeshi users with natural language Bengali/Banglish NLP expense parsing, Gemini 3.8 Flash dual-engine AI, and real-time 50/30/20 health telemetry.
                  </p>
                </div>

                <div className="space-y-2 pt-0.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-cyan-400/90 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Check size={9} strokeWidth={3} />
                    </div>
                    <span className="text-xs text-slate-300 leading-snug font-normal">
                      <strong className="text-white font-medium">Bangla & Banglish NLP:</strong> Real-time heuristic and natural language expense parsing.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-cyan-400/90 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Check size={9} strokeWidth={3} />
                    </div>
                    <span className="text-xs text-slate-300 leading-snug font-normal">
                      <strong className="text-white font-medium">Dual-Engine AI:</strong> Google Gemini 3.8 Flash fallback with offline-first heuristic parsing.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-cyan-400/90 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Check size={9} strokeWidth={3} />
                    </div>
                    <span className="text-xs text-slate-300 leading-snug font-normal">
                      <strong className="text-white font-medium">50/30/20 Telemetry:</strong> Financial health rule tracking & instant client-side PDF export.
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    TECHNOLOGIES USED
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["React 19", "TypeScript", "Bangla NLP", "Google Gemini", "Tailwind CSS", "Express"].map((tech) => (
                      <span 
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#0b1220] border border-white/10 text-slate-300 text-[11px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-nowrap items-center gap-2 pt-2">
                  <motion.a
                    href="https://khorchaai.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#00d2ff] to-[#38bdf8] text-[#030712] font-black text-xs shadow-[0_0_20px_rgba(0,210,255,0.45)] hover:shadow-[0_0_28px_rgba(0,210,255,0.7)] hover:brightness-110 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <ExternalLink size={13} strokeWidth={2.5} />
                    <span>Live Demo</span>
                  </motion.a>

                  <motion.a
                    href="https://github.com/Rashidulhaq/khorcha.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#111827] to-[#1e1b4b] hover:from-[#1e293b] hover:to-[#2e1065] border border-indigo-400/40 hover:border-indigo-300/70 text-white font-bold text-xs shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_22px_rgba(99,102,241,0.45)] transition-all whitespace-nowrap cursor-pointer"
                  >
                    <Github size={13} />
                    <span>GitHub</span>
                  </motion.a>

                  <button
                    onClick={() => setActiveProjectModal(PORTFOLIO_DATA.projects[0])}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ec4899]/20 via-[#a855f7]/25 to-[#6366f1]/20 hover:from-[#ec4899]/35 hover:via-[#a855f7]/40 hover:to-[#6366f1]/35 border border-[#ec4899]/40 hover:border-[#ec4899]/70 text-white font-bold text-xs shadow-[0_0_15px_rgba(236,72,153,0.25)] hover:shadow-[0_0_22px_rgba(236,72,153,0.45)] transition-all whitespace-nowrap cursor-pointer"
                  >
                    <Code2 size={13} />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header: Projects Showcase */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-[11px] font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
          >
            <Zap size={12} /> <span>Engineering Works</span>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Projects <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent inline-block">Showcase</span>
            </h2>
            <div className="absolute -inset-4 bg-brand/20 blur-2xl rounded-full opacity-40 -z-10" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#ec4899] rounded-full mx-auto mt-3 opacity-70" />
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-white/50 text-sm md:text-[15px] font-normal max-w-xl mx-auto mt-3 tracking-wide"
          >
            A curated showcase of {PORTFOLIO_DATA.projects.length}+ completed applications spanning AI models, offline PWAs, full-stack systems, and IoT microprocessors.
          </motion.p>
        </motion.div>

        {/* ========================================================= */}
        {/* EYE-CATCHING CATEGORY FILTER PILLS & GLOWING SEARCH BAR   */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center gap-5 mb-14 w-full max-w-4xl mx-auto px-2">
          {/* Category Filter Pills Container */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1.5 scrollbar-hide flex justify-start sm:justify-center">
            <div className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#070e1d]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.06)] gap-1 sm:gap-2">
              {categories.map((cat) => {
                const count = getCategoryCount(cat.id);
                const isSelected = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowAllProjects(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "border border-cyan-400 bg-cyan-950/60 text-white shadow-[0_0_18px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/50"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-bold transition-all ${
                        isSelected
                          ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                          : "bg-white/[0.08] text-slate-400 group-hover:text-slate-200 group-hover:bg-white/[0.12]"
                      }`}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Glowing Centered Search Bar */}
          <div className="w-full max-w-xl mx-auto relative group">
            <div className="relative flex items-center w-full rounded-2xl sm:rounded-full bg-[#050914]/90 backdrop-blur-xl border border-cyan-500/50 hover:border-cyan-400 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-500/30 shadow-[0_0_22px_rgba(6,182,212,0.22)] focus-within:shadow-[0_0_32px_rgba(6,182,212,0.45)] transition-all duration-300 px-4 py-2.5 sm:py-3">
              <Search size={17} className="text-cyan-400 shrink-0 mr-3 group-focus-within:animate-pulse" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAllProjects(false);
                }}
                placeholder="Search projects by name, keyword, or technology (e.g., React, AI, Python...)"
                className="w-full bg-transparent text-white placeholder:text-slate-500 text-xs sm:text-sm font-normal focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Live Filter Indicator */}
            {searchQuery.trim() && (
              <div className="flex items-center justify-between text-[11px] text-cyan-300/90 px-3 pt-2">
                <span>
                  Found <strong className="text-white font-semibold">{filteredProjects.length}</strong> matching project{filteredProjects.length !== 1 ? "s" : ""}
                </span>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State when no results found */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center max-w-md mx-auto p-8 rounded-2xl bg-[#080d1a]/80 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Matching Projects Found</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              We couldn&apos;t find any projects matching &quot;{searchQuery}&quot; under the &quot;{selectedCategory}&quot; filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Filters & Search</span>
            </button>
          </motion.div>
        ) : (
          /* Projects Grid */
          <div className="flex flex-col gap-10 md:gap-14">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {displayedProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="glossy-card rounded-[1.4rem] overflow-hidden group border-white/5 hover:border-brand/40 transition-all duration-500 flex flex-col h-full shadow-2xl relative bg-[#090d16]/70 backdrop-blur-xl"
                >
                  <div className="reflection-line" />
                  
                  {/* Project Image */}
                  <div className="aspect-[16/11] overflow-hidden relative m-2 rounded-[1rem] bg-[#0c1220]">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80" />
                    
                    {/* Category Pill Over Image */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#050914]/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-white/90 text-[10px] font-bold tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 pt-2 flex flex-col flex-grow relative">
                    <h4 className="text-sm md:text-base font-display font-bold text-white mb-2 group-hover:text-brand-light transition-colors leading-snug line-clamp-2">
                      {project.title}
                    </h4>
                    <p className="text-white/50 text-[12px] leading-relaxed mb-4 flex-grow line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags?.slice(0, 3).map((tag: string) => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-white/[0.04] border border-white/10 rounded-md text-white/60 text-[9px] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons: Live Demo, GitHub, Details in 1 line with eye-catching colors */}
                    <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-white/10 mt-auto w-full">
                      {project.liveLink ? (
                        <motion.a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#00d2ff] to-[#38bdf8] text-[#030712] text-[11px] font-black shadow-[0_0_15px_rgba(0,210,255,0.35)] hover:shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:brightness-110 transition-all whitespace-nowrap cursor-pointer"
                          title="Open Live Demo"
                        >
                          <ExternalLink size={11} strokeWidth={2.5} className="shrink-0" />
                          <span className="truncate">Live Demo</span>
                        </motion.a>
                      ) : (
                        <motion.button 
                          onClick={onShowComingSoon}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-[11px] font-bold border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all whitespace-nowrap cursor-pointer"
                          title="Deployment coming soon"
                        >
                          <ExternalLink size={11} strokeWidth={2.5} className="shrink-0" />
                          <span className="truncate">Live Demo</span>
                        </motion.button>
                      )}
                      
                      <motion.a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-gradient-to-r from-[#111827] to-[#1e1b4b] hover:from-[#1e293b] hover:to-[#2e1065] text-white text-[11px] font-bold border border-indigo-400/40 hover:border-indigo-300/70 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] transition-all whitespace-nowrap cursor-pointer"
                        title="View GitHub Repository"
                      >
                        <Github size={11} className="shrink-0" />
                        <span className="truncate">GitHub</span>
                      </motion.a>

                      <button 
                        onClick={() => setActiveProjectModal(project)}
                        className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-gradient-to-r from-[#ec4899]/20 via-[#a855f7]/25 to-[#6366f1]/20 hover:from-[#ec4899]/35 hover:via-[#a855f7]/40 hover:to-[#6366f1]/35 text-white text-[11px] font-bold border border-[#ec4899]/40 hover:border-[#ec4899]/70 shadow-[0_0_12px_rgba(236,72,153,0.2)] hover:shadow-[0_0_18px_rgba(236,72,153,0.35)] transition-all whitespace-nowrap cursor-pointer"
                        title="View project details"
                      >
                        <Code2 size={11} className="shrink-0" />
                        <span className="truncate">Details</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Toggle Show All / Show Less */}
            {filteredProjects.length > 8 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <motion.button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-7 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/15 hover:border-brand/40 rounded-xl text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xl cursor-pointer"
                >
                  <span>
                    {showAllProjects 
                      ? "Show Less" 
                      : `See All ${filteredProjects.length} Projects`}
                  </span>
                  <ChevronRight 
                    size={14} 
                    className={`transition-transform duration-300 text-brand-light ${showAllProjects ? "rotate-90" : ""}`} 
                  />
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Reusable Premium Glassmorphic Project Details Modal */}
      <ProjectModal 
        project={activeProjectModal} 
        onClose={() => setActiveProjectModal(null)} 
        onShowComingSoon={onShowComingSoon} 
      />
    </section>
  );
}
