"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/animations/MagneticButton";

interface ReelVideo {
  id: string;
  src: string;
  label: string;
  description: string;
  order?: number;
}

const COMPANY_PHONE = "+91 6260879372"; // replace with real number

const FALLBACK_VIDEOS: ReelVideo[] = [
  {
    id: "f1",
    src: "/Excavation-vid.mp4",
    label: "Excavation Work",
    description:
      "Precision excavation for pipeline trenches, foundations and site preparation using skilled operators and reliable machines.",
    order: 1,
  },
  {
    id: "f2",
    src: "/Excavation.mp4",
    label: "Site Excavation",
    description:
      "Safe ground cutting, soil removal and land leveling for construction, pipeline and infrastructure projects.",
    order: 2,
  },
  {
    id: "f3",
    src: "/pipeline-video.mp4",
    label: "Pipeline Installation",
    description:
      "Underground and industrial pipeline work with proper alignment, durable joining and professional execution.",
    order: 3,
  },
  {
    id: "f4",
    src: "/civil-work.mp4",
    label: "Civil Construction",
    description:
      "Strong civil construction work including foundations, concrete work, structural support and finishing.",
    order: 4,
  },
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
  const [videos] = useState<ReelVideo[]>(FALLBACK_VIDEOS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartY = useRef(0);
  const isShifting = useRef(false);

  const activeReel = videos[activeIndex];

  const goToProjects = () => {
    if (isShifting.current) return;
    isShifting.current = true;

    document.querySelector("#projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      isShifting.current = false;
    }, 900);
  };

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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (activeIndex === videos.length - 1 && e.deltaY > 25) {
      goToProjects();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endY = e.changedTouches[0].clientY;
    const swipeUp = touchStartY.current - endY > 55;

    if (activeIndex === videos.length - 1 && swipeUp) {
      goToProjects();
    }
  };

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#050505] text-white">
      {/* TOP BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 px-3 pt-[env(safe-area-inset-top)]">
        <div className="relative mx-auto mt-3 flex h-[58px] max-w-[430px] items-center justify-between rounded-full border border-white/10 bg-black/55 pl-4 pr-2 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <div className="min-w-0 flex-1">
            <AnimatedCompanyName />
            <p className="mt-[-2px] truncate text-[9px] uppercase tracking-[2px] text-white/45">
              Infrastructure • Pipeline • Civil Work
            </p>
          </div>

          <div className="ml-2 flex shrink-0 items-center gap-2">
            <a
              href={`tel:${COMPANY_PHONE}`}
              className="flex h-10 items-center justify-center rounded-full bg-green-500 px-5 text-[12px] font-black leading-none text-black shadow-[0_0_24px_rgba(34,197,94,0.5)]"
            >
              Call Now
            </a>

            <button
              onClick={() => setMenuOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 shadow-inner"
              aria-label="Open menu"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M5 7h14M5 12h14M5 17h14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-2 top-16 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-2 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
            >
              <Link
                href="/admin"
                className="block rounded-xl px-4 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Admin Panel
              </Link>

              <a
                href={`tel:${COMPANY_PHONE}`}
                className="block rounded-xl bg-green-500 px-4 py-3 text-sm font-black text-black"
              >
                Call Now
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* REEL AREA */}
      <div
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="h-[100svh] w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth px-3 pt-[82px]"
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
            className="relative flex h-[100svh] snap-start snap-always flex-col items-center justify-start"
          >
            {/* VIDEO CARD */}
            <motion.div
              initial={{ opacity: 0.7, scale: 0.96 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0.55,
                scale: activeIndex === index ? 1 : 0.94,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative h-[68svh] w-full max-w-[430px] overflow-hidden rounded-[34px] border border-white/10 bg-[#101010] shadow-[0_28px_70px_rgba(0,0,0,0.55)]"
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={reel.src}
                muted
                loop
                playsInline
                preload={index === 0 ? "auto" : "metadata"}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/5 to-black/10" />

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

              {/* LOWER CONTENT INSIDE VIDEO */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                <motion.div
                  key={`${reel.id}-${activeIndex}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="translate-y-3"
                >
                  <p className="mb-1 text-[10px] uppercase tracking-[2.5px] text-[#d89b1d]">
                    Our Work
                  </p>

                  <h2 className="max-w-[260px] text-[29px] font-black leading-[1.02] tracking-[-1px] text-white">
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

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-[26px] border border-white/10 bg-black/35 p-2 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                    <Link href="#projects">
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        className="w-full rounded-full bg-[#d89b1d] py-3 text-[12px] font-black text-black"
                      >
                        Projects
                      </motion.button>
                    </Link>

                    <Link href="#services">
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        className="w-full rounded-full border border-white/15 bg-white/10 py-3 text-[12px] font-bold text-white"
                      >
                        Services
                      </motion.button>
                    </Link>

                    <Link href="#contact">
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        className="w-full rounded-full border border-white/15 bg-white/10 py-3 text-[12px] font-bold text-white"
                      >
                        Contact
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* BLACK BOTTOM CONTENT AREA */}
            <motion.div
              key={`bottom-${activeReel.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-[430px] px-5 pt-5"
            >
              <p className="text-[10px] uppercase tracking-[2.5px] text-[#d89b1d]">
                Project Detail
              </p>

              <p className="mt-1 text-[13px] leading-5 text-white/65">
                {activeReel.description}
              </p>

              <a href={`tel:${COMPANY_PHONE}`}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="mt-3 w-full rounded-full bg-green-500 py-3 text-sm font-black text-black shadow-[0_0_30px_rgba(34,197,94,0.45)]"
                >
                  Call Now for Project Discussion
                </motion.button>
              </a>
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
      <section className="block lg:hidden h-[100svh] w-full overflow-hidden">
        <MobileReelFeed />
      </section>

      {/* PC / TABLET UNCHANGED */}
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