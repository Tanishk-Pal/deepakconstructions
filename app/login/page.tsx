"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(
        error.code === "auth/invalid-credential"
          ? "गलत ईमेल या पासवर्ड। कृपया दोबारा जांचें।"
          : error.message || "लॉगिन विफल रहा।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1017] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-slate-800/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 bg-slate-900/90 backdrop-blur-2xl border border-amber-500/20 p-8 sm:p-10 rounded-[32px] w-full max-w-md shadow-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-white transition mb-6"
        >
          <ArrowLeft size={16} />
          <span>मुख्य पृष्ठ पर लौटें (Back Home)</span>
        </Link>

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-2">
          <span className="h-6 w-2 bg-[#f59e0b] rounded-sm transform -skew-x-12" />
          <h2 className="text-xl font-black tracking-wider text-white">
            DEEPAK <span className="text-[#f59e0b]">CONSTRUCTION</span>
          </h2>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mt-4">
          एडमिन पोर्टल (Admin Login)
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm mt-1 mb-8">
          प्रोजेक्ट व मीडिया प्रबंधन के लिए सुरक्षित लॉगिन।
        </p>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-6">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              ईमेल (Email Address)
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                required
                placeholder="admin@deepakconstruction.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-800/80 text-white text-sm outline-none border border-white/10 focus:border-[#f59e0b] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              पासवर्ड (Password)
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-800/80 text-white text-sm outline-none border border-white/10 focus:border-[#f59e0b] transition"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-black py-4 rounded-2xl text-sm sm:text-base hover:scale-[1.02] transition duration-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2"
            >
              <Shield size={18} />
              <span>{loading ? "लॉगिन हो रहा है..." : "डैशबोर्ड में प्रवेश करें"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
