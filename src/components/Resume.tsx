import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Download, Mail, Phone, MapPin, Globe, Linkedin, Github, Award, BookOpen, Briefcase, Star, Facebook } from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";

interface ResumeProps {
  onBack: () => void;
}

const Resume: React.FC<ResumeProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-[#0a0a0b] py-20 px-4 md:px-0"
    >
      <div className="max-w-4xl mx-auto Resume-container">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Back to Portfolio</span>
          </button>
          
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-[#4f46e5]/10 border border-[#4f46e5]/20 rounded-lg md:rounded-xl text-[#4f46e5] font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#4f46e5]/20 transition-all cursor-pointer group"
          >
            <Download size={14} className="md:size-4 group-hover:translate-y-0.5 transition-transform" /> PDF Version
          </button>
        </div>

        {/* Resume Content */}
        <div className="bg-[#0e0e12] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* Top Profile Section */}
          <div className="p-10 md:p-16 bg-gradient-to-br from-[#4f46e5]/10 via-transparent to-[#ec4899]/5 border-b border-white/5">
            <div className="flex flex-col md:flex-row gap-10 items-center text-center md:text-left">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative group w-32 h-32 md:w-40 md:h-40"
              >
                {/* Pulsing Aura */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1], 
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-4 bg-[#a855f7]/30 rounded-full blur-2xl group-hover:bg-[#a855f7]/50 transition-colors"
                />
                
                <div className="relative w-full h-full rounded-full p-[2px] overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#1a1a20] p-1 border-2 border-white/10">
                    <motion.img 
                      src={PORTFOLIO_DATA.profile.resumeImage} 
                      alt="Profile" 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover rounded-full" 
                    />
                    {/* Glass Flash / Shine Effect */}
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:animate-shine pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[25deg] -translate-x-[150%]" />
                  </div>
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-black text-white mb-2">{PORTFOLIO_DATA.profile.name}</h1>
                <p className="text-[#a855f7] font-bold tracking-[0.3em] uppercase text-sm mb-6">{PORTFOLIO_DATA.profile.role}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-white/40 text-[11px] font-medium">
                  <div className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={14} className="text-[#4f46e5]" /> <span>{PORTFOLIO_DATA.profile.email}</span></div>
                  <div className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={14} className="text-[#ec4899]" /> <span>{PORTFOLIO_DATA.profile.phone}</span></div>
                  <div className="flex items-center gap-2 hover:text-white transition-colors"><MapPin size={14} className="text-[#a855f7]" /> <span>{PORTFOLIO_DATA.profile.address}</span></div>
                  <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Github size={14} className="text-white" /> <span>Rashidulhaq</span></a>
                  <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Linkedin size={14} className="text-[#4f46e5]" /> <span>Rashidulhaq</span></a>
                  <div className="flex items-center gap-2 hover:text-white transition-colors"><Globe size={14} className="text-emerald-400" /> <span>{PORTFOLIO_DATA.profile.portfolio}</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Left Column - Sidebar Info */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 bg-black/20">
              <section className="mb-12">
                <h3 className="text-white font-display font-bold text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Star size={14} className="text-[#a855f7]" /> Key Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Agile", "SDLC", "STLC", "Manual Testing", "AI", "OOP"].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-lg text-white/50 text-[10px] font-bold uppercase tracking-widest">{skill}</span>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h3 className="text-white font-display font-bold text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Globe size={14} className="text-[#4f46e5]" /> Languages
                </h3>
                <div className="space-y-4 text-xs font-bold">
                  <div className="flex justify-between text-white/40"><span>Bengali</span> <span className="text-white/60">Native</span></div>
                  <div className="flex justify-between text-white/40"><span>English</span> <span className="text-white/60">Fluent</span></div>
                </div>
              </section>

              <section className="mb-12">
                <h3 className="text-white font-display font-bold text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Award size={14} className="text-[#ec4899]" /> Volunteers
                </h3>
                <div className="space-y-4">
                   <div className="text-white/40 font-bold text-xs leading-relaxed">
                     <p className="text-white/60">Priyoful School</p>
                     <span>Teacher and volunteer (Non-profit)</span>
                   </div>
                </div>
              </section>

              <section>
                <h3 className="text-white font-display font-bold text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Github size={14} className="text-white" /> Online Presence
                </h3>
                <div className="space-y-4">
                 <div className="flex flex-col gap-3">
                   <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-xs font-bold flex items-center gap-2">
                      <Github size={12} /> GitHub
                   </a>
                   <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-xs font-bold flex items-center gap-2">
                      <Linkedin size={12} /> LinkedIn
                   </a>
                   <a href={PORTFOLIO_DATA.profile.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-xs font-bold flex items-center gap-2">
                      <Facebook size={12} /> Facebook
                   </a>
                   <a href={`https://${PORTFOLIO_DATA.profile.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-xs font-bold flex items-center gap-2">
                      <Globe size={12} /> Portfolio
                   </a>
                 </div>
                </div>
              </section>
            </div>

            {/* Right Column - Main Info */}
            <div className="md:col-span-2 p-8 md:p-16 space-y-16">
              {/* Profile Intro */}
              <section>
                <h3 className="text-[#a855f7] font-display font-black text-px uppercase tracking-[0.4em] text-[10px] mb-4">Career Objective</h3>
                <p className="text-white/50 text-base leading-relaxed">
                  "To become a successful expert in the field of Computer Technology by challenging my technical knowledge and skills to ensure personal and professional growth and to contribute to the prosperity of the organization."
                </p>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-white font-display font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <BookOpen size={18} className="text-[#4f46e5]" /> Education
                </h3>
                <div className="space-y-10">
                  {PORTFOLIO_DATA.education.slice(0, 1).map((item, i) => (
                    <div key={i} className="relative pl-8 border-l border-white/5">
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-[#4f46e5] rounded-full shadow-[0_0_10px_#4f46e5]" />
                      <span className="text-[#4f46e5] text-[10px] font-black tracking-widest uppercase mb-2 block">{item.year}</span>
                      <h4 className="text-white font-display font-bold text-lg mb-1">{item.degree}</h4>
                      <p className="text-white/40 text-xs font-bold mb-3 uppercase tracking-wider">{item.institution}</p>
                      <p className="text-white/30 text-xs mb-4 leading-relaxed">{item.description}</p>
                      {item.gpa && (
                        <div className="mt-4 inline-block px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[9px] font-black text-[#a855f7] uppercase tracking-widest">{item.gpa}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>


              {/* Extra Curriculum & Volunteer */}
              <div className="grid sm:grid-cols-2 gap-10">
                <section>
                  <h3 className="text-white font-display font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <Star size={18} className="text-[#a855f7]" /> Activities
                  </h3>
                  <div className="space-y-4">
                    {PORTFOLIO_DATA.extra_curriculum.map((item, i) => (
                      <div key={i} className="pl-4 border-l-2 border-[#a855f7]/30">
                        <p className="text-white font-bold text-sm">{item.role}</p>
                        <p className="text-white/40 text-xs">{item.organization}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-white font-display font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <Award size={18} className="text-[#ec4899]" /> Volunteer
                  </h3>
                  <div className="space-y-4">
                    {PORTFOLIO_DATA.volunteer.map((item, i) => (
                      <div key={i} className="pl-4 border-l-2 border-[#ec4899]/30">
                        <p className="text-white font-bold text-sm">{item.role}</p>
                        <p className="text-white/40 text-xs">{item.organization}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Selected Projects */}
              <section className="print:block">
                <h3 className="text-white font-display font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <Briefcase size={18} className="text-[#a855f7]" /> Selected Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {PORTFOLIO_DATA.projects.map((project, i) => (
                    <div key={i} className="p-5 bg-white/[0.01] border border-white/5 rounded-xl hover:border-[#a855f7]/30 transition-all group flex flex-col justify-between">
                      <div>
                        <h4 className="text-white font-bold text-[12px] mb-2 group-hover:text-[#a855f7] transition-colors line-clamp-1">{project.title}</h4>
                        <p className="text-white/30 text-[10px] leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[8px] font-black uppercase tracking-tighter text-white/20 bg-white/5 px-1.5 py-0.5 rounded-md border border-white/5">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* References */}
              <section>
                <h3 className="text-white font-display font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <Star size={18} className="text-[#4f46e5]" /> References
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {PORTFOLIO_DATA.references.map((ref, i) => (
                    <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <h4 className="text-white font-bold text-sm mb-1">{ref.name}</h4>
                      <p className="text-[#a855f7] text-[10px] font-bold uppercase tracking-widest mb-2">{ref.role}</p>
                      <p className="text-white/40 text-xs">{ref.email}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications (Small Grid) */}
              <section>
                <h3 className="text-white font-display font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <Award size={18} className="text-[#a855f7]" /> Certifications
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                   {PORTFOLIO_DATA.certificates.map((cert, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                        <div className="w-10 h-10 flex-shrink-0 bg-[#a855f7]/10 rounded-lg flex items-center justify-center">
                          <Award size={18} className="text-[#a855f7]" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-[11px] leading-tight mb-1">{cert.title}</p>
                          <p className="text-white/40 text-[9px] uppercase tracking-tighter">{cert.issuer}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </section>
            </div>
          </div>
          
          {/* Footer of the CV */}
          <div className="p-10 text-center border-t border-white/5 bg-black/40">
             <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em]"> Resume &copy; 2026 • Md Rashidul Haq</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
