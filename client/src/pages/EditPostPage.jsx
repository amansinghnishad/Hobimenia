import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import AIHelperButton from "../components/AIHelperButton";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";
import "../css/pagesCSS/EditPostPage.css";

const CATEGORIES = [
  "Tech",
  "Photography",
  "Designing",
  "Drawing",
  "Music",
  "Writing",
  "Gaming",
  "Travel",
  "Food",
  "Lifestyle",
  "Other",
];

const EditPostPage = () => {
  const { id } = useParams(); // Post ID
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]); // Add category state
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch current post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCaption(res.data.caption);
        setCurrentImage(res.data.imageUrl); // assuming the image URL is returned
        setCategory(res.data.category || CATEGORIES[0]); // Set category from fetched post, or default
      } catch (err) {
        console.error("Failed to fetch post", err);
        toast.error("Failed to load post data."); // Notify user
      }
    };
    if (token && id) {
      // Ensure token and id are present before fetching
      fetchPost();
    }
  }, [id, token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      toast.error("Caption cannot be empty.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("category", category); // Add category to formData
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await api.put(`/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post updated!");
      setTimeout(() => navigate("/home"), 1500); // Redirect to home after update
    } catch (err) {
      console.error("Failed to update post", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="edit-postpage-outer">
        <div className="edit-postpage-card">
          <h2 className="edit-postpage-title">Edit Post</h2>
          <form onSubmit={handleSubmit} className="edit-postpage-form">
            {/* Category Selection Dropdown */}
            <div className="edit-postpage-form-group">
              <label htmlFor="category" className="edit-postpage-label">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="edit-postpage-select" // You might need to add styling for this class
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-postpage-form-group">
              <textarea
                placeholder="Edit your caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                className="edit-postpage-textarea"
              />
              <div className="edit-postpage-markdown-preview">
                <ReactMarkdown>{caption}</ReactMarkdown>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="edit-postpage-file-input"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="edit-postpage-img-preview"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "384px",
                  objectFit: "contain",
                }}
              />
            )}
            <button
              type="submit"
              disabled={loading}
              className="edit-postpage-submit-btn"
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPostPage;
