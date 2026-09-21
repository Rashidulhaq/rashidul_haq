import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = ["Home", "About", "Education", "Projects", "Certificates", "Tech Stack", "Tour", "Blog", "Contact"];

const NAV_ID_MAP: Record<string, string> = {
  "home": "home",
  "about": "about",
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

      const sectionIds = ["home", "about", "education", "projects", "certificates", "tech-stack", "tour", "blog", "contact"];
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
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 border-b ${
        scrolled 
          ? "py-4 glass border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]" 
          : "py-6 bg-dark/10 backdrop-blur-md border-white/5"
      }`}
    >
      <div className="reflection-line" />
      <div className="layout-container flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter cursor-pointer text-[#a855f7] flex items-center gap-2 group"
          onClick={() => scrollToSection("Home")}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center group-hover:bg-[#a855f7]/20 transition-all shadow-inner">
            <span className="text-[#a855f7] text-lg md:text-xl italic font-black">MD</span>
          </div>
          <span className="text-white group-hover:text-[#a855f7] transition-colors inline tracking-tight text-sm md:text-base">RASHIDUL<span className="text-[#ec4899] text-xl md:text-3xl leading-none">.</span></span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5 p-1 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-xl group/nav">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={(e) => {
                e.preventDefault();
                if (item === "Blog" && onShowBlog) {
                  onShowBlog();
                } else {
                  scrollToSection(item);
                }
              }}
              className={`px-2.5 lg:px-3.5 py-2 text-[9px] lg:text-[10px] uppercase tracking-[0.14em] font-bold transition-all rounded-full relative group/item whitespace-nowrap ${
                activeSection === item ? "text-white" : "text-white/40 hover:text-white"
              }`}
            >
              <span className="relative z-10">{item}</span>
              {activeSection === item && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {activeSection === item && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-[2px] bg-gradient-to-r from-[#4f46e5] to-[#ec4899] rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.a>
          ))}
          <motion.a
            href="#resume"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: NAV_ITEMS.length * 0.05 }}
            onClick={(e) => {
              e.preventDefault();
              onShowResume?.();
            }}
            className="px-2.5 lg:px-3 py-2 text-[9px] lg:text-[10px] uppercase tracking-[0.14em] font-bold text-[#a855f7] hover:text-white transition-all rounded-full hover:bg-[#a855f7]/10 relative group whitespace-nowrap"
          >
            CV
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#4f46e5] to-[#ec4899] transition-all group-hover:w-2 rounded-full" />
          </motion.a>
        </div>

        <div className="hidden md:block">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("Contact")}
            className="relative px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-r from-[#4f46e5] via-[#a855f7] to-[#ec4899] border border-white/10 rounded-lg md:rounded-xl text-[9px] md:text-[10px] uppercase font-bold tracking-[0.15em] md:tracking-[0.2em] text-white shadow-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Hire Me</span>
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full glass border-b border-white/10 overflow-hidden shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-2 p-6 bg-dark/60">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item === "Blog" && onShowBlog) {
                      onShowBlog();
                      setIsOpen(false);
                    } else {
                      scrollToSection(item);
                    }
                  }}
                  className={`text-left px-6 py-4 text-xs font-bold uppercase tracking-[0.3em] rounded-xl transition-all relative group ${
                    activeSection === item 
                      ? "text-white" 
                      : "text-white/40 hover:text-[#a855f7] hover:bg-white/5"
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeTabMobile"
                      className="absolute inset-0 bg-white/5 rounded-xl border-l-2 border-[#a855f7]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              ))}
              <div className="h-[1px] bg-white/5 my-2" />
              <a 
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  onShowResume?.();
                  setIsOpen(false);
                }}
                className="w-full py-5 bg-dark/60 backdrop-blur-xl border border-[#4f46e5]/30 rounded-2xl text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-[0_0_20px_rgba(79,70,229,0.1)] hover:border-[#4f46e5]/60 transition-all text-center block"
              >
                View CV Page
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
