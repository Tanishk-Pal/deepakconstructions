"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import MagneticButton from "@/components/animations/MagneticButton";

interface ReelVideo {
  id: string;
  src: string;
  label: string;
  order?: number;
}

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

function AnimatedCompanyName() {
  const words = ["Deepak", "Construction"];

  return (
    <div className="flex items-center gap-2">
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.15 + index * 0.28,
            duration: 0.55,
            ease: "easeOut",
          }}
          className={`text-[18px] font-black tracking-[-0.8px] ${index === 0 ? "text-white" : "text-[#d89b1d]"
            }`}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

function MobileReelFeed() {
  const [videos, setVideos] = useState<ReelVideo[]>(FALLBACK_VIDEOS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const q = query(collection(db, "reels"), orderBy("order", "asc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        if (!snap.empty) {
          const fetched: ReelVideo[] = snap.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<ReelVideo, "id">),
          }));
          setVideos(fetched);
        }
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.play().catch(() => { });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, videos]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.65) {
            setActiveIndex(index);
          }
        },
        { threshold: [0.65] }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [videos]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#050505] text-white">
      {/* Fixed Top Brand */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto mt-3 flex h-14 max-w-[430px] items-center justify-between rounded-full border border-white/10 bg-black/45 px-4 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <div>
            <AnimatedCompanyName />
            <p className="mt-[-2px] text-[9px] uppercase tracking-[2px] text-white/45">
              Infrastructure • Pipeline • Civil Work
            </p>
          </div>

          <button
            onClick={() => setMuted((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              <svg width="17" height="17" fill="white" viewBox="0 0 24 24">
                <path d="M4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 19L19 20.27 20.27 19 5.27 3H4.27zM12 4 9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg width="17" height="17" fill="white" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Reel Scroll */}
      <div
        className="h-[100svh] w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth px-3 pt-20 pb-5"
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {videos.map((reel, index) => (
          <section
            key={reel.id}
            className="relative flex h-[100svh] snap-start snap-always items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0.7, scale: 0.96 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0.55,
                scale: activeIndex === index ? 1 : 0.94,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative h-[76svh] w-full max-w-[430px] overflow-hidden rounded-[34px] border border-white/10 bg-[#101010] shadow-[0_28px_70px_rgba(0,0,0,0.55)]"
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={reel.src}
                muted={muted}
                loop
                playsInline
                preload={index === 0 ? "auto" : "metadata"}
                className="absolute inset-0 h-full w-full object-cover"
                onClick={(e) => {
                  const video = e.currentTarget;
                  if (video.paused) video.play().catch(() => { });
                  else video.pause();
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/25" />

              {/* Reel Counter */}
              <div className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1.5">
                {videos.map((_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={`rounded-full transition-all duration-300 ${dotIndex === index
                        ? "h-6 w-1 bg-[#d89b1d]"
                        : "h-2 w-1 bg-white/30"
                      }`}
                  />
                ))}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                <motion.div
                  key={`${reel.id}-${activeIndex}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="mb-1 text-[10px] uppercase tracking-[2.5px] text-[#d89b1d]">
                    Our Work
                  </p>

                  <h2 className="max-w-[260px] text-3xl font-black leading-[1.05] tracking-[-1px] text-white">
                    {reel.label}
                  </h2>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md"
                      >
                        <p className="text-lg font-black leading-none text-[#d89b1d]">
                          {item.value}
                        </p>
                        <p className="mt-1 text-[8px] uppercase leading-3 tracking-[1px] text-white/45">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Link href="#projects" className="flex-1">
                      <button className="w-full rounded-full bg-[#d89b1d] py-3 text-sm font-black text-black shadow-[0_0_25px_rgba(216,155,29,0.35)]">
                        Projects
                      </button>
                    </Link>

                    <Link href="#contact" className="flex-1">
                      <button className="w-full rounded-full border border-white/15 bg-white/10 py-3 text-sm font-bold text-white backdrop-blur-md">
                        Contact
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {index === 0 && (
                <motion.div
                  className="absolute bottom-36 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1.2, duration: 2, repeat: 2 }}
                >
                  <svg width="20" height="20" fill="white" opacity="0.45" viewBox="0 0 24 24">
                    <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                  </svg>
                  <p className="text-[10px] uppercase tracking-[2px] text-white/40">
                    Swipe up
                  </p>
                </motion.div>
              )}

              {loading && index === 0 && (
                <div className="absolute inset-0 z-30 grid place-items-center bg-black/70">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d89b1d] border-t-transparent" />
                </div>
              )}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      {/* MOBILE ONLY */}
      <section className="block lg:hidden h-[100svh] w-full overflow-hidden">
        <MobileReelFeed />
      </section>

      {/* DESKTOP / TABLET UNCHANGED */}
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