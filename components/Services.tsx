"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import MagneticButton from "@/components/animations/MagneticButton";
import { CheckCircle2, PhoneCall } from "lucide-react";

const services = [
  {
    title: "Water Pipeline Installation",
    hindiTitle: "वाटर पाइपलाइन इंस्टॉलेशन",
    slug: "water-pipeline-installation",
    description:
      "अंडरग्राउंड व इंडस्ट्रियल पेयजल पाइपलाइन इंस्टॉलेशन। आधुनिक ट्रेंचिंग, हाई-प्रेशर जॉइंटिंग, वॉल्व फिटिंग और प्रेशर टेस्टिंग कार्य अनुभवी टीम द्वारा।",
    points: [
      "MS, DI व HDPE पाइपलाइन फिटिंग",
      "अंडरग्राउंड व इंडस्ट्रियल वाटर नेटवर्क",
      "हाइड्रोलिक लीकेज व प्रेशर टेस्टिंग",
    ],
    image: "/pipeline.png",
  },
  {
    title: "Civil Construction",
    hindiTitle: "सिविल व आरसीसी निर्माण",
    slug: "civil-construction",
    description:
      "मजबूत कंक्रीट स्ट्रक्चर, इंडस्ट्रियल शेड, बाउंड्री वॉल, रिटेनिंग वॉल और कमर्शियल बिल्डिंग का फाउंडेशन से लेकर सुपरस्ट्रक्चर तक निर्माण।",
    points: [
      "मजबूत RCC फाउंडेशन व पिलर वर्क",
      "इंडस्ट्रियल वेयरहाउस व प्लांट शेड",
      "A-Grade सीमेंट व स्टील मटीरियल",
    ],
    image: "/civil.png",
  },
  {
    title: "Excavation Work",
    hindiTitle: "हैवी एक्सकेवेशन व मिट्टी कटाई",
    slug: "excavation-work",
    description:
      "आधुनिक भारी JCB व पोकलेन मशीनों द्वारा गहरी नींव, ट्रेंच, बेसमेंट, तालाब व नहर की सटीक और तीव्र खुदाई व साइट समतलीकरण कार्य।",
    points: [
      "JCB, पोकलेन व डंपर फ्लीट",
      "पाइपलाइन ट्रेंच व बेसमेंट खुदाई",
      "रॉक ब्रेकिंग व ग्राउंड लेवलिंग",
    ],
    image: "/excavation.png",
  },
  {
    title: "Industrial Pipeline Systems",
    hindiTitle: "इंडस्ट्रियल पाइपलाइन सिस्टम",
    slug: "industrial-pipeline-systems",
    description:
      "फैक्ट्री व औद्योगिक संयंत्रों के लिए हेवी-ड्यूटी हाई प्रेशर पाइपलाइन नेटवर्क। उच्च सुरक्षा मानकों व लॉन्ग-टर्म ड्यूरेबिलिटी के साथ।",
    points: [
      "हाई-प्रेशर इंडस्ट्रियल पाइपिंग",
      "सुरक्षा मानकों व ISI गाइडलाइंस",
      "एक्सपीरियंसड वेल्डर व फिटर टीम",
    ],
    image: "/industrial.png",
  },
  {
    title: "Building Construction",
    hindiTitle: "बिल्डिंग व कमर्शियल स्ट्रक्चर",
    slug: "building-construction",
    description:
      "क्वालिटी मटीरियल और अनुभवी इंजीनियरों के सुपरविज़न में आवासीय, कमर्शियल व वेयरहाउस प्रोजेक्ट्स का पक्का और समयबद्ध निर्माण।",
    points: [
      "इंजीनियरिंग सुपरविज़न व डिजाइन",
      "समयबद्ध प्रोजेक्ट डिलीवरी की गारंटी",
      "मजबूत और टिकाऊ आर्किटेक्चर",
    ],
    image: "/building.png",
  },
  {
    title: "Drainage Infrastructure",
    hindiTitle: "ड्रेनेज व सीवरेज इंफ्रास्ट्रक्चर",
    slug: "drainage-infrastructure",
    description:
      "पक्का कंक्रीट नाला निर्माण, स्टॉर्म वॉटर ड्रेनेज व सीवर पाइपलाइन नेटवर्क। जलभराव की समस्या का स्थायी व मजबूत कंक्रीट समाधान।",
    points: [
      "RCC कंक्रीट नाला व बॉक्स कल्वर्ट",
      "सीवेज व वेस्टवाटर पाइपलाइन",
      "लॉन्ग-टर्म वाटरफ्लो सेफ्टी",
    ],
    image: "/drainage.png",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f7f6f2] text-slate-900 py-20 md:py-32 px-4 sm:px-6"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp>
          {/* HEADER */}
          <div className="mb-20 max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              <p className="uppercase tracking-[4px] text-[#d97706] text-xs font-bold">
                हमारी मुख्य सेवाएं • Our Specialized Services
              </p>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-[-1.5px] text-[#0f172a]">
              विश्वसनीय इंफ्रास्ट्रक्चर
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#d97706]"> सॉल्यूशंस</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-8 mt-6 max-w-4xl">
              <strong className="text-slate-900 font-bold">Deepak Construction</strong> भरोसेमंद Infrastructure, Pipeline,
              Excavation और Civil Construction सेवाएं प्रदान करता है। हम आधुनिक JCB व पोकलेन मशीनरी,
              कुशल मैनपॉवर और A-Grade मटीरियल के साथ हर काम समय पर पूरा करते हैं —
              चाहे सरकारी टेंडर हो, इंडस्ट्रियल प्लांट हो या प्राइवेट निर्माण कार्य।
            </p>
          </div>
        </FadeUp>

        {/* SERVICES CARDS */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="grid lg:grid-cols-2 items-center overflow-hidden rounded-[36px] bg-white border border-slate-200/80 shadow-[0_20px_70px_rgba(15,23,42,0.06)] hover:shadow-[0_30px_100px_rgba(245,158,11,0.12)] transition-all duration-500">
                {/* IMAGE */}
                <div className="relative overflow-hidden h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1.5 }}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* BADGE ON IMAGE */}
                  <div className="absolute top-5 left-5 bg-[#0f172a]/80 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                    {service.hindiTitle}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-[3px] bg-[#f59e0b] rounded-full" />
                    <p className="uppercase tracking-[3px] text-[#d97706] text-xs font-bold">
                      Infrastructure Excellence
                    </p>
                  </div>

                  {/* ENGLISH TITLE */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 mb-2">
                    {service.title}
                  </h3>

                  {/* HINDI SUB-TITLE */}
                  <p className="text-amber-700 font-bold text-base mb-5">
                    {service.hindiTitle}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-slate-600 text-sm sm:text-base leading-7 max-w-2xl mb-6">
                    {service.description}
                  </p>

                  {/* KEY POINTS LIST */}
                  <div className="space-y-2.5 mb-8">
                    {service.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                        <CheckCircle2 size={18} className="text-[#f59e0b] shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-[#f8f7f4] border border-slate-200/60 rounded-2xl p-4">
                      <h4 className="text-2xl font-black text-[#d97706]">
                        100%
                      </h4>
                      <p className="text-slate-500 text-xs font-semibold mt-1">
                        क्वालिटी गारंटी (Quality)
                      </p>
                    </div>

                    <div className="bg-[#f8f7f4] border border-slate-200/60 rounded-2xl p-4">
                      <h4 className="text-2xl font-black text-[#d97706]">
                        24/7
                      </h4>
                      <p className="text-slate-500 text-xs font-semibold mt-1">
                        साइट सपोर्ट (Support)
                      </p>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={`/services/${service.slug}`}>
                      <MagneticButton className="bg-[#f59e0b] text-black px-6 sm:px-8 py-3.5 rounded-full font-black text-xs sm:text-sm hover:bg-[#d97706] hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                        विस्तार से देखें (Details)
                      </MagneticButton>
                    </Link>

                    <a
                      href="tel:+916260879372"
                      className="inline-flex items-center gap-2 border border-slate-300 bg-white hover:border-[#f59e0b] text-slate-800 px-5 sm:px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300"
                    >
                      <PhoneCall size={15} className="text-[#d97706]" />
                      <span>कोटेशन लें (Call)</span>
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
