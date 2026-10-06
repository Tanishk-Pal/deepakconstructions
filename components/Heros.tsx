"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/animations/MagneticButton";
import {
  PhoneCall,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ReelVideo {
  id: string;
  src: string;
  poster?: string;
  category: string;
  label: string;
  description: string;
  location?: string;
  likes?: string;
  order?: number;
}

const COMPANY_PHONE = "+91 6260879372";

const FALLBACK_VIDEOS: ReelVideo[] = [
  {
    id: "f1",
    src: "/Excavation-vid.mp4",
    poster: "/excavation.png",
    category: "🚜 हैवी एक्सकेवेशन",
    label: "Excavation Work (गहरी नींव व ट्रेंच)",
    description:
      "आधुनिक भारी JCB व पोकलेन मशीनों द्वारा पाइपलाइन ट्रेंचिंग, बेसमेंट खुदाई और साइट समतलीकरण का तीव्र व सुरक्षित कार्य।",
    location: "होशंगाबाद / इटारसी, म.प्र.",
    likes: "1.4k",
    order: 1,
  },
  {
    id: "f2",
    src: "/pipeline-video.mp4",
    poster: "/pipeline.png",
    category: "💧 वाटर पाइपलाइन नेटवर्क",
    label: "Water Pipeline (पेयजल आपूर्ति लाइन)",
    description:
      "अंडरग्राउंड व इंडस्ट्रियल पेयजल पाइपलाइन इंस्टॉलेशन, सटीक अलाइनमेंट, हाई-प्रेशर जॉइंटिंग और हाइड्रोलिक टेस्टिंग।",
    location: "नर्मदा-मालवा रीजन, म.प्र.",
    likes: "1.1k",
    order: 2,
  },
  {
    id: "f3",
    src: "/Excavation.mp4",
    poster: "/excavation.png",
    category: "🏗️ साइट लेवलिंग व अर्थवर्क",
    label: "Site Leveling (समतलीकरण कार्य)",
    description:
      "भूमि की सटीक कटाई, मिट्टी हटाना और बड़े इंफ्रास्ट्रक्चर प्रोजेक्ट्स के लिए मजबूत लेवलिंग व रॉक ब्रेकिंग।",
    location: "मंडीदीप इंडस्ट्रियल बेल्ट, म.प्र.",
    likes: "1.8k",
    order: 3,
  },
  {
    id: "f4",
    src: "/civil-work.mp4",
    poster: "/civil.png",
    category: "🏢 सिविल व आरसीसी निर्माण",
    label: "Civil Construction (फाउंडेशन व स्ट्रक्चर)",
    description:
      "मजबूत कंक्रीट फाउंडेशन, हेवी पिलर, इंडस्ट्रियल शेड, बाउंड्री वॉल और कमर्शियल स्ट्रक्चर का समयबद्ध निर्माण।",
    location: "भोपाल-इटारसी हाईवे, म.प्र.",
    likes: "2.3k",
    order: 4,
  },
];

const stats = [
  { value: "50+", label: "सफल प्रोजेक्ट्स (Projects)" },
  { value: "10+", label: "वर्षों का अनुभव (Experience)" },
  { value: "100%", label: "समय पर डिलीवरी (On-Time)" },
  { value: "24/7", label: "साइट सपोर्ट (Support)" },
];

/**
 * INSTAGRAM REELS COMPONENT FOR MOBILE
 */
function MobileInstagramReels() {
  const [videos, setVideos] = useState<ReelVideo[]>(FALLBACK_VIDEOS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<number>(0);

  // Fetch dynamic reels from Firestore if available
  useEffect(() => {
    try {
      const q = query(collection(db, "reels"), orderBy("order", "asc"));
      const unsub = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const dbReels: ReelVideo[] = snap.docs.map((d, i) => {
              const data = d.data();
              return {
                id: d.id,
                src: data.src,
                poster: data.poster || "/img.png",
                category: data.category || "🚜 साइट इंफ्रास्ट्रक्चर",
                label: data.label || `Project Reel #${i + 1}`,
                description:
                  data.description ||
                  "Deepak Construction साइट वर्क - गुणवत्ता व समयबद्ध कार्य।",
                location: data.location || "मध्य प्रदेश, भारत",
                likes: `${(1.2 + i * 0.3).toFixed(1)}k`,
              };
            });
            setVideos(dbReels);
          }
        },
        (err) => {
          console.log("Firestore reels error, fallback used", err);
        }
      );
      return () => unsub();
    } catch {
      // Fallback
    }
  }, []);

  // Handle active video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.muted = isMuted;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Auto-play was prevented (often happens if not muted)
              video.muted = true;
              setIsMuted(true);
              video.play().catch(() => {});
            });
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
    setProgress(0);
    setExpandedDesc(false);
  }, [activeIndex, isMuted, videos]);

  // Intersection observer for snap scroll detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveIndex(index);
          }
        },
        { threshold: [0.6] }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [videos]);

  // Video progress updater
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.duration) {
      setProgress((v.currentTime / v.duration) * 100);
    }
  };

  // Tap or Double Tap
  const handleVideoTap = () => {
    const now = Date.now();
    const activeReel = videos[activeIndex];

    if (now - lastTapRef.current < 280) {
      // DOUBLE TAP: Trigger Instagram Heart Like
      if (activeReel) {
        setLikedReels((prev) => ({ ...prev, [activeReel.id]: true }));
        setShowHeartBurst(true);
        setTimeout(() => setShowHeartBurst(false), 800);
      }
    } else {
      // SINGLE TAP: Toggle Play/Pause
      const video = videoRefs.current[activeIndex];
      if (video) {
        if (video.paused) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
        setShowPlayIcon(true);
        setTimeout(() => setShowPlayIcon(false), 600);
      }
    }
    lastTapRef.current = now;
  };

  // Toggle Mute / Unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    const video = videoRefs.current[activeIndex];
    if (video) {
      video.muted = newMuted;
    }
  };

  // Share Reel
  const handleShare = async (e: React.MouseEvent, reel: ReelVideo) => {
    e.stopPropagation();
    const shareData = {
      title: `Deepak Construction - ${reel.label}`,
      text: `देखिए Deepak Construction का प्रोजेक्ट: ${reel.label}\nकॉल करें: ${COMPANY_PHONE}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      const text = encodeURIComponent(
        `Deepak Construction प्रोजेक्ट वीडियो (${reel.label}): ${window.location.href}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  // Scroll Down to Main Profile / Website
  const scrollToWebsite = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeReel = videos[activeIndex] || videos[0];

  return (
    <div
      ref={containerRef}
      className="relative h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll bg-black text-white"
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* TOP FLOATING INSTAGRAM BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-[max(env(safe-area-inset-top),12px)] pb-3 pointer-events-none">
        <div className="flex items-center justify-between">
          {/* BRAND BADGE */}
          <div className="pointer-events-auto flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xs font-black tracking-wide text-white flex items-center gap-1">
              <span>DEEPAK</span>
              <span className="text-[#f59e0b]">CONSTRUCTION</span>
              <CheckCircle2 size={13} className="text-sky-400 fill-sky-400/20 ml-0.5" />
            </h1>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* SOUND MUTE / UNMUTE BUTTON */}
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs font-bold text-white active:scale-95 transition"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <>
                  <VolumeX size={15} className="text-amber-400" />
                  <span className="text-[11px] text-amber-200">आवाज़ बंद</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} className="text-emerald-400" />
                  <span className="text-[11px] text-emerald-200">चालू</span>
                </>
              )}
            </button>

            {/* EXPLORE WEBSITE BUTTON */}
            <button
              onClick={scrollToWebsite}
              className="flex items-center gap-1 bg-[#f59e0b] text-black font-black px-3 py-1.5 rounded-full text-[11px] shadow-lg active:scale-95 transition"
            >
              <span>वेबसाइट</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* REELS VERTICAL FEED */}
      {videos.map((reel, index) => {
        const isCurrent = activeIndex === index;
        const isLiked = likedReels[reel.id];

        return (
          <section
            key={reel.id}
            className="relative h-[100dvh] w-full snap-start snap-always overflow-hidden bg-black flex items-center justify-center select-none"
            onClick={handleVideoTap}
          >
            {/* FULL BLEED VIDEO */}
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={reel.src}
              poster={reel.poster}
              muted={isMuted}
              loop
              playsInline
              onTimeUpdate={isCurrent ? handleTimeUpdate : undefined}
              preload={index === 0 ? "auto" : index === 1 ? "metadata" : "none"}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* TOP & BOTTOM GRADIENTS FOR HIGH CONTRAST READABILITY */}
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

            {/* CENTER PLAY / PAUSE POPUP ANIMATION */}
            <AnimatePresence>
              {showPlayIcon && isCurrent && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  exit={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute z-30 w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20"
                >
                  {isPlaying ? (
                    <Play size={28} className="text-white fill-white ml-1" />
                  ) : (
                    <Pause size={28} className="text-white fill-white" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* INSTAGRAM DOUBLE-TAP HEART BURST */}
            <AnimatePresence>
              {showHeartBurst && isCurrent && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1.4, opacity: 1, rotate: 0 }}
                  exit={{ scale: 1.8, opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="pointer-events-none absolute z-30 flex flex-col items-center"
                >
                  <Heart size={90} className="text-rose-500 fill-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.8)]" />
                  <span className="text-white text-xs font-bold mt-1 bg-black/60 px-2 py-0.5 rounded-full">
                    पसंद आया! (Liked)
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* RIGHT SIDE INSTAGRAM ACTION COLUMN */}
            <div
              className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CALL BUTTON (Amber Glow) */}
              <a
                href={`tel:${COMPANY_PHONE}`}
                className="group flex flex-col items-center gap-1 active:scale-90 transition"
                aria-label="Call Now"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#fbbf24] text-black font-black grid place-items-center shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                  <PhoneCall size={22} />
                </div>
                <span className="text-[10px] font-black text-amber-300 drop-shadow">
                  कॉल करें
                </span>
              </a>

              {/* WHATSAPP BUTTON */}
              <a
                href={`https://wa.me/916260879372?text=${encodeURIComponent(
                  `नमस्ते Deepak Construction, मुझे आपके इस प्रोजेक्ट के बारे में जानकारी चाहिए: ${reel.label}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1 active:scale-90 transition"
                aria-label="WhatsApp Us"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] text-white grid place-items-center shadow-[0_0_20px_rgba(37,211,102,0.4)]">
                  <MessageCircle size={24} />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow">
                  व्हाट्सएप
                </span>
              </a>

              {/* LIKE BUTTON (Instagram Heart) */}
              <button
                onClick={() => {
                  setLikedReels((prev) => ({
                    ...prev,
                    [reel.id]: !prev[reel.id],
                  }));
                }}
                className="group flex flex-col items-center gap-1 active:scale-90 transition"
                aria-label="Like reel"
              >
                <div className={`w-11 h-11 rounded-full backdrop-blur-md border border-white/20 grid place-items-center ${
                  isLiked ? "bg-rose-500/20 border-rose-500" : "bg-black/50"
                }`}>
                  <Heart
                    size={22}
                    className={isLiked ? "text-rose-500 fill-rose-500" : "text-white"}
                  />
                </div>
                <span className="text-[10px] font-semibold text-white/90 drop-shadow">
                  {isLiked ? "Liked" : reel.likes || "1.2k"}
                </span>
              </button>

              {/* SHARE BUTTON */}
              <button
                onClick={(e) => handleShare(e, reel)}
                className="group flex flex-col items-center gap-1 active:scale-90 transition"
                aria-label="Share reel"
              >
                <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white grid place-items-center">
                  <Share2 size={20} />
                </div>
                <span className="text-[10px] font-semibold text-white/90 drop-shadow">
                  शेयर
                </span>
              </button>

              {/* SCROLL TO WEBSITE DOWN BUTTON */}
              <button
                onClick={scrollToWebsite}
                className="group flex flex-col items-center gap-1 active:scale-90 transition mt-1"
                aria-label="Scroll down to site"
              >
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-amber-300 grid place-items-center">
                  <ArrowDown size={16} />
                </div>
                <span className="text-[9px] font-bold text-amber-200 drop-shadow">
                  प्रोफाइल
                </span>
              </button>
            </div>

            {/* BOTTOM CAPTION & METADATA (Instagram Style) */}
            <div
              className="absolute left-0 right-16 bottom-6 z-30 px-4 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CREATOR PROFILE ROW */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#d97706] p-[2px] shadow-lg">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs">
                    🚜
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-white tracking-wide">
                      deepak_construction
                    </span>
                    <CheckCircle2 size={14} className="text-sky-400 fill-sky-400/20" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-amber-300 font-semibold">
                    <span className="flex items-center gap-0.5">
                      <MapPin size={10} />
                      {reel.location || "इटारसी, म.प्र."}
                    </span>
                    <span>• 10+ वर्ष अनुभव</span>
                  </div>
                </div>
              </div>

              {/* CATEGORY PILL */}
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/25 border border-amber-500/40 text-amber-300 text-[11px] font-bold mb-1.5">
                {reel.category}
              </div>

              {/* REEL TITLE */}
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow-md">
                {reel.label}
              </h2>

              {/* HINDI DESCRIPTION WITH EXPAND */}
              <p className={`text-xs text-white/80 leading-5 mt-1 drop-shadow ${
                expandedDesc ? "" : "line-clamp-2"
              }`}>
                {reel.description}
              </p>
              {reel.description.length > 70 && (
                <button
                  onClick={() => setExpandedDesc(!expandedDesc)}
                  className="text-[11px] font-bold text-amber-300 mt-0.5 underline block"
                >
                  {expandedDesc ? "कम पढ़ें (Show less)" : "और पढ़ें (More)"}
                </button>
              )}

              {/* BIG CALL TO ACTION BAR */}
              <div className="mt-3.5 flex items-center gap-2">
                <a
                  href={`tel:${COMPANY_PHONE}`}
                  className="flex-1 bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#d97706] text-black font-black py-2.5 px-4 rounded-full text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-1.5 active:scale-95 transition"
                >
                  <PhoneCall size={14} />
                  <span>प्रोजेक्ट कोटेशन के लिए कॉल करें</span>
                </a>
              </div>

              {/* SWIPE UP NOTICE */}
              {index < videos.length - 1 && (
                <div className="mt-2 text-center text-[10px] text-white/50 animate-bounce flex items-center justify-center gap-1">
                  <span>अगला प्रोजेक्ट देखने के लिए ऊपर स्वाइप करें</span>
                  <span>👆</span>
                </div>
              )}
            </div>

            {/* VIDEO PROGRESS BAR (INSTAGRAM REEL STYLE) */}
            {isCurrent && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-40">
                <div
                  className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/**
 * EXPORT MAIN HERO COMPONENT
 * (Mobile: Instagram Reels, Desktop: Premium Corporate Showcase)
 */
export default function Hero() {
  return (
    <>
      {/* MOBILE / TABLET INSTAGRAM REELS (Screens < 1024px) */}
      <section className="block lg:hidden h-[100dvh] w-full overflow-hidden bg-black">
        <MobileInstagramReels />
      </section>

      {/* DESKTOP / LAPTOP CORPORATE HERO (Screens >= 1024px) */}
      <section className="hidden lg:block relative min-h-screen overflow-hidden bg-[#0a0f16] text-white">
        <Image
          src="/img.png"
          alt="Deepak Construction Infrastructure Background"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover brightness-[0.28]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16]/95 via-[#0a0f16]/80 to-[#0a0f16]/60" />
        <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-[#f59e0b]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center pt-28 pb-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7"
            >
              {/* TOP BADGE */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                <p className="tracking-wider text-[#f59e0b] text-xs font-bold uppercase">
                  🚜 सरकारी व प्राइवेट इंफ्रास्ट्रक्चर • वाटर पाइपलाइन • सिविल वर्क
                </p>
              </div>

              {/* HEADING */}
              <h1 className="leading-[1.02] tracking-[-2px] sm:tracking-[-3px]">
                <span className="block text-[44px] sm:text-[58px] md:text-[72px] xl:text-[84px] font-black text-white">
                  Deepak
                </span>
                <span className="block text-[44px] sm:text-[58px] md:text-[72px] xl:text-[84px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#d97706]">
                  Construction
                </span>
              </h1>

              {/* HINDI CONNECTIVE TAGLINE */}
              <p className="mt-4 text-amber-200 text-lg sm:text-xl font-bold tracking-wide">
                जमीन से लेकर मजबूत ढांचे तक — पक्का निर्माण, पूरा भरोसा
              </p>

              {/* DESCRIPTION */}
              <p className="mt-4 text-slate-300 text-base sm:text-lg leading-8 max-w-2xl">
                मध्य प्रदेश व आसपास के क्षेत्रों में 10+ वर्षों के जमीनी अनुभव के साथ
                आधुनिक भारी मशीनरी (JCB, पोकलेन), कुशल ऑपरेटर व टेक्निकल टीम द्वारा
                वाटर पाइपलाइन, एक्सकेवेशन, ड्रेनेज व सिविल इंफ्रास्ट्रक्चर का समय पर विश्वसनीय निष्पादन।
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="#projects">
                  <MagneticButton className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black px-7 py-3.5 rounded-full font-black text-sm transition-all duration-300 shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:scale-105">
                    प्रोजेक्ट्स देखें (View Projects)
                  </MagneticButton>
                </Link>

                <Link href="#contact">
                  <MagneticButton className="border border-amber-500/30 bg-white/[0.05] backdrop-blur-md text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all duration-300">
                    फ्री साइट कोटेशन (Get Quote)
                  </MagneticButton>
                </Link>

                <a
                  href="https://wa.me/916260879372?text=नमस्ते%20Deepak%20Construction,%20मुझे%20नए%20प्रोजेक्ट%20के%20लिए%20कोटेशन%20चाहिए"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MagneticButton className="bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-105 transition-all duration-300">
                    व्हाट्सएप चैट
                  </MagneticButton>
                </a>
              </div>

              {/* STATS 4-GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 max-w-2xl">
                {stats.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="relative overflow-hidden border border-white/10 bg-white/[0.05] backdrop-blur-xl rounded-[20px] p-4 transition-all duration-500 hover:border-amber-500/40"
                  >
                    <h3 className="text-3xl font-black text-[#f59e0b]">
                      {item.value}
                    </h3>
                    <p className="text-slate-300 mt-2 text-xs font-medium leading-4">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE HERO IMAGE SHOWCASE */}
            <motion.div
              initial={{ opacity: 0, x: 45 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 hidden lg:flex justify-end relative"
            >
              <div className="relative w-full max-w-[480px] h-[580px] rounded-[36px] overflow-hidden border border-amber-500/20 bg-slate-900/40 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
                <Image
                  src="/img.png"
                  alt="Deepak Construction Site Work"
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 1200px) 450px, 480px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-transparent" />

                {/* TRUST BADGE FLOATING CARD */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#0e141e]/90 backdrop-blur-xl border border-amber-500/30 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f59e0b] text-black font-black grid place-items-center text-lg">
                      🏗️
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        हेवी मशीनरी व कुशल टीम
                      </h4>
                      <p className="text-xs text-amber-200/80">
                        JCB, पोकलेन, हाइड्रा व वाटर टैंकर उपलब्ध
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f7f6f2] to-transparent pointer-events-none" />
      </section>
    </>
  );
}