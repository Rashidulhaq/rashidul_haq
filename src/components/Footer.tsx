import { motion } from "motion/react";
import { Heart, ArrowUp } from "lucide-react";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t border-white/10 bg-[#06080d] relative overflow-hidden group/footer">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-24 bg-gradient-to-b from-brand/15 to-transparent blur-[80px] pointer-events-none" />

      {/* Top micro gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="layout-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Logo / Brand - Left */}
          <div className="flex-1 flex justify-center md:justify-start order-1">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={scrollToTop}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand/20 via-indigo-500/10 to-transparent border border-white/10 flex items-center justify-center group-hover:border-brand/40 group-hover:bg-brand/20 transition-all duration-300 shadow-sm">
                <span className="text-brand-light text-xs italic font-black">RH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-display font-bold tracking-tight text-white group-hover:text-brand-light transition-colors">
                  RASHIDUL<span className="text-brand-light">.</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-bold opacity-70">
                  Software Engineer
                </span>
              </div>
            </motion.div>
          </div>

          {/* Copyright - Middle */}
          <div className="order-3 md:order-2 flex-1 flex justify-center">
            <p className="text-xs text-white/40 tracking-wider text-center font-medium">
              © {currentYear} <span className="text-white/80 font-semibold">Rashidul Haq</span>. All Rights Reserved.
            </p>
          </div>

          {/* Credits & Back to Top - Right */}
          <div className="flex-1 flex justify-center md:justify-end items-center gap-5 order-2 md:order-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-white/40 flex items-center justify-end gap-1.5 font-medium">
                Built with <Heart size={12} className="text-pink-500 fill-pink-500 animate-pulse" /> Bangladesh.
              </p>
            </div>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ 
                y: -4, 
                scale: 1.08,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex items-center justify-center group transition-all hover:bg-brand/15 hover:border-brand/40 shadow-sm relative overflow-hidden"
              title="Back to Top"
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              
              <ArrowUp size={18} className="text-white/40 group-hover:text-brand-light transition-all duration-300 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
