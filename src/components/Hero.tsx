import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ExternalLink, Mail, Github, Linkedin, Instagram, Sparkles, Facebook, Code2, Download, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";

const SOCIAL_STYLES: Record<string, { bg: string, text: string, shadow: string, glow: string }> = {
  LinkedIn: { 
    bg: "bg-[#0077b5]/10", 
    text: "text-[#0077b5]", 
    shadow: "hover:shadow-[#0077b5]/20",
    glow: "bg-[#0077b5]"
  },
  Instagram: { 
    bg: "bg-[#e1306c]/10", 
    text: "text-[#e1306c]", 
    shadow: "hover:shadow-[#e1306c]/20",
    glow: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
  },
  Facebook: { 
    bg: "bg-[#1877f2]/10", 
    text: "text-[#1877f2]", 
    shadow: "hover:shadow-[#1877f2]/20",
    glow: "bg-[#1877f2]"
  },
  GitHub: { 
    bg: "bg-white/10", 
    text: "text-white", 
    shadow: "hover:shadow-white/10",
    glow: "bg-white"
  },
  Youtube: { 
    bg: "bg-[#ff0000]/10", 
    text: "text-[#ff0000]", 
    shadow: "hover:shadow-[#ff0000]/20",
    glow: "bg-[#ff0000]"
  },
};

const HERO_TECH = [
  { 
    name: "React", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.3)"
  },
  { 
    name: "Next.js", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.25)",
    isCircleBg: true
  },
  { 
    name: "Tailwind CSS", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.3)"
  },
  { 
    name: "Node.js", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#68A063",
    glow: "rgba(104, 160, 99, 0.3)"
  },
  { 
    name: "MongoDB", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    glow: "rgba(71, 162, 72, 0.3)"
  },
];

interface HeroProps {
  onShowResume?: () => void;
}

export default function Hero({ onShowResume }: HeroProps) {
  const [skillIndex, setSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSkill = PORTFOLIO_DATA.title_skills[skillIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < currentSkill.length) {
        setDisplayText(currentSkill.substring(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentSkill.substring(0, displayText.length - 1));
      } else if (!isDeleting && displayText.length === currentSkill.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setSkillIndex((skillIndex + 1) % PORTFOLIO_DATA.title_skills.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, skillIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full" />
      
      <div className="layout-container relative z-10 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Side */}
        <div className="w-full lg:w-3/5 text-center lg:text-left pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Ready to innovate badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-[#4f46e5]/10 via-[#a855f7]/10 to-[#ec4899]/10 border border-purple-500/25 rounded-full text-[#A855F7] text-[11px] font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            >
              <Sparkles size={13} className="animate-pulse text-[#ec4899]" /> <span className="bg-gradient-to-r from-[#4f46e5] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Ready to Innovate</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-display font-extrabold tracking-[-0.03em] leading-[1.1] mb-5 text-center lg:text-left"
            >
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="block text-white/95 drop-shadow-sm font-display tracking-tight"
                >
                  Frontend
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="block bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(168,85,247,0.3)] pb-2 filter saturate-[1.2] font-display"
                >
                  Developer
                </motion.span>
              </div>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-9 mb-5 flex items-center justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                <p className="text-xs sm:text-sm font-medium text-slate-200 tracking-wide font-sans">
                  {displayText}<span className="text-[#a855f7] animate-pulse inline-block ml-0.5 font-bold">|</span>
                </p>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-300/85 text-xs sm:text-sm sm:leading-relaxed max-w-lg mb-8 font-normal font-sans text-center lg:text-left"
            >
              Creating Innovative, Functional, and User-Friendly Websites for Digital Solutions.
            </motion.p>

            {/* Tech Stack Picture Badges (with official logo images) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3 mb-12">
              {HERO_TECH.map((tech, i) => (
                <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.45, 
                    delay: 0.7 + (i * 0.08),
                    type: "spring",
                    stiffness: 120 
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -3,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-slate-900/70 hover:bg-slate-800/90 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(6,182,212,0.18)] cursor-pointer overflow-hidden"
                >
                  {/* Subtle Tech Glow on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${tech.glow} 0%, transparent 70%)` }}
                  />

                  {/* Picture / Logo Image */}
                  <div className={`shrink-0 flex items-center justify-center ${tech.isCircleBg ? "w-4 h-4 sm:w-4.5 sm:h-4.5 p-0.5 bg-white/10 rounded-full" : "w-4 h-4 sm:w-4.5 sm:h-4.5"}`}>
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform duration-300 relative z-10"
                      loading="lazy"
                    />
                  </div>

                  {/* Tech Name */}
                  <span className="relative z-10 tracking-wide font-sans">{tech.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons - Eye-Catching & Professional Pair */}
            <div 
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-5 mb-16 text-white"
            >
              {/* Projects Button */}
              <motion.a 
                href="#projects"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.97 }}
                className="relative px-7 sm:px-9 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500/20 via-indigo-600/25 to-blue-600/20 hover:from-cyan-500/35 hover:via-indigo-600/40 hover:to-blue-600/35 border border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] backdrop-blur-xl group overflow-hidden transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                {/* Premium Glow & Shimmer Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out" />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-indigo-500/0 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative z-10 flex items-center justify-center gap-2.5 text-white tracking-wide text-sm sm:text-[15px]">
                  <Code2 size={19} className="text-cyan-300 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Projects</span>
                  <ArrowUpRight size={17} className="text-cyan-300/80 group-hover:text-cyan-200 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>

              {/* Download CV Button - Opens the official document PDF in a new page/tab */}
              <motion.a 
                href="/CV/Rashidul_Haq_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                /* 
                // PREVIOUS PAGE CODE (Commented out as requested - uncomment if internal #resume page is needed):
                onClick={(e) => {
                  e.preventDefault();
                  if (onShowResume) {
                    onShowResume();
                  } else {
                    window.location.hash = "resume";
                  }
                }}
                */
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.97 }}
                className="relative px-7 sm:px-9 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500/20 via-orange-600/25 to-rose-600/20 hover:from-amber-500/35 hover:via-orange-600/40 hover:to-rose-600/35 border border-amber-400/40 hover:border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] backdrop-blur-xl group overflow-hidden transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                {/* Premium Glow & Shimmer Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out" />
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-orange-500/0 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative z-10 flex items-center justify-center gap-2.5 text-white tracking-wide text-sm sm:text-[15px]">
                  <Download size={19} className="text-amber-300 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Download CV</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-400/20 border border-amber-400/35 text-amber-200 tracking-wider">
                    PDF
                  </span>
                </span>
              </motion.a>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-4 md:gap-6">
              {PORTFOLIO_DATA.socials.slice(0, 4).map((social, i) => {
                const Icon = {
                  Facebook,
                  Github,
                  Linkedin,
                  Instagram
                }[social.icon] || Github;
                const style = SOCIAL_STYLES[social.platform] || { bg: "bg-white/5", text: "text-white/40", shadow: "", glow: "bg-white" };

                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: [0, -6, 0],
                    }}
                    transition={{ 
                      opacity: { duration: 0.5, delay: 0.8 + (i * 0.1) },
                      y: { 
                        duration: 4, 
                        repeat: Infinity, 
                        delay: i * 0.4,
                        ease: "easeInOut" 
                      } 
                    }}
                    className="relative group"
                  >
                    {/* Brand glow layer with "Wave" ripple animation */}
                    <motion.div 
                      animate={{ 
                        opacity: [0.05, 0.3, 0.05],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeInOut"
                      }}
                      className={`absolute inset-[-4px] ${style.glow} blur-xl rounded-full z-0 pointer-events-none transition-all duration-1000 group-hover:opacity-100 group-hover:scale-150`} 
                    />
                    
                    <motion.a 
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${style.bg} backdrop-blur-xl flex items-center justify-center border border-white/5 group-hover:border-white/20 relative z-10 shadow-2xl transition-all duration-500 ${style.shadow}`}
                    >
                      <Icon size={20} className={`${style.text} transition-all duration-300 group-hover:scale-110`} />
                    </motion.a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Side Illustration */}
        <div className="w-full lg:w-2/5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Background Glows */}
            <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full animate-pulse" />
            
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              whileHover={{ 
                scale: 1.12,
                rotate: -2,
              }}
              transition={{ 
                // Floating animation loop
                y: {
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut"
                },
                // Hover transitions
                scale: {
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  mass: 1
                },
                default: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
              className="relative z-10 w-full cursor-pointer"
            >
              <img 
                src="/images/Animation1.gif" 
                alt="Main Animation" 
                className="w-full h-auto drop-shadow-[0_20px_80px_rgba(99,102,241,0.4)]"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Accents */}
              <div className="absolute top-1/4 -left-4 w-3 h-3 bg-[#a855f7] rounded-full blur-[1px] animate-pulse" />
              <div className="absolute bottom-1/3 -right-4 w-2 h-2 bg-purple-500 rounded-full blur-[1px] animate-ping" />

              {/* Floating Tech Picture Badges with Eye-Catching Gentle Bounce */}
              {/* React Badge */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0, -5, 0],
                  rotate: [0, -2, 0, 2, 0],
                  scale: [1, 1.04, 1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2.6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] absolute -top-5 -left-2 sm:-left-6 z-20 cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(6,182,212,0.55)]"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter drop-shadow" />
                <span className="text-xs sm:text-[13px] font-bold text-white font-sans tracking-wide">React</span>
              </motion.div>

              {/* Next.js Badge */}
              <motion.div
                animate={{ 
                  y: [0, -13, 0, -4, 0],
                  rotate: [0, 2, 0, -2, 0],
                  scale: [1, 1.04, 1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2.8, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: 0.5 
                }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)] absolute top-8 -right-3 sm:-right-8 z-20 cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 p-0.5 bg-white/10 rounded-full flex items-center justify-center">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-full h-full object-contain filter drop-shadow" />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-white font-sans tracking-wide">Next.js</span>
              </motion.div>

              {/* Node.js Badge */}
              <motion.div
                animate={{ 
                  y: [0, -14, 0, -5, 0],
                  rotate: [0, -2, 0, 3, 0],
                  scale: [1, 1.04, 1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2.7, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: 1.0 
                }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-emerald-400/40 shadow-[0_0_20px_rgba(52,211,153,0.3)] absolute top-1/2 -left-8 -translate-y-1/2 z-20 cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter drop-shadow" />
                <span className="text-xs sm:text-[13px] font-bold text-white font-sans tracking-wide">Node.js</span>
              </motion.div>

              {/* MongoDB Badge */}
              <motion.div
                animate={{ 
                  y: [0, -12, 0, -4, 0],
                  rotate: [0, 3, 0, -2, 0],
                  scale: [1, 1.04, 1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2.9, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: 1.5 
                }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.3)] absolute -bottom-5 -left-1 sm:-left-6 z-20 cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter drop-shadow" />
                <span className="text-xs sm:text-[13px] font-bold text-white font-sans tracking-wide">MongoDB</span>
              </motion.div>

              {/* Tailwind CSS Badge */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0, -5, 0],
                  rotate: [0, -3, 0, 2, 0],
                  scale: [1, 1.04, 1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: 2.0 
                }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.35)] absolute bottom-4 -right-3 sm:-right-8 z-20 cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter drop-shadow" />
                <span className="text-xs sm:text-[13px] font-bold text-white font-sans tracking-wide">Tailwind CSS</span>
              </motion.div>
            </motion.div>
            
            {/* Floating bubbles */}
            <div className="absolute top-1/4 -left-10 w-4 h-4 bg-[#a855f7] rounded-full blur-[10px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-5 w-6 h-6 bg-purple-500 rounded-full blur-[15px] animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
