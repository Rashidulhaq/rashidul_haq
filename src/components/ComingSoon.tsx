import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Clock, Rocket } from "lucide-react";

interface ComingSoonProps {
  onBack: () => void;
  title?: string;
  message?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ onBack, title, message }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-3xl"
      >
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 text-sm uppercase tracking-[0.2em] font-bold"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>

        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-brand-light/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Clock className="text-brand-light w-12 h-12 md:w-16 md:h-16 relative z-10 animate-[spin_10s_linear_infinite]" />
          </motion.div>
          
          {/* Animated Particles */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute text-brand-light/40"
                style={{ 
                  left: `${15 + i * 15}%`,
                  bottom: '20%'
                }}
              >
                <Sparkles size={8 + Math.random() * 8} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight"
        >
          {title || "Something Extraordinary is Coming"}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10"
        >
          {message || "My blog is currently under construction. I'm busy writing high-quality articles about tech, development, and my experiences."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
            <Rocket size={20} className="text-brand-light" />
            <span className="text-sm font-bold tracking-widest uppercase text-white/60">Launch Expected Soon</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
};

export default ComingSoon;
