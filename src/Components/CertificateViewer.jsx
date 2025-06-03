import React, { useState } from 'react';
import axios from 'axios';
import '../assets/Certificate1.css';

const CertificateViewer = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');

  const fetchCertificate = async () => {
    try {
      const res = await axios.get(`https://entangen.onrender.com/certificate/getCertificate/${rollNumber}`);
      setCertificate(res.data);
      setError('');
    } catch (err) {
      setCertificate(null);
      setError('❌ Certificate not found or course incomplete');
    }
  };

  return (
    <div className="certificate-container">
      <h2 className="title">🎓 Find Your Certificate</h2>

      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        className="input-field"
      />

      <button onClick={fetchCertificate} className="search-button">
        🔍 Search
      </button>

      {error && <p className="error-message">{error}</p>}

      {certificate && (
        <div className="certificate-card">
          <p className='text-dark'><strong> Name:</strong> {certificate.name}</p>
          <p className='text-dark'><strong> Course:</strong> {certificate.course}</p>
          <p className='text-dark'><strong>Completion Date:</strong> {new Date(certificate.completionDate).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})}</p>
          <p className='text-dark'><strong>Certificate:</strong></p>

          {certificate.certificateUrl.endsWith('.pdf') ? (
            <a
              href={`https://entangen.onrender.com${certificate.certificateUrl}`}
              target="_blank"
              rel="noreferrer"
              className="view-btn1"
            >
              View Full Certificate
            </a>
          ) : (
            <>
              <img
                src={`https://entangen.onrender.com${certificate.certificateUrl}`}
                alt="Certificate"
                className="certificate-image"
              />
              <a
                href={`https://entangen.onrender.com${certificate.certificateUrl}`}
                target="_blank"
                rel="noreferrer"
                className="view-btn1"
              >
                View Full Certificate
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateViewer;
