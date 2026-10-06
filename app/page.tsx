import Navbar from "@/components/Navbar";
import Hero from "@/components/Heros";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main className="bg-[#f7f6f2] text-slate-900 overflow-hidden">
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  );
}