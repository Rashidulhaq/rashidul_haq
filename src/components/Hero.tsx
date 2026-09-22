import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ExternalLink, Mail, Github, Linkedin, Instagram, Sparkles, Facebook } from "lucide-react";
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

export default function Hero() {
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-display font-black tracking-tight leading-[1.1] mb-5"
            >
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="block text-white/95 drop-shadow-sm"
                >
                  Frontend
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="block bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(168,85,247,0.3)] pb-2 filter saturate-[1.2]"
                >
                  Developer
                </motion.span>
              </div>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-8 mb-5"
            >
              <p className="text-base md:text-lg font-medium text-white/75 italic tracking-tight">
                {displayText}<span className="text-[#a855f7] animate-pulse inline-block ml-0.5">|</span>
              </p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-neutral-subtle text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-normal opacity-85"
            >
              Creating Innovative, Functional, and User-Friendly Websites for Digital Solutions.
            </motion.p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-12">
              {["React", "Javascript", "Node.js", "Tailwind"].map((tech, i) => (
                <motion.span 
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + (i * 0.1),
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 md:px-6 md:py-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] text-white/40 hover:text-white hover:border-[#a855f7]/40 hover:bg-[#a855f7]/5 transition-all cursor-default shadow-[0_0_20px_rgba(0,0,0,0.3)] relative group overflow-hidden"
                >
                  <span className="relative z-10">{tech}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/10 via-[#a855f7]/10 to-[#ec4899]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.span>
              ))}
            </div>

            {/* Buttons */}
            <div 
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mb-16 text-white"
            >
              <motion.a 
                href="#projects"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 md:px-11 py-4 md:py-5 bg-dark/60 backdrop-blur-xl rounded-2xl font-bold flex items-center justify-center gap-3 border border-[#4f46e5]/20 hover:border-[#4f46e5]/50 transition-colors group overflow-hidden w-full sm:w-auto"
              >
                {/* Premium Glow Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/5 to-[#4f46e5]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/20 to-[#4f46e5]/0 blur-md group-hover:animate-pulse" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/0 via-[#4f46e5]/10 to-[#4f46e5]/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10 flex items-center justify-center gap-3 text-neutral-100">
                  Projects <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-[#4f46e5]" />
                </span>
              </motion.a>
              <motion.a 
                href="https://wa.me/8801912196464"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 md:px-11 py-4 md:py-5 bg-dark/60 backdrop-blur-xl rounded-2xl font-bold flex items-center justify-center gap-3 border border-[#ec4899]/20 hover:border-[#ec4899]/50 transition-colors group overflow-hidden w-full sm:w-auto"
              >
                {/* Premium Glow Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/0 via-[#ec4899]/5 to-[#ec4899]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ec4899]/0 via-[#ec4899]/20 to-[#ec4899]/0 blur-md group-hover:animate-pulse" />

                <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/0 via-[#ec4899]/5 to-[#ec4899]/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10 flex items-center justify-center gap-3 text-neutral-100">
                  Contact <Mail size={18} className="group-hover:scale-110 transition-transform duration-300 text-[#ec4899]" />
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
