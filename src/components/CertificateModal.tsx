import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface CertificateModalItem {
  title: string;
  issuer: string;
  category?: string;
  year?: string;
  credentialId?: string;
  image: string;
  skills?: string[];
  description?: string;
}

interface CertificateModalProps {
  certificate: CertificateModalItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [certificate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return createPortal(
    <AnimatePresence>
      {certificate && (
        <div 
          id="certificate-fullscreen-modal-wrapper"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto"
          onClick={onClose}
        >
          {/* Ambient Glow in the Background */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-purple-600/15 to-cyan-500/20 blur-[130px] rounded-full pointer-events-none -z-10" />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[95vh] flex flex-col my-auto rounded-2xl sm:rounded-3xl bg-[#090d16]/95 border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.12)] backdrop-blur-3xl overflow-hidden"
          >
            {/* Minimal Sleek Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#060a12]/90 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wide flex items-center gap-1 shrink-0">
                  <Award size={12} className="text-amber-400" />
                  <span>{certificate.issuer}</span>
                  {certificate.year && <span className="text-white/40">• {certificate.year}</span>}
                </span>

                <h3 
                  id="certificate-modal-title" 
                  className="text-sm sm:text-base md:text-lg font-display font-bold text-white tracking-tight truncate"
                >
                  {certificate.title}
                </h3>
              </div>

              {/* Action Tools: Open Full + Close */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={certificate.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-semibold transition-all hover:border-amber-400/40 cursor-pointer"
                  title="Open original high-res image"
                >
                  <ExternalLink size={13} className="text-amber-400" />
                  <span>Open Full ↗</span>
                </a>

                <button
                  id="close-certificate-modal-btn"
                  onClick={onClose}
                  aria-label="Close certificate modal"
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Close (Press Escape)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* FULL EYE-CATCHING CERTIFICATE IMAGE DISPLAY */}
            <div className="relative p-2 sm:p-5 md:p-6 flex items-center justify-center bg-[#03060f]/90 overflow-hidden min-h-[50vh] max-h-[78vh]">
              {/* Subtle Ambient Frame Glow */}
              <div className="absolute inset-4 sm:inset-8 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-2xl pointer-events-none" />

              {/* Verified Ribbon Over Image */}
              <div className="absolute top-4 sm:top-7 right-4 sm:right-8 z-10 px-3 py-1 rounded-full bg-[#050813]/90 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Credential</span>
              </div>

              {/* The Certificate Image */}
              <img
                src={certificate.image}
                alt={certificate.title}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`relative z-0 max-h-[72vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(251,191,36,0.15)] transition-all duration-500 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-70 scale-98 blur-sm"
                }`}
              />
            </div>

            {/* Sleek Minimal Footer (No Text Clutter) */}
            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#060a12]/90 border-t border-white/10 flex items-center justify-between text-xs text-white/50 shrink-0">
              <div className="flex items-center gap-2">
                {certificate.credentialId && (
                  <span className="font-mono text-[11px] text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    ID: {certificate.credentialId}
                  </span>
                )}
                {certificate.category && (
                  <span className="hidden sm:inline-block text-white/40 text-[11px]">
                    • {certificate.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={certificate.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden text-amber-400 font-semibold text-[11px] flex items-center gap-1"
                >
                  <span>Open Full</span>
                  <ExternalLink size={11} />
                </a>
                <span className="font-mono text-[11px] text-white/40 hidden sm:inline-block">
                  Press ESC or click anywhere to close
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CertificateModal;
