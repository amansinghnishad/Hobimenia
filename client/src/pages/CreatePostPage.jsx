import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import AIHelperButton from "../components/AIHelperButton";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

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
    <>
      {" "}
      <Navbar />
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Write your caption or thought..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className="w-full border rounded p-2"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>

        <div className="ai-helper-wrapper mt-6">
          <h4 className="font-semibold mb-2">Need help writing?</h4>
          <AIHelperButton onSuggestionClick={(text) => setCaption(text)} />
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
