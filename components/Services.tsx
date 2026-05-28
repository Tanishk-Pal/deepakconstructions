"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import MagneticButton from "@/components/animations/MagneticButton";

const services = [
  {
    title: "Water Pipeline Installation",
    slug: "water-pipeline-installation",
    description:
      "We provide underground and industrial water pipeline installation services using modern machinery, precision engineering and experienced manpower.",
    image: "/pipeline.png",
  },

  {
    title: "Civil Construction",
    slug: "civil-construction",
    description:
      "Complete civil infrastructure development including reinforced structures, industrial foundations and commercial construction.",
    image: "/civil.png",
  },

  {
    title: "Excavation Work",
    slug: "excavation-work",
    description:
      "Safe and large-scale excavation solutions executed with advanced equipment and technical expertise.",
    image: "/excavation.png",
  },

  {
    title: "Industrial Pipeline Systems",
    slug: "industrial-pipeline-systems",
    description:
      "Industrial-grade pipeline systems designed for durability, safety and long-term operational performance.",
    image: "/industrial.png",
  },

  {
    title: "Building Construction",
    slug: "building-construction",
    description:
      "Professional building construction services with modern engineering and quality execution standards.",
    image: "/building.png",
  },

  {
    title: "Drainage Infrastructure",
    slug: "drainage-infrastructure",
    description:
      "Drainage and wastewater infrastructure systems for residential, industrial and urban development projects.",
    image: "/drainage.png",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f5f3ee] text-black py-20 md:py-32 px-4 sm:px-6"    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#d89b1d]/10 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        <FadeUp>

          {/* HEADER */}


          <div className="mb-28 max-w-5xl">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-[2px] bg-[#d89b1d]" />

              <p className="uppercase tracking-[5px] text-[#d89b1d] text-sm font-semibold">
                Our Services
              </p>

            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-[-2px] md:tracking-[-3px]">
              Premium Infrastructure
              <span className="text-[#d89b1d]"> Solutions</span>

            </h2>


            <p className="text-gray-600 text-base sm:text-lg leading-8 sm:leading-10 mt-8 max-w-4xl">

              Deepak Construction भरोसेमंद Infrastructure, Pipeline,
              Excavation aur Civil Construction services provide karta hai.
              Hum modern machine, experienced staff aur strong execution ke saath
              high-quality kaam time par complete karte hain — चाहे industrial
              pipeline ho, road work ho ya large construction project.

            </p>

          </div>
        </FadeUp>


        {/* SERVICES */}
        <div className="space-y-20">

          {services.map((service, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >




              <div className="
                    grid lg:grid-cols-2 items-center
                    overflow-hidden
                    rounded-[42px]
                    bg-white
                    border border-black/5
                    shadow-[0_20px_80px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_30px_120px_rgba(0,0,0,0.12)]
                    transition-all
                    duration-700
                  ">

                {/* IMAGE */}
                <div className="relative overflow-hidden h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px]">


                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 2 }}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                </div>

                {/* CONTENT */}
                <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">

                  {/* GLOW */}
                  <div className="absolute top-[-20%] right-[-10%] w-[250px] h-[250px] bg-[#d89b1d]/10 blur-[90px] rounded-full" />

                  {/* LABEL */}
                  <div className="flex items-center gap-4 mb-8 relative z-10">

                    <div className="w-14 h-[2px] bg-[#d89b1d]" />

                    <p className="uppercase tracking-[5px] text-[#d89b1d] text-xs font-semibold">
                      Infrastructure Service
                    </p>

                  </div>

                  {/* TITLE */}
                  <h3 className="
                        text-2xl
                        sm:text-3xl
                        md:text-5xl
                        font-black
                        leading-tight
                        tracking-[-2px]
                        mb-8
                        relative z-10
                      ">
                    {service.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="
                        text-gray-600
                        text-base
                        sm:text-lg
                        leading-8
                        sm:leading-10
                        max-w-2xl
                        relative z-10
                      ">
                    {service.description}
                  </p>

                  {/* STATS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12 relative z-10">

                    {[
                      {
                        value: "100%",
                        label: "Quality Assurance",
                      },

                      {
                        value: "24/7",
                        label: "Project Support",
                      },

                    ].map((item, i) => (

                      <motion.div
                        key={i}

                        initial={{
                          opacity: 0,
                          scale: 0.8,
                          y: 40,
                        }}

                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                        }}

                        transition={{
                          delay: i * 0.2,
                          duration: 0.8,
                        }}

                        whileHover={{
                          y: -8,
                          scale: 1.03,
                        }}

                        className="
                              bg-[#f8f6f1]
                              border border-black/5
                              rounded-[22px] sm:rounded-[28px]
                              p-5 sm:p-7
                              transition-all
                              duration-500
                              hover:shadow-[0_10px_40px_rgba(216,155,29,0.12)]
                              hover:border-[#d89b1d]/20
                              relative
                              overflow-hidden
                            "
                      >

                        {/* SHINE */}
                        <div className="
                              absolute inset-0
                              opacity-0
                              hover:opacity-100
                              transition duration-700
                            ">
                          <div className="
                                absolute inset-0
                                bg-gradient-to-r
                                from-transparent
                                via-white/40
                                to-transparent
                                -translate-x-full
                                hover:translate-x-full
                                duration-[1800ms]
                              " />
                        </div>

                        <h4 className="
                              text-[#d89b1d]
                              text-3xl sm:text-4xl
                              font-black
                              relative z-10
                            ">
                          {item.value}
                        </h4>

                        <p className="
                              text-gray-600
                              mt-3
                              text-sm
                              tracking-wide
                              relative z-10
                            ">
                          {item.label}
                        </p>

                      </motion.div>

                    ))}

                  </div>

                  {/* BUTTON */}
                  <div className="mt-14 relative z-10">

                    <Link href={`/services/${service.slug}`}>

                      <MagneticButton
                        className="
                        w-full sm:w-auto
                      bg-[#d89b1d]
                      text-black
                        px-8 sm:px-10
                        py-4 sm:py-5
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
