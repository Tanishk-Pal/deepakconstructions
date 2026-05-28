"use client";
import FadeUp from "@/components/animations/FadeUp";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f5f3ee] text-black py-32 px-6"
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-[-10%] w-[400px] h-[400px] bg-yellow-400/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-black/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp>

        {/* TOP SECTION */}
        <div className="text-center max-w-4xl mx-auto">

          <div className="flex justify-center items-center gap-3 mb-6">

            <div className="w-14 h-[2px] bg-[#d89b1d]"></div>

            <p className="uppercase tracking-[5px] text-[#d89b1d] text-sm font-semibold">
              Contact Deepak Construction
            </p>

          </div>

          {/* PHONE */}
          <h2 className="text-5xl md:text-7xl font-black text-[#d89b1d] leading-tight">

            +91 6260879372

          </h2>

          {/* ADDRESS */}
          <p className="mt-8 text-gray-600 text-lg tracking-wide">

            Madhya Pradesh, India

          </p>

        </div>

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">

          {/* PHONE */}
          <div className="group bg-white/70 backdrop-blur-md border border-black/5 rounded-[30px] p-10 hover:-translate-y-2 transition duration-500 shadow-sm hover:shadow-2xl">

            <div className="w-16 h-16 rounded-2xl bg-[#d89b1d]/10 flex items-center justify-center mb-8">

              <Phone className="text-[#d89b1d]" size={30} />

            </div>

            <h3 className="text-2xl font-black mb-4">
              Phone Number
            </h3>

            <p className="text-gray-600 text-lg leading-8">

              +91 6260879372

            </p>

          </div>

          {/* EMAIL */}
          <div className="group bg-white/70 backdrop-blur-md border border-black/5 rounded-[30px] p-10 hover:-translate-y-2 transition duration-500 shadow-sm hover:shadow-2xl">

            <div className="w-16 h-16 rounded-2xl bg-[#d89b1d]/10 flex items-center justify-center mb-8">

              <Mail className="text-[#d89b1d]" size={30} />

            </div>

            <h3 className="text-2xl font-black mb-4">
              Email Address
            </h3>

            <p className="text-gray-600 text-lg leading-8 break-words">

              Palt51419@gmail.com

            </p>

          </div>

          {/* LOCATION */}
          <div className="group bg-white/70 backdrop-blur-md border border-black/5 rounded-[30px] p-10 hover:-translate-y-2 transition duration-500 shadow-sm hover:shadow-2xl">

            <div className="w-16 h-16 rounded-2xl bg-[#d89b1d]/10 flex items-center justify-center mb-8">

              <MapPin className="text-[#d89b1d]" size={30} />

            </div>

            <h3 className="text-2xl font-black mb-4">
              Office Location
            </h3>

            <p className="text-gray-600 text-lg leading-8">

              Itarsi, Madhya Pradesh, India

            </p>

          </div>

        </div>
        </FadeUp>

        <FadeUp>

        {/* WORKING HOURS */}
        <div className="mt-24 bg-black text-white rounded-[40px] overflow-hidden relative">

          {/* GLOW */}
          <div className="absolute top-[-30%] right-[-10%] w-[350px] h-[350px] bg-[#d89b1d]/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10 px-10 md:px-20 py-20 text-center">

            <div className="flex justify-center mb-8">

              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">

                <Clock3 size={36} className="text-[#d89b1d]" />

              </div>

            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-12">

              Working Hours

            </h2>

            <div className="space-y-5 text-xl text-gray-300">

              <p>
                Monday – Saturday : 8am – 7pm
              </p>

              <p>
                Sunday : Emergency Support Only
              </p>

            </div>

          </div>

        </div>
        </FadeUp>

     

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20">

          <div className="overflow-hidden rounded-[25px] h-72 group">
            <img
              src="/img.png"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          <div className="overflow-hidden rounded-[25px] h-72 group">
            <img
              src="/excavation.png"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          <div className="overflow-hidden rounded-[25px] h-72 group">
            <img
              src="/building.png"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          <div className="overflow-hidden rounded-[25px] h-72 group">
            <img
              src="/pipeline.png"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

        </div>

      </div>


    </section>
  );
}

