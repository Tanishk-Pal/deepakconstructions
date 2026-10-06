import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { PhoneCall, MessageCircle, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

interface ServiceData {
  title: string;
  hindiTitle: string;
  image: string;
  gallery: string[];
  video: string;
  description: string;
  details: string;
  features: string[];
}

const services: Record<string, ServiceData> = {
  "water-pipeline-installation": {
    title: "Water Pipeline Installation",
    hindiTitle: "वाटर पाइपलाइन इंस्टॉलेशन",
    image: "/pipeline.png",
    gallery: ["/pipeline1.png", "/pipeline2.png", "/pipeline3.png"],
    video: "/pipeline-video.mp4",
    description:
      "Deepak Construction provides professional underground and industrial water pipeline installation services using advanced machinery, precision engineering and durable infrastructure systems.",
    details:
      "हम MS, DI, और HDPE वाटर पाइपलाइन के इंस्टॉलेशन में विशेषज्ञ हैं। सटीक ट्रेंचिंग, हाई-प्रेशर जॉइंटिंग, वॉल्व चैंबर निर्माण और हाइड्रोलिक प्रेशर टेस्टिंग के साथ लीकेज-मुक्त पाइपलाइन नेटवर्क तैयार किया जाता है। चाहे म्यूनिसिपल पेयजल योजना हो या इंडस्ट्रियल प्लांट वाटर सप्लाई, हमारा कार्य गुणवत्ता व समय की गारंटी के साथ पूरा होता है।",
    features: [
      "MS, DI व HDPE पाइपलाइन इंस्टॉलेशन",
      "सटीक ग्रेडिएंट व हाइड्रोलिक प्रेशर टेस्टिंग",
      "अंडरग्राउंड व ओवरहेड वाटर सप्लाई नेटवर्क",
      "वॉल्व चैंबर, थ्रस्ट ब्लॉक व फिटिंग्स",
    ],
  },

  "civil-construction": {
    title: "Civil Construction",
    hindiTitle: "सिविल व आरसीसी निर्माण",
    image: "/building.png",
    gallery: ["/civil1.png", "/civil2.png", "/civil3.png"],
    video: "/civil-work.mp4",
    description:
      "Complete civil infrastructure solutions including structural foundations, RCC work and industrial construction.",
    details:
      "नींव से लेकर फिनिशिंग तक सम्पूर्ण सिविल कंस्ट्रक्शन सॉल्यूशंस। हमारे पास कुशल मिस्त्री, फिटर, वेल्डर और अनुभवी इंजीनियरों की टीम है। हेवी लोड बेयरिंग फाउंडेशन, आरसीसी पिलर, इंडस्ट्रियल शेड, बाउंड्री वॉल और कमर्शियल स्ट्रक्चर का निर्माण केवल A-ग्रेड क्वालिटी सीमेंट और स्टील से किया जाता है।",
    features: [
      "मजबूत RCC फाउंडेशन व हेवी लोड बेयरिंग पिलर",
      "इंडस्ट्रियल वेयरहाउस व फैक्ट्री शेड",
      "क्वालिटी टेस्टिंग व टेक्निकल सुपरविज़न",
      "सरकारी व प्राइवेट निर्माण मानक",
    ],
  },

  "excavation-work": {
    title: "Excavation Work",
    hindiTitle: "हैवी एक्सकेवेशन व मिट्टी कटाई",
    image: "/excavation.png",
    gallery: ["/excavation1.jpeg", "/excavation2.jpeg", "/excavation3.jpeg"],
    video: "/Excavation-vid.mp4",
    description:
      "Advanced excavation operations using modern heavy machinery and skilled operators.",
    details:
      "आधुनिक भारी JCB, पोकलेन और डंपर फ्लीट के साथ त्वरित और सुरक्षित मिट्टी कटाई, रॉक ब्रेकिंग व साइट लेवलिंग। पाइपलाइन ट्रेंचिंग, बेसमेंट खुदाई, तालाब निर्माण और बड़े इंडस्ट्रियल प्लॉट्स का समतलीकरण कार्य न्यूनतम समय में बिना किसी रुकावट के पूरा किया जाता है।",
    features: [
      "JCB, पोकलेन व हैवी अर्थमूविंग फ्लीट",
      "पाइपलाइन ट्रेंच व डीप बेसमेंट खुदाई",
      "हार्ड रॉक ब्रेकिंग व लैंड लेवलिंग",
      "24/7 मशीन ऑपरेटर व साइट बैकअप",
    ],
  },

  "industrial-pipeline-systems": {
    title: "Industrial Pipeline Systems",
    hindiTitle: "इंडस्ट्रियल पाइपलाइन सिस्टम",
    image: "/industrial.png",
    gallery: ["/drainage.png", "/excavation.png", "/pipeline.png"],
    video: "/Excavation-vid.mp4",
    description:
      "Industrial-grade pipeline systems designed for performance, durability and operational safety.",
    details:
      "औद्योगिक प्लांट्स और फैक्ट्रियों के लिए हेवी-ड्यूटी पाइपलाइन नेटवर्क्स। उच्च दबाव और रासायनिक सुरक्षा मानकों का कड़ाई से पालन। अनुभवी पाइप फिटर और सर्टिफाइड वेल्डर्स द्वारा टिकाऊ और सुरक्षित पाइपलाइन इंस्टॉलेशन।",
    features: [
      "हाई-प्रेशर इंडस्ट्रियल पाइपिंग",
      "इंडस्ट्रियल सेफ्टी नॉर्म्स व सर्टिफिकेशन",
      "एंटी-कोरोसिव कोटिंग व इंसुलेशन",
      "रेगुलर मेंटेनेंस व इमरजेंसी सपोर्ट",
    ],
  },

  "building-construction": {
    title: "Building Construction",
    hindiTitle: "बिल्डिंग व कमर्शियल स्ट्रक्चर",
    image: "/building.png",
    gallery: ["/JCB.png", "/building.png", "/img.png"],
    video: "/civil-work.mp4",
    description:
      "Professional building construction services from foundation to structural execution.",
    details:
      "कमर्शियल कॉम्प्लेक्स, इंडस्ट्रियल बिल्डिंग्स और आवासीय प्रोजेक्ट्स के लिए संपूर्ण कंस्ट्रक्शन समाधान। सटीक आर्किटेक्चरल प्लानिंग, मजबूती की गारंटी और समय पर डिलीवरी हमारी पहचान है।",
    features: [
      "फाउंडेशन से लेकर फिनिशिंग तक कंपलीट वर्क",
      "आधुनिक इंजीनियरिंग और मजबूत डिजाइन",
      "समयबद्ध प्रोजेक्ट शेड्यूलिंग",
      "मटेरियल क्वालिटी का पूर्ण आश्वासन",
    ],
  },

  "drainage-infrastructure": {
    title: "Drainage Infrastructure",
    hindiTitle: "ड्रेनेज व नाला निर्माण",
    image: "/drainage.png",
    gallery: ["/industrial.png", "/JCB.png", "/drainage.png"],
    video: "/civil-work.mp4",
    description:
      "Efficient drainage and wastewater infrastructure systems for urban and industrial development.",
    details:
      "स्टॉर्म वाटर ड्रेनेज, कंक्रीट बॉक्स कल्वर्ट और सीवेज नेटवर्क का निर्माण। वर्षा के पानी के त्वरित निकास और लंबी अवधि की मजबूती के लिए आधुनिक प्रीकास्ट और आरसीसी कंक्रीट तकनीकों का उपयोग।",
    features: [
      "RCC कंक्रीट नाला व बॉक्स कल्वर्ट निर्माण",
      "स्टॉर्म वाटर फ्लो ऑप्टिमाइजेशन",
      "अंडरग्राउंड सीवरेज लाइन बिछाना",
      "पर्यावरण अनुकूल वेस्टवाटर डिस्पोजल",
    ],
  },
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    return (
      <div className="bg-[#0c1017] text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4">सेवा नहीं मिली</h2>
        <p className="text-slate-400 mb-8">Service Not Found</p>
        <Link
          href="/"
          className="bg-[#f59e0b] text-black px-6 py-3 rounded-full font-bold text-sm"
        >
          मुख्य पृष्ठ पर लौटें (Back Home)
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#f7f6f2] text-slate-900 min-h-screen overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center bg-[#0c1017] pt-20">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/60 to-transparent" />

        <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl py-20">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            <span>सभी सेवाएं (All Services)</span>
          </Link>

          <p className="text-[#f59e0b] font-bold text-base mb-2">
            {service.hindiTitle}
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            {service.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mt-6 leading-8">
            {service.description}
          </p>
        </div>
      </section>

      {/* ABOUT & TECHNICAL DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-[#f59e0b] rounded-full" />
              <p className="uppercase tracking-[3px] text-[#d97706] text-xs font-bold">
                तकनीकी क्षमता व कार्यप्रणाली • Service Overview
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
              {service.hindiTitle}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#d97706]"> की पूरी जानकारी</span>
            </h2>

            <p className="text-slate-700 text-base leading-8 mb-8">
              {service.details}
            </p>

            {/* KEY HIGHLIGHTS */}
            <div className="space-y-3 mb-10">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <CheckCircle2 size={20} className="text-[#f59e0b] shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">{feature}</span>
                </div>
              ))}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                <h3 className="text-3xl sm:text-4xl font-black text-[#d97706]">50+</h3>
                <p className="text-slate-500 text-xs font-semibold mt-1">सफल प्रोजेक्ट्स (Completed)</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
                <h3 className="text-3xl sm:text-4xl font-black text-[#d97706]">10+</h3>
                <p className="text-slate-500 text-xs font-semibold mt-1">वर्षों का जमीनी अनुभव (Experience)</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-900 rounded-[32px] overflow-hidden border border-slate-200/80 shadow-2xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[360px] sm:h-[480px] lg:h-[550px] object-cover"
              />
            </div>

            {/* QUICK CONTACT BANNER */}
            <div className="mt-6 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/25">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={20} className="text-[#d97706]" />
                <h4 className="text-base font-black text-slate-900">
                  इस सेवा के लिए कोटेशन चाहिए?
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                साइट विज़िट और रेट डिस्कशन के लिए सीधे हमसे संपर्क करें।
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+916260879372"
                  className="inline-flex items-center gap-2 bg-[#f59e0b] text-black px-5 py-2.5 rounded-full font-black text-xs hover:scale-105 transition shadow-md"
                >
                  <PhoneCall size={14} />
                  <span>कॉल करें (+91 6260879372)</span>
                </a>
                <a
                  href={`https://wa.me/916260879372?text=${encodeURIComponent(
                    "नमस्ते Deepak Construction, मुझे इस सेवा के लिए कोटेशन चाहिए: " + service.hindiTitle
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-bold text-xs hover:scale-105 transition shadow-md"
                >
                  <MessageCircle size={14} />
                  <span>व्हाट्सएप</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white py-16 md:py-24 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[3px] bg-[#f59e0b] rounded-full" />
              <p className="uppercase tracking-[3px] text-[#d97706] text-xs font-bold">
                Completed Work • प्रोजेक्ट तस्वीरें
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              साइट फोटो गैलरी (Site Gallery)
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {service.gallery.map((img: string, index: number) => (
              <div
                key={index}
                className="overflow-hidden rounded-[24px] group border border-slate-200/80 shadow-sm"
              >
                <img
                  src={img}
                  alt={`${service.title} gallery ${index + 1}`}
                  className="w-full h-[260px] sm:h-[320px] object-cover group-hover:scale-106 transition duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-[#0c1017] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[3px] bg-[#f59e0b] rounded-full" />
                <p className="uppercase tracking-[3px] text-amber-400 text-xs font-bold">
                  Live Work • लाइव साइट एग्जीक्यूशन
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
                जमीन पर वास्तविक
                <span className="text-[#f59e0b]"> कार्य क्षमता</span>
              </h2>

              <p className="text-slate-400 text-base leading-8">
                हमारी अनुभवी टेक्निकल टीम और भारी मशीनरी ऑपरेटर हर प्रोजेक्ट को
                आधुनिक उपकरणों, तकनीकी सटीकता और उच्च सुरक्षा मानकों के साथ निष्पादित करते हैं।
              </p>
            </div>

            <div>
              <video
                src={service.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="rounded-[28px] w-full shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </main>
  );
}