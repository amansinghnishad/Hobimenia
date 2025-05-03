import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import AIHelperButton from "../components/AIHelperButton";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";
import "../css/pagesCSS/CreatePostPage.css";

const CreatePostPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await api.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post created successfully!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error("Failed to create post", err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-postpage-outer">
        <div className="create-postpage-card">
          <h2 className="create-postpage-title">Create New Post</h2>
          <form onSubmit={handleSubmit} className="create-postpage-form">
            <div className="create-postpage-form-group">
              <textarea
                placeholder="Write your caption or thought using Markdown..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                className="create-postpage-textarea"
              />
              <div className="create-postpage-markdown-preview">
                <ReactMarkdown>{caption}</ReactMarkdown>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="create-postpage-file-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="create-postpage-submit-btn"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
          <div className="create-postpage-ai-helper">
            <h4 className="font-semibold mb-2 text-gray-700">
              Need help writing?
            </h4>
            <AIHelperButton onSuggestionClick={(text) => setCaption(text)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
