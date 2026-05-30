"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import MagneticButton from "@/components/animations/MagneticButton";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface ReelVideo {
  id: string;
  src: string;       // Cloudinary URL or /public path like /Excavation-vid.mp4
  label: string;     // e.g. "Excavation Work"
  order?: number;    // for sorting
}

// ─────────────────────────────────────────────────────────────
// FALLBACK videos from your /public folder
// These show instantly before Firebase loads
// Add/remove based on what's in your /public folder
// ─────────────────────────────────────────────────────────────
const FALLBACK_VIDEOS: ReelVideo[] = [
  { id: "f1", src: "/Excavation-vid.mp4", label: "Excavation Work", order: 1 },
  { id: "f2", src: "/Excavation.mp4", label: "Site Excavation", order: 2 },
  { id: "f3", src: "/pipeline-video.mp4", label: "Pipeline Installation", order: 3 },
  { id: "f4", src: "/civil-work.mp4", label: "Civil Construction", order: 4 },
];

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "24/7", label: "Client Support" },
];

// ─────────────────────────────────────────────────────────────
// MOBILE REEL FEED
// ─────────────────────────────────────────────────────────────
function MobileReelFeed() {
  const [videos, setVideos] = useState<ReelVideo[]>(FALLBACK_VIDEOS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // ── Fetch videos from Firebase in real-time ──
  useEffect(() => {
    const q = query(collection(db, "reels"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const fetched: ReelVideo[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ReelVideo, "id">),
        }));
        setVideos(fetched);
      }
      // If Firestore empty → fallback videos stay
      setLoading(false);
    }, () => {
      // On error → keep fallback videos
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Play active video, pause others ──
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeIndex) {
        vid.play().catch(() => { });
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeIndex, videos]);

  // ── IntersectionObserver for snap-scroll detection ──
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveIndex(i);
          }
        },
        { threshold: 0.6 }
      );
      obs.observe(vid);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [videos]);

  return (
    <div
      className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollbarWidth: "none" }}
    >
      <style>{`div::-webkit-scrollbar{display:none}`}</style>

      {videos.map((reel, i) => (
        <div
          key={reel.id}
          className="relative w-full h-screen snap-start snap-always bg-black"
        >
          {/* Video */}
          <video
            ref={(el) => { videoRefs.current[i] = el; }}
            src={reel.src}
            muted={muted}
            loop
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-10 pb-3 z-10">
            <div>
              <p className="text-[10px] tracking-[3px] text-[#d89b1d] font-semibold uppercase">
                Deepak Construction
              </p>
              <p className="text-white/50 text-[11px] mt-0.5">Itarsi, Madhya Pradesh</p>
            </div>

            {/* Mute toggle */}
            <button
              onClick={() => setMuted((m) => !m)}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 19L19 20.27 20.27 19 5.27 3 4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>

          {/* Scroll dots — right side */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
            {videos.map((_, di) => (
              <div
                key={di}
                className="rounded-full transition-all duration-300"
                style={{
                  width: 3,
                  height: di === i ? 22 : 6,
                  background: di === i ? "#d89b1d" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 z-10">
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-white/40 text-[10px] tracking-[2px] uppercase mb-1">
                Our Services
              </p>
              <h2 className="text-white text-2xl font-black mb-3">{reel.label}</h2>

              {/* Stats */}
              <div className="flex gap-5 mb-5">
                {stats.map((s, si) => (
                  <div key={si}>
                    <p className="text-[#d89b1d] text-base font-black leading-none">{s.value}</p>
                    <p className="text-white/40 text-[9px] uppercase tracking-[1.5px] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex gap-3">
                <Link href="#projects" className="flex-1">
                  <button className="w-full bg-[#d89b1d] text-black text-sm font-black py-3 rounded-full shadow-[0_0_24px_rgba(216,155,29,0.4)]">
                    View Projects
                  </button>
                </Link>
                <Link href="#contact" className="flex-1">
                  <button className="w-full border border-white/20 bg-white/[0.08] backdrop-blur-md text-white text-sm font-semibold py-3 rounded-full">
                    Contact Us
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Swipe hint on first reel */}
          {i === 0 && (
            <motion.div
              className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.5, duration: 2, repeat: 2 }}
            >
              <svg width="20" height="20" fill="white" opacity="0.4" viewBox="0 0 24 24">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
              </svg>
              <p className="text-white/30 text-[10px] tracking-widest uppercase">Swipe up</p>
            </motion.div>
          )}

          {/* Loading shimmer on first load */}
          {loading && i === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <div className="w-8 h-8 border-2 border-[#d89b1d] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN HERO — Desktop unchanged, Mobile = Reel Feed
// ─────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <>
      {/* ══ MOBILE ONLY: Dynamic Reel Feed ══ */}
      <section className="block lg:hidden w-full h-screen overflow-hidden">
        <MobileReelFeed />
      </section>

      {/* ══ DESKTOP / TABLET: Original layout — 100% unchanged ══ */}
      <section className="hidden lg:block relative min-h-screen overflow-hidden bg-[#0b0b0b] text-white">
        <Image
          src="/img.png"
          alt="Deepak Construction Background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover brightness-[0.32]"
        />

        <div className="absolute inset-0 bg-[#0b0b0b]/70" />
        <div className="absolute top-[-20%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#d89b1d]/10 blur-[80px] rounded-full" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-10 sm:w-14 h-[2px] bg-[#d89b1d]" />
                <p className="uppercase tracking-[3px] sm:tracking-[5px] text-[#d89b1d] text-[10px] sm:text-sm font-semibold">
                  Infrastructure • Pipeline • Construction
                </p>
              </div>

              <h1 className="leading-[1.02] tracking-[-2px] sm:tracking-[-3px]">
                <span className="block text-[44px] sm:text-[58px] md:text-[72px] xl:text-[88px] font-black text-white">
                  Deepak
                </span>
                <span className="block text-[44px] sm:text-[58px] md:text-[72px] xl:text-[88px] font-black text-[#d89b1d]">
                  Construction
                </span>
              </h1>

              <p className="mt-6 sm:mt-8 text-[#e5e5e5] text-base sm:text-lg md:text-xl leading-8 sm:leading-9 max-w-3xl">
                Professional infrastructure development, industrial pipeline
                systems, excavation and civil construction engineered with modern
                technology, durable execution and experienced manpower.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10">
                <Link href="#projects" className="w-full sm:w-auto">
                  <MagneticButton className="w-full sm:w-auto bg-[#d89b1d] text-black px-8 sm:px-9 py-4 rounded-full font-black transition-all duration-300 shadow-[0_0_40px_rgba(216,155,29,0.35)]">
                    View Projects
                  </MagneticButton>
                </Link>
                <Link href="#contact" className="w-full sm:w-auto">
                  <MagneticButton className="w-full sm:w-auto border border-white/10 bg-white/[0.05] backdrop-blur-md text-white px-8 sm:px-9 py-4 rounded-full font-semibold hover:border-[#d89b1d] hover:text-[#d89b1d] transition-all duration-300">
                    Contact Us
                  </MagneticButton>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14 max-w-4xl">
                {stats.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="relative overflow-hidden border border-white/10 bg-white/[0.06] backdrop-blur-xl rounded-[24px] sm:rounded-[30px] p-5 sm:p-6 min-h-[130px] sm:min-h-[160px] transition-all duration-500 hover:border-[#d89b1d]/40"
                  >
                    <h3 className="text-4xl sm:text-5xl font-black text-[#d89b1d]">
                      {item.value}
                    </h3>
                    <p className="text-gray-300 mt-3 uppercase tracking-[2px] sm:tracking-[3px] text-[10px] sm:text-xs leading-5">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 45 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:flex justify-end relative"
            >
              <div className="relative w-[500px] xl:w-[540px] h-[620px] xl:h-[680px] rounded-[38px] overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                <Image
                  src="/img.png"
                  alt="Deepak Construction"
                  fill
                  priority
                  quality={80}
                  sizes="540px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#f5f3ee]/10 to-transparent" />
      </section>
    </>
  );
}