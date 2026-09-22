import { motion, useInView, animate } from "motion/react";
import { BookOpen, ArrowRight, Sparkles, Clock, Calendar, Eye, Bookmark, FileText } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { BLOG_POSTS } from "../data/blogData";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  
  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    } else {
      setCount(0);
    }
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Blog({ onShowFullBlog }: { onShowFullBlog?: () => void }) {
  // Show top 3 preview posts
  const previewPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[#070b14]/40">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none translate-x-1/2" />

      <div className="layout-container relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-center mb-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.12)]"
          >
            <BookOpen size={13} className="text-cyan-400" />
            <span>Thoughts & Writing • Tech Articles</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              My <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Blog</span>
            </h2>
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full opacity-35 -z-10" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 rounded-full mx-auto mt-3.5 opacity-80" />
          </motion.div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-slate-400 text-sm md:text-[15px] font-normal max-w-2xl mx-auto mt-4 mb-4 leading-relaxed"
          >
            Technical articles exploring deep learning research, software testing methodologies, and offline-first web architectures.
          </motion.p>
        </motion.div>

        {/* Live Metrics Row with Spring & Tilt */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-14"
        >
          {[
            {
              label: "Curated Articles",
              value: BLOG_POSTS.length,
              suffix: " Posts",
              sub: "QA, AI & Architecture",
              icon: FileText,
              color: "from-cyan-400 to-cyan-600",
              glow: "rgba(6,182,212,0.3)"
            },
            {
              label: "Research Highlights",
              value: 2,
              suffix: " In-Depth",
              sub: "Deep Learning & Vision",
              icon: Sparkles,
              color: "from-indigo-400 to-purple-600",
              glow: "rgba(99,102,241,0.3)"
            },
            {
              label: "Knowledge Density",
              value: 30,
              suffix: "+ Min",
              sub: "Hands-on Practical Guides",
              icon: Clock,
              color: "from-amber-400 to-rose-500",
              glow: "rgba(245,158,11,0.3)"
            }
          ].map((item, i) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  transition: { type: "spring", stiffness: 140, damping: 14, delay: i * 0.08 }
                }
              }}
              whileHover={{ 
                y: -5, 
                scale: 1.015,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
              }}
              className="p-3.5 sm:p-4 rounded-2xl bg-[#090e1c]/80 border border-white/[0.08] hover:border-cyan-400/40 backdrop-blur-xl flex items-center gap-3 shadow-lg relative overflow-hidden group transition-all duration-300"
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Corner Glow */}
              <div 
                className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: item.glow }}
              />

              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform`}>
                <item.icon size={18} />
              </div>
              <div className="relative z-10 min-w-0">
                <p className="text-white font-extrabold text-sm sm:text-base leading-tight">
                  <Counter value={item.value} suffix={item.suffix} />
                </p>
                <p className="text-slate-400 text-[11px] truncate">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Articles Preview Grid with 3D Tilt and Spring */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {previewPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ 
                type: "spring", 
                stiffness: 140, 
                damping: 14, 
                delay: index * 0.1 
              }}
              whileHover={{ 
                y: -7, 
                scale: 1.015,
                transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } 
              }}
              onClick={onShowFullBlog}
              className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-[#090d18]/90 border border-white/[0.08] hover:border-cyan-400/50 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.2)] backdrop-blur-xl transition-all duration-300 cursor-pointer"
            >
              {/* Light sweep shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

              {/* Corner Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Image Preview with Zoom */}
              <div className="aspect-[16/10] overflow-hidden relative bg-[#050814]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent opacity-80" />

                {/* Hover Read Badge - Crystal Clear, Sharp & Attractive */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/75 via-black/20 to-black/30 z-10 pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.65)] transform scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-auto">
                    <Eye size={14} strokeWidth={2.5} />
                    <span>Read Full Post</span>
                  </span>
                </div>

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#050814]/85 backdrop-blur-md border border-white/10 text-cyan-300 text-[10px] font-bold tracking-wider uppercase z-10">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow relative z-10">
                <div className="flex items-center justify-between text-slate-400 text-[11px] mb-2.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-cyan-400" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="text-cyan-400" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2 mb-2.5">
                  {post.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow">
                  {post.description}
                </p>

                {/* Read Article Link */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    By {post.author.split(" ")[0]}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={onShowFullBlog}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 rounded-xl text-white font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all cursor-pointer group"
          >
            <BookOpen size={15} />
            <span>Explore All {BLOG_POSTS.length} Articles</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
