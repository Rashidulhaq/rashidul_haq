import { motion, useInView, animate, type Variants } from "motion/react";
import { Download, Code2, Award, Globe, Sparkles, Quote, MousePointer2, ExternalLink, ArrowUpRight, CheckCircle2, Briefcase, Zap } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { PORTFOLIO_DATA } from "../constants";

function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  
  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.5,
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

export default function About({ onShowResume, onSetPortfolioTab }: { 
  onShowResume?: () => void, 
  onSetPortfolioTab?: (tab: string) => void 
}) {
  const stats = [
    {
      id: "projects",
      label: "TOTAL PROJECTS",
      badge: "LIVE & FEATURED",
      value: PORTFOLIO_DATA.projects?.length || 10,
      suffix: "+",
      desc: "Innovative full-stack web applications, interactive platforms & IoT systems crafted with precision.",
      highlight: "Web Apps • Full-Stack • IoT",
      actionText: "Explore Projects",
      icon: Code2,
      gradient: "from-cyan-400 via-sky-400 to-indigo-500",
      textGradient: "from-white via-cyan-100 to-cyan-400",
      bgGradient: "from-cyan-500/15 via-blue-600/10 to-transparent",
      glowColor: "rgba(6, 182, 212, 0.4)",
      borderColor: "border-cyan-500/25 group-hover:border-cyan-400/80",
      pillBg: "bg-cyan-500/10 text-cyan-300 border-cyan-400/30",
      iconBoxBg: "bg-cyan-500/10 border-cyan-400/30 text-cyan-400 group-hover:bg-cyan-500/20",
      hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.4)]",
      onClick: () => {
        onSetPortfolioTab?.("Projects");
        const el = document.getElementById("portfolio") || document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "certificates",
      label: "CERTIFICATES",
      badge: "VERIFIED CREDENTIALS",
      value: PORTFOLIO_DATA.certificates?.length || 12,
      suffix: "+",
      desc: "Industry-recognized certificates validating algorithmic problem solving, Python & web technologies.",
      highlight: "HackerRank • Coursera • CS Core",
      actionText: "View Certificates",
      icon: Award,
      gradient: "from-purple-400 via-fuchsia-400 to-pink-500",
      textGradient: "from-white via-purple-100 to-fuchsia-400",
      bgGradient: "from-purple-500/15 via-fuchsia-600/10 to-transparent",
      glowColor: "rgba(217, 70, 239, 0.4)",
      borderColor: "border-purple-500/25 group-hover:border-fuchsia-400/80",
      pillBg: "bg-fuchsia-500/10 text-pink-300 border-fuchsia-400/30",
      iconBoxBg: "bg-fuchsia-500/10 border-fuchsia-400/30 text-fuchsia-400 group-hover:bg-fuchsia-500/20",
      hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(217,70,239,0.4)]",
      onClick: () => {
        onSetPortfolioTab?.("Certificates");
        const el = document.getElementById("portfolio") || document.getElementById("certificates");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "experience",
      label: "YEARS OF EXPERIENCE",
      badge: "ACTIVE ROLE",
      value: 1,
      suffix: "+ Year",
      desc: "Software Engineer at Tahmid IT Park, building scalable frontends & responsive user interfaces.",
      highlight: "Tahmid IT Park • Active Role",
      actionText: "View Experience",
      icon: Briefcase,
      gradient: "from-emerald-400 via-teal-400 to-cyan-500",
      textGradient: "from-white via-emerald-100 to-teal-400",
      bgGradient: "from-emerald-500/15 via-teal-600/10 to-transparent",
      glowColor: "rgba(16, 185, 129, 0.4)",
      borderColor: "border-emerald-500/25 group-hover:border-emerald-400/80",
      pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
      iconBoxBg: "bg-emerald-500/10 border-emerald-400/30 text-emerald-400 group-hover:bg-emerald-500/20",
      hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.4)]",
      onClick: () => {
        const el = document.getElementById("experience");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 12,
        mass: 1
      }
    }
  };

  const internalVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const bioText = "I'm a Computer Science & Engineering student passionate about front-end development. I enjoy building modern, responsive, and user-friendly web applications while continuously improving my skills and exploring new technologies.";

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Grid Pattern Foreground - Removed background grid as it matches App.tsx */}

      <div className="layout-container relative z-10">
        {/* Section Heading */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.12)]"
          >
            <Sparkles size={13} className="text-cyan-400" />
            <span>Discover • My Story</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-[28px] md:text-3xl lg:text-[34px] font-display font-bold text-white tracking-tight leading-tight">
              About <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Me</span>
            </h2>
            {/* Title Glow & Accent */}
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
            Transforming ideas into robust digital experiences with passion, precision, and continuous learning.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start mb-24">
          {/* Left: Content */}
          <div className="w-full lg:w-[55%] order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={containerVariants}
              className="space-y-6"
            >
              <div className="mb-6">
                <motion.h3 
                  variants={itemVariants} 
                  className="text-xs md:text-sm font-display font-semibold bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#d946ef] bg-clip-text text-transparent mb-2 leading-tight inline-block tracking-wider uppercase"
                >
                  Hello, I'm
                </motion.h3>
                <motion.h4 
                  className="text-3xl sm:text-4xl md:text-[42px] font-display font-black text-white tracking-tight leading-tight flex flex-col items-center lg:items-start"
                >
                  <motion.span 
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="block shadow-sm"
                  >
                    Md. Rashidul
                  </motion.span>
                  <motion.span 
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="block text-white/90"
                  >
                    Haq
                  </motion.span>
                </motion.h4>
              </div>
              
              <motion.p 
                variants={itemVariants} 
                className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0 flex flex-wrap justify-center lg:justify-start gap-x-[0.3em]"
              >
                {bioText.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { 
                          duration: 0.5, 
                          delay: (i * 0.02) + 0.4 // Base stagger + word index stagger
                        } 
                      }
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              {/* Quote Box */}
              <motion.div 
                variants={itemVariants}
                className="glossy-card p-6 md:p-8 rounded-3xl group hover:border-[#7c3aed]/50 transition-all duration-500 shadow-2xl max-w-2xl mx-auto lg:mx-0"
              >
                <div className="reflection-line" />
                <div className="flex gap-1 items-start justify-center lg:justify-start">
                  <span className="text-brand-light text-xl mt-[-10px] leading-none">"</span>
                  <p className="text-white/80 text-base md:text-lg italic tracking-wide">
                    Leveraging AI as a professional tool, not a replacement.
                  </p>
                  <span className="text-brand-light text-xl mt-[-10px] leading-none">"</span>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                {/* View Full CV Button - Opens the official document PDF in a new page/tab */}
                <motion.a 
                  href="/CV/Rashidul_Haq_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  /* 
                  // PREVIOUS PAGE CODE (Commented out as requested - uncomment if internal #resume page is needed):
                  onClick={onShowResume}
                  */
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 md:px-10 py-4 md:py-5 bg-dark/60 backdrop-blur-xl rounded-2xl font-bold flex items-center justify-center gap-3 border border-[#4f46e5]/20 hover:border-[#4f46e5]/50 transition-colors group overflow-hidden w-full sm:w-auto cursor-pointer"
                >
                  {/* Premium Glow Layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/5 to-[#4f46e5]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/20 to-[#4f46e5]/0 blur-md group-hover:animate-pulse" />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/5 to-[#4f46e5]/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Download size={20} className="group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 text-[#4f46e5]" /> 
                  <span className="relative z-10">View Full CV</span>
                </motion.a>

                <motion.a 
                  href="#projects"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 md:px-10 py-4 md:py-5 bg-dark/60 backdrop-blur-xl rounded-2xl font-bold flex items-center justify-center gap-3 border border-[#ec4899]/20 hover:border-[#ec4899]/50 transition-colors group overflow-hidden pointer-events-auto w-full sm:w-auto"
                >
                  {/* Premium Glow Layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/0 via-[#ec4899]/5 to-[#ec4899]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ec4899]/0 via-[#ec4899]/20 to-[#ec4899]/0 blur-md group-hover:animate-pulse" />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/0 via-[#ec4899]/5 to-[#ec4899]/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="flex items-center gap-2 relative z-10 justify-center">
                    <Code2 size={20} className="text-[#ec4899] group-hover:rotate-12 transition-transform duration-300" /> View Projects
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right: Image Container */}
          <div className="w-full lg:w-[45%] flex justify-center relative order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, type: "spring" }}
              className="relative group flex justify-center items-center"
            >
              {/* Pulsing Outer Glow */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand/30 rounded-full blur-[60px] group-hover:bg-brand/50 transition-colors"
              />

              {/* Floating Container */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                {/* Circular Profile Image */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-tr from-brand/40 to-indigo-500/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_80px_rgba(168,85,247,0.5)] transition-all duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-dark z-10 relative">
                    <motion.img 
                      src={PORTFOLIO_DATA.profile.image} 
                      alt="Md. Rashidul Haq" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/pic1.jpg";
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: 2,
                        transition: { duration: 0.8, ease: "easeOut" }
                      }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                      className="w-full h-full object-cover"
                    />
                    {/* Glass Flash / Shine Effect */}
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:animate-shine pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[25deg] -translate-x-[150%]" />
                  </div>
                </div>

                {/* Defensive Circle */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border border-white/5 rounded-full pointer-events-none opacity-50"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid - Ultra-Compact Micro Metric Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 max-w-4xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              variants={itemVariants}
              whileHover={{ 
                y: -3,
                scale: 1.01,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                stat.onClick?.();
              }}
              className="group relative rounded-xl p-3.5 sm:p-4 overflow-hidden cursor-pointer transition-all duration-200 backdrop-blur-xl bg-slate-900/60 hover:bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 shadow-md hover:shadow-cyan-500/10"
            >
              {/* Subtle Natural Background Gradient Tint */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-25 group-hover:opacity-50 transition-opacity duration-200 pointer-events-none`} />

              {/* Top Row: Icon + Badge + Action Arrow */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {/* Micro Icon Box */}
                  <div className={`w-7 h-7 rounded-lg ${stat.iconBoxBg} border flex items-center justify-center shadow-xs shrink-0`}>
                    <stat.icon className="w-3.5 h-3.5 relative z-10" />
                  </div>

                  {/* Micro Status Badge */}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase border backdrop-blur-xs ${stat.pillBg}`}>
                    {stat.id === "experience" ? (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                    ) : (
                      <Sparkles size={8} className="text-current opacity-80" />
                    )}
                    <span>{stat.badge}</span>
                  </span>
                </div>

                {/* Micro Action Arrow */}
                <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 text-white/40 group-hover:text-white group-hover:bg-white/10 flex items-center justify-center transition-colors shrink-0">
                  <ArrowUpRight size={12} className="transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Metric Counter & Label */}
              <div className="relative z-10 flex items-baseline justify-between gap-2 mb-1.5">
                <div className={`text-2xl sm:text-[26px] font-display font-extrabold tracking-tight bg-gradient-to-r ${stat.textGradient} bg-clip-text text-transparent leading-none`}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="text-[10px] sm:text-[10.5px] font-semibold tracking-wider text-slate-300 uppercase font-display truncate">
                  {stat.label}
                </h4>
              </div>

              {/* Bottom 1-Liner: Highlight & Prompt */}
              <div className="relative z-10 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-normal flex items-center gap-1 truncate pr-1">
                  <CheckCircle2 size={10} className="text-cyan-400/80 shrink-0" />
                  <span className="truncate">{stat.highlight}</span>
                </span>
                <span className={`font-medium flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent shrink-0 text-[10px]`}>
                  {stat.actionText} →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decor Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[130px] rounded-full pointer-events-none translate-x-1/3" />
    </section>
  );
}
