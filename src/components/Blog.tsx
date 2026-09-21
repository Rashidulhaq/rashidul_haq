import { motion } from "motion/react";
import { BookOpen, ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";
import React from "react";
import { BLOG_POSTS } from "../data/blogData";

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
          className="text-center mb-14"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
          >
            <BookOpen size={12} />
            <span>Thoughts & Writing</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              My <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent inline-block">Blog</span>
            </h2>
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full opacity-40 -z-10" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mx-auto mt-3 opacity-70" />
          </motion.div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-white/50 text-sm md:text-[15px] font-normal max-w-xl mx-auto mt-3 mb-8 tracking-wide"
          >
            Technical articles exploring deep learning research, software testing methodologies, and offline-first web architectures.
          </motion.p>
        </motion.div>

        {/* Live Articles Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {previewPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={onShowFullBlog}
              className="group flex flex-col h-full rounded-2xl overflow-hidden bg-[#090d18]/90 border border-white/[0.08] hover:border-cyan-400/40 shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden relative bg-[#050814]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent opacity-70" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#050814]/85 backdrop-blur-md border border-white/10 text-cyan-300 text-[10px] font-bold tracking-wider uppercase">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
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
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
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
