import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import AIHelperButton from "../components/AIHelperButton";
import { toast } from "react-toastify";

const EditPostPage = () => {
  const { id } = useParams(); // Post ID
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
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
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };
    fetchPost();
  }, [id, token]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
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
      setTimeout(() => navigate(`/posts/${id}`), 1500);
    } catch (err) {
      console.error("Failed to update post", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <textarea
          placeholder="Update your caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={4}
          className="w-full border rounded p-2"
        />

        {currentImage && !image && (
          <img
            src={currentImage}
            alt="Current Post"
            className="w-full rounded mb-2 max-h-96 object-cover"
          />
        )}

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
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>

      <div className="ai-helper-wrapper mt-6">
        <h4 className="font-semibold mb-2">Need a better caption?</h4>
        <AIHelperButton onSuggestionClick={(text) => setCaption(text)} />
      </div>
    </div>
  );
};

export default EditPostPage;
