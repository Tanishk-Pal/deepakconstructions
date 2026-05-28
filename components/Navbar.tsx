"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, Shield } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">

        <Link href="/" onClick={closeMenu} className="group">
          <h1 className="text-base sm:text-2xl font-black tracking-wide text-white">
            PIPELINE <span className="text-[#d89b1d]">INFRA</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="#services" className="hover:text-[#d89b1d] transition">
            Services
          </a>
          <a href="#projects" className="hover:text-[#d89b1d] transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-[#d89b1d] transition">
            Contact
          </a>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+916260879372"
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 lg:px-5 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          >
            <PhoneCall size={17} />
            <span className="hidden lg:inline">Call Now</span>
            <span className="lg:hidden">Call</span>
          </a>

          <Link
            href="/login"
            className="flex items-center gap-2 bg-[#d89b1d] text-black px-4 lg:px-5 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(216,155,29,0.25)]"
          >
            <Shield size={17} />
            <span className="hidden lg:inline">Admin Login</span>
            <span className="lg:hidden">Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:+916260879372"
            className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-2 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)]"
          >
            <PhoneCall size={16} />
            Call
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="text-white border border-white/10 p-2 rounded-xl bg-white/[0.04]"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-6 space-y-5 text-white shadow-2xl">
          <a onClick={closeMenu} href="#services" className="block text-white/80">
            Services
          </a>
          <a onClick={closeMenu} href="#projects" className="block text-white/80">
            Projects
          </a>
          <a onClick={closeMenu} href="#contact" className="block text-white/80">
            Contact
          </a>

          <a
            href="tel:+916260879372"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-full font-bold"
          >
            <PhoneCall size={18} />
            Call Now
          </a>

          <Link
            href="/login"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 bg-[#d89b1d] text-black px-5 py-3 rounded-full font-bold"
          >
            <Shield size={18} />
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  );
}