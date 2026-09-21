import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  Sparkles, 
  Maximize2, 
  Trophy, 
  ShieldCheck, 
  Calendar,
  Search,
  X,
  RotateCcw
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";
import CertificateModal from "./CertificateModal";

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

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-[#070b14]/50">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none translate-x-1/2" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="layout-container relative z-10">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
          >
            <Award size={12} className="text-amber-400" />
            <span>Validated Credentials</span>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Certificates & <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-pink-500 bg-clip-text text-transparent inline-block">Credentials</span>
            </h2>
            <div className="absolute -inset-4 bg-amber-500/20 blur-2xl rounded-full opacity-30 -z-10" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full mx-auto mt-3 opacity-70" />
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-white/50 text-sm md:text-[15px] font-normal max-w-xl mx-auto mt-3 tracking-wide"
          >
            Formally validated achievements, problem solving assessments, and competitive programming credentials from recognized organizations.
          </motion.p>
        </motion.div>

        {/* Credentials Highlights Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">12+ Credentials</p>
              <p className="text-white/40 text-xs">Validated skills & coursework</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">ICPC Challenger</p>
              <p className="text-white/40 text-xs">National contest participation</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">Research Award</p>
              <p className="text-white/40 text-xs">Innovative Idea Competition</p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* EYE-CATCHING CATEGORY FILTER PILLS & GLOWING SEARCH BAR   */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center gap-5 mb-12 w-full max-w-4xl mx-auto px-2">
          {/* Category Filter Pills Container */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1.5 scrollbar-hide flex justify-start sm:justify-center">
            <div className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#070e1d]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.06)] gap-1 sm:gap-2">
              {categories.map((cat) => {
                const count = getCategoryCount(cat.id);
                const isSelected = activeCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "border border-amber-400 bg-amber-950/50 text-white shadow-[0_0_18px_rgba(245,158,11,0.4)] ring-1 ring-amber-400/40"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-bold transition-all ${
                        isSelected
                          ? "bg-amber-500/30 text-amber-200 border border-amber-400/40 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
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
            <div className="relative flex items-center w-full rounded-2xl sm:rounded-full bg-[#050914]/90 backdrop-blur-xl border border-amber-500/50 hover:border-amber-400 focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-500/30 shadow-[0_0_22px_rgba(245,158,11,0.2)] focus-within:shadow-[0_0_32px_rgba(245,158,11,0.4)] transition-all duration-300 px-4 py-2.5 sm:py-3">
              <Search size={17} className="text-amber-400 shrink-0 mr-3 group-focus-within:animate-pulse" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificates by title, issuer, or skill (e.g., HackerRank, Python, ICPC...)"
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
              <div className="flex items-center justify-between text-[11px] text-amber-300/90 px-3 pt-2">
                <span>
                  Found <strong className="text-white font-semibold">{filteredCertificates.length}</strong> matching certificate{filteredCertificates.length !== 1 ? "s" : ""}
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
        {filteredCertificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center max-w-md mx-auto p-8 rounded-2xl bg-[#080d1a]/80 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Certificates Found</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              We couldn&apos;t find any certificates matching &quot;{searchQuery}&quot; under the &quot;{activeCategory}&quot; category.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 text-white font-semibold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:brightness-110 transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Filters & Search</span>
            </button>
          </motion.div>
        ) : (
          /* Certificates Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredCertificates.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glossy-card rounded-[1.4rem] overflow-hidden group border-white/10 hover:border-amber-500/40 transition-all duration-500 shadow-2xl bg-[#0a0e1a]/80 backdrop-blur-xl flex flex-col"
              >
                <div className="reflection-line" />
                
                {/* Certificate Image Frame */}
                <div 
                  onClick={() => handleInspectCertificate(cert)}
                  className="aspect-[4/3] overflow-hidden relative m-2 rounded-xl bg-[#050811] cursor-pointer group/img"
                >
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover/img:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                  {/* Verified Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-dark/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wide">Verified</span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-dark/40 backdrop-blur-xs">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xl">
                      <Maximize2 size={13} /> View Full
                    </span>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-4 pt-1 flex flex-col flex-grow">
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
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-white/60 text-[9px] font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Button */}
                  <button
                    onClick={() => handleInspectCertificate(cert)}
                    className="w-full py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-500/30 text-white/80 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <span>Inspect Certificate</span>
                    <Maximize2 size={12} className="text-amber-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Additional Competitions and Volunteering Accolades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/30 via-[#0a0f1d] to-indigo-950/30 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-purple-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                <Trophy size={24} />
              </div>
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
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-medium">
                BUBT ICPC 2023
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-medium">
                Research Award 2023
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-medium">
                HackerRank Gold/Basic
              </span>
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
