import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import AIHelperButton from "../components/AIHelperButton"; // Uncommented
import ImageUploader from "../components/ImageUploader";
import { toast } from "react-toastify";
// import Navbar from "../components/Navbar"; // Assuming rendered higher up
// import ReactMarkdown from "react-markdown"; // Temporarily commented out if not essential
import "../css/pagesCSS/CreatePostPage.css";

const CreatePostPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image selection from ImageUploader
  const handleImageUpload = (file) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  // Clean up the object URL
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      toast.error("Caption cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    if (imageFile) formData.append("image", imageFile);

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
      <div className="create-postpage-outer">
        <div className="create-postpage-card">
          <h2 className="create-postpage-title">Create New Post</h2>
          <form onSubmit={handleSubmit} className="create-postpage-form">
            {/* Image Uploader Section */}
            <div className="create-postpage-form-group">
              <label className="create-postpage-label">
                Add an Image (Optional)
              </label>
              <ImageUploader onUpload={handleImageUpload} />
              {imageUrl && (
                <div className="create-postpage-image-preview">
                  <img src={imageUrl} alt="Selected preview" />
                </div>
              )}
            </div>

            {/* Caption Section */}
            <div className="create-postpage-form-group">
              <label htmlFor="caption" className="create-postpage-label">
                Write Blog / Thought
              </label>
              <textarea
                id="caption"
                placeholder="Share your thoughts, ideas, or stories..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={6}
                className="create-postpage-textarea"
                required
              />
            </div>

            {/* AI Helper Button - Pass current caption */}
            <div className="create-postpage-ai-helper">
              <AIHelperButton
                currentCaption={caption} // Pass caption state
                onSuggestionClick={(text) => setCaption(caption + text)}
              />
              {/* Add AI features notice */}
              <p className="create-postpage-ai-notice">
                ✨ More AI features coming soon!
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !caption.trim()}
              className="create-postpage-submit-btn"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
