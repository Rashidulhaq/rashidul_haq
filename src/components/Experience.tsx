import { motion, useInView, animate } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  MapPin, 
  Sparkles, 
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  
  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.2,
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

export default function Experience({ onShowResume }: { onShowResume?: () => void }) {
  const experiences = PORTFOLIO_DATA.experience || [];

  return (
    <section id="experience" className="py-14 sm:py-16 md:py-20 relative overflow-hidden bg-[#070b16]/60">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-6 right-0 w-80 h-80 bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none translate-x-1/2" />

      {/* Grid Pattern Foreground */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
          backgroundSize: '28px 28px' 
        }} 
      />

      <div className="layout-container relative z-10">
        {/* Section Header - Compact Spacing */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="text-center mb-8 sm:mb-10"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[10.5px] font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.12)]"
          >
            <Briefcase size={12} className="text-cyan-400" />
            <span>Career • Professional Track</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              Work <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_12px_rgba(6,182,212,0.25)]">Experience</span>
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 rounded-full mx-auto mt-2 opacity-80" />
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="text-slate-400 text-xs sm:text-sm font-normal max-w-xl mx-auto mt-2.5 leading-relaxed"
          >
            Professional industry track record across marketing campaigns, technical IT operations, and digital infrastructure.
          </motion.p>
        </motion.div>

        {/* Highlight Stats Row - Tightened Height & Spacing */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-7 sm:mb-9"
        >
          {[
            {
              label: "Current Industry Role",
              value: 1,
              suffix: " Active Role",
              sub: "Tahmid IT Park",
              icon: Building2,
              color: "from-cyan-400 to-blue-600",
              glow: "rgba(6,182,212,0.3)"
            },
            {
              label: "Dual Track Specialization",
              value: 2,
              suffix: " Domains",
              sub: "Digital Marketing & IT",
              icon: TrendingUp,
              color: "from-indigo-400 to-purple-600",
              glow: "rgba(99,102,241,0.3)"
            },
            {
              label: "Core Competencies",
              value: 7,
              suffix: "+ Core Skills",
              sub: "SEO, Systems & Ops",
              icon: Cpu,
              color: "from-amber-400 to-rose-500",
              glow: "rgba(245,158,11,0.3)"
            }
          ].map((item, i) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  transition: { type: "spring", stiffness: 160, damping: 15, delay: i * 0.06 }
                }
              }}
              whileHover={{ 
                y: -4, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 350, damping: 16 }
              }}
              className="p-3 sm:p-3.5 rounded-xl bg-[#090e1c]/80 border border-white/[0.08] hover:border-cyan-400/35 backdrop-blur-xl flex items-center gap-3 shadow-md relative overflow-hidden group transition-all duration-300"
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Corner Glow */}
              <div 
                className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: item.glow }}
              />

              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform`}>
                <item.icon size={17} />
              </div>
              <div className="relative z-10 min-w-0">
                <p className="text-white font-extrabold text-sm leading-tight">
                  <Counter value={item.value} suffix={item.suffix} />
                </p>
                <p className="text-slate-400 text-[11px] truncate mt-0.5">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Showcase Card - Sleek, Compact & Eye-Catching */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ 
                type: "spring", 
                stiffness: 140, 
                damping: 15, 
                delay: index * 0.1 
              }}
              whileHover={{ 
                y: -4, 
                transition: { type: "spring", stiffness: 350, damping: 18 } 
              }}
              className="relative p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-br from-[#0c1224]/90 via-[#080d1a]/95 to-[#070b14]/90 border border-cyan-500/25 hover:border-cyan-400/50 shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.12)] backdrop-blur-2xl transition-all duration-300 group overflow-hidden"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 opacity-90" />

              {/* Shimmer light sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

              {/* Subtle Ambient Corner Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-colors pointer-events-none" />

              {/* Header with Role, Company, Active Badge and Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10 pb-3 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-lg sm:text-xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold tracking-wider uppercase">
                      {exp.type}
                    </span>
                    {exp.current && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300 text-xs font-medium">
                    <span className="flex items-center gap-1 text-white font-semibold">
                      <Building2 size={13} className="text-cyan-400" />
                      {exp.company}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin size={12} className="text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="self-start sm:self-auto shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-cyan-300 text-xs font-semibold shadow-inner">
                    <Calendar size={13} className="text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Concise Description */}
              <p className="text-slate-300 text-xs sm:text-[13.5px] leading-relaxed mb-3.5 relative z-10 font-normal">
                {exp.description}
              </p>

              {/* Responsibilities List - Compact & Crisp with glowing checkmarks */}
              <div className="space-y-2 mb-4 relative z-10">
                {exp.responsibilities.map((resp, rIdx) => {
                  const parts = resp.split(":");
                  const hasPrefix = parts.length > 1;
                  return (
                    <div 
                      key={rIdx}
                      className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-cyan-400/25 hover:bg-white/[0.03] transition-all"
                    >
                      <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {hasPrefix ? (
                          <>
                            <span className="text-cyan-300 font-bold mr-1">{parts[0]}:</span>
                            <span>{parts.slice(1).join(":")}</span>
                          </>
                        ) : (
                          <span>{resp}</span>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Skills Tags - Sleek inline chips (No button) */}
              <div className="pt-3 border-t border-white/[0.06] relative z-10 flex flex-wrap items-center gap-1.5">
                {exp.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-medium hover:border-cyan-400/50 hover:bg-cyan-500/15 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
