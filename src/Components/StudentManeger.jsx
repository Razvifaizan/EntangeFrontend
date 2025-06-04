import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Style/Student.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import TestimonialForm from './TestimonialForm';

const StudentManeger = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    review: '',
    image: null,
    hover: 0
  });

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('https://entangen-api.onrender.com/testimonial/getTeatimonial');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`https://entangen-api.onrender.com/testimonial/deletTeatimonial/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditClick = (testimonial) => {
    setEditTestimonial(testimonial._id);
    setFormData({
      name: testimonial.name || '',
      rating: testimonial.rating || 0,
      review: testimonial.review || '',
      image: null,
      hover: 0
    });
  };

  const handleFormSubmit = async (e, id) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('rating', formData.rating);
    updatedData.append('review', formData.review);
    if (formData.image) updatedData.append('image', formData.image);

    try {
      await axios.put(`https://entangen-api.onrender.com/testimonial/updateTeatimonial/${id}`, updatedData);
      setEditTestimonial(null);
      setFormData({ name: '', rating: 0, review: '', image: null, hover: 0 });
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fas fa-star`}
        style={{
          color: i < rating ? '#FFD700' : '#ccc',
          marginRight: '5px'
        }}
      ></i>
    ));
  };

  const renderInteractiveStars = () => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className="fas fa-star"
        onClick={() => setFormData({ ...formData, rating: i + 1 })}
        onMouseEnter={() => setFormData({ ...formData, hover: i + 1 })}
        onMouseLeave={() => setFormData({ ...formData, hover: 0 })}
        style={{
          color: i < (formData.hover || formData.rating) ? '#FFD700' : '#ccc',
          marginRight: '5px',
          cursor: 'pointer',
          fontSize: '20px',
          transition: 'color 0.2s ease'
        }}
      ></i>
    ));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  

  return (
    <div className="admin-panel">
      <h1 className="text-center fw-bold mb-4 text-primary"> Manage Testimonials</h1>

      <h2>Testimonials List</h2>
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="testimonial-card">
            {editTestimonial === testimonial._id ? (
              <form
                onSubmit={(e) => handleFormSubmit(e, testimonial._id)}
                className="inline-form"
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
                <div className="rating-stars">
                  {renderInteractiveStars()}
                </div>
                <textarea
                  name="review"
                  placeholder="Review"
                  value={formData.review}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFormChange}
                />
                <div className="testimonial-actions">
                  <button type="submit" className="save-btn">Save</button>
                  <button type="button" className="cancel-btn" onClick={() => setEditTestimonial(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <img
                  src={`${testimonial.image}`}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
                <div className="testimonial-content">
                  <h3>{testimonial.name}</h3>
                  <p><strong>Rating:</strong> {renderStars(testimonial.rating)}</p>
                  <p>{testimonial.review}</p>
                  <div className="testimonial-actions">
                    <button className="edit-btn" onClick={() => handleEditClick(testimonial)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteTestimonial(testimonial._id)}>Delete</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <TestimonialForm/>
    </div>
  );
};

export default StudentManeger;
