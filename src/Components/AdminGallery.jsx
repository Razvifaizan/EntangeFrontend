import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const AdminGallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newMedia, setNewMedia] = useState({ name: "", type: "photo", file: null });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await axios.get("https://entangen-api.onrender.com/media/getMedia");
      setMediaList(res.data);
    } catch (err) {
      console.error("Error fetching media", err);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("name", newMedia.name);
    formData.append("type", newMedia.type);
    formData.append("image", newMedia.file); 

    try {
      await axios.post("https://entangen-api.onrender.com/media/addMedia", formData);
      fetchMedia();
      setNewMedia({ name: "", type: "photo", file: null });
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://entangen-api.onrender.com/media/deletMedia/${id}`);
      fetchMedia();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const filteredMedia = mediaList.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="admin-gallery container py-5">
      <h2 className="mb-4 text-center fw-bold text-primary">Admin Gallery Management</h2>

      {/* Upload Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5>Upload New Media</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Media Name</Form.Label>
            <Form.Control
              type="text"
              value={newMedia.name}
              onChange={(e) => setNewMedia({ ...newMedia, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Media Type</Form.Label>
            <Form.Select
              value={newMedia.type}
              onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Choose File</Form.Label>
            <Form.Control
              type="file"
              accept={newMedia.type === "photo" ? "image/*" : "video/*"}
              onChange={(e) => setNewMedia({ ...newMedia, file: e.target.files[0] })}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Form>
      </div>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-4">
        {["all", "photo", "video"].map((type) => (
          <button
            key={type}
            className={`btn mx-2 ${filter === type ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter(type)}
          >
            {type === "photo" ? "Photos" : type === "video" ? "Videos" : "All"}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="row g-4">
        {filteredMedia.map((item, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card shadow-sm p-3">
              {item.type === "photo" ? (
                <img
                  src={`${item.media}`}
                  alt={item.name}
                  className="img-fluid"
                />
              ) : (
                <video controls src={`${item.media}`} className="w-100" />
              )}
              <h6 className="mt-2">{item.name}</h6>
              <div className="d-flex justify-content-between mt-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
