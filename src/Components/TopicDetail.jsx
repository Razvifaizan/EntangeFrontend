import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHashtag } from 'react-icons/fa';
import '../assets/TopicDetail.css';
import AvtarImag from '../assets/avtar.png';
import Nav from './Nav';

const TopicDetail = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await axios.get(`https://entangen-api.onrender.com/api/topic/${topicId}`);
        setTopic(res.data);
      } catch (err) {
        console.error("Failed to fetch topic", err);
      }
    };
    fetchTopic();
  }, [topicId]);

  if (!topic) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (<>
  <Nav/>
  
  <div className="ps-2 pt-5 topic-detail-bg">
      <div className="card-topic shadow-lg p-4 border-0 rounded-4 pt-5">
        <h4 className="mb-4 topic-heading ">Inside the <span className='text-info'>{topic.title}</span> Course</h4>

        <div className="row g-4">
          <div className="col-md-7">
            {topic.subtopics.map((sub, index) => (
              <div className="subtopic-hover-wrap" key={index}>
                <div className="card subtopic-card-glow h-100">
                  <div className="card-body">
                    <h5 className="card-title d-flex align-items-center gap-2">
                      <FaHashtag /> {sub.title}
                    </h5>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-5 d-flex justify-content-end align-items-center">
            <img src={AvtarImag} alt="Avatar" width="100%" className="img-fluid avatar-float" />
          </div>
        </div>
      </div>
    </div>
  </>
   
  );
};

export default TopicDetail;
