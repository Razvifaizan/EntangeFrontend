import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("https://entangen-api.onrender.com/testimonial/getTeatimonial");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="testimonial-section-wrapper">
      <section className="testimonial-section" id="testimonials">
        <h2 className="section-title">Placed Students</h2>

        {testimonials.length > 0 ? (
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card1" key={t._id || i}>
                <img
                  src={t.image}
                  alt={t.name}
                  className="testimonial-image"
                />
                <h4 className=" text-light student-name">{t.name}</h4>
                <h5 className="  company-name">{t.company}</h5>
                <h6 className="package">{t.package}</h6>
              </div>
            ))}
          </div>
        ) : (
          <p className="loading-message">No testimonials found.</p>
        )}
      </section>
    </div>
  );
};

export default Testimonials;
