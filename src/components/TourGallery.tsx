import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { 
  Camera, 
  MapPin, 
  Compass, 
  Sparkles, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Heart, 
  Eye, 
  Mountain, 
  Waves, 
  Landmark, 
  TreePine, 
  Quote,
  Check
} from "lucide-react";
import { PORTFOLIO_DATA } from "../constants";

interface DestinationMeta {
  key: string;
  name: string;
  region: string;
  category: "Nature & Hills" | "Beaches & Coast" | "Heritage & Roots" | "Social Impact";
  highlight: string;
  tagline: string;
  icon: any;
  featured?: boolean;
}

const DESTINATIONS: DestinationMeta[] = [
  {
    key: "Priofull",
    name: "Priofull Foundation",
    region: "Dhaka",
    category: "Social Impact",
    highlight: "1 Year Volunteer Teacher",
    tagline: "Dedicated 1 year to teaching underprivileged slum children, nurturing curiosity and basic digital literacy.",
    icon: Heart,
    featured: true
  },
  {
    key: "Rangamati",
    name: "Rangamati Hill Tracts",
    region: "Chittagong Division",
    category: "Nature & Hills",
    highlight: "Kaptai Lake & Hanging Bridge",
    tagline: "Exploring the serene green valleys, misty tribal trails, and mesmerizing expanse of Kaptai Lake.",
    icon: Mountain
  },
  {
    key: "Bandarban",
    name: "Bandarban Peaks",
    region: "Chittagong Division",
    category: "Nature & Hills",
    highlight: "Cloud Trails & Mountain Ridges",
    tagline: "Trekking through breathtaking cloud peaks, mountain streams, and the majestic highlands of Bangladesh.",
    icon: Mountain
  },
  {
    key: "Saint Martin",
    name: "Saint Martin’s Island",
    region: "Bay of Bengal",
    category: "Beaches & Coast",
    highlight: "Coral Paradise & Azure Water",
    tagline: "The only coral sanctuary of Bangladesh, surrounded by crystalline waters and tranquil coconut shores.",
    icon: Waves
  },
  {
    key: "Cox’s Bazar",
    name: "Cox’s Bazar",
    region: "Chittagong Division",
    category: "Beaches & Coast",
    highlight: "World's Longest Sea Beach",
    tagline: "Walking along 120 kilometers of golden sands, watching twilight reflections over crashing ocean waves.",
    icon: Waves
  },
  {
    key: "Sundarbans",
    name: "Sundarbans Mangrove",
    region: "Khulna Division",
    category: "Nature & Hills",
    highlight: "UNESCO World Heritage Site",
    tagline: "A silent boat voyage through the world's largest mangrove forest and home of the Royal Bengal Tiger.",
    icon: TreePine
  },
  {
    key: "Kuakata",
    name: "Kuakata Shoreline",
    region: "Patuakhali Division",
    category: "Beaches & Coast",
    highlight: "Sunrise & Sunset Panorama",
    tagline: "Witnessing the rare, poetic spectacle of both sunrise and sunset emerging from the very same horizon.",
    icon: Waves
  },
  {
    key: "Dhaka",
    name: "Dhaka Capital",
    region: "Central Division",
    category: "Heritage & Roots",
    highlight: "Historic Heritage & Tech Life",
    tagline: "Capturing the energetic rhythm, architectural landmarks, and vibrant engineering community of the city.",
    icon: Landmark
  },
  {
    key: "My village",
    name: "Afra (My Village)",
    region: "Roots & Heritage",
    category: "Heritage & Roots",
    highlight: "Roots & Peaceful Greenery",
    tagline: "Cherished moments reconnecting with childhood simplicity, rural tranquility, and lush green countryside.",
    icon: Landmark
  }
];

export default function TourGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Lightbox state
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxMeta, setLightboxMeta] = useState<DestinationMeta | null>(null);

  const filterCategories = [
    { id: "All", label: "All Stories" },
    { id: "Social Impact", label: "♥ Social Impact" },
    { id: "Nature & Hills", label: "Nature & Hills" },
    { id: "Beaches & Coast", label: "Beaches & Coast" },
    { id: "Heritage & Roots", label: "Heritage & Roots" }
  ];

  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
      }
    }
    return url;
  };

  // Filtered destinations list
  const filteredDestinations = useMemo(() => {
    if (activeCategory === "All") return DESTINATIONS;
    return DESTINATIONS.filter(d => d.category === activeCategory);
  }, [activeCategory]);

  // Current active destination when a folder is selected
  const activeDestinationMeta = useMemo(() => {
    if (!selectedFolder) return null;
    return DESTINATIONS.find(d => d.key === selectedFolder) || null;
  }, [selectedFolder]);

  const activeFolderImages = useMemo(() => {
    if (!selectedFolder) return [];
    return PORTFOLIO_DATA.gallery[selectedFolder as keyof typeof PORTFOLIO_DATA.gallery] || [];
  }, [selectedFolder]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => 
          prev !== null ? (prev + 1) % lightboxImages.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => 
          prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, lightboxImages]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImageIndex]);

  const openLightbox = (images: string[], index: number, meta: DestinationMeta) => {
    setLightboxImages(images);
    setSelectedImageIndex(index);
    setLightboxMeta(meta);
  };

  const handleDestinationClick = (dest: DestinationMeta) => {
    const images = PORTFOLIO_DATA.gallery[dest.key as keyof typeof PORTFOLIO_DATA.gallery] || [];
    if (images.length === 1) {
      openLightbox(images, 0, dest);
    } else {
      setSelectedFolder(dest.key);
    }
  };

  return (
    <section id="tour" className="py-24 relative overflow-hidden bg-[#070b14]/50">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-cyan-600/10 blur-[150px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-indigo-600/10 blur-[150px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-amber-500/5 blur-[160px] rounded-full -z-10 pointer-events-none" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px' 
        }} 
      />

      <div className="layout-container relative z-10">
        {/* Section Header */}
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
            <Compass size={13} className="text-cyan-400 animate-spin-slow" />
            <span>Perspectives & Journey • Beyond Code</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Life Beyond <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent inline-block">The Screen</span>
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
            When I&apos;m not writing code, I explore natural wonders, document cultural perspectives, and contribute back to underprivileged communities through volunteer education.
          </motion.p>
        </motion.div>

        {/* ========================================================= */}
        {/* INTERACTIVE TRAVEL & IMPACT HIGHLIGHT CHIPS                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#090e1c]/80 border border-white/[0.08] backdrop-blur-xl flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-white font-extrabold text-sm sm:text-base leading-tight">9 Destinations</p>
              <p className="text-slate-400 text-[11px]">Across Bangladesh</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#090e1c]/80 border border-amber-500/30 backdrop-blur-xl flex items-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.08)]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Heart size={18} className="fill-amber-400/20" />
            </div>
            <div>
              <p className="text-amber-300 font-extrabold text-sm sm:text-base leading-tight">1 Year Volunteer</p>
              <p className="text-slate-400 text-[11px]">Priofull Slum School</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#090e1c]/80 border border-white/[0.08] backdrop-blur-xl flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Mountain size={18} />
            </div>
            <div>
              <p className="text-white font-extrabold text-sm sm:text-base leading-tight">Peaks to Coasts</p>
              <p className="text-slate-400 text-[11px]">Hills, Coral & Mangroves</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#090e1c]/80 border border-white/[0.08] backdrop-blur-xl flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Camera size={18} />
            </div>
            <div>
              <p className="text-white font-extrabold text-sm sm:text-base leading-tight">Visual Journal</p>
              <p className="text-slate-400 text-[11px]">Moments & Stories</p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE DESTINATION ROUTE BAR                         */}
        {/* ========================================================= */}
        <div className="w-full max-w-5xl mx-auto mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#080d1a]/90 backdrop-blur-2xl border border-white/[0.08] min-w-full justify-start md:justify-center">
            {filterCategories.map((cat) => {
              const isSelected = activeCategory === cat.id && selectedFolder === null;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedFolder(null);
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? cat.id === "Social Impact"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                        : "bg-cyan-950/70 text-cyan-200 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* FOLDER VIEW: INSIDE A SPECIFIC DESTINATION ALBUM          */}
        {/* ========================================================= */}
        <AnimatePresence mode="wait">
          {selectedFolder && activeDestinationMeta ? (
            <motion.div
              key={`folder-${selectedFolder}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Folder Breadcrumb & Context Header */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#090e1c]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedFolder(null)}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer group"
                    >
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      <span>← Back to All Destinations</span>
                    </button>

                    <div className="flex items-center gap-3 pt-1">
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                        {activeDestinationMeta.name}
                      </h3>
                      {activeDestinationMeta.featured && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                          <Heart size={12} className="fill-amber-400" />
                          <span>Social Impact</span>
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                      {activeDestinationMeta.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-cyan-300 text-xs font-mono">
                      {activeFolderImages.length} Photographs
                    </span>
                  </div>
                </div>
              </div>

              {/* Photo Grid of this specific folder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {activeFolderImages.map((imgUrl, idx) => (
                  <motion.div
                    key={`${selectedFolder}-${idx}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    whileHover={{ y: -6 }}
                    onClick={() => openLightbox(activeFolderImages, idx, activeDestinationMeta)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#050814] border border-white/[0.08] hover:border-cyan-400/50 shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.2)] cursor-pointer backdrop-blur-md"
                  >
                    <img
                      src={getImageUrl(imgUrl)}
                      alt={`${activeDestinationMeta.name} moment ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Hover Eye Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                        <Eye size={20} />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
                      <span className="font-semibold text-white/90 drop-shadow">
                        Photo {idx + 1} of {activeFolderImages.length}
                      </span>
                      <span className="text-[10px] text-cyan-300 uppercase tracking-widest font-mono bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                        Expand
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ========================================================= */
            /* ALL DESTINATIONS GRID (Editorial Album Cards)             */
            /* ========================================================= */
            <motion.div
              key="destinations-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredDestinations.map((dest, index) => {
                const images = PORTFOLIO_DATA.gallery[dest.key as keyof typeof PORTFOLIO_DATA.gallery] || [];
                const coverImage = images[0] || "";
                const isPriofull = dest.key === "Priofull";

                return (
                  <motion.article
                    key={dest.key}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ y: -7 }}
                    onClick={() => handleDestinationClick(dest)}
                    className={`group relative flex flex-col h-full rounded-3xl overflow-hidden bg-[#090d18]/90 backdrop-blur-2xl border transition-all duration-500 cursor-pointer shadow-xl ${
                      isPriofull
                        ? "border-amber-500/40 hover:border-amber-400 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.3)]"
                        : "border-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.18)]"
                    }`}
                  >
                    {/* Top Image Preview with Ken Burns Hover */}
                    <div className="aspect-[16/10] overflow-hidden relative bg-[#040812]">
                      <img
                        src={getImageUrl(coverImage)}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent opacity-75" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        {isPriofull ? (
                          <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[11px] font-extrabold tracking-wide uppercase shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center gap-1.5">
                            <Heart size={12} className="fill-slate-950" />
                            <span>Social Impact</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-[#050814]/85 backdrop-blur-md border border-white/10 text-cyan-300 text-[10.5px] font-bold tracking-wider uppercase">
                            {dest.category}
                          </span>
                        )}

                        <span className="px-2.5 py-1 rounded-full bg-[#050814]/80 backdrop-blur-md border border-white/10 text-slate-300 text-[10.5px] font-mono flex items-center gap-1">
                          <Camera size={11} className="text-cyan-400" />
                          <span>{images.length} {images.length === 1 ? "Photo" : "Photos"}</span>
                        </span>
                      </div>

                      {/* Region Tag */}
                      <div className="absolute bottom-3 left-4 text-xs font-semibold text-slate-300 flex items-center gap-1.5 drop-shadow">
                        <MapPin size={13} className={isPriofull ? "text-amber-400" : "text-cyan-400"} />
                        <span>{dest.region}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className={`text-lg sm:text-xl font-display font-extrabold transition-colors leading-tight ${
                          isPriofull 
                            ? "text-white group-hover:text-amber-300" 
                            : "text-white group-hover:text-cyan-300"
                        }`}>
                          {dest.name}
                        </h3>

                        <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed line-clamp-3">
                          {dest.tagline}
                        </p>
                      </div>

                      {/* Bottom Footer Action */}
                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between mt-auto">
                        <span className="text-[11px] font-mono text-slate-400">
                          {dest.highlight}
                        </span>

                        <span className={`text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-all ${
                          isPriofull ? "text-amber-400" : "text-cyan-400"
                        }`}>
                          <span>View Album</span>
                          <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* SOCIAL IMPACT SPOTLIGHT BANNER (PRIOFULL MENTORSHIP)      */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950/20 via-[#0a0f1d] to-cyan-950/20 border border-amber-500/30 backdrop-blur-xl relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.1)]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
                <Heart size={13} className="fill-amber-400" />
                <span>Mentorship & Empathy in Tech</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                Giving Back: Teaching Underprivileged Children at Priofull
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Software engineering is not solely about algorithms and system design—it is fundamentally about solving human problems. Volunteering for a full year as a teacher for slum children reinforced my belief that empathy, clear communication, and patience are the ultimate hallmarks of engineering leadership.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => setSelectedFolder("Priofull")}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer hover:scale-105"
              >
                View Priofull Album
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* ULTRA-MODERN LIGHTBOX MODAL VIA PORTAL                    */}
      {/* ========================================================= */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedImageIndex !== null && lightboxImages.length > 0 && lightboxMeta && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black/95 backdrop-blur-2xl p-4 sm:p-6 select-none"
              onClick={() => setSelectedImageIndex(null)}
            >
              {/* Lightbox Ambient Glow */}
              <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/15 blur-[160px] rounded-full pointer-events-none -z-10" />

              {/* TOP BAR */}
              <div 
                className="w-full max-w-5xl flex items-center justify-between gap-4 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/15 border border-white/10 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft size={15} />
                  <span>Back</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-white font-extrabold text-xs sm:text-sm leading-tight">
                      {lightboxMeta.name}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Photo {selectedImageIndex + 1} of {lightboxImages.length}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedImageIndex(null)}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* MAIN IMAGE DISPLAY AREA */}
              <div 
                className="relative w-full max-w-5xl flex-grow flex items-center justify-center my-3"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left Arrow */}
                {lightboxImages.length > 1 && (
                  <button
                    onClick={() => setSelectedImageIndex((prev) => 
                      prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null
                    )}
                    className="absolute left-1 sm:left-4 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white/80 hover:text-white transition-all backdrop-blur-md shadow-2xl cursor-pointer hover:scale-110"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* The Image */}
                <div className="max-w-full max-h-[70vh] rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.15)] border border-white/10 bg-[#060a14]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImageIndex}
                      src={getImageUrl(lightboxImages[selectedImageIndex])}
                      alt={lightboxMeta.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="max-w-full max-h-[70vh] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>

                {/* Right Arrow */}
                {lightboxImages.length > 1 && (
                  <button
                    onClick={() => setSelectedImageIndex((prev) => 
                      prev !== null ? (prev + 1) % lightboxImages.length : null
                    )}
                    className="absolute right-1 sm:right-4 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white/80 hover:text-white transition-all backdrop-blur-md shadow-2xl cursor-pointer hover:scale-110"
                    aria-label="Next Photo"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>

              {/* BOTTOM THUMBNAIL STRIP & CAPTION */}
              <div 
                className="w-full max-w-4xl flex flex-col items-center gap-3 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Micro-story caption */}
                <p className="text-slate-300 text-xs sm:text-[13px] text-center max-w-2xl px-4 line-clamp-2">
                  &ldquo;{lightboxMeta.tagline}&rdquo;
                </p>

                {/* Thumbnail Strip */}
                {lightboxImages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md max-w-full">
                    {lightboxImages.map((thumbUrl, tIdx) => {
                      const isActive = selectedImageIndex === tIdx;
                      return (
                        <button
                          key={tIdx}
                          onClick={() => setSelectedImageIndex(tIdx)}
                          className={`w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                            isActive
                              ? "border-cyan-400 ring-2 ring-cyan-400/50 scale-105"
                              : "border-white/10 opacity-50 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={getImageUrl(thumbUrl)}
                            alt={`Thumb ${tIdx + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Keyboard Shortcuts Hint */}
                <div className="text-[10px] text-slate-500 font-mono tracking-wider">
                  Browse with ← → arrows • Press ESC to close
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
