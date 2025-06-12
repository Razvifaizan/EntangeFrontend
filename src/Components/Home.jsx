import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Course from "./Course.jsx"
import Gallery from "./Gallery.jsx";
import HeroSection from "./Herosection.jsx";
import ContactUs from "./ContactUs.jsx";
import Testimonials from "./Testimonials.jsx";
import Footer from "./Footer.jsx";
// import Certificate from "../../../backend/models/Certificate.js";
import CertificateChecker from "./CertificateViewer.jsx";
import TieupCompanies from "./TieupCompanies.jsx";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.substring(1));
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

 return(
    <>
  <Nav />
  
  <section id="hero">
    <HeroSection />
  </section>

  <section id="courses">
    <Course />
  </section>

  <section id="gallery">
    <Gallery />
  </section>

  <section id="OurStudent">
    <Testimonials />
  </section>

  <section id="TieupCompanies">
    <TieupCompanies/>
  </section>


   <section id="ContactUs">
    <ContactUs />
  </section>
  <section id="ContactUs">
    <CertificateChecker />
  </section>

  <section id="ContactUs">
    <Footer />
  </section>

  

</>)
};

export default Home
