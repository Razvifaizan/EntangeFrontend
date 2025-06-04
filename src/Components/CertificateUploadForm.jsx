import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CertificateUploadForm = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    course: '',
    completionDate: '',
    certificateFile: null,
  });
  const [certificate, setCertificate] = useState([]);
  const [message, setMessage] = useState('');
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    certificateLoad();
  }, []);

  const certificateLoad = async () => {
    try {
      const res = await axios.get("https://entangen-api.onrender.com/Certificate/getAllCertificate");
      setCertificate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const certificateDelet = async (id) => {
    try {
      await axios.delete(`https://entangen-api.onrender.com/Certificate/deletCertificate/${id}`);
      certificateLoad();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'certificateFile') {
      setFormData({ ...formData, certificateFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('rollNumber', formData.rollNumber);
    data.append('name', formData.name);
    data.append('course', formData.course);
    data.append('completionDate', formData.completionDate);
    data.append('certificateFile', formData.certificateFile);

    try {
      await axios.post('https://entangen-api.onrender.com/certificate/add', data);
      setMessage('Certificate uploaded successfully!');
      setFormData({
        rollNumber: '',
        name: '',
        course: '',
        completionDate: '',
        certificateFile: null,
      });
      certificateLoad();
    } catch (err) {
      setMessage('Upload failed. Please check your input.');
    }
  };

  const handleEdit = (cert) => {
    setEditData(cert);
    setFormData({
      rollNumber: cert.rollNumber,
      name: cert.name,
      course: cert.course,
      completionDate: cert.completionDate.split('T')[0],
      certificateFile: null,
    });
    document.getElementById('editModal').style.display = 'block';
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append('rollNumber', formData.rollNumber);
    data.append('name', formData.name);
    data.append('course', formData.course);
    data.append('completionDate', formData.completionDate);
    if (formData.certificateFile) {
      data.append('certificateFile', formData.certificateFile);
    }

    try {
      await axios.put(`https://entangen-api.onrender.com/Certificate/certificate/${editData._id}`, data);
      setEditData(null);
      setFormData({
        rollNumber: '',
        name: '',
        course: '',
        completionDate: '',
        certificateFile: null,
      });
      certificateLoad();
      document.getElementById('editModal').style.display = 'none';
    } catch (err) {
      console.log("Update error", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Upload Certificate</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-2">
          <input type="text" name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-2">
          <input type="text" name="course" placeholder="Course Name" value={formData.course} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-2">
          <input type="date" name="completionDate" value={formData.completionDate} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-2">
          <input type="file" name="certificateFile" onChange={handleChange} className="form-control" accept="image/*,.pdf" required />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>

      {message && <p>{message}</p>}

      <h4 className="mt-4">All Certificates</h4>
      <div className="row">
        {certificate.map(c => (
          <div className="col-md-4 mb-4" key={c._id}>
            <div className="card">
              <img src={`${c.certificateUrl}`} className="card-img-top" alt="Certificate" style={{ height: '250px' }} />
              <div className="card-body">
                <h5 className="card-title">Name: {c.name}</h5>
                <p className="card-text">Roll No: {c.rollNumber}</p>
                <p className="card-text">Course: {c.course}</p>
                <p className="card-text">Date: {new Date(c.completionDate).toLocaleDateString()}</p>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(c)}>Update</button>
                <button className="btn btn-danger" onClick={() => certificateDelet(c._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <div className="modal" tabIndex="-1" id="editModal" style={{ display: "none", background: "#000000aa" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Certificate</h5>
              <button type="button" className="btn-close" onClick={() => document.getElementById('editModal').style.display = 'none'}></button>
            </div>
            <div className="modal-body">
              <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} className="form-control mb-2" required />
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control mb-2" required />
              <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} className="form-control mb-2" required />
              <input type="date" name="completionDate" value={formData.completionDate} onChange={handleChange} className="form-control mb-2" required />
              <input type="file" name="certificateFile" onChange={handleChange} className="form-control" accept="image/*,.pdf" />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => document.getElementById('editModal').style.display = 'none'}>Cancel</button>
              <button className="btn btn-success" onClick={handleUpdate}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateUploadForm;
