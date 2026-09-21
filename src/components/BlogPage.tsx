import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  X, 
  Clock, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Linkedin,
  Terminal,
  Cpu,
  ShieldCheck,
  Code2
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "../data/blogData";
import BlogReaderModal from "./BlogReaderModal";

interface BlogPageProps {
  onBack: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    { id: "All", label: "All Topics" },
    { id: "AI & Machine Learning", label: "AI & ML" },
    { id: "Software Testing & QA", label: "Software Testing / QA" },
    { id: "Web Development & PWA", label: "Web Dev & PWA" },
    { id: "Competitive Programming", label: "Competitive Coding" }
  ];

  const getCategoryCount = (catId: string) => {
    if (catId === "All") return BLOG_POSTS.length;
    return BLOG_POSTS.filter(post => post.category === catId).length;
  };

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      // Category filter
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = post.title.toLowerCase().includes(q);
      const descMatch = post.description.toLowerCase().includes(q);
      const catMatch = post.category.toLowerCase().includes(q);
      const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(q));

      return titleMatch || descMatch || catMatch || tagMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured post (first item marked featured)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-screen bg-[#070b14] py-16 md:py-20 px-4 sm:px-6 relative overflow-x-hidden text-white"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '36px 36px' 
        }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation Bar / Top Bar */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/[0.08]">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1.5 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-xs">Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
              <BookOpen size={13} />
              <span>{BLOG_POSTS.length} Technical Articles</span>
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Sparkles size={13} className="animate-pulse" />
            <span>Engineering Insights & Writing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mb-4 leading-tight">
            My <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Blog</span> & Notes
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Deep dives into deep learning research, software quality engineering, offline-first web systems, and competitive algorithmic challenges.
          </p>
        </div>

        {/* SPOTLIGHT / FEATURED ARTICLE HERO CARD */}
        {featuredPost && !searchQuery.trim() && selectedCategory === "All" && (
          <div className="mb-14">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 px-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Featured Spotlight Story</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              onClick={() => setActivePost(featuredPost)}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1324] via-[#090d18] to-[#0d1020] border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(6,182,212,0.15)] backdrop-blur-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 md:p-10 items-center">
                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold tracking-wide">
                        {featuredPost.category}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <Clock size={12} className="text-cyan-400" />
                        {featuredPost.readTime}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <Calendar size={12} className="text-cyan-400" />
                        {featuredPost.date}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {featuredPost.description}
                    </p>
                  </div>

                  {/* Tags & Action Button */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5">
                      {featuredPost.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-300 text-[10px] font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                      <span>Read Full Story</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 bg-[#070b16]">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#050814]/90 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-[11px] font-semibold flex items-center gap-1.5 shadow-lg">
                    <Sparkles size={11} />
                    <span>Thesis Research</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================= */}
        {/* EYE-CATCHING CATEGORY FILTER PILLS & GLOWING SEARCH BAR   */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center gap-5 mb-12 w-full max-w-4xl mx-auto px-1">
          {/* Capsule Pills */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1.5 scrollbar-hide flex justify-start sm:justify-center">
            <div className="inline-flex items-center p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#070e1d]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.06)] gap-1 sm:gap-2">
              {categories.map((cat) => {
                const count = getCategoryCount(cat.id);
                const isSelected = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "border border-cyan-400 bg-cyan-950/60 text-white shadow-[0_0_18px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/50"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-bold transition-all ${
                        isSelected
                          ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                          : "bg-white/[0.08] text-slate-400 group-hover:text-slate-200 group-hover:bg-white/[0.12]"
                      }`}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Glowing Search Bar */}
          <div className="w-full max-w-xl mx-auto relative group">
            <div className="relative flex items-center w-full rounded-2xl sm:rounded-full bg-[#050914]/90 backdrop-blur-xl border border-cyan-500/50 hover:border-cyan-400 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-500/30 shadow-[0_0_22px_rgba(6,182,212,0.22)] focus-within:shadow-[0_0_32px_rgba(6,182,212,0.45)] transition-all duration-300 px-4 py-2.5 sm:py-3">
              <Search size={17} className="text-cyan-400 shrink-0 mr-3 group-focus-within:animate-pulse" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, tag, or topic (e.g., Deep Learning, QA, PWA)..."
                className="w-full bg-transparent text-white placeholder:text-slate-500 text-xs sm:text-sm font-normal focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Live Counter */}
            {searchQuery.trim() && (
              <div className="flex items-center justify-between text-[11px] text-cyan-300/90 px-3 pt-2">
                <span>
                  Found <strong className="text-white font-semibold">{filteredPosts.length}</strong> matching article{filteredPosts.length !== 1 ? "s" : ""}
                </span>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ARTICLES GRID OR EMPTY STATE */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center max-w-md mx-auto p-8 rounded-2xl bg-[#080d1a]/80 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Articles Found</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              We couldn&apos;t find any articles matching &quot;{searchQuery}&quot; under the selected category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Search & Filters</span>
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setActivePost(post)}
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

                  {/* Category Pill */}
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

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 text-[10px] font-mono border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

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
        )}

        {/* BOTTOM CONNECT & COLLABORATE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/30 via-[#0a0f1d] to-indigo-950/30 border border-white/10 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                Have a topic or project in mind?
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                I regularly write about software engineering architectures, deep learning discoveries, and quality assurance workflows. Let&apos;s connect on LinkedIn to share ideas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a 
                href="https://www.linkedin.com/in/rashidulhaq/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all cursor-pointer"
              >
                <Linkedin size={15} />
                <span>Connect on LinkedIn</span>
              </a>

              <button
                onClick={onBack}
                className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
              >
                Explore Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reader Modal */}
      <BlogReaderModal 
        post={activePost}
        onClose={() => setActivePost(null)}
      />
    </motion.div>
  );
};

export default BlogPage;
