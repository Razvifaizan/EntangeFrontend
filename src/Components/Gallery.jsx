import React, { useState, useEffect } from "react";
import "../assets/gallery.css";
import { motion } from "framer-motion";

import axios from "axios";
const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [media, setMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("https://entangen-api.onrender.com/media/getMedia"); 
        setMedia(response.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };
    fetchMedia();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } },
  };

  const headingText = "Gallery";

  const filteredMedia = media.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const openModal = (mediaUrl) => {
    setModalImage(mediaUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="blur-border-box">
      <div className="g-section pt-4">
        <div className="container py-5">
          <div className="heading-wrapper d-flex justify-content-center align-items-center flex-wrap text-center position-relative mb-5">
            <motion.h2
              className="advanced-heading d-flex gap-1 justify-content-center flex-wrap"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              whileHover={{
                scale: 1.05,
                color: "#00ffd5",
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

          <div className="d-flex justify-content-center mb-4 gallery-tabs">
            {["all", "photo", "video"].map((type) => (
              <button
                key={type}
                className={`btn mx-2 ${filter === type ? "btn-active" : "btn-outline"}`}
                onClick={() => setFilter(type)}
              >
                {type === "photo" ? "Photos" : type === "video" ? "Videos" : "All"}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filteredMedia.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="media-card">
                  {item.type === "photo" ? (
                    <img
                      src={`${item.media}`} 
                      alt={item.name}
                      className="img-fluid media-img"
                      onClick={() => openModal(`${item.media}`)}
                    />
                  ) : (
                    <video
                      controls
                      className="w-100 media-video"
                      src={`${item.media}`}
                    />
                  )}
                  <p className="p-2">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>
            <img
              src={modalImage}
              alt="Full Screen"
              className="modal-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
