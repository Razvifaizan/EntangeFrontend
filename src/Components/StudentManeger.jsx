import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Style/Student.css';
import TestimonialForm from './TestimonialForm';

const StudentManeger = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editTestimonial, setEditTestimonial] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        'https://entangen-api.onrender.com/testimonial/getTeatimonial'
      );
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(
        `https://entangen-api.onrender.com/testimonial/deletTeatimonial/${id}`
      );
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditTestimonial({ ...editTestimonial, image: files[0] });
    } else {
      setEditTestimonial({ ...editTestimonial, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editTestimonial.name);
    formData.append('company', editTestimonial.company);
    formData.append('package', editTestimonial.package);
    if (editTestimonial.image instanceof File) {
      formData.append('image', editTestimonial.image);
    }

    try {
      await axios.put(
        `https://entangen-api.onrender.com/testimonial/updateTeatimonial/${editTestimonial._id}`,
        formData
      );
      setEditTestimonial(null);
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="admin-panel">
      <h1 className="text-center fw-bold mb-4 text-primary">Manage Students</h1>

      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="testimonial-card">
            {editTestimonial && editTestimonial._id === testimonial._id ? (
              <form
                onSubmit={handleUpdate}
                encType="multipart/form-data"
                className="inline-form"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editTestimonial.name}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={editTestimonial.company}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="package"
                  placeholder="Package"
                  value={editTestimonial.package}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleEditChange}
                />
                <div className="testimonial-actions">
                  <button type="submit" className="save-btn">Save</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setEditTestimonial(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image rounded"
                />
                <div className="testimonial-content">
                  <h3 className='text-dark'>{testimonial.name}</h3>
                  <p className='text-dark'><strong>Company:</strong> {testimonial.company}</p>
                  <p className='text-dark'><strong>Package:</strong> {testimonial.package}</p>
                  <div className="testimonial-actions">
                    <button
                      className="edit-btn"
                      onClick={() => setEditTestimonial(testimonial)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTestimonial(testimonial._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <TestimonialForm
        fetchTestimonials={fetchTestimonials}
        editTestimonial={editTestimonial}
        setEditTestimonial={setEditTestimonial}
      />
    </div>
  );
};

export default StudentManeger;
