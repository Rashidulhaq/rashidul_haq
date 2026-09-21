import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Code2, User, GitBranch } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0,
            filter: "blur(60px)",
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Background Elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05] 
            }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[160px] rounded-full" 
          />
          
          <motion.div 
            exit={{ 
              scale: 1.15,
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
            }}
            className="relative z-10 text-center px-6"
          >
            {/* Top Icons Staggered - Descending from top */}
            <div className="flex justify-center gap-4 md:gap-6 mb-12">
              {[Code2, User, GitBranch].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -50, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.2 + i * 0.15, 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 12 
                  }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl glass border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.1)] group"
                >
                  <Icon size={20} className="text-white group-hover:text-brand-light transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Main Text with Specific Directions */}
            <div className="space-y-4">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.8, 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="text-xs md:text-sm lg:text-base font-display font-medium text-white/40 tracking-[0.8em] uppercase"
                >
                  Welcome To My
                </motion.h2>
              </div>
              
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1.1, 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400/90 via-indigo-400 to-purple-500/90 pb-3 leading-tight"
                >
                  Personal Website
                </motion.h1>
              </div>
            </div>

            {/* Signature Name with Bottom Animation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mt-12 flex flex-col items-center"
            >
              <p className="text-sm md:text-base font-display font-bold text-brand-light tracking-[0.4em] uppercase mb-4">
                Rashidul Haq
              </p>
              
              {/* Progress Line */}
              <div className="w-32 md:w-48 h-px bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ delay: 2, duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-brand-light"
                />
              </div>
            </motion.div>

            {/* Abstract Particle Accents */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [-20, 20],
                    x: [-20, 20]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4 + i, 
                    delay: i * 0.5 
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
