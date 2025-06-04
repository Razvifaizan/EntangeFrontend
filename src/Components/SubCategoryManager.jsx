import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Collapse,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';
import '../assets/Style/Admin.css';

const AdminCourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState('');
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [topicsModal, setTopicsModal] = useState({ show: false, topic: null });
  const [subtopicModal, setSubtopicModal] = useState({ show: false, subtopic: null });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://entangen-api.onrender.com/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (url, confirmMsg) => {
    if (window.confirm(confirmMsg)) {
      await axios.delete(url);
      loadCourses();
    }
  };

  const handleEdit = (type, data) => {
    setEditType(type);
    setEditData(data);
    setShowModal(true);
  };

  const handleEditTopic = (topic) => {
    setTopicsModal({ show: true, topic });
  };

  const handleEditSubtopic = (subtopic) => {
    setSubtopicModal({ show: true, subtopic });
  };

  const handleUpdate = async () => {
    try {
      const endpoint = editType === 'course' ? `course/${editData._id}` : `subcategory/${editData._id}`;
      let payload;

      if (editType === 'subcategory' && editData.imageFile) {
        payload = new FormData();
        payload.append('name', editData.name);
        payload.append('description', editData.description);
        payload.append('duration', editData.duration);
        payload.append('image', editData.imageFile);
      }

      await axios.put(`api/${endpoint}`, payload || editData, {
        headers: payload ? { 'Content-Type': 'multipart/form-data' } : undefined,
      });

      setShowModal(false);
      setEditData({});
      loadCourses();
    } catch (err) {
      console.error('Error updating:', err);
    }
  };

  const handleTopicUpdate = async () => {
    try {
      await axios.put(`api/topicUpdate/${topicsModal.topic._id}`, topicsModal.topic);
      setTopicsModal({ show: false, topic: null });
      loadCourses();
    } catch (err) {
      console.error('Failed to update topic:', err);
    }
  };

  const handleSubtopicUpdate = async () => {
    try {
      const { topicId, _id, title } = subtopicModal.subtopic;
      await axios.put(`api/topic/${topicId}/subtopic/${_id}`, { title });
      setSubtopicModal({ show: false, subtopic: null });
      loadCourses();
    } catch (err) {
      console.error('Failed to update subtopic:', err);
    }
  };

  return (
    <div className="container-fluid my-4">
      <h3 className="text-center fw-bold mb-4 text-primary">Courses, Subcategories & Topics</h3>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table responsive bordered hover className="table-striped shadow-sm table-custom">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Subcategories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <React.Fragment key={course._id}>
                <tr className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td className="fw-semibold">{course.name}</td>
                  <td className="text-center">
                    <Button
                      variant={openRows[course._id] ? 'secondary' : 'info'}
                      size="sm"
                      onClick={() => toggleRow(course._id)}
                    >
                      {openRows[course._id] ? 'Hide' : 'Show'}
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEdit('course', course)}>
                      ✏️ Update
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(`api/course/${course._id}`, 'Delete this course?')}>
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-0">
                    <Collapse in={openRows[course._id]}>
                      <div className="p-3 bg-light rounded sub-table">
                        <Table size="sm" bordered responsive>
                          <thead className="table-secondary">
                            <tr>
                              <th>Image</th>
                              <th>Subcategory Name</th>
                              <th>Topics</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {course.subcategories.map((sub) => (
                              <tr key={sub._id}>
                                <td>
                                  <img src={sub.image} alt={sub.name} width="60" height="40" className="rounded shadow-sm" />
                                </td>
                                <td className="fw-medium">{sub.name}</td>
                                <td>
                                  <ul className="list-group">
                                    {sub.topics.map((topic, idx) => (
                                      <li key={topic._id} className="list-group-item d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold text-primary">{idx + 1}. {topic.title}</div>
                                          {topic.subtopics?.map((subtopic, subIdx) => (
                                            <li key={subtopic._id} className="list-group-item d-flex justify-content-between align-items-center">
                                              <div>{subIdx + 1}. {subtopic.title}</div>
                                              <div className='ms-4'>
                                                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditSubtopic({ ...subtopic, topicId: topic._id })}>✏️</Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(`api/topic/${topic._id}/subtopic/${subtopic._id}`, 'Delete this subtopic?')}>🗑️</Button>
                                              </div>
                                            </li>
                                          ))}
                                        </div>
                                        <div>
                                          <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditTopic(topic)}>✏️</Button>
                                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(`api/topicDeleate/${topic._id}`, 'Delete this topic?')}>🗑️</Button>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td>
                                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit('subcategory', sub)}>✏️ Update</Button>
                                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(`api/subcategory/${sub._id}`, 'Delete this subcategory?')}>🗑️ Delete</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}

      {/* Course / Subcategory Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update {editType === 'course' ? 'Course' : 'Subcategory'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Form.Group>

            {editType === 'subcategory' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={editData.description || ''}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.duration || ''}
                    onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditData({ ...editData, imageFile: e.target.files[0] })}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Topic Edit Modal */}
      <Modal show={topicsModal.show} onHide={() => setTopicsModal({ show: false, topic: null })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={topicsModal.topic?.title || ''}
                onChange={(e) =>
                  setTopicsModal((prev) => ({
                    ...prev,
                    topic: { ...prev.topic, title: e.target.value },
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setTopicsModal({ show: false, topic: null })}>Cancel</Button>
          <Button variant="primary" onClick={handleTopicUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Subtopic Edit Modal */}
      <Modal show={subtopicModal.show} onHide={() => setSubtopicModal({ show: false, subtopic: null })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subtopic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={subtopicModal.subtopic?.title || ''}
                onChange={(e) =>
                  setSubtopicModal((prev) => ({
                    ...prev,
                    subtopic: { ...prev.subtopic, title: e.target.value },
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSubtopicModal({ show: false, subtopic: null })}>Cancel</Button>
          <Button variant="primary" onClick={handleSubtopicUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminCourseTable;
