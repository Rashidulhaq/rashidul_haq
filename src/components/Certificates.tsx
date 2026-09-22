import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate, type Variants } from "motion/react";
import { 
  Award, 
  Sparkles, 
  Maximize2, 
  Trophy, 
  ShieldCheck, 
  Calendar,
  Search,
  X,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";
import CertificateModal from "./CertificateModal";

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

export default function Certificates() {
  const [activeCertificate, setActiveCertificate] = useState<typeof PORTFOLIO_DATA.certificates[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "All", label: "All" },
    { id: "Problem Solving", label: "Problem Solving" },
    { id: "Programming", label: "Programming" },
    { id: "Competitive Programming", label: "Competitive Programming" },
    { id: "Research & Innovation", label: "Research & Innovation" }
  ];

  const getCategoryCount = (catId: string) => {
    if (catId === "All") return PORTFOLIO_DATA.certificates.length;
    return PORTFOLIO_DATA.certificates.filter(c => c.category === catId).length;
  };

  const filteredCertificates = useMemo(() => {
    return PORTFOLIO_DATA.certificates.filter((cert) => {
      // Category filter
      if (activeCategory !== "All" && cert.category !== activeCategory) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) {
        return true;
      }

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = cert.title.toLowerCase().includes(q);
      const issuerMatch = cert.issuer.toLowerCase().includes(q);
      const catMatch = cert.category.toLowerCase().includes(q);
      const descMatch = cert.description.toLowerCase().includes(q);
      const skillMatch = cert.skills.some(s => s.toLowerCase().includes(q));

      return titleMatch || issuerMatch || catMatch || descMatch || skillMatch;
    });
  }, [activeCategory, searchQuery]);

  const handleInspectCertificate = (cert: typeof PORTFOLIO_DATA.certificates[0]) => {
    setActiveCertificate(cert);
  };

  const overviewStats = [
    {
      title: "Validated Credentials",
      value: 12,
      suffix: "+",
      desc: "Verified skills & technical coursework",
      icon: ShieldCheck,
      color: "from-amber-400 to-amber-600",
      glowColor: "rgba(245,158,11,0.25)"
    },
    {
      title: "ICPC Challenger",
      value: 1,
      suffix: "x",
      desc: "National contest representation (BUBT)",
      icon: Trophy,
      color: "from-purple-400 to-indigo-600",
      glowColor: "rgba(168,85,247,0.25)"
    },
    {
      title: "Research Award",
      value: 1,
      suffix: "st",
      desc: "Innovative Idea Competition Winner",
      icon: Sparkles,
      color: "from-pink-400 to-rose-600",
      glowColor: "rgba(236,72,153,0.25)"
    }
  ];

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-[#070b14]/50">
      {/* Ambient background glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/15 blur-[140px] rounded-full pointer-events-none -translate-x-1/2" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/15 blur-[140px] rounded-full pointer-events-none translate-x-1/2" 
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="layout-container relative z-10">
        {/* Section Header with Staggered Blur-to-Focus Animation */}
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
            <Award size={13} className="text-cyan-400" />
            <span>Validated Credentials • Honors</span>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Certificates & <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Credentials</span>
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
            Formally validated achievements, problem solving assessments, and competitive programming credentials from recognized organizations.
          </motion.p>
        </motion.div>

        {/* Credentials Highlights Overview Cards with 3D Spring & Counter Animation */}
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
                hidden: { opacity: 0, y: 30, scale: 0.95 },
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
              className="relative p-5 rounded-2xl bg-[#090e1c]/80 border border-white/10 hover:border-amber-400/40 backdrop-blur-xl flex items-center gap-4 group transition-all duration-500 overflow-hidden shadow-xl"
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
                <p className="text-amber-200/90 text-xs font-semibold">{stat.title}</p>
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
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5 mb-14 w-full max-w-4xl mx-auto px-2"
        >
          {/* Category Filter Pills Container */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1.5 scrollbar-hide flex justify-start sm:justify-center">
            <div className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#070e1d]/90 backdrop-blur-2xl border border-amber-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.1)] gap-1 sm:gap-2 relative">
              {categories.map((cat) => {
                const count = getCategoryCount(cat.id);
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer z-10 ${
                      isSelected
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {/* Animated Sliding Background Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeCertCategoryPill"
                        className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-amber-600/40 via-amber-500/30 to-purple-600/40 border border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] ring-1 ring-amber-400/50 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10 font-semibold">{cat.label}</span>
                    <motion.span
                      whileHover={{ scale: 1.15 }}
                      className={`relative z-10 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-bold transition-all ${
                        isSelected
                          ? "bg-amber-500/40 text-amber-200 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
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
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-xl mx-auto relative group"
          >
            {/* Ambient Breathing Glow behind Search Bar */}
            <div className="absolute -inset-1 rounded-2xl sm:rounded-full bg-gradient-to-r from-amber-500/25 via-purple-500/20 to-pink-500/15 blur-lg opacity-40 group-hover:opacity-75 group-focus-within:opacity-100 transition-opacity duration-500 -z-10" />

            <div className="relative flex items-center w-full rounded-2xl sm:rounded-full bg-[#050914]/95 backdrop-blur-xl border border-amber-500/40 hover:border-amber-400 focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-500/35 shadow-[0_0_25px_rgba(245,158,11,0.2)] focus-within:shadow-[0_0_35px_rgba(245,158,11,0.45)] transition-all duration-300 px-4 py-2.5 sm:py-3 overflow-hidden">
              {/* Subtle top scanlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

              <motion.div
                animate={{ rotate: searchQuery ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.4 }}
                className="shrink-0 mr-3"
              >
                <Search size={18} className="text-amber-400 group-focus-within:text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              </motion.div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificates by title, issuer, or skill (HackerRank, Python, ICPC...)"
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
                    className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-amber-500/20 transition-all ml-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X size={15} className="text-amber-300" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Keyword Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-0.5">
              <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles size={11} className="text-amber-400" />
                Quick Search:
              </span>
              {["HackerRank", "Python", "Problem Solving", "ICPC", "Research"].map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.08, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery(tag)}
                  className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono transition-all cursor-pointer ${
                    searchQuery.toLowerCase() === tag.toLowerCase()
                      ? "bg-amber-500/30 border border-amber-400 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                      : "bg-[#081120] hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-400/40 text-slate-400 hover:text-amber-200"
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
                  className="flex items-center justify-between text-[11px] text-amber-300/90 px-3 pt-2"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Found <strong className="text-white font-semibold">{filteredCertificates.length}</strong> matching certificate{filteredCertificates.length !== 1 ? "s" : ""}
                  </span>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-amber-300 underline cursor-pointer transition-colors"
                  >
                    Reset search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Empty State when no results found */}
        {filteredCertificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-16 text-center max-w-md mx-auto p-8 rounded-2xl bg-[#080d1a]/80 border border-amber-500/20 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.1)]"
          >
            <motion.div 
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            >
              <Search size={24} />
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">No Certificates Found</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              We couldn&apos;t find any certificates matching &quot;{searchQuery}&quot; under the &quot;{activeCategory}&quot; category.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 text-white font-semibold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:brightness-110 transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Filters & Search</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Certificates Grid with Spring Entry & 3D Tilt Hover */
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 140,
                    damping: 14,
                    delay: (i % 4) * 0.08,
                    layout: { duration: 0.35, ease: "easeOut" }
                  }}
                  whileHover={{ 
                    y: -7, 
                    scale: 1.015,
                    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } 
                  }}
                  className="glossy-card rounded-[1.4rem] overflow-hidden group border border-white/10 hover:border-amber-400/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.2)] transition-all duration-500 shadow-2xl bg-[#0a0e1a]/85 backdrop-blur-xl flex flex-col relative"
                >
                  {/* Hover Shimmer Light Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
                  
                  {/* Certificate Image Frame */}
                  <div 
                    onClick={() => handleInspectCertificate(cert)}
                    className="aspect-[4/3] overflow-hidden relative m-2 rounded-xl bg-[#050811] cursor-pointer group/img"
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/img:scale-108"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                    {/* Verified Badge */}
                    <div className="absolute top-2.5 right-2.5 bg-[#050914]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                      <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wide">Verified</span>
                    </div>

                    {/* Hover Inspect Icon - Crystal Clear & Eye-Catching */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/75 via-black/25 to-black/35 pointer-events-none">
                      <motion.span 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-[0_0_25px_rgba(245,158,11,0.65)] transform scale-90 group-hover/img:scale-100 transition-all duration-300 pointer-events-auto"
                      >
                        <Maximize2 size={13} strokeWidth={2.5} /> View Full
                      </motion.span>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-4 pt-1 flex flex-col flex-grow relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold tracking-wide">
                        {cert.issuer}
                      </span>
                      <span className="text-white/40 text-[11px] font-medium flex items-center gap-1">
                        <Calendar size={11} /> {cert.year}
                      </span>
                    </div>

                    <h4 className="text-sm md:text-base font-display font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                      {cert.title}
                    </h4>

                    <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
                      {cert.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                      {cert.skills.slice(0, 3).map((skill: string) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/30 text-white/60 hover:text-white/90 text-[9px] font-mono transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleInspectCertificate(cert)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.06] hover:from-amber-500/15 hover:to-purple-500/15 border border-white/10 hover:border-amber-400/40 text-white/80 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                    >
                      <span>Inspect Certificate</span>
                      <Maximize2 size={12} className="text-amber-400" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Additional Competitions and Volunteering Accolades with Spring Entry */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0a0f1d] to-indigo-950/40 border border-white/10 hover:border-amber-400/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.06, y: -1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-purple-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              >
                <Trophy size={24} />
              </motion.div>
              <div>
                <h4 className="text-white font-display font-bold text-base md:text-lg">
                  Competitive Programming & Research Track Record
                </h4>
                <p className="text-white/50 text-xs md:text-sm mt-0.5">
                  Consistently applying algorithmic rigor and machine learning research to solve real-world problems.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {["BUBT ICPC 2023", "Research Award 2023", "HackerRank Gold/Basic"].map((badge) => (
                <motion.span 
                  key={badge}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/40 text-xs text-white/80 hover:text-white font-medium transition-all shadow-sm flex items-center gap-1.5 cursor-default"
                >
                  <CheckCircle2 size={12} className="text-amber-400" />
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Eye-catching full image Certificate Modal */}
      <CertificateModal 
        certificate={activeCertificate} 
        onClose={() => setActiveCertificate(null)} 
      />
    </section>
  );
}
