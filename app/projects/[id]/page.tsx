import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { MapPin, Calendar, Building2, CheckCircle2, PhoneCall, ArrowLeft, MessageCircle } from "lucide-react";

const FALLBACK_PROJECTS_DATA: Record<string, any> = {
  "fb-1": {
    title: "नर्मदा-मालवा वाटर पाइपलाइन नेटवर्क (Underground Pipeline)",
    description:
      "50+ किमी लंबी अंडरग्राउंड पेयजल पाइपलाइन ट्रेंचिंग, MS/HDPE पाइपलाइन जॉइंटिंग, वॉल्व चैंबर निर्माण और सफल हाइड्रोलिक टेस्टिंग कार्य।",
    location: "होशंगाबाद / इटारसी, मध्य प्रदेश",
    duration: "14 माह",
    client: "पब्लिक हेल्थ इंजीनियरिंग / प्राइवेट इंफ्रा",
    category: "Water Pipeline",
    status: "सफलतापूर्वक पूर्ण (Completed)",
    videoUrl: "/pipeline-video.mp4",
    imageUrl: "/pipeline.png",
  },
  "fb-2": {
    title: "इंडस्ट्रियल साइट एक्सकेवेशन व समतलीकरण (Site Excavation)",
    description:
      "आधुनिक JCB व पोकलेन फ्लीट द्वारा 20 एकड़ इंडस्ट्रियल लैंड की डीप रॉक कटाई, पाइपलाइन ट्रेंचिंग और सटीक ग्राउंड लेवलिंग कार्य।",
    location: "मंडीदीप इंडस्ट्रियल बेल्ट, म.प्र.",
    duration: "8 माह",
    client: "इंडस्ट्रियल वेयरहाउस व मैन्युफैक्चरिंग प्लांट",
    category: "Excavation Work",
    status: "सफलतापूर्वक पूर्ण (Completed)",
    videoUrl: "/Excavation-vid.mp4",
    imageUrl: "/excavation.png",
  },
  "fb-3": {
    title: "कमर्शियल आरसीसी फाउंडेशन व सिविल निर्माण (Civil Infrastructure)",
    description:
      "मजबूत हेवी लोड बेयरिंग फाउंडेशन, आरसीसी पिलर, रिटेनिंग वॉल, इंडस्ट्रियल शेड और टिकाऊ कंक्रीट स्ट्रक्चर का समयबद्ध निर्माण।",
    location: "भोपाल-इटारसी हाईवे कॉरिडोर",
    duration: "10 माह",
    client: "कमर्शियल लॉजिस्टिक्स हब",
    category: "Civil Construction",
    status: "सफलतापूर्वक पूर्ण (Completed)",
    videoUrl: "/civil-work.mp4",
    imageUrl: "/civil.png",
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectClient id={id} />;
}

async function ProjectClient({ id }: { id: string }) {
  let project: any = null;

  try {
    const projectRef = doc(db, "projects", id);
    const snapshot = await getDoc(projectRef);
    if (snapshot.exists()) {
      project = snapshot.data();
    }
  } catch (e) {
    console.log("Error querying Firestore for project", e);
  }

  if (!project && FALLBACK_PROJECTS_DATA[id]) {
    project = FALLBACK_PROJECTS_DATA[id];
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0c1017] text-white flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4">प्रोजेक्ट नहीं मिला</h2>
        <p className="text-slate-400 mb-8">Project Not Found</p>
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
    <main className="bg-[#f7f6f2] min-h-screen text-slate-900 overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center bg-[#0c1017] pt-20">
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/60 to-transparent" />

        <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl py-20">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            <span>सभी प्रोजेक्ट्स (All Projects)</span>
          </Link>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            {project.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg mt-6 leading-8 max-w-3xl mx-auto">
            {project.description}
          </p>
        </div>
      </section>

      {/* CONTENT & METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: DETAILS */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[3px] bg-[#f59e0b] rounded-full" />
              <p className="uppercase tracking-[3px] text-[#d97706] text-xs font-bold">
                Project Specifications • तकनीकी विवरण
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
              इंफ्रास्ट्रक्चर एग्जीक्यूशन डिटेल
            </h2>

            <p className="text-slate-600 text-base leading-8 mb-8">
              {project.description}
            </p>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Building2,
                  title: "क्लाइंट (Client)",
                  value: project.client || "Deepak Construction",
                },
                {
                  icon: Calendar,
                  title: "अवधि (Duration)",
                  value: project.duration || "Project-based",
                },
                {
                  icon: MapPin,
                  title: "साइट लोकेशन (Location)",
                  value: project.location || "Madhya Pradesh, India",
                },
                {
                  icon: CheckCircle2,
                  title: "गुणवत्ता स्तर (Standard)",
                  value: "100% Industrial Standard",
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#d97706] shrink-0">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-slate-900 font-bold text-sm mt-1">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CONTACT DIRECTLY FOR SIMILAR PROJECT */}
            <div className="mt-8 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="text-base font-black text-slate-900 mb-2">
                क्या आप भी ऐसा प्रोजेक्ट शुरू करना चाहते हैं?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                साइट विज़िट, टेक्निकल एस्टीमेट और फ्री कोटेशन के लिए हमारी टीम से संपर्क करें।
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+916260879372"
                  className="inline-flex items-center gap-2 bg-[#f59e0b] text-black px-5 py-2.5 rounded-full font-black text-xs hover:scale-105 transition shadow-md"
                >
                  <PhoneCall size={14} />
                  <span>+91 6260879372 पर कॉल करें</span>
                </a>
                <a
                  href={`https://wa.me/916260879372?text=${encodeURIComponent(
                    "नमस्ते Deepak Construction, मुझे इस प्रोजेक्ट जैसे कार्य के लिए कोटेशन चाहिए: " +
                      project.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-bold text-xs hover:scale-105 transition shadow-md"
                >
                  <MessageCircle size={14} />
                  <span>व्हाट्सएप पूछताछ</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: VIDEO OR IMAGE */}
          <div className="bg-slate-900 rounded-[32px] overflow-hidden border border-slate-200/80 shadow-2xl">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-[360px] sm:h-[480px] lg:h-[580px] object-cover"
              />
            ) : (
              <img
                src={project.imageUrl || "/img.png"}
                alt={project.title}
                className="w-full h-[360px] sm:h-[480px] lg:h-[580px] object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </main>
  );
}