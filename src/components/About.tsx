import { motion, useInView, animate, type Variants } from "motion/react";
import { Download, Code2, Award, Globe, Sparkles, Quote, MousePointer2, ExternalLink } from "lucide-react";
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
  const ICON_LIST = [Code2, Award, Globe];
  const COLOR_LIST = [
    "from-[#4f46e5] to-[#a855f7]",
    "from-[#a855f7] to-[#ec4899]",
    "from-[#ec4899] to-[#4f46e5]"
  ];

  const stats = [
    {
      label: "TOTAL PROJECTS",
      value: PORTFOLIO_DATA.projects.length,
      suffix: "+",
      desc: "Innovative web solutions crafted",
      icon: Code2,
      color: COLOR_LIST[0],
      onClick: () => {
        onSetPortfolioTab?.("Projects");
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      label: "CERTIFICATES",
      value: 12,
      suffix: "+",
      desc: "Professional skills validated",
      icon: Award,
      color: COLOR_LIST[1],
      onClick: () => {
        onSetPortfolioTab?.("Certificates");
        const el = document.getElementById("certificates");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      label: "YEARS OF EXPERIENCE",
      value: 1,
      suffix: "+",
      desc: "Tahmid IT Park • Active Role",
      icon: Globe,
      color: COLOR_LIST[2],
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
            <span>Discover • My Story</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              About <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Me</span>
            </h2>
            {/* Title Glow & Accent */}
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

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-4 text-white">
                <motion.button 
                  onClick={onShowResume}
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
                  className="relative px-8 md:px-10 py-4 md:py-5 bg-dark/60 backdrop-blur-xl rounded-2xl font-bold flex items-center justify-center gap-3 border border-[#4f46e5]/20 hover:border-[#4f46e5]/50 transition-colors group overflow-hidden w-full sm:w-auto"
                >
                  {/* Premium Glow Layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/5 to-[#4f46e5]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/20 to-[#4f46e5]/0 blur-md group-hover:animate-pulse" />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/5 to-[#4f46e5]/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Download size={20} className="group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 text-[#4f46e5]" /> 
                  <span className="relative z-10">View Full CV</span>
                </motion.button>

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
                      alt="Profile" 
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

        {/* Stats Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          style={{ perspective: 1000 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
              }}
              onClick={() => {
                stat.onClick?.();
              }}
              className="relative p-10 rounded-[2.5rem] group transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-dark/40 backdrop-blur-2xl border border-white/5 group-hover:border-white/20 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`absolute inset-[1px] bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-500 rounded-[2.5rem]`} />
              <div className={`absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br ${stat.color} blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
              
              <div className="reflection-line" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <motion.div 
                  variants={internalVariants}
                  className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-inner overflow-hidden relative`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <stat.icon size={30} className="text-white/40 group-hover:text-white transition-colors relative z-10" />
                </motion.div>
                <motion.div variants={internalVariants} className="text-right">
                  <div className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter leading-none mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                </motion.div>
              </div>

              <div className="relative z-10">
                <motion.h4 variants={internalVariants} className="text-xs font-bold text-white/40 tracking-[0.4em] uppercase mb-4 group-hover:text-white/60 transition-colors">
                  {stat.label}
                </motion.h4>
                <motion.div 
                  variants={internalVariants}
                  className={`h-[1px] w-12 bg-gradient-to-r ${stat.color} mb-4 group-hover:w-full transition-all duration-700 opacity-50`} 
                />
                <motion.p variants={internalVariants} className="text-white/30 text-sm font-medium leading-relaxed italic">
                  {stat.desc}
                </motion.p>
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0 z-10">
                <Sparkles size={16} className="text-white/20" />
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
