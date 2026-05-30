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


export default function Projects() {

    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {

        const fetchProjects = async () => {

            const snapshot = await getDocs(collection(db, "projects"));

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setProjects(data);
        };

        fetchProjects();

    }, []);

    return (

        <section
            id="projects"
            className="relative overflow-hidden bg-[#f5f3ee] py-20 md:py-24 px-4 sm:px-6"
        >

            {/* BACKGROUND GLOW */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#d89b1d]/10 blur-[140px] rounded-full"></div>

            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-black/5 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <FadeUp>
                    <FloatingCard>

                        {/* TOP SECTION */}
                        <div className="max-w-5xl mb-16">

                            <div className="flex items-center gap-3 mb-6">

                                <div className="w-14 h-[2px] bg-[#d89b1d]"></div>

                                <p className="uppercase tracking-[5px] text-[#d89b1d] text-sm font-semibold">
                                    Latest Infrastructure Projects
                                </p>

                            </div>

                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] text-black">

                                Our Featured
                                <span className="text-[#d89b1d]"> Projects</span>

                            </h2>

                            <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-8 sm:leading-10 mt-8 max-w-4xl">

                                Deepak Construction delivers industrial,
                                infrastructure and civil engineering projects
                                with modern execution standards, advanced
                                machinery and reliable construction quality.

                            </p>

                        </div>
                    </FloatingCard>
                </FadeUp>


                {/* PROJECTS GRID */}
                <div className="space-y-16">

                    {projects.map((project, index) => (

                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >


                            <div className="grid lg:grid-cols-2 overflow-hidden rounded-[30px] bg-white border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                                {/* LEFT IMAGE / VIDEO */}
                                <div className="relative overflow-hidden h-[340px] sm:h-[420px] md:h-[520px] lg:h-[650px]">
                                    {/* VIDEO IF EXISTS */}
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
                                            src={project.imageUrl}
                                            className="w-full h-full object-cover"
                                        />

                                    )}


                                    {/* OVERLAY */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                    {/* PROJECT BADGE */}
                                    <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/10 text-white px-5 py-3 rounded-full">

                                        <p className="uppercase tracking-[3px] text-xs font-semibold">
                                            Featured Project
                                        </p>

                                    </div>

                                </div>


                                {/* RIGHT CONTENT */}
                                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">

                                    <div className="flex items-center gap-3 mb-6">

                                        <div className="w-10 h-[2px] bg-[#d89b1d]"></div>

                                        <p className="uppercase tracking-[4px] text-[#d89b1d] text-xs font-semibold">
                                            Infrastructure Development
                                        </p>

                                    </div>


                                    {/* TITLE */}
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-black mb-6 md:mb-8">

                                        {project.title}

                                    </h3>

                                    {/* DESCRIPTION */}
                                    <p className="text-gray-600 text-base sm:text-lg leading-7 sm:leading-9 mb-8">

                                        {project.description}

                                    </p>

                                    {/* PROJECT STATS */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 sm:mt-10">

                                        <div className="bg-[#f8f8f8] rounded-2xl p-4 sm:p-5">

                                            <h4 className="text-3xl font-black text-[#d89b1d]">
                                                100%
                                            </h4>

                                            <p className="text-gray-500 text-sm mt-2">
                                                Quality
                                            </p>

                                        </div>

                                        <div className="bg-[#f8f8f8] rounded-2xl p-4 sm:p-5">

                                            <h4 className="text-3xl font-black text-[#d89b1d]">
                                                Modern
                                            </h4>

                                            <p className="text-gray-500 text-sm mt-2">
                                                Machinery
                                            </p>

                                        </div>

                                        <div className="bg-[#f8f8f8] rounded-2xl p-4 sm:p-5">

                                            <h4 className="text-3xl font-black text-[#d89b1d]">
                                                Safe
                                            </h4>

                                            <p className="text-gray-500 text-sm mt-2">
                                                Execution
                                            </p>

                                        </div>

                                    </div>

                                    {/* BUTTONS */}
                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10 sm:mt-12">

                                        <Link href={`/projects/${project.id}`}>

                                            <MagneticButton
                                                className="
                                                w-full sm:w-auto
                                              bg-[#d89b1d]
                                              text-black
                                                px-10
                                                py-5
                                                rounded-full
                                                font-black
                                                hover:scale-105
                                                transition-all
                                                duration-300
                                                shadow-[0_0_60px_rgba(216,155,29,0.35)]
                                                "

                                            >
                                                View Projects
                                            </MagneticButton>

                                        </Link>

                                        <MagneticButton
                                            className="
  bg-[#d89b1d]
  text-black
  px-10
  py-5
  rounded-full
  font-black
  hover:scale-105
  transition-all
  duration-300
  shadow-[0_0_60px_rgba(216,155,29,0.35)]
  "
                                        >Contact Us
                                        </MagneticButton>
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