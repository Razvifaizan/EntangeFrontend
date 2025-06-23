import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Home.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Course = () => {
  const navigate = useNavigate()
  const [course, setCourse] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await axios.get("https://entangen-api.onrender.com/api/courses");
      setCourse(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // delay between letters
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } },
  };

  const headingText = "Our Courses";

  return (
    <> 
   
       <div className="course-bg content-wrapper pt-3" id="courses">

      {/* Fixed Background Circles */}
      <div className="circle-bg">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>

      {/* Scrollable Content */}
     
        <div className="container pt-5 position-relative">
          <div className="heading-wrapper d-flex justify-content-center align-items-center flex-wrap text-center position-relative mb-5">
 
  

 
 <motion.h2
  className="advanced-heading d-flex gap-1 justify-content-center flex-wrap"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false }}
  whileHover={{
    scale: 1.05,
    textShadow: "0px 0px 8px #00ffd5",
  }}
  transition={{ type: "spring", stiffness: 300 }}
>
  {headingText.split("").map((char, index) => (
    <motion.span key={index} variants={letterVariants}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</motion.h2>

</div>
          <div className="row g-4">
            {course.map((courses, index) => (
              <div className="col-md-12" key={index}>
                <div className="d-flex align-items-center flex-wrap text-white">
                  
                  <h4 className="course-title">{courses.name}</h4>
                </div>

                <div className="row g-2 mt-3 justify-content-center">
                 {courses.subcategories.map((sub, idx) => (
  <motion.div
    className="col-lg-2 col-md-6 mb-4 ms-4 me-4"
    key={idx}
    whileHover={{ scale: 1.05, rotate: 1 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="animated-border-card">
      <div className="inner-card text-center">
        <img
          src={`${sub.image}`}
          alt={sub.name}
          className="card-img-top"
          style={{
            height: "140px",
            objectFit: "contain",
            padding: "1rem",
          }}
        />
        <h5 className="card-title pt-2 pb-3">{sub.name}</h5>
        <button className="view-btn mb-3" onClick={() => navigate(`/subcategory/${sub._id}`)}>View Details</button>
      </div>
    </div>
  </motion.div>
))}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Course;
