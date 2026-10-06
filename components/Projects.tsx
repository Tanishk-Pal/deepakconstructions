"use client";

import { useEffect, useState } from "react";
import ParallaxImage from "@/components/animations/ParallaxImage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import FloatingCard from "@/components/animations/FloatingCard";
import MagneticButton from "@/components/animations/MagneticButton";
import { MapPin, Calendar, Building2, PhoneCall, CheckCircle } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  location?: string;
  duration?: string;
  client?: string;
  category?: string;
  status?: string;
  imageUrl?: string;
  videoUrl?: string;
}

const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: "fb-1",
    title: "नर्मदा-मालवा वाटर पाइपलाइन नेटवर्क (Underground Pipeline)",
    description:
      "50+ किमी लंबी अंडरग्राउंड पेयजल पाइपलाइन ट्रेंचिंग, MS/HDPE पाइपलाइन जॉइंटिंग, वॉल्व चैंबर निर्माण और सफल हाइड्रोलिक टेस्टिंग कार्य।",
    location: "होशंगाबाद / इटारसी, मध्य प्रदेश",
    duration: "14 माह",
    client: "पब्लिक हेल्थ इंजीनियरिंग / प्राइवेट इंफ्रा",
    category: "Pipeline",
    status: "सफलतापूर्वक पूर्ण (Completed)",
    videoUrl: "/pipeline-video.mp4",
    imageUrl: "/pipeline.png",
  },
  {
    id: "fb-2",
    title: "इंडस्ट्रियल साइट एक्सकेवेशन व समतलीकरण (Site Excavation)",
    description:
      "आधुनिक JCB व पोकलेन फ्लीट द्वारा 20 एकड़ इंडस्ट्रियल लैंड की डीप रॉक कटाई, पाइपलाइन ट्रेंचिंग और सटीक ग्राउंड लेवलिंग कार्य।",
    location: "मंडीदीप इंडस्ट्रियल बेल्ट, म.प्र.",
    duration: "8 माह",
    client: "इंडस्ट्रियल वेयरहाउस व मैन्युफैक्चरिंग प्लांट",
    category: "Excavation",
    status: "सफलतापूर्वक पूर्ण (Completed)",
    videoUrl: "/Excavation-vid.mp4",
    imageUrl: "/excavation.png",
  },
  {
    id: "fb-3",
    title: "कमर्शियल आरसीसी फाउंडेशन व सिविल निर्माण (Civil Infrastructure)",
    description:
      "मजबूत हेवी लोड बेयरिंग फाउंडेशन, आरसीसी पिलर, रिटेनिंग वॉल, इंडस्ट्रियल शेड और टिकाऊ कंक्रीट स्ट्रक्चर का समयबद्ध निर्माण।",
    location: "भोपाल-इटारसी हाईवे कॉरिडोर",
    duration: "10 माह",
    client: "कमर्शियल लॉजिस्टिक्स हब",
    category: "Civil Work",
    status: "सफलतापूर्वक पूर्ण (Completed)",
    videoUrl: "/civil-work.mp4",
    imageUrl: "/civil.png",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>(FALLBACK_PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        // Fallback already in state
        console.log("Using showcase fallback projects", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#f7f6f2] py-20 md:py-28 px-4 sm:px-6"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp>
          <FloatingCard>
            {/* TOP HEADER */}
            <div className="max-w-5xl mb-16">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <p className="uppercase tracking-[4px] text-[#d97706] text-xs font-bold">
                  सफल इंफ्रास्ट्रक्चर प्रोजेक्ट्स • Featured Portfolio
                </p>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.08] text-slate-900 tracking-tight">
                हमारे प्रमुख
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#d97706]"> प्रोजेक्ट्स (Projects)</span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-8 sm:leading-9 mt-6 max-w-4xl">
                <strong className="text-slate-900 font-bold">Deepak Construction</strong> ने मध्य प्रदेश व निकटवर्ती क्षेत्रों में
                वाटर पाइपलाइन, हैवी एक्सकेवेशन, ड्रेनेज व सिविल इंजीनियरिंग के अनेक प्रोजेक्ट्स
                सफलतापूर्वक निष्पादित किए हैं। आधुनिक भारी मशीनरी और मजबूत तकनीकी निगरानी से हर काम समय पर।
              </p>
            </div>
          </FloatingCard>
        </FadeUp>

        {/* PROJECTS LIST */}
        <div className="space-y-16">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="grid lg:grid-cols-2 overflow-hidden rounded-[36px] bg-white border border-slate-200/80 shadow-[0_20px_70px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_90px_rgba(245,158,11,0.12)] transition-all duration-500">
                {/* LEFT IMAGE / VIDEO */}
                <div className="relative overflow-hidden h-[340px] sm:h-[420px] md:h-[480px] lg:h-[580px] bg-slate-900">
                  {project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover hover:scale-105 transition duration-[2000ms]"
                    />
                  ) : (
                    <ParallaxImage
                      src={project.imageUrl || "/img.png"}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* PROJECT BADGE */}
                  <div className="absolute top-6 left-6 bg-[#0f172a]/85 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
                    <p className="tracking-wide text-xs font-bold uppercase">
                      {project.status || "सत्यापित प्रोजेक्ट (Verified)"}
                    </p>
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-[3px] bg-[#f59e0b] rounded-full" />
                    <p className="uppercase tracking-[3px] text-[#d97706] text-xs font-bold">
                      Infrastructure Execution
                    </p>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-slate-900 mb-4 tracking-tight">
                    {project.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-slate-600 text-sm sm:text-base leading-7 mb-6">
                    {project.description}
                  </p>

                  {/* PROJECT METRICS / SPECS */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {project.location && (
                      <div className="bg-[#f8f7f4] border border-slate-200/60 rounded-2xl p-3.5 flex items-start gap-2.5">
                        <MapPin size={18} className="text-[#d97706] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">स्थान (Location)</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">{project.location}</p>
                        </div>
                      </div>
                    )}

                    {project.duration && (
                      <div className="bg-[#f8f7f4] border border-slate-200/60 rounded-2xl p-3.5 flex items-start gap-2.5">
                        <Calendar size={18} className="text-[#d97706] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">अवधि (Duration)</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">{project.duration}</p>
                        </div>
                      </div>
                    )}

                    {project.client && (
                      <div className="bg-[#f8f7f4] border border-slate-200/60 rounded-2xl p-3.5 flex items-start gap-2.5">
                        <Building2 size={18} className="text-[#d97706] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">क्लाइंट (Client)</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{project.client}</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-[#f8f7f4] border border-slate-200/60 rounded-2xl p-3.5 flex items-start gap-2.5">
                      <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">मानक (Standard)</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">100% Quality & Safety</p>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={`/projects/${project.id}`}>
                      <MagneticButton className="bg-[#f59e0b] text-black px-6 sm:px-8 py-3.5 rounded-full font-black text-xs sm:text-sm hover:bg-[#d97706] hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                        प्रोजेक्ट विवरण (View)
                      </MagneticButton>
                    </Link>

                    <a
                      href="tel:+916260879372"
                      className="inline-flex items-center gap-2 border border-slate-300 bg-white hover:border-[#f59e0b] text-slate-800 px-5 sm:px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300"
                    >
                      <PhoneCall size={15} className="text-[#d97706]" />
                      <span>कोटेशन प्राप्त करें (Call)</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}