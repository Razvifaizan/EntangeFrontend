import React, { useEffect, useState } from 'react';

import '../assets/Home.css'
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";

function Nav() {

  const sections = [
    {id : "hero",  lable:"Home"},
    {id : "courses",  lable:"Courses"},
    {id : "gallery",  lable:"Gallery"},
    {id : "OurStudent",  lable:"Placement"},
    {id : "TieupCompanies",  lable:"Tie-up Companies"},
    {id : "ContactUs",  lable:"Contact Us"},
    

    // Our Students
  ]
  const [scrolled , setScrolled] = useState(null);
  const [activeLink , setActivelink] = useState('#hero')
  useEffect(()=>{
    const handleScrol = () =>{
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          if (
            scrollPos >= element.offsetTop &&
            scrollPos < element.offsetTop + element.offsetHeight
          ) {
            setActivelink(`#${section.id}`);
          }
        }
      });

      setScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScrol);
    return () => window.removeEventListener('scroll', handleScrol);
  }, [sections])

  const navbarStyle = {
    backgroundColor: scrolled ? "rgba(0, 0, 0, 0.25)" : "transparent",
    backdropFilter: scrolled ? "blur(10px)" : "none",
    boxShadow: scrolled ? "0 4px 12px rgba(0, 0, 0, 0.7)" : "none",
    transition: "all 0.5s ease",
  };



 

  const location = useLocation();

  const scrollToSection = (section) => {
    // If we're already on the homepage, scroll
    if (location.pathname === "/") {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Redirect to homepage with hash, then scroll
      window.location.href = `/#${section}`;
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg " style={navbarStyle}>
        <div className="container-fluid">
          <a className="navbar-brand " href="#">Navbar</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end me-5" id="navbarSupportedContent">
            

            <ul className="navbar-nav mb-2 mb-lg-0">
            {sections.map((section) => (
    <li
      key={section.id}
      className={`nav-item ${section.id === 'Post' || section.id === 'getVideo' ? 'special-link' : ''}`}
    >
      {(section.id === 'Post' || section.id === 'getVideo') ? (
        <Link
          to={section.id === 'Post' ? '/post' : '/gallery'}
          className={`nav-link nav-link-special ${activeLink === `#${section.id}` ? 'actives' : ''}`}
        >
          {section.lable}
        </Link>
      ) : (
        <a
          href={`/#${section.id}`}
          className={`nav-link ${activeLink === `#${section.id}` ? 'actives' : ''}`}
        >
          {section.lable}
        </a>
      )}
    </li>
  ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
