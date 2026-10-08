import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView, animate } from "motion/react";
import { 
  Cpu, 
  Search, 
  CheckCircle2, 
  Layers, 
  GitBranch, 
  Terminal, 
  Bug, 
  Sparkles, 
  Workflow, 
  X, 
  Code2, 
  Database, 
  ShieldCheck, 
  RotateCcw,
  FolderGit2
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";

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

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "Core Languages",
    "AI & Cloud",
    "Tools & DevOps"
  ];

  const filteredTech = useMemo(() => {
    return PORTFOLIO_DATA.techStack.filter((tech) => {
      const matchesCategory = 
        selectedCategory === "All" || 
        tech.category === selectedCategory ||
        (selectedCategory === "Frontend" && tech.category.includes("Frontend")) ||
        (selectedCategory === "Backend" && tech.category.includes("Backend")) ||
        (selectedCategory === "Database" && tech.category.includes("Database")) ||
        (selectedCategory === "Core Languages" && tech.category.includes("Languages")) ||
        (selectedCategory === "AI & Cloud" && (tech.category.includes("AI") || tech.category.includes("Cloud"))) ||
        (selectedCategory === "Tools & DevOps" && tech.category.includes("Tools"));
        
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const nameMatch = tech.name.toLowerCase().includes(q);
      const catMatch = tech.category.toLowerCase().includes(q);
      const projectMatch = tech.usedIn ? tech.usedIn.toLowerCase().includes(q) : false;

      return matchesCategory && (nameMatch || catMatch || projectMatch);
    });
  }, [selectedCategory, searchQuery]);

  const overviewStats = [
    {
      title: "Core Technologies",
      value: PORTFOLIO_DATA.techStack.length || 15,
      suffix: "+",
      desc: "React, Next.js, Node, Express & MongoDB",
      icon: Code2,
      color: "from-cyan-400 to-cyan-600",
      glowColor: "rgba(6,182,212,0.25)"
    },
    {
      title: "MERN Stack Breadth",
      value: 100,
      suffix: "%",
      desc: "Client, server, NoSQL DB & edge cloud",
      icon: Layers,
      color: "from-indigo-400 to-purple-600",
      glowColor: "rgba(99,102,241,0.25)"
    },
    {
      title: "APIs & Cloud Systems",
      value: 15,
      suffix: "+",
      desc: "REST APIs, MongoDB, Gemini AI & Vercel",
      icon: Database,
      color: "from-emerald-400 to-teal-600",
      glowColor: "rgba(16,185,129,0.25)"
    }
  ];

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden bg-[#070b14]/50">
      {/* Anchor for compatibility with #skills */}
      <span id="skills" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Ambient Pulsing Lighting */}
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.12, 0.22, 0.12]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/15 blur-[150px] rounded-full pointer-events-none translate-x-1/3" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none -translate-x-1/3" 
      />

      <div className="layout-container relative z-10">
        {/* Section Header */}
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]"
          >
            <Cpu size={13} className="text-cyan-400 animate-pulse" />
            <span>Technical Arsenal • Core Skills</span>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-[28px] md:text-3xl lg:text-[34px] font-display font-bold text-white tracking-tight leading-tight">
              Skills & <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Tech Stack</span>
            </h2>
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full opacity-35 -z-10" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 rounded-full mx-auto mt-3 opacity-80" />
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-slate-400 text-xs sm:text-sm font-normal max-w-xl mx-auto mt-3 leading-relaxed"
          >
            Specialized engineering foundation spanning high-performance client interfaces with React & Next.js, scalable Node.js/Express backends, MongoDB databases, and AI-driven web architectures.
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
          {overviewStats.map((stat, i) => (
            <motion.div
              key={stat.title}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  transition: { type: "spring", stiffness: 140, damping: 14, delay: i * 0.08 }
                }
              }}
              whileHover={{ 
                y: -5, 
                scale: 1.015,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
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

        {/* Filter and Glowing Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5 mb-14 w-full max-w-4xl mx-auto px-2"
        >
          {/* Quick Project Stack Filters */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-3xl mx-auto px-2">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mr-1">
              <FolderGit2 size={12} className="text-cyan-400" />
              <span>Project Stack:</span>
            </span>
            {[
              { label: "MERN Stack", query: "React" },
              { label: "Next.js Web", query: "Next" },
              { label: "Priyoful ERP", query: "Priyoful" },
              { label: "Khorcha AI", query: "Khorcha" },
              { label: "Backend APIs", query: "Express" },
              { label: "MongoDB Cloud", query: "Mongo" },
            ].map((proj) => (
              <button
                key={proj.query}
                onClick={() => {
                  if (searchQuery.toLowerCase() === proj.query.toLowerCase()) {
                    setSearchQuery("");
                  } else {
                    setSearchQuery(proj.query);
                    setSelectedCategory("All");
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  searchQuery.toLowerCase() === proj.query.toLowerCase()
                    ? "bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                    : "bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 text-slate-300 hover:text-white"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{proj.label}</span>
              </button>
            ))}
          </div>

          {/* Category Filter Pills Container */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1.5 scrollbar-hide flex justify-start sm:justify-center">
            <div className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#070e1d]/90 backdrop-blur-2xl border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.1)] gap-1 sm:gap-2 relative">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                    }}
                    className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer z-10 ${
                      isSelected ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeTechCategoryPill"
                        className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-cyan-600/40 via-indigo-500/35 to-purple-600/40 border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400/50 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 font-semibold">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glowing Animated Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-xl mx-auto relative group"
          >
            <div className="absolute -inset-1 rounded-2xl sm:rounded-full bg-gradient-to-r from-cyan-500/25 via-indigo-500/20 to-purple-500/15 blur-lg opacity-40 group-hover:opacity-75 group-focus-within:opacity-100 transition-opacity duration-500 -z-10" />

            <div className="relative flex items-center w-full rounded-2xl sm:rounded-full bg-[#050914]/95 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-500/35 shadow-[0_0_25px_rgba(6,182,212,0.2)] focus-within:shadow-[0_0_35px_rgba(6,182,212,0.45)] transition-all duration-300 px-4 py-2.5 sm:py-3 overflow-hidden">
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
                placeholder="Search skill or project (e.g. React, Gemini, Priyoful, Python)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Quick Keyword Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-0.5">
              <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles size={11} className="text-cyan-400" />
                Quick Search:
              </span>
              {["React", "Gemini", "TypeScript", "Python", "Node.js", "Arduino", "MySQL"].map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.08, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery(tag)}
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
          </motion.div>
        </motion.div>

        {/* Empty State */}
        {filteredTech.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-16 text-center max-w-md mx-auto p-8 rounded-2xl bg-[#080d1a]/80 border border-cyan-500/20 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.1)] mb-16"
          >
            <motion.div 
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              <Search size={24} />
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">No Skills Found</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              We couldn&apos;t find any skill matching &quot;{searchQuery}&quot; under &quot;{selectedCategory}&quot;.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-semibold transition-all cursor-pointer shadow-lg"
            >
              <RotateCcw size={13} />
              <span>Reset Filters & Search</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Tech Stack Cards Grid with 3D Tilt Hover and Spring Animations */
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, y: 15 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 150,
                    damping: 14,
                    delay: (i % 10) * 0.04,
                    layout: { duration: 0.3 }
                  }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } 
                  }}
                  className="group relative bg-[#090d18]/85 hover:bg-[#0d1424] backdrop-blur-xl border border-white/[0.08] hover:border-cyan-400/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 shadow-xl overflow-hidden cursor-default justify-between"
                >
                  {/* Light sweep shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                  {/* Corner Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex flex-col items-center w-full">
                    {/* Icon Container with Micro-Zoom */}
                    <div className="relative z-10 w-12 h-12 mb-3 flex items-center justify-center p-2 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                      <img 
                        src={tech.icon} 
                        alt={tech.name} 
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-115"
                      />
                    </div>

                    {/* Title & Info */}
                    <h4 className="relative z-10 text-white font-display font-bold text-xs sm:text-sm tracking-wide group-hover:text-cyan-300 transition-colors">
                      {tech.name}
                    </h4>
                    
                    <div className="relative z-10 flex items-center gap-1.5 mt-1.5">
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/[0.04] group-hover:bg-cyan-500/15 border border-white/5 group-hover:border-cyan-400/30 text-white/50 group-hover:text-cyan-200 font-mono transition-colors">
                        {tech.category}
                      </span>
                    </div>
                  </div>

                  {/* Connected Projects Indicator */}
                  {tech.usedIn && (
                    <div className="relative z-10 w-full mt-3 pt-2 border-t border-white/5 flex flex-col items-center">
                      <span className="text-[9.5px] text-cyan-300 font-mono tracking-tight flex items-center justify-center gap-1 group-hover:text-cyan-200 transition-colors w-full px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                        <span className="truncate" title={tech.usedIn}>{tech.usedIn}</span>
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Full-Stack Architecture & MERN Engineering Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
          className="p-6 sm:p-8 rounded-[1.8rem] bg-gradient-to-b from-[#0b1020]/95 via-[#080d1a] to-[#050812] border border-cyan-500/25 hover:border-cyan-400/50 shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Layers size={12} className="text-cyan-400" />
                <span>Full-Stack Development Architecture</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                MERN Stack & Production-Ready Web Engineering
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mt-1 max-w-2xl">
                End-to-end expertise delivering modern client experiences with React & Next.js, robust Express/Node APIs, scalable MongoDB databases, and cloud edge hosting.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <CheckCircle2 size={13} className="text-cyan-400" /> Full-Stack Production Ready
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 relative z-10">
            {PORTFOLIO_DATA.fullStackArchitecture?.map((item, idx) => {
              const icons = [Code2, Terminal, Database, Sparkles, Workflow, ShieldCheck];
              const IconComponent = icons[idx % icons.length];
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-400/40 transition-all flex items-start gap-3 group/arch cursor-default shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover/arch:scale-110 group-hover/arch:bg-cyan-500/20 transition-all">
                    <IconComponent size={14} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm group-hover/arch:text-cyan-300 transition-colors">
                      {item.name}
                    </h4>
                    <span className="inline-block text-[10px] font-mono text-cyan-300/80 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md my-1">
                      {item.tools}
                    </span>
                    <p className="text-white/40 text-[11px] leading-relaxed mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
