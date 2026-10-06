"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  MessageCircle,
  Send,
  Building,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "वाटर पाइपलाइन इंस्टॉलेशन",
    location: "",
    message: "",
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*प्रोजेक्ट इन्क्वायरी - Deepak Construction*%0A%0A*नाम:* ${
      formData.name || "N/A"
    }%0A*मोबाइल:* ${formData.phone || "N/A"}%0A*काम का प्रकार:* ${
      formData.service
    }%0A*साइट लोकेशन:* ${formData.location || "N/A"}%0A*विवरण:* ${
      formData.message || "कोटेशन की आवश्यकता है"
    }`;

    window.open(`https://wa.me/916260879372?text=${text}`, "_blank");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f7f6f2] text-slate-900 py-24 px-4 sm:px-6"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-slate-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp>
          {/* TOP SECTION */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              <p className="uppercase tracking-[4px] text-[#d97706] text-xs font-bold">
                साइट विज़िट व फ्री कोटेशन • Get In Touch
              </p>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] leading-tight tracking-tight">
              संपर्क करें —
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#d97706]"> Deepak Construction</span>
            </h2>

            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              अपने नए प्रोजेक्ट, वाटर पाइपलाइन टेंडर, हैवी एक्सकेवेशन या सिविल निर्माण कार्य की जानकारी और एस्टीमेट के लिए सीधे संपर्क करें।
            </p>

            {/* BIG CALL / WHATSAPP ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <a
                href="tel:+916260879372"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black px-8 py-4 rounded-full font-black text-lg shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 transition-all duration-300"
              >
                <Phone size={22} />
                <span>+91 6260879372 (कॉल करें)</span>
              </a>

              <a
                href="https://wa.me/916260879372?text=नमस्ते%20Deepak%20Construction,%20मुझे%20प्रोजेक्ट%20के%20लिए%20कोटेशन%20चाहिए"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-7 py-4 rounded-full font-bold text-base shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:scale-105 transition-all duration-300"
              >
                <MessageCircle size={22} />
                <span>व्हाट्सएप पर बात करें</span>
              </a>
            </div>
          </div>
        </FadeUp>

        {/* 2-COLUMN: CONTACT INFO + QUICK QUOTE FORM */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          {/* INFO CARDS (LEFT) */}
          <div className="lg:col-span-5 space-y-4">
            {/* PHONE */}
            <a
              href="tel:+916260879372"
              className="block group bg-white border border-slate-200/80 rounded-[28px] p-6 hover:-translate-y-1 transition duration-300 shadow-sm hover:shadow-xl hover:border-amber-500/40"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#d97706] shrink-0">
                  <Phone size={26} />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold">
                    कॉल व मोबाइल (Mobile)
                  </h3>
                  <p className="text-xl font-black text-slate-900 mt-1">
                    +91 6260879372
                  </p>
                  <p className="text-xs text-amber-700 font-semibold mt-0.5">
                    सीधी बात • त्वरित रिस्पांस
                  </p>
                </div>
              </div>
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/916260879372?text=नमस्ते%20Deepak%20Construction,%20मुझे%20प्रोजेक्ट%20के%20बारे%20में%20जानकारी%20चाहिए"
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-white border border-slate-200/80 rounded-[28px] p-6 hover:-translate-y-1 transition duration-300 shadow-sm hover:shadow-xl hover:border-emerald-500/40"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle size={26} />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold">
                    व्हाट्सएप चैट (WhatsApp)
                  </h3>
                  <p className="text-xl font-black text-slate-900 mt-1">
                    +91 6260879372
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    साइट फोटो व लोकेशन शेयर करें
                  </p>
                </div>
              </div>
            </a>

            {/* EMAIL */}
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#d97706] shrink-0">
                  <Mail size={26} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold">
                    ईमेल पता (Email)
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-slate-900 mt-1 truncate">
                    Palt51419@gmail.com
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ऑफिशियल कॉरेस्पोंडेंस व टेंडर
                  </p>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#d97706] shrink-0">
                  <MapPin size={26} />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold">
                    कार्यालय स्थान (Office Location)
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                    इटारसी, मध्य प्रदेश, भारत
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    होशंगाबाद (नर्मदापुरम) व समीपवर्ती जिले
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK INQUIRY FORM (RIGHT) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-[36px] p-7 sm:p-10 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                त्वरित प्रोजेक्ट कोटेशन (Quick Quote)
              </h3>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              नीचे विवरण भरें, हमारी टीम तुरंत आपसे संपर्क करेगी:
            </p>

            <form onSubmit={handleWhatsAppSubmit} suppressHydrationWarning className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    आपका नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    suppressHydrationWarning
                    placeholder="उदा. राजेश शर्मा"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#f8f7f4] border border-slate-200 text-slate-900 text-sm outline-none focus:border-[#f59e0b] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    मोबाइल नंबर (Phone Number) *
                  </label>
                  <input
                    type="tel"
                    required
                    suppressHydrationWarning
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#f8f7f4] border border-slate-200 text-slate-900 text-sm outline-none focus:border-[#f59e0b] focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    काम का प्रकार (Service Type)
                  </label>
                  <select
                    value={formData.service}
                    suppressHydrationWarning
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#f8f7f4] border border-slate-200 text-slate-900 text-sm outline-none focus:border-[#f59e0b] focus:bg-white transition"
                  >
                    <option value="वाटर पाइपलाइन इंस्टॉलेशन">वाटर पाइपलाइन इंस्टॉलेशन (Pipeline)</option>
                    <option value="हैवी एक्सकेवेशन (JCB/पोकलेन)">हैवी एक्सकेवेशन (JCB / पोकलेन)</option>
                    <option value="सिविल व आरसीसी निर्माण">सिविल व आरसीसी निर्माण (Civil Work)</option>
                    <option value="इंडस्ट्रियल पाइपलाइन">इंडस्ट्रियल पाइपलाइन (Industrial)</option>
                    <option value="बिल्डिंग व शेड कंस्ट्रक्शन">बिल्डिंग व शेड कंस्ट्रक्शन</option>
                    <option value="ड्रेनेज व नाला निर्माण">ड्रेनेज व नाला निर्माण</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    साइट लोकेशन (Site Location)
                  </label>
                  <input
                    type="text"
                    suppressHydrationWarning
                    placeholder="उदा. इटारसी, होशंगाबाद या अन्य"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#f8f7f4] border border-slate-200 text-slate-900 text-sm outline-none focus:border-[#f59e0b] focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  प्रोजेक्ट का विवरण / संदेश (Message)
                </label>
                <textarea
                  rows={3}
                  suppressHydrationWarning
                  placeholder="पाइपलाइन की लंबाई, मिट्टी कटाई की मात्रा या प्रोजेक्ट संबंधी कोई भी जानकारी..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-[#f8f7f4] border border-slate-200 text-slate-900 text-sm outline-none focus:border-[#f59e0b] focus:bg-white transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  suppressHydrationWarning
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.35)] transition-all duration-300"
                >
                  <MessageCircle size={20} />
                  <span>व्हाट्सएप पर कोटेशन अनुरोध भेजें (Send via WhatsApp)</span>
                </button>
              </div>

              <p className="text-center text-xs text-slate-400">
                🔒 आपकी जानकारी गोपनीय रखी जाती है। कोई स्पैम नहीं।
              </p>
            </form>
          </div>
        </div>

        {/* WORKING HOURS BANNER */}
        <div className="mt-16 bg-[#0f172a] text-white rounded-[36px] overflow-hidden relative border border-amber-500/20 shadow-2xl">
          <div className="absolute top-[-30%] right-[-10%] w-[400px] h-[400px] bg-[#f59e0b]/15 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 px-6 sm:px-12 py-12 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center mx-auto mb-6 text-[#f59e0b]">
              <Clock3 size={32} />
            </div>

            <h3 className="text-2xl sm:text-4xl font-black mb-4">
              कार्य समय • Working Hours
            </h3>

            <div className="space-y-3 text-base sm:text-lg text-slate-300">
              <p className="font-semibold text-white">
                सोमवार – शनिवार : <span className="text-[#f59e0b]">सुबह 8:00 से शाम 7:00 तक</span>
              </p>
              <p className="text-sm sm:text-base text-slate-400">
                रविवार : इमरजेंसी साइट एवं पाइपलाइन सपोर्ट 24x7 उपलब्ध
              </p>
            </div>
          </div>
        </div>

        {/* GALLERY SHOWCASE */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[3px] bg-[#f59e0b] rounded-full" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              साइट फोटो गैलरी (Site Gallery)
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/pipeline.png", label: "वाटर पाइपलाइन कार्य" },
              { src: "/excavation.png", label: "हैवी एक्सकेवेशन व JCB" },
              { src: "/civil.png", label: "आरसीसी व सिविल स्ट्रक्चर" },
              { src: "/building.png", label: "कमर्शियल व शेड निर्माण" },
            ].map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-[24px] h-60 sm:h-72 relative group border border-slate-200/80 shadow-sm"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm font-bold text-white">
                  {img.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
