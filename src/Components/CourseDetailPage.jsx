import React, { useEffect, useState } from "react";
import axios from "axios";
import CoursePDF from "./CoursePDF"; // 👈 PDF component

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses/6825266d765d8eae127b965c")
      .then(res => setCourse(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <CoursePDF course={course} />
    </div>
  );
};

export default CourseDetailPage;
