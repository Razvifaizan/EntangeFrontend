import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaClock, FaLanguage, FaCertificate, FaUserTie } from 'react-icons/fa';
import { MdOutlineAccessTime } from "react-icons/md";

import '../assets/SubCat.css'
import bgimg from '../assets/binary.jpg'
import Nav from "./Nav";

const SubcategoryDetail = () => {
  const { id } = useParams();
  const [subcategory, setSubcategory] = useState(null);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const res = await axios.get(`https://entangen-api.onrender.com/api/getsubCaterory/${id}`);
        setSubcategory(res.data);
      } catch (err) {
        console.error("Failed to fetch subcategory details", err);
      }
    };
    fetchSubcategory();
  }, [id]);

  if (!subcategory) return <div className="text-center py-5">Loading...</div>;

  return (
    <>
      <Nav />
      <div
        className="subcat-background"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="subcat-overlay">
          <div className="container my-5">
            <div className="row">
              {/* Left Side */}
              <div className="col-md-8">
                <div className="card p-4 shadow-lg subcat-card">
                  <div className="text-center mb-4">
                    <img
                      src={`${subcategory.image}`}
                      alt={subcategory.name}
                      className="img-fluid subcat-image"
                      style={{ width: '190px', objectFit: 'contain' }}
                    />
                    <h2 className="pt-3">{subcategory.name}</h2>
                    <p>{subcategory.description}</p>
                  </div>
  
                  <h4 className="mb-3">Inside the Course</h4>
                  <ul className="list-group vertical-topic-list">
  {subcategory.topics.map((topic, index) => (
    <li key={index} className="list-group-item topic-item">
      <Link to={`/topic/${topic._id}`} className='Topic text-decoration-none'>
  {topic.title}
</Link>

    </li>
  ))}
</ul>

                </div>
              </div>
  
              {/* Right Side */}
              <div className="col-md-4">
                <div className="mt-5">
                  <div className="table-responsive">
                    <div className="course-feature">
                      <h3 className="">Course Feature</h3>
                    </div>
                    <table className="table table-bordered custom-vertical-table">
                      <tbody>
                        <tr>
                          <th className='font feature-table'><MdOutlineAccessTime style={{fontSize:"40px"}} /> Duration</th>
                          <td className='t-data'>{subcategory.duration}</td>
                        </tr>
                        <tr>
                          <th className='font feature-table'><FaLanguage style={{fontSize:"40px"}} /> Language</th>
                          <td className='t-data'>English / Hindi</td>
                        </tr>
                        <tr>
                          <th className='font feature-table'><FaCertificate style={{fontSize:"40px"}} /> Certificate</th>
                          <td className='t-data'>Yes</td>
                        </tr>
                        <tr>
                          <th className='font feature-table'><FaUserTie style={{fontSize:"40px"}} /> Expert Trainer</th>
                          <td className='t-data'>Yes</td>
                        </tr>
                        <tr>
                          <th className='font feature-table'><FaClock style={{fontSize:"40px"}} /> Flexible Timing</th>
                          <td className='t-data'>Yes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  
};

export default SubcategoryDetail;
