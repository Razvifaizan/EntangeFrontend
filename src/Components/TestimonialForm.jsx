import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Admin.css' // Import the CSS

const TestimonialForm = ({ fetchTestimonials, editTestimonial, setEditTestimonial }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editTestimonial) {
      setName(editTestimonial.name || '');
      setRating(editTestimonial.rating || 5);
      setReview(editTestimonial.review || '');
      setImage(null);
    } else {
      setName('');
      setRating(5);
      setReview('');
      setImage(null);
    }
  }, [editTestimonial]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !review || !rating) {
      alert('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rating', rating);
    formData.append('review', review);
    if (image) formData.append('image', image);

    try {
      if (editTestimonial) {
        await axios.put(`https://entangen.onrender.com/testimonial/updateTeatimonial/${editTestimonial._id}`, formData);
      } else {
        await axios.post('https://entangen.onrender.com/testimonial/addTestimonial', formData);
      }

      setEditTestimonial(null);
      fetchTestimonials();

      setName('');
      setRating(5);
      setReview('');
      setImage(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial.');
    }
  };

  return (
    <div className="form-card">
      <h2>{editTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <textarea
          placeholder="Review*"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">{editTestimonial ? 'Update' : 'Create'} Testimonial</button>
      </form>
    </div>
  );
};

export default TestimonialForm;
