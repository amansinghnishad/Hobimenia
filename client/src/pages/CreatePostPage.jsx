import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import AIHelperButton from "../components/AIHelperButton";
import { toast } from "react-toastify";

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
      setTimeout(() => navigate("/"), 1500); // Give time for toast
    } catch (err) {
      console.error("Failed to create post", err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your caption or thought..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={4}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <div className="ai-helper-wrapper">
        <h4>Need help writing?</h4>
        <AIHelperButton onSuggestionClick={(text) => setCaption(text)} />
      </div>
    </div>
  );
};

export default CreatePostPage;
