/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import TechStack from "./components/TechStack";
import TourGallery from "./components/TourGallery";
import Blog from "./components/Blog";
import BlogPage from "./components/BlogPage";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Resume from "./components/Resume";
import ComingSoon from "./components/ComingSoon";
import FloatingParticles from "./components/FloatingParticles";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function App() {
  const [contentVisible, setContentVisible] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "resume" | "blog" | "live">("home");
  const [lastHomeHash, setLastHomeHash] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    // Clear hash immediately on load to keep URL clean during preloader
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    let isInitialLoad = true;

    const handleHashChange = (isInitial?: boolean) => {
      const hash = window.location.hash.replace('#', '');
      
      // On initial load, we force Home/Hero view as requested by the user
      // to ensure a clean start at the top of the page.
      if (isInitial) {
        setCurrentView('home');
        if (hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      if (hash === 'resume') {
        setCurrentView('resume');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === 'blog') {
        setCurrentView('blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === 'live' || hash === 'coming-soon') {
        setCurrentView('live');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
        
        // Handle scrolling for sections on the home page
        if (hash && hash !== 'home' && hash !== '/') {
          // Wait for DOM to be ready and layout to stabilize
          setTimeout(() => {
            const targetId = hash === 'portfolio' ? 'projects' : (hash === 'skills' ? 'tech-stack' : hash);
            const element = document.getElementById(targetId);
            if (element) {
              const offset = 80;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = element.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }, 400);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    const timer = setTimeout(() => {
      setContentVisible(true);
      handleHashChange(true);
    }, 3500);

    const onHashChange = () => handleHashChange(false);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  // New Effect for Scroll Tracking (Intersection Observer) - DISABLED FOR CLEAN URL
  /* 
  useEffect(() => {
    if (currentView !== 'home' || !contentVisible) return;

    const sections = ['home', 'about', 'education', 'portfolio', 'tour', 'blog', 'contact'];
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Detect when top of section is near navbar
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setLastHomeHash(id);
          // Update URL without triggering hashchange event or adding to history stack
          window.history.replaceState(null, '', `#${id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView, contentVisible]);
  */

  const toggleView = (view: "home" | "resume" | "blog" | "live") => {
    // If we're going home, we clear the hash for a "fresh" URL
    if (view === "home") {
      setCurrentView("home");
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = view;
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleSetPortfolioTab = (tab: string) => {
    let targetId = "projects";
    if (tab === "Certificates") targetId = "certificates";
    else if (tab === "Tech Stack" || tab === "Skills") targetId = "tech-stack";

    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative min-h-screen selection:bg-brand/30 selection:text-white overflow-x-hidden bg-[#0a0a0a] text-white">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-purple-600/10 blur-[180px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-indigo-600/10 blur-[180px] rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand/5 blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      </div>

      <Preloader />
      
      <AnimatePresence mode="wait">
        {contentVisible && (
          <div className="relative z-10">
            {currentView === "home" ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FloatingParticles />
                <Navbar 
                  onShowResume={() => toggleView("resume")} 
                  onShowBlog={() => toggleView("blog")} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(20px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 1.5, 
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <main>
                    <Hero />
                    <About 
                      onShowResume={() => toggleView("resume")} 
                      onSetPortfolioTab={handleSetPortfolioTab}
                    />
                    <Education />
                    <Projects onShowComingSoon={() => toggleView("live")} />
                    <Certificates />
                    <TechStack />
                    <TourGallery />
                    <Blog onShowFullBlog={() => toggleView("blog")} />
                    <Contact />
                  </main>
                  <Footer />
                </motion.div>
                
                {/* Floating AI / Assistant Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
                  className="fixed bottom-8 right-8 z-[999]"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#ec4899] p-[1px] shadow-[0_20px_50px_rgba(79,70,229,0.3)] group overflow-hidden"
                    onClick={() => {
                      window.location.hash = "contact";
                    }}
                  >
                    <div className="absolute inset-0 bg-[#0a0a0a] rounded-2xl m-[1px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                      <div className="relative">
                        <div className="absolute inset-0 bg-brand/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="w-7 h-7 text-white relative z-10"
                        >
                          <path d="M12 8V4H8" />
                          <rect width="16" height="12" x="4" y="8" rx="2" />
                          <path d="M2 14h2" />
                          <path d="M20 14h2" />
                          <path d="M15 13v2" />
                          <path d="M9 13v2" />
                        </svg>
                      </div>
                    </div>
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#4f46e5]/20 animate-ping opacity-0 group-hover:opacity-100 duration-1000" />
                  </motion.button>
                </motion.div>

                {/* Floating Scroll to Top Button (Positioned Directly Above the Assistant Bot with Floating Animation) */}
                <AnimatePresence>
                  {showScrollTop && (
                    <motion.div
                      key="scroll-to-top-wrapper"
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, -7, 0] // Eye-catching smooth bobbing up and down animation
                      }}
                      exit={{ opacity: 0, scale: 0.5, y: 20 }}
                      transition={{ 
                        opacity: { duration: 0.25 },
                        scale: { duration: 0.25 },
                        y: {
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: 2,
                          ease: "easeInOut"
                        }
                      }}
                      className="fixed bottom-28 right-8 w-16 z-[998] flex items-center justify-center pointer-events-none"
                    >
                      <motion.button
                        whileHover={{ 
                          scale: 1.15,
                          boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        title="Scroll to Top"
                        className="pointer-events-auto relative w-12 h-12 rounded-full bg-[#080c15]/95 hover:bg-[#0c1424] border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-xl flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(6,182,212,0.25)] transition-all group overflow-hidden cursor-pointer"
                      >
                        {/* Soft background pulse glow */}
                        <div className="absolute inset-0 rounded-full bg-cyan-400/10 animate-pulse pointer-events-none" />

                        <ArrowUp 
                          size={20} 
                          strokeWidth={2.5}
                          className="text-cyan-400 group-hover:text-cyan-300 transition-transform duration-300 group-hover:-translate-y-1" 
                        />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : currentView === "resume" ? (
              <Resume key="resume" onBack={() => toggleView("home")} />
            ) : currentView === "blog" ? (
              <BlogPage key="blog" onBack={() => toggleView("home")} />
            ) : (
              <ComingSoon 
                key="live" 
                onBack={() => toggleView("home")} 
                title="Live Demo Coming Soon" 
                message="This project's live environment is currently being prepared. Check back soon or view the source code on GitHub in the meantime."
              />
            )}
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
