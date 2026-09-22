import { motion } from "motion/react";
import { 
  GraduationCap, 
  Building2, 
  Calendar, 
  Award, 
  Sparkles, 
  BookOpen, 
  ScrollText, 
  CheckCircle2,
  Star,
  Layers
} from "lucide-react";
import { useState } from "react";
import { PORTFOLIO_DATA } from "../constants";

export default function Education() {
  const [selectedId, setSelectedId] = useState<number | null>(0);

  // Metadata tags for educational milestones
  const getEducationMeta = (degree: string) => {
    if (degree.includes("B.Sc")) {
      return {
        level: "Undergraduate Degree",
        accent: "from-blue-500 via-indigo-500 to-purple-500",
        badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
        icon: GraduationCap,
        featured: true,
        tags: ["Software Engineering Major", "Deep Learning Thesis", "Web Technologies", "Algorithm Design"]
      };
    }
    if (degree.includes("Kamil")) {
      return {
        level: "Post-Graduate Studies",
        accent: "from-purple-500 via-pink-500 to-rose-500",
        badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
        icon: BookOpen,
        featured: false,
        tags: ["Tafsir Specialization", "Islamic Jurisprudence", "Arabic Literature"]
      };
    }
    if (degree.includes("Fazil")) {
      return {
        level: "Degree Equivalent",
        accent: "from-emerald-500 to-teal-500",
        badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        icon: ScrollText,
        featured: false,
        tags: ["Humanities", "Theological Studies", "Ethics"]
      };
    }
    if (degree.includes("Alim")) {
      return {
        level: "Higher Secondary (HSC)",
        accent: "from-amber-500 to-orange-500",
        badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        icon: Award,
        featured: false,
        tags: ["Higher Secondary", "Science & Humanities"]
      };
    }
    return {
      level: "Secondary School (SSC)",
      accent: "from-sky-500 to-blue-500",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
      icon: Star,
      featured: false,
      tags: ["Secondary Certificate", "Golden GPA 5.00"]
    };
  };

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand/10 via-purple-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="layout-container">
        {/* Section Header */}
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
            <GraduationCap size={13} className="text-cyan-400" />
            <span>Academic Path • Qualifications</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Education <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Timeline</span>
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
            My academic journey and educational milestones that built a rigorous engineering foundation.
          </motion.p>
        </motion.div>

        {/* Academic Highlights Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto mb-14"
        >
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-brand/30 transition-all duration-300 group">
            <div className="flex items-center gap-2 text-brand-light text-xs font-semibold mb-1">
              <GraduationCap size={15} />
              <span>Highest Degree</span>
            </div>
            <p className="text-white font-bold text-sm truncate">B.Sc in CSE</p>
            <span className="text-[11px] text-white/40">BUBT (2020-2024)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
              <Award size={15} />
              <span>Undergrad CGPA</span>
            </div>
            <p className="text-white font-bold text-sm">3.63 / 4.00</p>
            <span className="text-[11px] text-white/40">Graduated with Honors</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold mb-1">
              <BookOpen size={15} />
              <span>Specialization</span>
            </div>
            <p className="text-white font-bold text-sm truncate">Software Engineering</p>
            <span className="text-[11px] text-white/40">& AI Deep Learning</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-amber-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
              <Star size={15} />
              <span>Secondary (SSC)</span>
            </div>
            <p className="text-white font-bold text-sm">GPA 5.00</p>
            <span className="text-[11px] text-white/40">Golden Achievement</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* NEW PROFESSIONAL & EYE-CATCHING TIMELINE DESIGN (ACTIVE)                  */}
        {/* ========================================================================= */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glowing Continuous Vertical Rail Line */}
          <div className="absolute left-6 md:left-8 top-3 bottom-8 w-[2px] bg-gradient-to-b from-brand/60 via-purple-500/40 to-white/10 -translate-x-1/2">
            {/* Animated Pulse Beam traveling down the rail */}
            <motion.div 
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 left-0 right-0 h-24 w-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            />
          </div>

          <div className="space-y-6 md:space-y-8 pl-12 md:pl-16">
            {PORTFOLIO_DATA.education.map((item, i) => {
              const meta = getEducationMeta(item.degree);
              const IconComponent = meta.icon;
              const isSelected = selectedId === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedId(isSelected ? null : i)}
                  className="relative group cursor-pointer"
                >
                  {/* Stepper Node Marker with Glowing Ripple */}
                  <div className="absolute -left-12 md:-left-16 top-6 -translate-x-1/2 flex items-center justify-center">
                    <div className={`relative w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      meta.featured 
                        ? "bg-gradient-to-br from-brand via-indigo-600 to-purple-600 text-white shadow-[0_0_25px_rgba(99,102,241,0.6)] scale-105" 
                        : "bg-[#0b0f19] border border-white/15 text-white/70 group-hover:text-brand-light group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                    }`}>
                      {meta.featured && (
                        <span className="absolute -inset-1 rounded-xl bg-brand/30 blur-sm animate-pulse -z-10" />
                      )}
                      <IconComponent size={17} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Professional Academic Milestone Card */}
                  <div className={`relative rounded-2xl md:rounded-3xl p-5 md:p-7 backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
                    meta.featured
                      ? "bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-purple-950/20 border-brand/40 shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:border-brand/60"
                      : "bg-white/[0.025] hover:bg-white/[0.045] border-white/10 hover:border-white/20 shadow-lg"
                  }`}>
                    {/* Top Accent Gradient Border highlight */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${meta.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Background Radial Glow */}
                    <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-brand/10 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10">
                      {/* Top Header Row: Category Badge, Featured Marker, and Year */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${meta.badgeColor}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            {meta.level}
                          </span>

                          {meta.featured && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                              <Star size={11} className="fill-amber-300 text-amber-300" />
                              Major Milestone
                            </span>
                          )}
                        </div>

                        {/* Year Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 text-[11px] font-medium tracking-wide">
                          <Calendar size={12} className="text-brand-light" />
                          <span>{item.year}</span>
                        </div>
                      </div>

                      {/* Degree Title & Institution */}
                      <div className="mb-3">
                        <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-brand-light transition-colors duration-300 leading-snug">
                          {item.degree}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 text-white/60 text-xs md:text-sm font-normal">
                          <Building2 size={13} className="text-brand-light shrink-0" />
                          <span>{item.institution}</span>
                        </div>
                      </div>

                      {/* Performance & CGPA Banner */}
                      {item.gpa && (
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-brand/10 border border-brand/20 text-xs font-semibold text-white mb-3.5 backdrop-blur-md">
                          <CheckCircle2 size={13} className="text-brand-light" />
                          <span className="text-white/70">Performance:</span>
                          <span className="bg-gradient-to-r from-white via-brand-light to-[#ec4899] bg-clip-text text-transparent font-bold">
                            {item.gpa}
                          </span>
                        </div>
                      )}

                      {/* Detailed Description */}
                      <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Curriculum / Skill Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1 text-[10px] text-white/40 uppercase tracking-widest mr-1 font-semibold">
                          <Layers size={11} />
                          <span>Focus:</span>
                        </div>
                        {meta.tags.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx}
                            className="px-2.5 py-0.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-[11px] text-white/65 transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PREVIOUS EDUCATION TIMELINE STYLE (PRESERVED & COMMENTED OUT AS REQUESTED) */}
        {/* ========================================================================= */}
        {/*
        <div className="relative max-w-5xl mx-auto mt-20">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.03] -translate-x-1/2 overflow-hidden">
            <motion.div 
              animate={{ 
                y: ["-100%", "100%"],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-brand-light to-transparent opacity-40 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {PORTFOLIO_DATA.education.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                    className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-brand-light/30 blur-lg rounded-full animate-pulse" />
                    <div className="absolute inset-0 border border-brand-light/40 rounded-full animate-[ping_3s_linear_infinite]" />
                    <div className="w-full h-full rounded-full bg-dark border-2 border-brand-light flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.5)] relative z-10 transition-transform duration-500 hover:rotate-12">
                      <GraduationCap size={16} className="md:size-5 text-brand-light" />
                    </div>
                  </motion.div>
                </div>
 
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pl-20" : "md:pr-20 md:text-right"}`}>
                  <motion.div 
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="relative p-7 md:p-12 rounded-[2.5rem] md:rounded-[4rem] group transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-dark/40 backdrop-blur-2xl border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] md:rounded-[4rem] pointer-events-none">
                      <motion.div 
                        animate={{ 
                          x: ["-100%", "200%"],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "linear",
                          repeatDelay: 2
                        }}
                        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -rotate-45"
                      />
                    </div>

                    <div className={`absolute -bottom-16 -right-16 w-32 h-32 bg-brand-light/10 blur-[60px] opacity-0 group-hover:opacity-50 transition-opacity duration-700`} />
                    
                    <div className="relative z-10">
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`inline-block px-4 py-1.5 bg-brand-light/10 border border-brand-light/20 rounded-full text-brand-light font-display font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-6 shadow-sm`}
                      >
                        {item.year}
                      </motion.div>

                      <motion.h4 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl font-display font-bold text-white group-hover:text-brand-light transition-colors duration-300 leading-snug mb-2"
                      >
                        {item.degree}
                      </motion.h4>

                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-white/50 text-xs md:text-sm font-normal mb-4 flex items-center md:justify-end gap-2"
                      >
                        {i % 2 !== 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-light hidden md:block" />
                        )}
                        {item.institution}
                        {i % 2 === 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
                        )}
                      </motion.p>
                      
                      {item.gpa && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          className={`flex items-center gap-2 mb-8 ${i % 2 !== 0 ? "md:justify-end" : ""}`}
                        >
                          <div className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-3 group-hover:border-brand-light/20 group-hover:bg-brand-light/5 transition-all duration-500">
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-light opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-light"></span>
                            </span>
                            <span className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-brand-light to-[#ec4899] bg-clip-text text-transparent">
                              {item.gpa}
                            </span>
                          </div>
                        </motion.div>
                      )}

                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-white/30 text-xs md:text-sm leading-relaxed italic border-t border-white/5 pt-6 group-hover:text-white/50 transition-colors duration-500"
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}

