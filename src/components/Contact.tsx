import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Mail, 
  Send, 
  User, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Github, 
  Facebook, 
  Pin, 
  Copy, 
  Check, 
  Phone, 
  MapPin, 
  Sparkles, 
  ExternalLink,
  MessageCircle
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";

const ICON_MAP = {
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Facebook,
};

const SOCIAL_STYLES: Record<string, { bg: string, text: string, border: string, hoverBg: string }> = {
  LinkedIn: { 
    bg: "bg-[#0077b5]/10", 
    text: "text-[#0077b5]", 
    border: "border-[#0077b5]/20 hover:border-[#0077b5]/50",
    hoverBg: "hover:bg-[#0077b5]/15"
  },
  Instagram: { 
    bg: "bg-[#e1306c]/10", 
    text: "text-[#e1306c]", 
    border: "border-[#e1306c]/20 hover:border-[#e1306c]/50",
    hoverBg: "hover:bg-[#e1306c]/15"
  },
  Facebook: { 
    bg: "bg-[#1877f2]/10", 
    text: "text-[#1877f2]", 
    border: "border-[#1877f2]/20 hover:border-[#1877f2]/50",
    hoverBg: "hover:bg-[#1877f2]/15"
  },
  GitHub: { 
    bg: "bg-white/10", 
    text: "text-white", 
    border: "border-white/20 hover:border-white/40",
    hoverBg: "hover:bg-white/15"
  },
  Youtube: { 
    bg: "bg-[#ff0000]/10", 
    text: "text-[#ff0000]", 
    border: "border-[#ff0000]/20 hover:border-[#ff0000]/50",
    hoverBg: "hover:bg-[#ff0000]/15"
  },
};

export default function Contact() {
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [allComments, setAllComments] = useState(() => {
    const saved = localStorage.getItem("portfolio_comments_v2");
    if (saved) return JSON.parse(saved);
    return [
      { 
        id: 1, 
        user: "Rashidul Haq", 
        handle: "@rashidul_", 
        date: "Feb 24, 2026", 
        text: "Thank you for visiting! If you have any questions, feel free to contact me.", 
        isAdmin: true, 
        isPinned: true,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rashidul&backgroundColor=b6e3f4" 
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("portfolio_comments_v2", JSON.stringify(allComments));
  }, [allComments]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) {
      alert("Please enter your name and message.");
      return;
    }

    const whatsappNumber = "8801912196464";
    const message = `*Portfolio Contact Request*%0A%0A*Name:* ${contactName}%0A*Email:* ${contactEmail || 'Not provided'}%0A*Message:* ${contactMessage}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, "_blank");
    
    // Clear form
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const handlePostComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: commentName,
      handle: commentName.toLowerCase().replace(/\s+/g, ''),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: commentText,
      isAdmin: false,
      isPinned: false
    };

    setAllComments([newComment, ...allComments]);
    setCommentName("");
    setCommentText("");
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="layout-container relative z-10">
        {/* Header */}
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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-[11px] font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
          >
            <Send size={12} />
            <span>Let's Connect</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Contact <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent inline-block">Me</span>
            </h2>
            <div className="absolute -inset-4 bg-brand/20 blur-2xl rounded-full opacity-40 -z-10" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#ec4899] rounded-full mx-auto mt-3 opacity-70" />
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-white/50 text-sm md:text-[15px] font-normal max-w-xl mx-auto mt-3 tracking-wide"
          >
            Have a project in mind or want to say hello? I'd love to hear from you.
          </motion.p>
        </motion.div>

        {/* Quick Contact Info Cards (Eye-Catching & Compact) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10"
        >
          {/* Email Quick Card */}
          <div className="relative group p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-brand/40 transition-all duration-300">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                  <Mail size={15} />
                </div>
                <span className="text-xs font-semibold text-white/70">Email Address</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] font-medium text-white/70 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <a 
              href={`mailto:${PORTFOLIO_DATA.profile.email}`} 
              className="text-sm font-medium text-white hover:text-brand-light transition-colors truncate block"
            >
              {PORTFOLIO_DATA.profile.email}
            </a>
          </div>

          {/* WhatsApp / Phone Quick Card */}
          <div className="relative group p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <Phone size={15} />
                </div>
                <span className="text-xs font-semibold text-white/70">Phone & WhatsApp</span>
              </div>
              <a
                href={`https://wa.me/8801912196464`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-medium hover:bg-emerald-500/25 transition-colors"
              >
                <MessageCircle size={11} />
                <span>Chat</span>
              </a>
            </div>
            <a 
              href="tel:+8801912196464" 
              className="text-sm font-medium text-white hover:text-emerald-400 transition-colors block"
            >
              {PORTFOLIO_DATA.profile.phone}
            </a>
          </div>

          {/* Location & Status Quick Card */}
          <div className="relative group p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
                  <MapPin size={15} />
                </div>
                <span className="text-xs font-semibold text-white/70">Location</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </div>
            </div>
            <p className="text-sm font-medium text-white truncate">
              {PORTFOLIO_DATA.profile.address}
            </p>
          </div>
        </motion.div>

        {/* Main Grid: Send Message (Left) + Visitor Comments (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Direct Message Form & Socials */}
          <div className="lg:col-span-6 space-y-6">
            {/* Contact Form Card */}
            <div className="relative rounded-2xl md:rounded-3xl p-6 md:p-7 bg-white/[0.025] border border-white/10 backdrop-blur-xl shadow-xl overflow-hidden group">
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand via-purple-500 to-pink-500 opacity-70" />
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand-light">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Send Message</h3>
                    <p className="text-white/40 text-xs">Direct to my inbox or WhatsApp</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitContact} className="space-y-4 mt-5">
                <div className="relative group/input">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 group-focus-within/input:text-brand-light transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-brand-light/50 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="relative group/input">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 group-focus-within/input:text-brand-light transition-colors" size={16} />
                  <input 
                    type="email" 
                    placeholder="Your Email (Optional)"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-brand-light/50 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="relative group/input">
                  <MessageSquare className="absolute left-3.5 top-3.5 text-white/25 group-focus-within/input:text-brand-light transition-colors" size={16} />
                  <textarea 
                    rows={4}
                    placeholder="Your Message..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-brand-light/50 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 via-brand to-purple-600 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all border border-white/10 group/btn"
                >
                  <Send size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>Send via WhatsApp</span>
                </motion.button>
              </form>

              {/* Social Channels Integrated in Left Card */}
              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">Or Connect Online</p>
                <div className="flex flex-wrap items-center gap-2">
                  {PORTFOLIO_DATA.socials.map((social, i) => {
                    const Icon = ICON_MAP[social.icon as keyof typeof ICON_MAP] || Github;
                    const style = SOCIAL_STYLES[social.platform] || { 
                      bg: "bg-white/5", 
                      text: "text-white/60", 
                      border: "border-white/10 hover:border-white/20", 
                      hoverBg: "hover:bg-white/10" 
                    };

                    return (
                      <a 
                        key={i}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${style.bg} ${style.border} ${style.hoverBg} text-white/80 hover:text-white`}
                      >
                        <Icon size={13} className={style.text} />
                        <span>{social.platform}</span>
                        <ExternalLink size={10} className="text-white/30" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visitor Guestbook & Comments */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl md:rounded-3xl p-6 md:p-7 bg-white/[0.025] border border-white/10 backdrop-blur-xl shadow-xl flex flex-col overflow-hidden">
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-70" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Community Thoughts</h3>
                    <p className="text-white/40 text-xs">Share your thoughts or feedback</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-white/60">
                  {allComments.length} {allComments.length === 1 ? "note" : "notes"}
                </span>
              </div>

              {/* Compact Comment Input Form */}
              <form onSubmit={handlePostComment} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 mb-5 space-y-2.5">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-1/2 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-brand-light/50 focus:outline-none placeholder:text-white/20"
                  />
                  <input 
                    type="text" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a thought or note..."
                    required
                    className="w-1/2 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-brand-light/50 focus:outline-none placeholder:text-white/20"
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-lg hover:opacity-95 transition-opacity"
                  >
                    <Send size={11} />
                    <span>Post Thought</span>
                  </button>
                </div>
              </form>

              {/* Comments Feed with balanced scroll height */}
              <div className="overflow-y-auto max-h-[360px] pr-1.5 space-y-3 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {allComments.map((item, i) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className={`p-3.5 rounded-xl border transition-all ${
                        item.isAdmin 
                          ? 'bg-indigo-600/10 border-indigo-500/30' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/10 shrink-0">
                            <img 
                              src={item.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.handle || item.user}`} 
                              alt={item.user} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-white font-semibold text-xs">{item.user}</span>
                              {item.isAdmin && (
                                <span className="px-1.5 py-0.2 bg-brand/30 border border-brand/40 text-[9px] font-bold uppercase rounded text-brand-light">
                                  Admin
                                </span>
                              )}
                            </div>
                            <span className="text-white/30 text-[10px]">{item.date}</span>
                          </div>
                        </div>

                        {item.isPinned && (
                          <div className="flex items-center gap-1 text-indigo-400 text-[10px] font-medium bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                            <Pin size={10} className="rotate-45" />
                            <span>Pinned</span>
                          </div>
                        )}
                      </div>
                      <p className="text-white/70 text-xs leading-relaxed pl-10">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Subtle Orbs */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -z-10" />
    </section>
  );
}
