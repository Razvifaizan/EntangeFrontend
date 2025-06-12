import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Style/Admin.css';

const TestimonialForm = ({ fetchTestimonials, editTestimonial, setEditTestimonial }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [studentPackage, setStudentPackage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editTestimonial) {
      setName(editTestimonial.name || '');
      setCompany(editTestimonial.company || '');
      setStudentPackage(editTestimonial.package || '');
      setImage(null); // image not shown, only updated if new selected
    } else {
      setName('');
      setCompany('');
      setStudentPackage('');
      setImage(null);
    }
  }, [editTestimonial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !company || !studentPackage) {
      alert('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('company', company);
    formData.append('package', studentPackage);
    if (image) formData.append('image', image);

    try {
      if (editTestimonial) {
        await axios.put(
          `https://entangen-api.onrender.com/testimonial/updateTeatimonial/${editTestimonial._id}`,
          formData
        );
        alert('Testimonial updated successfully');
      } else {
        await axios.post(
          'https://entangen-api.onrender.com/testimonial/addTestimonial',
          formData
        );
        alert('Testimonial added successfully');
      }

      setName('');
      setCompany('');
      setStudentPackage('');
      setImage(null);
      setEditTestimonial(null);
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial.');
    }
  };

  return (
    <div className="modern-form-card mt-5">
      <h2 className="text-center fw-bold mb-4 text-primary">
        {editTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Student Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Company Name*"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Package (e.g., 6 LPA)*"
          value={studentPackage}
          onChange={(e) => setStudentPackage(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">
          {editTestimonial ? 'Update' : 'Create'} Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
