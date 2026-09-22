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

const SOCIAL_STYLES: Record<string, { bg: string, text: string, border: string, hoverBg: string, glow: string }> = {
  LinkedIn: { 
    bg: "bg-[#0077b5]/10", 
    text: "text-[#0077b5]", 
    border: "border-[#0077b5]/25 hover:border-[#0077b5]/60",
    hoverBg: "hover:bg-[#0077b5]/20",
    glow: "rgba(0,119,181,0.3)"
  },
  Instagram: { 
    bg: "bg-[#e1306c]/10", 
    text: "text-[#e1306c]", 
    border: "border-[#e1306c]/25 hover:border-[#e1306c]/60",
    hoverBg: "hover:bg-[#e1306c]/20",
    glow: "rgba(225,48,108,0.3)"
  },
  Facebook: { 
    bg: "bg-[#1877f2]/10", 
    text: "text-[#1877f2]", 
    border: "border-[#1877f2]/25 hover:border-[#1877f2]/60",
    hoverBg: "hover:bg-[#1877f2]/20",
    glow: "rgba(24,119,242,0.3)"
  },
  GitHub: { 
    bg: "bg-white/10", 
    text: "text-white", 
    border: "border-white/20 hover:border-white/50",
    hoverBg: "hover:bg-white/20",
    glow: "rgba(255,255,255,0.25)"
  },
  Youtube: { 
    bg: "bg-[#ff0000]/10", 
    text: "text-[#ff0000]", 
    border: "border-[#ff0000]/25 hover:border-[#ff0000]/60",
    hoverBg: "hover:bg-[#ff0000]/20",
    glow: "rgba(255,0,0,0.3)"
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
      isPinned: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${commentName}&backgroundColor=c0aede`
    };

    setAllComments([newComment, ...allComments]);
    setCommentName("");
    setCommentText("");
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050811]/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/10 blur-[160px] rounded-full pointer-events-none translate-x-1/2" />

      {/* Grid Pattern Background */}
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
          className="text-center mb-14"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.12)]"
          >
            <Send size={13} className="text-cyan-400" />
            <span>Get In Touch • Let's Connect</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Contact <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">Me</span>
            </h2>
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full opacity-35 -z-10" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 rounded-full mx-auto mt-3.5 opacity-80" />
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-slate-400 text-sm md:text-[15px] font-normal max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Have a project in mind, opportunities to discuss, or just want to say hello? I'd love to hear from you.
          </motion.p>
        </motion.div>

        {/* Quick Contact Info Cards (3D Tilt, Spring Entrance, Ambient Shimmer) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10"
        >
          {/* Email Quick Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25, scale: 0.95 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                transition: { type: "spring", stiffness: 140, damping: 14 } 
              }
            }}
            whileHover={{ 
              y: -5, 
              scale: 1.015,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
            }}
            className="relative group p-4.5 rounded-2xl bg-[#090e1c]/80 border border-white/10 backdrop-blur-xl hover:border-cyan-400/50 transition-all duration-300 shadow-lg overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            {/* Corner Glow */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-xl bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Mail size={15} />
                </div>
                <span className="text-xs font-semibold text-white/70">Email Address</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] font-medium text-white/70 hover:text-white transition-all cursor-pointer hover:scale-105"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <a 
              href={`mailto:${PORTFOLIO_DATA.profile.email}`} 
              className="text-sm font-medium text-white hover:text-cyan-300 transition-colors truncate block relative z-10"
            >
              {PORTFOLIO_DATA.profile.email}
            </a>
          </motion.div>

          {/* WhatsApp / Phone Quick Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25, scale: 0.95 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                transition: { type: "spring", stiffness: 140, damping: 14, delay: 0.08 } 
              }
            }}
            whileHover={{ 
              y: -5, 
              scale: 1.015,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
            }}
            className="relative group p-4.5 rounded-2xl bg-[#090e1c]/80 border border-white/10 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 shadow-lg overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            {/* Corner Glow */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-xl bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone size={15} />
                </div>
                <span className="text-xs font-semibold text-white/70">Phone & WhatsApp</span>
              </div>
              <a
                href={`https://wa.me/8801912196464`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-medium hover:bg-emerald-500/25 transition-all cursor-pointer hover:scale-105"
              >
                <MessageCircle size={11} />
                <span>Chat</span>
              </a>
            </div>
            <a 
              href="tel:+8801912196464" 
              className="text-sm font-medium text-white hover:text-emerald-400 transition-colors block relative z-10"
            >
              {PORTFOLIO_DATA.profile.phone}
            </a>
          </motion.div>

          {/* Location & Status Quick Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25, scale: 0.95 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                transition: { type: "spring", stiffness: 140, damping: 14, delay: 0.16 } 
              }
            }}
            whileHover={{ 
              y: -5, 
              scale: 1.015,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
            }}
            className="relative group p-4.5 rounded-2xl bg-[#090e1c]/80 border border-white/10 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 shadow-lg overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            {/* Corner Glow */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-xl bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <MapPin size={15} />
                </div>
                <span className="text-xs font-semibold text-white/70">Location</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </div>
            </div>
            <p className="text-sm font-medium text-white truncate relative z-10">
              {PORTFOLIO_DATA.profile.address}
            </p>
          </motion.div>
        </motion.div>

        {/* Main Grid: Send Message (Left) + Visitor Comments (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Direct Message Form & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 130, damping: 15 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Contact Form Card */}
            <div className="relative rounded-2xl md:rounded-3xl p-6 md:p-7 bg-[#090e1c]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden group hover:border-cyan-400/40 transition-all duration-300">
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Corner Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 opacity-80" />
              
              <div className="flex items-center justify-between mb-2 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Send Message</h3>
                    <p className="text-white/40 text-xs">Direct to my inbox or WhatsApp</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitContact} className="space-y-4 mt-5 relative z-10">
                <div className="relative group/input">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/input:text-cyan-400 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none transition-all placeholder:text-white/25"
                  />
                </div>

                <div className="relative group/input">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/input:text-cyan-400 transition-colors" size={16} />
                  <input 
                    type="email" 
                    placeholder="Your Email (Optional)"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none transition-all placeholder:text-white/25"
                  />
                </div>

                <div className="relative group/input">
                  <MessageSquare className="absolute left-3.5 top-3.5 text-white/30 group-focus-within/input:text-cyan-400 transition-colors" size={16} />
                  <textarea 
                    rows={4}
                    placeholder="Your Message..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none transition-all placeholder:text-white/25 resize-none"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all border border-white/10 group/btn cursor-pointer"
                >
                  <Send size={15} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  <span>Send via WhatsApp</span>
                </motion.button>
              </form>

              {/* Social Channels Integrated in Left Card */}
              <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">Or Connect Online</p>
                <div className="flex flex-wrap items-center gap-2">
                  {PORTFOLIO_DATA.socials.map((social, i) => {
                    const Icon = ICON_MAP[social.icon as keyof typeof ICON_MAP] || Github;
                    const style = SOCIAL_STYLES[social.platform] || { 
                      bg: "bg-white/5", 
                      text: "text-white/60", 
                      border: "border-white/10 hover:border-white/20", 
                      hoverBg: "hover:bg-white/10",
                      glow: "rgba(255,255,255,0.2)"
                    };

                    return (
                      <motion.a 
                        key={i}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${style.bg} ${style.border} ${style.hoverBg} text-white/80 hover:text-white shadow-sm`}
                      >
                        <Icon size={13} className={style.text} />
                        <span>{social.platform}</span>
                        <ExternalLink size={10} className="text-white/30" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visitor Guestbook & Comments */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 130, damping: 15 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl md:rounded-3xl p-6 md:p-7 bg-[#090e1c]/90 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Corner Glow */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-80" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
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
              <form onSubmit={handlePostComment} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 mb-5 space-y-2.5 relative z-10">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-1/2 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-purple-400/60 focus:bg-white/[0.05] focus:outline-none placeholder:text-white/20 transition-all"
                  />
                  <input 
                    type="text" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a thought or note..."
                    required
                    className="w-1/2 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-purple-400/60 focus:bg-white/[0.05] focus:outline-none placeholder:text-white/20 transition-all"
                  />
                </div>
                <div className="flex justify-end">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-lg hover:opacity-95 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
                  >
                    <Send size={11} />
                    <span>Post Thought</span>
                  </motion.button>
                </div>
              </form>

              {/* Comments Feed with balanced scroll height */}
              <div className="overflow-y-auto max-h-[360px] pr-1.5 space-y-3 custom-scrollbar relative z-10">
                <AnimatePresence mode="popLayout">
                  {allComments.map((item, i) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18, delay: i * 0.04 }}
                      whileHover={{ scale: 1.015, x: 2 }}
                      className={`p-3.5 rounded-xl border transition-all ${
                        item.isAdmin 
                          ? 'bg-indigo-600/10 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/15'
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
                                <span className="px-1.5 py-0.2 bg-cyan-500/20 border border-cyan-400/30 text-[9px] font-bold uppercase rounded text-cyan-300">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
