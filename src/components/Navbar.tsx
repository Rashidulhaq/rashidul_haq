import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, FileText, Send } from "lucide-react";

const NAV_ITEMS = [
  "Home",
  // "About", // Temporarily hidden - uncomment to restore
  "Experience",
  "Education",
  "Projects",
  "Certificates",
  "Skills",
  "Tour",
  "Blog",
  // "Contact" // Temporarily hidden - uncomment to restore
];

const NAV_ID_MAP: Record<string, string> = {
  "home": "home",
  "about": "about",
  "experience": "experience",
  "education": "education",
  "projects": "projects",
  "portfolio": "projects",
  "certificates": "certificates",
  "tech stack": "tech-stack",
  "skills": "tech-stack",
  "tour": "tour",
  "blog": "blog",
  "contact": "contact"
};

export default function Navbar({ onShowResume, onShowBlog }: { onShowResume?: () => void, onShowBlog?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Traditional Scroll Spy for high precision
      if (window.scrollY < 100) {
        setActiveSection("Home");
        return;
      }

      const sectionIds = ["home", "about", "experience", "education", "projects", "certificates", "tech-stack", "tour", "blog", "contact"];
      const offset = 150; // Active trigger offset from the top
      const scrollPos = window.scrollY + offset;

      let currentSection = "";
      
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          
          if (scrollPos >= top && scrollPos < bottom) {
            currentSection = id;
            break; // Stop at first match
          }
        }
      }

      const matchedItem = NAV_ITEMS.find(item => {
        const mappedId = NAV_ID_MAP[item.toLowerCase()];
        return mappedId === currentSection || item.toLowerCase() === currentSection;
      });

      if (matchedItem) {
        setActiveSection(matchedItem);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const lower = id.toLowerCase();
    const targetId = NAV_ID_MAP[lower] || lower.replace(/\s+/g, '-');
    const element = document.getElementById(targetId) || (targetId === "portfolio" ? document.getElementById("projects") : null);
    
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
        scrolled 
          ? "py-3.5 bg-[#060a14]/85 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.08)]" 
          : "py-5 bg-gradient-to-b from-[#060a14]/90 via-[#060a14]/40 to-transparent backdrop-blur-sm border-b border-white/[0.04]"
      }`}
    >
      <div className="layout-container flex items-center justify-between gap-4">
        {/* ========================================================= */}
        {/* LOGO & BRAND NAME                                         */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer flex items-center gap-3 group select-none shrink-0"
          onClick={() => scrollToSection("Home")}
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
              <span className="font-display font-extrabold text-base sm:text-lg md:text-xl text-white tracking-tight group-hover:text-cyan-100 transition-colors drop-shadow-sm">
                RASHIDUL
              </span>
              <span className="font-display font-extrabold text-base sm:text-lg md:text-xl bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
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

        {/* ========================================================= */}
        {/* DESKTOP NAVIGATION CAPSULE                                */}
        {/* ========================================================= */}
        <div className="hidden lg:flex items-center gap-0.5 p-1.5 bg-[#070e1d]/85 border border-cyan-500/25 hover:border-cyan-400/40 rounded-full backdrop-blur-2xl shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(6,182,212,0.12)] transition-colors group/nav">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={(e) => {
                e.preventDefault();
                if (item === "Blog" && onShowBlog) {
                  onShowBlog();
                } else {
                  scrollToSection(item);
                }
              }}
              className={`px-3 xl:px-3.5 py-1.5 text-[10px] xl:text-[11px] uppercase tracking-[0.14em] font-bold transition-all rounded-full relative group/item whitespace-nowrap cursor-pointer ${
                activeSection === item ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="relative z-10">{item}</span>

              {/* Active Tab Glow Capsule */}
              {activeSection === item && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 rounded-full border border-cyan-400/40 shadow-[0_0_18px_rgba(6,182,212,0.35)]"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}

              {/* Active Indicator Underline Dot */}
              {activeSection === item && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.9)]"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
            </motion.a>
          ))}

          {/* Quick CV Button Pill */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: NAV_ITEMS.length * 0.04 }}
            onClick={(e) => {
              e.preventDefault();
              onShowResume?.();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 hover:from-cyan-500/25 hover:to-indigo-500/25 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white text-[10px] xl:text-[11px] uppercase tracking-[0.14em] font-extrabold transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.2)] group"
          >
            <FileText size={11} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>CV</span>
          </motion.button>
        </div>

        {/* ========================================================= */}
        {/* HIRE ME ACTION BUTTON (Compact, Sleek & Eye-Catching)     */}
        {/* ========================================================= */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -1.5,
              boxShadow: "0 0 25px rgba(6, 182, 212, 0.6)"
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToSection("Contact")}
            className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 border border-cyan-300/40 hover:border-cyan-200 text-white font-display font-bold text-[10px] xl:text-[11px] uppercase tracking-[0.14em] shadow-[0_0_16px_rgba(6,182,212,0.35)] overflow-hidden group cursor-pointer transition-all duration-300"
          >
            {/* Shimmer Light-Sweep Reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            {/* Live Green Beacon Status Dot */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>

            {/* Button Label & Icon */}
            <span className="relative z-10 flex items-center gap-1 drop-shadow-sm">
              <span>Hire Me</span>
              <Sparkles size={11} className="text-cyan-200 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </motion.button>
        </div>

        {/* ========================================================= */}
        {/* MOBILE MENU TOGGLE BUTTON                                 */}
        {/* ========================================================= */}
        <button 
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-cyan-400/30 hover:border-cyan-400/60 flex items-center justify-center text-cyan-300 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ========================================================= */}
      {/* MOBILE MENU DRAWER                                        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#060a14]/95 border-b border-cyan-500/20 overflow-hidden shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-1.5 p-5 bg-[#060a14]/90">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item === "Blog" && onShowBlog) {
                      onShowBlog();
                      setIsOpen(false);
                    } else {
                      scrollToSection(item);
                    }
                  }}
                  className={`text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all relative group flex items-center justify-between ${
                    activeSection === item 
                      ? "text-white bg-cyan-950/50 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]" 
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  {activeSection === item && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                  )}
                </motion.a>
              ))}

              <div className="h-[1px] bg-white/[0.08] my-3" />

              {/* Mobile Actions: Hire Me + CV */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => {
                    scrollToSection("Contact");
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-display font-bold text-[11px] uppercase tracking-[0.14em] shadow-[0_0_16px_rgba(6,182,212,0.35)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Hire Me</span>
                  <Sparkles size={11} className="text-cyan-200" />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onShowResume?.();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-cyan-400/30 text-cyan-300 font-bold uppercase tracking-[0.14em] text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                >
                  <FileText size={11} />
                  <span>View CV</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
