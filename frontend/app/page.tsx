import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import WhyMe from "@/components/sections/WhyMe";
import Projects from "@/components/sections/Projects";
import GithubActivity from "@/components/sections/GithubActivity";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Testimonials from "@/components/sections/Testimonials";
import PhotoScroll from "@/components/sections/PhotoScroll";
import Contact from "@/components/sections/Contact";

export const revalidate = 3600;

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <MarqueeSection />
      <About />
      <Skills />
      <Services />
      <WhyMe />
      <Projects />
      <GithubActivity />
      <Experience />
      <Education />
      <Testimonials />
      <PhotoScroll />
      <Contact />
      <Footer />
    </main>
  );
}
