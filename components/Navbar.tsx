"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, Shield, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolledPastReels, setScrolledPastReels] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastReels(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-[#0c1017]/95 backdrop-blur-2xl border-b border-amber-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-all duration-300 ${
        !scrolledPastReels ? "max-lg:-translate-y-full max-lg:opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between">

        {/* LOGO & BRAND */}
        <Link href="/" onClick={closeMenu} className="group flex flex-col">
          <div className="flex items-center gap-2">
            <span className="h-7 w-2 bg-[#f59e0b] rounded-sm transform -skew-x-12" />
            <h1 className="text-lg sm:text-2xl font-black tracking-wider text-white">
              DEEPAK <span className="text-[#f59e0b]">CONSTRUCTION</span>
            </h1>
          </div>
          <span className="text-[10px] text-amber-200/70 font-medium tracking-[2.5px] uppercase pl-4">
            पक्का निर्माण • पक्का भरोसा
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/90">
          <a
            href="#services"
            className="hover:text-[#f59e0b] transition flex items-center gap-1.5"
          >
            <span>सेवाएं</span>
            <span className="text-xs text-white/40 font-normal">(Services)</span>
          </a>
          <a
            href="#projects"
            className="hover:text-[#f59e0b] transition flex items-center gap-1.5"
          >
            <span>प्रोजेक्ट्स</span>
            <span className="text-xs text-white/40 font-normal">(Projects)</span>
          </a>
          <a
            href="#contact"
            className="hover:text-[#f59e0b] transition flex items-center gap-1.5"
          >
            <span>संपर्क</span>
            <span className="text-xs text-white/40 font-normal">(Contact)</span>
          </a>
        </div>

        {/* ACTION BUTTONS */}
        <div className="hidden sm:flex items-center gap-3">
          {/* WHATSAPP */}
          <a
            href="https://wa.me/916260879372?text=नमस्ते%20Deepak%20Construction,%20मुझे%20प्रोजेक्ट%20के%20बारे%20में%20बात%20करनी%20है"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-3.5 lg:px-4 py-2 rounded-full font-bold text-xs lg:text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.35)]"
          >
            <MessageCircle size={16} />
            <span className="hidden lg:inline">व्हाट्सएप</span>
            <span className="lg:hidden">Chat</span>
          </a>

          {/* CALL NOW */}
          <a
            href="tel:+916260879372"
            className="flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black px-4 lg:px-5 py-2 rounded-full font-black text-xs lg:text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
          >
            <PhoneCall size={16} />
            <span>कॉल करें</span>
          </a>

          {/* ADMIN LOGIN */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 border border-white/15 bg-white/5 text-white/80 px-3.5 py-2 rounded-full font-semibold text-xs hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all duration-300"
          >
            <Shield size={14} />
            <span className="hidden xl:inline">एडमिन</span>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:+916260879372"
            className="flex items-center gap-1.5 bg-[#f59e0b] text-black px-3 py-1.5 rounded-full font-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.35)]"
          >
            <PhoneCall size={14} />
            कॉल
          </a>

          <a
            href="https://wa.me/916260879372?text=नमस्ते%20Deepak%20Construction,%20मुझे%20प्रोजेक्ट%20के%20बारे%20में%20बात%20करनी%20है"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#25D366] text-white p-2 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.35)]"
            aria-label="WhatsApp"
          >
            <MessageCircle size={15} />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="text-white border border-white/15 p-2 rounded-xl bg-white/[0.05]"
            aria-label="Toggle Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE POPUP MENU */}
      {open && (
        <div className="md:hidden bg-[#0c1017]/98 border-t border-amber-500/20 px-6 py-6 space-y-4 text-white shadow-2xl backdrop-blur-2xl">
          <a
            onClick={closeMenu}
            href="#services"
            className="flex items-center justify-between py-2 text-white/90 border-b border-white/5 font-semibold"
          >
            <span>हमारी सेवाएं (Services)</span>
            <span className="text-[#f59e0b] text-xs">→</span>
          </a>
          <a
            onClick={closeMenu}
            href="#projects"
            className="flex items-center justify-between py-2 text-white/90 border-b border-white/5 font-semibold"
          >
            <span>प्रोजेक्ट्स (Projects)</span>
            <span className="text-[#f59e0b] text-xs">→</span>
          </a>
          <a
            onClick={closeMenu}
            href="#contact"
            className="flex items-center justify-between py-2 text-white/90 border-b border-white/5 font-semibold"
          >
            <span>संपर्क करें (Contact Us)</span>
            <span className="text-[#f59e0b] text-xs">→</span>
          </a>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <a
              href="tel:+916260879372"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-[#f59e0b] text-black px-4 py-3 rounded-full font-black text-sm shadow-lg"
            >
              <PhoneCall size={16} />
              कॉल करें
            </a>

            <a
              href="https://wa.me/916260879372?text=नमस्ते%20Deepak%20Construction,%20मुझे%20प्रोजेक्ट%20के%20बारे%20में%20बात%20करनी%20है"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full font-bold text-sm shadow-lg"
            >
              <MessageCircle size={16} />
              व्हाट्सएप
            </a>
          </div>

          <Link
            href="/login"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-white/70 px-5 py-2.5 rounded-full text-xs font-semibold"
          >
            <Shield size={14} />
            एडमिन पोर्टल (Admin Login)
          </Link>
        </div>
      )}
    </nav>
  );
}