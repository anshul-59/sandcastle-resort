"use client";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Gallery from "./components/Gallery";
import Experiences from "./components/Experiences";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="page-flow">
        <Hero />
        <About />
        <Rooms />
        <Gallery />
        <Experiences />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}