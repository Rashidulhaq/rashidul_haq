import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ExternalLink, 
  Code2, 
  Award, 
  Cpu, 
  ArrowRight,
  Github, 
  ChevronRight, 
  Zap,
  Sparkles,
  Star,
  Check,
  Maximize2
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";
import ProjectModal, { ProjectItem } from "./ProjectModal";

export default function Portfolio({ 
  activeTab, 
  setActiveTab, 
  onShowComingSoon 
}: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  onShowComingSoon?: () => void 
}) {
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const handleInspectCertificate = (cert: typeof PORTFOLIO_DATA.certificates[0]) => {
    setActiveProjectModal({
      title: cert.title,
      description: cert.description,
      longDescription: cert.description,
      image: cert.image,
      technologies: cert.skills,
      category: `${cert.issuer} • ${cert.year}`,
      liveUrl: cert.image,
      actionLabel: "View Full Certificate ↗",
      overviewTitle: "CREDENTIAL & ASSESSMENT OVERVIEW",
      highlightsTitle: "VALIDATION & RECOGNITION HIGHLIGHTS",
      tagsTitle: "VERIFIED SKILLS & COMPETENCIES",
      highlights: [
        `Issuing Body: ${cert.issuer} (${cert.year})`,
        `Official Verification ID: ${cert.credentialId}`,
        `Academic / Contest Category: ${cert.category}`,
        `Verified Skills: ${cert.skills.join(", ")}`
      ]
    });
  };

  const displayedProjects = showAllProjects 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.slice(0, 8);

  const tabs = [
    { id: "Projects", label: "Projects", icon: Code2 },
    { id: "Certificates", label: "Certificates", icon: Award },
    { id: "Tech Stack", label: "Tech Stack", icon: Cpu },
  ];

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
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
          {/* Section Header - Styled consistently with other sections (Portfolio Showcase, About Me, Contact Me) */}
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
                My flagship web project highlighting architecture, performance, and UI design.
              </p>
            </div>

            <a
              href="https://github.com/Rashidulhaq/khorcha.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-light hover:text-white transition-colors group self-start sm:self-auto pb-1"
            >
              <span>Read full case overview</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Masterpiece Showcase Outer Container with Refined Spacing, Compact Typography & Eye-catching Gradients */}
          <div className="relative rounded-2xl sm:rounded-[2rem] p-4 sm:p-7 lg:p-9 bg-gradient-to-b from-[#080d1a]/95 via-[#060913]/98 to-[#04060d] border border-white/10 hover:border-brand/40 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(99,102,241,0.08)] backdrop-blur-2xl overflow-hidden transition-all duration-500 group/spotlight">
            {/* Ambient Eye-Catching Glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-500/15 to-purple-500/10 blur-[110px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-gradient-to-tr from-pink-500/10 to-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
              
              {/* Left Column: Mockup Browser Window Frame with Precision Window Header */}
              <div className="lg:col-span-7">
                <div className="rounded-xl bg-[#040711] border border-white/10 shadow-2xl overflow-hidden group/frame">
                  {/* Browser Header Bar */}
                  <div className="px-3.5 py-2.5 bg-[#080d1a] border-b border-white/5 flex items-center justify-between">
                    {/* Window Controls */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    </div>

                    {/* Live Preview Pill */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0d1829] border border-cyan-500/25 text-[10px] font-medium text-cyan-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>live-demo.preview</span>
                    </div>

                    <div className="w-10" />
                  </div>

                  {/* Browser Content / Screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#02040a]">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
                      alt="Khorcha AI Preview"
                      className="w-full h-full object-cover group-hover/frame:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-60" />
                    
                    {/* Floating Info Pill Over Image */}
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

              {/* Right Column: Project Details & Actions with Compact Spacing */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0a1e30] border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold tracking-wide">
                    React 19
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-300 text-[11px] font-semibold tracking-wide">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>High Impact Project</span>
                  </span>
                </div>

                {/* Title & Description - Compact and Readable */}
                <div>
                  <h4 className="text-xl sm:text-2xl lg:text-[1.65rem] font-display font-bold text-white leading-snug tracking-tight">
                    Khorcha AI – Intelligent Expense Tracker & Financial Health
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed mt-2">
                    Privacy-first personal money management built for Bangladeshi users with natural language Bengali/Banglish NLP expense parsing, Gemini 3.8 Flash dual-engine AI, and real-time 50/30/20 health telemetry.
                  </p>
                </div>

                {/* Real Verified GitHub Features with Compact Spacing */}
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

                {/* Technologies Used - Compact Badges */}
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

                {/* Action Buttons - 1 Line & Eye-Catching */}
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

        {/* Portfolio Showcase Section Header (Below Spotlight Showcase) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-[11px] font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
          >
            <Zap size={12} /> <span>Featured Works</span>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Portfolio <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent inline-block">Showcase</span>
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
            Innovative solutions crafted with modern technologies. Explore my projects, certifications, and technical roadmap.
          </motion.p>
        </motion.div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-16 py-4 pb-8 -mx-6 px-6 overflow-hidden">
          <div className="inline-flex p-1.5 bg-dark/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] gap-1 md:gap-3 overflow-x-auto max-w-full shadow-2xl scrollbar-hide no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-14 py-3 md:py-5 rounded-[1.5rem] transition-all duration-300 relative whitespace-nowrap overflow-hidden group ${
                  activeTab === tab.id 
                    ? "text-white" 
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                <tab.icon size={16} className={`transition-colors md:size-[18px] ${activeTab === tab.id ? "text-brand-light" : "group-hover:text-white/40"}`} />
                <span className="font-display font-bold text-xs md:text-base tracking-wider uppercase">{tab.label}</span>
                
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="tab-active-bg"
                    className="absolute inset-0 bg-[#7c3aed] -z-10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
                {activeTab === tab.id && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 blur-[2px]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          {activeTab === "Projects" ? (
            <div className="flex flex-col gap-10 md:gap-14">
              <motion.div 
                key="projects-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
              >
                {displayedProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="glossy-card rounded-[1.2rem] md:rounded-[2rem] overflow-hidden group border-white/5 hover:border-brand/40 transition-all duration-500 flex flex-col h-full shadow-2xl relative"
                  >
                  <div className="reflection-line" />
                  
                  {/* Project Image */}
                  <div className="aspect-[16/11] overflow-hidden relative m-1 md:m-2 rounded-[0.8rem] md:rounded-[1.4rem]">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80" />
                  </div>
                  
                  <div className="p-3 md:p-5 pt-1 md:pt-2 flex flex-col flex-grow text-center sm:text-left relative">
                    <div className="hidden sm:flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                      <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-brand-light animate-pulse" />
                      <span className="text-brand-light/70 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em]">{project.category}</span>
                    </div>
                    <h4 className="text-[10px] md:text-base lg:text-lg font-display font-bold text-white mb-1.5 md:mb-3 group-hover:text-brand-light transition-colors leading-tight line-clamp-1 md:line-clamp-2">
                      {project.title}
                    </h4>
                    <p className="hidden md:block text-white/30 text-[12px] leading-relaxed mb-4 flex-grow line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack Tags */}
                    <div className="hidden lg:flex flex-wrap gap-1.5 mb-5 opacity-60 group-hover:opacity-100 transition-opacity">
                      {project.tags?.slice(0, 3).map((tag: string) => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-white/[0.03] border border-white/10 rounded-full text-white/40 text-[7px] font-black uppercase tracking-wider"
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

                      <motion.button 
                        onClick={() => setActiveProjectModal(project)}
                        className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-gradient-to-r from-[#ec4899]/20 via-[#a855f7]/25 to-[#6366f1]/20 hover:from-[#ec4899]/35 hover:via-[#a855f7]/40 hover:to-[#6366f1]/35 text-white text-[11px] font-bold border border-[#ec4899]/40 hover:border-[#ec4899]/70 shadow-[0_0_12px_rgba(236,72,153,0.2)] hover:shadow-[0_0_18px_rgba(236,72,153,0.35)] transition-all whitespace-nowrap cursor-pointer"
                        title="View project details"
                      >
                        <Code2 size={11} className="shrink-0" />
                        <span className="truncate">Details</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                ))}
              </motion.div>


              {PORTFOLIO_DATA.projects.length > 8 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <motion.button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: "0 0 30px rgba(79, 70, 229, 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex items-center gap-3 px-8 py-4 bg-white/[0.05] backdrop-blur-2xl border border-white/10 hover:border-brand/50 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10">
                      {showAllProjects ? "Show Less" : "See All Projects"}
                    </span>
                    <motion.div
                      animate={{ rotate: showAllProjects ? 180 : 0 }}
                      className="relative z-10"
                    >
                      <ChevronRight size={16} className="text-brand-light group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              )}
            </div>

          ) : activeTab === "Certificates" ? (
            <motion.div 
              key="certificates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
            >
              {PORTFOLIO_DATA.certificates.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  onClick={() => handleInspectCertificate(cert)}
                  className="glossy-card rounded-[1.2rem] md:rounded-[2rem] overflow-hidden group border-white/10 hover:border-amber-500/40 transition-all duration-500 shadow-2xl p-1.5 md:p-2 cursor-pointer flex flex-col justify-between"
                >
                  <div className="reflection-line" />
                  <div className="aspect-[4/3] overflow-hidden relative rounded-[0.8rem] md:rounded-[1.4rem] bg-[#050811] group/img">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-dark/80 backdrop-blur-md px-2 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1 md:gap-1.5">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[7px] md:text-[9px] font-bold text-white uppercase tracking-tighter">Verified</span>
                    </div>

                    {/* Hover Inspect Overlay with View Full text - Crystal Clear */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/75 via-black/20 to-black/35 pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.6)] transform scale-90 group-hover/img:scale-100 transition-all duration-300 pointer-events-auto">
                        <Maximize2 size={12} strokeWidth={2.5} /> View Full
                      </span>
                    </div>
                  </div>
                  <div className="p-2 md:p-5 pt-2.5 md:pt-4 text-center sm:text-left flex flex-col flex-grow">
                    <div className="hidden sm:flex items-center gap-2 mb-1.5 md:mb-3">
                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-md">
                         <Award size={8} className="md:size-[10px] text-[#a855f7]" /> 
                         <span className="text-[#a855f7] text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em]">{cert.issuer}</span>
                       </div>
                    </div>
                    <h4 className="text-[10px] md:text-sm lg:text-base font-display font-bold text-white/90 group-hover:text-amber-300 transition-colors line-clamp-2 leading-tight mb-3">
                      {cert.title}
                    </h4>

                    {/* Inspect Certificate Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInspectCertificate(cert);
                      }}
                      className="mt-auto w-full py-1.5 px-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-500/30 text-white/80 hover:text-white text-[10px] md:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <span>Inspect Certificate</span>
                      <Maximize2 size={11} className="text-amber-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="tech"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4"
            >
              {PORTFOLIO_DATA.techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="relative group bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] hover:border-brand/40 rounded-[1rem] md:rounded-[1.5rem] p-3 md:p-5 flex flex-col items-center justify-center aspect-square transition-all duration-300 shadow-xl overflow-hidden"
                >
                  {/* Outer Glow */}
                  <div className="absolute -inset-1 bg-brand/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 
                  <div className="relative z-10 w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3 flex items-center justify-center">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
  
                  <span className="relative z-10 text-white/50 group-hover:text-white font-display font-bold text-[8px] md:text-[11px] tracking-wide transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[130px] rounded-full pointer-events-none translate-x-1/4" />
      {/* Reusable Premium Glassmorphic Project Details Modal */}
      <ProjectModal 
        project={activeProjectModal} 
        onClose={() => setActiveProjectModal(null)} 
        onShowComingSoon={onShowComingSoon} 
      />
    </section>
  );
}
