import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c1017] text-white pt-16 pb-12 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-7 w-2 bg-[#f59e0b] rounded-sm transform -skew-x-12" />
              <h2 className="text-2xl font-black tracking-wider text-white">
                DEEPAK <span className="text-[#f59e0b]">CONSTRUCTION</span>
              </h2>
            </div>

            <p className="text-amber-200/80 text-xs font-bold uppercase tracking-[2px]">
              पक्का निर्माण • पक्का भरोसा • 10+ वर्ष अनुभव
            </p>

            <p className="text-slate-400 text-sm leading-6 max-w-md">
              मध्य प्रदेश व आसपास के क्षेत्रों में 10+ वर्षों से भरोसेमंद वाटर पाइपलाइन,
              हैवी एक्सकेवेशन, ड्रेनेज व सिविल इंफ्रास्ट्रक्चर प्रोजेक्ट्स।
              आधुनिक मशीनरी और कुशल मैनपॉवर के साथ गुणवत्ता व समयबद्ध कार्य।
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="tel:+916260879372"
                className="flex items-center gap-1.5 bg-[#f59e0b] text-black px-4 py-2 rounded-full font-bold text-xs hover:scale-105 transition shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              >
                <Phone size={14} />
                <span>+91 6260879372</span>
              </a>

              <a
                href="https://wa.me/916260879372?text=नमस्ते%20Deepak%20Construction,%20मुझे%20प्रोजेक्ट%20के%20लिए%20कोटेशन%20चाहिए"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 rounded-full font-bold text-xs hover:scale-105 transition shadow-[0_0_20px_rgba(37,211,102,0.25)]"
              >
                <MessageCircle size={14} />
                <span>व्हाट्सएप</span>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              त्वरित लिंक
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#services" className="hover:text-[#f59e0b] transition flex items-center gap-1">
                  <span>सेवाएं (Services)</span>
                  <ArrowUpRight size={14} className="opacity-50" />
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#f59e0b] transition flex items-center gap-1">
                  <span>प्रोजेक्ट्स (Projects)</span>
                  <ArrowUpRight size={14} className="opacity-50" />
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#f59e0b] transition flex items-center gap-1">
                  <span>कोटेशन / संपर्क</span>
                  <ArrowUpRight size={14} className="opacity-50" />
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#f59e0b] transition flex items-center gap-1 text-slate-400">
                  <span>एडमिन लॉगिन</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* SERVICES LIST */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              मुख्य कार्य
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>वाटर पाइपलाइन नेटवर्क</li>
              <li>हैवी एक्सकेवेशन (JCB/पोकलेन)</li>
              <li>सिविल व आरसीसी स्ट्रक्चर</li>
              <li>इंडस्ट्रियल पाइपलाइन</li>
              <li>बिल्डिंग व शेड कंस्ट्रक्शन</li>
              <li>ड्रेनेज व नाला निर्माण</li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              कार्यालय संपर्क
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#f59e0b] shrink-0 mt-0.5" />
                <span>इटारसी, मध्य प्रदेश, भारत</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#f59e0b] shrink-0" />
                <a href="tel:+916260879372" className="hover:text-[#f59e0b]">
                  +91 6260879372
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#f59e0b] shrink-0" />
                <a href="mailto:Palt51419@gmail.com" className="hover:text-[#f59e0b]">
                  Palt51419@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1 rounded-full font-medium">
                सोम - शनि : 8:00 AM - 7:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Deepak Construction. सर्वाधिकार सुरक्षित (All Rights Reserved).
          </p>
          <div className="flex items-center gap-4">
            <span className="text-amber-400/80">
              विश्वसनीयता • गुणवत्ता • समय की पाबंदी
            </span>
            <Link
              href="/login"
              className="text-slate-500 hover:text-white flex items-center gap-1 transition"
            >
              <Shield size={12} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}