"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, Film } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // On mobile show only when scrolled past reels, on desktop show always
      if (window.innerWidth >= 1024) {
        setVisible(true);
      } else {
        setVisible(window.scrollY > 250);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Floating Contact Bar" className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col gap-2.5 items-end transition-opacity duration-300">
      {/* JUMP TO REELS BUTTON ON MOBILE */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="lg:hidden flex items-center gap-1.5 bg-[#0c1017]/95 border border-amber-500/30 text-amber-300 px-3 py-2 rounded-full shadow-lg text-xs font-bold active:scale-95 transition"
        aria-label="Back to Reels"
      >
        <Film size={14} className="text-[#f59e0b]" />
        <span>रील्स देखें</span>
      </button>

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/916260879372?text=नमस्ते%20Deepak%20Construction,%20मुझे%20प्रोजेक्ट%20के%20बारे%20में%20जानकारी%20चाहिए"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white pl-3.5 pr-4 py-3 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="WhatsApp Us"
      >
        <MessageCircle size={22} className="shrink-0" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          व्हाट्सएप चैट
        </span>
      </a>

      {/* CALL FLOATING BUTTON */}
      <a
        href="tel:+916260879372"
        className="group flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black pl-3.5 pr-4 py-3 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Call Deepak Construction"
      >
        <Phone size={20} className="shrink-0" />
        <span className="hidden sm:inline text-xs font-black tracking-wide">
          कॉल करें
        </span>
      </a>
    </aside>
  );
}
