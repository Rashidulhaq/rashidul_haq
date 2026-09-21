import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate } from "motion/react";
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
  RotateCcw,
  Maximize2,
  Rocket,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";
import ProjectModal, { ProjectItem } from "./ProjectModal";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  
  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    } else {
      setCount(0);
    }
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

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
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-7xl mx-auto mb-20 px-2 sm:px-4"
        >
          {/* Section Header: Featured Masterpiece with Staggered Blur-to-Focus Animation */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="text-center mb-14"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.12)]"
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>Spotlight Showcase • Flagship App</span>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="relative inline-block"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                Featured <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Masterpiece</span>
              </h2>
              <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full opacity-35 -z-10" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 rounded-full mx-auto mt-3.5 opacity-80" />
            </motion.div>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="text-slate-400 text-sm md:text-[15px] font-normal max-w-2xl mx-auto mt-4 leading-relaxed"
            >
              Flagship production web application highlighting modern architecture, responsive performance, and dual-engine AI.
            </motion.p>
          </motion.div>

          {/* Masterpiece Showcase Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-2xl sm:rounded-[2.2rem] p-4 sm:p-7 lg:p-9 bg-gradient-to-b from-[#091122]/95 via-[#060a16]/98 to-[#03060f] border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(6,182,212,0.15)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(6,182,212,0.3)] backdrop-blur-2xl overflow-hidden transition-all duration-700 group/spotlight"
          >
            {/* Ambient Animated Glowing Nebulas */}
            <motion.div 
              animate={{ 
                scale: [1, 1.25, 1],
                opacity: [0.15, 0.3, 0.15],
                x: [0, 20, 0],
                y: [0, -15, 0]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-500/25 via-indigo-600/20 to-purple-600/10 blur-[110px] rounded-full pointer-events-none" 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.12, 0.25, 0.12],
                x: [0, -25, 0],
                y: [0, 20, 0]
              }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-24 -left-20 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 via-sky-500/15 to-amber-500/10 blur-[110px] rounded-full pointer-events-none" 
            />

            {/* Top Border Animated Shimmer Line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent group-hover/spotlight:via-cyan-300 transition-all duration-700" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center relative z-10">
              
              {/* Left Column: Floating Animated Browser Mockup Frame */}
              <div className="lg:col-span-7">
                <motion.div 
                  animate={{ y: [0, -7, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="rounded-xl sm:rounded-2xl bg-[#040711] border border-cyan-400/30 group-hover/spotlight:border-cyan-300/60 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.18)] overflow-hidden group/frame relative transition-all duration-500"
                >
                  {/* Subtle Hologram Scanline Sweeper */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/[0.04] to-transparent -translate-y-full group-hover/frame:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                  {/* Browser Header Bar */}
                  <div className="px-3.5 py-2.5 bg-[#080d1a] border-b border-cyan-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/90 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/90 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/90 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0d1829] border border-cyan-500/35 text-[10px] font-mono font-medium text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(6,182,212,1)]" />
                      <span>https://khorchaai.vercel.app</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/30" />
                    </div>
                  </div>

                  {/* Browser Content */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#02040a]">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
                      alt="Khorcha AI Preview"
                      className="w-full h-full object-cover group-hover/frame:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-70" />
                    
                    {/* Floating Floating AI Telemetry Glass Badge */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#070b16]/90 border border-cyan-400/30 backdrop-blur-md flex items-center justify-between shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(6,182,212,0.15)]">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/20 via-indigo-500/30 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-[11px] font-mono font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                          <span className="animate-pulse">AI</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white leading-none flex items-center gap-1.5">
                            Dual-Engine AI Expense Engine
                            <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                          </p>
                          <p className="text-[10px] text-cyan-200/80 mt-1 font-mono">Gemini 3.8 Flash + Bangla/Banglish NLP</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-semibold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>PWA OFFLINE</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Project Details & Actions */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-[#0a1e30] border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-semibold tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.18)]">
                    React 19 + TypeScript
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-semibold tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    <Star size={12} className="fill-amber-400 text-amber-400 animate-pulse" />
                    <span>Featured Flagship</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl lg:text-[1.7rem] font-display font-bold text-white leading-snug tracking-tight group-hover/spotlight:text-cyan-100 transition-colors">
                    Khorcha AI – Intelligent Expense Tracker & Financial Health
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed mt-2.5">
                    Privacy-first personal money management built for Bangladeshi users with natural language Bengali/Banglish NLP expense parsing, Gemini 3.8 Flash dual-engine AI, and real-time 50/30/20 health telemetry.
                  </p>
                </div>

                {/* Animated Highlights Checklist */}
                <div className="space-y-2.5 pt-1">
                  {[
                    {
                      label: "Bangla & Banglish NLP:",
                      desc: "Real-time heuristic and natural language expense parsing."
                    },
                    {
                      label: "Dual-Engine AI:",
                      desc: "Google Gemini 3.8 Flash fallback with offline-first heuristic parsing."
                    },
                    {
                      label: "50/30/20 Telemetry:",
                      desc: "Financial health rule tracking & instant client-side PDF export."
                    }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="flex items-start gap-2.5 p-1.5 -ml-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="w-4 h-4 rounded-full border border-cyan-400 bg-cyan-500/10 shadow-[0_0_8px_rgba(6,182,212,0.4)] flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                        <Check size={9} strokeWidth={3} />
                      </div>
                      <span className="text-xs text-slate-300 leading-snug font-normal">
                        <strong className="text-white font-medium">{item.label}</strong> {item.desc}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-1">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-cyan-400/90 mb-2">
                    TECHNOLOGIES USED
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["React 19", "TypeScript", "Bangla NLP", "Google Gemini", "Tailwind CSS", "Express"].map((tech) => (
                      <span 
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#0b1424] hover:bg-[#101c34] border border-cyan-500/20 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-200 text-[11px] font-mono transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons with High-Tech Shimmer and Glowing Interactions */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <motion.a
                    href="https://khorchaai.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-[#030712] font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all overflow-hidden group/btn cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    <ExternalLink size={13} strokeWidth={2.5} className="group-hover/btn:rotate-12 transition-transform" />
                    <span>Live Demo</span>
                  </motion.a>

                  <motion.a
                    href="https://github.com/Rashidulhaq/khorcha.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0b1220] hover:bg-[#121c32] border border-cyan-400/35 hover:border-cyan-300 text-white font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_22px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
                  >
                    <Github size={13} className="text-cyan-400" />
                    <span>GitHub</span>
                  </motion.a>

                  <motion.button
                    onClick={() => setActiveProjectModal(PORTFOLIO_DATA.projects[0])}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/15 to-purple-500/15 hover:from-indigo-500/25 hover:to-purple-500/25 border border-indigo-400/35 hover:border-indigo-300 text-cyan-200 font-bold text-xs shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_22px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
                  >
                    <Code2 size={13} className="text-indigo-400" />
                    <span>Details</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section Header: Projects Showcase */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-center mb-14"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.12)]"
          >
            <Zap size={13} className="text-cyan-400" />
            <span>Engineering Works • All Projects</span>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Projects <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Showcase</span>
            </h2>
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full opacity-35 -z-10" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 rounded-full mx-auto mt-3.5 opacity-80" />
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-slate-400 text-sm md:text-[15px] font-normal max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            A curated showcase of {PORTFOLIO_DATA.projects.length}+ completed applications spanning AI systems, offline PWAs, full-stack platforms, and IoT microprocessors.
          </motion.p>
        </motion.div>

        {/* Overview Stats Cards with 3D Spring & Counter Animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14 max-w-4xl mx-auto"
        >
          {[
            {
              title: "Featured Builds",
              value: 30,
              suffix: "+",
              desc: "Live applications, PWAs & research prototypes",
              icon: Rocket,
              color: "from-cyan-400 to-cyan-600",
              glowColor: "rgba(6,182,212,0.25)"
            },
            {
              title: "Architecture & Stack",
              value: 100,
              suffix: "%",
              desc: "Modern TypeScript, React & responsive design",
              icon: ShieldCheck,
              color: "from-indigo-400 to-purple-600",
              glowColor: "rgba(99,102,241,0.25)"
            },
            {
              title: "Dual AI & Hardware",
              value: 12,
              suffix: "+",
              desc: "Integrated Gemini/OpenAI & IoT systems",
              icon: Cpu,
              color: "from-amber-400 to-rose-600",
              glowColor: "rgba(245,158,11,0.25)"
            }
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.85, filter: "blur(10px)" },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  filter: "blur(0px)",
                  transition: { type: "spring", stiffness: 140, damping: 14, delay: i * 0.08 }
                }
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                rotateX: 4,
                rotateY: 4,
                transition: { type: "spring", stiffness: 350, damping: 16 }
              }}
              className="relative p-5 rounded-2xl bg-[#090e1c]/80 border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl flex items-center gap-4 group transition-all duration-500 overflow-hidden shadow-xl"
            >
              {/* Hover shimmer reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              {/* Background ambient glow on hover */}
              <div 
                className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: stat.glowColor }}
              />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={22} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              </div>
              <div className="relative z-10">
                <p className="text-white font-display font-extrabold text-xl leading-tight flex items-baseline gap-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-cyan-200/90 text-xs font-semibold">{stat.title}</p>
                <p className="text-white/40 text-[11px] leading-tight mt-0.5">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ========================================================= */}
        {/* EYE-CATCHING CATEGORY FILTER PILLS & GLOWING SEARCH BAR   */}
        {/* ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-5 mb-14 w-full max-w-4xl mx-auto px-2"
        >
          {/* Category Filter Pills Container */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1.5 scrollbar-hide flex justify-start sm:justify-center">
            <div className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#070e1d]/90 backdrop-blur-2xl border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.12)] gap-1 sm:gap-2 relative">
              {categories.map((cat) => {
                const count = getCategoryCount(cat.id);
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowAllProjects(false);
                    }}
                    className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer z-10 ${
                      isSelected
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {/* Animated Sliding Background Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-cyan-600/40 via-cyan-500/30 to-indigo-600/40 border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/50 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10 font-semibold">{cat.label}</span>
                    <motion.span
                      whileHover={{ scale: 1.15 }}
                      className={`relative z-10 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-bold transition-all ${
                        isSelected
                          ? "bg-cyan-500/40 text-cyan-200 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                          : "bg-white/[0.08] text-slate-400 group-hover:text-slate-200 group-hover:bg-white/[0.12]"
                      }`}
                    >
                      {count}
                    </motion.span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glowing Animated Centered Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-xl mx-auto relative group"
          >
            {/* Ambient Breathing Glow behind Search Bar */}
            <div className="absolute -inset-1 rounded-2xl sm:rounded-full bg-gradient-to-r from-cyan-500/25 via-indigo-500/20 to-amber-500/15 blur-lg opacity-40 group-hover:opacity-75 group-focus-within:opacity-100 transition-opacity duration-500 -z-10" />

            <div className="relative flex items-center w-full rounded-2xl sm:rounded-full bg-[#050914]/95 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-500/35 shadow-[0_0_25px_rgba(6,182,212,0.2)] focus-within:shadow-[0_0_35px_rgba(6,182,212,0.45)] transition-all duration-300 px-4 py-2.5 sm:py-3 overflow-hidden">
              {/* Subtle top scanlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <motion.div
                animate={{ rotate: searchQuery ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.4 }}
                className="shrink-0 mr-3"
              >
                <Search size={18} className="text-cyan-400 group-focus-within:text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              </motion.div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAllProjects(false);
                }}
                placeholder="Search projects by name, keyword, or tech (React, AI, NLP, Python...)"
                className="w-full bg-transparent text-white placeholder:text-slate-500 text-xs sm:text-sm font-normal focus:outline-none"
              />

              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchQuery("")}
                    className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-cyan-500/20 transition-all ml-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X size={15} className="text-cyan-300" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Keyword Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-0.5">
              <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles size={11} className="text-cyan-400" />
                Quick Search:
              </span>
              {["React", "AI", "NLP", "TypeScript", "PWA", "IoT"].map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.08, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery(tag);
                    setShowAllProjects(false);
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono transition-all cursor-pointer ${
                    searchQuery.toLowerCase() === tag.toLowerCase()
                      ? "bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                      : "bg-[#081120] hover:bg-cyan-500/15 border border-cyan-500/20 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-200"
                  }`}
                >
                  #{tag}
                </motion.button>
              ))}
            </div>

            {/* Live Filter Indicator with Animation */}
            <AnimatePresence>
              {searchQuery.trim() && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center justify-between text-[11px] text-cyan-300/90 px-3 pt-2"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Found <strong className="text-white font-semibold">{filteredProjects.length}</strong> matching project{filteredProjects.length !== 1 ? "s" : ""}
                  </span>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-cyan-300 underline cursor-pointer transition-colors"
                  >
                    Reset search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Empty State when no results found */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-16 text-center max-w-md mx-auto p-8 rounded-2xl bg-[#080d1a]/80 border border-cyan-500/20 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.1)]"
          >
            <motion.div 
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              <Search size={24} />
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">No Matching Projects Found</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              We couldn&apos;t find any projects matching &quot;{searchQuery}&quot; under the &quot;{selectedCategory}&quot; filter.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Filters & Search</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Projects Grid with AnimatePresence and Silky Layout Physics */
          <div className="flex flex-col gap-10 md:gap-14">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 45, scale: 0.86, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.88, y: 20, filter: "blur(6px)" }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ 
                      type: "spring",
                      stiffness: 140,
                      damping: 14,
                      delay: (i % 4) * 0.08,
                      layout: { duration: 0.35, ease: "easeOut" }
                    }}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.02,
                      rotateX: 3,
                      rotateY: 3,
                      transition: { type: "spring", stiffness: 350, damping: 18 } 
                    }}
                    className="glossy-card rounded-[1.4rem] overflow-hidden group border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.25)] transition-all duration-500 flex flex-col h-full shadow-2xl relative bg-[#090d16]/85 backdrop-blur-xl"
                  >
                    {/* Hover Shimmer Light Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
                    
                    {/* Background ambient glow on hover */}
                    <div 
                      className="absolute -right-12 -bottom-12 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: i % 2 === 0 ? "rgba(6,182,212,0.3)" : "rgba(99,102,241,0.3)" }}
                    />

                    {/* Project Image Container with Interactive Overlay */}
                    <div 
                      onClick={() => setActiveProjectModal(project)}
                      className="aspect-[16/11] overflow-hidden relative m-2 rounded-[1rem] bg-[#0c1220] cursor-pointer group/img"
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-108"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/20 to-transparent opacity-80 group-hover/img:opacity-50 transition-opacity" />
                      
                      {/* Category Pill Over Image with Live Pulsing Beacon */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#050914]/90 backdrop-blur-md border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                        <span className="text-cyan-200 text-[10px] font-bold tracking-wider uppercase font-mono">
                          {project.category}
                        </span>
                      </div>

                      {/* Hover Inspect Icon Badge */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-dark/40 backdrop-blur-xs">
                        <motion.span 
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xl backdrop-blur-md"
                        >
                          <Maximize2 size={13} /> View Details
                        </motion.span>
                      </div>
                    </div>
                    
                    <div className="p-4 pt-2 flex flex-col flex-grow relative z-10">
                      <h4 className="text-sm md:text-base font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {project.title}
                      </h4>
                      <p className="text-slate-400 text-[12px] leading-relaxed mb-4 flex-grow line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack Tags with Micro-Bounce Hover */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags?.slice(0, 3).map((tag: string) => (
                          <motion.span 
                            key={tag} 
                            whileHover={{ scale: 1.08, y: -1 }}
                            className="px-2 py-0.5 bg-[#0a1424] hover:bg-cyan-500/15 border border-cyan-500/20 hover:border-cyan-400/40 rounded-md text-cyan-200/80 hover:text-cyan-200 text-[9.5px] font-mono transition-all cursor-default"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Action Buttons: Live Demo, GitHub, Details */}
                      <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-cyan-500/15 mt-auto w-full">
                        {project.liveLink ? (
                          <motion.a 
                            href={project.liveLink} 
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -1.5 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-[#030712] text-[11px] font-black shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_22px_rgba(6,182,212,0.65)] hover:brightness-110 transition-all whitespace-nowrap cursor-pointer"
                            title="Open Live Demo"
                          >
                            <ExternalLink size={11} strokeWidth={2.5} className="shrink-0" />
                            <span className="truncate">Live Demo</span>
                          </motion.a>
                        ) : (
                          <motion.button 
                            onClick={onShowComingSoon}
                            whileHover={{ scale: 1.05, y: -1.5 }}
                            whileTap={{ scale: 0.95 }}
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
                          whileHover={{ scale: 1.05, y: -1.5 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-[#0b1220] hover:bg-[#121c32] text-white text-[11px] font-bold border border-indigo-400/40 hover:border-indigo-300/70 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] transition-all whitespace-nowrap cursor-pointer"
                          title="View GitHub Repository"
                        >
                          <Github size={11} className="shrink-0 text-cyan-400" />
                          <span className="truncate">GitHub</span>
                        </motion.a>

                        <motion.button 
                          onClick={() => setActiveProjectModal(project)}
                          whileHover={{ scale: 1.05, y: -1.5 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/25 to-pink-500/20 hover:from-indigo-500/35 hover:via-purple-500/40 hover:to-pink-500/35 text-white text-[11px] font-bold border border-indigo-400/40 hover:border-indigo-300/70 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] transition-all whitespace-nowrap cursor-pointer"
                          title="View project details"
                        >
                          <Code2 size={11} className="shrink-0 text-indigo-400" />
                          <span className="truncate">Details</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Toggle Show All / Show Less with Animated Shimmer */}
            {filteredProjects.length > 8 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <motion.button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative group/more flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#0b1426] via-[#070e1c] to-[#0b1426] hover:from-[#101c36] hover:to-[#101c36] backdrop-blur-xl border border-cyan-400/35 hover:border-cyan-400/70 rounded-2xl text-cyan-200 text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.18)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover/more:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <span>
                    {showAllProjects 
                      ? "Show Less" 
                      : `See All ${filteredProjects.length} Projects`}
                  </span>
                  <ChevronRight 
                    size={14} 
                    className={`transition-transform duration-300 text-cyan-400 ${showAllProjects ? "rotate-90" : "group-hover/more:translate-x-1"}`} 
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
