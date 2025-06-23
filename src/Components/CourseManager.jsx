import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Style/Admin.css'

const CourseManager = () => {

  const [courseName, setCourseName] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryImage, setSubcategoryImage] = useState(null);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [fees, setFees] = useState(''); 
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [subTopicTitle, setSubTopicTitle] = useState('');
  const [subTopicVideoUrl, setSubTopicVideoUrl] = useState('');

  useEffect(() => {
    loadCourselist();
  }, []);

  const loadCourselist = async () => {
    try {
      const response = await axios.get('https://entangen-api.onrender.com/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', courseName);
    formData.append('image', courseImage);

    try {
      await axios.post('https://entangen-api.onrender.com/api/course', formData);
      alert("Course Added");
      setCourseName('');
      setCourseImage(null);
      loadCourselist();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) return alert("Select a course");

    const formData = new FormData();
    formData.append('name', subcategoryName);
    formData.append('image', subcategoryImage);
    formData.append('course', selectedCourseId);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('fees', fees); 

    try {
      await axios.post('https://entangen-api.onrender.com/api/subcategory', formData);
      alert("Subcategory Added");
      setSubcategoryName('');
      setSubcategoryImage(null);
      setDescription('');
      setDuration('');
      setFees(''); 
      loadCourselist();
    } catch (err) {
      alert("Error: " + err);
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!selectedSubcategoryId) return alert("Select a subcategory");

    try {
      await axios.post(`https://entangen-api.onrender.com/api/addTopic/${selectedSubcategoryId}`, {
        title: topicTitle,
        videoUrl
      });
      alert("Topic Added");
      setTopicTitle('');
      setVideoUrl('');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleAddSubTopic = async (e) => {
    e.preventDefault();
    if (!selectedTopicId) return alert("Select a topic");

    try {
      await axios.post(`https://entangen-api.onrender.com/api/topic/${selectedTopicId}/subtopic`, {
        title: subTopicTitle,
        videoUrl: subTopicVideoUrl
      });
      alert("Sub-topic Added");
      setSubTopicTitle('');
      setSubTopicVideoUrl('');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
     <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Add Courses, Subcategories & Topics</h2>

      <div className="row">
        {/* Course Form */}
        <div className="col-md-4 mb-4">
          <div className="card p-4">
            <h4 className='text-dark'>Add Course</h4>
            <form onSubmit={handleAddCourse}>
              <input type="text" className="form-control mb-3" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
              <input type="file" className="form-control mb-3" onChange={(e) => setCourseImage(e.target.files[0])} accept="image/*" />
              <button className="btn btn-primary w-100">Add Course</button>
            </form>
          </div>
        </div>

        {/* Subcategory Form */}
        <div className="col-md-4 mb-4">
          <div className="card p-4">
            <h4 className='text-dark'>Add Subcategory</h4>
            <form onSubmit={handleAddSubcategory}>
              <select className="form-control mb-3" onChange={(e) => setSelectedCourseId(e.target.value)} required>
                <option value="">Select Course</option>
                {courses.map(course => (
                  console.log(course._id),
                  <option key={course._id} value={course._id}>{course.name}</option>
                 
                ))}
              </select>
              <input type="text" className="form-control mb-3" placeholder="Subcategory Name" value={subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} required />
              <input type="file" className="form-control mb-3" onChange={(e) => setSubcategoryImage(e.target.files[0])} accept="image/*" />
              <textarea className="form-control mb-3" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} required></textarea>
              <input type="text" className="form-control mb-3" placeholder="Duration (e.g. 3 weeks)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
              <input type="text" className="form-control mb-3" placeholder="Fees (e.g. ₹2000)" value={fees} onChange={(e) => setFees(e.target.value)} required />
              <button className="btn btn-success w-100">Add Subcategory</button>
            </form>
          </div>
        </div>

        {/* Topic Form */}
        <div className="col-md-4 mb-4">
          <div className="card p-4">
            <h4 className='text-dark'>Add Topic</h4>
            <form onSubmit={handleAddTopic}>
              <select className="form-control mb-3" onChange={(e) => setSelectedSubcategoryId(e.target.value)} required>
                <option value="">Select Subcategory</option>
                {courses.map(course => (
                  course.subcategories?.map(sub => (
                    <option key={sub._id} value={sub._id}>{course.name} - {sub.name}</option>
                  ))
                ))}
              </select>
              <input type="text" className="form-control mb-3" placeholder="Topic Title" value={topicTitle} onChange={(e) => setTopicTitle(e.target.value)} required />
              <button className="btn btn-info w-100">Add Topic</button>
            </form>
          </div>
        </div>

        {/* Sub-topic Form */}
        <div className="col-md-4 mb-4">
          <div className="card p-4">
            <h4 className='text-dark'>Add Sub-topic</h4>
            <form onSubmit={handleAddSubTopic}>
              <select className="form-control mb-3" onChange={(e) => setSelectedTopicId(e.target.value)} required>
                <option value="">Select Topic</option>
                {courses.map(course =>
                  course.subcategories?.map(sub =>
                    sub.topics?.map(topic => (
                      <option key={topic._id} value={topic._id}>
                        {course.name} - {sub.name} - {topic.title}
                      </option>
                    ))
                  )
                )}
              </select>
              <input type="text" className="form-control mb-3" placeholder="Sub-topic Title" value={subTopicTitle} onChange={(e) => setSubTopicTitle(e.target.value)} required />
              <input type="text" className="form-control mb-3" placeholder="Video URL" value={subTopicVideoUrl} onChange={(e) => setSubTopicVideoUrl(e.target.value)} required />
              <button className="btn btn-warning w-100">Add Sub-topic</button>
            </form>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default CourseManager;
