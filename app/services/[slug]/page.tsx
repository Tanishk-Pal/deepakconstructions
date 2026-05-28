import Link from "next/link";

const services: any = {
    "water-pipeline-installation": {
        title: "Water Pipeline Installation",
        image: "/pipeline.png",
        gallery: ["/pipeline1.png", "/pipeline2.png", "/pipeline3.png"],
        video: "/pipeline-video.mp4",
        description:
            "Deepak Construction provides professional underground and industrial water pipeline installation services using advanced machinery, precision engineering and durable infrastructure systems.",
        details:
            "Our team specializes in large-scale water pipeline projects for industrial, municipal and commercial sectors. We ensure efficient execution, safety standards and long-term durability in every project.",
    },

    "civil-construction": {
        title: "Civil Construction",
        image: "/building.png",
        gallery: ["/civil1.png", "/civil2.png", "/civil3.png"],
        video: "/civil-work.mp4",
        description:
            "Complete civil infrastructure solutions including structural foundations, RCC work and industrial construction.",
        details:
            "We deliver high-quality civil engineering projects with modern construction techniques and experienced project execution teams.",
    },

    "excavation-work": {
        title: "Excavation Work",
        image: "/excavation.png",
        gallery: ["/excavation1.png", "/excavation2.png", "/excavation3.png"],
        video: "/Excavation-vid.mp4",
        description:
            "Advanced excavation operations using modern heavy machinery and skilled operators.",
        details:
            "Our excavation services support industrial pipelines, roadwork, drainage systems and large-scale infrastructure development.",
    },

    "industrial-pipeline-systems": {
        title: "Industrial Pipeline Systems",
        image: "/industrial.png",
        gallery: ["/drainage.png", "/excavation.png", "/pipeline.png"],
        video: "/Excavation-vid.mp4",
        description:
            "Industrial-grade pipeline systems designed for performance, durability and operational safety.",
        details:
            "We engineer and install industrial pipeline systems capable of supporting high-performance infrastructure environments.",
    },

    "building-construction": {
        title: "Building Construction",
        image: "/building.png",
        gallery: ["/JCB.png", "/building.png", "/img.png"],
        video: "/civil-work.mp4",
        description:
            "Professional building construction services from foundation to structural execution.",
        details:
            "We provide commercial and industrial construction services with modern architectural and engineering standards.",
    },

    "drainage-infrastructure": {
        title: "Drainage Infrastructure",
        image: "/drainage.png",
        gallery: ["/industrial.png", "/JCB.png", "/drainage.png"],
        video: "/drainage-video.mp4",
        description:
            "Efficient drainage and wastewater infrastructure systems for urban and industrial development.",
        details:
            "Our drainage infrastructure projects are engineered for efficiency, reliability and environmental sustainability.",
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
            <div className="bg-black text-white min-h-screen flex items-center justify-center px-6 text-3xl md:text-5xl font-bold text-center">
                Service Not Found
            </div>
        );
    }

    return (
        <main className="bg-[#f5f3ee] text-black min-h-screen overflow-hidden">
            {/* HERO */}
            <section className="relative min-h-[75vh] md:min-h-[85vh] overflow-hidden flex items-center justify-center">
                <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/65" />

                <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl pt-24">
                    <p className="uppercase tracking-[4px] sm:tracking-[6px] text-[#d89b1d] mb-5 sm:mb-6 font-semibold text-xs sm:text-sm">
                        Deepak Construction
                    </p>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.02] tracking-[-2px]">
                        {service.title}
                    </h1>

                    <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-6 sm:mt-10 leading-8 sm:leading-10">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* ABOUT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 sm:w-12 h-[2px] bg-[#d89b1d]" />

                            <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d89b1d] text-xs sm:text-sm font-semibold">
                                Professional Infrastructure
                            </p>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-8 md:mb-10">
                            Engineering Excellence
                            <span className="text-[#d89b1d]"> In Every Project</span>
                        </h2>

                        <p className="text-gray-700 text-base sm:text-lg leading-8 sm:leading-10">
                            {service.details}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-10 md:mt-14">
                            <div className="bg-white p-6 sm:p-8 rounded-[24px] sm:rounded-3xl shadow-sm border border-black/5">
                                <h3 className="text-4xl sm:text-5xl font-black text-[#d89b1d]">
                                    50+
                                </h3>
                                <p className="text-gray-600 mt-3">Projects Completed</p>
                            </div>

                            <div className="bg-white p-6 sm:p-8 rounded-[24px] sm:rounded-3xl shadow-sm border border-black/5">
                                <h3 className="text-4xl sm:text-5xl font-black text-[#d89b1d]">
                                    10+
                                </h3>
                                <p className="text-gray-600 mt-3">Years Experience</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img
                            src={service.image}
                            alt={service.title}
                            className="rounded-[24px] sm:rounded-[35px] shadow-2xl w-full h-[320px] sm:h-[480px] lg:h-[650px] object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section className="bg-white py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="mb-14 md:mb-20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 sm:w-12 h-[2px] bg-[#d89b1d]" />

                            <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d89b1d] text-xs sm:text-sm font-semibold">
                                Completed Projects
                            </p>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black">
                            Our Project Gallery
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
                        {service.gallery.map((img: string, index: number) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-[24px] sm:rounded-[30px] group"
                            >
                                <img
                                    src={img}
                                    alt={`${service.title} gallery ${index + 1}`}
                                    className="w-full h-[260px] sm:h-[340px] md:h-[420px] object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO */}
            <section className="bg-[#111111] text-white py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 sm:w-12 h-[2px] bg-[#d89b1d]" />

                                <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#d89b1d] text-xs sm:text-sm font-semibold">
                                    Live Execution
                                </p>
                            </div>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-8 md:mb-10">
                                Real Infrastructure
                                <span className="text-[#d89b1d]"> Development</span>
                            </h2>

                            <p className="text-gray-400 text-base sm:text-lg leading-8 sm:leading-10">
                                Our experienced engineering teams execute every project using
                                modern machinery, technical precision and industry-standard
                                safety practices.
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
                                className="rounded-[24px] sm:rounded-[35px] w-full shadow-2xl border border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-black text-white py-20 md:py-32">
                <div className="absolute top-0 left-[-20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#d89b1d]/10 blur-[90px] md:blur-[140px] rounded-full" />

                <div className="relative z-20 max-w-5xl mx-auto text-center px-4 sm:px-6">
                    <p className="uppercase tracking-[4px] sm:tracking-[6px] text-[#d89b1d] mb-6 font-semibold text-xs sm:text-sm">
                        Start Your Project
                    </p>

                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
                        Building Reliable
                        <span className="block text-[#d89b1d] mt-2 md:mt-3">
                            Infrastructure
                        </span>
                    </h2>

                    <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-8 sm:leading-10 mt-8 sm:mt-12 max-w-3xl mx-auto">
                        Contact Deepak Construction for professional infrastructure,
                        excavation, pipeline and industrial construction services engineered
                        for long-term reliability.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-10 sm:mt-16">
                        <Link href="/#contact" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-[#d89b1d] text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold hover:scale-105 transition duration-300 shadow-[0_0_50px_rgba(216,155,29,0.35)]">
                                Contact Us
                            </button>
                        </Link>

                        <Link href="/" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto border border-white/10 bg-white/[0.03] backdrop-blur-md px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold hover:border-[#d89b1d] hover:text-[#d89b1d] transition duration-300">
                                Back To Home
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}