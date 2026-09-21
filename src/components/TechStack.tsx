import { useState } from "react";
import { motion } from "motion/react";
import { 
  Cpu, 
  Search, 
  CheckCircle2, 
  Layers, 
  GitBranch, 
  Terminal, 
  Bug, 
  Sparkles,
  Workflow
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Frontend",
    "Backend & Cloud",
    "Languages",
    "Tools & DevOps"
  ];

  const filteredTech = PORTFOLIO_DATA.techStack.filter((tech) => {
    const matchesCategory = 
      selectedCategory === "All" || 
      tech.category === selectedCategory ||
      (selectedCategory === "Backend & Cloud" && (tech.category.includes("Backend") || tech.category.includes("Cloud")));
      
    const matchesSearch = 
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      {/* Anchor for compatibility with #skills */}
      <span id="skills" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -translate-x-1/3" />

      <div className="layout-container relative z-10">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
          >
            <Cpu size={12} className="text-cyan-400" />
            <span>Technical Arsenal</span>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Skills & <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent inline-block">Tech Stack</span>
            </h2>
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full opacity-30 -z-10" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mt-3 opacity-70" />
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-white/50 text-sm md:text-[15px] font-normal max-w-xl mx-auto mt-3 tracking-wide"
          >
            A robust engineering foundation spanning reactive client interfaces, scalable server architectures, databases, and quality assurance methodologies.
          </motion.p>
        </motion.div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 max-w-5xl mx-auto">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto max-w-full scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-950/30"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search skill (e.g. React, TypeScript)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] transition-all"
            />
          </div>
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-16">
          {filteredTech.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (i % 10) * 0.03 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-[#090d18]/80 hover:bg-[#0d1424] backdrop-blur-xl border border-white/[0.07] hover:border-cyan-500/40 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Outer Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon Container */}
              <div className="relative z-10 w-12 h-12 mb-3 flex items-center justify-center p-2 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-cyan-500/30 transition-all">
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title & Info */}
              <h4 className="relative z-10 text-white font-display font-bold text-xs sm:text-sm tracking-wide group-hover:text-cyan-300 transition-colors">
                {tech.name}
              </h4>
              
              <div className="relative z-10 flex items-center gap-1.5 mt-2">
                <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-white/50 font-mono">
                  {tech.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Software Engineering & QA Specialization Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-[1.8rem] bg-gradient-to-b from-[#0b1020]/95 via-[#080d1a] to-[#050812] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Workflow size={12} />
                <span>Software Quality & Engineering</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Testing, STLC & Development Lifecycle Methodologies
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mt-1 max-w-2xl">
                Rigorous testing standards and agile software engineering best practices applied across every sprint and release cycle.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} /> STLC / SDLC Certified
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PORTFOLIO_DATA.qaSkills?.map((qa, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 transition-all flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Bug size={14} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs sm:text-sm group-hover:text-indigo-300 transition-colors">
                    {qa.name}
                  </h4>
                  <p className="text-white/40 text-[11px] leading-relaxed mt-0.5">
                    {qa.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
