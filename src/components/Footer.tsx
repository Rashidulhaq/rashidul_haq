import { motion } from "motion/react";
import { Heart, Github, Linkedin, Facebook, Mail } from "lucide-react";
import React from "react";
import { PORTFOLIO_DATA } from "../constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: PORTFOLIO_DATA.profile.github,
      color: "hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: PORTFOLIO_DATA.profile.linkedin,
      color: "hover:text-sky-300 hover:border-sky-400/50 hover:bg-sky-500/10"
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: PORTFOLIO_DATA.profile.facebook,
      color: "hover:text-indigo-300 hover:border-indigo-400/50 hover:bg-indigo-500/10"
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:${PORTFOLIO_DATA.profile.email}`,
      color: "hover:text-amber-300 hover:border-amber-400/50 hover:bg-amber-500/10"
    }
  ];

  return (
    <footer className="py-8 sm:py-9 border-t border-cyan-500/20 bg-[#060a14] relative overflow-hidden group/footer">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-24 bg-gradient-to-b from-cyan-500/15 via-indigo-500/10 to-transparent blur-[85px] pointer-events-none" />

      {/* Top micro gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="layout-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Logo / Brand - Left (Exact match to Header) */}
          <div className="flex-1 flex justify-center md:justify-start order-1">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={scrollToTop}
            >
              {/* High-Tech Monogram Logo Badge */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0c1a30] via-[#081224] to-[#150d2c] border border-cyan-400/50 group-hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.65)] transition-all duration-300 flex items-center justify-center shrink-0">
                {/* Shimmer Light-Sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none rounded-xl" />

                {/* Glowing Tech Monogram < R /> */}
                <div className="relative flex items-center justify-center font-mono font-black tracking-tight">
                  <span className="text-cyan-400 text-xs sm:text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">&lt;</span>
                  <span className="text-white text-base sm:text-lg font-display font-black tracking-tight group-hover:text-cyan-200 transition-colors mx-0.5">R</span>
                  <span className="text-indigo-400 text-xs sm:text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">/&gt;</span>
                </div>

                {/* Active Green Status Beacon */}
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5" title="Available for opportunities">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-[#070b14]" />
                </span>
              </div>

              {/* Name & Title Typography Block */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight group-hover:text-cyan-100 transition-colors drop-shadow-sm">
                    RASHIDUL
                  </span>
                  <span className="font-display font-extrabold text-base sm:text-lg bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                    HAQ
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] uppercase font-semibold text-cyan-400/90 group-hover:text-cyan-300 transition-colors">
                    Software Engineer
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links & Copyright - Center */}
          <div className="order-2 flex flex-col items-center gap-2">
            {/* Social Pills */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => {
                const IconComponent = s.icon;
                return (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 backdrop-blur-md shadow-sm ${s.color}`}
                    title={s.name}
                    aria-label={s.name}
                  >
                    <IconComponent size={16} />
                  </motion.a>
                );
              })}
            </div>

            {/* Copyright Note */}
            <p className="text-[11px] sm:text-xs text-slate-400 tracking-wider text-center font-medium">
              © {currentYear} <span className="text-white font-semibold">Rashidul Haq</span>. All Rights Reserved.
            </p>
          </div>

          {/* Availability & Location - Right */}
          <div className="flex-1 flex justify-center md:justify-end items-center order-3">
            <div className="flex flex-col items-center md:items-end gap-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-[11px] font-semibold tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.12)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open for Opportunities</span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                Crafted with <Heart size={11} className="text-rose-500 fill-rose-500 animate-pulse" /> in Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
